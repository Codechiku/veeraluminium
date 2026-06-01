"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  BadgeCheck,
  Bookmark,
  Check,
  Download,
  Loader2,
  Minus,
  Plus,
  Scale,
  Send,
} from "lucide-react";
import {
  type AddOnKey,
  type AluminiumGrade,
  type EstimateInput,
  type FrameFinish,
  type GlassType,
  type ProductType,
  addOnOptions,
  aluminiumGradeOptions,
  computeEstimate,
  frameFinishOptions,
  glassTypeOptions,
  productTypeOptions,
} from "@/lib/pricing";
import { cn, formatINR, generateQuoteRef } from "@/lib/utils";
import { usePricing } from "@/hooks/use-pricing";
import { useSavedQuotes } from "@/hooks/use-saved-quotes";
import { downloadQuotePdf } from "@/lib/pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductPreview } from "./product-preview";

export function EstimateCalculator() {
  const { pricing } = usePricing();
  const { save } = useSavedQuotes();

  const [input, setInput] = useState<EstimateInput>({
    productType: "sliding-window",
    aluminiumGrade: "premium",
    glassType: "toughened",
    frameFinish: "black",
    widthFt: 5,
    heightFt: 4,
    quantity: 1,
    addOns: ["premium-hardware"],
  });

  const [leadOpen, setLeadOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "", email: "" });

  const breakdown = useMemo(
    () => computeEstimate(input, pricing),
    [input, pricing],
  );

  const set = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) =>
    setInput((p) => ({ ...p, [key]: value }));

  const toggleAddOn = (key: AddOnKey) =>
    setInput((p) => ({
      ...p,
      addOns: p.addOns.includes(key)
        ? p.addOns.filter((a) => a !== key)
        : [...p.addOns, key],
    }));

  const handleDownload = () => {
    const ref = generateQuoteRef();
    downloadQuotePdf({
      ref,
      input,
      breakdown,
      customer: lead.name ? lead : undefined,
    });
    toast.success("Quotation PDF downloaded", { description: `Ref ${ref}` });
  };

  const handleSave = () => {
    const ref = generateQuoteRef();
    save({ ref, savedAt: new Date().toISOString(), input, breakdown });
    toast.success("Quote saved", {
      description: "Find it anytime under Saved Quotes.",
    });
  };

  const handleLeadSubmit = async () => {
    if (!lead.name || !lead.phone) {
      toast.error("Please enter your name and phone number");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          projectType: productTypeOptions.find(
            (o) => o.value === input.productType,
          )?.label,
          estimatedCost: breakdown.grandTotal,
          source: "estimate-calculator",
          details: input,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Request sent!", {
        description: "Our team will contact you within 24 hours.",
      });
      setLeadOpen(false);
      setLead({ name: "", phone: "", email: "" });
    } catch {
      toast.error("Could not send right now", {
        description: "Please call us directly or try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* ── Configuration panel ───────────────────────────── */}
      <div className="space-y-8 lg:col-span-7">
        {/* Product */}
        <ConfigCard step={1} title="Choose Your Product">
          <div className="grid gap-2">
            <Label>Product Type</Label>
            <Select
              value={input.productType}
              onValueChange={(v) => set("productType", v as ProductType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productTypeOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </ConfigCard>

        {/* Materials */}
        <ConfigCard step={2} title="Select Materials">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Aluminium Grade</Label>
              <Select
                value={input.aluminiumGrade}
                onValueChange={(v) => set("aluminiumGrade", v as AluminiumGrade)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aluminiumGradeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label} · {formatINR(pricing.aluminium[o.value])}/sq.ft
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Glass Type</Label>
              <Select
                value={input.glassType}
                onValueChange={(v) => set("glassType", v as GlassType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {glassTypeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label} · {formatINR(pricing.glass[o.value])}/sq.ft
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <Label>Frame Finish</Label>
            <div className="flex flex-wrap gap-3">
              {frameFinishOptions.map((o) => (
                <button
                  key={o.value}
                  onClick={() => set("frameFinish", o.value as FrameFinish)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all",
                    input.frameFinish === o.value
                      ? "border-gold bg-gold/10 font-medium text-foreground"
                      : "border-border text-muted-foreground hover:border-gold/40",
                  )}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-black/10"
                    style={{ background: o.swatch }}
                  />
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </ConfigCard>

        {/* Dimensions */}
        <ConfigCard step={3} title="Enter Dimensions">
          <div className="grid gap-6 sm:grid-cols-2">
            <DimensionField
              label="Width (ft)"
              value={input.widthFt}
              onChange={(v) => set("widthFt", v)}
            />
            <DimensionField
              label="Height (ft)"
              value={input.heightFt}
              onChange={(v) => set("heightFt", v)}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary/60 p-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Area per unit
              </p>
              <p className="font-display text-2xl font-bold">
                {breakdown.area}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  sq.ft
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Quantity
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() =>
                    set("quantity", Math.max(1, input.quantity - 1))
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-display text-xl font-bold">
                  {input.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => set("quantity", input.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Total area
              </p>
              <p className="font-display text-2xl font-bold">
                {breakdown.totalArea}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  sq.ft
                </span>
              </p>
            </div>
          </div>
        </ConfigCard>

        {/* Add-ons */}
        <ConfigCard step={4} title="Additional Options">
          <div className="grid gap-3 sm:grid-cols-2">
            {addOnOptions.map((o) => {
              const checked = input.addOns.includes(o.value);
              const cfg = pricing.addOns[o.value];
              return (
                <button
                  key={o.value}
                  onClick={() => toggleAddOn(o.value)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                    checked
                      ? "border-gold bg-gold/5"
                      : "border-border hover:border-gold/40",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                        checked
                          ? "border-gold bg-gold text-gold-foreground"
                          : "border-muted-foreground/40",
                      )}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="text-sm font-medium">{o.label}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {cfg.perSqft > 0
                      ? `+${formatINR(cfg.perSqft)}/sq.ft`
                      : `+${formatINR(cfg.flat)}`}
                  </span>
                </button>
              );
            })}
          </div>
        </ConfigCard>
      </div>

      {/* ── Live summary panel ────────────────────────────── */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <motion.div
            layout
            className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium"
          >
            <ProductPreview
              productType={input.productType}
              frameFinish={input.frameFinish}
              glassType={input.glassType}
              ratio={input.widthFt / input.heightFt}
            />

            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">
                  Estimate Summary
                </h3>
                <button
                  onClick={() => setCompareOpen(true)}
                  className="flex items-center gap-1 text-xs font-medium text-gold hover:underline"
                >
                  <Scale className="h-3.5 w-3.5" /> Compare
                </button>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Material Cost" value={breakdown.materialCost} />
                <Row label="Labour Cost" value={breakdown.labourCost} />
                <Row
                  label="Installation"
                  value={breakdown.installationCost}
                />
                <Row
                  label="Transportation"
                  value={breakdown.transportationCost}
                />
                {breakdown.addOnDetails.map((a) => (
                  <Row
                    key={a.key}
                    label={`+ ${a.label}`}
                    value={a.cost}
                    muted
                  />
                ))}
                <div className="my-2 border-t border-dashed" />
                <Row label="Subtotal" value={breakdown.subtotal} />
                <Row
                  label={`GST (${breakdown.gstPercent}%)`}
                  value={breakdown.gstAmount}
                />
              </dl>

              <div className="mt-5 rounded-2xl bg-primary p-5 text-primary-foreground">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-primary-foreground/80">
                    Grand Total
                  </span>
                  <motion.span
                    key={breakdown.grandTotal}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-3xl font-bold text-[#f5d57f]"
                  >
                    {formatINR(breakdown.grandTotal)}
                  </motion.span>
                </div>
                {input.quantity > 1 && (
                  <p className="mt-1 text-right text-xs text-primary-foreground/60">
                    {formatINR(breakdown.perUnit)} per unit · incl. GST
                  </p>
                )}
              </div>

              <div className="mt-5 grid gap-3">
                <Button variant="gold" size="lg" onClick={() => setLeadOpen(true)}>
                  <Send /> Get This Quote
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download /> PDF
                  </Button>
                  <Button variant="outline" onClick={handleSave}>
                    <Bookmark /> Save
                  </Button>
                </div>
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Indicative estimate. Final price confirmed after a free on-site
                measurement.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lead capture dialog */}
      <Dialog open={leadOpen} onOpenChange={setLeadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get Your Detailed Quote</DialogTitle>
            <DialogDescription>
              Share your details and our team will confirm pricing and schedule a
              free site visit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="rounded-xl bg-secondary/60 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated total</span>
                <span className="font-bold text-gold">
                  {formatINR(breakdown.grandTotal)}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lead-name">Full Name *</Label>
              <Input
                id="lead-name"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lead-phone">Phone *</Label>
              <Input
                id="lead-phone"
                type="tel"
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                placeholder="+91 ..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lead-email">Email</Label>
              <Input
                id="lead-email"
                type="email"
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              onClick={handleLeadSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send /> Submit Request
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Compare materials dialog */}
      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Compare Material Types</DialogTitle>
            <DialogDescription>
              Estimated grand total for your current dimensions ({breakdown.totalArea}{" "}
              sq.ft) with each material.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Aluminium Grade
              </p>
              <div className="space-y-2">
                {aluminiumGradeOptions.map((o) => {
                  const total = computeEstimate(
                    { ...input, aluminiumGrade: o.value },
                    pricing,
                  ).grandTotal;
                  return (
                    <CompareRow
                      key={o.value}
                      label={o.label}
                      total={total}
                      active={input.aluminiumGrade === o.value}
                      onClick={() => set("aluminiumGrade", o.value)}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Glass Type
              </p>
              <div className="space-y-2">
                {glassTypeOptions.map((o) => {
                  const total = computeEstimate(
                    { ...input, glassType: o.value },
                    pricing,
                  ).grandTotal;
                  return (
                    <CompareRow
                      key={o.value}
                      label={o.label}
                      total={total}
                      active={input.glassType === o.value}
                      onClick={() => set("glassType", o.value)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

function ConfigCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
          {step}
        </span>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function DimensionField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-sm font-medium text-gold">{value} ft</span>
      </div>
      <Input
        type="number"
        min={1}
        max={40}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
      />
      <Slider
        value={[value]}
        min={1}
        max={20}
        step={0.5}
        onValueChange={([v]) => onChange(v)}
        className="mt-1"
      />
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: number;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={cn(muted ? "text-muted-foreground" : "text-foreground/80")}>
        {label}
      </dt>
      <dd className="font-medium tabular-nums">{formatINR(value)}</dd>
    </div>
  );
}

function CompareRow({
  label,
  total,
  active,
  onClick,
}: {
  label: string;
  total: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition-colors",
        active
          ? "border-gold bg-gold/10 font-medium"
          : "border-border hover:border-gold/40",
      )}
    >
      <span>{label}</span>
      <span className="tabular-nums">{formatINR(total)}</span>
    </button>
  );
}
