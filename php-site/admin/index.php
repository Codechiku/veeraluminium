<?php
require_once __DIR__ . '/../includes/helpers.php';
require_admin();
$admin_active = 'dashboard';
$admin_scripts = '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script><script src="/admin/dashboard.js"></script>';
require __DIR__ . '/includes/shell-top.php';
?>
<div class="stack">
  <div>
    <h1>Dashboard</h1>
    <p style="font-size:.875rem;color:hsl(var(--muted-foreground))">Overview of leads, conversions and demand.</p>
  </div>

  <div class="cards-4">
    <div class="stat-card"><div class="top"><span style="font-size:.875rem;color:hsl(var(--muted-foreground))">Total Leads</span><span class="ic"><?= icon('Users') ?></span></div><p class="v" id="sTotal">—</p><p class="h">All-time enquiries</p></div>
    <div class="stat-card"><div class="top"><span style="font-size:.875rem;color:hsl(var(--muted-foreground))">This Month</span><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25rem;height:1.25rem"><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg></span></div><p class="v" id="sMonth">—</p><p class="h">New leads this month</p></div>
    <div class="stat-card"><div class="top"><span style="font-size:.875rem;color:hsl(var(--muted-foreground))">Conversion Rate</span><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25rem;height:1.25rem"><path d="M19 5 5 19M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg></span></div><p class="v" id="sConv">—</p><p class="h">Leads converted</p></div>
    <div class="stat-card accent"><div class="top"><span style="font-size:.875rem;color:hsl(var(--muted-foreground))">Revenue Estimate</span><span class="ic"><?= icon('IndianRupee') ?></span></div><p class="v" id="sRev">—</p><p class="h">Weighted pipeline</p></div>
  </div>

  <div class="charts-3">
    <div class="panel"><h2>Monthly Enquiries</h2><p class="sub">Leads vs conversions over the last 6 months</p><div style="height:18rem"><canvas id="monthlyChart"></canvas></div></div>
    <div class="panel"><h2>Service Popularity</h2><p class="sub">Most requested</p><div style="height:18rem"><canvas id="popChart"></canvas></div></div>
  </div>

  <div class="charts-3">
    <div class="panel"><h2>Lead Status Funnel</h2><p class="sub">Pipeline distribution</p><div style="height:16rem"><canvas id="funnelChart"></canvas></div></div>
    <div class="panel"><h2>Most Requested Product</h2>
      <div style="margin-top:1.5rem;display:flex;flex-direction:column;align-items:center;text-align:center">
        <div style="display:flex;height:4rem;width:4rem;align-items:center;justify-content:center;border-radius:1rem;background:hsl(var(--gold)/.1);color:hsl(var(--gold))"><?= icon('Award') ?></div>
        <p class="font-display" id="sMost" style="margin-top:1rem;font-size:1.25rem;font-weight:700">—</p>
        <p style="margin-top:.25rem;font-size:.875rem;color:hsl(var(--muted-foreground))">Top demand this period</p>
      </div>
    </div>
  </div>
</div>
<?php require __DIR__ . '/includes/shell-bottom.php'; ?>
