/** Editorial content: projects, testimonials, timeline, stats, FAQs.
 *  These are the seed/fallback values; the CMS can override them in the DB. */

export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Glass Projects"
  | "Railings"
  | "ACP Work";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  videoUrl?: string;
  size: "tall" | "wide" | "normal";
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "skyline-residency",
    title: "Skyline Residency Glazing",
    category: "Residential",
    location: "Palanpur",
    year: 2024,
    description:
      "Full-home aluminium sliding windows and toughened glass balcony railings for a premium 4BHK residence, delivering panoramic views with superior weather sealing.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    beforeImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    size: "tall",
    tags: ["Sliding Windows", "Glass Railing", "Toughened Glass"],
  },
  {
    id: "veer-corporate-tower",
    title: "Corporate Tower Facade",
    category: "Commercial",
    location: "Ahmedabad",
    year: 2023,
    description:
      "Structural glazing and ACP cladding for a 9-storey corporate tower — a wind-load engineered curtain wall that became a city landmark.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    size: "wide",
    tags: ["Structural Glazing", "ACP Cladding", "Facade"],
  },
  {
    id: "industrial-shed",
    title: "Industrial Fabrication Unit",
    category: "Industrial",
    location: "Deesa",
    year: 2023,
    description:
      "Heavy-duty steel fabrication and powder-coated aluminium ventilators for a manufacturing facility, built to withstand harsh industrial conditions.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
    tags: ["Steel Fabrication", "Industrial"],
  },
  {
    id: "glass-house-villa",
    title: "Glass House Villa",
    category: "Glass Projects",
    location: "Mount Abu",
    year: 2024,
    description:
      "Frameless structural glazing wrapping a hillside villa in uninterrupted glass — engineered for thermal comfort and breathtaking views.",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
    size: "tall",
    tags: ["Structural Glazing", "Frameless Glass"],
  },
  {
    id: "spiral-railing",
    title: "Designer Glass Railing",
    category: "Railings",
    location: "Gandhinagar",
    year: 2024,
    description:
      "Stainless steel and toughened glass railing system for a luxury staircase, combining safety with sculptural elegance.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
    tags: ["Glass Railing", "SS Handrail"],
  },
  {
    id: "retail-acp",
    title: "Retail Showroom ACP",
    category: "ACP Work",
    location: "Palanpur",
    year: 2022,
    description:
      "Vibrant ACP cladding facade for a flagship retail showroom, with concealed lighting and a fire-rated panel system.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    size: "wide",
    tags: ["ACP Cladding", "Retail"],
  },
  {
    id: "office-partition",
    title: "Office Glass Partitions",
    category: "Commercial",
    location: "Mehsana",
    year: 2023,
    description:
      "Floor-to-ceiling glass partitions and aluminium doors creating bright, acoustically comfortable workspaces for a growing enterprise.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
    tags: ["Partitions", "Commercial Glass"],
  },
  {
    id: "premium-balcony",
    title: "Premium Balcony Glazing",
    category: "Residential",
    location: "Banaskantha",
    year: 2024,
    description:
      "Slimline sliding glass balcony enclosures that protect against dust and weather while preserving open views.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
    tags: ["Balcony Glazing", "Sliding"],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Industrial",
  "Glass Projects",
  "Railings",
  "ACP Work",
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  image: string;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Patel",
    role: "Homeowner",
    location: "Palanpur",
    rating: 5,
    quote:
      "Veer Aluminium transformed our home with stunning sliding windows. The finish, the smoothness, the sealing — everything feels premium. Truly professional team.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t2",
    name: "Meena Shah",
    role: "Interior Architect",
    location: "Ahmedabad",
    rating: 5,
    quote:
      "I specify Veer for all my commercial projects. Their structural glazing work is flawless and they deliver on time, every time. A reliable partner.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "t3",
    name: "Anil Desai",
    role: "Builder",
    location: "Deesa",
    rating: 5,
    quote:
      "From ACP cladding to railings, the craftsmanship is enterprise-grade. The estimate was transparent and the final bill matched exactly. Highly recommended.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t4",
    name: "Priya Mehta",
    role: "Café Owner",
    location: "Gandhinagar",
    rating: 5,
    quote:
      "Our storefront glass and partitions look world-class. Customers constantly compliment the space. Veer's attention to detail is unmatched in the region.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export const stats: Stat[] = [
  { label: "Projects Completed", value: 1200, suffix: "+", icon: "CheckCircle2" },
  { label: "Happy Clients", value: 950, suffix: "+", icon: "Users" },
  { label: "Years Experience", value: 15, suffix: "+", icon: "CalendarClock" },
  { label: "Cities Served", value: 25, suffix: "+", icon: "MapPin" },
];

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineItem[] = [
  {
    year: "2009",
    title: "The Foundation",
    description:
      "Veer Aluminium & Fabrication opens its first workshop in Palanpur, driven by a simple promise: precision craftsmanship at honest prices.",
  },
  {
    year: "2014",
    title: "Scaling Up",
    description:
      "Expanded into structural glazing and ACP cladding, serving our first commercial landmark projects across Banaskantha.",
  },
  {
    year: "2018",
    title: "Modern Manufacturing",
    description:
      "Invested in CNC cutting, automated powder coating and a dedicated glass-processing line for enterprise-grade consistency.",
  },
  {
    year: "2021",
    title: "Regional Leader",
    description:
      "Became one of North Gujarat's most trusted names for aluminium and glass, completing over 800 projects across 20+ cities.",
  },
  {
    year: "2026",
    title: "Engineering the Future",
    description:
      "Digital-first quotations, 3D previews and turnkey project management — bringing international standards to every doorstep.",
  },
];

export interface WhyChoose {
  title: string;
  description: string;
  icon: string;
}

export const whyChoose: WhyChoose[] = [
  {
    title: "15+ Years of Experience",
    description:
      "Over a decade and a half of perfecting aluminium and glass craftsmanship across residential, commercial and industrial projects.",
    icon: "Award",
  },
  {
    title: "Quality Assurance",
    description:
      "Every product passes a multi-point quality check — from material grade to finish, sealing and smooth operation.",
    icon: "ShieldCheck",
  },
  {
    title: "Expert In-House Team",
    description:
      "Certified fabricators, glaziers and installers who treat every project as a signature piece of work.",
    icon: "Users",
  },
  {
    title: "Precision Manufacturing",
    description:
      "CNC-driven cutting and automated finishing deliver enterprise-grade consistency, batch after batch.",
    icon: "Cog",
  },
  {
    title: "Modern Technology",
    description:
      "Digital measurement, 3D previews and instant estimates bring transparency and accuracy to your project.",
    icon: "Cpu",
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden costs. Our quotation engine gives you an itemised, GST-inclusive estimate before we ever begin.",
    icon: "ReceiptText",
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "How accurate is the online estimate?",
    answer:
      "Our quotation engine uses real material, labour and installation rates to give you a highly accurate ballpark instantly. The final quote is confirmed after a free on-site measurement.",
  },
  {
    question: "Do you offer a free site visit?",
    answer:
      "Yes. We provide a free site survey and measurement across Palanpur and surrounding cities so your final quotation is precise to the millimetre.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Palanpur and the wider North Gujarat region including Banaskantha, Deesa, Mehsana, Ahmedabad, Gandhinagar and beyond. Larger projects are undertaken across Gujarat.",
  },
  {
    question: "What warranty do you provide?",
    answer:
      "We provide a workmanship warranty on installation plus the manufacturer's warranty on hardware and profiles. Specifics are detailed in your final quotation.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Residential windows and doors are typically completed within 7–15 days of confirmation. Larger commercial glazing and ACP projects are scheduled with a detailed timeline.",
  },
  {
    question: "Can I manage the website content and pricing myself?",
    answer:
      "Yes. The admin CMS lets you update content, projects, testimonials and all pricing rates — the estimate calculator recalculates automatically.",
  },
];
