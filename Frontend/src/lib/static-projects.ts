export type KeyFeature = {
  title: string;
  description: string;
};

export type ResultStat = {
  metric: string;
  label: string;
};

export type StaticProject = {
  slug: string;
  domain: string;
  title: string;
  shortDescription: string;
  description: string;
  challenge: string;
  approach: string;
  keyFeatures: KeyFeature[];
  techStack: string[];
  results: ResultStat[];
  role: string;
  category: string;
  tags: string[];
  images: string[];
  coverImage: string;
  liveUrl: string;
  featured: boolean;
  /** ISO date the case study was published. Feeds Article schema's
   *  datePublished, which is omitted entirely when this is unset — so add it as
   *  you write each one rather than backfilling a guess. */
  publishedAt?: string;
};

export const staticProjects: StaticProject[] = [
  {
    slug: "tatvivahtrends",
    domain: "tatvivahtrends.com",
    title: "TatVivah Trends",
    shortDescription:
      "Premium ethnic wedding wear marketplace with 3000+ products, verified sellers, and occasion-based filtering.",
    description:
      "Built a Next.js marketplace for ethnic wear with 3000+ products spanning sherwanis, kurtas, and Modi jackets. Implemented occasion-based filtering for wedding, haldi, and mehendi events. Integrated a verified seller system, Razorpay payments, and a 10-day returns policy. Created product showcases, gift cards, and a fully mobile-responsive design for the premium wedding fashion market.",
    challenge:
      "India's wedding ethnic wear market is dominated by offline stores and fragmented resellers. Buyers had no trusted digital platform to discover and purchase premium sherwanis, kurtas, and bridal sets — especially for specific occasions like haldi, mehendi, and sangeet. The client needed a marketplace that could handle multiple vendors, build buyer trust, and replicate the richness of an in-store experience on mobile.",
    approach:
      "We architected a full Next.js multi-vendor marketplace built for scale. The core insight was that wedding shoppers don't browse by product type — they browse by occasion. So we made occasion-based filtering the primary discovery mechanism. We layered verified seller badges, Razorpay's trusted payment infrastructure, and a generous 10-day returns policy to build purchase confidence. Every design decision prioritised mobile since over 80% of the target audience shops on smartphones.",
    keyFeatures: [
      {
        title: "Multi-Vendor Marketplace Architecture",
        description:
          "Built a complete multi-vendor system where individual sellers can list and manage products independently, with admin oversight for quality control and verified seller badge assignment.",
      },
      {
        title: "Occasion-Based Product Filtering",
        description:
          "Unique filtering system that lets shoppers browse by wedding occasion — wedding ceremony, haldi, mehendi, sangeet — making product discovery intuitive and contextually relevant.",
      },
      {
        title: "3000+ Product Catalog",
        description:
          "Comprehensive catalog spanning sherwanis, kurtas, Modi jackets, dhoti sets, and accessories with detailed variant management for size, colour, and fabric.",
      },
      {
        title: "Razorpay Payment Integration",
        description:
          "Seamless payment gateway supporting UPI, credit/debit cards, net banking, and EMI options — covering every payment preference of Indian shoppers.",
      },
      {
        title: "10-Day Returns & Trust System",
        description:
          "Automated returns workflow with clear policy pages, boosting buyer confidence and reducing cart abandonment for high-value ethnic wear purchases.",
      },
      {
        title: "Digital Gift Cards",
        description:
          "Wedding gift card system allowing buyers to send a store credit as a gift — a natural fit for the wedding occasion context.",
      },
      {
        title: "Wishlist & Product Comparison",
        description:
          "Saved wishlist and side-by-side product comparison tools helping buyers shortlist outfits across multiple vendors before making a decision.",
      },
      {
        title: "Mobile-First Responsive Design",
        description:
          "Pixel-perfect mobile experience with fast-loading product images, touch-friendly filters, and a streamlined checkout flow optimised for smartphone shoppers.",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Razorpay",
      "Tailwind CSS",
      "WooCommerce",
      "WordPress",
      "REST API",
    ],
    results: [
      { metric: "3,000+", label: "Products Listed" },
      { metric: "121+", label: "Vendor Categories" },
      { metric: "10-Day", label: "Returns Policy" },
      { metric: "100%", label: "Mobile Optimized" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Wedding Fashion",
    tags: [
      "Next.js Marketplace Development",
      "Multi-Vendor Platform Architecture",
      "Occasion-Based Product Filtering",
      "Razorpay Payment Integration",
      "Wedding Fashion E-Commerce",
    ],
    images: [
      "/projects/tatvivahtrends/screenshot-1.png",
      "/projects/tatvivahtrends/screenshot-2.png",
      "/projects/tatvivahtrends/screenshot-3.png",
    ],
    coverImage: "/projects/tatvivahtrends/screenshot-1.png",
    liveUrl: "https://tatvivahtrends.com",
    featured: true,
  },
  {
    slug: "deetoo",
    domain: "deetoo.in",
    title: "DeeToo",
    shortDescription:
      "Mobile accessories store built per device, not \"fits most\" — cases, glass and chargers organised by brand, series and exact model.",
    description:
      "Built a WooCommerce store for DeeToo covering cases, tempered glass, camera protectors, cables, adapters, earbuds, power banks and car accessories across twelve phone brands and their series — Samsung Galaxy S/A/M/F/Z, iPhone 12 through 16, OnePlus, Nothing, Xiaomi, Poco, Realme, Oppo, Vivo and Motorola. Catalogue navigation runs brand-first then series, so a buyer filters straight to their exact model instead of a generic accessories grid. Combo bundles, a WhatsApp model-lookup concierge, and a published 7-day replacement policy round out the buying experience.",
    challenge:
      "The founder's own complaint was the reason DeeToo exists: buying a phone case online and finding the camera cutout in the wrong place. Most accessories are sold as one-size-fits-many — cutouts miss, buttons stick, glass leaves gaps at the edges — and the customer pays twice, once for the wrong product and once for the right one.",
    approach:
      "We built per device rather than per category. Each model gets its own product page, its own fit claims and its own combo pricing, reached through brand-then-series navigation rather than a single flat catalogue a buyer has to search through. For anyone still unsure, a WhatsApp flow asks for the phone model directly and points them to the right listing rather than leaving them to guess from a dropdown.",
    keyFeatures: [
      {
        title: "Brand-Then-Series Navigation",
        description:
          "Twelve phone brands broken into their real series — Galaxy S/A/M/F/Z, iPhone by generation, OnePlus Nord vs flagship — so browsing narrows to the exact model fast.",
      },
      {
        title: "Per-Model Product Pages",
        description:
          "Every case, glass and lens protector is listed against a specific phone model rather than a generic \"universal fit\" claim.",
      },
      {
        title: "Combo Bundle Merchandising",
        description:
          "3-in-1 and 2-in-1 combo pricing (case, glass, cable) merchandised as its own shoppable category with its own discount logic.",
      },
      {
        title: "WhatsApp Model Concierge",
        description:
          "A dedicated \"not sure which accessory fits your phone\" flow into WhatsApp, so uncertain buyers get a direct answer instead of abandoning the search.",
      },
      {
        title: "7-Day Replacement Policy",
        description:
          "A published, no-argument replacement policy for defective or wrong-fit items, built as a real policy page rather than a support-ticket promise.",
      },
      {
        title: "COD & Pan-India Delivery",
        description:
          "Cash on delivery with no minimum order value alongside free shipping on every order, matching how India's accessories buyers actually check out.",
      },
    ],
    techStack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    results: [
      { metric: "12", label: "Brands Catalogued" },
      { metric: "8", label: "Product Categories" },
      { metric: "7-Day", label: "Replacement Policy" },
      { metric: "Pan-India", label: "COD Delivery" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Mobile Accessories",
    tags: [
      "WooCommerce Development",
      "Per-Device Product Catalog",
      "Multi-Brand E-Commerce",
      "Combo & Bundle Merchandising",
      "Mobile Accessories Retail",
    ],
    images: [
      "/projects/deetoo/screenshot-1.png",
      "/projects/deetoo/screenshot-2.png",
      "/projects/deetoo/screenshot-3.png",
    ],
    coverImage: "/projects/deetoo/screenshot-1.png",
    liveUrl: "https://deetoo.in",
    featured: false,
    publishedAt: "2026-09-13",
  },
  {
    slug: "maribiz-ai",
    domain: "MariBiz.ai",
    title: "MariBiz.ai",
    shortDescription:
      "Global marine procurement marketplace connecting 3,226+ vendors with shipowners across 121 service categories.",
    description:
      "Built a global B2B marine procurement marketplace connecting 3,226+ vendors with shipowners. Implemented an RFQ system with vendor verification and real-time messaging. Created vendor profiles across 121 categories including maintenance, spare parts, hull cleaning, and crew transport. Integrated quote comparison tools and port-based service discovery for the maritime industry.",
    challenge:
      "Marine procurement is one of the world's most fragmented industries. Ship operators and owners spend hours chasing vendors across emails, phone calls, and outdated directories to find qualified suppliers for everything from spare parts to hull cleaning. There was no centralised, trusted B2B platform purpose-built for maritime supply chains — leaving billions in procurement spend managed inefficiently.",
    approach:
      "We designed a B2B procurement platform with the RFQ (Request for Quote) process at its core. Rather than trying to be a generic marketplace, we built deep domain specificity: vendor profiles structured around maritime service categories, port-based discovery so operators can find vendors at any global port, and real-time messaging that keeps all procurement communication in one place. Vendor verification was built-in from day one to ensure quality and trust on both sides of every transaction.",
    keyFeatures: [
      {
        title: "RFQ (Request for Quote) Engine",
        description:
          "Complete RFQ workflow allowing shipowners to post procurement requests and receive structured quotes from multiple verified vendors, with full comparison tools.",
      },
      {
        title: "Vendor Verification & Vetting System",
        description:
          "Multi-step vendor onboarding with document verification, capability assessment, and a verified badge system that builds buyer confidence in supplier quality.",
      },
      {
        title: "121 Service Category Profiles",
        description:
          "Detailed vendor profiles structured across 121 maritime service categories — from maintenance and spare parts to hull cleaning, crew transport, and port logistics.",
      },
      {
        title: "Port-Based Service Discovery",
        description:
          "Geolocation-aware vendor discovery allowing operators to find qualified suppliers at any port worldwide, making it easy to source locally wherever the vessel is docked.",
      },
      {
        title: "Real-Time Messaging System",
        description:
          "In-platform communication between buyers and vendors keeping all procurement conversations documented, traceable, and efficient — no more fragmented email chains.",
      },
      {
        title: "Quote Comparison Dashboard",
        description:
          "Side-by-side quote comparison interface helping procurement teams evaluate multiple vendor bids across price, timeline, and capability before selecting a supplier.",
      },
      {
        title: "Shipowner & Operator Dashboard",
        description:
          "Dedicated dashboard for vessel operators to manage active RFQs, track vendor responses, review awarded contracts, and analyse procurement history.",
      },
      {
        title: "Procurement Analytics",
        description:
          "Built-in analytics for procurement managers to track spend efficiency, vendor performance, and category-level purchasing patterns over time.",
      },
    ],
    techStack: [
      "React",
      "Node.js",
      "TypeScript",
      "WebSockets",
      "PostgreSQL",
      "REST API",
      "Tailwind CSS",
      "Cloud Infrastructure",
    ],
    results: [
      { metric: "3,226+", label: "Vendors Onboarded" },
      { metric: "121", label: "Service Categories" },
      { metric: "Global", label: "Port Coverage" },
      { metric: "Real-Time", label: "Messaging System" },
    ],
    role: "Full-Stack Developer",
    category: "B2B Marketplace / Maritime",
    tags: [
      "B2B Marketplace Development",
      "RFQ & Vendor Management System",
      "Real-Time Communication Features",
      "Port & Service Discovery Platform",
      "Maritime Industry Solutions",
    ],
    images: [
      "/projects/maribiz-ai/screenshot-1.png",
      "/projects/maribiz-ai/screenshot-2.png",
      "/projects/maribiz-ai/screenshot-3.png",
    ],
    coverImage: "/projects/maribiz-ai/screenshot-1.png",
    liveUrl: "https://maribiz.ai",
    featured: true,
  },
  {
    slug: "thegrafftee",
    domain: "thegrafftee.com",
    title: "The Grafftee",
    shortDescription:
      "Comprehensive HR & talent acquisition platform for India's leading recruitment and workforce solutions company.",
    description:
      "Developed a full-featured HR and talent acquisition platform website for Grafftee, India's leading recruitment and workforce solutions company. Built multi-feature pages showcasing services including talent acquisition, virtual HR support, payroll management, and employee experience tools. Implemented interactive service modules with FAQs, use cases, and booking systems for demo consultations.",
    challenge:
      "Grafftee had a strong reputation in the Indian HR and recruitment market built through word of mouth and direct relationships — but no digital presence to match it. Enterprise clients searching online for workforce solutions found competitors with polished platforms and couldn't find Grafftee at all. The brand needed a website that communicated the full breadth of their services and converted high-intent visitors into demo bookings.",
    approach:
      "We mapped out every service Grafftee offered and built a structured platform website designed to educate and convert. Each service got its own dedicated module with use cases, FAQs, and clear CTAs leading to demo bookings. Client testimonials were prominently featured to establish social proof for enterprise buyers. The booking system was integrated directly into the site to reduce friction from interest to conversation.",
    keyFeatures: [
      {
        title: "Service Showcase Architecture",
        description:
          "Dedicated pages for each service — talent acquisition, virtual HR support, payroll management, and employee experience — each with use cases, capability lists, and conversion CTAs.",
      },
      {
        title: "Demo Booking System",
        description:
          "Integrated booking form with calendar scheduling allowing enterprise prospects to book consultation demos directly from the website without back-and-forth email.",
      },
      {
        title: "Interactive FAQ Modules",
        description:
          "Accordion-based FAQ sections on each service page addressing common objections and questions enterprise buyers have before engaging an HR partner.",
      },
      {
        title: "Client Testimonials Section",
        description:
          "Social proof section featuring client success stories and testimonials from companies that have used Grafftee's recruitment and HR services across industries.",
      },
      {
        title: "Pan-India Placement Features",
        description:
          "Content and capability showcase for remote, hybrid, and office-based placements across pan-India locations, demonstrating geographic reach to enterprise clients.",
      },
      {
        title: "Contact Forms with CRM Integration",
        description:
          "Multiple contextual lead capture forms throughout the site, all feeding into a centralised CRM for the sales team to track and follow up with prospects efficiently.",
      },
      {
        title: "Platform Capabilities Display",
        description:
          "Visual feature showcases highlighting the HR tech stack and platform capabilities that differentiate Grafftee from traditional recruitment agencies.",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Calendar Integration",
      "CRM Integration",
      "Responsive Design",
    ],
    results: [
      { metric: "7+", label: "Service Modules Built" },
      { metric: "Pan-India", label: "Placement Coverage" },
      { metric: "Direct", label: "Demo Booking System" },
      { metric: "100%", label: "Mobile Responsive" },
    ],
    role: "Full-Stack Developer",
    category: "HR Tech / SaaS",
    tags: [
      "Full-Stack Web Development",
      "Responsive Web Design",
      "HR Platform Development",
      "Form Integration & Automation",
      "Service Module Architecture",
    ],
    images: ["/projects/thegrafftee/screenshot-1.png"],
    coverImage: "/projects/thegrafftee/screenshot-1.png",
    liveUrl: "https://thegrafftee.com",
    featured: false,
  },
  {
    slug: "hcbengineering",
    domain: "hcbengineering.in",
    title: "HCB Engineering",
    shortDescription:
      "Professional website for a government-licensed electrical contracting company with 20+ years of experience.",
    description:
      "Developed a comprehensive website for HCB Engineering, a government-licensed electrical contracting company with over 20 years of experience. Created a professional online presence showcasing commercial, residential, and specialty electrical services. Features include a service portfolio, project gallery, client testimonials, and integrated contact forms for lead generation.",
    challenge:
      "HCB Engineering had 20+ years of experience and a government contracting license — but relied entirely on referrals for new business. Competitors with basic websites were winning bids that HCB should have been considered for. Without a digital presence, they were invisible to procurement officers and commercial project managers searching online for licensed electrical contractors.",
    approach:
      "We built a professional corporate website focused on three goals: establish credibility, showcase capability, and generate qualified enquiries. Government licensing and certification were front and centre. A project portfolio with past work gave procurement teams confidence. Multiple contact forms tied to specific service types made it easy for the right person to reach the right team.",
    keyFeatures: [
      {
        title: "Service Pages for Every Vertical",
        description:
          "Dedicated pages for commercial electrical systems, residential projects, and specialty installations — each with scope details that help potential clients self-qualify.",
      },
      {
        title: "Government License & Certification Display",
        description:
          "Prominent display of government licenses, certifications, and compliance credentials — the most important trust signal for public sector and large commercial clients.",
      },
      {
        title: "Project Portfolio Gallery",
        description:
          "Visual gallery of completed projects with project type, scale, and client segment details that demonstrate range and depth of experience to prospective clients.",
      },
      {
        title: "Client Testimonials",
        description:
          "Curated testimonials from government agencies and commercial clients that validate reliability, quality of work, and professionalism to new prospects.",
      },
      {
        title: "Lead Generation Contact Forms",
        description:
          "Service-specific enquiry forms that capture project type, scale, timeline, and contact details — giving the sales team qualified context before the first call.",
      },
      {
        title: "Fully Responsive Design",
        description:
          "Pixel-perfect rendering across desktop, tablet, and mobile — ensuring the site works flawlessly whether a project manager is reviewing it in the office or on-site.",
      },
    ],
    techStack: [
      "WordPress",
      "PHP",
      "Responsive CSS",
      "JavaScript",
      "Contact Form 7",
      "SEO Optimization",
    ],
    results: [
      { metric: "20+", label: "Years Experience Showcased" },
      { metric: "3", label: "Service Verticals Covered" },
      { metric: "Govt.", label: "Licensed Credentials Displayed" },
      { metric: "100%", label: "Mobile Responsive" },
    ],
    role: "Full-Stack Developer",
    category: "Engineering / Corporate",
    tags: [
      "WordPress Website Development",
      "Responsive Web Design",
      "Service Portfolio Showcase",
      "Contact Form Integration",
      "Corporate Branding",
    ],
    images: ["/projects/hcbengineering/screenshot-1.png"],
    coverImage: "/projects/hcbengineering/screenshot-1.png",
    liveUrl: "https://hcbengineering.in",
    featured: false,
  },
  {
    slug: "clickngreet",
    domain: "clickngreet.in",
    title: "ClickNGreet",
    shortDescription:
      "Personalized gift shop and marketplace with 20+ product categories and pan-India shipping.",
    description:
      "Built a WooCommerce gift store with 20+ categories including frames, mugs, T-shirts, and resin art. Implemented product variants, dynamic pricing, and occasion-based filtering. Created category showcase pages and integrated testimonials, WhatsApp support, and bulk order management. Designed a fully mobile-optimized interface with fast delivery and secure checkout for pan-India personalized gift shipping.",
    challenge:
      "India's personalised gifting market is growing rapidly, but most online gift stores offer poor customisation options and slow delivery with no real-time support. ClickNGreet wanted to stand out by offering a wide range of customisable gift categories with an experience that felt personal — not like ordering a generic product off a mass-market platform.",
    approach:
      "We built a WooCommerce store structured around occasions rather than products. The entire shopping journey was designed so customers could start with 'What's the occasion?' and be guided to the right personalised product. Bulk ordering was built as a first-class feature for corporate gifting, and WhatsApp integration enabled real-time support for customers who needed customisation guidance.",
    keyFeatures: [
      {
        title: "20+ Product Category Showcase",
        description:
          "Richly curated categories spanning photo frames, custom mugs, printed T-shirts, resin art, cushions, and keepsakes — all with personalisation options built in.",
      },
      {
        title: "Occasion-Based Discovery",
        description:
          "Shopping journeys built around occasions — birthday, anniversary, wedding, baby shower, corporate gifting — making it easy for buyers to find the right gift fast.",
      },
      {
        title: "Product Variants & Customisation",
        description:
          "Dynamic variant system allowing customers to select size, colour, upload custom photos or text, and preview their personalised product before adding to cart.",
      },
      {
        title: "Bulk Order Management",
        description:
          "Dedicated bulk ordering flow for corporate and event gifting with tiered pricing, quantity management, and co-ordinated delivery options.",
      },
      {
        title: "WhatsApp Support Integration",
        description:
          "One-tap WhatsApp button allowing customers to get live assistance on personalisation, delivery timelines, and custom orders directly from the product page.",
      },
      {
        title: "Mobile-Optimised Checkout",
        description:
          "Fast, frictionless mobile checkout with saved addresses, multiple payment methods, and order tracking — built for the smartphone-first Indian shopper.",
      },
      {
        title: "Pan-India Shipping",
        description:
          "Integrated shipping system with pan-India delivery coverage, delivery time estimates, and order tracking to build confidence for buyers ordering ahead of important occasions.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "WhatsApp Business API",
      "Payment Gateway",
      "Responsive CSS",
    ],
    results: [
      { metric: "20+", label: "Product Categories" },
      { metric: "Pan-India", label: "Delivery Coverage" },
      { metric: "Bulk", label: "Corporate Order System" },
      { metric: "WhatsApp", label: "Real-Time Support" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Gifting",
    tags: [
      "WooCommerce E-Commerce Development",
      "Multi-Category Gift Marketplace",
      "Occasion-Based Product Filtering",
      "Bulk Order Management System",
      "Personalized Product Showcase",
    ],
    images: ["/projects/clickngreet/screenshot-1.png"],
    coverImage: "/projects/clickngreet/screenshot-1.png",
    liveUrl: "https://clickngreet.in",
    featured: false,
  },
  {
    slug: "samaraha",
    domain: "samaraha.com",
    title: "Samaraha",
    shortDescription:
      "Sophisticated e-commerce platform for premium traditional silk sarees with advanced filtering and secure checkout.",
    description:
      "Developed a sophisticated e-commerce platform for Samaraha, specialising in premium traditional silk sarees including Banarasi, Tussar, and Hand Printed varieties. Built a comprehensive WooCommerce shopping experience with advanced product filtering, a dynamic catalog with 25+ SKUs, wishlist and comparison tools. Integrated secure payment gateways with UPI and digital wallet support, plus member-exclusive pricing.",
    challenge:
      "Premium silk sarees are high-consideration purchases — buyers spend significant time comparing options and expect a shopping experience that reflects the product's prestige. Samaraha needed a digital storefront that could convey the richness and quality of handwoven silk while making it easy for buyers to navigate a growing catalog and feel confident purchasing a ₹5,000–₹25,000 saree online.",
    approach:
      "We built a refined WooCommerce store where the visual presentation was as important as the functionality. Rich product imagery, detailed silk-type filtering, and a comparison tool gave buyers the information density of an in-store visit. Member pricing and a secure checkout with multiple Indian payment options removed the friction that causes abandonment at the moment of decision.",
    keyFeatures: [
      {
        title: "Premium Product Catalog — 25+ SKUs",
        description:
          "Curated catalog of Banarasi, Tussar, and Hand Printed silk sarees with high-resolution images, detailed fabric descriptions, and weaving technique information.",
      },
      {
        title: "Advanced Filtering System",
        description:
          "Multi-attribute filtering by silk type, price range, colour, weave pattern, and collection category — enabling buyers to narrow down quickly across a large catalog.",
      },
      {
        title: "Wishlist & Product Comparison",
        description:
          "Save-for-later wishlist and side-by-side comparison of up to 3 sarees across fabric, price, and design attributes — replicating the in-store browsing experience.",
      },
      {
        title: "Member-Exclusive Pricing",
        description:
          "Registered member pricing tier with exclusive discounts, early access to new collections, and special promotional pricing for loyal customers.",
      },
      {
        title: "Multi-Gateway Payment Support",
        description:
          "Seamless checkout with UPI, digital wallets (Paytm, PhonePe), credit/debit cards, and net banking — covering every preferred payment method for Indian buyers.",
      },
      {
        title: "Promotional Offer Management",
        description:
          "Coupon codes, seasonal sale banners, and automated discount rules allowing the team to run promotions without developer involvement.",
      },
      {
        title: "SSL-Secured Checkout",
        description:
          "End-to-end SSL encryption and PCI-compliant payment processing ensuring buyer data and payment information are fully protected at every stage.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "Payment Gateways",
      "Responsive CSS",
      "SSL/TLS Security",
    ],
    results: [
      { metric: "25+", label: "Premium SKUs" },
      { metric: "Multi-Gate", label: "Payment Options" },
      { metric: "Member", label: "Exclusive Pricing" },
      { metric: "SSL", label: "Secured Checkout" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Textiles",
    tags: [
      "WooCommerce E-Commerce Development",
      "Product Catalog & Inventory Management",
      "Responsive UI/UX Design",
      "Payment Gateway Integration",
      "SSL Security & Checkout Optimization",
    ],
    images: ["/projects/samaraha/screenshot-1.png"],
    coverImage: "/projects/samaraha/screenshot-1.png",
    liveUrl: "https://samaraha.com",
    featured: false,
  },
  {
    slug: "nextmentor",
    domain: "nextmentor.com",
    title: "NEXTmentor",
    shortDescription:
      "Subscription video-mentorship platform streaming business, sales and leadership courses from globally recognised trainers.",
    description:
      "Built the course platform for NEXTmentor — a Vietnamese subscription streaming service carrying video courses from internationally recognised business trainers including Blair Singer, on subjects spanning sales mastery, team leadership, presentation skills and applied AI. The catalogue runs to 30+ courses averaging 15 lessons each, playable across desktop, TV and mobile through a members-only area separate from the public marketing site, with downloadable workbooks and a tiered monthly, half-yearly and annual membership structure.",
    challenge:
      "Vietnamese professionals and entrepreneurs wanting access to established international business mentors had no single, localised platform carrying that catalogue in one place — content was scattered across individual course sites, each with its own login, its own player and its own billing.",
    approach:
      "We built one catalogue and one membership around it: courses organised by mentor rather than buried in a generic list, a separate members subdomain so the learning experience isn't competing with marketing-site page weight, and a tiered plan structure so a learner can commit month to month before buying a year upfront.",
    keyFeatures: [
      {
        title: "Mentor-Led Course Catalogue",
        description:
          "30+ courses organised by instructor rather than topic alone, so a learner can follow a specific mentor's full curriculum.",
      },
      {
        title: "Dedicated Members Platform",
        description:
          "A separate members.nextmentor.com application handling playback, progress and account access apart from the public marketing site.",
      },
      {
        title: "Cross-Device Streaming",
        description:
          "Course video plays on desktop, TV and mobile, with downloadable workbooks and guides for offline study.",
      },
      {
        title: "Tiered Membership Plans",
        description:
          "Monthly, half-yearly and annual membership options, so commitment level is the learner's choice rather than a single all-or-nothing price.",
      },
      {
        title: "Free Trial-Lesson Capture",
        description:
          "An email-gated trial lesson from the catalogue's most popular courses, used as the primary top-of-funnel conversion path.",
      },
    ],
    techStack: ["WordPress", "Elementor", "Membership & LMS Platform", "Video Streaming Infrastructure"],
    results: [
      { metric: "30+", label: "Courses Live" },
      { metric: "15", label: "Avg. Lessons per Course" },
      { metric: "10 min", label: "Avg. Lesson Length" },
    ],
    role: "Full-Stack Developer",
    category: "EdTech / Online Learning Platform",
    tags: [
      "Membership & LMS Development",
      "Video Streaming Platform",
      "Subscription Billing",
      "Multi-Mentor Course Catalog",
    ],
    images: ["/projects/nextmentor/screenshot-1.png"],
    coverImage: "/projects/nextmentor/screenshot-1.png",
    liveUrl: "https://nextmentor.com",
    featured: false,
    publishedAt: "2026-09-13",
  },
  {
    slug: "vashtaraheaven",
    domain: "vashtaraheaven.com",
    title: "Vashtara Heaven",
    shortDescription:
      "Multi-vendor kidswear marketplace on Shopify — denim co-ords and printed sets for girls and boys, dispatched direct from each designer.",
    description:
      "Built a Shopify storefront for Vashtara Heaven, a multi-vendor kids' fashion marketplace carrying denim co-ord sets, printed tees and dungarees for girls and boys. Products are sourced from independent designer studios and dispatched directly from each one, so the store had to make that shipping model legible to a buyer up front rather than let it surface as a surprise at delivery. Free shipping above ₹499, cash on delivery nationwide and a 7-day return window on ready-to-wear items are set out before checkout, not discovered after.",
    challenge:
      "As a multi-vendor marketplace, items from different designer studios ship separately and arrive in separate packages — a pattern that reads as a broken order if a buyer isn't told about it in advance. The store needed to make that model a selling point rather than a support ticket.",
    approach:
      "We built the storefront around Girls and Boys as the two primary categories, with the multi-vendor dispatch model explained directly in the FAQ and policy pages rather than buried in terms and conditions, and a return and COD policy stated on every product page so trust is established before the buyer reaches checkout.",
    keyFeatures: [
      {
        title: "Girls / Boys Category Structure",
        description:
          "Two primary navigation paths carrying the full catalogue, with New Arrivals and Best Sellers collections cutting across both.",
      },
      {
        title: "Multi-Vendor Dispatch Model",
        description:
          "Products ship directly from each designer's studio; the FAQ explains this up front so separate-package deliveries read as intentional, not broken.",
      },
      {
        title: "Free Shipping Threshold",
        description:
          "Free delivery above ₹499 communicated as a persistent site-wide banner rather than a checkout-page surprise.",
      },
      {
        title: "7-Day Return Window",
        description:
          "Ready-to-wear items carry a clear 7-day return policy; custom-tailored pieces are marked non-returnable at the product level.",
      },
      {
        title: "Cash on Delivery Nationwide",
        description:
          "COD available across most Indian pin codes, with the handling fee disclosed at checkout rather than added silently.",
      },
    ],
    techStack: ["Shopify", "Shopify Liquid", "Shopify Payments"],
    results: [
      { metric: "₹499", label: "Free-Shipping Threshold" },
      { metric: "7-Day", label: "Return Window" },
      { metric: "Multi-Vendor", label: "Dispatch Model" },
      { metric: "Nationwide", label: "COD Coverage" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Kidswear",
    tags: [
      "Shopify Development",
      "Multi-Vendor Marketplace",
      "Kidswear E-Commerce",
      "COD & Fulfilment Logic",
    ],
    images: [
      "/projects/vashtaraheaven/screenshot-1.png",
      "/projects/vashtaraheaven/screenshot-2.png",
      "/projects/vashtaraheaven/screenshot-3.png",
    ],
    coverImage: "/projects/vashtaraheaven/screenshot-1.png",
    liveUrl: "https://www.vashtaraheaven.com",
    featured: false,
    publishedAt: "2026-09-13",
  },
  {
    slug: "ladyscootytrainer",
    domain: "ladyscootytrainer.com",
    title: "Lady Scooty Trainer",
    shortDescription:
      "Booking platform for a women-only scooty training service across Delhi NCR — free-consultation funnel, course pages and CSR partnerships.",
    description:
      "Built the website for Lady Scooty Trainer (LST Delhi), a women-only scooty training service run by professional female trainers across Delhi, Noida, Ghaziabad, Gurgaon, Dwarka and Rohini. The site centres on a free-consultation booking form that captures location, prior riding experience and preferred time slot, backed by two structured course pages — a 7-day basic programme and a 5-day advance programme — plus a separate track for corporate and CSR mobility partnerships.",
    challenge:
      "Women wanting to learn scooty riding in Delhi NCR had few options built specifically around their comfort — most driving instruction is male-led and generic, and the barrier for a genuine beginner is often confidence rather than access to a vehicle.",
    approach:
      "We built the funnel around a single low-friction action: a free consultation form asking only what's needed to match a learner to the right trainer and course. Trust signals — verified Google review counts, a 4.9 average rating, service-area coverage — sit above the fold rather than buried in a testimonials section nobody scrolls to.",
    keyFeatures: [
      {
        title: "Free Consultation Booking Form",
        description:
          "Captures location, prior riding experience and preferred time slot, routed straight to a callback rather than a generic contact form.",
      },
      {
        title: "Two-Tier Course Structure",
        description:
          "Separate landing pages for the 7-Day Basic programme (complete beginners) and the 5-Day Advance programme (road confidence), each with its own curriculum breakdown.",
      },
      {
        title: "Corporate & CSR Partnership Track",
        description:
          "A dedicated section for organisations running women-mobility, workforce training or CSR programmes, distinct from the individual-learner funnel.",
      },
      {
        title: "Verified Review Trust Signals",
        description:
          "Google review count and average rating surfaced directly on the homepage rather than linked out, alongside named, location-tagged testimonials.",
      },
      {
        title: "Service-Area Coverage Map",
        description:
          "Explicit listing of every Delhi NCR area served, so a prospective learner can confirm coverage before filling out the form.",
      },
    ],
    techStack: ["WordPress", "PHP", "MySQL", "WhatsApp Business API"],
    results: [
      { metric: "5,000+", label: "Women Trained" },
      { metric: "1,046+", label: "Verified Google Reviews" },
      { metric: "4.9", label: "Average Google Rating" },
      { metric: "6", label: "Delhi NCR Service Areas" },
    ],
    role: "Full-Stack Developer",
    category: "Service / Women's Mobility Training",
    tags: [
      "Lead Generation Website",
      "Booking Funnel Design",
      "Local Service Business",
      "CSR Partnership Pages",
    ],
    images: [
      "/projects/ladyscootytrainer/screenshot-1.png",
      "/projects/ladyscootytrainer/screenshot-2.png",
      "/projects/ladyscootytrainer/screenshot-3.png",
    ],
    coverImage: "/projects/ladyscootytrainer/screenshot-1.png",
    liveUrl: "https://ladyscootytrainer.com",
    featured: false,
    publishedAt: "2026-09-13",
  },
  {
    slug: "newsaraswatisareecentre",
    domain: "newsaraswatisareecentre.in",
    title: "New Saraswati Saree Centre",
    shortDescription:
      "Handwoven textile marketplace with 40+ products, multi-gateway payments, and festive collection pages.",
    description:
      "Built a WooCommerce saree marketplace with 40+ handwoven products spanning cotton, muslin, and paithani varieties. Implemented product filtering, dynamic pricing, and secure checkout. Integrated multi-gateway payments, wishlist, and comparison tools. Created festive collection pages for Diwali, Navratri, and Durga Puja, with customer testimonials and mobile-optimized design.",
    challenge:
      "New Saraswati Saree Centre had decades of offline reputation as a trusted handwoven textile retailer, but zero digital sales channel. During Diwali, Navratri, and Durga Puja — their highest-revenue periods — customers couldn't find or buy from them online. The business was losing festive season demand to digital-first competitors while their loyal customers had no way to shop from home.",
    approach:
      "We designed the store around festive shopping behaviour. Dedicated collection pages for each major Indian festival — Diwali, Navratri, Durga Puja — were built as the primary discovery paths, not just filter tags. The product catalog was structured around weave type (cotton, muslin, paithani) to match how their existing customers already thought about saree selection. Free shipping and a frictionless mobile checkout removed the last reasons to hesitate.",
    keyFeatures: [
      {
        title: "40+ Handwoven Product Catalog",
        description:
          "Comprehensive catalog of cotton, muslin, and paithani handwoven sarees with detailed product descriptions, weave information, and high-quality product photography.",
      },
      {
        title: "Festive Collection Pages",
        description:
          "Dedicated landing pages for Diwali, Navratri, and Durga Puja collections — optimised for seasonal search traffic and curated to match festive gifting and dressing occasions.",
      },
      {
        title: "Product Filtering by Type & Price",
        description:
          "Multi-filter system allowing buyers to sort by saree type (cotton, muslin, paithani), price range, and occasion — making a 40+ product catalog easy to navigate.",
      },
      {
        title: "Multi-Gateway Payment Integration",
        description:
          "Support for UPI, digital wallets, credit/debit cards, and net banking — giving every customer their preferred payment method with a fast, reliable checkout experience.",
      },
      {
        title: "Wishlist & Comparison Tools",
        description:
          "Save-for-later wishlist and product comparison allowing shoppers to shortlist favourites and compare sarees across price, type, and design before purchasing.",
      },
      {
        title: "Customer Testimonials Section",
        description:
          "Social proof from verified buyers that builds confidence for new customers making their first online saree purchase from a brand they may know only offline.",
      },
      {
        title: "Free Shipping Promotion",
        description:
          "Free shipping threshold prominently displayed across the store, designed to increase average order value and remove the cost objection at checkout.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "Multiple Payment Gateways",
      "Responsive CSS",
    ],
    results: [
      { metric: "40+", label: "Products Listed" },
      { metric: "3", label: "Festive Collection Pages" },
      { metric: "Free", label: "Shipping Offered" },
      { metric: "Multi-Gate", label: "Payments Supported" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Textiles",
    tags: [
      "WooCommerce Development",
      "Traditional Textile E-Commerce",
      "Multi-Gateway Payment Integration",
      "Festive Collection Management",
      "Mobile-Responsive Design",
    ],
    images: ["/projects/newsaraswatisareecentre/screenshot-1.png"],
    coverImage: "/projects/newsaraswatisareecentre/screenshot-1.png",
    liveUrl: "https://newsaraswatisareecentre.in",
    featured: false,
  },
  {
    slug: "saurally",
    domain: "saurally.com",
    title: "Saurally Solar",
    shortDescription:
      "Renewable energy e-commerce platform with 40+ solar products, comparison tools, and multi-gateway payments.",
    description:
      "Built a WooCommerce solar products platform for Saurally Solar featuring 40+ products. Implemented advanced product filtering, comparison tools, and dynamic pricing. Integrated multi-gateway payments including UPI, cards, and net banking, along with wishlist functionality and WhatsApp support. Created a mobile-optimized design with free shipping and delivery tracking.",
    challenge:
      "Solar buyers are technically informed decision-makers who compare specifications, wattage, efficiency ratings, and prices carefully before committing to a purchase. Saurally Solar had a quality product range but no digital platform that allowed buyers to do this research and convert — losing sales to competitors with more sophisticated e-commerce presences.",
    approach:
      "We built a WooCommerce store designed around the solar buying journey — a high-consideration purchase where comparison, specification detail, and pricing transparency drive conversion. Product comparison tools, advanced technical filtering, and WhatsApp support for pre-purchase questions were central to the design. Free shipping and multiple payment options removed the final friction points.",
    keyFeatures: [
      {
        title: "40+ Solar Product Catalog",
        description:
          "Comprehensive range of solar panels, inverters, batteries, mounting systems, and accessories with detailed technical specifications, wattage ratings, and efficiency data.",
      },
      {
        title: "Advanced Product Filtering",
        description:
          "Multi-parameter filtering by product type, wattage, brand, price range, and use case (residential, commercial, industrial) — helping technical buyers find the right product fast.",
      },
      {
        title: "Product Comparison Tool",
        description:
          "Side-by-side comparison of up to 3 solar products across key specifications, pricing, and warranty terms — the most important feature for considered solar purchases.",
      },
      {
        title: "Multi-Gateway Payment Integration",
        description:
          "Full payment gateway coverage with UPI, credit/debit cards, net banking, and EMI options — catering to both individual homeowners and commercial procurement teams.",
      },
      {
        title: "WhatsApp Customer Support",
        description:
          "Direct WhatsApp integration allowing buyers to ask technical questions, request custom quotes for larger installations, and get pre-purchase guidance in real time.",
      },
      {
        title: "Dynamic Pricing Engine",
        description:
          "Admin-controlled dynamic pricing with bulk discount tiers, promotional pricing, and seasonal offers — giving the sales team full pricing flexibility without developer changes.",
      },
      {
        title: "Delivery Tracking & Free Shipping",
        description:
          "Integrated delivery tracking with estimated delivery dates and a free shipping offer above a threshold — essential trust signals for high-value product shipments.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "Multiple Payment Gateways",
      "WhatsApp Business API",
      "Responsive CSS",
    ],
    results: [
      { metric: "40+", label: "Solar Products Listed" },
      { metric: "Compare", label: "Tool Built-In" },
      { metric: "3-Gateway", label: "Payments Supported" },
      { metric: "WhatsApp", label: "Live Support" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Renewable Energy",
    tags: [
      "WooCommerce Development",
      "Solar Product Catalog Design",
      "Multi-Gateway Payment Integration",
      "Advanced Product Filtering",
      "Customer Support Integration",
    ],
    images: ["/projects/saurally/screenshot-1.png"],
    coverImage: "/projects/saurally/screenshot-1.png",
    liveUrl: "https://saurally.com",
    featured: false,
  },
  {
    slug: "sidcobharat",
    domain: "sidcobharat.org",
    title: "SIDCO — Small Industries Development Council Organization",
    shortDescription:
      "Outreach and application platform connecting small-scale industry workers to PMEGP government schemes, free skills training and welfare support.",
    description:
      "Built the outreach site for SIDCO, a council that connects small-scale industry workers to PMEGP and allied central government schemes, free skills training in sewing, embroidery, weaving and painting, and healthcare and education support for workers' families. The site runs an application form capturing candidate details, district and state, structured pages for each programme — the Employment Generation Programme, a Self Help Group scheme, Village Industries Fairs, an Election Survey Project running 250+ survey executives across India, and a Name Board Survey Project — plus a prominent fraud warning, since PMEGP-adjacent scams are common enough that the Council addresses it directly on the homepage.",
    challenge:
      "Government schemes for small-scale industry workers exist, but the council's own framing is blunt about why they don't reach people: development has stayed concentrated in cities, and \"corruption and laxity\" have meant workers not receiving timely support or training. Compounding that, the PMEGP scheme space attracts fraudulent job-fee scams that erode trust before an organisation doing real outreach can even make contact.",
    approach:
      "We built the site to do two things at once — make applying genuinely easy (a single form: name, mobile, district, state, optional document upload) and make the fraud warning impossible to miss, placed on the homepage itself rather than buried in a footer disclaimer. Each programme area got its own explained section rather than a single \"our services\" paragraph, since PMEGP guidance, training, education and survey work are different asks with different audiences.",
    keyFeatures: [
      {
        title: "Scheme Application Form",
        description:
          "Candidate name, mobile, district, state and an optional single-PDF document upload, built to be fillable in under a minute.",
      },
      {
        title: "Fraud Warning Notice",
        description:
          "A dedicated, unmissable notice stating SIDCO is not a government job and never asks for payment — placed on the homepage rather than a policy page.",
      },
      {
        title: "Five Structured Programme Pages",
        description:
          "Employment Generation Programme (PMEGP), Self Help Group Scheme, Village Industries Fair, Election Survey Project and Name Board Survey Project, each explained on its own terms.",
      },
      {
        title: "Election Survey Project Detail",
        description:
          "A programme page covering statistical voting-trend analysis run through 250+ survey executives deployed across India.",
      },
      {
        title: "Impact Counters",
        description:
          "Families supported, skill-programme beneficiaries, homes for the elderly and insurance beneficiaries, tracked as live figures rather than a static claim.",
      },
    ],
    techStack: ["WordPress", "PHP", "MySQL"],
    results: [
      { metric: "5", label: "Government Schemes Covered" },
      { metric: "250+", label: "Election Survey Executives" },
      { metric: "4", label: "Skills Trained: Sewing, Embroidery, Weaving, Painting" },
      { metric: "2", label: "Offices: Gurugram & Bangalore" },
    ],
    role: "Full-Stack Developer",
    category: "Institutional / Government Scheme Outreach",
    tags: [
      "WordPress Development",
      "Government Scheme Application Portal",
      "Nonprofit & Institutional Websites",
      "Lead Capture & Verification Forms",
    ],
    images: [
      "/projects/sidcobharat/screenshot-1.png",
      "/projects/sidcobharat/screenshot-2.png",
      "/projects/sidcobharat/screenshot-3.png",
    ],
    coverImage: "/projects/sidcobharat/screenshot-1.png",
    liveUrl: "https://sidcobharat.org",
    featured: false,
    publishedAt: "2026-09-13",
  },
  {
    slug: "sitaravastram",
    domain: "sitaravastram.com",
    title: "Sitara Vastram",
    shortDescription:
      "Premium limited-piece ethnic wear store with style video integration and WhatsApp business support.",
    description:
      "Built a WooCommerce ethnic wear store with limited-edition collections spanning festive, everyday, and exclusive lines. Implemented product categories, variants, and dynamic pricing. Created a style video section featuring 6+ fashion reels. Integrated testimonials, WhatsApp support, and wishlist functionality. Designed a mobile-responsive interface with free shipping, COD, and secure checkout.",
    challenge:
      "Premium ethnic wear buyers are visual shoppers increasingly influenced by short-form video content — yet most fashion e-commerce stores only use static images. Sitara Vastram's exclusive, limited-piece collections deserved a shopping experience that matched the energy of the brand. The challenge was building a store that sold the feeling of exclusivity while making video content a natural part of the shopping journey.",
    approach:
      "We made video the centrepiece of the product discovery experience. Rather than tucking fashion reels into a separate section, we integrated them into the shopping flow — letting buyers see outfits in motion before they even reached the product page. The limited-edition collection structure reinforced exclusivity and urgency. WhatsApp support enabled real-time styling advice, bridging the gap between scrolling a reel and clicking purchase.",
    keyFeatures: [
      {
        title: "Style Video Section — 6+ Fashion Reels",
        description:
          "Embedded short-form fashion video section showcasing outfits in motion — giving buyers the Instagram-native shopping experience they expect from a premium ethnic brand.",
      },
      {
        title: "Limited-Edition Collection Management",
        description:
          "Collection system built around scarcity — festive, everyday, and exclusive lines with limited stock indicators that create genuine urgency without artificial tactics.",
      },
      {
        title: "Product Variants & Dynamic Pricing",
        description:
          "Full size and colour variant management with dynamic pricing for premium or exclusive pieces, giving the team complete control over pricing strategy per collection.",
      },
      {
        title: "WhatsApp Business Integration",
        description:
          "One-tap WhatsApp contact directly from product pages for styling questions, size guidance, and custom order enquiries — the natural support channel for fashion buyers.",
      },
      {
        title: "Wishlist Functionality",
        description:
          "Save-for-later wishlist allowing buyers to track pieces from upcoming collections and return to purchase when a favourite item drops.",
      },
      {
        title: "COD & Free Shipping",
        description:
          "Cash on delivery and free shipping options designed specifically for buyers hesitant about prepaid online fashion purchases, increasing conversion from first-time visitors.",
      },
      {
        title: "Mobile-First Design",
        description:
          "Design led by mobile from the ground up — fast-loading video embeds, thumb-friendly navigation, and a checkout flow that works flawlessly on a 5-inch screen.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "Video Embed Integration",
      "WhatsApp Business API",
      "Responsive CSS",
    ],
    results: [
      { metric: "6+", label: "Style Video Reels" },
      { metric: "3", label: "Collection Tiers" },
      { metric: "COD", label: "Payment Option" },
      { metric: "WhatsApp", label: "Styling Support" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Fashion",
    tags: [
      "WooCommerce E-Commerce Development",
      "Limited-Edition Collection Management",
      "Style Video Integration",
      "WhatsApp Business Integration",
      "Premium Fashion Store Design",
    ],
    images: ["/projects/sitaravastram/screenshot-1.png"],
    coverImage: "/projects/sitaravastram/screenshot-1.png",
    liveUrl: "https://sitaravastram.com",
    featured: false,
  },
  {
    slug: "terrestrialyt",
    domain: "terrestrialyt.com",
    title: "TerrestrialYT",
    shortDescription:
      "Gaming and anime merchandise store with product variations, Discord integration, and global shipping.",
    description:
      "Built a WooCommerce store for TerrestrialYT featuring gaming and anime merchandise including mousepads, posters, tapestries, tote bags, and coasters. Implemented product variations, dynamic pricing, and wishlist functionality. Integrated social media across Instagram, YouTube, Twitch, and Discord for community engagement. Created a responsive mobile design with secure checkout and global shipping.",
    challenge:
      "Content creators building merchandise stores face a unique challenge: their audience already has a relationship with them across multiple platforms — YouTube, Twitch, Discord — but a generic Shopify template breaks that community feeling the moment fans visit the store. TerrestrialYT needed a merch store that felt like an extension of the creator's world, not a disconnected shopping page.",
    approach:
      "We built a community-first merch store where social integration wasn't an afterthought — it was the frame. Discord, Twitch, YouTube, and Instagram links were woven through the store experience so fans could move between the community and the store naturally. Product variations were built around the gaming and anime aesthetic, and global shipping was implemented from day one since the creator's audience spans multiple countries.",
    keyFeatures: [
      {
        title: "Gaming & Anime Merchandise Catalog",
        description:
          "Diverse merch catalog spanning mousepads, posters, tapestries, tote bags, and coasters — all designed around the creator's gaming and anime visual identity.",
      },
      {
        title: "Product Variations & Wishlist",
        description:
          "Full variant system for size, design, and colour options with a wishlist feature allowing fans to save favourite items for future purchases or gifting.",
      },
      {
        title: "Multi-Platform Social Integration",
        description:
          "Instagram, YouTube, Twitch, and Discord links integrated throughout the store experience, keeping fans connected to the community ecosystem they already inhabit.",
      },
      {
        title: "Discord Customer Support Integration",
        description:
          "Support routed through Discord — the platform where TerrestrialYT's audience is most active — making customer service feel native to the community.",
      },
      {
        title: "Global Shipping Support",
        description:
          "International shipping configuration covering multiple countries, with accurate shipping cost calculation and delivery estimates for an inherently global fan base.",
      },
      {
        title: "Community Testimonials Section",
        description:
          "Fan review and testimonial section that doubles as community engagement — reviews from real community members carry more weight than anonymous buyer feedback.",
      },
      {
        title: "Responsive Mobile Design",
        description:
          "Mobile-first design built for a young, smartphone-centric audience that will likely discover and purchase from the store directly after watching content on their phone.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "Discord API",
      "Social Media Integration",
      "Global Shipping APIs",
      "Responsive CSS",
    ],
    results: [
      { metric: "5+", label: "Merch Categories" },
      { metric: "Global", label: "Shipping Enabled" },
      { metric: "4-Platform", label: "Social Integration" },
      { metric: "Discord", label: "Community Support" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Gaming & Anime",
    tags: [
      "WooCommerce E-Commerce Development",
      "Product Variations & Variants Management",
      "Social Media Integration",
      "Community Forum Integration",
      "Merchandise Store Design",
    ],
    images: ["/projects/terrestrialyt/screenshot-1.png"],
    coverImage: "/projects/terrestrialyt/screenshot-1.png",
    liveUrl: "https://terrestrialyt.com",
    featured: false,
  },
  {
    slug: "krushidoctor",
    domain: "krushidoctor.com",
    title: "Krushi Doctor",
    shortDescription:
      "Agricultural guidance platform serving 1.2 lakh+ farmers with 100+ products and crop PDF guides.",
    description:
      "Built a WooCommerce agricultural platform with 100+ products including crop schedules and sticky traps. Implemented crop PDF guides with WhatsApp support channels. Created product categories spanning insecticides, fertilizers, and farming equipment. Integrated farmer testimonials and a blog for community knowledge sharing. Designed a mobile-first interface with 24/7 support and free shipping serving over 1.2 lakh farmers.",
    challenge:
      "Indian farmers struggle to access reliable, localised agricultural guidance. They deal with fragmented advice across phone calls, local shops, and unreliable internet sources — while also needing to buy the right products at the right time in the crop cycle. Krushi Doctor saw an opportunity to combine a product marketplace with credible agricultural knowledge — but needed a platform accessible to farmers with basic smartphones and limited data.",
    approach:
      "We built a platform that treats farmers as the sophisticated decision-makers they are. Product commerce and educational content were integrated — crop PDF guides were linked directly to relevant product pages so a farmer reading about aphid management could immediately purchase the right insecticide. WhatsApp was the support backbone since it's how rural India already communicates. Mobile performance was non-negotiable: pages had to load fast on entry-level Android phones with 4G connections.",
    keyFeatures: [
      {
        title: "100+ Agricultural Product Catalog",
        description:
          "Comprehensive catalog of crop-specific products including insecticides, fertilizers, sticky traps, crop schedules, and farming equipment, organised by crop type and problem type.",
      },
      {
        title: "Crop PDF Guide System",
        description:
          "Downloadable crop PDF guides covering pest management, seasonal schedules, and best practices for major crops — linked directly to relevant products in the store.",
      },
      {
        title: "WhatsApp 24/7 Support",
        description:
          "WhatsApp-based support channel that farmers can reach any time for product questions, application guidance, and crop problem diagnosis — meeting them where they already are.",
      },
      {
        title: "Category-Based Product Discovery",
        description:
          "Product categories organised by crop problem type (pest control, nutrition, equipment) and crop type — matching how farmers think about their needs rather than product taxonomy.",
      },
      {
        title: "Farmer Community Blog",
        description:
          "Agricultural blog with seasonal tips, crop advisories, and best practices that drives organic search traffic and positions Krushi Doctor as a trusted knowledge source.",
      },
      {
        title: "Farmer Testimonials Section",
        description:
          "Testimonials from farmers across regions that build trust for new visitors — peer validation from fellow farmers is the most persuasive social proof in agricultural markets.",
      },
      {
        title: "Free Shipping & Easy Returns",
        description:
          "Free shipping threshold and a simple returns process — removing the financial hesitation of first-time online purchases for farmers accustomed to buying locally.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "WhatsApp Business API",
      "PDF Management",
      "SEO Optimisation",
      "Responsive CSS",
    ],
    results: [
      { metric: "1.2L+", label: "Farmers Served" },
      { metric: "100+", label: "Products Listed" },
      { metric: "24/7", label: "WhatsApp Support" },
      { metric: "Free", label: "Shipping Offered" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / AgriTech",
    tags: [
      "WooCommerce Agricultural Platform Development",
      "Crop Schedule & Digital Guidance System",
      "Multi-Category Agricultural Products Management",
      "WhatsApp Integration & Support System",
      "Farmer Community & Testimonial Platform",
    ],
    images: ["/projects/krushidoctor/screenshot-1.png"],
    coverImage: "/projects/krushidoctor/screenshot-1.png",
    liveUrl: "https://krushidoctor.com",
    featured: false,
  },
  {
    slug: "kalamohini",
    domain: "kalamohini.in",
    title: "Kalamohini by Aditya",
    shortDescription:
      "Hand-crafted tissue-silk sets with intricate mirror-work — premium artisan ethnic wear store.",
    description:
      "Built a premium WooCommerce ethnic wear store for Kalamohini by Aditya, specialising in hand-crafted tissue-silk sets with intricate mirror-work. Implemented curated product collections, detailed product pages with artisan-quality imagery, and a refined shopping experience. Integrated WhatsApp-based customer support, wishlist functionality, and a mobile-responsive design that reflects the premium, handcrafted nature of the brand.",
    challenge:
      "Artisan fashion brands face a fundamental digital challenge: handcrafted clothing has qualities — texture, weight, the precision of hand-done mirror work — that can't be captured in a standard product photo grid. Kalamohini by Aditya needed a digital storefront that elevated the artisan story, communicated the premium nature of the craft, and built enough confidence for buyers to purchase a high-value handmade garment online without seeing it in person.",
    approach:
      "We designed the store around visual storytelling. Product pages were built to be richly detailed — multiple angles, craft process descriptions, material specifics — giving buyers the information richness of a showroom visit. The brand palette and typography were chosen to reflect the premium, artisanal positioning. WhatsApp support was front and centre since artisan customers often have specific customisation questions that need a conversation, not a form.",
    keyFeatures: [
      {
        title: "Artisan Product Showcase Pages",
        description:
          "Rich product pages for each tissue-silk and mirror-work set with multiple high-resolution images, detailed craft descriptions, material specifications, and care instructions.",
      },
      {
        title: "Curated Collection Management",
        description:
          "Collections organised by occasion and style — new arrivals, festive sets, everyday wear — keeping the catalog curated and the brand feeling exclusive rather than a mass catalogue.",
      },
      {
        title: "WhatsApp Business Integration",
        description:
          "Direct WhatsApp contact from every product page for customisation enquiries, size guidance, and order questions — essential for artisan fashion where buyers often need reassurance.",
      },
      {
        title: "Premium Brand UI Design",
        description:
          "Refined visual identity with a considered colour palette, premium typography, and generous whitespace that communicates the brand's artisan positioning at every touchpoint.",
      },
      {
        title: "Wishlist & Saved Items",
        description:
          "Save-for-later wishlist allowing returning customers to track new arrivals and return to pieces they were considering — especially valuable for limited-run artisan collections.",
      },
      {
        title: "Mobile-Responsive Design",
        description:
          "Fully responsive layout with optimised image loading for fast mobile browsing — ensuring the premium experience translates across every device size.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "WhatsApp Business API",
      "Responsive CSS",
      "Image Optimisation",
    ],
    results: [
      { metric: "Premium", label: "Artisan Brand Built" },
      { metric: "WhatsApp", label: "First Support Channel" },
      { metric: "Curated", label: "Collection System" },
      { metric: "100%", label: "Mobile Optimised" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Artisan Fashion",
    tags: [
      "WooCommerce E-Commerce Development",
      "Artisan Product Showcase",
      "Premium Fashion Store Design",
      "WhatsApp Business Integration",
      "Mobile-Responsive Design",
    ],
    images: ["/projects/kalamohini/screenshot-1.png"],
    coverImage: "/projects/kalamohini/screenshot-1.png",
    liveUrl: "https://kalamohini.in",
    featured: false,
  },
  {
    slug: "mahhika",
    domain: "mahhika.com",
    title: "Mahhika",
    shortDescription:
      "Indian wedding fashion e-commerce platform with premium saree and ethnic wear collections.",
    description:
      "Built a WooCommerce e-commerce platform for Mahhika, a premium Indian wedding fashion brand specialising in sarees and ethnic wear. Implemented curated collections including bridal sarees, festive wear, and trending styles. Created advanced product filtering, secure multi-gateway checkout, and dynamic pricing. Integrated a wishlist, comparison tools, and a mobile-first design optimised for wedding season shopping.",
    challenge:
      "The Indian wedding fashion market is intensely competitive online, with buyers browsing dozens of stores before making a decision on high-value bridal and festive purchases. Mahhika had quality products but needed a digital presence strong enough to capture intent at the moment buyers are actively planning for a wedding — and convert that intent into a purchase, not just a browse.",
    approach:
      "We built the store around the wedding planning journey. Collection pages were structured around the buyer's context — bridal, festive, trending — so shoppers arriving from search or social could immediately land in a relevant collection. Strong promotional mechanics (sale banners, percentage off displays) were built into the template system so the team could run seasonal campaigns without development work. The checkout was optimised for high-value purchases with multiple trusted payment options.",
    keyFeatures: [
      {
        title: "Bridal & Festive Collection Pages",
        description:
          "Dedicated collection landing pages for bridal sarees, festive wear, and trending styles — each optimised for seasonal search traffic and direct social media linking.",
      },
      {
        title: "Advanced Product Filtering & Search",
        description:
          "Multi-attribute filtering by category, price, colour, and occasion with fast keyword search — giving buyers complete control over navigating a large, diverse catalog.",
      },
      {
        title: "Multi-Gateway Payment Integration",
        description:
          "Comprehensive payment coverage with UPI, credit/debit cards, digital wallets, and net banking — critical for high-value bridal purchases where payment confidence matters.",
      },
      {
        title: "Wishlist & Comparison Tools",
        description:
          "Save-for-later wishlist and side-by-side product comparison — supporting the research-heavy decision process that characterises high-value wedding fashion purchases.",
      },
      {
        title: "Promotional Offer System",
        description:
          "Promotional sale banners, percentage discount display, and coupon code support — allowing the team to run Indian Wedding Sale and seasonal campaigns that drive urgency.",
      },
      {
        title: "Dynamic Product Catalog",
        description:
          "Flexible catalog management with easy addition of new collections, seasonal inventory updates, and featured product placements that keep the store fresh for returning visitors.",
      },
      {
        title: "Mobile-First Design",
        description:
          "Wedding shoppers browse on mobile during planning sessions. The entire UX was designed mobile-first with fast image loading, thumb-friendly navigation, and a one-page checkout.",
      },
    ],
    techStack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "Multiple Payment Gateways",
      "Responsive CSS",
      "SEO Optimisation",
    ],
    results: [
      { metric: "3+", label: "Collection Tiers" },
      { metric: "Multi-Gate", label: "Payments Supported" },
      { metric: "Sale", label: "Promotion System" },
      { metric: "100%", label: "Mobile Optimised" },
    ],
    role: "Full-Stack Developer",
    category: "E-Commerce / Wedding Fashion",
    tags: [
      "WooCommerce E-Commerce Development",
      "Bridal Collection Management",
      "Multi-Gateway Payment Integration",
      "Product Filtering & Search",
      "Wedding Fashion Store Design",
    ],
    images: ["/projects/mahhika/screenshot-1.png"],
    coverImage: "/projects/mahhika/screenshot-1.png",
    liveUrl: "https://mahhika.com",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): StaticProject | undefined {
  return staticProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): StaticProject[] {
  return staticProjects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return staticProjects.map((p) => p.slug);
}
