/* ============================================================
   Veer Aluminium — Gujarati language layer (premium revamp).
   Self-contained client-side translator for BOTH the PHP site
   and the Next.js app:
     • animated first-visit popup offering Gujarati,
     • natural, marketing-grade Gujarati copy (not literal),
     • characterful Gujarati typography (Baloo Bhai 2 / Anek),
     • product names & short-forms stay English (omitted from dict),
     • re-translates dynamic content (MutationObserver).
   ============================================================ */
(function () {
  "use strict";

  // English string -> evocative Gujarati. Product/material/short-forms
  // (Aluminium, UPVC, ACP, GST, sq.ft, PDF, ₹, brand, product names) are
  // intentionally left out so they stay in English.
  var DICT = {
    // Nav + buttons
    "Home": "હોમ",
    "Services": "સેવાઓ",
    "Projects": "પ્રોજેક્ટ્સ",
    "Estimate": "અંદાજ",
    "About": "અમારા વિશે",
    "Contact": "સંપર્ક",
    "Call": "કૉલ",
    "Call Now": "હમણાં કૉલ કરો",
    "Get Free Estimate": "મફત અંદાજ મેળવો",
    "View Projects": "કામ જુઓ",
    "View All Projects": "બધું કામ જુઓ",
    "View All Services": "બધી સેવાઓ જુઓ",
    "Call For Booking": "બુકિંગ માટે કૉલ કરો",
    "View details": "વધુ જાણો",
    "View project": "આ કામ જુઓ",
    "Get a Quote": "ભાવ જાણો",
    "Call Us": "કૉલ કરો",
    "What's included": "શું શું મળશે",
    "Chat with us": "વાત કરો",

    // Hero
    "Trusted by 120+ clients across Gujarat": "ગુજરાતભરના 120+ પરિવારોનો ભરોસો",
    "Transforming Spaces With": "દરેક જગ્યાને આપો",
    "& Glass Solutions": "અને ગ્લાસનો સ્પર્શ",
    "Aluminium window specialists — and trusted glass & fabrication experts serving Palanpur & Gujarat with precision engineering and modern design.":
      "Aluminium વિન્ડોમાં ખાસ મહારત — સાથે ભરોસાપાત્ર ગ્લાસ અને ફેબ્રિકેશન કામ. પાલનપુર અને સમગ્ર ગુજરાતમાં, ચોકસાઈ અને આધુનિક ડિઝાઇન સાથે.",
    "Free Site Visit": "ઘરે મફત મુલાકાત",
    "Transparent Pricing": "ચોખ્ખા ભાવ",
    "Certified Installation": "ભરોસાપાત્ર ઇન્સ્ટોલેશન",
    "Years Experience": "વર્ષનો અનુભવ",
    "Projects Done": "પૂરા થયેલા કામ",
    "Cities Served": "શહેરોમાં સેવા",
    "Quality Assured": "ગુણવત્તાની ગેરંટી",
    "Workmanship warranty": "કારીગરી પર વોરંટી",
    "120+ happy clients": "120+ ખુશ ગ્રાહકો",
    "Corporate Tower · Gujarat": "કોર્પોરેટ ટાવર · ગુજરાત",

    // Services
    "What We Do": "અમારી કારીગરી",
    "Comprehensive Aluminium & Glass Solutions": "વિન્ડોથી ફેસડ સુધી — Aluminium અને ગ્લાસનું સંપૂર્ણ સોલ્યુશન",
    "From precision windows to landmark facades, every service is engineered to enterprise standards and finished to perfection.":
      "ચોકસાઈભરી વિન્ડોથી લઈને શહેરની ઓળખ બને એવા ફેસડ સુધી — દરેક સેવા ઉચ્ચ ધોરણે ઘડાય છે અને સંપૂર્ણતાથી પૂરી થાય છે.",
    "Slim, durable, weather-sealed window systems.": "પાતળી, મજબૂત અને હવામાનથી સુરક્ષિત વિન્ડો.",
    "Secure, elegant entry & interior door systems.": "સુરક્ષિત અને સુંદર પ્રવેશ તથા આંતરિક ડોર.",
    "Effortless glide, maximum daylight.": "સહજ સરકે, ભરપૂર અજવાળું.",
    "Energy-efficient, low-maintenance frames.": "ઊર્જા બચાવે, જાળવણી ઓછી.",
    "Safety glass that's 5× stronger.": "સામાન્ય કરતાં 5× મજબૂત સેફ્ટી ગ્લાસ.",
    "Seamless glass facades for landmarks.": "ઇમારતને ઓળખ આપતા સીમલેસ ગ્લાસ ફેસડ.",
    "Bold, durable building exteriors.": "આકર્ષક અને ટકાઉ બિલ્ડિંગ દેખાવ.",
    "Custom structural & decorative steelwork.": "કસ્ટમ સ્ટ્રક્ચરલ અને સુશોભન સ્ટીલવર્ક.",
    "Glass, steel & aluminium railing systems.": "ગ્લાસ, સ્ટીલ અને aluminium ની રેલિંગ.",
    "Elegant ceilings & decorative finishes.": "સુંદર સીલિંગ અને સુશોભન ફિનિશ.",
    "Glass systems for offices & retail.": "ઑફિસ અને દુકાનો માટે ગ્લાસ સોલ્યુશન.",
    "Beautiful glass for modern homes.": "આધુનિક ઘરો માટે સુંદર ગ્લાસ.",
    "Secure roller & profile shutter systems.": "સુરક્ષિત roller અને profile shutter.",
    "Bespoke solutions, engineered to spec.": "તમારી જરૂર મુજબ બનાવેલ ખાસ સોલ્યુશન.",

    // Statement
    "Our Philosophy": "અમારી માન્યતા",
    "We don't just install windows and glass — we engineer experiences that transform how you live and work, with precision that lasts a lifetime.":
      "અમે માત્ર વિન્ડો કે ગ્લાસ નથી લગાવતા — અમે એવા અનુભવ ઘડીએ છીએ જે તમારા રહેવા અને કામ કરવાની રીત બદલે, ને જિંદગીભર સાથ આપે.",

    // Stats
    "Projects Completed": "પૂરા થયેલા પ્રોજેક્ટ્સ",
    "Happy Clients": "ખુશ ગ્રાહકો",

    // Projects
    "Our Work": "અમારું કામ",
    "A Portfolio That Speaks for Itself": "કામ જે પોતે જ બોલે",
    "From premium residences to landmark commercial facades — explore a selection of our finest projects across Gujarat.":
      "પ્રીમિયમ ઘરથી લઈને શહેરની ઓળખ બને એવા કમર્શિયલ ફેસડ સુધી — ગુજરાતભરના અમારા શ્રેષ્ઠ કામની ઝલક.",
    "Portfolio": "પોર્ટફોલિયો",
    "Projects That Define Excellence": "ઉત્કૃષ્ટતાની ઓળખ બનતા કામ",
    "A showcase of precision-engineered spaces across Gujarat. Filter by category, compare before & after, and explore the details.":
      "ગુજરાતભરના ચોકસાઈભર્યા કામની ઝલક. કેટેગરી પ્રમાણે જુઓ, પહેલાં-પછી સરખાવો અને વિગતો માણો.",
    "All": "બધું",
    "Residential": "રહેઠાણ",
    "Commercial": "કમર્શિયલ",
    "Glass Projects": "ગ્લાસ કામ",
    "Railings": "રેલિંગ",

    // Process
    "How We Work": "અમારી રીત",
    "From First Visit to Final Handover": "પહેલી મુલાકાતથી ચાવી હાથમાં",
    "A seamless, transparent process engineered around your peace of mind.":
      "તમારી નિરાંતને ધ્યાનમાં રાખીને બનાવેલી સરળ અને પારદર્શક પ્રક્રિયા.",
    "Free Site Survey": "મફત સાઇટ સર્વે",
    "Our experts visit your site, take precise digital measurements and understand your vision — at no cost.":
      "અમારા નિષ્ણાતો તમારી જગ્યાએ આવે છે, ચોક્કસ ડિજિટલ માપ લે છે અને તમારી કલ્પના સમજે છે — તદ્દન મફત.",
    "Design & Quotation": "ડિઝાઇન અને ભાવ",
    "We craft a tailored design with 3D previews and an itemised, transparent quotation you approve before we begin.":
      "અમે 3D પ્રીવ્યૂ સાથે તમારા માટે ખાસ ડિઝાઇન અને વિગતવાર, ચોખ્ખું ક્વોટેશન બનાવીએ — જે મંજૂર થયા પછી જ કામ શરૂ.",
    "Precision Manufacturing": "ચોકસાઈભર્યું ઉત્પાદન",
    "Your order is fabricated on CNC-driven lines with rigorous quality control at every stage.":
      "દરેક તબક્કે કડક ગુણવત્તા તપાસ સાથે તમારો ઑર્ડર CNC મશીન પર ઘડાય છે.",
    "Delivery & Installation": "ડિલિવરી અને ઇન્સ્ટોલેશન",
    "Certified crews install with care, on schedule, leaving your space clean and finished to perfection.":
      "તાલીમબદ્ધ ટીમ સમયસર, કાળજીથી ઇન્સ્ટોલ કરે છે અને જગ્યા સ્વચ્છ, સંપૂર્ણ ફિનિશ સાથે સોંપે છે.",
    "Handover & Warranty": "હેન્ડઓવર અને વોરંટી",
    "A final walkthrough, smooth-operation check and warranty handover — plus ongoing support whenever you need it.":
      "અંતિમ તપાસ, સ્મૂધ ઑપરેશન ચેક અને વોરંટી સોંપણી — સાથે જરૂર પડે ત્યારે હંમેશ સાથ.",

    // Estimate teaser
    "Smart Quotation Engine": "સ્માર્ટ ભાવ-ગણતરી",
    "Get an Instant Estimate in Under a Minute": "એક મિનિટમાં જ તમારો અંદાજ",
    "Pick your product, material and dimensions — our engine calculates a precise, GST-inclusive estimate and generates a professional PDF quotation you can save or share.":
      "પ્રોડક્ટ, મટિરિયલ અને માપ પસંદ કરો — અમારું એન્જિન GST સહિતનો ચોક્કસ ભાવ ગણે છે અને એક પ્રોફેશનલ PDF ક્વોટેશન બનાવે, જે તમે સાચવો કે શેર કરો.",
    "Launch Estimate Calculator": "અંદાજ કેલ્ક્યુલેટર ખોલો",
    "Instant Calculation": "તરત ગણતરી",
    "Live, itemised pricing as you choose options.": "તમે પસંદ કરો તેમ લાઇવ, વિગતવાર ભાવ.",
    "Transparent Costs": "ચોખ્ખો ખર્ચ",
    "Material, labour, transport & GST — no surprises.": "મટિરિયલ, મજૂરી, ટ્રાન્સપોર્ટ અને GST — કોઈ છૂપો ખર્ચ નહીં.",
    "PDF Quotation": "PDF ક્વોટેશન",
    "Download a professional quote in one click.": "એક ક્લિકમાં પ્રોફેશનલ ક્વોટ ડાઉનલોડ કરો.",

    // About
    "Our Story": "અમારી સફર",
    "Built on Precision, Trusted for Generations": "ચોકસાઈ પર રચાયેલું, પેઢીઓનો ભરોસો",
    "Since 2023, Veer Aluminium & Fabrication has grown from a focused Palanpur workshop into a trusted team across North Gujarat — specialising in aluminium windows alongside glass and fabrication work.":
      "2023થી, Veer Aluminium & Fabrication એક નાનકડા પાલનપુર વર્કશોપથી ઉત્તર ગુજરાતની ભરોસાપાત્ર ટીમ બની — aluminium વિન્ડોમાં ખાસ મહારત સાથે ગ્લાસ અને ફેબ્રિકેશન કામ.",
    "ISO-grade material sourcing": "ISO-ગ્રેડ મટિરિયલ",
    "In-house CNC manufacturing": "ઇન-હાઉસ CNC ઉત્પાદન",
    "Certified installation crews": "તાલીમબદ્ધ ઇન્સ્ટોલેશન ટીમ",
    "Post-installation support": "કામ પછી પણ પૂરો સાથ",
    "Years of": "વર્ષોની",
    "Excellence": "ઉત્કૃષ્ટતા",
    "The Foundation": "શરૂઆત",
    "Veer Aluminium & Fabrication opens its Palanpur workshop with a clear promise: precise aluminium and glass work at honest prices.":
      "Veer Aluminium & Fabrication એક સ્પષ્ટ વચન સાથે પાલનપુરમાં વર્કશોપ ખોલે છે: પ્રામાણિક ભાવે ચોક્કસ aluminium અને ગ્લાસ કામ.",
    "Building Trust": "ભરોસો બાંધ્યો",
    "Expanded from residential windows into railings, partitions and storefront glass for clients across Banaskantha.":
      "ઘરની વિન્ડોથી આગળ વધી બનાસકાંઠાભરના ગ્રાહકો માટે રેલિંગ, પાર્ટિશન અને સ્ટોરફ્રન્ટ ગ્લાસ સુધી પહોંચ્યા.",
    "Commercial Projects": "કમર્શિયલ કામ",
    "Delivered larger ACP, glazing and fabrication assignments while strengthening site measurement and installation workflows.":
      "સાઇટ માપ અને ઇન્સ્ટોલેશનને વધુ મજબૂત કરતાં મોટા ACP, ગ્લેઝિંગ અને ફેબ્રિકેશન કામ પૂરા કર્યા.",
    "Growing Across Gujarat": "ગુજરાતભરમાં વિસ્તાર",
    "Crossed 150+ completed projects and 120+ happy clients, bringing faster quotes and cleaner project tracking to every job.":
      "150+ પૂરા થયેલા પ્રોજેક્ટ્સ અને 120+ ખુશ ગ્રાહકો — દરેક કામમાં ઝડપી ભાવ અને સ્પષ્ટ ટ્રેકિંગ.",

    // Why choose
    "Why Choose Us": "અમને જ કેમ?",
    "The Veer Standard of Excellence": "Veer ની ઓળખ — ઉત્કૃષ્ટતા",
    "We combine 3+ years of focused craftsmanship with modern technology to deliver results that stand the test of time.":
      "3+ વર્ષની ધ્યાનભરી કારીગરી અને આધુનિક ટેક્નોલોજીના સંગમથી અમે એવા પરિણામો આપીએ જે સમય સામે ટકે.",
    "3+ Years of Experience": "3+ વર્ષનો અનુભવ",
    "Three focused years of aluminium and glass craftsmanship across residential, commercial and industrial projects.":
      "ઘર, ઑફિસ અને ઔદ્યોગિક કામમાં aluminium અને ગ્લાસ કારીગરીના ત્રણ ધ્યાનભર્યા વર્ષ.",
    "Quality Assurance": "ગુણવત્તાની ખાતરી",
    "Every product passes a multi-point quality check — from material grade to finish, sealing and smooth operation.":
      "દરેક પ્રોડક્ટ અનેક તબક્કાની તપાસમાંથી પસાર થાય — મટિરિયલથી ફિનિશ, સીલિંગ અને સ્મૂધ ઑપરેશન સુધી.",
    "Expert In-House Team": "નિષ્ણાત પોતાની ટીમ",
    "Certified fabricators, glaziers and installers who treat every project as a signature piece of work.":
      "તાલીમબદ્ધ ફેબ્રિકેટર, ગ્લેઝિયર અને ઇન્સ્ટોલર — જે દરેક કામને પોતાની ઓળખ સમજે છે.",
    "CNC-driven cutting and automated finishing deliver enterprise-grade consistency, batch after batch.":
      "CNC કટિંગ અને ઑટોમેટેડ ફિનિશિંગ દર વખતે એકસરખી, ઉચ્ચ ગુણવત્તા આપે છે.",
    "Modern Technology": "આધુનિક ટેક્નોલોજી",
    "Digital measurement, 3D previews and instant estimates bring transparency and accuracy to your project.":
      "ડિજિટલ માપ, 3D પ્રીવ્યૂ અને તરત મળતા અંદાજ તમારા કામમાં પારદર્શિતા અને ચોકસાઈ લાવે છે.",
    "No hidden costs. Our quotation engine gives you an itemised, GST-inclusive estimate before we ever begin.":
      "કોઈ છૂપો ખર્ચ નહીં. કામ શરૂ થાય તે પહેલાં જ વિગતવાર, GST સહિતનો ભાવ તમારી સામે.",

    // Testimonials
    "Testimonials": "ગ્રાહકોના શબ્દોમાં",
    "Loved by Homeowners & Businesses": "ઘરથી ઑફિસ સુધી — સૌનો પ્રેમ",
    "Don't just take our word for it — here's what our clients across Gujarat have to say.":
      "ફક્ત અમારી વાત નહીં — ગુજરાતભરના અમારા ગ્રાહકો શું કહે છે તે સાંભળો.",
    "Homeowner": "ઘરમાલિક",
    "Interior Architect": "ઇન્ટિરિયર આર્કિટેક્ટ",
    "Builder": "બિલ્ડર",
    "Café Owner": "કાફે માલિક",
    "Video Review": "વિડિયો રિવ્યૂ",

    // FAQ
    "FAQ": "સવાલ-જવાબ",
    "Questions, Answered": "તમારા સવાલ, અમારા જવાબ",
    "Everything you need to know before starting your project with us.":
      "અમારી સાથે કામ શરૂ કરતા પહેલાં જાણવા જેવી દરેક વાત.",
    "How accurate is the online estimate?": "ઓનલાઇન અંદાજ કેટલો સાચો?",
    "Our quotation engine uses real material, labour and installation rates to give you a highly accurate ballpark instantly. The final quote is confirmed after a free on-site measurement.":
      "અમારું એન્જિન વાસ્તવિક મટિરિયલ, મજૂરી અને ઇન્સ્ટોલેશન દરથી તરત જ ખૂબ નજીકનો અંદાજ આપે છે. અંતિમ ભાવ મફત ઓન-સાઇટ માપ પછી નક્કી થાય છે.",
    "Do you offer a free site visit?": "શું મફત સાઇટ વિઝિટ મળે?",
    "Yes. We provide a free site survey and measurement across Palanpur and surrounding cities so your final quotation is precise to the millimetre.":
      "હા. પાલનપુર અને આસપાસના શહેરોમાં અમે મફત સાઇટ સર્વે અને માપ આપીએ, જેથી તમારો ભાવ મિલિમીટર સુધી ચોક્કસ રહે.",
    "What areas do you serve?": "તમે કયા વિસ્તારોમાં કામ કરો?",
    "We serve Palanpur and the surrounding region — typically within a 70–90 km radius of the city — including Banaskantha, Deesa, Mehsana, Ambaji, Mount Abu and nearby towns. Larger projects are undertaken across Gujarat.":
      "અમે પાલનપુર અને આસપાસના વિસ્તારમાં — સામાન્ય રીતે શહેરથી 70–90 km સુધી — બનાસકાંઠા, ડીસા, મહેસાણા, અંબાજી, માઉન્ટ આબુ અને નજીકના ગામ-નગરમાં કામ કરીએ. મોટા પ્રોજેક્ટ્સ ગુજરાતભરમાં લઈએ છીએ.",
    "What warranty do you provide?": "તમે કઈ વોરંટી આપો?",
    "We provide a workmanship warranty on installation plus the manufacturer's warranty on hardware and profiles. Specifics are detailed in your final quotation.":
      "અમે ઇન્સ્ટોલેશન પર કારીગરી વોરંટી અને હાર્ડવેર તથા પ્રોફાઇલ પર ઉત્પાદકની વોરંટી આપીએ છીએ. વિગતો તમારા અંતિમ ક્વોટેશનમાં હોય છે.",
    "How long does a typical project take?": "સામાન્ય કામ કેટલા દિવસમાં પૂરું?",
    "Residential windows and doors are typically completed within 7–15 days of confirmation. Larger commercial glazing and ACP projects are scheduled with a detailed timeline.":
      "ઘરની વિન્ડો અને ડોર સામાન્ય રીતે કન્ફર્મેશનના 7–15 દિવસમાં પૂરા થાય. મોટા કમર્શિયલ ગ્લેઝિંગ અને ACP કામ વિગતવાર સમયરેખા સાથે ગોઠવાય છે.",

    // CTA
    "Let's Build Something Premium": "ચાલો, કંઈક ખાસ બનાવીએ",
    "Ready to Transform Your Space?": "તમારી જગ્યા બદલવા તૈયાર છો?",
    "Get an instant, transparent estimate or speak with our team today. Free site visits across Palanpur and Gujarat.":
      "આજે જ મફત, ચોખ્ખો અંદાજ મેળવો અથવા અમારી ટીમ સાથે વાત કરો. પાલનપુર અને ગુજરાતભરમાં મફત સાઇટ વિઝિટ.",

    // Footer
    "Company": "કંપની",
    "Get in Touch": "સંપર્ક કરો",
    "Visit Our Workshop": "અમારો વર્કશોપ",
    "Email Us": "ઇમેઇલ કરો",
    "Business Hours": "કામના કલાક",
    "Talk to Our Experts": "અમારા નિષ્ણાતો સાથે વાત કરો",
    "Choose whatever's easiest — we respond fast.": "જે ફાવે તે રીતે — અમે ઝડપથી જવાબ આપીશું.",
    "Reach out for a free consultation, site visit or instant quote. We're here to bring your vision to life.":
      "મફત સલાહ, સાઇટ વિઝિટ કે તરત ભાવ માટે સંપર્ક કરો. તમારી કલ્પનાને સાકાર કરવા અમે તૈયાર છીએ.",
    "Request a Free Quote": "મફત ક્વોટ માટે વિનંતી",
    "Fill in the form and we'll get back within 24 hours.": "ફોર્મ ભરો, અમે 24 કલાકમાં સંપર્ક કરીશું.",
    "Full Name *": "પૂરું નામ *",
    "Phone *": "ફોન *",
    "Email": "ઇમેઇલ",
    "Project Type": "કયું કામ",
    "Your Message *": "તમારો સંદેશ *",
    "Send Message": "સંદેશ મોકલો",
    "Select a service": "સેવા પસંદ કરો",
    "Other / Custom": "અન્ય / કસ્ટમ",
    "WhatsApp": "WhatsApp",

    // Estimate page + calculator
    "Instant Estimate Calculator": "તાત્કાલિક અંદાજ કેલ્ક્યુલેટર",
    "Configure your product below and watch the price update live. Download a professional PDF quote or request a detailed quotation from our team.":
      "નીચે તમારું પ્રોડક્ટ ગોઠવો અને ભાવ લાઇવ બદલાતો જુઓ. પ્રોફેશનલ PDF ક્વોટ ડાઉનલોડ કરો અથવા અમારી ટીમ પાસેથી વિગતવાર ભાવ માગો.",
    "Choose Your Product": "તમારું પ્રોડક્ટ પસંદ કરો",
    "Product Type": "પ્રોડક્ટ પ્રકાર",
    "Select Materials": "મટિરિયલ પસંદ કરો",
    "Aluminium Grade": "Aluminium ગ્રેડ",
    "Glass Type": "ગ્લાસ પ્રકાર",
    "Frame Finish": "ફ્રેમ ફિનિશ",
    "Enter Dimensions": "માપ દાખલ કરો",
    "Width (ft)": "પહોળાઈ (ft)",
    "Height (ft)": "ઊંચાઈ (ft)",
    "Area per unit": "પ્રતિ યુનિટ વિસ્તાર",
    "Quantity": "જથ્થો",
    "Total area": "કુલ વિસ્તાર",
    "Additional Options": "વધારાના ઑપ્શન્સ",
    "Estimate Summary": "અંદાજ સારાંશ",
    "Compare": "સરખાવો",
    "Material Cost": "મટિરિયલ ખર્ચ",
    "Labour Cost": "મજૂરી ખર્ચ",
    "Installation": "ઇન્સ્ટોલેશન",
    "Transportation": "ટ્રાન્સપોર્ટ",
    "Subtotal": "સબટોટલ",
    "Grand Total": "કુલ રકમ",
    "Get This Quote": "આ ભાવ મેળવો",
    "Save": "સાચવો",
    "Indicative estimate. Final price confirmed after a free on-site measurement.":
      "આ સૂચક અંદાજ છે. અંતિમ ભાવ મફત ઓન-સાઇટ માપ પછી નક્કી થાય છે.",
    "Get Your Detailed Quote": "તમારો વિગતવાર ભાવ મેળવો",
    "Share your details and our team will confirm pricing and schedule a free site visit.":
      "તમારી વિગતો આપો — અમારી ટીમ ભાવ નક્કી કરી મફત સાઇટ વિઝિટ ગોઠવશે.",
    "Estimated total": "અંદાજિત કુલ",
    "Submit Request": "વિનંતી મોકલો",
    "Your Saved Quotes": "તમારા સાચવેલા ક્વોટ્સ"
  };

  var LANG_KEY = "veer-lang";
  function getStored() { try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; } }
  function store(l) {
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
    document.cookie = "veer_lang=" + l + ";path=/;max-age=31536000;samesite=lax";
  }

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };
  var observer = null;

  function translateTextNode(node) {
    var parent = node.parentNode;
    if (!parent || SKIP[parent.nodeName]) return;
    var val = node.nodeValue;
    var key = val.trim();
    if (!key) return;
    var gu = DICT[key];
    if (gu === undefined) return;
    if (node.__o === undefined) node.__o = val;
    node.nodeValue = val.replace(key, gu);
  }
  function restoreTextNode(node) { if (node.__o !== undefined) node.nodeValue = node.__o; }

  function walkText(root, fn) {
    if (root.nodeType === 3) { fn(root); return; }
    if (root.nodeType !== 1) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(fn);
  }

  function handleAttrs(root, restore) {
    if (root.nodeType !== 1) return;
    var els = Array.prototype.slice.call(root.querySelectorAll("[placeholder]"));
    if (root.hasAttribute && root.hasAttribute("placeholder")) els.push(root);
    els.forEach(function (el) {
      if (restore) {
        if (el.__po !== undefined) el.setAttribute("placeholder", el.__po);
      } else {
        var p = el.getAttribute("placeholder");
        var key = (p || "").trim();
        if (DICT[key] !== undefined) {
          if (el.__po === undefined) el.__po = p;
          el.setAttribute("placeholder", DICT[key]);
        }
      }
    });
  }

  function applyGu(root) { walkText(root, translateTextNode); handleAttrs(root, false); }
  function applyEn(root) { walkText(root, restoreTextNode); handleAttrs(root, true); }

  function startObserver() {
    if (observer) return;
    observer = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        for (var i = 0; i < m.addedNodes.length; i++) {
          var n = m.addedNodes[i];
          if (n.nodeType === 1) applyGu(n);
          else if (n.nodeType === 3) translateTextNode(n);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  function stopObserver() { if (observer) { observer.disconnect(); observer = null; } }

  function setLang(l, persist) {
    if (persist !== false) store(l);
    if (l === "gu") {
      document.documentElement.classList.add("lang-gu");
      applyGu(document.body);
      startObserver();
    } else {
      document.documentElement.classList.remove("lang-gu");
      stopObserver();
      applyEn(document.body);
    }
    updateToggle(l);
  }

  // ── Premium Gujarati typography + popup/toggle styling ────────────────────
  function injectAssets() {
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Anek+Gujarati:wght@400;500;600;700&family=Baloo+Bhai+2:wght@500;600;700&display=swap";
    document.head.appendChild(f);

    var css = document.createElement("style");
    css.textContent =
      "html.lang-gu body{font-family:'Anek Gujarati','Inter',system-ui,sans-serif;line-height:1.7;}" +
      "html.lang-gu .font-display,html.lang-gu h1,html.lang-gu h2,html.lang-gu h3,html.lang-gu h4,html.lang-gu blockquote,html.lang-gu .eyebrow{font-family:'Baloo Bhai 2','Playfair Display',Georgia,serif;line-height:1.3;}" +
      "html.lang-gu h1{letter-spacing:0;}" +
      ".vlang-overlay{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(8,8,10,.6);backdrop-filter:blur(6px);opacity:0;transition:opacity .4s ease;}" +
      ".vlang-overlay.show{opacity:1;}" +
      ".vlang-card{position:relative;overflow:hidden;width:100%;max-width:25rem;border-radius:1.5rem;background:hsl(var(--card,0 0% 100%));border:1px solid hsl(var(--border,214 25% 90%));box-shadow:0 40px 90px -25px rgba(0,0,0,.6);padding:2rem 1.75rem;text-align:center;transform:translateY(28px) scale(.92);opacity:0;transition:transform .55s cubic-bezier(.16,1,.3,1),opacity .5s ease;}" +
      ".vlang-overlay.show .vlang-card{transform:none;opacity:1;}" +
      ".vlang-card .glow{position:absolute;top:-6rem;left:50%;transform:translateX(-50%);height:12rem;width:12rem;border-radius:50%;background:hsl(var(--gold,41 65% 48%)/.18);filter:blur(50px);pointer-events:none;}" +
      ".vlang-badge{position:relative;margin:0 auto;display:flex;height:4.25rem;width:4.25rem;align-items:center;justify-content:center;border-radius:1.1rem;background:linear-gradient(135deg,hsl(var(--gold,41 65% 48%)),#8a6512);color:#fff;box-shadow:0 16px 30px -10px hsla(41,70%,45%,.7);animation:vlang-float 2.4s ease-in-out infinite;}" +
      ".vlang-badge svg{width:2.1rem;height:2.1rem;}" +
      "@keyframes vlang-float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-7px) rotate(-4deg)}}" +
      ".vlang-card h3{margin-top:1.1rem;font-family:'Baloo Bhai 2',serif;font-size:1.6rem;font-weight:700;line-height:1.25;color:hsl(var(--foreground,222 25% 11%));}" +
      ".vlang-card p{margin-top:.45rem;font-size:.92rem;color:hsl(var(--muted-foreground,215 16% 42%));}" +
      ".vlang-actions{margin-top:1.6rem;display:grid;gap:.65rem;}" +
      ".vlang-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:.8rem;padding:.85rem 1.2rem;font-size:1rem;font-weight:600;cursor:pointer;border:1px solid transparent;transition:transform .15s,filter .15s;font-family:'Anek Gujarati','Inter',sans-serif;}" +
      ".vlang-btn:hover{transform:translateY(-2px);}" +
      ".vlang-btn-gold{background:hsl(var(--gold,41 65% 48%));color:#fff;box-shadow:0 12px 24px -10px hsla(41,65%,45%,.6);}" +
      ".vlang-btn-gold:hover{filter:brightness(1.08);}" +
      ".vlang-btn-ghost{background:transparent;color:hsl(var(--muted-foreground,215 16% 42%));border-color:hsl(var(--border,214 25% 90%));}" +
      ".vlang-btn-ghost:hover{color:hsl(var(--foreground,222 25% 11%));}" +
      ".vlang-toggle{position:fixed;left:1.25rem;bottom:1.25rem;z-index:45;display:inline-flex;align-items:center;gap:.45rem;border-radius:999px;padding:.55rem .95rem;font-size:.82rem;font-weight:700;cursor:pointer;background:hsl(var(--card,0 0% 100%));color:hsl(var(--foreground,222 25% 11%));border:1px solid hsl(var(--border,214 25% 90%));box-shadow:0 10px 24px -10px rgba(0,0,0,.4);transition:transform .2s,border-color .2s;font-family:'Anek Gujarati','Inter',sans-serif;}" +
      ".vlang-toggle:hover{transform:scale(1.06);border-color:hsl(var(--gold,41 65% 48%));}" +
      ".vlang-toggle svg{width:1.05rem;height:1.05rem;color:hsl(var(--gold,41 65% 48%));}";
    document.head.appendChild(css);
  }

  var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';

  var toggleEl = null;
  function buildToggle() {
    toggleEl = document.createElement("button");
    toggleEl.className = "vlang-toggle";
    toggleEl.setAttribute("aria-label", "Switch language");
    toggleEl.addEventListener("click", function () {
      setLang(document.documentElement.classList.contains("lang-gu") ? "en" : "gu");
    });
    document.body.appendChild(toggleEl);
    updateToggle(getStored() || "en");
  }
  function updateToggle(l) {
    if (!toggleEl) return;
    toggleEl.innerHTML = GLOBE + "<span>" + (l === "gu" ? "English" : "ગુજરાતી") + "</span>";
  }

  function showPopup() {
    var ov = document.createElement("div");
    ov.className = "vlang-overlay";
    ov.innerHTML =
      '<div class="vlang-card"><span class="glow"></span>' +
      '<div class="vlang-badge">' + GLOBE + "</div>" +
      "<h3>આવો, ગુજરાતીમાં વાંચીએ</h3>" +
      "<p>આખી વેબસાઈટ તમારી પોતાની ભાષામાં માણો.</p>" +
      '<div class="vlang-actions">' +
      '<button class="vlang-btn vlang-btn-gold" data-l="gu">હા, ગુજરાતીમાં બતાવો</button>' +
      '<button class="vlang-btn vlang-btn-ghost" data-l="en">English જ ઠીક છે</button>' +
      "</div></div>";
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add("show"); });
    ov.addEventListener("click", function (e) {
      var b = e.target.closest("[data-l]");
      if (b) { close(b.getAttribute("data-l")); return; }
      if (e.target === ov) close("en");
    });
    function close(l) {
      ov.classList.remove("show");
      setTimeout(function () { ov.remove(); }, 400);
      setLang(l);
    }
  }

  function init() {
    injectAssets();
    buildToggle();
    var stored = getStored();
    if (stored === "gu") setLang("gu", false);
    else if (stored === "en") setLang("en", false);
    else showPopup();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
