<?php
require_once __DIR__ . '/includes/helpers.php';
header('Content-Type: application/xml; charset=utf-8');
$base = rtrim($SITE['url'], '/');
$routes = [
    ['/', '1.0', 'weekly'],
    ['/projects.php', '0.9', 'weekly'],
    ['/estimate.php', '0.95', 'monthly'],
    ['/contact.php', '0.8', 'monthly'],
];
$now = date('c');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($routes as $r): ?>
  <url>
    <loc><?= esc($base . $r[0]) ?></loc>
    <lastmod><?= esc($now) ?></lastmod>
    <changefreq><?= esc($r[2]) ?></changefreq>
    <priority><?= esc($r[1]) ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
