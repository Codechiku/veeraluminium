"use client";

import { useEffect, useState } from "react";
import { defaultPricing, type PricingConfig } from "@/lib/pricing";

/**
 * Loads live pricing from the CMS-backed API, falling back to the bundled
 * defaults so the calculator always works (even offline / before DB setup).
 */
export function usePricing() {
  const [pricing, setPricing] = useState<PricingConfig>(defaultPricing);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/pricing")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && data.pricing) {
          setPricing({ ...defaultPricing, ...data.pricing });
        }
      })
      .catch(() => {
        /* keep defaults */
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { pricing, loading };
}
