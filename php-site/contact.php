<?php
require_once __DIR__ . '/includes/helpers.php';
global $SITE, $PRODUCT_TYPE_OPTIONS, $telLink, $mailLink;

$page_title = 'Contact Us | Veer Aluminium & Fabrication, Palanpur';
$page_desc = 'Get in touch with Veer Aluminium & Fabrication, Near Railway Overbridge, Ruppura, Palanpur, Gujarat. Call, WhatsApp or request a free quote today.';
$mapsEmbed = 'https://www.google.com/maps?q=' . rawurlencode($SITE['address']['full']) . '&output=embed';
$wa = whatsapp_link("Hi Veer Aluminium, I'd like a free quote.");

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/navbar.php';

$ph_eyebrow = 'Get in Touch';
$ph_title = "Let's Build Something Premium";
$ph_desc = "Reach out for a free consultation, site visit or instant quote. We're here to bring your vision to life.";
$ph_crumbs = [['label' => 'Contact']];
require __DIR__ . '/includes/page-header.php';
?>
<main>
<section class="section" style="padding-top:3rem">
  <div class="container">
    <div class="contact-grid">
      <!-- Info -->
      <div>
        <div class="reveal">
          <h2 class="font-display" style="font-size:1.5rem;font-weight:700">Talk to Our Experts</h2>
          <p style="margin-top:.5rem;color:hsl(var(--muted-foreground))">Choose whatever's easiest — we respond fast.</p>
        </div>
        <div style="margin-top:2rem;display:grid;gap:1rem">
          <div class="info-card reveal"><div class="ic"><?= icon('MapPin') ?></div><div><b>Visit Our Workshop</b><p><?= esc($SITE['address']['full']) ?></p></div></div>
          <a href="<?= esc($telLink) ?>" class="info-card reveal"><div class="ic"><?= icon('Phone') ?></div><div><b>Call Us</b><p><?= esc($SITE['contact']['phone']) ?></p></div></a>
          <a href="<?= esc($mailLink) ?>" class="info-card reveal"><div class="ic"><?= icon('Mail') ?></div><div><b>Email Us</b><p><?= esc($SITE['contact']['email']) ?></p></div></a>
          <div class="info-card reveal"><div class="ic"><?= icon('Clock') ?></div><div><b>Business Hours</b><p><?= esc($SITE['hours']['weekdays']) ?></p><p><?= esc($SITE['hours']['sunday']) ?></p></div></div>
        </div>
        <div style="margin-top:1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
          <a href="<?= esc($wa) ?>" target="_blank" rel="noopener" class="btn btn-gold btn-lg"><?= icon('MessageCircle') ?> WhatsApp</a>
          <a href="<?= esc($telLink) ?>" class="btn btn-outline btn-lg"><?= icon('Phone') ?> Call Now</a>
        </div>
      </div>

      <!-- Form -->
      <div>
        <div class="reveal left">
          <div class="form-card">
            <h2 class="font-display" style="font-size:1.5rem;font-weight:700">Request a Free Quote</h2>
            <p style="margin-top:.5rem;font-size:.875rem;color:hsl(var(--muted-foreground))">Fill in the form and we'll get back within 24 hours.</p>
            <form id="contactForm" style="margin-top:1.5rem;display:grid;gap:1.25rem" data-source="contact-page">
              <div class="two-col">
                <div class="field"><label>Full Name *</label><input name="name" placeholder="Your name" required><p class="error-text" data-err="name"></p></div>
                <div class="field"><label>Phone *</label><input name="phone" type="tel" placeholder="+91 ..." required><p class="error-text" data-err="phone"></p></div>
              </div>
              <div class="two-col">
                <div class="field"><label>Email</label><input name="email" type="email" placeholder="you@example.com"><p class="error-text" data-err="email"></p></div>
                <div class="field"><label>Project Type</label>
                  <select name="projectType">
                    <option value="">Select a service</option>
                    <?php foreach ($PRODUCT_TYPE_OPTIONS as $o): ?><option value="<?= esc($o['label']) ?>"><?= esc($o['label']) ?></option><?php endforeach; ?>
                    <option value="Other">Other / Custom</option>
                  </select>
                </div>
              </div>
              <div class="field"><label>Your Message *</label><textarea name="message" rows="5" placeholder="Tell us about your project, dimensions, location and timeline..." required></textarea><p class="error-text" data-err="message"></p></div>
              <button type="submit" class="btn btn-gold btn-lg btn-block"><?= icon('ArrowRight') ?> Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Map -->
    <div class="reveal map-frame">
      <iframe src="<?= esc($mapsEmbed) ?>" title="Veer Aluminium location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/foot.php'; ?>
<script>
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  var form = e.target;
  form.querySelectorAll('.error-text').forEach(function (p) { p.textContent = ''; });
  var btn = form.querySelector('button[type=submit]');
  var data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    projectType: form.projectType.value,
    message: form.message.value.trim(),
    source: 'contact-page'
  };
  btn.disabled = true; btn.textContent = 'Sending...';
  try {
    var res = await fetch('/api/leads.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    var out = await res.json();
    if (res.status === 422 && out.issues) {
      Object.keys(out.issues).forEach(function (k) {
        var p = form.querySelector('[data-err="' + k + '"]'); if (p) p.textContent = out.issues[k];
      });
      throw new Error('validation');
    }
    if (!res.ok) throw new Error();
    window.toast('success', 'Message sent!', 'Thank you — our team will reach out within 24 hours.');
    form.reset();
  } catch (err) {
    if (err.message !== 'validation') window.toast('error', 'Something went wrong', 'Please call us directly or try again shortly.');
  } finally {
    btn.disabled = false; btn.innerHTML = 'Send Message';
  }
});
</script>
