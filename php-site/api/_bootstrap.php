<?php
/** Shared API bootstrap: JSON headers + body parsing helpers. */
require_once __DIR__ . '/../includes/helpers.php';

header('Content-Type: application/json; charset=utf-8');

function json_body()
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function json_out($data, $status = 200)
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function method()
{
    // Allow ?_method=PATCH / DELETE override for simple clients.
    $m = $_SERVER['REQUEST_METHOD'];
    if ($m === 'POST' && isset($_GET['_method'])) return strtoupper($_GET['_method']);
    return $m;
}
