/* Admin pricing — collect rate inputs into a config and PUT to the API. */
(function () {
  "use strict";
  var DEFAULTS = window.__DEFAULT_PRICING__;
  var dirty = false;
  var banner = document.getElementById("dirtyBanner");

  function setNested(obj, path, val) {
    var keys = path.split("."), o = obj;
    for (var i = 0; i < keys.length - 1; i++) { if (o[keys[i]] == null || typeof o[keys[i]] !== "object") o[keys[i]] = {}; o = o[keys[i]]; }
    o[keys[keys.length - 1]] = val;
  }
  function getNested(obj, path) { return path.split(".").reduce(function (o, k) { return o && o[k]; }, obj); }

  function collect() {
    var cfg = JSON.parse(JSON.stringify(DEFAULTS));
    document.querySelectorAll("[data-rate]").forEach(function (inp) {
      var v = Number(inp.value); if (!isFinite(v)) v = 0;
      setNested(cfg, inp.getAttribute("data-rate"), v);
    });
    return cfg;
  }

  function markDirty() { dirty = true; banner.style.display = "block"; }
  document.querySelectorAll("[data-rate]").forEach(function (inp) { inp.addEventListener("input", markDirty); });

  async function save() {
    try {
      var res = await fetch("/api/pricing.php?_method=PUT", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(collect()) });
      if (!res.ok) throw new Error();
      window.toast("success", "Pricing saved", "The estimate calculator now uses these rates.");
      dirty = false; banner.style.display = "none";
    } catch (e) { window.toast("error", "Could not save pricing"); }
  }
  document.getElementById("saveBtn").addEventListener("click", save);
  document.getElementById("saveBtn2").addEventListener("click", save);

  document.getElementById("resetBtn").addEventListener("click", function () {
    document.querySelectorAll("[data-rate]").forEach(function (inp) {
      var v = getNested(DEFAULTS, inp.getAttribute("data-rate"));
      if (v != null) inp.value = v;
    });
    markDirty();
    window.toast("info", "Reset to default rates", "Remember to Save to apply.");
  });
})();
