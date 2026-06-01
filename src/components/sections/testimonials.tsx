"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/motion/section-heading";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next: number) => {
      setDir(next > index ? 1 : -1);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [index],
  );

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const active = testimonials[index];

  return (
    <section id="testimonials" className="section bg-secondary/40">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by Homeowners & Businesses"
          description="Don't just take our word for it — here's what our clients across Gujarat have to say."
        />

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-premium md:p-12">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-gold/10" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-xl leading-relaxed md:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/30">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{active.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {active.role} · {active.location}
                    </p>
                  </div>
                  {active.videoUrl && (
                    <span className="ml-auto rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                      Video Review
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
