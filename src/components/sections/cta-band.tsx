"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { siteConfig, telLink } from "@/lib/site";
import { type SiteContent, defaultSiteContent } from "@/lib/editable-content";

export function CtaBand({
  content = defaultSiteContent.cta,
}: {
  content?: SiteContent["cta"];
}) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/95" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-[0.07]" />
      </div>

      <div className="container">
        <Reveal className="glass-anim mx-auto max-w-3xl rounded-3xl px-6 py-12 text-center text-primary-foreground md:px-12">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" />
            Let&apos;s Build Something Premium
            <span className="h-px w-6 bg-gold" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-primary-foreground/70 md:text-lg">
            {content.description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <Button asChild variant="gold" size="xl" className="group">
                <Link href="/estimate">
                  Get Free Estimate
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="glass" size="xl">
              <a href={telLink}>
                <Phone /> {siteConfig.contact.phone}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
