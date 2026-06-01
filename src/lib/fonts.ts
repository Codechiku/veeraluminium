import { Inter, Playfair_Display } from "next/font/google";

/** Body / UI typeface. */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/** Display / headline typeface for a premium editorial feel. */
export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
  fallback: ["Georgia", "Times New Roman", "serif"],
});
