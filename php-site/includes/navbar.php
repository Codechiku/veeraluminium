<?php global $SITE, $NAV_LINKS, $telLink; ?>
<header class="navbar" id="navbar">
  <nav class="container">
    <a href="/index.php" class="logo" aria-label="<?= esc($SITE['name']) ?>">
      <img src="/logo.png" alt="<?= esc($SITE['name']) ?>">
      <span class="word"><b>VEER</b><span>Aluminium</span></span>
    </a>

    <div class="nav-links">
      <?php foreach ($NAV_LINKS as $l): ?>
        <a href="<?= esc($l['href']) ?>"><?= esc($l['label']) ?></a>
      <?php endforeach; ?>
    </div>

    <div class="nav-actions">
      <button class="icon-btn" id="themeToggleDesktop" aria-label="Toggle theme"><?= theme_icon() ?></button>
      <a href="<?= esc($telLink) ?>" class="btn btn-ghost btn-sm"><?= icon('Phone') ?> Call</a>
      <a href="/estimate.php" class="btn btn-gold btn-sm">Get Free Estimate</a>
    </div>

    <div class="nav-mobile-controls">
      <button class="icon-btn" id="themeToggleMobile" aria-label="Toggle theme"><?= theme_icon() ?></button>
      <button class="icon-btn" id="menuToggle" aria-label="Open menu">
        <svg id="menuIconOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:1.5rem;height:1.5rem"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
        <svg id="menuIconClose" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:1.5rem;height:1.5rem;display:none"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <div class="container inner">
      <?php foreach ($NAV_LINKS as $l): ?>
        <a href="<?= esc($l['href']) ?>" class="mlink"><?= esc($l['label']) ?></a>
      <?php endforeach; ?>
      <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.75rem">
        <a href="/estimate.php" class="btn btn-gold btn-lg">Get Free Estimate</a>
        <a href="<?= esc($telLink) ?>" class="btn btn-outline btn-lg"><?= icon('Phone') ?> <?= esc($SITE['contact']['phone']) ?></a>
      </div>
    </div>
  </div>
</header>
<?php
function theme_icon()
{
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.2rem;height:1.2rem"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
}
