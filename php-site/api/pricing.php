<?php
require_once __DIR__ . '/_bootstrap.php';
global $DEFAULT_PRICING;

$m = method();

if ($m === 'GET') {
    json_out(['pricing' => get_pricing()]);
}

if ($m === 'PUT') {
    if (!get_session()) json_out(['error' => 'Unauthorized'], 401);
    $b = json_body();
    if (!$b) json_out(['error' => 'Invalid payload'], 400);
    $merged = array_replace_recursive($DEFAULT_PRICING, $b);
    $saved = set_pricing($merged);
    json_out(['pricing' => $saved, 'ok' => true]);
}

json_out(['error' => 'Method not allowed'], 405);
