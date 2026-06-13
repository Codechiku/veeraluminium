/* Veer Aluminium — global interactivity (vanilla JS port of the React behaviours). */
(function () {
  "use strict";

  /* ── Theme toggle ─────────────────────────────────────── */
  function setTheme(dark) {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("veer-theme", dark ? "dark" : "light"); } catch (e) {}
  }
  ["themeToggleDesktop", "themeToggleMobile"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("click", function () {
      setTheme(!document.documentElement.classList.contains("dark"));
    });
  });

  /* ── Navbar scroll state ──────────────────────────────── */
  var navbar = document.getElementById("navbar");
  function onScrollNav() { if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 24); }
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ── Mobile menu ──────────────────────────────────────── */
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  var iconOpen = document.getElementById("menuIconOpen");
  var iconClose = document.getElementById("menuIconClose");
  function setMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (iconOpen) iconOpen.style.display = open ? "none" : "block";
    if (iconClose) iconClose.style.display = open ? "block" : "none";
  }
  if (menuToggle) menuToggle.addEventListener("click", function () {
    setMenu(!mobileMenu.classList.contains("open"));
  });
  if (mobileMenu) mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  /* ── Scroll progress bar ──────────────────────────────── */
  var bar = document.getElementById("scrollProgress");
  function onScrollProgress() {
    if (!bar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  }
  onScrollProgress();
  window.addEventListener("scroll", onScrollProgress, { passive: true });

  /* ── Scroll-to-top floating button ────────────────────── */
  var topBtn = document.getElementById("scrollTop");
  window.addEventListener("scroll", function () {
    if (topBtn) topBtn.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  if (topBtn) topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ── Reveal on scroll (IntersectionObserver) ──────────── */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var d = e.target.getAttribute("data-delay");
          if (d) e.target.style.transitionDelay = d + "s";
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ── Statement: word-by-word brighten on scroll ───────── */
  var statement = document.querySelector(".statement .reveal-text");
  if (statement) {
    var words = statement.querySelectorAll(".w");
    function onScrollStatement() {
      var rect = statement.getBoundingClientRect();
      var vh = window.innerHeight;
      // progress 0 when top at 85% vh, 1 when top at 25% vh
      var p = (vh * 0.85 - rect.top) / (vh * 0.6);
      p = Math.min(1, Math.max(0, p));
      var lit = Math.floor(p * words.length + 0.5);
      words.forEach(function (w, i) { w.classList.toggle("lit", i < lit); });
    }
    onScrollStatement();
    window.addEventListener("scroll", onScrollStatement, { passive: true });
  }

  /* ── Scroll-stacking cards + scrollytelling (framer-motion port) ──────── */
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Progress 0→1 over an element, equivalent to framer offset ["start start","end end"].
  function elementProgress(el) {
    var rect = el.getBoundingClientRect();
    var range = rect.height - window.innerHeight;
    if (range <= 0) return rect.top <= 0 ? 1 : 0;
    return Math.min(1, Math.max(0, -rect.top / range));
  }
  // Piecewise-linear interpolation across stops (framer useTransform with arrays).
  function interp(p, xs, ys) {
    if (p <= xs[0]) return ys[0];
    if (p >= xs[xs.length - 1]) return ys[ys.length - 1];
    for (var i = 1; i < xs.length; i++) {
      if (p <= xs[i]) {
        var t = (p - xs[i - 1]) / (xs[i] - xs[i - 1] || 1);
        return ys[i - 1] + t * (ys[i] - ys[i - 1]);
      }
    }
    return ys[ys.length - 1];
  }

  var stacks = Array.prototype.slice.call(document.querySelectorAll("[data-stack]"));
  var processEls = Array.prototype.slice.call(document.querySelectorAll("[data-process]"));

  function updateStacks() {
    // Each later card scales down slightly as cards stack on top (origin top).
    stacks.forEach(function (container) {
      var k = parseFloat(container.getAttribute("data-stack")) || 0.04;
      var p = elementProgress(container);
      container.querySelectorAll("[data-i]").forEach(function (wrap) {
        var card = wrap.firstElementChild;
        if (!card) return;
        var i = parseInt(wrap.getAttribute("data-i"), 10);
        var total = parseInt(wrap.getAttribute("data-total"), 10);
        var start = i / total;
        var scale = interp(p, [start, 1], [1, 1 - (total - i) * k]);
        card.style.transform = "scale(" + scale.toFixed(4) + ")";
      });
    });
  }

  function updateProcess() {
    processEls.forEach(function (container) {
      var slides = container.querySelectorAll(".pslide");
      var dots = container.querySelectorAll(".pdots span");
      var total = slides.length;
      if (!total) return;
      var grid = container.closest(".process-grid") || container;
      var p = elementProgress(grid);
      var seg = 1 / total;
      slides.forEach(function (slide, i) {
        var start = i * seg;
        var xs = [start - seg * 0.5, start, start + seg, start + seg * 1.5].map(function (v) { return Math.min(1, Math.max(0, v)); });
        var ys = i === 0 ? [1, 1, 1, 0] : (i === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
        slide.style.opacity = interp(p, xs, ys).toFixed(3);
        var img = slide.querySelector("img");
        if (img) img.style.transform = "scale(" + interp(p, [start, start + seg], [1.08, 1]).toFixed(4) + ")";
      });
      dots.forEach(function (dot, i) {
        dot.style.width = interp(p, [i * seg, i * seg + seg], [8, 28]).toFixed(1) + "px";
        var g = interp(p, [i * seg, i * seg + seg * 0.5], [0, 1]);
        dot.style.background = g <= 0 ? "rgba(255,255,255,0.4)" : "rgb(184,134,11)";
      });
    });
  }

  if (!prefersReduced && (stacks.length || processEls.length)) {
    var ticking = false;
    function onStackScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { updateStacks(); updateProcess(); ticking = false; });
    }
    updateStacks(); updateProcess();
    window.addEventListener("scroll", onStackScroll, { passive: true });
    window.addEventListener("resize", onStackScroll, { passive: true });
  }

  /* ── Animated counters ────────────────────────────────── */
  function formatNumberIN(n) { return n.toLocaleString("en-IN"); }
  var counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.getAttribute("data-counter"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var start = null, dur = 1800;
        function step(ts) {
          if (!start) start = ts;
          var prog = Math.min((ts - start) / dur, 1);
          var val = Math.round((1 - Math.pow(1 - prog, 3)) * target);
          el.textContent = formatNumberIN(val) + suffix;
          if (prog < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ── Testimonials slider ──────────────────────────────── */
  var testi = document.getElementById("testimonials");
  if (testi) {
    var slides = testi.querySelectorAll(".testi-slide");
    var dots = testi.querySelectorAll(".testi-dots button");
    var idx = 0, timer;
    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("active", k === idx); });
      dots.forEach(function (d, k) { d.classList.toggle("active", k === idx); });
    }
    function auto() { timer = setInterval(function () { show(idx + 1); }, 6000); }
    function reset() { clearInterval(timer); auto(); }
    var prev = testi.querySelector("[data-testi-prev]");
    var next = testi.querySelector("[data-testi-next]");
    if (prev) prev.addEventListener("click", function () { show(idx - 1); reset(); });
    if (next) next.addEventListener("click", function () { show(idx + 1); reset(); });
    dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); reset(); }); });
    show(0); auto();
  }

  /* ── FAQ accordion ────────────────────────────────────── */
  document.querySelectorAll(".faq-item .faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("open"); });
      if (!isOpen) item.classList.add("open");
    });
  });

  /* ── Before/After sliders ─────────────────────────────── */
  document.querySelectorAll(".ba").forEach(function (ba) {
    var before = ba.querySelector(".before");
    var handle = ba.querySelector(".handle");
    var beforeImg = before ? before.querySelector("img") : null;
    var dragging = false;
    function setW() { if (beforeImg) beforeImg.style.setProperty("--baw", ba.offsetWidth + "px"); }
    function update(clientX) {
      var rect = ba.getBoundingClientRect();
      var pos = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      before.style.width = pos + "%";
      handle.style.left = pos + "%";
    }
    setW(); window.addEventListener("resize", setW);
    ba.addEventListener("mousedown", function (e) { dragging = true; update(e.clientX); });
    window.addEventListener("mousemove", function (e) { if (dragging) update(e.clientX); });
    window.addEventListener("mouseup", function () { dragging = false; });
    ba.addEventListener("touchstart", function (e) { update(e.touches[0].clientX); });
    ba.addEventListener("touchmove", function (e) { update(e.touches[0].clientX); });
  });

  /* ── Generic modals ───────────────────────────────────── */
  window.openModal = function (id) {
    var m = document.getElementById(id);
    if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; }
  };
  window.closeModal = function (id) {
    var m = document.getElementById(id);
    if (m) { m.classList.remove("open"); document.body.style.overflow = ""; }
  };
  document.querySelectorAll(".modal-overlay").forEach(function (ov) {
    ov.addEventListener("mousedown", function (e) { if (e.target === ov) { ov.classList.remove("open"); document.body.style.overflow = ""; } });
  });
  document.querySelectorAll("[data-close-modal]").forEach(function (b) {
    b.addEventListener("click", function () { window.closeModal(b.getAttribute("data-close-modal")); });
  });

  /* ── Projects gallery: filter + detail dialog ─────────── */
  var gallery = document.getElementById("gallery");
  if (gallery) {
    var projects = window.__PROJECTS__ || [];
    document.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-cat");
        document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        gallery.querySelectorAll(".gal-item").forEach(function (it) {
          var show = cat === "All" || it.getAttribute("data-cat") === cat;
          it.style.display = show ? "" : "none";
        });
      });
    });
    gallery.querySelectorAll(".gal-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-id");
        var p = projects.find(function (x) { return x.id === id; });
        if (!p) return;
        var body = document.getElementById("projModalBody");
        body.innerHTML =
          '<div class="modal-close" data-x>&times;</div>' +
          '<div style="width:100%;background:hsl(var(--secondary))"><img src="' + p.image + '" alt="' + p.title + '" style="display:block;width:100%;height:auto;max-height:70vh;object-fit:contain;margin:0 auto"></div>' +
          '<div style="padding:1.5rem">' +
          '<span class="badge badge-gold">' + p.category + '</span>' +
          '<h3 class="title" style="margin-top:.75rem">' + p.title + '</h3>' +
          '<p style="margin-top:.25rem;display:flex;align-items:center;gap:.25rem;font-size:.875rem;color:hsl(var(--muted-foreground))">' + p.location + ' · ' + p.year + '</p>' +
          '<p style="margin-top:1rem;font-size:.9rem;line-height:1.7;color:hsl(var(--muted-foreground))">' + p.description + '</p>' +
          '<div class="tagrow">' + p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join("") + '</div>' +
          '</div>';
        var x = body.querySelector("[data-x]");
        if (x) x.addEventListener("click", function () { window.closeModal("projModal"); });
        window.openModal("projModal");
      });
    });
  }

  /* ── Toast helper ─────────────────────────────────────── */
  window.toast = function (type, title, desc) {
    var wrap = document.getElementById("toastWrap");
    if (!wrap) return;
    var t = document.createElement("div");
    t.className = "toast " + (type || "");
    t.innerHTML = "<b>" + title + "</b>" + (desc ? "<span>" + desc + "</span>" : "");
    wrap.appendChild(t);
    setTimeout(function () { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(function () { t.remove(); }, 300); }, 3800);
  };
})();
