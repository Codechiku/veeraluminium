import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSans, fontDisplay } from "@/lib/fonts";
import { baseMetadata, localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/json-ld";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  ...baseMetadata,
  // Manifest is auto-served from src/app/manifest.ts at /manifest.webmanifest
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Veer Aluminium",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontDisplay.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
