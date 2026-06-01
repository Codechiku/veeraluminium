import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { siteConfig } from "./site";
import { formatINR, formatDate } from "./utils";
import {
  type EstimateBreakdown,
  type EstimateInput,
  labelFor,
} from "./pricing";

export interface QuotePdfData {
  ref: string;
  input: EstimateInput;
  breakdown: EstimateBreakdown;
  customer?: { name?: string; phone?: string; email?: string };
}

const GOLD: [number, number, number] = [184, 134, 11];
const DARK: [number, number, number] = [17, 24, 39];
const GREY: [number, number, number] = [110, 120, 135];

/**
 * Generates a professional, branded PDF quotation entirely on the client.
 * Returns the jsPDF doc so callers can save() or output() it.
 */
export function buildQuotePdf(data: QuotePdfData): jsPDF {
  const { ref, input, breakdown, customer } = data;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 40;

  // ── Header band ───────────────────────────────────────────────
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageW, 90, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 90, pageW, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("VEER ALUMINIUM", margin, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(210, 210, 210);
  doc.text("& FABRICATION", margin, 58);
  doc.text(siteConfig.tagline, margin, 74);

  // Quote meta (right aligned)
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("QUOTATION", pageW - margin, 40, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(210, 210, 210);
  doc.text(`Ref: ${ref}`, pageW - margin, 56, { align: "right" });
  doc.text(`Date: ${formatDate(new Date())}`, pageW - margin, 70, {
    align: "right",
  });

  // ── From / To block ───────────────────────────────────────────
  const y = 120;
  doc.setTextColor(...GREY);
  doc.setFontSize(8);
  doc.text("FROM", margin, y);
  doc.text("PREPARED FOR", pageW / 2, y);

  doc.setTextColor(...DARK);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(siteConfig.name, margin, y + 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    doc.splitTextToSize(siteConfig.address.full, pageW / 2 - margin - 20),
    margin,
    y + 30,
  );
  doc.text(siteConfig.contact.phone, margin, y + 56);
  doc.text(siteConfig.contact.email, margin, y + 68);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(customer?.name || "Valued Customer", pageW / 2, y + 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  if (customer?.phone) doc.text(customer.phone, pageW / 2, y + 30);
  if (customer?.email) doc.text(customer.email, pageW / 2, y + 42);

  // ── Specification table ───────────────────────────────────────
  const specY = y + 90;
  autoTable(doc, {
    startY: specY,
    head: [["Specification", "Selection"]],
    body: [
      ["Product Type", labelFor.product(input.productType)],
      ["Aluminium Grade", labelFor.aluminium(input.aluminiumGrade)],
      ["Glass Type", labelFor.glass(input.glassType)],
      ["Frame Finish", labelFor.frame(input.frameFinish)],
      ["Dimensions", `${input.widthFt} ft × ${input.heightFt} ft`],
      ["Area (per unit)", `${breakdown.area} sq.ft`],
      ["Quantity", `${breakdown.quantity} unit(s)`],
      ["Total Area", `${breakdown.totalArea} sq.ft`],
      [
        "Add-ons",
        input.addOns.length
          ? input.addOns.map((a) => labelFor.addOn(a)).join(", ")
          : "None",
      ],
    ],
    theme: "striped",
    headStyles: { fillColor: DARK, textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: DARK as any },
    alternateRowStyles: { fillColor: [248, 249, 251] },
    margin: { left: margin, right: margin },
  });

  // ── Cost breakdown table ──────────────────────────────────────
  const afterSpec = (doc as any).lastAutoTable.finalY + 18;
  const costRows: [string, string][] = [
    ["Material Cost", formatINR(breakdown.materialCost)],
    ["Labour Cost", formatINR(breakdown.labourCost)],
    ["Installation Cost", formatINR(breakdown.installationCost)],
    ["Transportation Cost", formatINR(breakdown.transportationCost)],
  ];
  breakdown.addOnDetails.forEach((a) =>
    costRows.push([`Add-on · ${a.label}`, formatINR(a.cost)]),
  );
  costRows.push(["Subtotal", formatINR(breakdown.subtotal)]);
  costRows.push([
    `GST (${breakdown.gstPercent}%)`,
    formatINR(breakdown.gstAmount),
  ]);

  autoTable(doc, {
    startY: afterSpec,
    head: [["Cost Component", "Amount"]],
    body: costRows,
    theme: "grid",
    headStyles: { fillColor: GOLD, textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: DARK as any },
    columnStyles: { 1: { halign: "right" } },
    margin: { left: margin, right: margin },
  });

  // ── Grand total band ──────────────────────────────────────────
  const totalY = (doc as any).lastAutoTable.finalY + 12;
  doc.setFillColor(...DARK);
  doc.roundedRect(margin, totalY, pageW - margin * 2, 42, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("GRAND TOTAL (incl. GST)", margin + 16, totalY + 26);
  doc.setFontSize(16);
  doc.setTextColor(...[245, 213, 127]);
  doc.text(formatINR(breakdown.grandTotal), pageW - margin - 16, totalY + 27, {
    align: "right",
  });

  // ── Footer / terms ────────────────────────────────────────────
  const footY = totalY + 70;
  doc.setTextColor(...GREY);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  const terms = [
    "* This is an indicative estimate. Final pricing is confirmed after a free on-site measurement.",
    "* Prices are inclusive of GST. Validity: 15 days from the date of issue.",
    "* Workmanship and material warranties as per the final agreement.",
  ];
  doc.text(terms, margin, footY);

  doc.setDrawColor(220, 220, 220);
  doc.line(margin, footY + 44, pageW - margin, footY + 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.text(
    "Thank you for considering Veer Aluminium & Fabrication.",
    pageW / 2,
    footY + 62,
    { align: "center" },
  );
  doc.setTextColor(...GOLD);
  doc.text(
    `${siteConfig.contact.phone}  ·  ${siteConfig.url.replace("https://", "")}`,
    pageW / 2,
    footY + 76,
    { align: "center" },
  );

  return doc;
}

export function downloadQuotePdf(data: QuotePdfData) {
  const doc = buildQuotePdf(data);
  doc.save(`Veer-Aluminium-Quote-${data.ref}.pdf`);
}
