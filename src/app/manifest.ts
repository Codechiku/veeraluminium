import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Veer Aluminium",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0c1018",
    theme_color: "#0c1018",
    orientation: "portrait-primary",
    categories: ["business", "construction", "shopping"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
