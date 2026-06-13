<?php
require_once __DIR__ . '/../includes/helpers.php';
require_admin();
$admin_active = 'leads';
$admin_scripts = '<script src="/admin/leads.js"></script>';
require __DIR__ . '/includes/shell-top.php';
?>
<div class="stack">
  <div class="flex-between">
    <div><h1>Leads</h1><p style="font-size:.875rem;color:hsl(var(--muted-foreground))"><span id="leadCount">0</span> total enquiries</p></div>
    <button class="btn btn-outline btn-sm" id="refreshBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg> Refresh</button>
  </div>

  <div style="display:flex;flex-wrap:wrap;align-items:center;gap:.75rem">
    <div style="position:relative;flex:1;min-width:220px">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);width:1rem;height:1rem;color:hsl(var(--muted-foreground))"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input id="searchInput" placeholder="Search name, phone, email..." style="padding-left:2.25rem">
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:.4rem" id="statusFilters"></div>
  </div>

  <div class="table-wrap">
    <div class="table-scroll">
      <table class="leads">
        <thead><tr><th>Contact</th><th>Project</th><th>Est. Cost</th><th>Status</th><th>Date</th><th></th></tr></thead>
        <tbody id="leadsBody"><tr><td colspan="6" style="padding:3rem;text-align:center;color:hsl(var(--muted-foreground))">Loading leads...</td></tr></tbody>
      </table>
    </div>
  </div>
</div>
<?php require __DIR__ . '/includes/shell-bottom.php'; ?>
