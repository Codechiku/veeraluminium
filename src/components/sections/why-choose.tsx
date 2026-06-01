"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { whyChoose } from "@/lib/content";
import { SectionHeading } from "@/components/motion/section-heading";
import { Icon } from "@/components/icon";

/**
 * Scroll-stacking cards. Each card is sticky and, as you scroll, the next card
 * slides up and stacks on top with a slight scale-down on the one below —
 * a bold, tactile scroll effect (à la premium studio sites).
 */
export function WhyChoose() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section className="section bg-secondary/40">
      <div className="container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The Veer Standard of Excellence"
          description="We combine 15+ years of craftsmanship with modern technology to deliver results that stand the test of time."
        />
      </div>

      <div ref={ref} className="container relative mt-12">
        {whyChoose.map((item, i) => (
          <StackCard
            key={item.title}
            index={i}
            total={whyChoose.length}
            progress={scrollYProgress}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

function StackCard({
  item,
  index,
  total,
  progress,
}: {
  item: (typeof whyChoose)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card scales down slightly as cards above it stack on top.
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.04]);

  return (
    <div
      className="sticky"
      style={{ top: `calc(7rem + ${index * 1.5}rem)` }}
    >
      <motion.div
        style={{ scale }}
        className="mx-auto mb-6 max-w-3xl origin-top overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-premium md:p-10"
      >
        <div className="flex items-start gap-5">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-[#8a6512] text-white shadow-lg shadow-gold/30">
            <Icon name={item.icon} className="h-8 w-8" />
          </span>
          <div>
            <span className="font-display text-sm font-bold text-gold">
              0{index + 1}
            </span>
            <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 text-muted-foreground md:text-lg">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
