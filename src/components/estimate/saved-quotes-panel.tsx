"use client";

import { Bookmark, Download, Trash2 } from "lucide-react";
import { useSavedQuotes } from "@/hooks/use-saved-quotes";
import { downloadQuotePdf } from "@/lib/pdf";
import { formatINR, formatDate } from "@/lib/utils";
import { labelFor } from "@/lib/pricing";
import { Button } from "@/components/ui/button";

export function SavedQuotesPanel() {
  const { quotes, remove } = useSavedQuotes();

  if (quotes.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Bookmark className="h-5 w-5 text-gold" />
        <h2 className="font-display text-lg font-semibold">Your Saved Quotes</h2>
        <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
          {quotes.length}
        </span>
      </div>

      <div className="divide-y divide-border">
        {quotes.map((q) => (
          <div
            key={q.ref}
            className="flex flex-wrap items-center justify-between gap-3 py-3"
          >
            <div>
              <p className="font-medium">
                {labelFor.product(q.input.productType)}{" "}
                <span className="text-muted-foreground">· {q.ref}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {q.input.widthFt}×{q.input.heightFt} ft · Qty {q.input.quantity} ·
                Saved {formatDate(q.savedAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-gold">
                {formatINR(q.breakdown.grandTotal)}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                aria-label="Download PDF"
                onClick={() =>
                  downloadQuotePdf({
                    ref: q.ref,
                    input: q.input,
                    breakdown: q.breakdown,
                  })
                }
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive"
                aria-label="Delete quote"
                onClick={() => remove(q.ref)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
