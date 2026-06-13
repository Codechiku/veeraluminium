/**
 * Editable content blocks managed from the Admin → Content CMS page.
 * The public site reads these (server-side) with the defaults below as a
 * guaranteed fallback, so the page always renders even before any edit.
 *
 * Stored via the key/value store under content key "home".
 */

export interface SiteContent {
  hero: {
    badge: string;
    titleLead: string; // text before the highlighted phrase
    titleHighlight: string; // gold-highlighted phrase
    titleTail: string; // text after
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    experienceYears: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
  };
}

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: "Trusted by 120+ clients across Gujarat",
    titleLead: "Transforming Spaces With",
    titleHighlight: "Premium Aluminium",
    titleTail: "& Glass Solutions",
    subheading:
      "Trusted aluminium, glass & fabrication experts serving Gujarat with precision engineering and modern design.",
    ctaPrimary: "Get Free Estimate",
    ctaSecondary: "View Projects",
  },
  about: {
    eyebrow: "Our Story",
    title: "Built on Precision, Trusted for Generations",
    body: "Since 2023, Veer Aluminium & Fabrication has grown from a focused Palanpur workshop into a trusted aluminium, glass and fabrication team across North Gujarat.",
    experienceYears: "3+",
  },
  services: {
    eyebrow: "What We Do",
    title: "Comprehensive Aluminium & Glass Solutions",
    description:
      "From precision windows to landmark facades, every service is engineered to enterprise standards and finished to perfection.",
  },
  cta: {
    title: "Ready to Transform Your Space?",
    description:
      "Get an instant, transparent estimate or speak with our team today. Free site visits across Palanpur and Gujarat.",
  },
};

export const CONTENT_KEY = "home";
