"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ClipboardList, Ruler, Factory, Truck, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/motion/section-heading";

const steps = [
  {
    icon: Ruler,
    title: "Free Site Survey",
    description:
      "Our experts visit your site, take precise digital measurements and understand your vision — at no cost.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80",
  },
  {
    icon: ClipboardList,
    title: "Design & Quotation",
    description:
      "We craft a tailored design with 3D previews and an itemised, transparent quotation you approve before we begin.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    icon: Factory,
    title: "Precision Manufacturing",
    description:
      "Your order is fabricated on CNC-driven lines with rigorous quality control at every stage.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80",
  },
  {
    icon: Truck,
    title: "Delivery & Installation",
    description:
      "Certified crews install with care, on schedule, leaving your space clean and finished to perfection.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    icon: ShieldCheck,
    title: "Handover & Warranty",
    description:
      "A final walkthrough, smooth-operation check and warranty handover — plus ongoing support whenever you need it.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section className="section bg-secondary/30">
      <div className="container">
        <SectionHeading
          eyebrow="How We Work"
          title="From First Visit to Final Handover"
          description="A seamless, transparent process engineered around your peace of mind."
        />
      </div>

      <div ref={ref} className="container relative mt-12 lg:mt-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Sticky media stack (scrollytelling) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 h-[420px] overflow-hidden rounded-3xl border border-border/60 shadow-premium">
              {steps.map((step, i) => (
                <StickyImage
                  key={i}
                  step={step}
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                />
              ))}
              {/* progress rail */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {steps.map((_, i) => (
                  <Dot
                    key={i}
                    index={i}
                    total={steps.length}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="relative space-y-4 lg:space-y-[7vh]">
            {steps.map((step, i) => (
              <li key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
                >
                  {/* mobile image */}
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl lg:hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <step.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-semibold md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StickyImage({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  // Crossfade each image in/out across its scroll segment.
  const opacity = useTransform(
    progress,
    [start - seg * 0.5, start, start + seg, start + seg * 1.5].map((v) =>
      Math.min(1, Math.max(0, v)),
    ),
    index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    [start, start + seg],
    [1.08, 1],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="relative h-full w-full">
        <Image
          src={step.image}
          alt={step.title}
          fill
          sizes="(max-width: 1024px) 0px, 45vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Step {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-1 font-display text-2xl font-semibold">{step.title}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const width = useTransform(
    progress,
    [index * seg, index * seg + seg],
    ["8px", "28px"],
  );
  const bg = useTransform(
    progress,
    [index * seg, index * seg + seg * 0.5],
    ["rgba(255,255,255,0.4)", "rgb(184,134,11)"],
  );
  return (
    <motion.span
      style={{ width, background: bg }}
      className="h-2 rounded-full"
    />
  );
}
