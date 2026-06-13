"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, MapPin, PlayCircle } from "lucide-react";
import {
  type Project,
  type ProjectCategory,
  projectCategories,
  projects as allProjects,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { BeforeAfter } from "@/components/before-after";

type Filter = "All" | ProjectCategory;

export function ProjectsGallery({
  limit,
  showFilter = true,
}: {
  limit?: number;
  showFilter?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const list = useMemo(() => {
    const filtered =
      filter === "All"
        ? allProjects
        : allProjects.filter((p) => p.category === filter);
    const sorted = filtered.slice().sort((a, b) => b.year - a.year);
    return limit ? sorted.slice(0, limit) : sorted;
  }, [filter, limit]);

  return (
    <>
      {showFilter && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {(["All", ...projectCategories] as Filter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === cat
                  ? "border-gold bg-gold text-gold-foreground shadow-lg shadow-gold/20"
                  : "border-border bg-background text-muted-foreground hover:border-gold/40 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Masonry via CSS columns */}
      <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence>
          {list.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mb-5 break-inside-avoid"
            >
              <button
                onClick={() => setActive(project)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border/60 text-left"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={project.width ?? 1200}
                    height={project.height ?? 1500}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />

                  {/* Top badges */}
                  <div className="absolute left-3 top-3 flex gap-2">
                    <Badge variant="gold">{project.category}</Badge>
                    {project.videoUrl && (
                      <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                        <PlayCircle className="h-3 w-3" /> Video
                      </span>
                    )}
                  </div>

                  {/* Expand icon */}
                  <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-lg font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-white/70">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.location} · {project.year}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          {active && (
            <div>
              {active.videoUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={active.videoUrl}
                    title={active.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : active.beforeImage && active.afterImage ? (
                <BeforeAfter
                  before={active.beforeImage}
                  after={active.afterImage}
                  className="rounded-none"
                />
              ) : (
                <div className="relative flex w-full justify-center bg-secondary">
                  <Image
                    src={active.image}
                    alt={active.title}
                    width={active.width ?? 1200}
                    height={active.height ?? 800}
                    sizes="768px"
                    className="h-auto max-h-[70vh] w-full object-contain"
                  />
                </div>
              )}
              <div className="p-6">
                <Badge variant="gold">{active.category}</Badge>
                <DialogTitle className="mt-3 font-display text-2xl">
                  {active.title}
                </DialogTitle>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {active.location} · {active.year}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {active.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
