<?php
require_once __DIR__ . '/_bootstrap.php';

$m = method();

if ($m === 'GET') {
    $key = $_GET['key'] ?? '';
    if (!$key) json_out(['error' => 'Missing key'], 400);
    json_out(['key' => $key, 'value' => get_content_block($key, null)]);
}

if ($m === 'PUT') {
    if (!get_session()) json_out(['error' => 'Unauthorized'], 401);
    $b = json_body();
    if (empty($b['key'])) json_out(['error' => 'Missing key'], 400);
    set_content_block($b['key'], $b['value'] ?? null);
    json_out(['ok' => true]);
}

json_out(['error' => 'Method not allowed'], 405);
