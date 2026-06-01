"use client";

import Image from "next/image";
import { stats } from "@/lib/content";
import { Counter } from "@/components/motion/counter";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";

export function Stats() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      {/* Dark cinematic background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/95" />
      </div>

      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center text-primary-foreground">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <Icon name={stat.icon} className="h-7 w-7" />
                </div>
                <div className="font-display text-4xl font-bold md:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
