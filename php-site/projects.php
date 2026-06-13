<?php
require_once __DIR__ . '/includes/helpers.php';
global $SITE, $PROJECTS, $PROJECT_CATEGORIES, $telLink;

$content = resolved_content();
$page_title = 'Our Projects | Aluminium, Glass & Fabrication Portfolio';
$page_desc = "Explore Veer Aluminium's portfolio of residential, commercial and industrial projects — windows, structural glazing, ACP cladding, railings and custom fabrication across Gujarat.";

// sorted by year desc (gallery default)
$list = $PROJECTS;
usort($list, fn($a, $b) => $b['year'] - $a['year']);

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/navbar.php';

$ph_eyebrow = 'Portfolio';
$ph_title = 'Projects That Define Excellence';
$ph_desc = 'A showcase of precision-engineered spaces across Gujarat. Filter by category, compare before & after, and explore the details.';
$ph_crumbs = [['label' => 'Projects']];
require __DIR__ . '/includes/page-header.php';
?>
<main>
<section class="section">
  <div class="container">
    <!-- Filters -->
    <div class="filters">
      <?php foreach (array_merge(['All'], $PROJECT_CATEGORIES) as $i => $cat): ?>
        <button class="filter-btn<?= $i === 0 ? ' active' : '' ?>" data-cat="<?= esc($cat) ?>"><?= esc($cat) ?></button>
      <?php endforeach; ?>
    </div>

    <!-- Masonry gallery -->
    <div class="masonry" id="gallery">
      <?php foreach ($list as $p): ?>
        <div class="gal-item" data-cat="<?= esc($p['category']) ?>">
          <button class="gal-btn" data-id="<?= esc($p['id']) ?>">
            <div class="gal-media <?= esc($p['size']) ?>">
              <img src="<?= esc($p['image']) ?>" alt="<?= esc($p['title']) ?>" loading="lazy">
              <div class="veil"></div>
              <div class="top"><span class="badge badge-gold">&nbsp;<?= esc($p['category']) ?>&nbsp;</span></div>
              <div class="cap">
                <h3><?= esc($p['title']) ?></h3>
                <p><?= icon('MapPin') ?><?= esc($p['location']) ?> · <?= esc($p['year']) ?></p>
              </div>
            </div>
          </button>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CTA BAND -->
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

<!-- Project detail modal -->
<div class="modal-overlay" id="projModal">
  <div class="modal lg" style="position:relative;padding:0;overflow:hidden">
    <div id="projModalBody"></div>
  </div>
</div>

<script>window.__PROJECTS__ = <?= json_encode($list, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;</script>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/foot.php'; ?>
