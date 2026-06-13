<?php
/**
 * VEER ALUMINIUM — QUOTATION ENGINE (PHP port of src/lib/pricing.ts)
 * Data-driven pricing. All rates in INR, areas in sq.ft.
 */

$DEFAULT_PRICING = [
    'aluminium' => ['standard' => 320, 'premium' => 480, 'heavy-duty' => 640],
    'glass' => ['5mm' => 90, '8mm' => 140, '10mm' => 190, '12mm' => 250, 'toughened' => 320, 'laminated' => 380, 'reflective' => 300],
    'frame' => ['white' => 0, 'black' => 35, 'wood-finish' => 70, 'custom-color' => 90],
    'productFactor' => [
        'sliding-window' => 1.0, 'casement-window' => 1.1, 'fixed-window' => 0.85,
        'aluminium-door' => 1.25, 'glass-door' => 1.35, 'partition' => 1.05,
        'balcony-railing' => 1.2, 'acp-panel' => 0.95, 'custom-fabrication' => 1.4,
    ],
    'productMaterial' => [
        'sliding-window' => ['aluminium', 'glass'], 'casement-window' => ['aluminium', 'glass'],
        'fixed-window' => ['aluminium', 'glass'], 'aluminium-door' => ['aluminium', 'glass'],
        'glass-door' => ['glass'], 'partition' => ['aluminium', 'glass'],
        'balcony-railing' => ['aluminium', 'glass'], 'acp-panel' => ['aluminium'],
        'custom-fabrication' => ['aluminium', 'glass'],
    ],
    'labourPerSqft' => 75,
    'installationPerSqft' => 55,
    'transportBase' => 1200,
    'transportPerSqft' => 6,
    'gstPercent' => 18,
    'addOns' => [
        'mosquito-mesh' => ['label' => 'Mosquito Mesh', 'perSqft' => 45, 'flat' => 0],
        'premium-hardware' => ['label' => 'Premium Hardware', 'perSqft' => 0, 'flat' => 1500],
        'soundproof-glass' => ['label' => 'Soundproof Glass', 'perSqft' => 120, 'flat' => 0],
        'security-lock' => ['label' => 'Security Lock', 'perSqft' => 0, 'flat' => 900],
        'powder-coating' => ['label' => 'Powder Coating', 'perSqft' => 40, 'flat' => 0],
        'acp-finish' => ['label' => 'ACP Finish', 'perSqft' => 85, 'flat' => 0],
    ],
    'minimumArea' => 6,
];

$PRODUCT_TYPE_OPTIONS = [
    ['value' => 'sliding-window', 'label' => 'Sliding Window'],
    ['value' => 'casement-window', 'label' => 'Casement Window'],
    ['value' => 'fixed-window', 'label' => 'Fixed Window'],
    ['value' => 'aluminium-door', 'label' => 'Aluminium Door'],
    ['value' => 'glass-door', 'label' => 'Glass Door'],
    ['value' => 'partition', 'label' => 'Partition'],
    ['value' => 'balcony-railing', 'label' => 'Balcony Railing'],
    ['value' => 'acp-panel', 'label' => 'ACP Panel'],
    ['value' => 'custom-fabrication', 'label' => 'Custom Fabrication'],
];
$ALUMINIUM_GRADE_OPTIONS = [
    ['value' => 'standard', 'label' => 'Standard'],
    ['value' => 'premium', 'label' => 'Premium'],
    ['value' => 'heavy-duty', 'label' => 'Heavy Duty'],
];
$GLASS_TYPE_OPTIONS = [
    ['value' => '5mm', 'label' => '5mm Clear'],
    ['value' => '8mm', 'label' => '8mm Clear'],
    ['value' => '10mm', 'label' => '10mm Clear'],
    ['value' => '12mm', 'label' => '12mm Clear'],
    ['value' => 'toughened', 'label' => 'Toughened'],
    ['value' => 'laminated', 'label' => 'Laminated'],
    ['value' => 'reflective', 'label' => 'Reflective'],
];
$FRAME_FINISH_OPTIONS = [
    ['value' => 'white', 'label' => 'White', 'swatch' => '#f5f5f5'],
    ['value' => 'black', 'label' => 'Black', 'swatch' => '#1a1a1a'],
    ['value' => 'wood-finish', 'label' => 'Wood Finish', 'swatch' => '#8a5a2b'],
    ['value' => 'custom-color', 'label' => 'Custom Color', 'swatch' => '#b8902f'],
];
$ADDON_OPTIONS = [
    ['value' => 'mosquito-mesh', 'label' => 'Mosquito Mesh'],
    ['value' => 'premium-hardware', 'label' => 'Premium Hardware'],
    ['value' => 'soundproof-glass', 'label' => 'Soundproof Glass'],
    ['value' => 'security-lock', 'label' => 'Security Lock'],
    ['value' => 'powder-coating', 'label' => 'Powder Coating'],
    ['value' => 'acp-finish', 'label' => 'ACP Finish'],
];

/** Core calculation — pure function mirroring computeEstimate() in TS. */
function compute_estimate(array $input, array $pricing)
{
    $r = fn($n) => (int) round($n);
    $quantity = max(1, (int) floor($input['quantity'] ?? 1));
    $rawArea = max(0, (float) ($input['widthFt'] ?? 0)) * max(0, (float) ($input['heightFt'] ?? 0));
    $area = max($rawArea, $pricing['minimumArea']);
    $totalArea = $area * $quantity;

    $factor = $pricing['productFactor'][$input['productType']] ?? 1;
    $materials = $pricing['productMaterial'][$input['productType']] ?? ['aluminium'];

    $materialPerSqft = 0;
    if (in_array('aluminium', $materials, true)) {
        $materialPerSqft += $pricing['aluminium'][$input['aluminiumGrade']];
        $materialPerSqft += $pricing['frame'][$input['frameFinish']];
    }
    if (in_array('glass', $materials, true)) {
        $materialPerSqft += $pricing['glass'][$input['glassType']];
    }
    $materialCost = $r($materialPerSqft * $totalArea * $factor);
    $labourCost = $r($pricing['labourPerSqft'] * $totalArea * $factor);
    $installationCost = $r($pricing['installationPerSqft'] * $totalArea);
    $transportationCost = $r($pricing['transportBase'] + $pricing['transportPerSqft'] * $totalArea);

    $addOnDetails = [];
    foreach (($input['addOns'] ?? []) as $key) {
        if (!isset($pricing['addOns'][$key])) continue;
        $cfg = $pricing['addOns'][$key];
        $cost = $r($cfg['perSqft'] * $totalArea + $cfg['flat'] * $quantity);
        $addOnDetails[] = ['key' => $key, 'label' => $cfg['label'], 'cost' => $cost];
    }
    $addOnsCost = array_sum(array_column($addOnDetails, 'cost'));

    $subtotal = $materialCost + $labourCost + $installationCost + $transportationCost + $addOnsCost;
    $gstAmount = $r($subtotal * $pricing['gstPercent'] / 100);
    $grandTotal = $subtotal + $gstAmount;

    return [
        'area' => round($area * 100) / 100,
        'totalArea' => round($totalArea * 100) / 100,
        'quantity' => $quantity,
        'materialCost' => $materialCost,
        'labourCost' => $labourCost,
        'installationCost' => $installationCost,
        'transportationCost' => $transportationCost,
        'addOnsCost' => $addOnsCost,
        'addOnDetails' => $addOnDetails,
        'subtotal' => $subtotal,
        'gstPercent' => $pricing['gstPercent'],
        'gstAmount' => $gstAmount,
        'grandTotal' => $grandTotal,
        'perUnit' => $r($grandTotal / $quantity),
    ];
}

function label_for($kind, $value)
{
    global $PRODUCT_TYPE_OPTIONS, $ALUMINIUM_GRADE_OPTIONS, $GLASS_TYPE_OPTIONS, $FRAME_FINISH_OPTIONS, $ADDON_OPTIONS;
    $map = [
        'product' => $PRODUCT_TYPE_OPTIONS, 'aluminium' => $ALUMINIUM_GRADE_OPTIONS,
        'glass' => $GLASS_TYPE_OPTIONS, 'frame' => $FRAME_FINISH_OPTIONS, 'addOn' => $ADDON_OPTIONS,
    ];
    foreach ($map[$kind] ?? [] as $o) if ($o['value'] === $value) return $o['label'];
    return $value;
}
