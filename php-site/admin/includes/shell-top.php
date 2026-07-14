<?php
/** Admin shell top — sidebar + header. Expects $admin_active (dashboard|leads|pricing|content) and prior require_admin(). */
require_once __DIR__ . '/../../includes/helpers.php';
$session = get_session();
$admin_active = $admin_active ?? 'dashboard';
$nav = [
    ['key' => 'dashboard', 'href' => '/admin/index.php', 'label' => 'Dashboard', 'icon' => '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'],
    ['key' => 'leads', 'href' => '/admin/leads.php', 'label' => 'Leads', 'icon' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>'],
    ['key' => 'pricing', 'href' => '/admin/pricing.php', 'label' => 'Pricing', 'icon' => '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a6 6 0 0 0 0-12"/>'],
    ['key' => 'content', 'href' => '/admin/content.php', 'label' => 'Content', 'icon' => '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v5h5"/>'],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin · <?= esc(ucfirst($admin_active)) ?> · Veer Aluminium</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-icon.png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <link rel="stylesheet" href="/admin/admin.css">
  <script>(function(){try{var t=localStorage.getItem('veer-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();</script>
</head>
<body>
<div class="admin-wrap">
  <aside class="admin-sidebar" id="adminSidebar">
    <div class="admin-brand">
      <a href="/admin/index.php" class="logo"><img src="/logo.png" alt="Veer"><span class="word"><b>VEER</b><span>Aluminium</span></span></a>
      <button class="icon-btn admin-close" id="sidebarClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25rem;height:1.25rem"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    </div>
    <nav class="admin-nav">
      <?php foreach ($nav as $item): ?>
        <a href="<?= esc($item['href']) ?>" class="<?= $admin_active === $item['key'] ? 'active' : '' ?>">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.15rem;height:1.15rem"><?= $item['icon'] ?></svg>
          <?= esc($item['label']) ?>
        </a>
      <?php endforeach; ?>
    </nav>
    <div class="admin-user">
      <div class="row"><div class="av"><?= esc(substr($session['name'], 0, 1)) ?></div><div style="min-width:0"><p style="font-size:.875rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><?= esc($session['name']) ?></p><p style="font-size:.72rem;color:hsl(var(--muted-foreground));white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><?= esc($session['email']) ?></p></div></div>
      <button class="btn btn-outline btn-sm btn-block" id="logoutBtn" style="justify-content:flex-start"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg> Sign out</button>
    </div>
  </aside>
  <div class="admin-overlay" id="adminOverlay"></div>

  <div class="admin-main">
    <header class="admin-header">
      <button class="icon-btn admin-menu" id="sidebarOpen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.5rem;height:1.5rem"><path d="M4 12h16M4 6h16M4 18h16"/></svg></button>
      <div style="display:flex;align-items:center;gap:.5rem;margin-left:auto">
        <span style="font-size:.875rem;color:hsl(var(--muted-foreground))" class="hide-sm">Enterprise CMS</span>
        <button class="icon-btn" id="adminTheme" aria-label="Toggle theme"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.2rem;height:1.2rem"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg></button>
        <a href="/index.php" target="_blank" class="btn btn-ghost btn-sm">View Site</a>
      </div>
    </header>
    <main class="admin-content">
