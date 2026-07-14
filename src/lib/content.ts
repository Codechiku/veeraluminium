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
  /** Natural pixel dimensions of `image` — used to render at true aspect ratio (no cropping). */
  width?: number;
  height?: number;
  beforeImage?: string;
  afterImage?: string;
  videoUrl?: string;
  size: "tall" | "wide" | "normal";
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "arched-wood-window",
    title: "Arched Wood-Finish Window",
    category: "Residential",
    location: "Palanpur",
    year: 2026,
    description:
      "A statement arched aluminium window in a warm wood-grain powder-coat finish with twin openable casements and integrated grills — combining classic character with modern thermal sealing.",
    image: "/portfolio/arched-wood-window.png",
    width: 1086,
    height: 1448,
    size: "tall",
    tags: ["Aluminium Window", "Wood Finish", "Casement"],
  },
  {
    id: "modern-villa-glazing",
    title: "Modern Villa Entrance Glazing",
    category: "Residential",
    location: "Mehsana",
    year: 2026,
    description:
      "Slimline black aluminium glazing with a pivoting glass entry door for a contemporary villa — crisp sightlines, flush glass and weather-tight performance from front elevation to corner windows.",
    image: "/portfolio/modern-villa-glazing.png",
    width: 1150,
    height: 1368,
    size: "wide",
    tags: ["Pivot Door", "Aluminium Glazing", "Facade"],
  },
  {
    id: "office-glass-partition",
    title: "Office Glass Partitions",
    category: "Commercial",
    location: "Ahmedabad",
    year: 2025,
    description:
      "Floor-to-ceiling black-framed glass partitions and an aluminium glass door dividing an office into bright, acoustically comfortable cabins without blocking natural light.",
    image: "/portfolio/office-glass-partition.png",
    width: 1448,
    height: 1086,
    size: "wide",
    tags: ["Glass Partition", "Aluminium Door", "Office"],
  },
  {
    id: "frosted-glass-cabin",
    title: "Frosted Glass Cabin Partition",
    category: "Commercial",
    location: "Gandhinagar",
    year: 2025,
    description:
      "A free-standing matte-black aluminium cabin with frosted glass infills — a private meeting room carved out of an open floor plate with clean, modern detailing.",
    image: "/portfolio/frosted-glass-cabin.png",
    width: 1086,
    height: 1448,
    size: "tall",
    tags: ["Partition", "Frosted Glass", "Aluminium"],
  },
  {
    id: "corner-picture-window",
    title: "Corner Picture Window",
    category: "Residential",
    location: "Banaskantha",
    year: 2025,
    description:
      "A large fixed black-framed corner picture window framing uninterrupted countryside views, engineered with structural mullions for strength and minimal sightlines.",
    image: "/portfolio/corner-picture-window.png",
    width: 1086,
    height: 1448,
    size: "tall",
    tags: ["Fixed Window", "Aluminium", "Picture Window"],
  },
  {
    id: "window-safety-grill",
    title: "Designer Window Safety Grill",
    category: "Railings",
    location: "Deesa",
    year: 2024,
    description:
      "A robust horizontal-bar safety grill in a warm copper finish over a stone-framed window — security and protection delivered with a clean architectural rhythm.",
    image: "/portfolio/window-safety-grill.png",
    width: 1168,
    height: 1347,
    size: "normal",
    tags: ["Safety Grill", "MS Work", "Window"],
  },
  {
    id: "frameless-glass-cabin",
    title: "Frameless Glass Office Cabin",
    category: "Glass Projects",
    location: "Palanpur",
    year: 2024,
    description:
      "Frameless toughened glass partitions and swing doors enclosing a wood-and-marble executive cabin — a seamless glass envelope that keeps the interior open and light-filled.",
    image: "/portfolio/frameless-glass-cabin.png",
    width: 1086,
    height: 1448,
    size: "tall",
    tags: ["Frameless Glass", "Partition", "Interior"],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Glass Projects",
  "Railings",
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
  { label: "Projects Completed", value: 150, suffix: "+", icon: "CheckCircle2" },
  { label: "Happy Clients", value: 120, suffix: "+", icon: "Users" },
  { label: "Years Experience", value: 3, suffix: "+", icon: "CalendarClock" },
  { label: "Cities Served", value: 10, suffix: "+", icon: "MapPin" },
];

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineItem[] = [
  {
    year: "2023",
    title: "The Foundation",
    description:
      "Veer Aluminium & Fabrication opens its Palanpur workshop with a clear promise: precise aluminium and glass work at honest prices.",
  },
  {
    year: "2024",
    title: "Building Trust",
    description:
      "Expanded from residential windows into railings, partitions and storefront glass for clients across Banaskantha.",
  },
  {
    year: "2025",
    title: "Commercial Projects",
    description:
      "Delivered larger ACP, glazing and fabrication assignments while strengthening site measurement and installation workflows.",
  },
  {
    year: "2026",
    title: "Growing Across Gujarat",
    description:
      "Crossed 150+ completed projects and 120+ happy clients, bringing faster quotes and cleaner project tracking to every job.",
  },
];

export interface WhyChoose {
  title: string;
  description: string;
  icon: string;
}

export const whyChoose: WhyChoose[] = [
  {
    title: "3+ Years of Experience",
    description:
      "Three focused years of aluminium and glass craftsmanship across residential, commercial and industrial projects.",
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
      "We serve Palanpur and the surrounding region — typically within a 70–90 km radius of the city — including Banaskantha, Deesa, Mehsana, Ambaji, Mount Abu and nearby towns. Larger projects are undertaken across Gujarat.",
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
];
