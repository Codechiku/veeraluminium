import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";

/** A bold scroll-driven statement section between the gallery and process. */
export function Statement() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:46px_46px] opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container relative">
        <span className="eyebrow mb-8 block">
          <span className="h-px w-6 bg-gold" /> Our Philosophy
        </span>
        <ScrollRevealText
          text="We don't just install windows and glass — we engineer experiences that transform how you live and work, with precision that lasts a lifetime."
          highlight={["engineer", "experiences", "precision", "lifetime"]}
          className="max-w-4xl"
        />
      </div>
    </section>
  );
}
