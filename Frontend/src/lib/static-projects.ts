export type StaticProject = {
  slug: string;
  domain: string;
  title: string;
  shortDescription: string;
  description: string;
  role: string;
  category: string;
  tags: string[];
  images: string[];
  coverImage: string;
  liveUrl: string;
  featured: boolean;
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
    role: "Full-Stack Developer",
    category: "E-Commerce / Wedding Fashion",
    tags: [
      "Next.js Marketplace Development",
      "Multi-Vendor Platform Architecture",
      "Occasion-Based Product Filtering",
      "Payment Gateway Integration",
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
    slug: "maribiz-ai",
    domain: "MariBiz.ai",
    title: "MariBiz.ai",
    shortDescription:
      "Global marine procurement marketplace connecting 3,226+ vendors with shipowners across 121 service categories.",
    description:
      "Built a global B2B marine procurement marketplace connecting 3,226+ vendors with shipowners. Implemented an RFQ (Request for Quote) system with vendor verification and real-time messaging. Created detailed vendor profiles across 121 categories including maintenance, spare parts, hull cleaning, and crew transport. Integrated quote comparison tools and port-based service discovery for the maritime industry.",
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
      "Developed a full-featured HR and talent acquisition platform website for Grafftee, India's leading recruitment and workforce solutions company. Built multi-feature pages showcasing services including talent acquisition, virtual HR support, payroll management, and employee experience tools. Implemented interactive service modules with FAQs, use cases, and platform capability displays. Integrated client testimonials, contact forms, and booking systems for demo consultations.",
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
      "Developed a comprehensive website for HCB Engineering, a government-licensed electrical contracting company with over 20 years of experience. Created a professional online presence showcasing commercial, residential, and specialty electrical services. Features include a service portfolio, project gallery, client testimonials, and integrated contact forms for lead generation. Implemented fully responsive design for seamless mobile and desktop access, improving visibility across government and commercial sectors.",
    role: "Full-Stack Developer",
    category: "Engineering / Corporate",
    tags: [
      "Website Development",
      "Responsive Web Design",
      "WordPress Development",
      "Contact Form Integration",
      "Service Portfolio Showcase",
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
      "Developed a sophisticated e-commerce platform for Samaraha, specializing in premium traditional silk sarees including Banarasi, Tussar, and Hand Printed varieties. Built a comprehensive WooCommerce shopping experience with advanced product filtering by price, silk type, and collection categories. Implemented a dynamic product catalog with 25+ SKUs, wishlist, comparison, and cart functionality. Integrated secure payment gateways with UPI and digital wallet support, plus member-exclusive pricing.",
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
    slug: "newsaraswatisareecentre",
    domain: "newsaraswatisareecentre.in",
    title: "New Saraswati Saree Centre",
    shortDescription:
      "Handwoven textile marketplace with 40+ products, multi-gateway payments, and festive collection pages.",
    description:
      "Built a WooCommerce saree marketplace with 40+ handwoven products spanning cotton, muslin, and paithani varieties. Implemented product filtering by type and price, dynamic pricing, and secure checkout. Integrated multi-gateway payments, wishlist, and comparison tools. Created festive collection pages for Diwali, Navratri, and Durga Puja, along with customer testimonials and a mobile-optimized design with free shipping.",
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
      "Built a WooCommerce solar products platform for Saurally Solar featuring 40+ products. Implemented advanced product filtering, comparison tools, and dynamic pricing. Integrated multi-gateway payments including UPI, cards, and net banking, along with wishlist functionality and WhatsApp support. Created a mobile-optimized design with free shipping and delivery tracking for the renewable energy market.",
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
    slug: "sitaravastram",
    domain: "sitaravastram.com",
    title: "Sitara Vastram",
    shortDescription:
      "Premium limited-piece ethnic wear store with style video integration and WhatsApp business support.",
    description:
      "Built a WooCommerce ethnic wear store with limited-edition collections spanning festive, everyday, and exclusive lines. Implemented product categories, variants, and dynamic pricing. Created a style video section featuring 6+ fashion reels. Integrated testimonials, WhatsApp support, and wishlist functionality. Designed a mobile-responsive interface with free shipping, COD, and secure checkout for premium ethnic fashion.",
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
      "Built a WooCommerce store for TerrestrialYT featuring gaming and anime merchandise including mousepads, posters, tapestries, tote bags, and coasters. Implemented product variations, dynamic pricing, and wishlist functionality. Integrated social media links across Instagram, YouTube, Twitch, and Discord for community engagement. Created a responsive mobile design with secure checkout, global shipping, and Discord-based customer support.",
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
      "Built a WooCommerce agricultural platform with 100+ products including crop schedules and sticky traps. Implemented crop PDF guides with WhatsApp support channels. Created product categories spanning insecticides, fertilizers, and farming equipment. Integrated farmer testimonials and a blog for community knowledge sharing. Designed a mobile-first interface with 24/7 support, free shipping, and easy returns serving over 1.2 lakh farmers.",
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
      "Hand-crafted tissue-silk sets and mirror-work ethnic wear store with premium artisan collections.",
    description:
      "Built a premium WooCommerce ethnic wear store for Kalamohini by Aditya, specializing in hand-crafted tissue-silk sets with intricate mirror-work. Implemented curated product collections, detailed product pages with artisan-quality imagery, and a refined shopping experience. Integrated WhatsApp-based customer support, wishlist functionality, and a mobile-responsive design that reflects the premium, handcrafted nature of the brand.",
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
      "Built a WooCommerce e-commerce platform for Mahhika, a premium Indian wedding fashion brand specializing in sarees and ethnic wear. Implemented curated collections including bridal sarees, festive wear, and trending styles. Created advanced product filtering, secure multi-gateway checkout, and dynamic pricing. Integrated a wishlist, comparison tools, and a mobile-first design optimized for wedding season shopping.",
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
