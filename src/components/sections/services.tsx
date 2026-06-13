"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Phone } from "lucide-react";
import { services, type Service, telLink } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type SiteContent, defaultSiteContent } from "@/lib/editable-content";

export function Services({
  content = defaultSiteContent.services,
}: {
  content?: SiteContent["services"];
}) {
  // `active` drives the detail dialog; `preview` drives the live image panel.
  const [active, setActive] = useState<Service | null>(null);
  const [preview, setPreview] = useState<Service>(services[0]);

  return (
    <section id="services" className="section relative overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-gold" />
                {content.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                {content.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} direction="left">
            <div className="lg:pb-2">
              <p className="max-w-md text-muted-foreground">{content.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-foreground"
                >
                  View All Services
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <a
                  href={telLink}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-foreground"
                >
                  Call For Booking
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Interactive list (left) + live preview (right) — equal height */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          {/* ── Service list — all services ──────────────── */}
          <Reveal className="lg:h-full">
            <div className="grid h-full gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const activePreview = preview.key === service.key;
                return (
                  <button
                    key={service.key}
                    type="button"
                    onMouseEnter={() => setPreview(service)}
                    onFocus={() => setPreview(service)}
                    onClick={() => setActive(service)}
                    aria-label={`View details for ${service.title}`}
                    className={cn(
                      "group flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-300",
                      activePreview
                        ? "border-gold bg-gold/5 shadow-sm"
                        : "border-border hover:border-gold/40 hover:bg-secondary/40",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                        activePreview
                          ? "bg-gold text-gold-foreground"
                          : "bg-secondary text-gold group-hover:bg-gold/10",
                      )}
                    >
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 font-display text-[0.95rem] font-semibold leading-tight">
                        {service.title}
                        <ArrowUpRight
                          className={cn(
                            "h-3.5 w-3.5 shrink-0 text-gold transition-all",
                            activePreview
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100",
                          )}
                        />
                      </span>
                      <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                        {service.short}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* ── Live preview panel ───────────────────────── */}
          <Reveal direction="left" className="lg:h-full">
            <div className="lg:h-full">
              <button
                type="button"
                onClick={() => setActive(preview)}
                aria-label={`View details for ${preview.title}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/60 shadow-premium lg:aspect-auto lg:h-full"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={preview.key}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={preview.image}
                      alt={preview.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Persistent label / CTA */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/90 text-gold shadow-lg backdrop-blur">
                    <Icon name={preview.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">
                    {preview.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm text-white/80">
                    {preview.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                    View details
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Gold bottom accent */}
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-100 bg-gold" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Detail popup */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg overflow-hidden p-0">
          {active && (
            <div>
              <div className="relative h-56 w-full">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="512px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-background/90 text-gold shadow-lg backdrop-blur">
                  <Icon name={active.icon} className="h-6 w-6" />
                </div>
              </div>

              <div className="p-6">
                <DialogTitle className="font-display text-2xl">
                  {active.title}
                </DialogTitle>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {active.description}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    What&apos;s included
                  </p>
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {active.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button asChild variant="gold">
                    <Link href="/estimate">
                      Get a Quote
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={telLink}>
                      <Phone className="h-4 w-4" /> Call Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
