"use client";

import { cn } from "@/lib/utils";

/**
 * Stop-motion style brand loader: the window-frame logo mark "draws" and a
 * ring rotates in stepped (stop-motion) increments. Used in route loaders.
 */
export function BrandLoader({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-5",
        className,
      )}
    >
      <div className="relative h-16 w-16">
        {/* stepped (stop-motion) rotating ring */}
        <span className="animate-stopmotion absolute inset-0 rounded-xl border-2 border-dashed border-gold/50" />
        {/* self-drawing window mark */}
        <svg viewBox="0 0 48 48" className="absolute inset-0 m-auto h-9 w-9">
          <g
            fill="none"
            stroke="hsl(var(--gold))"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <rect
              x="8"
              y="8"
              width="32"
              height="32"
              rx="3"
              className="draw-path drawn"
              style={{ ["--draw-len" as string]: 130 }}
            />
            <path
              d="M8 24h32M24 8v32"
              className="draw-path drawn"
              style={{ ["--draw-len" as string]: 64, animationDelay: "0.3s" }}
            />
          </g>
        </svg>
      </div>
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        {label}
        <span className="animate-pulse">…</span>
      </p>
    </div>
  );
}
