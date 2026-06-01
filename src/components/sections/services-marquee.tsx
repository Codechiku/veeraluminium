import { Marquee } from "@/components/motion/marquee";
import { services } from "@/lib/site";

/** Two bold counter-scrolling bands of service keywords between sections. */
export function ServicesMarquee() {
  const titles = services.map((s) => s.title);
  const top = titles.slice(0, Math.ceil(titles.length / 2));
  const bottom = titles.slice(Math.ceil(titles.length / 2));

  return (
    <div className="overflow-hidden border-y border-border/60 bg-primary py-8 text-primary-foreground md:py-10">
      <Marquee items={top} duration={32} />
      <div className="h-3" />
      <Marquee items={bottom} duration={38} reverse />
    </div>
  );
}
