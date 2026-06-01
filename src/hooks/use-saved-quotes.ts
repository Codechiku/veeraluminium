"use client";

import { useCallback, useEffect, useState } from "react";
import type { EstimateBreakdown, EstimateInput } from "@/lib/pricing";

export interface SavedQuote {
  ref: string;
  savedAt: string;
  input: EstimateInput;
  breakdown: EstimateBreakdown;
}

const KEY = "veer:saved-quotes";

/** Persists quotes the user chooses to save, in localStorage. */
export function useSavedQuotes() {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setQuotes(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: SavedQuote[]) => {
    setQuotes(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const save = useCallback(
    (q: SavedQuote) => persist([q, ...quotes].slice(0, 12)),
    [persist, quotes],
  );

  const remove = useCallback(
    (ref: string) => persist(quotes.filter((q) => q.ref !== ref)),
    [persist, quotes],
  );

  return { quotes, save, remove };
}
