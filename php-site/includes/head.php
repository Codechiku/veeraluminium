<?php
/** Opening <head> + <body>. Expects optional $page_title, $page_desc, $json_ld. */
require_once __DIR__ . '/helpers.php';
global $SITE;
$page_title = $page_title ?? ($SITE['name'] . ' | Aluminium, Glass & Fabrication Experts in Palanpur');
$page_desc = $page_desc ?? $SITE['description'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
  <title><?= esc($page_title) ?></title>
  <meta name="description" content="<?= esc($page_desc) ?>">
  <meta name="theme-color" content="#0a0a0a">
  <link rel="icon" href="/logo.png" type="image/png">
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?= esc($page_title) ?>">
  <meta property="og:description" content="<?= esc($page_desc) ?>">
  <meta property="og:site_name" content="<?= esc($SITE['name']) ?>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script>
    // Apply theme before paint to avoid flash.
    (function () {
      try {
        var t = localStorage.getItem('veer-theme');
        if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  </script>
  <?php if (!empty($json_ld)): ?>
  <script type="application/ld+json"><?= json_encode($json_ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?></script>
  <?php endif; ?>
</head>
<body>
<div class="scroll-progress" id="scrollProgress"></div>
