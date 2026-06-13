<?php /** Expects $ph_eyebrow, $ph_title, $ph_desc, $ph_crumbs (array of ['label'=>, 'href'=>?]) */ ?>
<header class="page-header">
  <div class="grid-pattern" style="position:absolute;inset:0;opacity:.4;background-size:40px 40px;-webkit-mask-image:radial-gradient(ellipse at center,black,transparent 75%);mask-image:radial-gradient(ellipse at center,black,transparent 75%)"></div>
  <div class="glow"></div>
  <div class="container" style="position:relative">
    <nav class="crumbs reveal">
      <a href="/index.php">Home</a>
      <?php foreach (($ph_crumbs ?? []) as $c): ?>
        <span style="display:flex;align-items:center;gap:.35rem"><?= icon('ChevronRight') ?><?php if (!empty($c['href'])): ?><a href="<?= esc($c['href']) ?>"><?= esc($c['label']) ?></a><?php else: ?><span style="color:hsl(var(--foreground))"><?= esc($c['label']) ?></span><?php endif; ?></span>
      <?php endforeach; ?>
    </nav>
    <?php if (!empty($ph_eyebrow)): ?><span class="eyebrow reveal" data-delay="0.05" style="margin-top:1.5rem;display:block"><span class="bar"></span><?= esc($ph_eyebrow) ?></span><?php endif; ?>
    <h1 class="reveal" data-delay="0.1"><?= esc($ph_title) ?></h1>
    <?php if (!empty($ph_desc)): ?><p class="reveal" data-delay="0.15"><?= esc($ph_desc) ?></p><?php endif; ?>
  </div>
</header>
