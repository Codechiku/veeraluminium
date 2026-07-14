/**
 * Central site configuration. Single source of truth for business identity,
 * navigation, services and contact details. Most values can be overridden by
 * environment variables so the owner can rebrand without code changes.
 */

export const siteConfig = {
  name: "Veer Aluminium & Fabrication",
  shortName: "Veer Aluminium",
  legalName: "Veer Aluminium & Fabrication",
  tagline: "Premium Aluminium Windows, Glass & Fabrication Solutions",
  description:
    "Veer Aluminium & Fabrication specialises in premium aluminium windows — alongside doors, toughened glass, structural glazing, ACP cladding and custom steel fabrication around Palanpur and across Gujarat. Trusted craftsmanship for residential and commercial spaces.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://veeraluminium.com",
  established: 2023,
  address: {
    line1: "Near Railway Overbridge, Ruppura",
    city: "Palanpur",
    state: "Gujarat",
    postalCode: "385001",
    country: "IN",
    full: "Near Railway Overbridge, Ruppura, Palanpur, Gujarat - 385001",
  },
  geo: {
    // Approximate coordinates for Palanpur, Gujarat — refine with exact pin.
    lat: 24.1722,
    lng: 72.4316,
  },
  contact: {
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91 97122 16273",
    phoneRaw: (process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+919712216273").replace(/\s/g, ""),
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919712216273",
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "ajchaudhary250@gmail.com",
  },
  hours: {
    weekdays: "Mon – Sat: 9:00 AM – 8:00 PM",
    sunday: "Sunday: By appointment",
  },
  social: {
    facebook: "https://www.facebook.com/share/1EHe5RK4Zq/",
    instagram: "https://www.instagram.com/veer_alluminium",
    youtube: "https://youtube.com/@veeraluminium",
  },
  serviceAreas: [
    "Palanpur",
    "Banaskantha",
    "Deesa",
    "Mehsana",
    "Ahmedabad",
    "Gandhinagar",
    "Disa",
    "Ambaji",
    "Mount Abu",
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Estimate", href: "/estimate" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceKey =
  | "aluminium-windows"
  | "aluminium-doors"
  | "sliding-windows"
  | "upvc-windows"
  | "toughened-glass"
  | "structural-glazing"
  | "acp-cladding"
  | "steel-fabrication"
  | "railings-balconies"
  | "pop-work"
  | "commercial-glass"
  | "residential-glass"
  | "profile-shutters"
  | "custom-fabrication";

export interface Service {
  key: ServiceKey;
  title: string;
  short: string;
  description: string;
  icon: string; // lucide-react icon name
  image: string;
  features: string[];
}

export const services: Service[] = [
  {
    key: "aluminium-windows",
    title: "Aluminium Windows",
    short: "Slim, durable, weather-sealed window systems.",
    description:
      "Precision-engineered aluminium window systems combining slim sightlines with superior thermal and acoustic performance. Powder-coated finishes that withstand Gujarat's climate for decades.",
    icon: "AppWindow",
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80",
    features: ["Powder-coated frames", "Weather sealing", "Multi-point locks", "Custom sizes"],
  },
  {
    key: "aluminium-doors",
    title: "Aluminium Doors",
    short: "Secure, elegant entry & interior door systems.",
    description:
      "From grand entrances to sleek interior partitions, our aluminium doors balance security, smooth operation and architectural beauty with premium hardware.",
    icon: "DoorOpen",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    features: ["Heavy-duty hinges", "Premium handles", "Glass infills", "Soundproofing"],
  },
  {
    key: "sliding-windows",
    title: "Sliding Windows",
    short: "Effortless glide, maximum daylight.",
    description:
      "Space-saving sliding window systems with smooth roller mechanisms, expansive glass for uninterrupted views, and tight seals against dust and noise.",
    icon: "MoveHorizontal",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    features: ["Smooth rollers", "Mosquito mesh ready", "2 & 3 track", "Anti-lift design"],
  },
  {
    key: "upvc-windows",
    title: "UPVC Windows",
    short: "Energy-efficient, low-maintenance frames.",
    description:
      "High-grade UPVC profiles offering excellent insulation, sound reduction and zero corrosion. Ideal for energy-conscious homes and offices.",
    icon: "Frame",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    features: ["Thermal insulation", "Corrosion-free", "Steel reinforced", "Multi-chamber"],
  },
  {
    key: "toughened-glass",
    title: "Toughened Glass",
    short: "Safety glass that's 5× stronger.",
    description:
      "Heat-treated toughened safety glass for facades, partitions, railings and doors. Up to five times stronger than ordinary glass and shatters safely.",
    icon: "Shield",
    image:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80",
    features: ["5× stronger", "Safe breakage", "Heat resistant", "Custom thickness"],
  },
  {
    key: "structural-glazing",
    title: "Structural Glazing",
    short: "Seamless glass facades for landmarks.",
    description:
      "Frameless, flush glass facades that turn commercial buildings into landmarks. Engineered for wind loads, weatherproofing and stunning aesthetics.",
    icon: "Building2",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    features: ["Frameless look", "Spider fittings", "Weatherproof", "Wind-load tested"],
  },
  {
    key: "acp-cladding",
    title: "ACP Cladding",
    short: "Bold, durable building exteriors.",
    description:
      "Aluminium Composite Panel cladding that transforms facades with vibrant, weather-resistant finishes — fire-rated options available for commercial projects.",
    icon: "LayoutGrid",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    features: ["Fire-rated options", "UV resistant", "Many finishes", "Lightweight"],
  },
  {
    key: "steel-fabrication",
    title: "Steel Fabrication",
    short: "Custom structural & decorative steelwork.",
    description:
      "Precision steel fabrication for structures, staircases, gates and industrial applications — welded, finished and installed by certified craftsmen.",
    icon: "Wrench",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    features: ["MS & SS work", "Certified welding", "Powder coating", "Site fabrication"],
  },
  {
    key: "railings-balconies",
    title: "Railings & Balconies",
    short: "Glass, steel & aluminium railing systems.",
    description:
      "Designer railing systems in stainless steel, glass and aluminium — safe, code-compliant and beautifully finished for stairs, balconies and terraces.",
    icon: "Fence",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    features: ["Glass railings", "SS handrails", "Balcony systems", "Code compliant"],
  },
  {
    key: "pop-work",
    title: "POP & False Ceiling",
    short: "Elegant ceilings & decorative finishes.",
    description:
      "Plaster of Paris and gypsum false ceilings with cove lighting, designer profiles and flawless finishes for premium interiors.",
    icon: "PanelTop",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    features: ["Designer ceilings", "Cove lighting", "Gypsum work", "Crisp finishes"],
  },
  {
    key: "commercial-glass",
    title: "Commercial Glass Solutions",
    short: "Glass systems for offices & retail.",
    description:
      "End-to-end commercial glass solutions — storefronts, office partitions, conference rooms and facades engineered for high-traffic environments.",
    icon: "Store",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    features: ["Storefronts", "Office partitions", "Conference glass", "Facades"],
  },
  {
    key: "residential-glass",
    title: "Residential Glass Solutions",
    short: "Beautiful glass for modern homes.",
    description:
      "Shower enclosures, glass railings, mirrors, partitions and balcony glazing tailored to elevate the comfort and elegance of your home.",
    icon: "Home",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
    features: ["Shower enclosures", "Mirrors", "Partitions", "Balcony glazing"],
  },
  {
    key: "profile-shutters",
    title: "Profile Shutters",
    short: "Secure roller & profile shutter systems.",
    description:
      "Heavy-duty aluminium and steel profile shutters for shops, garages and industrial units — smooth manual or motorised operation with robust security and weather protection.",
    icon: "Blinds",
    image:
      "https://images.unsplash.com/photo-1558959356-2c4a8ca4bb1f?auto=format&fit=crop&w=1200&q=80",
    features: ["Motorised options", "Aluminium & MS", "Remote operated", "Powder coated"],
  },
  {
    key: "custom-fabrication",
    title: "Custom Fabrication",
    short: "Bespoke solutions, engineered to spec.",
    description:
      "Have a unique requirement? Our design and fabrication team turns concepts into precision-built reality — measured, manufactured and installed end to end.",
    icon: "Hammer",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
    features: ["Free site survey", "3D design", "In-house production", "Turnkey install"],
  },
];

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

export const telLink = `tel:${siteConfig.contact.phoneRaw}`;
export const mailLink = `mailto:${siteConfig.contact.email}`;
