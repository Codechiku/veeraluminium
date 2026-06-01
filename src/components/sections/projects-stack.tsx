"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { type Project, projects as allProjects } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

/**
 * Scroll-stacking portfolio cards — the same tactile sticky-stack effect used
 * in "Why Choose Us", but with large project imagery. Each card sticks, and
 * the next slides up and stacks on top while the one below scales down.
 */
export function ProjectsStack({ limit = 6 }: { limit?: number }) {
  const items = allProjects.slice(0, limit);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative mt-12">
      {items.map((project, i) => (
        <StackCard
          key={project.id}
          index={i}
          total={items.length}
          progress={scrollYProgress}
          project={project}
        />
      ))}
    </div>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Card scales down slightly as later cards stack on top of it.
  const start = index / total;
  const scale = useTransform(
    progress,
    [start, 1],
    [1, 1 - (total - index) * 0.045],
  );

  return (
    <div
      className="sticky"
      style={{ top: `calc(6rem + ${index * 1.6}rem)` }}
    >
      <motion.article
        style={{ scale }}
        className="group mx-auto mb-8 max-w-5xl origin-top overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium"
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[360px]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
            <Badge variant="gold" className="absolute left-4 top-4">
              {project.category}
            </Badge>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-7 md:p-10">
            <span className="font-display text-sm font-bold text-gold">
              0{index + 1} / 0{total}
            </span>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-gold" />
              {project.location} · {project.year}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href="/projects"
              className="mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-foreground"
            >
              View project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
