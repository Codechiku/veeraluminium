/* Estimate calculator — JS port of estimate-calculator.tsx + pricing.ts + pdf.ts */
(function () {
  "use strict";

  var pricing = window.__PRICING__;
  var OPT = window.__OPTIONS__;
  var SITE = window.__SITE__;

  // Refresh live pricing from the CMS API (falls back to embedded defaults).
  fetch("/api/pricing.php").then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) { if (d && d.pricing) { pricing = Object.assign({}, pricing, d.pricing); render(); } })
    .catch(function () {});

  var input = {
    productType: "sliding-window",
    aluminiumGrade: "premium",
    glassType: "toughened",
    frameFinish: "black",
    widthFt: 5,
    heightFt: 4,
    quantity: 1,
    addOns: ["premium-hardware"]
  };

  function inr(v) {
    v = isFinite(v) ? v : 0;
    var neg = v < 0; var n = Math.abs(Math.round(v)).toString();
    var last3 = n.slice(-3), rest = n.slice(0, -3);
    if (rest) rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return "₹" + (neg ? "-" : "") + (rest ? rest + "," + last3 : last3);
  }
  function labelFor(kind, val) {
    var arr = OPT[kind] || []; for (var i = 0; i < arr.length; i++) if (arr[i].value === val) return arr[i].label; return val;
  }

  /* ── compute_estimate port ──────────────────────────── */
  function compute(inp, pr) {
    var R = Math.round;
    var quantity = Math.max(1, Math.floor(inp.quantity || 1));
    var rawArea = Math.max(0, inp.widthFt) * Math.max(0, inp.heightFt);
    var area = Math.max(rawArea, pr.minimumArea);
    var totalArea = area * quantity;
    var factor = pr.productFactor[inp.productType] != null ? pr.productFactor[inp.productType] : 1;
    var materials = pr.productMaterial[inp.productType] || ["aluminium"];
    var matPer = 0;
    if (materials.indexOf("aluminium") > -1) { matPer += pr.aluminium[inp.aluminiumGrade]; matPer += pr.frame[inp.frameFinish]; }
    if (materials.indexOf("glass") > -1) { matPer += pr.glass[inp.glassType]; }
    var materialCost = R(matPer * totalArea * factor);
    var labourCost = R(pr.labourPerSqft * totalArea * factor);
    var installationCost = R(pr.installationPerSqft * totalArea);
    var transportationCost = R(pr.transportBase + pr.transportPerSqft * totalArea);
    var addOnDetails = (inp.addOns || []).map(function (key) {
      var cfg = pr.addOns[key];
      return { key: key, label: cfg.label, cost: R(cfg.perSqft * totalArea + cfg.flat * quantity) };
    });
    var addOnsCost = addOnDetails.reduce(function (s, a) { return s + a.cost; }, 0);
    var subtotal = materialCost + labourCost + installationCost + transportationCost + addOnsCost;
    var gstAmount = R(subtotal * pr.gstPercent / 100);
    var grandTotal = subtotal + gstAmount;
    return {
      area: Math.round(area * 100) / 100, totalArea: Math.round(totalArea * 100) / 100, quantity: quantity,
      materialCost: materialCost, labourCost: labourCost, installationCost: installationCost,
      transportationCost: transportationCost, addOnsCost: addOnsCost, addOnDetails: addOnDetails,
      subtotal: subtotal, gstPercent: pr.gstPercent, gstAmount: gstAmount, grandTotal: grandTotal,
      perUnit: R(grandTotal / quantity)
    };
  }

  /* ── Product preview SVG (port of product-preview.tsx) ── */
  var frameColors = { white: "#e8e8e8", black: "#1f1f1f", "wood-finish": "#8a5a2b", "custom-color": "#b8902f" };
  var glassTints = { "5mm": "rgba(150,200,220,0.30)", "8mm": "rgba(140,195,215,0.38)", "10mm": "rgba(130,190,210,0.45)", "12mm": "rgba(120,185,205,0.52)", toughened: "rgba(120,200,200,0.42)", laminated: "rgba(160,180,210,0.50)", reflective: "rgba(90,140,170,0.65)" };
  function preview() {
    var frame = frameColors[input.frameFinish], glass = glassTints[input.glassType];
    var ratio = input.widthFt / input.heightFt;
    var r = Math.min(2.2, Math.max(0.45, ratio || 1));
    var baseH = 240, w = Math.min(360, baseH * r), h = baseH;
    var isDoor = input.productType === "aluminium-door" || input.productType === "glass-door";
    var isSliding = input.productType === "sliding-window";
    var isRailing = input.productType === "balcony-railing";
    var isAcp = input.productType === "acp-panel";
    var H = isDoor ? h * 1.15 : h;
    var s = '<svg width="' + w + '" height="' + H + '" viewBox="0 0 ' + w + ' ' + H + '" style="filter:drop-shadow(0 20px 25px rgba(0,0,0,.3))">';
    s += '<defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity=".5"/><stop offset="45%" stop-color="#fff" stop-opacity=".05"/><stop offset="100%" stop-color="#fff" stop-opacity=".2"/></linearGradient></defs>';
    s += '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (H - 4) + '" rx="6" fill="' + frame + '" stroke="rgba(0,0,0,.25)"/>';
    if (!isAcp && !isRailing) {
      s += '<rect x="14" y="14" width="' + (w - 28) + '" height="' + (H - 28) + '" fill="' + glass + '"/>';
      s += '<rect x="14" y="14" width="' + (w - 28) + '" height="' + (H - 28) + '" fill="url(#gg)"/>';
    }
    if (isAcp) {
      for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
        s += '<rect x="' + (16 + i * ((w - 32) / 3)) + '" y="' + (16 + j * ((h - 32) / 3)) + '" width="' + ((w - 32) / 3 - 4) + '" height="' + ((h - 32) / 3 - 4) + '" fill="' + frame + '" opacity="' + (0.85 - (i + j) * 0.06) + '" stroke="rgba(0,0,0,.2)"/>';
      }
    }
    if (isRailing) {
      s += '<rect x="14" y="14" width="' + (w - 28) + '" height="' + (h - 28) + '" fill="' + glass + '"/>';
      for (var k = 0; k < 6; k++) s += '<rect x="' + (20 + k * ((w - 40) / 6)) + '" y="14" width="4" height="' + (h - 28) + '" fill="' + frame + '"/>';
      s += '<rect x="10" y="8" width="' + (w - 20) + '" height="10" rx="4" fill="' + frame + '"/>';
    }
    if (!isAcp && !isRailing) {
      if (isSliding || isDoor) s += '<rect x="' + (w / 2 - 3) + '" y="14" width="6" height="' + (H - 28) + '" fill="' + frame + '"/>';
      else { s += '<rect x="' + (w / 2 - 3) + '" y="14" width="6" height="' + (h - 28) + '" fill="' + frame + '"/><rect x="14" y="' + (h / 2 - 3) + '" width="' + (w - 28) + '" height="6" fill="' + frame + '"/>'; }
    }
    if (isDoor) s += '<rect x="' + (w / 2 + 14) + '" y="' + (h * 0.55) + '" width="6" height="40" rx="3" fill="#c9a227"/>';
    s += '</svg>';
    document.getElementById("preview").innerHTML = s;
  }

  /* ── Render summary ─────────────────────────────────── */
  function render() {
    var b = compute(input, pricing);
    document.getElementById("areaPerUnit").textContent = b.area;
    document.getElementById("totalArea").textContent = b.totalArea;
    document.getElementById("qtyVal").textContent = input.quantity;

    var rows = "";
    function row(label, val, muted) { return '<div class="r' + (muted ? ' muted' : '') + '"><dt class="lab">' + label + '</dt><dd class="val">' + inr(val) + '</dd></div>'; }
    rows += row("Material Cost", b.materialCost);
    rows += row("Labour Cost", b.labourCost);
    rows += row("Installation", b.installationCost);
    rows += row("Transportation", b.transportationCost);
    b.addOnDetails.forEach(function (a) { rows += row("+ " + a.label, a.cost, true); });
    rows += '<div class="dash"></div>';
    rows += row("Subtotal", b.subtotal);
    rows += row("GST (" + b.gstPercent + "%)", b.gstAmount);
    document.getElementById("summaryRows").innerHTML = rows;

    document.getElementById("grandTotal").textContent = inr(b.grandTotal);
    var per = document.getElementById("perUnit");
    if (input.quantity > 1) { per.style.display = "block"; per.textContent = inr(b.perUnit) + " per unit · incl. GST"; }
    else per.style.display = "none";
    document.getElementById("leadTotal").textContent = inr(b.grandTotal);
    preview();
    return b;
  }

  /* ── Wire up inputs ─────────────────────────────────── */
  document.getElementById("productType").addEventListener("change", function (e) { input.productType = e.target.value; render(); });
  document.getElementById("aluminiumGrade").addEventListener("change", function (e) { input.aluminiumGrade = e.target.value; render(); });
  document.getElementById("glassType").addEventListener("change", function (e) { input.glassType = e.target.value; render(); });
  document.querySelectorAll("#frameFinish .finish-chip").forEach(function (c) {
    c.addEventListener("click", function () {
      input.frameFinish = c.getAttribute("data-value");
      document.querySelectorAll("#frameFinish .finish-chip").forEach(function (x) { x.classList.remove("active"); });
      c.classList.add("active"); render();
    });
  });
  function bindDim(numId, rangeId, valId, key) {
    var num = document.getElementById(numId), range = document.getElementById(rangeId), val = document.getElementById(valId);
    function set(v) { v = Math.max(0, Number(v)); input[key] = v; num.value = v; if (v <= 20) range.value = v; val.textContent = v; render(); }
    num.addEventListener("input", function () { set(num.value); });
    range.addEventListener("input", function () { set(range.value); });
  }
  bindDim("widthFt", "widthRange", "widthVal", "widthFt");
  bindDim("heightFt", "heightRange", "heightVal", "heightFt");
  document.getElementById("qtyMinus").addEventListener("click", function () { input.quantity = Math.max(1, input.quantity - 1); render(); });
  document.getElementById("qtyPlus").addEventListener("click", function () { input.quantity = input.quantity + 1; render(); });
  document.querySelectorAll("#addons .addon").forEach(function (a) {
    a.addEventListener("click", function () {
      var v = a.getAttribute("data-value");
      var i = input.addOns.indexOf(v);
      if (i > -1) { input.addOns.splice(i, 1); a.classList.remove("active"); }
      else { input.addOns.push(v); a.classList.add("active"); }
      render();
    });
  });

  /* ── Saved quotes (localStorage) ────────────────────── */
  var KEY = "veer:saved-quotes";
  function getQuotes() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function setQuotes(q) { try { localStorage.setItem(KEY, JSON.stringify(q)); } catch (e) {} renderSaved(); }
  function genRef() { var d = new Date(); return "VAF-" + String(d.getFullYear()).slice(-2) + String(d.getMonth() + 1).padStart(2, "0") + "-" + Math.floor(1000 + Math.random() * 9000); }
  function fmtDate(s) { var d = new Date(s); return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
  function renderSaved() {
    var quotes = getQuotes(); var wrap = document.getElementById("savedQuotes");
    if (!quotes.length) { wrap.innerHTML = ""; return; }
    var rows = quotes.map(function (q) {
      return '<div class="saved-row"><div><p style="font-weight:500">' + labelFor("product", q.input.productType) +
        ' <span style="color:hsl(var(--muted-foreground))">· ' + q.ref + '</span></p>' +
        '<p style="font-size:.72rem;color:hsl(var(--muted-foreground))">' + q.input.widthFt + '×' + q.input.heightFt + ' ft · Qty ' + q.input.quantity + ' · Saved ' + fmtDate(q.savedAt) + '</p></div>' +
        '<div style="display:flex;align-items:center;gap:.75rem"><span style="font-family:\'Playfair Display\',serif;font-weight:700;color:hsl(var(--gold))">' + inr(q.breakdown.grandTotal) + '</span>' +
        '<button class="btn btn-outline btn-icon" data-dl="' + q.ref + '" title="Download PDF"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg></button>' +
        '<button class="btn btn-ghost btn-icon" data-rm="' + q.ref + '" style="color:hsl(var(--destructive))" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div></div>';
    }).join("");
    wrap.innerHTML = '<div class="saved-card"><div style="margin-bottom:1.25rem;display:flex;align-items:center;gap:.5rem">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25rem;height:1.25rem;color:hsl(var(--gold))"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
      '<h2 class="font-display" style="font-size:1.125rem;font-weight:600">Your Saved Quotes</h2>' +
      '<span style="margin-left:.25rem;border-radius:999px;background:hsl(var(--secondary));padding:.1rem .5rem;font-size:.72rem;color:hsl(var(--muted-foreground))">' + quotes.length + '</span></div>' + rows + '</div>';
    wrap.querySelectorAll("[data-dl]").forEach(function (b) { b.addEventListener("click", function () { var q = getQuotes().find(function (x) { return x.ref === b.getAttribute("data-dl"); }); if (q) buildPdf(q.ref, q.input, q.breakdown); }); });
    wrap.querySelectorAll("[data-rm]").forEach(function (b) { b.addEventListener("click", function () { setQuotes(getQuotes().filter(function (x) { return x.ref !== b.getAttribute("data-rm"); })); }); });
  }

  document.getElementById("saveBtn").addEventListener("click", function () {
    var b = compute(input, pricing); var ref = genRef();
    var quotes = [{ ref: ref, savedAt: new Date().toISOString(), input: JSON.parse(JSON.stringify(input)), breakdown: b }].concat(getQuotes()).slice(0, 12);
    setQuotes(quotes);
    window.toast("success", "Quote saved", "Find it anytime under Saved Quotes.");
  });

  /* ── PDF (port of pdf.ts buildQuotePdf) ─────────────── */
  function buildPdf(ref, inp, b, customer) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "pt", format: "a4" });
    var pageW = doc.internal.pageSize.getWidth(); var margin = 40;
    var GOLD = [184, 134, 11], DARK = [17, 24, 39], GREY = [110, 120, 135];
    function fdate() { return new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }

    doc.setFillColor.apply(doc, DARK); doc.rect(0, 0, pageW, 90, "F");
    doc.setFillColor.apply(doc, GOLD); doc.rect(0, 90, pageW, 4, "F");
    doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(22);
    doc.text("VEER ALUMINIUM", margin, 42);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(210, 210, 210);
    doc.text("& FABRICATION", margin, 58); doc.text(SITE.tagline, margin, 74);
    doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("QUOTATION", pageW - margin, 40, { align: "right" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(210, 210, 210);
    doc.text("Ref: " + ref, pageW - margin, 56, { align: "right" });
    doc.text("Date: " + fdate(), pageW - margin, 70, { align: "right" });

    var y = 120;
    doc.setTextColor.apply(doc, GREY); doc.setFontSize(8);
    doc.text("FROM", margin, y); doc.text("PREPARED FOR", pageW / 2, y);
    doc.setTextColor.apply(doc, DARK); doc.setFontSize(10); doc.setFont("helvetica", "bold");
    doc.text(SITE.name, margin, y + 16);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    doc.text(doc.splitTextToSize(SITE.addressFull, pageW / 2 - margin - 20), margin, y + 30);
    doc.text(SITE.phone, margin, y + 56); doc.text(SITE.email, margin, y + 68);
    doc.setFont("helvetica", "bold"); doc.setFontSize(10);
    doc.text((customer && customer.name) ? customer.name : "Valued Customer", pageW / 2, y + 16);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    if (customer && customer.phone) doc.text(customer.phone, pageW / 2, y + 30);
    if (customer && customer.email) doc.text(customer.email, pageW / 2, y + 42);

    doc.autoTable({
      startY: y + 90,
      head: [["Specification", "Selection"]],
      body: [
        ["Product Type", labelFor("product", inp.productType)],
        ["Aluminium Grade", labelFor("aluminium", inp.aluminiumGrade)],
        ["Glass Type", labelFor("glass", inp.glassType)],
        ["Frame Finish", labelFor("frame", inp.frameFinish)],
        ["Dimensions", inp.widthFt + " ft × " + inp.heightFt + " ft"],
        ["Area (per unit)", b.area + " sq.ft"],
        ["Quantity", b.quantity + " unit(s)"],
        ["Total Area", b.totalArea + " sq.ft"],
        ["Add-ons", inp.addOns.length ? inp.addOns.map(function (a) { return labelFor("addOn", a); }).join(", ") : "None"]
      ],
      theme: "striped",
      headStyles: { fillColor: DARK, textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 9, textColor: DARK },
      alternateRowStyles: { fillColor: [248, 249, 251] },
      margin: { left: margin, right: margin }
    });

    var costRows = [
      ["Material Cost", inr(b.materialCost)],
      ["Labour Cost", inr(b.labourCost)],
      ["Installation Cost", inr(b.installationCost)],
      ["Transportation Cost", inr(b.transportationCost)]
    ];
    b.addOnDetails.forEach(function (a) { costRows.push(["Add-on · " + a.label, inr(a.cost)]); });
    costRows.push(["Subtotal", inr(b.subtotal)]);
    costRows.push(["GST (" + b.gstPercent + "%)", inr(b.gstAmount)]);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 18,
      head: [["Cost Component", "Amount"]],
      body: costRows, theme: "grid",
      headStyles: { fillColor: GOLD, textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 9, textColor: DARK },
      columnStyles: { 1: { halign: "right" } },
      margin: { left: margin, right: margin }
    });

    var totalY = doc.lastAutoTable.finalY + 12;
    doc.setFillColor.apply(doc, DARK); doc.roundedRect(margin, totalY, pageW - margin * 2, 42, 4, 4, "F");
    doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(12);
    doc.text("GRAND TOTAL (incl. GST)", margin + 16, totalY + 26);
    doc.setFontSize(16); doc.setTextColor(245, 213, 127);
    doc.text(inr(b.grandTotal), pageW - margin - 16, totalY + 27, { align: "right" });

    var footY = totalY + 70;
    doc.setTextColor.apply(doc, GREY); doc.setFont("helvetica", "italic"); doc.setFontSize(8);
    doc.text([
      "* This is an indicative estimate. Final pricing is confirmed after a free on-site measurement.",
      "* Prices are inclusive of GST. Validity: 15 days from the date of issue.",
      "* Workmanship and material warranties as per the final agreement."
    ], margin, footY);
    doc.setDrawColor(220, 220, 220); doc.line(margin, footY + 44, pageW - margin, footY + 44);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor.apply(doc, DARK);
    doc.text("Thank you for considering Veer Aluminium & Fabrication.", pageW / 2, footY + 62, { align: "center" });
    doc.setTextColor.apply(doc, GOLD);
    doc.text(SITE.phone + "  ·  " + SITE.url.replace("https://", ""), pageW / 2, footY + 76, { align: "center" });

    doc.save("Veer-Aluminium-Quote-" + ref + ".pdf");
  }

  var leadData = { name: "", phone: "", email: "" };
  document.getElementById("pdfBtn").addEventListener("click", function () {
    var b = compute(input, pricing); var ref = genRef();
    var name = document.getElementById("leadName").value;
    buildPdf(ref, input, b, name ? { name: name, phone: document.getElementById("leadPhone").value, email: document.getElementById("leadEmail").value } : undefined);
    window.toast("success", "Quotation PDF downloaded", "Ref " + ref);
  });

  /* ── Lead capture ───────────────────────────────────── */
  document.getElementById("getQuoteBtn").addEventListener("click", function () { window.openModal("leadModal"); });
  document.getElementById("leadSubmit").addEventListener("click", async function () {
    var name = document.getElementById("leadName").value.trim();
    var phone = document.getElementById("leadPhone").value.trim();
    var email = document.getElementById("leadEmail").value.trim();
    if (!name || !phone) { window.toast("error", "Please enter your name and phone number"); return; }
    var b = compute(input, pricing);
    var btn = this; btn.disabled = true; btn.textContent = "Sending...";
    try {
      var res = await fetch("/api/leads.php", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, phone: phone, email: email, projectType: labelFor("product", input.productType), estimatedCost: b.grandTotal, source: "estimate-calculator", details: input })
      });
      if (!res.ok) throw new Error();
      window.toast("success", "Request sent!", "Our team will contact you within 24 hours.");
      window.closeModal("leadModal");
      document.getElementById("leadName").value = ""; document.getElementById("leadPhone").value = ""; document.getElementById("leadEmail").value = "";
    } catch (e) {
      window.toast("error", "Could not send right now", "Please call us directly or try again.");
    } finally { btn.disabled = false; btn.innerHTML = "Submit Request"; }
  });

  /* ── Compare dialog ─────────────────────────────────── */
  document.getElementById("compareBtn").addEventListener("click", function () {
    var b = compute(input, pricing);
    document.getElementById("compareArea").textContent = b.totalArea;
    function rows(kind, options, current, apply) {
      return options.map(function (o) {
        var mod = Object.assign({}, input); mod[apply] = o.value;
        var total = compute(mod, pricing).grandTotal;
        var active = current === o.value;
        return '<button class="addon' + (active ? ' active' : '') + '" data-apply="' + apply + '" data-val="' + o.value + '" style="width:100%"><span style="font-size:.875rem">' + o.label + '</span><span style="font-variant-numeric:tabular-nums;font-size:.875rem">' + inr(total) + '</span></button>';
      }).join("");
    }
    document.getElementById("compareAluminium").innerHTML = rows("aluminium", OPT.aluminium, input.aluminiumGrade, "aluminiumGrade");
    document.getElementById("compareGlass").innerHTML = rows("glass", OPT.glass, input.glassType, "glassType");
    document.querySelectorAll("#compareModal [data-apply]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var apply = btn.getAttribute("data-apply"), val = btn.getAttribute("data-val");
        input[apply] = val;
        if (apply === "aluminiumGrade") document.getElementById("aluminiumGrade").value = val;
        if (apply === "glassType") document.getElementById("glassType").value = val;
        render(); window.closeModal("compareModal");
      });
    });
    window.openModal("compareModal");
  });

  render();
  renderSaved();
})();
