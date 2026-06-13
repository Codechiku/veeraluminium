<?php
require_once __DIR__ . '/includes/helpers.php';
global $SITE, $SERVICES, $PROJECTS, $TESTIMONIALS, $STATS, $TIMELINE, $WHY_CHOOSE, $PROCESS, $FAQS, $telLink;

$content = resolved_content();

// FAQ JSON-LD (faqJsonLd)
$json_ld = [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => array_map(fn($f) => [
        '@type' => 'Question',
        'name' => $f['question'],
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f['answer']],
    ], $FAQS),
];

$grid_services = array_slice($SERVICES, 0, 13);
$marquee = array_map(fn($s) => $s['title'], $SERVICES);
$half = (int) ceil(count($marquee) / 2);
$marquee_top = array_slice($marquee, 0, $half);
$marquee_bottom = array_slice($marquee, $half);

// projects sorted by year desc, limit 6 for the stack
$proj_sorted = $PROJECTS;
usort($proj_sorted, fn($a, $b) => $b['year'] - $a['year']);
$proj_stack = array_slice($proj_sorted, 0, 6);

$highlights = ['ISO-grade material sourcing', 'In-house CNC manufacturing', 'Certified installation crews', 'Post-installation support'];
$statement_text = "We don't just install windows and glass — we engineer experiences that transform how you live and work, with precision that lasts a lifetime.";
$statement_hi = ['engineer', 'experiences', 'precision', 'lifetime'];

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/navbar.php';
?>
<main>

<!-- ══ HERO ══ -->
<section class="hero">
  <div class="bg"><div class="grad"></div><div class="grid-pattern" style="position:absolute;inset:0;opacity:.35;-webkit-mask-image:radial-gradient(ellipse 60% 50% at 50% 0%,black,transparent);mask-image:radial-gradient(ellipse 60% 50% at 50% 0%,black,transparent)"></div><div class="glow"></div></div>
  <div class="container hero-grid">
    <div>
      <div class="hero-badge reveal">
        <span class="stars"><?= str_repeat(star_svg(), 5) ?></span>
        <span><?= esc($content['hero']['badge']) ?></span>
      </div>
      <h1 class="reveal" data-delay="0.05"><?= esc($content['hero']['titleLead']) ?> <span class="text-gradient-gold"><?= esc($content['hero']['titleHighlight']) ?></span> <?= esc($content['hero']['titleTail']) ?></h1>
      <p class="sub reveal" data-delay="0.1"><?= esc($content['hero']['subheading']) ?></p>
      <ul class="assur reveal" data-delay="0.15">
        <?php foreach (['Free Site Visit', 'Transparent Pricing', 'Certified Installation'] as $t): ?>
          <li><?= icon('CheckCircle2') ?><?= esc($t) ?></li>
        <?php endforeach; ?>
      </ul>
      <div class="hero-cta reveal" data-delay="0.2">
        <a href="/estimate.php" class="btn btn-gold btn-xl"><?= esc($content['hero']['ctaPrimary']) ?> <?= icon('ArrowRight') ?></a>
        <a href="/projects.php" class="btn btn-outline btn-xl"><?= icon('Calculator') ?><?= esc($content['hero']['ctaSecondary']) ?></a>
      </div>
      <div class="hero-stats reveal" data-delay="0.25">
        <?php foreach ([['3+', 'Years Experience'], ['150+', 'Projects Done'], ['10+', 'Cities Served']] as $s): ?>
          <div><p class="v"><?= esc($s[0]) ?></p><p class="l"><?= esc($s[1]) ?></p></div>
        <?php endforeach; ?>
      </div>
    </div>
    <div class="hero-figure reveal" data-delay="0.2">
      <div class="frame">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80" alt="Premium glass and aluminium architecture by Veer">
        <div class="veil"></div>
        <div class="chip"><b>Structural Glazing</b><p>Corporate Tower · Gujarat</p></div>
      </div>
      <div class="float-card warranty"><span class="ic"><?= icon('ShieldCheck') ?></span><div><p style="font-size:.875rem;font-weight:600;line-height:1.2">Quality Assured</p><p style="font-size:.75rem;color:hsl(var(--muted-foreground))">Workmanship warranty</p></div></div>
      <div class="float-card rating">
        <div class="stars" style="display:flex;gap:.1rem;color:hsl(var(--gold))"><?= str_repeat(star_svg(), 5) ?></div>
        <p style="margin-top:.25rem;font-family:'Playfair Display',serif;font-size:1.125rem;font-weight:700;line-height:1">4.9<span style="font-size:.875rem;font-weight:400;color:hsl(var(--muted-foreground))">/5</span></p>
        <p style="font-size:.75rem;color:hsl(var(--muted-foreground))">120+ happy clients</p>
      </div>
    </div>
  </div>
  <span class="sr-only"><?= esc($SITE['tagline']) ?></span>
</section>

<!-- ══ SERVICES ══ -->
<section id="services" class="section" style="position:relative;overflow:hidden">
  <div class="container">
    <div class="services-head">
      <div>
        <span class="eyebrow reveal"><span class="bar"></span><?= esc($content['services']['eyebrow']) ?></span>
        <h2 class="reveal" data-delay="0.05"><?= esc($content['services']['title']) ?></h2>
      </div>
      <div class="reveal left" data-delay="0.1" style="padding-bottom:.5rem">
        <p style="max-width:28rem;color:hsl(var(--muted-foreground))"><?= esc($content['services']['description']) ?></p>
        <div style="margin-top:1.25rem;display:flex;flex-wrap:wrap;align-items:center;gap:.75rem 1.75rem">
          <a href="/projects.php" class="link-gold">View All Services <?= icon('ChevronRight') ?></a>
          <a href="<?= esc($telLink) ?>" class="link-gold">Call For Booking <?= icon('ChevronRight') ?></a>
        </div>
      </div>
    </div>
    <!-- Interactive list (left) + live preview (right) -->
    <div class="svc-layout">
      <div class="svc-list reveal">
        <?php foreach ($SERVICES as $i => $s): ?>
          <button type="button" class="svc-item<?= $i === 0 ? ' active' : '' ?>"
                  data-service='<?= esc(json_encode($s, JSON_UNESCAPED_SLASHES)) ?>'
                  aria-label="View details for <?= esc($s['title']) ?>">
            <span class="ic"><?= icon($s['icon']) ?></span>
            <span style="min-width:0">
              <span class="tt"><?= esc($s['title']) ?> <?= icon('ArrowUpRight') ?></span>
              <span class="sh"><?= esc($s['short']) ?></span>
            </span>
          </button>
        <?php endforeach; ?>
      </div>

      <div class="reveal left">
        <div class="svc-preview-wrap">
          <button type="button" class="svc-preview" id="svcPreview" aria-label="View service details">
            <img id="svcPreviewImg" src="<?= esc($SERVICES[0]['image']) ?>" alt="<?= esc($SERVICES[0]['title']) ?>">
            <span class="veil"></span>
            <span class="label">
              <span class="chip" id="svcPreviewIcon"><?= icon($SERVICES[0]['icon']) ?></span>
              <h3 id="svcPreviewTitle"><?= esc($SERVICES[0]['title']) ?></h3>
              <p id="svcPreviewShort"><?= esc($SERVICES[0]['short']) ?></p>
              <span class="more">View details <?= icon('ArrowUpRight') ?></span>
            </span>
            <span class="accent"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ SERVICES MARQUEE ══ -->
<div class="marquee-band">
  <div class="marquee-mask"><div class="marquee-track" style="--dur:32s"><?php for ($d = 0; $d < 2; $d++): ?><div class="grp"><?php foreach ($marquee_top as $w): ?><span class="word"><?= esc($w) ?></span><span class="sep">✦</span><?php endforeach; ?></div><?php endfor; ?></div></div>
  <div style="height:.75rem"></div>
  <div class="marquee-mask"><div class="marquee-track reverse" style="--dur:38s"><?php for ($d = 0; $d < 2; $d++): ?><div class="grp"><?php foreach ($marquee_bottom as $w): ?><span class="word"><?= esc($w) ?></span><span class="sep">✦</span><?php endforeach; ?></div><?php endfor; ?></div></div>
</div>

<!-- ══ STATEMENT ══ -->
<section class="statement">
  <div class="grid-pattern" style="position:absolute;inset:0;opacity:.25;background-size:46px 46px;-webkit-mask-image:radial-gradient(ellipse at center,black,transparent 70%);mask-image:radial-gradient(ellipse at center,black,transparent 70%)"></div>
  <div class="container" style="position:relative">
    <span class="eyebrow" style="margin-bottom:2rem;display:block"><span class="bar"></span> Our Philosophy</span>
    <p class="reveal-text">
      <?php foreach (explode(' ', $statement_text) as $w):
        $clean = strtolower(preg_replace('/[.,!?]/', '', $w));
        $gold = in_array($clean, $statement_hi, true); ?>
        <span class="w<?= $gold ? ' gold' : '' ?>"><?php if ($gold): ?><span class="text-gradient-gold"><?= esc($w) ?></span><?php else: ?><?= esc($w) ?><?php endif; ?></span>
      <?php endforeach; ?>
    </p>
  </div>
</section>

<!-- ══ STATS ══ -->
<section class="stats">
  <div class="bg"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80" alt=""><div class="veil"></div></div>
  <div class="container">
    <div class="stats-grid">
      <?php foreach ($STATS as $i => $st): ?>
        <div class="stat-item reveal" data-delay="<?= $i * 0.1 ?>">
          <div class="ic"><?= icon($st['icon']) ?></div>
          <div class="num"><span data-counter="<?= (int) $st['value'] ?>" data-suffix="<?= esc($st['suffix']) ?>">0<?= esc($st['suffix']) ?></span></div>
          <p class="lbl"><?= esc($st['label']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ══ PROJECTS PREVIEW (stack) ══ -->
<section id="projects" class="section">
  <div class="container">
    <div style="display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;gap:1.5rem">
      <div class="heading" style="margin:0;max-width:36rem">
        <span class="eyebrow reveal"><span class="bar"></span>Our Work</span>
        <h2 class="reveal" data-delay="0.05">A Portfolio That Speaks for Itself</h2>
        <p class="reveal" data-delay="0.1">From premium residences to landmark commercial facades — explore a selection of our finest projects across Gujarat.</p>
      </div>
      <a href="/projects.php" class="btn btn-outline" style="flex-shrink:0">View All Projects <?= icon('ArrowRight') ?></a>
    </div>
    <div class="proj-stack" data-stack="0.045">
      <?php foreach ($proj_stack as $i => $p): $tot = count($proj_stack); ?>
        <div class="proj-sticky" style="top:calc(6rem + <?= $i * 1.6 ?>rem)" data-i="<?= $i ?>" data-total="<?= $tot ?>">
          <article class="proj-card">
            <div class="grid">
              <div class="img"><img src="<?= esc($p['image']) ?>" alt="<?= esc($p['title']) ?>" loading="lazy"><span class="badge badge-gold">&nbsp;<?= esc($p['category']) ?>&nbsp;</span></div>
              <div class="body">
                <span class="idx">0<?= $i + 1 ?> / 0<?= $tot ?></span>
                <h3><?= esc($p['title']) ?></h3>
                <p class="loc"><?= icon('MapPin') ?><?= esc($p['location']) ?> · <?= esc($p['year']) ?></p>
                <p class="desc"><?= esc($p['description']) ?></p>
                <div class="tagrow"><?php foreach ($p['tags'] as $t): ?><span class="tag"><?= esc($t) ?></span><?php endforeach; ?></div>
                <a href="/projects.php" class="link-gold" style="margin-top:1.75rem">View project <?= icon('ArrowUpRight') ?></a>
              </div>
            </div>
          </article>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ══ PROCESS ══ -->
<section class="section bg-secondary-30">
  <div class="container">
    <div class="heading center">
      <span class="eyebrow reveal"><span class="bar"></span>How We Work</span>
      <h2 class="reveal" data-delay="0.05">From First Visit to Final Handover</h2>
      <p class="reveal" data-delay="0.1">A seamless, transparent process engineered around your peace of mind.</p>
    </div>
    <div class="process-grid">
      <div class="process-media" data-process>
        <div class="sticky">
          <?php foreach ($PROCESS as $i => $step): ?>
            <div class="pslide" data-i="<?= $i ?>" style="opacity:<?= $i === 0 ? 1 : 0 ?>">
              <img src="<?= esc($step['image']) ?>" alt="<?= esc($step['title']) ?>">
              <div class="veil"></div>
              <div class="cap"><p class="s">Step <?= str_pad($i + 1, 2, '0', STR_PAD_LEFT) ?></p><p class="t"><?= esc($step['title']) ?></p></div>
            </div>
          <?php endforeach; ?>
          <div class="pdots"><?php foreach ($PROCESS as $i => $step): ?><span data-i="<?= $i ?>"></span><?php endforeach; ?></div>
        </div>
      </div>
      <ol class="process-steps">
        <?php foreach ($PROCESS as $i => $step): ?>
          <li class="process-step reveal">
            <div class="mimg"><img src="<?= esc($step['image']) ?>" alt="<?= esc($step['title']) ?>" loading="lazy"></div>
            <div class="row">
              <span class="ic"><?= icon($step['icon']) ?></span>
              <div>
                <span class="step">Step <?= str_pad($i + 1, 2, '0', STR_PAD_LEFT) ?></span>
                <h3><?= esc($step['title']) ?></h3>
                <p><?= esc($step['description']) ?></p>
              </div>
            </div>
          </li>
        <?php endforeach; ?>
      </ol>
    </div>
  </div>
</section>

<!-- ══ ESTIMATE TEASER ══ -->
<section class="section bg-secondary-40">
  <div class="container">
    <div class="teaser-box reveal">
      <div class="glow"></div>
      <div class="teaser-grid">
        <div>
          <span class="eyebrow"><?= icon('Sparkles') ?>Smart Quotation Engine</span>
          <h2>Get an Instant Estimate in Under a Minute</h2>
          <p>Pick your product, material and dimensions — our engine calculates a precise, GST-inclusive estimate and generates a professional PDF quotation you can save or share.</p>
          <a href="/estimate.php" class="btn btn-gold btn-xl" style="margin-top:2rem"><?= icon('Calculator') ?>Launch Estimate Calculator</a>
        </div>
        <div class="teaser-features">
          <?php
          $tf = [
              ['Calculator', 'Instant Calculation', 'Live, itemised pricing as you choose options.'],
              ['IndianRupee', 'Transparent Costs', 'Material, labour, transport & GST — no surprises.'],
              ['FileText', 'PDF Quotation', 'Download a professional quote in one click.'],
          ];
          foreach ($tf as $f): ?>
            <div class="teaser-feature reveal left"><div class="ic"><?= icon($f[0]) ?></div><div><h3><?= esc($f[1]) ?></h3><p><?= esc($f[2]) ?></p></div></div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ ABOUT ══ -->
<section id="about" class="section">
  <div class="container">
    <div class="about-grid">
      <div class="about-visual reveal right">
        <div class="pic"><img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80" alt="Veer Aluminium precision manufacturing"><div class="veil"></div></div>
        <div class="exp"><b><?= esc($content['about']['experienceYears']) ?></b><p>Years of<br>Excellence</p></div>
      </div>
      <div>
        <div class="heading" style="max-width:none">
          <span class="eyebrow reveal"><span class="bar"></span><?= esc($content['about']['eyebrow']) ?></span>
          <h2 class="reveal" data-delay="0.05"><?= esc($content['about']['title']) ?></h2>
          <p class="reveal" data-delay="0.1"><?= esc($content['about']['body']) ?></p>
        </div>
        <ul class="about-highlights">
          <?php foreach ($highlights as $i => $h): ?>
            <li class="reveal left" data-delay="<?= $i * 0.05 ?>"><?= icon('CheckCircle2') ?><?= esc($h) ?></li>
          <?php endforeach; ?>
        </ul>
        <div class="timeline">
          <?php foreach ($TIMELINE as $item): ?>
            <div class="item reveal left"><span class="dot"><i></i></span><p class="yr"><?= esc($item['year']) ?></p><h4><?= esc($item['title']) ?></h4><p><?= esc($item['description']) ?></p></div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ WHY CHOOSE ══ -->
<section class="section bg-secondary-40">
  <div class="container">
    <div class="heading center">
      <span class="eyebrow reveal"><span class="bar"></span>Why Choose Us</span>
      <h2 class="reveal" data-delay="0.05">The Veer Standard of Excellence</h2>
      <p class="reveal" data-delay="0.1">We combine 3+ years of focused craftsmanship with modern technology to deliver results that stand the test of time.</p>
    </div>
    <div class="why-stack" data-stack="0.04">
      <?php foreach ($WHY_CHOOSE as $i => $w): $tot = count($WHY_CHOOSE); ?>
        <div class="why-sticky" style="top:calc(7rem + <?= $i * 1.5 ?>rem)" data-i="<?= $i ?>" data-total="<?= $tot ?>">
          <div class="why-card">
            <div class="row">
              <span class="ic"><?= icon($w['icon']) ?></span>
              <div>
                <span class="num">0<?= $i + 1 ?></span>
                <h3><?= esc($w['title']) ?></h3>
                <p><?= esc($w['description']) ?></p>
              </div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ══ TESTIMONIALS ══ -->
<section id="testimonials" class="section bg-secondary-40">
  <div class="container">
    <div class="heading center">
      <span class="eyebrow reveal"><span class="bar"></span>Testimonials</span>
      <h2 class="reveal" data-delay="0.05">Loved by Homeowners &amp; Businesses</h2>
      <p class="reveal" data-delay="0.1">Don't just take our word for it — here's what our clients across Gujarat have to say.</p>
    </div>
    <div class="testi-wrap reveal">
      <div class="testi-card">
        <?php foreach ($TESTIMONIALS as $i => $t): ?>
          <div class="testi-slide<?= $i === 0 ? ' active' : '' ?>">
            <div class="stars"><?= str_repeat(star_svg(), (int) $t['rating']) ?></div>
            <blockquote>“<?= esc($t['quote']) ?>”</blockquote>
            <div class="who">
              <img src="<?= esc($t['image']) ?>" alt="<?= esc($t['name']) ?>">
              <div><b><?= esc($t['name']) ?></b><span><?= esc($t['role']) ?> · <?= esc($t['location']) ?></span></div>
              <?php if (!empty($t['videoUrl'])): ?><span style="margin-left:auto;border-radius:999px;background:hsl(var(--gold)/.1);padding:.25rem .75rem;font-size:.72rem;font-weight:500;color:hsl(var(--gold))">Video Review</span><?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
      <div class="testi-controls">
        <button class="btn btn-outline btn-icon" data-testi-prev aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25rem;height:1.25rem"><path d="m15 18-6-6 6-6"/></svg></button>
        <div class="testi-dots"><?php foreach ($TESTIMONIALS as $i => $t): ?><button class="<?= $i === 0 ? 'active' : '' ?>" aria-label="Go to <?= $i + 1 ?>"></button><?php endforeach; ?></div>
        <button class="btn btn-outline btn-icon" data-testi-next aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25rem;height:1.25rem"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
    </div>
  </div>
</section>

<!-- ══ FAQ ══ -->
<section class="section">
  <div class="container">
    <div class="heading center">
      <span class="eyebrow reveal"><span class="bar"></span>FAQ</span>
      <h2 class="reveal" data-delay="0.05">Questions, Answered</h2>
      <p class="reveal" data-delay="0.1">Everything you need to know before starting your project with us.</p>
    </div>
    <div class="faq reveal">
      <?php foreach ($FAQS as $f): ?>
        <div class="faq-item">
          <button class="faq-q"><?= esc($f['question']) ?><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>
          <div class="faq-a"><?= esc($f['answer']) ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ══ CTA BAND ══ -->
<section class="cta">
  <div class="bg"><img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80" alt=""><div class="veil"></div></div>
  <div class="container">
    <div class="cta-box reveal">
      <span class="eyebrow"><span class="bar"></span>Let's Build Something Premium<span class="bar"></span></span>
      <h2><?= esc($content['cta']['title']) ?></h2>
      <p><?= esc($content['cta']['description']) ?></p>
      <div class="cta-actions">
        <a href="/estimate.php" class="btn btn-gold btn-xl">Get Free Estimate <?= icon('ArrowRight') ?></a>
        <a href="<?= esc($telLink) ?>" class="btn btn-glass btn-xl"><?= icon('Phone') ?> <?= esc($SITE['contact']['phone']) ?></a>
      </div>
    </div>
  </div>
</section>

</main>

<!-- Service detail modal -->
<div class="modal-overlay" id="serviceModal">
  <div class="modal" style="position:relative;padding:0;overflow:hidden">
    <div class="modal-close" data-close-modal="serviceModal">&times;</div>
    <div id="serviceModalBody"></div>
  </div>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/foot.php'; ?>
<script>
(function () {
  var items = document.querySelectorAll('.svc-item');
  var previewBtn = document.getElementById('svcPreview');
  var pImg = document.getElementById('svcPreviewImg');
  var pIcon = document.getElementById('svcPreviewIcon');
  var pTitle = document.getElementById('svcPreviewTitle');
  var pShort = document.getElementById('svcPreviewShort');
  var current = JSON.parse(items[0].getAttribute('data-service'));

  function openServiceModal(s) {
    var feats = s.features.map(function (f) {
      return '<li style="display:flex;align-items:center;gap:.5rem;border-radius:.5rem;background:hsl(var(--secondary));padding:.5rem .75rem;font-size:.875rem"><span style="height:.4rem;width:.4rem;flex-shrink:0;border-radius:50%;background:hsl(var(--gold))"></span>' + f + '</li>';
    }).join('');
    document.getElementById('serviceModalBody').innerHTML =
      '<div style="position:relative;height:14rem;width:100%"><img src="' + s.image + '" alt="' + s.title + '" style="width:100%;height:100%;object-fit:cover"><div style="position:absolute;inset:0;background:linear-gradient(to top,hsl(var(--background)),transparent 70%)"></div></div>' +
      '<div style="padding:1.5rem"><h3 class="title">' + s.title + '</h3>' +
      '<p style="margin-top:.75rem;line-height:1.7;color:hsl(var(--muted-foreground))">' + s.description + '</p>' +
      '<p style="margin-top:1.25rem;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:hsl(var(--muted-foreground))">What\'s included</p>' +
      '<ul style="margin-top:.75rem;display:grid;grid-template-columns:1fr 1fr;gap:.5rem;list-style:none">' + feats + '</ul>' +
      '<div style="margin-top:1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:.75rem">' +
      '<a href="/estimate.php" class="btn btn-gold">Get a Quote</a>' +
      '<a href="<?= esc($telLink) ?>" class="btn btn-outline"><?= icon('Phone') ?> Call Us</a></div></div>';
    window.openModal('serviceModal');
  }

  // Swap the live preview to a service (crossfade), keeping image/icon/text in sync.
  function setPreview(s, iconHTML) {
    current = s;
    pImg.style.opacity = '0';
    setTimeout(function () {
      pImg.src = s.image;
      pImg.alt = s.title;
      if (iconHTML) pIcon.innerHTML = iconHTML;
      pTitle.textContent = s.title;
      pShort.textContent = s.short;
      pImg.style.opacity = '1';
    }, 140);
  }

  items.forEach(function (item) {
    var s = JSON.parse(item.getAttribute('data-service'));
    var activate = function () {
      items.forEach(function (x) { x.classList.remove('active'); });
      item.classList.add('active');
      var ic = item.querySelector('.ic');
      setPreview(s, ic ? ic.innerHTML : null);
    };
    item.addEventListener('mouseenter', activate);
    item.addEventListener('focus', activate);
    item.addEventListener('click', function () { activate(); openServiceModal(s); });
  });

  if (previewBtn) previewBtn.addEventListener('click', function () { openServiceModal(current); });
})();
</script>
