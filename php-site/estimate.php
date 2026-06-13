<?php
require_once __DIR__ . '/includes/helpers.php';
global $DEFAULT_PRICING, $PRODUCT_TYPE_OPTIONS, $ALUMINIUM_GRADE_OPTIONS, $GLASS_TYPE_OPTIONS, $FRAME_FINISH_OPTIONS, $ADDON_OPTIONS;

$page_title = 'Free Estimate Calculator | Instant Aluminium & Glass Quote';
$page_desc = 'Get an instant, transparent estimate for aluminium windows, doors, glass, ACP and fabrication. Itemised material, labour, installation, GST and a downloadable PDF quotation.';

$pricing = get_pricing();

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/navbar.php';

$ph_eyebrow = 'Smart Quotation Engine';
$ph_title = 'Instant Estimate Calculator';
$ph_desc = 'Configure your product below and watch the price update live. Download a professional PDF quote or request a detailed quotation from our team.';
$ph_crumbs = [['label' => 'Estimate']];
require __DIR__ . '/includes/page-header.php';
?>
<main>
<section class="section" style="padding-top:3rem">
  <div class="container">
    <div class="est-grid">
      <!-- Config panel -->
      <div>
        <!-- Step 1 -->
        <div class="config-card">
          <div class="head"><span class="step">1</span><h3>Choose Your Product</h3></div>
          <div class="field"><label>Product Type</label>
            <select id="productType">
              <?php foreach ($PRODUCT_TYPE_OPTIONS as $o): ?><option value="<?= esc($o['value']) ?>"<?= $o['value'] === 'sliding-window' ? ' selected' : '' ?>><?= esc($o['label']) ?></option><?php endforeach; ?>
            </select>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="config-card">
          <div class="head"><span class="step">2</span><h3>Select Materials</h3></div>
          <div class="two-col">
            <div class="field"><label>Aluminium Grade</label>
              <select id="aluminiumGrade">
                <?php foreach ($ALUMINIUM_GRADE_OPTIONS as $o): ?><option value="<?= esc($o['value']) ?>"<?= $o['value'] === 'premium' ? ' selected' : '' ?>><?= esc($o['label']) ?> · <?= format_inr($pricing['aluminium'][$o['value']]) ?>/sq.ft</option><?php endforeach; ?>
              </select>
            </div>
            <div class="field"><label>Glass Type</label>
              <select id="glassType">
                <?php foreach ($GLASS_TYPE_OPTIONS as $o): ?><option value="<?= esc($o['value']) ?>"<?= $o['value'] === 'toughened' ? ' selected' : '' ?>><?= esc($o['label']) ?> · <?= format_inr($pricing['glass'][$o['value']]) ?>/sq.ft</option><?php endforeach; ?>
              </select>
            </div>
          </div>
          <div class="field" style="margin-top:1.25rem"><label>Frame Finish</label>
            <div class="finish-row" id="frameFinish">
              <?php foreach ($FRAME_FINISH_OPTIONS as $o): ?>
                <button type="button" class="finish-chip<?= $o['value'] === 'black' ? ' active' : '' ?>" data-value="<?= esc($o['value']) ?>"><span class="sw" style="background:<?= esc($o['swatch']) ?>"></span><?= esc($o['label']) ?></button>
              <?php endforeach; ?>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="config-card">
          <div class="head"><span class="step">3</span><h3>Enter Dimensions</h3></div>
          <div class="two-col">
            <div class="field">
              <div style="display:flex;align-items:center;justify-content:space-between"><label>Width (ft)</label><span class="text-gold" style="font-size:.875rem;font-weight:500"><span id="widthVal">5</span> ft</span></div>
              <input type="number" id="widthFt" min="1" max="40" step="0.5" value="5">
              <input type="range" id="widthRange" min="1" max="20" step="0.5" value="5" style="margin-top:.25rem">
            </div>
            <div class="field">
              <div style="display:flex;align-items:center;justify-content:space-between"><label>Height (ft)</label><span class="text-gold" style="font-size:.875rem;font-weight:500"><span id="heightVal">4</span> ft</span></div>
              <input type="number" id="heightFt" min="1" max="40" step="0.5" value="4">
              <input type="range" id="heightRange" min="1" max="20" step="0.5" value="4" style="margin-top:.25rem">
            </div>
          </div>
          <div class="dim-summary">
            <div><p class="k">Area per unit</p><p class="v"><span id="areaPerUnit">20</span> <small>sq.ft</small></p></div>
            <div><p class="k">Quantity</p>
              <div class="qty">
                <button type="button" class="btn btn-outline btn-icon" id="qtyMinus" aria-label="Decrease">−</button>
                <span class="n" id="qtyVal">1</span>
                <button type="button" class="btn btn-outline btn-icon" id="qtyPlus" aria-label="Increase">+</button>
              </div>
            </div>
            <div><p class="k">Total area</p><p class="v"><span id="totalArea">20</span> <small>sq.ft</small></p></div>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="config-card">
          <div class="head"><span class="step">4</span><h3>Additional Options</h3></div>
          <div class="addons" id="addons">
            <?php foreach ($ADDON_OPTIONS as $o): $cfg = $pricing['addOns'][$o['value']];
              $price = $cfg['perSqft'] > 0 ? '+' . format_inr($cfg['perSqft']) . '/sq.ft' : '+' . format_inr($cfg['flat']);
              $checked = $o['value'] === 'premium-hardware'; ?>
              <button type="button" class="addon<?= $checked ? ' active' : '' ?>" data-value="<?= esc($o['value']) ?>">
                <span class="lc"><span class="box"><?= icon('CheckCircle2') ?></span><span style="font-size:.875rem;font-weight:500"><?= esc($o['label']) ?></span></span>
                <span class="price"><?= esc($price) ?></span>
              </button>
            <?php endforeach; ?>
          </div>
        </div>
      </div>

      <!-- Summary panel -->
      <div>
        <div class="summary-sticky">
          <div class="summary-card">
            <div class="preview" id="preview"></div>
            <div class="summary-body">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <h3 class="font-display" style="font-size:1.125rem;font-weight:600">Estimate Summary</h3>
                <button class="compare-link" id="compareBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:.85rem;height:.85rem"><path d="M16 16l3-8 3 8c-2 1.5-4 1.5-6 0zM2 16l3-8 3 8c-2 1.5-4 1.5-6 0zM7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> Compare</button>
              </div>
              <dl class="summary-rows" id="summaryRows"></dl>
              <div class="grand">
                <div class="row"><span style="font-size:.875rem;color:hsl(var(--primary-foreground)/.8)">Grand Total</span><span class="total" id="grandTotal">₹0</span></div>
                <p class="per" id="perUnit" style="display:none"></p>
              </div>
              <div class="summary-actions">
                <button class="btn btn-gold btn-lg" id="getQuoteBtn"><?= icon('ArrowRight') ?> Get This Quote</button>
                <div class="two">
                  <button class="btn btn-outline" id="pdfBtn"><?= icon('FileText') ?> PDF</button>
                  <button class="btn btn-outline" id="saveBtn"><?= icon('CheckCircle2') ?> Save</button>
                </div>
              </div>
              <p class="note"><?= icon('ShieldCheck') ?> Indicative estimate. Final price confirmed after a free on-site measurement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Saved quotes -->
    <div id="savedQuotes" style="margin-top:3rem"></div>
  </div>
</section>
</main>

<!-- Lead capture dialog -->
<div class="modal-overlay" id="leadModal">
  <div class="modal" style="position:relative;padding:1.5rem">
    <div class="modal-close" data-close-modal="leadModal">&times;</div>
    <h3 class="title">Get Your Detailed Quote</h3>
    <p style="margin-top:.25rem;font-size:.875rem;color:hsl(var(--muted-foreground))">Share your details and our team will confirm pricing and schedule a free site visit.</p>
    <div style="margin-top:1rem;display:grid;gap:1rem">
      <div style="border-radius:.75rem;background:hsl(var(--secondary)/.6);padding:1rem;font-size:.875rem;display:flex;justify-content:space-between"><span style="color:hsl(var(--muted-foreground))">Estimated total</span><span style="font-weight:700;color:hsl(var(--gold))" id="leadTotal">₹0</span></div>
      <div class="field"><label>Full Name *</label><input id="leadName" placeholder="Your name"></div>
      <div class="field"><label>Phone *</label><input id="leadPhone" type="tel" placeholder="+91 ..."></div>
      <div class="field"><label>Email</label><input id="leadEmail" type="email" placeholder="you@example.com"></div>
      <button class="btn btn-gold btn-lg btn-block" id="leadSubmit"><?= icon('ArrowRight') ?> Submit Request</button>
    </div>
  </div>
</div>

<!-- Compare dialog -->
<div class="modal-overlay" id="compareModal">
  <div class="modal" style="position:relative;padding:1.5rem">
    <div class="modal-close" data-close-modal="compareModal">&times;</div>
    <h3 class="title">Compare Material Types</h3>
    <p style="margin-top:.25rem;font-size:.875rem;color:hsl(var(--muted-foreground))">Estimated grand total for your current dimensions (<span id="compareArea">0</span> sq.ft) with each material.</p>
    <div style="margin-top:1rem;display:grid;gap:1rem">
      <div><p style="margin-bottom:.5rem;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:hsl(var(--muted-foreground))">Aluminium Grade</p><div id="compareAluminium" style="display:grid;gap:.5rem"></div></div>
      <div><p style="margin-bottom:.5rem;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:hsl(var(--muted-foreground))">Glass Type</p><div id="compareGlass" style="display:grid;gap:.5rem"></div></div>
    </div>
  </div>
</div>

<script>
window.__PRICING__ = <?= json_encode($pricing, JSON_UNESCAPED_SLASHES) ?>;
window.__OPTIONS__ = {
  product: <?= json_encode($PRODUCT_TYPE_OPTIONS, JSON_UNESCAPED_SLASHES) ?>,
  aluminium: <?= json_encode($ALUMINIUM_GRADE_OPTIONS, JSON_UNESCAPED_SLASHES) ?>,
  glass: <?= json_encode($GLASS_TYPE_OPTIONS, JSON_UNESCAPED_SLASHES) ?>,
  frame: <?= json_encode($FRAME_FINISH_OPTIONS, JSON_UNESCAPED_SLASHES) ?>,
  addOns: <?= json_encode($ADDON_OPTIONS, JSON_UNESCAPED_SLASHES) ?>
};
window.__SITE__ = {
  name: <?= json_encode($SITE['name']) ?>, tagline: <?= json_encode($SITE['tagline']) ?>,
  addressFull: <?= json_encode($SITE['address']['full']) ?>, phone: <?= json_encode($SITE['contact']['phone']) ?>,
  email: <?= json_encode($SITE['contact']['email']) ?>, url: <?= json_encode($SITE['url']) ?>
};
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"></script>
<script src="/assets/js/estimate.js"></script>

<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/foot.php'; ?>
