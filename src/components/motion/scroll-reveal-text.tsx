"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word scroll reveal. As the section scrolls through the viewport,
 * each word brightens from dim to full — a bold, premium "statement" effect
 * seen on high-end studio sites. Driven entirely by scroll progress.
 */
export function ScrollRevealText({
  text,
  className,
  highlight = [],
}: {
  text: string;
  className?: string;
  /** words (lowercased) to render in gold */
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");
  const hi = new Set(highlight.map((w) => w.toLowerCase()));

  return (
    <p
      ref={ref}
      className={cn(
        "flex flex-wrap font-display text-3xl font-semibold leading-[1.25] tracking-tight sm:text-4xl md:text-5xl md:leading-[1.2]",
        className,
      )}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = word.replace(/[.,!?]/g, "").toLowerCase();
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            gold={hi.has(clean)}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  gold,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  gold: boolean;
}) {
  const opacity = useTransform(progress, range, [0.48, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <span className="mr-[0.28em] mt-[0.18em] inline-block">
      <motion.span
        style={{ opacity, y }}
        className={cn("inline-block", gold && "text-gradient-gold")}
      >
        {children}
      </motion.span>
    </span>
  );
}
