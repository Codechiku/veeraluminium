import type { Metadata } from "next";
import { siteConfig, services } from "./site";

const keywords = [
  "Aluminium Windows Palanpur",
  "UPVC Windows Gujarat",
  "Glass Fabrication Palanpur",
  "Aluminium Fabrication Gujarat",
  "ACP Work Palanpur",
  "Toughened Glass Gujarat",
  "Structural Glazing Gujarat",
  "Sliding Windows Palanpur",
  "Steel Fabrication Banaskantha",
  "Glass Railings Gujarat",
];

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Aluminium, Glass & Fabrication Experts in Palanpur`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Premium Aluminium & Glass Solutions`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Construction & Architecture",
};

/** LocalBusiness + Organization JSON-LD structured data. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "₹₹",
    image: `${siteConfig.url}/og-image.png`,
    logo: `${siteConfig.url}/icon-512.png`,
    foundingDate: String(siteConfig.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: siteConfig.serviceAreas.map((a) => ({
      "@type": "City",
      name: a,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aluminium & Glass Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/projects?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
