<?php
require_once __DIR__ . '/_bootstrap.php';

if (!get_session()) json_out(['error' => 'Unauthorized'], 401);

$leads = list_leads();
$now = time();
$monthKey = fn($ts) => date('Y-m', $ts);
$ts_of = fn($l) => strtotime($l['createdAt']);

$thisMonth = $monthKey($now);
$totalLeads = count($leads);
$monthlyLeads = count(array_filter($leads, fn($l) => $monthKey($ts_of($l)) === $thisMonth));
$converted = count(array_filter($leads, fn($l) => $l['status'] === 'CONVERTED'));
$conversionRate = $totalLeads ? (int) round($converted / $totalLeads * 100) : 0;

$revenueEstimate = 0;
foreach ($leads as $l) {
    $c = (float) ($l['estimatedCost'] ?? 0);
    if ($l['status'] === 'CONVERTED') $revenueEstimate += $c;
    elseif ($l['status'] === 'QUOTE_SENT') $revenueEstimate += $c * 0.3;
}

$popularity = [];
foreach ($leads as $l) {
    $key = $l['projectType'] ?: 'Other';
    $popularity[$key] = ($popularity[$key] ?? 0) + 1;
}
arsort($popularity);
$servicePopularity = [];
foreach ($popularity as $name => $value) $servicePopularity[] = ['name' => $name, 'value' => $value];
$mostRequested = $servicePopularity[0]['name'] ?? '—';

$monthly = [];
for ($i = 5; $i >= 0; $i--) {
    $t = strtotime("first day of -$i month", $now);
    $key = $monthKey($t);
    $monthly[] = [
        'month' => date('M', $t),
        'leads' => count(array_filter($leads, fn($l) => $monthKey($ts_of($l)) === $key)),
        'converted' => count(array_filter($leads, fn($l) => $monthKey($ts_of($l)) === $key && $l['status'] === 'CONVERTED')),
    ];
}

$statuses = ['NEW', 'CONTACTED', 'QUOTE_SENT', 'CONVERTED', 'LOST'];
$funnel = array_map(fn($s) => ['status' => $s, 'count' => count(array_filter($leads, fn($l) => $l['status'] === $s))], $statuses);

json_out([
    'totalLeads' => $totalLeads,
    'monthlyLeads' => $monthlyLeads,
    'conversionRate' => $conversionRate,
    'revenueEstimate' => (int) round($revenueEstimate),
    'mostRequested' => $mostRequested,
    'servicePopularity' => $servicePopularity,
    'monthly' => $monthly,
    'funnel' => $funnel,
]);
