<?php
require_once __DIR__ . '/../includes/helpers.php';
require_admin();
global $DEFAULT_PRICING, $ALUMINIUM_GRADE_OPTIONS, $GLASS_TYPE_OPTIONS, $FRAME_FINISH_OPTIONS, $PRODUCT_TYPE_OPTIONS, $ADDON_OPTIONS;
$admin_active = 'pricing';
$pricing = get_pricing();
$admin_scripts = '<script>window.__DEFAULT_PRICING__=' . json_encode($DEFAULT_PRICING, JSON_UNESCAPED_SLASHES) . ';</script><script src="/admin/pricing.js"></script>';

function rate_row($label, $value, $key, $step = 1, $suffix = '', $currency = true)
{
    $h = '<div class="rate-row"><label>' . esc($label) . '</label><div class="v">';
    if ($currency) $h .= '<span class="hide-sm" style="font-size:.72rem;color:hsl(var(--muted-foreground))">' . format_inr($value) . '</span>';
    $h .= '<input type="number" step="' . esc($step) . '" value="' . esc($value) . '" data-rate="' . esc($key) . '">';
    if ($suffix) $h .= '<span class="suffix">' . esc($suffix) . '</span>';
    $h .= '</div></div>';
    return $h;
}

require __DIR__ . '/includes/shell-top.php';
?>
<div class="stack">
  <div class="flex-between">
    <div><h1>Pricing Management</h1><p style="font-size:.875rem;color:hsl(var(--muted-foreground))">Edit rates below. The estimate calculator &amp; PDF quotes update automatically.</p></div>
    <div style="display:flex;gap:.5rem">
      <button class="btn btn-outline btn-sm" id="resetBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/></svg> Reset Defaults</button>
      <button class="btn btn-gold btn-sm" id="saveBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8"/></svg> Save Changes</button>
    </div>
  </div>

  <div class="dirty-banner" id="dirtyBanner" style="display:none">You have unsaved changes. Click <strong>Save Changes</strong> to apply.</div>

  <div class="grid-2">
    <div class="panel"><h2>Aluminium — per sq.ft</h2><p class="sub">Material cost by grade</p><div style="display:grid;gap:.65rem">
      <?php foreach ($ALUMINIUM_GRADE_OPTIONS as $o) echo rate_row($o['label'], $pricing['aluminium'][$o['value']], 'aluminium.' . $o['value']); ?>
    </div></div>

    <div class="panel"><h2>Glass — per sq.ft</h2><p class="sub">Material cost by glass type</p><div style="display:grid;gap:.65rem">
      <?php foreach ($GLASS_TYPE_OPTIONS as $o) echo rate_row($o['label'], $pricing['glass'][$o['value']], 'glass.' . $o['value']); ?>
    </div></div>

    <div class="panel"><h2>Frame Finish — surcharge per sq.ft</h2><p class="sub">Added on top of aluminium</p><div style="display:grid;gap:.65rem">
      <?php foreach ($FRAME_FINISH_OPTIONS as $o) echo rate_row($o['label'], $pricing['frame'][$o['value']], 'frame.' . $o['value']); ?>
    </div></div>

    <div class="panel"><h2>Labour, Installation, Transport &amp; GST</h2><p class="sub">Base operational rates</p><div style="display:grid;gap:.65rem">
      <?php
      echo rate_row('Labour (per sq.ft)', $pricing['labourPerSqft'], 'labourPerSqft');
      echo rate_row('Installation (per sq.ft)', $pricing['installationPerSqft'], 'installationPerSqft');
      echo rate_row('Transport — base flat fee', $pricing['transportBase'], 'transportBase');
      echo rate_row('Transport (per sq.ft)', $pricing['transportPerSqft'], 'transportPerSqft');
      echo rate_row('GST (%)', $pricing['gstPercent'], 'gstPercent', 1, '%');
      echo rate_row('Minimum chargeable area (sq.ft)', $pricing['minimumArea'], 'minimumArea', 1, 'sq.ft');
      ?>
    </div></div>

    <div class="panel"><h2>Product Complexity Factors</h2><p class="sub">Multiplier on material + labour (1.0 = standard)</p><div style="display:grid;gap:.65rem">
      <?php foreach ($PRODUCT_TYPE_OPTIONS as $o) echo rate_row($o['label'], $pricing['productFactor'][$o['value']], 'productFactor.' . $o['value'], 0.05, '×', false); ?>
    </div></div>

    <div class="panel"><h2>Add-ons</h2><p class="sub">Per sq.ft and/or flat fee</p><div style="display:grid;gap:.75rem">
      <?php foreach ($ADDON_OPTIONS as $o): $cfg = $pricing['addOns'][$o['value']]; ?>
        <div style="border-radius:.5rem;border:1px solid hsl(var(--border));padding:.75rem">
          <p style="margin-bottom:.5rem;font-size:.875rem;font-weight:500"><?= esc($o['label']) ?></p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
            <div class="field"><label style="font-size:.72rem;color:hsl(var(--muted-foreground))">Per sq.ft</label><input type="number" value="<?= esc($cfg['perSqft']) ?>" data-rate="addOns.<?= esc($o['value']) ?>.perSqft"></div>
            <div class="field"><label style="font-size:.72rem;color:hsl(var(--muted-foreground))">Flat fee</label><input type="number" value="<?= esc($cfg['flat']) ?>" data-rate="addOns.<?= esc($o['value']) ?>.flat"></div>
          </div>
        </div>
      <?php endforeach; ?>
    </div></div>
  </div>

  <div style="display:flex;justify-content:flex-end">
    <button class="btn btn-gold" id="saveBtn2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/></svg> Save Changes</button>
  </div>
</div>
<?php require __DIR__ . '/includes/shell-bottom.php'; ?>
