<?php
/**
 * Data access layer with graceful degradation (PHP port of src/lib/store.ts):
 *   1. If MySQL is reachable  → use PDO.
 *   2. Otherwise              → persist to JSON files under /.data.
 * This guarantees the whole site works even before a database is provisioned.
 */

require_once __DIR__ . '/../config.php';

function db()
{
    static $pdo = null;
    static $tried = false;
    if ($tried) return $pdo;
    $tried = true;
    try {
        $dsn = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        db_ensure_schema($pdo);
    } catch (Throwable $e) {
        $pdo = null; // fall back to JSON store
    }
    return $pdo;
}

function db_ensure_schema(PDO $pdo)
{
    $pdo->exec("CREATE TABLE IF NOT EXISTS settings (
        `key` VARCHAR(191) PRIMARY KEY,
        `value` LONGTEXT NOT NULL,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(40) PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        phone VARCHAR(40) NOT NULL,
        email VARCHAR(180) NULL,
        projectType VARCHAR(120) NULL,
        message TEXT NULL,
        estimatedCost DOUBLE NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'NEW',
        source VARCHAR(60) NULL DEFAULT 'website',
        details LONGTEXT NULL,
        notes TEXT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX(status), INDEX(createdAt)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

/* ── JSON fallback helpers ───────────────────────────────────────────── */
function json_read($file, $fallback)
{
    $path = DATA_DIR . '/' . $file;
    if (!is_file($path)) return $fallback;
    $raw = @file_get_contents($path);
    $data = json_decode($raw, true);
    return $data === null ? $fallback : $data;
}
function json_write($file, $data)
{
    if (!is_dir(DATA_DIR)) @mkdir(DATA_DIR, 0775, true);
    @file_put_contents(DATA_DIR . '/' . $file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
}

/* ── Pricing ─────────────────────────────────────────────────────────── */
function get_pricing()
{
    global $DEFAULT_PRICING;
    $pdo = db();
    if ($pdo) {
        $row = $pdo->query("SELECT value FROM settings WHERE `key`='pricing'")->fetch();
        if ($row && $row['value']) {
            $stored = json_decode($row['value'], true) ?: [];
            return array_replace_recursive($DEFAULT_PRICING, $stored);
        }
        return $DEFAULT_PRICING;
    }
    $stored = json_read('pricing.json', []);
    return array_replace_recursive($DEFAULT_PRICING, $stored);
}
function set_pricing($cfg)
{
    $pdo = db();
    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO settings(`key`,`value`) VALUES('pricing',:v)
            ON DUPLICATE KEY UPDATE `value`=:v");
        $stmt->execute([':v' => json_encode($cfg)]);
        return $cfg;
    }
    json_write('pricing.json', $cfg);
    return $cfg;
}

/* ── Editable content blocks ─────────────────────────────────────────── */
function get_content_block($key, $fallback)
{
    $pdo = db();
    if ($pdo) {
        $stmt = $pdo->prepare("SELECT value FROM settings WHERE `key`=:k");
        $stmt->execute([':k' => "content:$key"]);
        $row = $stmt->fetch();
        if ($row && $row['value']) {
            $v = json_decode($row['value'], true);
            if ($v !== null) return $v;
        }
        return $fallback;
    }
    $all = json_read('content.json', []);
    return $all[$key] ?? $fallback;
}
function set_content_block($key, $value)
{
    $pdo = db();
    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO settings(`key`,`value`) VALUES(:k,:v)
            ON DUPLICATE KEY UPDATE `value`=:v");
        $stmt->execute([':k' => "content:$key", ':v' => json_encode($value)]);
        return $value;
    }
    $all = json_read('content.json', []);
    $all[$key] = $value;
    json_write('content.json', $all);
    return $value;
}

/* ── Leads ───────────────────────────────────────────────────────────── */
function uuidv4()
{
    $d = random_bytes(16);
    $d[6] = chr((ord($d[6]) & 0x0f) | 0x40);
    $d[8] = chr((ord($d[8]) & 0x3f) | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($d), 4));
}

function create_lead($data)
{
    $now = date('Y-m-d H:i:s');
    $record = [
        'id' => uuidv4(),
        'name' => $data['name'] ?? 'Unknown',
        'phone' => $data['phone'] ?? '',
        'email' => $data['email'] ?? null,
        'projectType' => $data['projectType'] ?? null,
        'message' => $data['message'] ?? null,
        'estimatedCost' => isset($data['estimatedCost']) ? (float) $data['estimatedCost'] : null,
        'status' => 'NEW',
        'source' => $data['source'] ?? 'website',
        'details' => isset($data['details']) ? (is_string($data['details']) ? $data['details'] : json_encode($data['details'])) : null,
        'notes' => null,
        'createdAt' => $now,
        'updatedAt' => $now,
    ];
    $pdo = db();
    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO leads
            (id,name,phone,email,projectType,message,estimatedCost,status,source,details,createdAt,updatedAt)
            VALUES(:id,:name,:phone,:email,:projectType,:message,:estimatedCost,:status,:source,:details,:createdAt,:updatedAt)");
        $stmt->execute([
            ':id' => $record['id'], ':name' => $record['name'], ':phone' => $record['phone'],
            ':email' => $record['email'], ':projectType' => $record['projectType'],
            ':message' => $record['message'], ':estimatedCost' => $record['estimatedCost'],
            ':status' => $record['status'], ':source' => $record['source'],
            ':details' => $record['details'], ':createdAt' => $record['createdAt'], ':updatedAt' => $record['updatedAt'],
        ]);
        return $record;
    }
    $leads = json_read('leads.json', []);
    array_unshift($leads, $record);
    json_write('leads.json', $leads);
    return $record;
}

function list_leads()
{
    $pdo = db();
    if ($pdo) {
        return $pdo->query("SELECT * FROM leads ORDER BY createdAt DESC")->fetchAll();
    }
    return json_read('leads.json', []);
}

function update_lead($id, $patch)
{
    $pdo = db();
    if ($pdo) {
        $fields = [];
        $params = [':id' => $id];
        if (isset($patch['status'])) { $fields[] = 'status=:status'; $params[':status'] = $patch['status']; }
        if (array_key_exists('notes', $patch)) { $fields[] = 'notes=:notes'; $params[':notes'] = $patch['notes']; }
        if (!$fields) return null;
        $stmt = $pdo->prepare("UPDATE leads SET " . implode(',', $fields) . " WHERE id=:id");
        $stmt->execute($params);
        $s = $pdo->prepare("SELECT * FROM leads WHERE id=:id");
        $s->execute([':id' => $id]);
        return $s->fetch() ?: null;
    }
    $leads = json_read('leads.json', []);
    foreach ($leads as &$l) {
        if ($l['id'] === $id) {
            $l = array_merge($l, $patch, ['updatedAt' => date('Y-m-d H:i:s')]);
            json_write('leads.json', $leads);
            return $l;
        }
    }
    return null;
}

function delete_lead($id)
{
    $pdo = db();
    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM leads WHERE id=:id");
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }
    $leads = json_read('leads.json', []);
    $next = array_values(array_filter($leads, fn($l) => $l['id'] !== $id));
    json_write('leads.json', $next);
    return count($next) !== count($leads);
}
