"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, RotateCcw, Save } from "lucide-react";
import {
  type PricingConfig,
  defaultPricing,
  aluminiumGradeOptions,
  glassTypeOptions,
  frameFinishOptions,
  productTypeOptions,
  addOnOptions,
} from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/utils";

export default function PricingPage() {
  const [pricing, setPricing] = useState<PricingConfig>(defaultPricing);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((d) => {
        if (d?.pricing) setPricing({ ...defaultPricing, ...d.pricing });
      })
      .finally(() => setLoading(false));
  }, []);

  const num = (v: string) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricing),
      });
      if (!res.ok) throw new Error();
      toast.success("Pricing saved", {
        description: "The estimate calculator now uses these rates.",
      });
      setDirty(false);
    } catch {
      toast.error("Could not save pricing");
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setPricing(defaultPricing);
    setDirty(true);
    toast.info("Reset to default rates", {
      description: "Remember to Save to apply.",
    });
  };

  const mark = () => setDirty(true);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading pricing…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Pricing Management</h1>
          <p className="text-sm text-muted-foreground">
            Edit rates below. The estimate calculator &amp; PDF quotes update
            automatically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Reset Defaults
          </Button>
          <Button variant="gold" size="sm" onClick={save} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {dirty && (
        <div className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm text-foreground">
          You have unsaved changes. Click <strong>Save Changes</strong> to apply.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Aluminium grades */}
        <Section title="Aluminium — per sq.ft" desc="Material cost by grade">
          {aluminiumGradeOptions.map((o) => (
            <RateRow
              key={o.value}
              label={o.label}
              value={pricing.aluminium[o.value]}
              onChange={(v) => {
                setPricing((p) => ({
                  ...p,
                  aluminium: { ...p.aluminium, [o.value]: v },
                }));
                mark();
              }}
            />
          ))}
        </Section>

        {/* Glass types */}
        <Section title="Glass — per sq.ft" desc="Material cost by glass type">
          {glassTypeOptions.map((o) => (
            <RateRow
              key={o.value}
              label={o.label}
              value={pricing.glass[o.value]}
              onChange={(v) => {
                setPricing((p) => ({
                  ...p,
                  glass: { ...p.glass, [o.value]: v },
                }));
                mark();
              }}
            />
          ))}
        </Section>

        {/* Frame finish */}
        <Section title="Frame Finish — surcharge per sq.ft" desc="Added on top of aluminium">
          {frameFinishOptions.map((o) => (
            <RateRow
              key={o.value}
              label={o.label}
              value={pricing.frame[o.value]}
              onChange={(v) => {
                setPricing((p) => ({
                  ...p,
                  frame: { ...p.frame, [o.value]: v },
                }));
                mark();
              }}
            />
          ))}
        </Section>

        {/* Labour / install / transport / GST */}
        <Section title="Labour, Installation, Transport & GST" desc="Base operational rates">
          <RateRow
            label="Labour (per sq.ft)"
            value={pricing.labourPerSqft}
            onChange={(v) => {
              setPricing((p) => ({ ...p, labourPerSqft: v }));
              mark();
            }}
          />
          <RateRow
            label="Installation (per sq.ft)"
            value={pricing.installationPerSqft}
            onChange={(v) => {
              setPricing((p) => ({ ...p, installationPerSqft: v }));
              mark();
            }}
          />
          <RateRow
            label="Transport — base flat fee"
            value={pricing.transportBase}
            onChange={(v) => {
              setPricing((p) => ({ ...p, transportBase: v }));
              mark();
            }}
          />
          <RateRow
            label="Transport (per sq.ft)"
            value={pricing.transportPerSqft}
            onChange={(v) => {
              setPricing((p) => ({ ...p, transportPerSqft: v }));
              mark();
            }}
          />
          <RateRow
            label="GST (%)"
            value={pricing.gstPercent}
            suffix="%"
            onChange={(v) => {
              setPricing((p) => ({ ...p, gstPercent: v }));
              mark();
            }}
          />
          <RateRow
            label="Minimum chargeable area (sq.ft)"
            value={pricing.minimumArea}
            suffix="sq.ft"
            onChange={(v) => {
              setPricing((p) => ({ ...p, minimumArea: v }));
              mark();
            }}
          />
        </Section>

        {/* Product complexity factors */}
        <Section
          title="Product Complexity Factors"
          desc="Multiplier on material + labour (1.0 = standard)"
        >
          {productTypeOptions.map((o) => (
            <RateRow
              key={o.value}
              label={o.label}
              value={pricing.productFactor[o.value]}
              step={0.05}
              suffix="×"
              currency={false}
              onChange={(v) => {
                setPricing((p) => ({
                  ...p,
                  productFactor: { ...p.productFactor, [o.value]: v },
                }));
                mark();
              }}
            />
          ))}
        </Section>

        {/* Add-ons */}
        <Section title="Add-ons" desc="Per sq.ft and/or flat fee">
          <div className="space-y-3">
            {addOnOptions.map((o) => {
              const cfg = pricing.addOns[o.value];
              return (
                <div key={o.value} className="rounded-lg border border-border p-3">
                  <p className="mb-2 text-sm font-medium">{o.label}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">
                        Per sq.ft
                      </Label>
                      <Input
                        type="number"
                        value={cfg.perSqft}
                        onChange={(e) => {
                          setPricing((p) => ({
                            ...p,
                            addOns: {
                              ...p.addOns,
                              [o.value]: { ...cfg, perSqft: num(e.target.value) },
                            },
                          }));
                          mark();
                        }}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">
                        Flat fee
                      </Label>
                      <Input
                        type="number"
                        value={cfg.flat}
                        onChange={(e) => {
                          setPricing((p) => ({
                            ...p,
                            addOns: {
                              ...p.addOns,
                              [o.value]: { ...cfg, flat: num(e.target.value) },
                            },
                          }));
                          mark();
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      <div className="flex justify-end">
        <Button variant="gold" onClick={save} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

/* ── sub-components ─────────────────────────────────────────── */

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">{title}</h2>
      {desc && <p className="mb-4 text-sm text-muted-foreground">{desc}</p>}
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function RateRow({
  label,
  value,
  onChange,
  step = 1,
  suffix,
  currency = true,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  suffix?: string;
  currency?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="flex-1 text-sm font-normal">{label}</Label>
      <div className="flex items-center gap-2">
        {currency && (
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {formatINR(value)}
          </span>
        )}
        <Input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="h-9 w-28 text-right"
        />
        {suffix && (
          <span className="w-10 text-xs text-muted-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );
}
