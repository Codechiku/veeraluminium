"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
import { type SiteContent, defaultSiteContent } from "@/lib/editable-content";

export function Services({
  content = defaultSiteContent.services,
}: {
  content?: SiteContent["services"];
}) {
  const [active, setActive] = useState<Service | null>(null);

  // Show exactly 12 cards as a 6 × 2 grid.
  const grid = services.slice(0, 12);

  return (
    <section id="services" className="section relative overflow-hidden">
      <div className="container">
        {/* Header — title left, supporting copy + links right */}
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

        {/* 6 × 2 static grid — all 12 cards in one frame */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {grid.map((service) => (
            <motion.button
              key={service.key}
              type="button"
              onClick={() => setActive(service)}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group relative text-left"
              aria-label={`View details for ${service.title}`}
            >
              <div className="relative h-[260px] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-premium">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                {/* Icon chip */}
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 text-gold shadow backdrop-blur">
                  <Icon name={service.icon} className="h-4.5 w-4.5" />
                </span>

                {/* Title + arrow */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-sm font-semibold leading-tight text-white">
                    {service.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    View details
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>

                {/* Gold bottom accent */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </motion.button>
          ))}
        </motion.div>
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
