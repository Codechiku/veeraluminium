/**
 * ─────────────────────────────────────────────────────────────────────────
 *  VEER ALUMINIUM — QUOTATION ENGINE
 * ─────────────────────────────────────────────────────────────────────────
 *  A fully data-driven pricing engine. Every rate lives in `defaultPricing`
 *  so the admin CMS can edit values in the database and the calculator (and
 *  the generated PDF) update automatically — no code changes required.
 *
 *  All monetary values are in INR. Areas are in square feet.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type ProductType =
  | "sliding-window"
  | "casement-window"
  | "fixed-window"
  | "aluminium-door"
  | "glass-door"
  | "partition"
  | "balcony-railing"
  | "acp-panel"
  | "custom-fabrication";

export type AluminiumGrade = "standard" | "premium" | "heavy-duty";

export type GlassType =
  | "5mm"
  | "8mm"
  | "10mm"
  | "12mm"
  | "toughened"
  | "laminated"
  | "reflective";

export type FrameFinish = "white" | "black" | "wood-finish" | "custom-color";

export type AddOnKey =
  | "mosquito-mesh"
  | "premium-hardware"
  | "soundproof-glass"
  | "security-lock"
  | "powder-coating"
  | "acp-finish";

export interface PricingConfig {
  /** Aluminium material cost per sq.ft by grade */
  aluminium: Record<AluminiumGrade, number>;
  /** Glass material cost per sq.ft by type */
  glass: Record<GlassType, number>;
  /** Frame finish surcharge per sq.ft */
  frame: Record<FrameFinish, number>;
  /** Per-product complexity factor applied to material + labour */
  productFactor: Record<ProductType, number>;
  /** Whether a product primarily consumes glass, aluminium or both */
  productMaterial: Record<ProductType, ("aluminium" | "glass")[]>;
  /** Labour cost per sq.ft (base) */
  labourPerSqft: number;
  /** Installation cost per sq.ft (base) */
  installationPerSqft: number;
  /** Transportation: base flat fee + per sq.ft component */
  transportBase: number;
  transportPerSqft: number;
  /** GST percentage applied to the subtotal */
  gstPercent: number;
  /** Add-ons: either per-sqft or a flat fee (set the unused one to 0) */
  addOns: Record<AddOnKey, { label: string; perSqft: number; flat: number }>;
  /** Minimum chargeable area per unit (sq.ft) so tiny items aren't underpriced */
  minimumArea: number;
}

export const defaultPricing: PricingConfig = {
  aluminium: {
    standard: 340,
    premium: 540,
    "heavy-duty": 680,
  },
  glass: {
    "5mm": 90,
    "8mm": 140,
    "10mm": 190,
    "12mm": 250,
    toughened: 320,
    laminated: 380,
    reflective: 300,
  },
  frame: {
    white: 0,
    black: 35,
    "wood-finish": 70,
    "custom-color": 90,
  },
  productFactor: {
    "sliding-window": 1.0,
    "casement-window": 1.1,
    "fixed-window": 0.85,
    "aluminium-door": 1.25,
    "glass-door": 1.35,
    partition: 1.05,
    "balcony-railing": 1.2,
    "acp-panel": 0.95,
    "custom-fabrication": 1.4,
  },
  productMaterial: {
    "sliding-window": ["aluminium", "glass"],
    "casement-window": ["aluminium", "glass"],
    "fixed-window": ["aluminium", "glass"],
    "aluminium-door": ["aluminium", "glass"],
    "glass-door": ["glass"],
    partition: ["aluminium", "glass"],
    "balcony-railing": ["aluminium", "glass"],
    "acp-panel": ["aluminium"],
    "custom-fabrication": ["aluminium", "glass"],
  },
  labourPerSqft: 75,
  installationPerSqft: 55,
  transportBase: 1200,
  transportPerSqft: 6,
  gstPercent: 18,
  addOns: {
    "mosquito-mesh": { label: "Mosquito Mesh", perSqft: 45, flat: 0 },
    "premium-hardware": { label: "Premium Hardware", perSqft: 0, flat: 1500 },
    "soundproof-glass": { label: "Soundproof Glass", perSqft: 120, flat: 0 },
    "security-lock": { label: "Security Lock", perSqft: 0, flat: 900 },
    "powder-coating": { label: "Powder Coating", perSqft: 40, flat: 0 },
    "acp-finish": { label: "ACP Finish", perSqft: 85, flat: 0 },
  },
  minimumArea: 6,
};

// ── Human-readable option metadata (used to render selects) ───────────────

export const productTypeOptions: { value: ProductType; label: string }[] = [
  { value: "sliding-window", label: "Sliding Window" },
  { value: "casement-window", label: "Casement Window" },
  { value: "fixed-window", label: "Fixed Window" },
  { value: "aluminium-door", label: "Aluminium Door" },
  { value: "glass-door", label: "Glass Door" },
  { value: "partition", label: "Partition" },
  { value: "balcony-railing", label: "Balcony Railing" },
  { value: "acp-panel", label: "ACP Panel" },
  { value: "custom-fabrication", label: "Custom Fabrication" },
];

export const aluminiumGradeOptions: { value: AluminiumGrade; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "heavy-duty", label: "Heavy Duty" },
];

export const glassTypeOptions: { value: GlassType; label: string }[] = [
  { value: "5mm", label: "5mm Clear" },
  { value: "8mm", label: "8mm Clear" },
  { value: "10mm", label: "10mm Clear" },
  { value: "12mm", label: "12mm Clear" },
  { value: "toughened", label: "Toughened" },
  { value: "laminated", label: "Laminated" },
  { value: "reflective", label: "Reflective" },
];

export const frameFinishOptions: { value: FrameFinish; label: string; swatch: string }[] = [
  { value: "white", label: "White", swatch: "#f5f5f5" },
  { value: "black", label: "Black", swatch: "#1a1a1a" },
  { value: "wood-finish", label: "Wood Finish", swatch: "#8a5a2b" },
  { value: "custom-color", label: "Custom Color", swatch: "#b8902f" },
];

export const addOnOptions: { value: AddOnKey; label: string }[] = [
  { value: "mosquito-mesh", label: "Mosquito Mesh" },
  { value: "premium-hardware", label: "Premium Hardware" },
  { value: "soundproof-glass", label: "Soundproof Glass" },
  { value: "security-lock", label: "Security Lock" },
  { value: "powder-coating", label: "Powder Coating" },
  { value: "acp-finish", label: "ACP Finish" },
];

// ── Estimate inputs & outputs ─────────────────────────────────────────────

export interface EstimateInput {
  productType: ProductType;
  aluminiumGrade: AluminiumGrade;
  glassType: GlassType;
  frameFinish: FrameFinish;
  widthFt: number;
  heightFt: number;
  quantity: number;
  addOns: AddOnKey[];
}

export interface EstimateBreakdown {
  area: number; // per unit, sq.ft (after minimum)
  totalArea: number; // area × quantity
  quantity: number;
  materialCost: number;
  labourCost: number;
  installationCost: number;
  transportationCost: number;
  addOnsCost: number;
  addOnDetails: { key: AddOnKey; label: string; cost: number }[];
  subtotal: number;
  gstPercent: number;
  gstAmount: number;
  grandTotal: number;
  perUnit: number;
}

/** Round to nearest rupee. */
const r = (n: number) => Math.round(n);

/**
 * The core calculation. Pure function — given inputs and a pricing config,
 * returns a complete, itemised breakdown. Used by the UI, the API and the PDF.
 */
export function computeEstimate(
  input: EstimateInput,
  pricing: PricingConfig = defaultPricing,
): EstimateBreakdown {
  const quantity = Math.max(1, Math.floor(input.quantity || 1));
  const rawArea = Math.max(0, input.widthFt) * Math.max(0, input.heightFt);
  const area = Math.max(rawArea, pricing.minimumArea);
  const totalArea = area * quantity;

  const factor = pricing.productFactor[input.productType] ?? 1;
  const materials = pricing.productMaterial[input.productType] ?? ["aluminium"];

  // ── Material cost ───────────────────────────────────────────────
  let materialPerSqft = 0;
  if (materials.includes("aluminium")) {
    materialPerSqft += pricing.aluminium[input.aluminiumGrade];
    materialPerSqft += pricing.frame[input.frameFinish];
  }
  if (materials.includes("glass")) {
    materialPerSqft += pricing.glass[input.glassType];
  }
  const materialCost = r(materialPerSqft * totalArea * factor);

  // ── Labour & installation ───────────────────────────────────────
  const labourCost = r(pricing.labourPerSqft * totalArea * factor);
  const installationCost = r(pricing.installationPerSqft * totalArea);

  // ── Transportation ──────────────────────────────────────────────
  const transportationCost = r(
    pricing.transportBase + pricing.transportPerSqft * totalArea,
  );

  // ── Add-ons ─────────────────────────────────────────────────────
  const addOnDetails = (input.addOns || []).map((key) => {
    const cfg = pricing.addOns[key];
    const cost = r(cfg.perSqft * totalArea + cfg.flat * quantity);
    return { key, label: cfg.label, cost };
  });
  const addOnsCost = addOnDetails.reduce((sum, a) => sum + a.cost, 0);

  // ── Totals ──────────────────────────────────────────────────────
  const subtotal =
    materialCost + labourCost + installationCost + transportationCost + addOnsCost;
  const gstAmount = r((subtotal * pricing.gstPercent) / 100);
  const grandTotal = subtotal + gstAmount;

  return {
    area: r(area * 100) / 100,
    totalArea: r(totalArea * 100) / 100,
    quantity,
    materialCost,
    labourCost,
    installationCost,
    transportationCost,
    addOnsCost,
    addOnDetails,
    subtotal,
    gstPercent: pricing.gstPercent,
    gstAmount,
    grandTotal,
    perUnit: r(grandTotal / quantity),
  };
}

/** Quick label lookups for PDF / UI rendering. */
export const labelFor = {
  product: (v: ProductType) => productTypeOptions.find((o) => o.value === v)?.label ?? v,
  aluminium: (v: AluminiumGrade) =>
    aluminiumGradeOptions.find((o) => o.value === v)?.label ?? v,
  glass: (v: GlassType) => glassTypeOptions.find((o) => o.value === v)?.label ?? v,
  frame: (v: FrameFinish) => frameFinishOptions.find((o) => o.value === v)?.label ?? v,
  addOn: (v: AddOnKey) => addOnOptions.find((o) => o.value === v)?.label ?? v,
};
