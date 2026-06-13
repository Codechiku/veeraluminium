<?php
require_once __DIR__ . '/_bootstrap.php';

if (!get_session()) json_out(['error' => 'Unauthorized'], 401);

$m = method();
$id = $_GET['id'] ?? '';
if (!$id) json_out(['error' => 'Missing id'], 400);

if ($m === 'PATCH') {
    $b = json_body();
    $patch = [];
    if (isset($b['status'])) $patch['status'] = $b['status'];
    if (array_key_exists('notes', $b)) $patch['notes'] = $b['notes'];
    $updated = update_lead($id, $patch);
    if (!$updated) json_out(['error' => 'Not found'], 404);
    json_out(['ok' => true, 'lead' => $updated]);
}

if ($m === 'DELETE') {
    $ok = delete_lead($id);
    json_out(['ok' => $ok]);
}

json_out(['error' => 'Method not allowed'], 405);
