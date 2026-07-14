import Image from "next/image";
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
      <Image
        src="/logo.png"
        alt="Veer Aluminium & Fabrication"
        width={541}
        height={541}
        priority
        className="h-10 w-10 shrink-0 object-contain"
      />
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
