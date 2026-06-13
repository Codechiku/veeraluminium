<?php
require_once __DIR__ . '/_bootstrap.php';

/** Validation mirroring src/lib/validators.ts (leadSchema). */
function validate_lead($b, $contactMode = false)
{
    $issues = [];
    $name = trim($b['name'] ?? '');
    if (strlen($name) < 2) $issues['name'] = 'Please enter your name';
    if (strlen($name) > 80) $issues['name'] = 'Name is too long';
    $phone = trim($b['phone'] ?? '');
    if (strlen($phone) < 7) $issues['phone'] = 'Please enter a valid phone number';
    elseif (strlen($phone) > 20 || !preg_match('/^[0-9+\-\s()]+$/', $phone)) $issues['phone'] = 'Invalid phone number';
    $email = trim($b['email'] ?? '');
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $issues['email'] = 'Please enter a valid email';
    $message = trim($b['message'] ?? '');
    if ($contactMode && strlen($message) < 5) $issues['message'] = 'Please tell us a little about your project';
    if (strlen($message) > 2000) $issues['message'] = 'Message is too long';
    return $issues;
}

$m = method();

if ($m === 'POST') {
    $b = json_body();
    $contactMode = (($b['source'] ?? '') === 'contact-page');
    $issues = validate_lead($b, $contactMode);
    if ($issues) json_out(['error' => 'Validation failed', 'issues' => $issues], 422);
    $lead = create_lead([
        'name' => $b['name'] ?? '',
        'phone' => $b['phone'] ?? '',
        'email' => ($b['email'] ?? '') ?: null,
        'projectType' => $b['projectType'] ?? null,
        'message' => $b['message'] ?? null,
        'estimatedCost' => $b['estimatedCost'] ?? null,
        'source' => $b['source'] ?? 'website',
        'details' => $b['details'] ?? null,
    ]);
    json_out(['ok' => true, 'id' => $lead['id']], 201);
}

if ($m === 'GET') {
    if (!get_session()) json_out(['error' => 'Unauthorized'], 401);
    json_out(['leads' => list_leads()]);
}

json_out(['error' => 'Method not allowed'], 405);
