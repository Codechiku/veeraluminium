"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { type SiteContent, defaultSiteContent } from "@/lib/editable-content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({
  content = defaultSiteContent.hero,
}: {
  content?: SiteContent["hero"];
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle premium backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:44px_44px] opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="container grid items-center gap-12 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-2 lg:gap-16">
        {/* ── Left: copy ───────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 shadow-sm"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </span>
            <span className="text-xs font-medium text-foreground/80">
              {content.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.1rem]"
          >
            {content.titleLead}{" "}
            <span className="text-gradient-gold">{content.titleHighlight}</span>{" "}
            {content.titleTail}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {content.subheading}
          </motion.p>

          {/* Quick assurances */}
          <motion.ul
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease }}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2"
          >
            {["Free Site Visit", "Transparent Pricing", "Certified Installation"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="h-4.5 w-4.5 text-gold" />
                  {t}
                </li>
              ),
            )}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button asChild variant="gold" size="xl" className="group w-full sm:w-auto">
              <Link href="/estimate">
                {content.ctaPrimary}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="group w-full sm:w-auto">
              <Link href="/projects">
                <PlayCircle className="transition-transform group-hover:scale-110" />
                {content.ctaSecondary}
              </Link>
            </Button>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border/70 pt-8"
          >
            {[
              { v: "3+", l: "Years Experience" },
              { v: "150+", l: "Projects Done" },
              { v: "10+", l: "Cities Served" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl font-bold text-foreground">
                  {s.v}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: framed feature image ──────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-border/60 shadow-premium sm:aspect-[5/5] lg:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
              alt="Premium glass and aluminium architecture by Veer"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            {/* Caption chip */}
            <div className="absolute bottom-5 left-5 rounded-2xl bg-background/85 px-4 py-3 shadow-lg backdrop-blur-md">
              <p className="font-display text-sm font-semibold">
                Structural Glazing
              </p>
              <p className="text-xs text-muted-foreground">
                Corporate Tower · Gujarat
              </p>
            </div>
          </div>

          {/* Floating warranty card */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="absolute -left-4 top-8 hidden items-center gap-3 rounded-2xl border border-border bg-card/95 p-3.5 shadow-premium backdrop-blur sm:flex"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Quality Assured</p>
              <p className="text-xs text-muted-foreground">Workmanship warranty</p>
            </div>
          </motion.div>

          {/* Floating rating card */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease }}
            className="absolute -right-3 bottom-12 hidden rounded-2xl border border-border bg-card/95 p-3.5 shadow-premium backdrop-blur sm:block"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-1 font-display text-lg font-bold leading-none">
              4.9<span className="text-sm font-normal text-muted-foreground">/5</span>
            </p>
            <p className="text-xs text-muted-foreground">120+ happy clients</p>
          </motion.div>
        </motion.div>
      </div>

      <span className="sr-only">{siteConfig.tagline}</span>
    </section>
  );
}
