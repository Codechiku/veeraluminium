/* Admin leads — list, search, filter, status update, delete. */
(function () {
  "use strict";
  var STATUSES = ["NEW", "CONTACTED", "QUOTE_SENT", "CONVERTED", "LOST"];
  var variant = { NEW: "warning", CONTACTED: "secondary", QUOTE_SENT: "gold", CONVERTED: "success", LOST: "destructive" };
  var leads = [], query = "", filter = "ALL";

  function inr(v) { if (!v) return "—"; v = Math.round(v); var n = Math.abs(v).toString(); var l3 = n.slice(-3), r = n.slice(0, -3); if (r) r = r.replace(/\B(?=(\d{2})+(?!\d))/g, ","); return "₹" + (r ? r + "," + l3 : l3); }
  function fdate(s) { var d = new Date(s); return isNaN(d) ? s : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
  function esc(s) { return (s == null ? "" : String(s)).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function filters() {
    var wrap = document.getElementById("statusFilters");
    wrap.innerHTML = ["ALL"].concat(STATUSES).map(function (s) {
      return '<button class="filter-btn' + (filter === s ? " active" : "") + '" data-s="' + s + '" style="padding:.4rem .75rem;font-size:.72rem">' + s.replace("_", " ") + '</button>';
    }).join("");
    wrap.querySelectorAll("[data-s]").forEach(function (b) { b.addEventListener("click", function () { filter = b.getAttribute("data-s"); filters(); render(); }); });
  }

  function render() {
    document.getElementById("leadCount").textContent = leads.length;
    var list = leads.filter(function (l) {
      var mq = !query || [l.name, l.phone, l.email, l.projectType].filter(Boolean).some(function (v) { return v.toLowerCase().indexOf(query.toLowerCase()) > -1; });
      var mf = filter === "ALL" || l.status === filter;
      return mq && mf;
    });
    var body = document.getElementById("leadsBody");
    if (!list.length) { body.innerHTML = '<tr><td colspan="6" style="padding:3rem;text-align:center;color:hsl(var(--muted-foreground))">No leads found.</td></tr>'; return; }
    body.innerHTML = list.map(function (l) {
      var opts = STATUSES.map(function (s) { return '<option value="' + s + '"' + (l.status === s ? " selected" : "") + '>' + s.replace("_", " ") + "</option>"; }).join("");
      return '<tr>' +
        '<td><p style="font-weight:500">' + esc(l.name) + '</p><div style="margin-top:.15rem;display:flex;flex-direction:column;gap:.15rem">' +
        '<a class="chip-link" href="tel:' + esc(l.phone) + '">' + esc(l.phone) + '</a>' +
        (l.email ? '<a class="chip-link" href="mailto:' + esc(l.email) + '">' + esc(l.email) + '</a>' : '') + '</div></td>' +
        '<td><p>' + esc(l.projectType || "—") + '</p>' + (l.source ? '<p style="font-size:.72rem;color:hsl(var(--muted-foreground))">via ' + esc(l.source) + '</p>' : '') + '</td>' +
        '<td style="font-weight:500;font-variant-numeric:tabular-nums">' + inr(l.estimatedCost) + '</td>' +
        '<td><div style="display:flex;flex-direction:column;gap:.4rem"><span class="badge badge-' + (variant[l.status] || "secondary") + '">' + l.status.replace("_", " ") + '</span>' +
        '<select data-status="' + l.id + '" style="height:auto;padding:.25rem .5rem;font-size:.72rem;width:auto">' + opts + '</select></div></td>' +
        '<td style="color:hsl(var(--muted-foreground))">' + fdate(l.createdAt) + '</td>' +
        '<td><button class="btn btn-ghost btn-icon" data-del="' + l.id + '" style="height:2rem;width:2rem;color:hsl(var(--destructive))"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></td></tr>';
    }).join("");
    body.querySelectorAll("[data-status]").forEach(function (sel) {
      sel.addEventListener("change", function () { updateStatus(sel.getAttribute("data-status"), sel.value); });
    });
    body.querySelectorAll("[data-del]").forEach(function (b) {
      b.addEventListener("click", function () { remove(b.getAttribute("data-del")); });
    });
  }

  function load() {
    fetch("/api/leads.php").then(function (r) { return r.json(); }).then(function (d) { leads = d.leads || []; render(); });
  }
  async function updateStatus(id, status) {
    leads = leads.map(function (l) { return l.id === id ? Object.assign({}, l, { status: status }) : l; });
    render();
    var res = await fetch("/api/lead-update.php?_method=PATCH&id=" + encodeURIComponent(id), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: status }) });
    if (res.ok) window.toast("success", "Status updated"); else window.toast("error", "Update failed");
  }
  async function remove(id) {
    if (!confirm("Delete this lead permanently?")) return;
    leads = leads.filter(function (l) { return l.id !== id; }); render();
    await fetch("/api/lead-update.php?_method=DELETE&id=" + encodeURIComponent(id), { method: "POST" });
    window.toast("success", "Lead deleted");
  }

  document.getElementById("searchInput").addEventListener("input", function (e) { query = e.target.value; render(); });
  document.getElementById("refreshBtn").addEventListener("click", load);
  filters(); load();
})();
