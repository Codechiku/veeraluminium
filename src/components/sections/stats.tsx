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
        <div className="grid grid-cols-4 gap-2 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="min-w-0 text-center text-primary-foreground">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Icon name={stat.icon} className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <div className="font-display text-[1.35rem] font-bold leading-none sm:text-4xl md:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-[0.63rem] leading-tight text-primary-foreground/70 sm:text-sm">
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
