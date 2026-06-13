/* Admin dashboard — fetch analytics and render Chart.js charts (recharts replacement). */
(function () {
  "use strict";
  var COLORS = ["#b8860b", "#1f2937", "#0ea5e9", "#10b981", "#ef4444", "#8b5cf6"];
  function inr(v) { v = Math.round(v || 0); var n = Math.abs(v).toString(); var l3 = n.slice(-3), r = n.slice(0, -3); if (r) r = r.replace(/\B(?=(\d{2})+(?!\d))/g, ","); return "₹" + (v < 0 ? "-" : "") + (r ? r + "," + l3 : l3); }
  function cssvar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  var border = "hsl(" + cssvar("--border") + ")";
  var mutedf = "hsl(" + cssvar("--muted-foreground") + ")";

  fetch("/api/analytics.php").then(function (r) { return r.json(); }).then(function (d) {
    if (!d || d.error) return;
    document.getElementById("sTotal").textContent = d.totalLeads;
    document.getElementById("sMonth").textContent = d.monthlyLeads;
    document.getElementById("sConv").textContent = d.conversionRate + "%";
    document.getElementById("sRev").textContent = inr(d.revenueEstimate);
    document.getElementById("sMost").textContent = d.mostRequested;

    Chart.defaults.color = mutedf;
    Chart.defaults.font.family = "Inter, sans-serif";

    new Chart(document.getElementById("monthlyChart"), {
      type: "line",
      data: {
        labels: d.monthly.map(function (m) { return m.month; }),
        datasets: [
          { label: "Leads", data: d.monthly.map(function (m) { return m.leads; }), borderColor: "#b8860b", backgroundColor: "#b8860b", borderWidth: 3, tension: .35, pointRadius: 4 },
          { label: "Converted", data: d.monthly.map(function (m) { return m.converted; }), borderColor: "#10b981", backgroundColor: "#10b981", borderWidth: 3, tension: .35, pointRadius: 4 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { color: border } }, y: { grid: { color: border }, ticks: { precision: 0 } } } }
    });

    var pop = d.servicePopularity.slice(0, 6);
    new Chart(document.getElementById("popChart"), {
      type: "doughnut",
      data: { labels: pop.map(function (p) { return p.name; }), datasets: [{ data: pop.map(function (p) { return p.value; }), backgroundColor: COLORS, borderWidth: 2, borderColor: "hsl(" + cssvar("--card") + ")" }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: "55%", plugins: { legend: { position: "bottom" } } }
    });

    new Chart(document.getElementById("funnelChart"), {
      type: "bar",
      data: { labels: d.funnel.map(function (f) { return f.status; }), datasets: [{ data: d.funnel.map(function (f) { return f.count; }), backgroundColor: "#b8860b", borderRadius: 6 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: border }, ticks: { precision: 0 } } } }
    });
  });
})();
