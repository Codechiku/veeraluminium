import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton screen for the projects gallery while it loads. */
export default function ProjectsLoading() {
  return (
    <div className="pt-32 md:pt-40">
      <div className="container">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="mt-4 h-12 w-3/4 max-w-xl" />
        <Skeleton className="mt-4 h-5 w-2/3 max-w-lg" />

        <div className="mt-12 flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {[320, 420, 260, 380, 300, 440].map((h, i) => (
            <Skeleton
              key={i}
              className="mb-5 w-full rounded-2xl"
              style={{ height: h }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
