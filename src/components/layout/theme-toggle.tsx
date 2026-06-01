"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative overflow-hidden"
    >
      {mounted ? (
        <>
          <Sun
            className={`h-5 w-5 transition-all duration-500 ${
              isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
          />
          <Moon
            className={`absolute h-5 w-5 transition-all duration-500 ${
              isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
          />
        </>
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
