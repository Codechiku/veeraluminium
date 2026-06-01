"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { timeline } from "@/lib/content";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { type SiteContent, defaultSiteContent } from "@/lib/editable-content";

const highlights = [
  "ISO-grade material sourcing",
  "In-house CNC manufacturing",
  "Certified installation crews",
  "Post-installation support",
];

export function About({
  content = defaultSiteContent.about,
}: {
  content?: SiteContent["about"];
}) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Visual */}
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80"
                alt="Veer Aluminium precision manufacturing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Floating experience badge */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-border bg-card p-5 shadow-premium sm:-right-6">
              <p className="font-display text-4xl font-bold text-gold">
                {content.experienceYears}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Years of
                <br />
                Excellence
              </p>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <SectionHeading
              align="left"
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.body}
            />

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <Reveal key={h} delay={i * 0.05} direction="left">
                  <li className="flex items-center gap-2.5 text-sm font-medium">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                    {h}
                  </li>
                </Reveal>
              ))}
            </ul>

            {/* Timeline */}
            <div className="mt-10 border-l border-border pl-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pb-7 last:pb-0"
                >
                  <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold bg-background">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <p className="text-sm font-bold text-gold">{item.year}</p>
                  <p className="mt-0.5 font-display font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
