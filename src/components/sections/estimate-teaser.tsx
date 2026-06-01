"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, FileText, IndianRupee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const features = [
  { icon: Calculator, title: "Instant Calculation", desc: "Live, itemised pricing as you choose options." },
  { icon: IndianRupee, title: "Transparent Costs", desc: "Material, labour, transport & GST — no surprises." },
  { icon: FileText, title: "PDF Quotation", desc: "Download a professional quote in one click." },
];

export function EstimateTeaser() {
  return (
    <section className="section bg-secondary/40">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-card to-secondary/60 p-8 shadow-premium md:p-14">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">
                <Sparkles className="h-4 w-4" />
                Smart Quotation Engine
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Get an Instant Estimate in Under a Minute
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Pick your product, material and dimensions — our engine
                calculates a precise, GST-inclusive estimate and generates a
                professional PDF quotation you can save or share.
              </p>
              <Button asChild variant="gold" size="xl" className="mt-8 group">
                <Link href="/estimate">
                  <Calculator />
                  Launch Estimate Calculator
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.1} direction="left">
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {f.desc}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
