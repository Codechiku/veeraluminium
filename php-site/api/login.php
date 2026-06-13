<?php
require_once __DIR__ . '/_bootstrap.php';

if (method() !== 'POST') json_out(['error' => 'Method not allowed'], 405);

$b = json_body();
$email = $b['email'] ?? '';
$password = $b['password'] ?? '';
if (!$email || !$password) json_out(['error' => 'Email and password are required'], 400);

$session = verify_credentials($email, $password);
if (!$session) json_out(['error' => 'Invalid email or password'], 401);

create_session($session);
json_out(['ok' => true]);
