import { cn } from "@/lib/utils";

export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-[#8a6512] shadow-lg shadow-gold/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-white"
          aria-hidden
        >
          <path
            d="M4 4h16v16H4z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7 7l10 10M17 7L7 17"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.5"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-bold tracking-tight",
            invert ? "text-white" : "text-foreground",
          )}
        >
          VEER
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.22em]",
            invert ? "text-white/70" : "text-muted-foreground",
          )}
        >
          Aluminium
        </span>
      </span>
    </span>
  );
}
