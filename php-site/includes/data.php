<?php
/**
 * Single source of truth for business identity, navigation, services and all
 * editorial content — the PHP port of src/lib/site.ts, content.ts and
 * editable-content.ts.
 */

$SITE = [
    'name' => 'Veer Aluminium & Fabrication',
    'shortName' => 'Veer Aluminium',
    'legalName' => 'Veer Aluminium & Fabrication',
    'tagline' => 'Premium Aluminium, Glass & Fabrication Solutions',
    'description' => "Veer Aluminium & Fabrication delivers precision-engineered aluminium windows, doors, toughened glass, structural glazing, ACP cladding and custom steel fabrication across Gujarat. Trusted craftsmanship for residential and commercial spaces.",
    'url' => 'https://veeraluminium.com',
    'established' => 2023,
    'address' => [
        'line1' => 'Near Railway Overbridge, Ruppura',
        'city' => 'Palanpur',
        'state' => 'Gujarat',
        'postalCode' => '385001',
        'country' => 'IN',
        'full' => 'Near Railway Overbridge, Ruppura, Palanpur, Gujarat - 385001',
    ],
    'geo' => ['lat' => 24.1722, 'lng' => 72.4316],
    'contact' => [
        'phone' => '+91 99999 99999',
        'phoneRaw' => '+919999999999',
        'whatsapp' => '919999999999',
        'email' => 'info@veeraluminium.com',
    ],
    'hours' => [
        'weekdays' => 'Mon – Sat: 9:00 AM – 8:00 PM',
        'sunday' => 'Sunday: By appointment',
    ],
    'social' => [
        'facebook' => 'https://facebook.com',
        'instagram' => 'https://instagram.com',
        'youtube' => 'https://youtube.com',
        'linkedin' => 'https://linkedin.com',
    ],
    'serviceAreas' => ['Palanpur', 'Banaskantha', 'Deesa', 'Mehsana', 'Ahmedabad', 'Gandhinagar', 'Disa', 'Ambaji', 'Mount Abu'],
];

$NAV_LINKS = [
    ['label' => 'Home', 'href' => '/index.php'],
    ['label' => 'Services', 'href' => '/index.php#services'],
    ['label' => 'Projects', 'href' => '/projects.php'],
    ['label' => 'Estimate', 'href' => '/estimate.php'],
    ['label' => 'About', 'href' => '/index.php#about'],
    ['label' => 'Contact', 'href' => '/contact.php'],
];

$telLink = 'tel:' . $SITE['contact']['phoneRaw'];
$mailLink = 'mailto:' . $SITE['contact']['email'];
function whatsapp_link($message = '')
{
    global $SITE;
    $base = 'https://wa.me/' . $SITE['contact']['whatsapp'];
    return $message ? $base . '?text=' . rawurlencode($message) : $base;
}

// ── Services (src/lib/site.ts) ───────────────────────────────────────────
$SERVICES = [
    ['key' => 'aluminium-windows', 'title' => 'Aluminium Windows', 'short' => 'Slim, durable, weather-sealed window systems.', 'description' => "Precision-engineered aluminium window systems combining slim sightlines with superior thermal and acoustic performance. Powder-coated finishes that withstand Gujarat's climate for decades.", 'icon' => 'AppWindow', 'image' => 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80', 'features' => ['Powder-coated frames', 'Weather sealing', 'Multi-point locks', 'Custom sizes']],
    ['key' => 'aluminium-doors', 'title' => 'Aluminium Doors', 'short' => 'Secure, elegant entry & interior door systems.', 'description' => 'From grand entrances to sleek interior partitions, our aluminium doors balance security, smooth operation and architectural beauty with premium hardware.', 'icon' => 'DoorOpen', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'features' => ['Heavy-duty hinges', 'Premium handles', 'Glass infills', 'Soundproofing']],
    ['key' => 'sliding-windows', 'title' => 'Sliding Windows', 'short' => 'Effortless glide, maximum daylight.', 'description' => 'Space-saving sliding window systems with smooth roller mechanisms, expansive glass for uninterrupted views, and tight seals against dust and noise.', 'icon' => 'MoveHorizontal', 'image' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80', 'features' => ['Smooth rollers', 'Mosquito mesh ready', '2 & 3 track', 'Anti-lift design']],
    ['key' => 'upvc-windows', 'title' => 'UPVC Windows', 'short' => 'Energy-efficient, low-maintenance frames.', 'description' => 'High-grade UPVC profiles offering excellent insulation, sound reduction and zero corrosion. Ideal for energy-conscious homes and offices.', 'icon' => 'Frame', 'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 'features' => ['Thermal insulation', 'Corrosion-free', 'Steel reinforced', 'Multi-chamber']],
    ['key' => 'toughened-glass', 'title' => 'Toughened Glass', 'short' => "Safety glass that's 5× stronger.", 'description' => 'Heat-treated toughened safety glass for facades, partitions, railings and doors. Up to five times stronger than ordinary glass and shatters safely.', 'icon' => 'Shield', 'image' => 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80', 'features' => ['5× stronger', 'Safe breakage', 'Heat resistant', 'Custom thickness']],
    ['key' => 'structural-glazing', 'title' => 'Structural Glazing', 'short' => 'Seamless glass facades for landmarks.', 'description' => 'Frameless, flush glass facades that turn commercial buildings into landmarks. Engineered for wind loads, weatherproofing and stunning aesthetics.', 'icon' => 'Building2', 'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'features' => ['Frameless look', 'Spider fittings', 'Weatherproof', 'Wind-load tested']],
    ['key' => 'acp-cladding', 'title' => 'ACP Cladding', 'short' => 'Bold, durable building exteriors.', 'description' => 'Aluminium Composite Panel cladding that transforms facades with vibrant, weather-resistant finishes — fire-rated options available for commercial projects.', 'icon' => 'LayoutGrid', 'image' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80', 'features' => ['Fire-rated options', 'UV resistant', 'Many finishes', 'Lightweight']],
    ['key' => 'steel-fabrication', 'title' => 'Steel Fabrication', 'short' => 'Custom structural & decorative steelwork.', 'description' => 'Precision steel fabrication for structures, staircases, gates and industrial applications — welded, finished and installed by certified craftsmen.', 'icon' => 'Wrench', 'image' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80', 'features' => ['MS & SS work', 'Certified welding', 'Powder coating', 'Site fabrication']],
    ['key' => 'railings-balconies', 'title' => 'Railings & Balconies', 'short' => 'Glass, steel & aluminium railing systems.', 'description' => 'Designer railing systems in stainless steel, glass and aluminium — safe, code-compliant and beautifully finished for stairs, balconies and terraces.', 'icon' => 'Fence', 'image' => 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80', 'features' => ['Glass railings', 'SS handrails', 'Balcony systems', 'Code compliant']],
    ['key' => 'pop-work', 'title' => 'POP & False Ceiling', 'short' => 'Elegant ceilings & decorative finishes.', 'description' => 'Plaster of Paris and gypsum false ceilings with cove lighting, designer profiles and flawless finishes for premium interiors.', 'icon' => 'PanelTop', 'image' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', 'features' => ['Designer ceilings', 'Cove lighting', 'Gypsum work', 'Crisp finishes']],
    ['key' => 'commercial-glass', 'title' => 'Commercial Glass Solutions', 'short' => 'Glass systems for offices & retail.', 'description' => 'End-to-end commercial glass solutions — storefronts, office partitions, conference rooms and facades engineered for high-traffic environments.', 'icon' => 'Store', 'image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', 'features' => ['Storefronts', 'Office partitions', 'Conference glass', 'Facades']],
    ['key' => 'residential-glass', 'title' => 'Residential Glass Solutions', 'short' => 'Beautiful glass for modern homes.', 'description' => 'Shower enclosures, glass railings, mirrors, partitions and balcony glazing tailored to elevate the comfort and elegance of your home.', 'icon' => 'Home', 'image' => 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80', 'features' => ['Shower enclosures', 'Mirrors', 'Partitions', 'Balcony glazing']],
    ['key' => 'profile-shutters', 'title' => 'Profile Shutters', 'short' => 'Secure roller & profile shutter systems.', 'description' => 'Heavy-duty aluminium and steel profile shutters for shops, garages and industrial units — smooth manual or motorised operation with robust security and weather protection.', 'icon' => 'Blinds', 'image' => 'https://images.unsplash.com/photo-1558959356-2c4a8ca4bb1f?auto=format&fit=crop&w=1200&q=80', 'features' => ['Motorised options', 'Aluminium & MS', 'Remote operated', 'Powder coated']],
    ['key' => 'custom-fabrication', 'title' => 'Custom Fabrication', 'short' => 'Bespoke solutions, engineered to spec.', 'description' => 'Have a unique requirement? Our design and fabrication team turns concepts into precision-built reality — measured, manufactured and installed end to end.', 'icon' => 'Hammer', 'image' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80', 'features' => ['Free site survey', '3D design', 'In-house production', 'Turnkey install']],
];

// ── Projects (src/lib/content.ts) — real portfolio photos ────────────────
$PROJECTS = [
    ['id' => 'arched-wood-window', 'title' => 'Arched Wood-Finish Window', 'category' => 'Residential', 'location' => 'Palanpur', 'year' => 2026, 'description' => 'A statement arched aluminium window in a warm wood-grain powder-coat finish with twin openable casements and integrated grills — combining classic character with modern thermal sealing.', 'image' => '/portfolio/arched-wood-window.png', 'size' => 'tall', 'tags' => ['Aluminium Window', 'Wood Finish', 'Casement']],
    ['id' => 'modern-villa-glazing', 'title' => 'Modern Villa Entrance Glazing', 'category' => 'Residential', 'location' => 'Mehsana', 'year' => 2026, 'description' => 'Slimline black aluminium glazing with a pivoting glass entry door for a contemporary villa — crisp sightlines, flush glass and weather-tight performance from front elevation to corner windows.', 'image' => '/portfolio/modern-villa-glazing.png', 'size' => 'wide', 'tags' => ['Pivot Door', 'Aluminium Glazing', 'Facade']],
    ['id' => 'office-glass-partition', 'title' => 'Office Glass Partitions', 'category' => 'Commercial', 'location' => 'Ahmedabad', 'year' => 2025, 'description' => 'Floor-to-ceiling black-framed glass partitions and an aluminium glass door dividing an office into bright, acoustically comfortable cabins without blocking natural light.', 'image' => '/portfolio/office-glass-partition.png', 'size' => 'wide', 'tags' => ['Glass Partition', 'Aluminium Door', 'Office']],
    ['id' => 'frosted-glass-cabin', 'title' => 'Frosted Glass Cabin Partition', 'category' => 'Commercial', 'location' => 'Gandhinagar', 'year' => 2025, 'description' => 'A free-standing matte-black aluminium cabin with frosted glass infills — a private meeting room carved out of an open floor plate with clean, modern detailing.', 'image' => '/portfolio/frosted-glass-cabin.png', 'size' => 'tall', 'tags' => ['Partition', 'Frosted Glass', 'Aluminium']],
    ['id' => 'corner-picture-window', 'title' => 'Corner Picture Window', 'category' => 'Residential', 'location' => 'Banaskantha', 'year' => 2025, 'description' => 'A large fixed black-framed corner picture window framing uninterrupted countryside views, engineered with structural mullions for strength and minimal sightlines.', 'image' => '/portfolio/corner-picture-window.png', 'size' => 'tall', 'tags' => ['Fixed Window', 'Aluminium', 'Picture Window']],
    ['id' => 'window-safety-grill', 'title' => 'Designer Window Safety Grill', 'category' => 'Railings', 'location' => 'Deesa', 'year' => 2024, 'description' => 'A robust horizontal-bar safety grill in a warm copper finish over a stone-framed window — security and protection delivered with a clean architectural rhythm.', 'image' => '/portfolio/window-safety-grill.png', 'size' => 'normal', 'tags' => ['Safety Grill', 'MS Work', 'Window']],
    ['id' => 'frameless-glass-cabin', 'title' => 'Frameless Glass Office Cabin', 'category' => 'Glass Projects', 'location' => 'Palanpur', 'year' => 2024, 'description' => 'Frameless toughened glass partitions and swing doors enclosing a wood-and-marble executive cabin — a seamless glass envelope that keeps the interior open and light-filled.', 'image' => '/portfolio/frameless-glass-cabin.png', 'size' => 'tall', 'tags' => ['Frameless Glass', 'Partition', 'Interior']],
];

$PROJECT_CATEGORIES = ['Residential', 'Commercial', 'Glass Projects', 'Railings'];

// ── Testimonials ─────────────────────────────────────────────────────────
$TESTIMONIALS = [
    ['id' => 't1', 'name' => 'Rajesh Patel', 'role' => 'Homeowner', 'location' => 'Palanpur', 'rating' => 5, 'quote' => 'Veer Aluminium transformed our home with stunning sliding windows. The finish, the smoothness, the sealing — everything feels premium. Truly professional team.', 'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 'videoUrl' => null],
    ['id' => 't2', 'name' => 'Meena Shah', 'role' => 'Interior Architect', 'location' => 'Ahmedabad', 'rating' => 5, 'quote' => 'I specify Veer for all my commercial projects. Their structural glazing work is flawless and they deliver on time, every time. A reliable partner.', 'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'videoUrl' => 'https://www.youtube.com/embed/dQw4w9WgXcQ'],
    ['id' => 't3', 'name' => 'Anil Desai', 'role' => 'Builder', 'location' => 'Deesa', 'rating' => 5, 'quote' => 'From ACP cladding to railings, the craftsmanship is enterprise-grade. The estimate was transparent and the final bill matched exactly. Highly recommended.', 'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 'videoUrl' => null],
    ['id' => 't4', 'name' => 'Priya Mehta', 'role' => 'Café Owner', 'location' => 'Gandhinagar', 'rating' => 5, 'quote' => "Our storefront glass and partitions look world-class. Customers constantly compliment the space. Veer's attention to detail is unmatched in the region.", 'image' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', 'videoUrl' => null],
];

// ── Stats ────────────────────────────────────────────────────────────────
$STATS = [
    ['label' => 'Projects Completed', 'value' => 150, 'suffix' => '+', 'icon' => 'CheckCircle2'],
    ['label' => 'Happy Clients', 'value' => 120, 'suffix' => '+', 'icon' => 'Users'],
    ['label' => 'Years Experience', 'value' => 3, 'suffix' => '+', 'icon' => 'CalendarClock'],
    ['label' => 'Cities Served', 'value' => 10, 'suffix' => '+', 'icon' => 'MapPin'],
];

// ── Timeline ─────────────────────────────────────────────────────────────
$TIMELINE = [
    ['year' => '2023', 'title' => 'The Foundation', 'description' => 'Veer Aluminium & Fabrication opens its Palanpur workshop with a clear promise: precise aluminium and glass work at honest prices.'],
    ['year' => '2024', 'title' => 'Building Trust', 'description' => 'Expanded from residential windows into railings, partitions and storefront glass for clients across Banaskantha.'],
    ['year' => '2025', 'title' => 'Commercial Projects', 'description' => 'Delivered larger ACP, glazing and fabrication assignments while strengthening site measurement and installation workflows.'],
    ['year' => '2026', 'title' => 'Growing Across Gujarat', 'description' => 'Crossed 150+ completed projects and 120+ happy clients, bringing faster quotes and cleaner project tracking to every job.'],
];

// ── Why Choose ───────────────────────────────────────────────────────────
$WHY_CHOOSE = [
    ['title' => '3+ Years of Experience', 'description' => 'Three focused years of aluminium and glass craftsmanship across residential, commercial and industrial projects.', 'icon' => 'Award'],
    ['title' => 'Quality Assurance', 'description' => 'Every product passes a multi-point quality check — from material grade to finish, sealing and smooth operation.', 'icon' => 'ShieldCheck'],
    ['title' => 'Expert In-House Team', 'description' => 'Certified fabricators, glaziers and installers who treat every project as a signature piece of work.', 'icon' => 'Users'],
    ['title' => 'Precision Manufacturing', 'description' => 'CNC-driven cutting and automated finishing deliver enterprise-grade consistency, batch after batch.', 'icon' => 'Cog'],
    ['title' => 'Modern Technology', 'description' => 'Digital measurement, 3D previews and instant estimates bring transparency and accuracy to your project.', 'icon' => 'Cpu'],
    ['title' => 'Transparent Pricing', 'description' => 'No hidden costs. Our quotation engine gives you an itemised, GST-inclusive estimate before we ever begin.', 'icon' => 'ReceiptText'],
];

// ── Process steps ────────────────────────────────────────────────────────
$PROCESS = [
    ['icon' => 'Ruler', 'title' => 'Free Site Survey', 'description' => 'Our experts visit your site, take precise digital measurements and understand your vision — at no cost.', 'image' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80'],
    ['icon' => 'ClipboardList', 'title' => 'Design & Quotation', 'description' => 'We craft a tailored design with 3D previews and an itemised, transparent quotation you approve before we begin.', 'image' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80'],
    ['icon' => 'Factory', 'title' => 'Precision Manufacturing', 'description' => 'Your order is fabricated on CNC-driven lines with rigorous quality control at every stage.', 'image' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80'],
    ['icon' => 'Truck', 'title' => 'Delivery & Installation', 'description' => 'Certified crews install with care, on schedule, leaving your space clean and finished to perfection.', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'],
    ['icon' => 'ShieldCheck', 'title' => 'Handover & Warranty', 'description' => 'A final walkthrough, smooth-operation check and warranty handover — plus ongoing support whenever you need it.', 'image' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80'],
];

// ── FAQs ─────────────────────────────────────────────────────────────────
$FAQS = [
    ['question' => 'How accurate is the online estimate?', 'answer' => 'Our quotation engine uses real material, labour and installation rates to give you a highly accurate ballpark instantly. The final quote is confirmed after a free on-site measurement.'],
    ['question' => 'Do you offer a free site visit?', 'answer' => 'Yes. We provide a free site survey and measurement across Palanpur and surrounding cities so your final quotation is precise to the millimetre.'],
    ['question' => 'What areas do you serve?', 'answer' => 'We serve Palanpur and the wider North Gujarat region including Banaskantha, Deesa, Mehsana, Ahmedabad, Gandhinagar and beyond. Larger projects are undertaken across Gujarat.'],
    ['question' => 'What warranty do you provide?', 'answer' => "We provide a workmanship warranty on installation plus the manufacturer's warranty on hardware and profiles. Specifics are detailed in your final quotation."],
    ['question' => 'How long does a typical project take?', 'answer' => 'Residential windows and doors are typically completed within 7–15 days of confirmation. Larger commercial glazing and ACP projects are scheduled with a detailed timeline.'],
    ['question' => 'Can I manage the website content and pricing myself?', 'answer' => 'Yes. The admin CMS lets you update content, projects, testimonials and all pricing rates — the estimate calculator recalculates automatically.'],
];

// ── Editable site content defaults (src/lib/editable-content.ts) ─────────
$DEFAULT_CONTENT = [
    'hero' => [
        'badge' => 'Trusted by 120+ clients across Gujarat',
        'titleLead' => 'Transforming Spaces With',
        'titleHighlight' => 'Premium Aluminium',
        'titleTail' => '& Glass Solutions',
        'subheading' => 'Trusted aluminium, glass & fabrication experts serving Gujarat with precision engineering and modern design.',
        'ctaPrimary' => 'Get Free Estimate',
        'ctaSecondary' => 'View Projects',
    ],
    'about' => [
        'eyebrow' => 'Our Story',
        'title' => 'Built on Precision, Trusted for Generations',
        'body' => 'Since 2023, Veer Aluminium & Fabrication has grown from a focused Palanpur workshop into a trusted aluminium, glass and fabrication team across North Gujarat.',
        'experienceYears' => '3+',
    ],
    'services' => [
        'eyebrow' => 'What We Do',
        'title' => 'Comprehensive Aluminium & Glass Solutions',
        'description' => 'From precision windows to landmark facades, every service is engineered to enterprise standards and finished to perfection.',
    ],
    'cta' => [
        'title' => 'Ready to Transform Your Space?',
        'description' => 'Get an instant, transparent estimate or speak with our team today. Free site visits across Palanpur and Gujarat.',
    ],
];
define('CONTENT_KEY', 'home');
