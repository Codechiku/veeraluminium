/* Admin content — collect fields into the SiteContent shape and PUT. */
(function () {
  "use strict";
  var DEFAULTS = window.__DEFAULT_CONTENT__;
  var KEY = window.__CONTENT_KEY__;
  var dirty = false;
  var banner = document.getElementById("dirtyBanner");

  function collect() {
    var c = JSON.parse(JSON.stringify(DEFAULTS));
    document.querySelectorAll("[data-c]").forEach(function (el) {
      var parts = el.getAttribute("data-c").split(".");
      if (!c[parts[0]]) c[parts[0]] = {};
      c[parts[0]][parts[1]] = el.value;
    });
    return c;
  }
  function markDirty() { dirty = true; banner.style.display = "block"; }
  document.querySelectorAll("[data-c]").forEach(function (el) { el.addEventListener("input", markDirty); });

  document.getElementById("saveBtn").addEventListener("click", async function () {
    try {
      var res = await fetch("/api/content.php?_method=PUT", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: KEY, value: collect() }) });
      if (!res.ok) throw new Error();
      window.toast("success", "Content saved", "Your website homepage has been updated.");
      dirty = false; banner.style.display = "none";
    } catch (e) { window.toast("error", "Could not save content"); }
  });

  document.getElementById("resetBtn").addEventListener("click", function () {
    document.querySelectorAll("[data-c]").forEach(function (el) {
      var parts = el.getAttribute("data-c").split(".");
      if (DEFAULTS[parts[0]] && DEFAULTS[parts[0]][parts[1]] != null) el.value = DEFAULTS[parts[0]][parts[1]];
    });
    markDirty();
    window.toast("info", "Reset to default content", "Save to apply.");
  });
})();
