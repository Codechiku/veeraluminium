"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Renders the items twice and translates -50%
 * for a seamless loop. Pauses on hover; edges are masked for a clean fade.
 */
export function Marquee({
  items,
  className,
  duration = 36,
  reverse = false,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
  separator?: string;
}) {
  return (
    <div className={cn("marquee-mask marquee-pause overflow-hidden", className)}>
      <div
        className={cn("marquee-track", reverse && "reverse")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((item) => (
              <Fragment key={`${dup}-${item}`}>
                <span className="px-7 font-display text-3xl font-semibold tracking-tight text-current/90 md:text-5xl">
                  {item}
                </span>
                <span className="text-2xl text-gold md:text-4xl">{separator}</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
