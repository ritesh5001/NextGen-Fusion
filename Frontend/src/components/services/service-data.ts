import {
  BarChart3,
  Bot,
  Cloud,
  Code2,
  Megaphone,
  MonitorSmartphone,
  Plug,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Zap,
  Clock3,
} from "lucide-react"
import type { ServicePageData } from "./ServicePageTemplate"

export const ecommerceServiceData: ServicePageData = {
  badge: "E-commerce Web Development Services",
  heroTitle: "E-commerce Web Development Services That",
  heroTitleHighlight: "Drive Sales, Reduce Cart Abandonment, and Scale Revenue",
  heroDescription:
    "We build high-converting online stores with optimized product discovery, frictionless checkout, and deep integrations that help your business sell more — every single day.",
  aboutIcon: ShoppingCart,
  aboutDescription:
    "Our E-commerce Web Development Services combine storefront design, payment infrastructure, inventory management, and performance engineering into a single delivery. We build for conversion, not just aesthetics.",
  whoForDescription:
    "D2C brands, retail businesses, and manufacturers who want to sell online, scale their catalog, and reduce the friction that kills conversion between product discovery and checkout.",
  painPointsHeading: "Common Pain Points in E-commerce Web Development",
  painPoints: [
    "High cart abandonment rates due to complex or slow checkout flows.",
    "Product pages that fail to build trust or communicate value clearly.",
    "No mobile-first experience, losing a majority of mobile shoppers.",
    "Payment gateway failures or limited payment options reducing conversions.",
    "Poor inventory and order management causing operational bottlenecks.",
    "Slow page speed resulting in lost traffic and lower Google rankings.",
  ],
  solutionDescription:
    "We apply a conversion-first methodology: optimized product architecture, frictionless checkout engineering, mobile-first design, and payment reliability. Every decision is tied to measurable revenue outcomes, not just technical deliverables.",
  featuresHeading: "What's Included in Our E-commerce Web Development Services",
  features: [
    { title: "Product Catalog Architecture", description: "Scalable category and filter systems that help customers find what they need with zero friction." },
    { title: "Checkout Optimization", description: "Streamlined single-page or multi-step checkout flows designed to minimize drop-off at every stage." },
    { title: "Payment Gateway Integration", description: "Stripe, Razorpay, PayU, and other regional gateways with fallback logic and error handling." },
    { title: "Mobile-First Shopping Experience", description: "Fully responsive, touch-optimized storefronts that convert mobile visitors into buyers." },
    { title: "Order & Inventory Management", description: "Real-time inventory sync, order status tracking, and fulfillment workflow integration." },
    { title: "SEO & Performance Engineering", description: "Core Web Vitals optimization, structured data, and crawl-friendly architecture for organic growth." },
  ],
  processHeading: "Step-by-Step E-commerce Development Workflow",
  processSteps: [
    { title: "Business & Catalog Audit", description: "We map your product structure, catalog size, and buyer journey to define the right store architecture." },
    { title: "UX Flow & Wireframes", description: "Product listing, detail page, cart, and checkout wireframes designed for conversion before development starts." },
    { title: "Store Design & UI", description: "High-fidelity, brand-aligned design with trust signals, social proof, and clear CTAs." },
    { title: "Development & Integrations", description: "Frontend engineering, backend logic, payment gateways, and third-party tool integrations." },
    { title: "QA & Performance Testing", description: "End-to-end purchase flow testing, cross-device QA, and load time optimization." },
    { title: "Launch & Growth Support", description: "Staged rollout, analytics configuration, and post-launch conversion monitoring." },
  ],
  benefits: [
    { icon: TrendingUp, title: "Higher Conversion Rate", text: "Optimized flows and trust signals turn more browsers into buyers." },
    { icon: ShoppingCart, title: "Lower Cart Abandonment", text: "Streamlined checkout removes friction that causes drop-off." },
    { icon: Search, title: "Better Organic Reach", text: "SEO-ready product pages attract qualified shoppers without paid ads." },
    { icon: BarChart3, title: "Trackable Revenue Growth", text: "Full analytics setup gives you visibility into what drives sales." },
  ],
  technologies: ["Next.js", "React", "TypeScript", "Stripe", "Razorpay", "Supabase", "PostgreSQL", "Redis", "Cloudflare CDN", "Vercel", "Google Analytics 4", "Meta Pixel", "Shipway"],
  caseStudies: [
    { name: "Tatvivah", niche: "Premium Ethnic Wear D2C", summary: "Built a premium storefront with category-first navigation, trust-focused product pages, and a conversion-optimized checkout that reduced abandonment significantly." },
    { name: "Retail Client", niche: "Multi-category Online Store", summary: "Designed a scalable product catalog with advanced filters, real-time inventory, and multi-gateway payment support across web and mobile." },
  ],
  testimonials: [
    { quote: "Our online store conversion rate improved noticeably after they rebuilt our checkout flow.", author: "Founder, D2C Apparel Brand" },
    { quote: "Clean architecture, fast delivery, and the payment integration worked flawlessly from day one.", author: "E-commerce Manager, Retail Company" },
    { quote: "They built it for growth — the store handles traffic spikes without breaking a sweat.", author: "CEO, Consumer Products Brand" },
  ],
  faqs: [
    { question: "Which platforms do you build e-commerce on?", answer: "We build custom Next.js/React storefronts and also work with Shopify and WooCommerce depending on your requirements." },
    { question: "Can you migrate our existing store?", answer: "Yes. We handle full catalog migration, URL redirect mapping, and SEO continuity to protect your rankings." },
    { question: "Which payment gateways do you support?", answer: "Stripe, Razorpay, PayU, PayPal, and most regional gateways. We can integrate any gateway with a documented API." },
    { question: "How long does an e-commerce build take?", answer: "Typically 4–10 weeks depending on catalog size, integrations required, and custom feature scope." },
    { question: "Do you provide post-launch support?", answer: "Yes. We offer maintenance packages covering updates, bug fixes, security patches, and performance monitoring." },
  ],
  ctaTitle: "Ready to Build an E-commerce Store That Actually Converts?",
  ctaDescription: "Let's design and develop an online store that turns visitors into repeat buyers and scales with your business.",
}

export const androidServiceData: ServicePageData = {
  badge: "Android App Development Services",
  heroTitle: "Android App Development Services Built for",
  heroTitleHighlight: "Performance, Retention, and Long-Term Growth",
  heroDescription:
    "We build robust, scalable Android applications with smooth native performance, seamless API connectivity, and user experiences that keep customers coming back.",
  aboutIcon: Smartphone,
  aboutDescription:
    "Our Android App Development Services cover everything from UX design and native development to backend integration, Play Store publishing, and post-launch support — delivered as a complete business solution.",
  whoForDescription:
    "Startups, SMBs, and enterprises who need a reliable Android app to engage customers, automate field operations, or deliver services through a mobile-first experience.",
  painPointsHeading: "Common Pain Points in Android App Development",
  painPoints: [
    "Apps that feel slow, crash frequently, or drain device battery.",
    "Poor UX design that confuses users and drives uninstalls.",
    "Backend API issues causing data sync failures and offline gaps.",
    "No push notification strategy leading to low user retention.",
    "Apps that work on only a few device types due to poor compatibility.",
    "Long development cycles with no clear milestone structure.",
  ],
  solutionDescription:
    "We use a structured mobile-first development approach: UX planning, native Kotlin development, API-first architecture, and rigorous device testing — resulting in apps that perform reliably across Android's fragmented ecosystem.",
  featuresHeading: "What's Included in Our Android App Development Services",
  features: [
    { title: "Native Kotlin Development", description: "High-performance Android apps built with modern Kotlin and Jetpack Compose for smooth, reliable experiences." },
    { title: "API & Backend Integration", description: "Seamless REST API connectivity with auth flows, real-time data sync, and offline-first caching strategies." },
    { title: "Push Notification System", description: "Firebase-powered notification infrastructure for engagement campaigns and transactional alerts." },
    { title: "Multi-device Compatibility", description: "Tested across a wide range of screen sizes, Android versions, and OEM customizations." },
    { title: "Play Store Optimization", description: "App listing optimization, screenshot design, and submission management for Play Store launch." },
    { title: "Analytics & Crash Reporting", description: "Firebase Analytics and Crashlytics integration for usage insights and proactive bug detection." },
  ],
  processHeading: "Step-by-Step Android App Development Workflow",
  processSteps: [
    { title: "Requirements & User Flow Mapping", description: "We define use cases, user personas, and app flows before any design or code begins." },
    { title: "UX Wireframes & Prototype", description: "Low to high-fidelity wireframes covering all core screens and interaction states." },
    { title: "UI Design", description: "Material Design-aligned, brand-consistent interface design optimized for usability." },
    { title: "Native Development", description: "Kotlin-based development with clean architecture (MVVM), Jetpack libraries, and modular code." },
    { title: "QA & Device Testing", description: "Functional testing, performance profiling, and cross-device compatibility validation." },
    { title: "Play Store Launch & Support", description: "App submission, rating optimization, and post-launch monitoring and iteration." },
  ],
  benefits: [
    { icon: Zap, title: "Fast, Smooth Performance", text: "Native Kotlin ensures buttery UX with minimal battery and memory footprint." },
    { icon: TrendingUp, title: "Higher User Retention", text: "Push notifications and seamless UX keep users engaged and returning." },
    { icon: BarChart3, title: "Business Insights", text: "Analytics integration gives you clear data on user behavior and drop-off." },
    { icon: Clock3, title: "Faster Time-to-Market", text: "Structured milestones and parallel workstreams reduce launch timelines." },
  ],
  technologies: ["Kotlin", "Jetpack Compose", "Android SDK", "Firebase", "REST APIs", "Room Database", "Retrofit", "Hilt", "Google Play Console", "Crashlytics", "Figma"],
  caseStudies: [
    { name: "Field Operations App", niche: "B2B Service Management", summary: "Built a native Android app for field technicians with offline-first data capture, GPS tracking, and real-time sync when connectivity returns." },
    { name: "Consumer Engagement App", niche: "D2C Retail", summary: "Developed a customer loyalty and ordering app with push notifications, product catalog, and Razorpay payment integration." },
  ],
  testimonials: [
    { quote: "The app performs flawlessly across different Android devices. Our field team loves it.", author: "Operations Head, Service Company" },
    { quote: "They delivered on schedule and the quality was significantly better than our previous vendor.", author: "Founder, Consumer App Startup" },
    { quote: "The push notification system they built doubled our week-2 retention rate.", author: "Product Manager, D2C Brand" },
  ],
  faqs: [
    { question: "Do you build cross-platform apps too?", answer: "Our core strength is native Android. For cross-platform needs, we can scope React Native solutions separately." },
    { question: "How long does Android app development take?", answer: "Typically 6–14 weeks depending on feature complexity, API dependencies, and design scope." },
    { question: "Will you handle Play Store submission?", answer: "Yes. We manage the full submission process including store listing, screenshots, and compliance requirements." },
    { question: "Can you take over an existing Android app?", answer: "Yes. We conduct a code audit first, then plan the improvement or rebuild roadmap based on findings." },
    { question: "Do you provide app maintenance after launch?", answer: "Yes. We offer ongoing maintenance covering Android version updates, bug fixes, and feature additions." },
  ],
  ctaTitle: "Ready to Build an Android App That Drives Real Business Results?",
  ctaDescription: "Let's create a high-performance Android app your users will love and your business can rely on.",
}

export const webDesignServiceData: ServicePageData = {
  badge: "Web Design Services",
  heroTitle: "Web Design Services That Convert Visitors Into",
  heroTitleHighlight: "Customers Through Clarity, Trust, and Visual Excellence",
  heroDescription:
    "We design modern, conversion-focused web experiences with clear information hierarchy, responsive layouts, and strong visual branding that make your business look and perform its best.",
  aboutIcon: MonitorSmartphone,
  aboutDescription:
    "Our Web Design Services go beyond aesthetics. We combine UX strategy, conversion psychology, and brand identity to create designs that are both visually outstanding and business-effective.",
  whoForDescription:
    "Businesses and brands that want a website design that communicates premium quality, builds instant trust with visitors, and guides them naturally toward taking action.",
  painPointsHeading: "Common Pain Points in Web Design",
  painPoints: [
    "Generic, template-based designs that make you look like everyone else.",
    "Confusing page layouts with no clear visual hierarchy or CTA path.",
    "Designs that break on mobile or look inconsistent across devices.",
    "Brand identity not reflected consistently across pages and elements.",
    "Visually heavy pages that are slow to load and frustrating to use.",
    "No clear conversion path — visitors leave without taking action.",
  ],
  solutionDescription:
    "We start with strategy: understanding your audience, brand position, and conversion goals. Then we design with intention — every element placed to build trust, guide attention, and move visitors toward action.",
  featuresHeading: "What's Included in Our Web Design Services",
  features: [
    { title: "UX Strategy & Information Architecture", description: "Clear page structure and user flow mapping before any visual design begins." },
    { title: "Brand-Aligned Visual Identity", description: "Colors, typography, and UI components that reflect your brand position and market audience." },
    { title: "Responsive & Mobile-First Design", description: "Pixel-perfect layouts across all breakpoints — desktop, tablet, and mobile." },
    { title: "Conversion-Focused Layouts", description: "CTA placement, trust signals, and visual hierarchy engineered to drive action." },
    { title: "High-Fidelity Prototyping", description: "Interactive Figma prototypes for stakeholder review before development handoff." },
    { title: "Design System Creation", description: "Scalable component library and style guide for consistent future development." },
  ],
  processHeading: "Step-by-Step Web Design Workflow",
  processSteps: [
    { title: "Brand & Audience Research", description: "We study your market, competitors, and audience to anchor design decisions in strategy." },
    { title: "Sitemap & Information Architecture", description: "We define page structure and content hierarchy before any visual work begins." },
    { title: "Wireframes & UX Flow", description: "Low-fidelity wireframes to validate layout and user journey before high-fidelity design." },
    { title: "Visual Design & UI", description: "High-fidelity, brand-consistent design for all pages with responsive variations." },
    { title: "Prototype & Review", description: "Interactive Figma prototype shared for feedback, review, and approval." },
    { title: "Development Handoff", description: "Annotated design files, asset exports, and developer briefing for clean implementation." },
  ],
  benefits: [
    { icon: TrendingUp, title: "Higher Conversion Rates", text: "Strategic layouts and clear CTAs guide visitors to take action more often." },
    { icon: BarChart3, title: "Stronger Brand Perception", text: "Premium design signals trust and quality before a word is read." },
    { icon: Zap, title: "Faster Development", text: "Clean, well-documented designs reduce development ambiguity and rework." },
    { icon: Search, title: "Better User Retention", text: "Intuitive UX keeps visitors on your site longer and returning more often." },
  ],
  technologies: ["Figma", "Adobe XD", "Framer", "Tailwind CSS", "Shadcn UI", "Next.js", "Lottie", "Framer Motion"],
  caseStudies: [
    { name: "NextGen Fusion Website", niche: "Agency Brand Identity", summary: "Designed the full visual language, component system, and page layouts for a modern digital agency with conversion-focused architecture." },
    { name: "MariBiz", niche: "Marine B2B Marketplace", summary: "Created a trust-first design system for a complex B2B platform, balancing information density with clear navigation and lead generation paths." },
  ],
  testimonials: [
    { quote: "The design immediately elevated how prospects perceive our brand. We get compliments on the website regularly now.", author: "CEO, B2B Software Company" },
    { quote: "They understood conversion design, not just pretty design. The layout changes directly improved our lead form submissions.", author: "Marketing Director, SaaS Brand" },
    { quote: "Clean, fast, and perfectly on-brand. Exactly what we were looking for.", author: "Founder, Premium D2C Brand" },
  ],
  faqs: [
    { question: "Do you do just design, or development too?", answer: "We offer design-only engagements with full Figma handoff, or end-to-end design-plus-development projects." },
    { question: "What tools do you use for design?", answer: "Primarily Figma for all UI/UX work, with Adobe tools for asset creation where needed." },
    { question: "How many design revisions are included?", answer: "We typically allow 2 revision rounds per page. Additional rounds can be scoped as needed." },
    { question: "Do you create a design system?", answer: "Yes. All projects include a component library and style guide for consistent, scalable future development." },
    { question: "How long does the web design process take?", answer: "Typically 2–5 weeks depending on the number of pages and complexity of the design scope." },
  ],
  ctaTitle: "Ready for a Web Design That Actually Converts?",
  ctaDescription: "Let's create a website design that makes your brand look premium and drives measurable business results.",
}

export const aiServiceData: ServicePageData = {
  badge: "AI Automation and AI Development Services",
  heroTitle: "AI Automation Services That Eliminate Manual Work and",
  heroTitleHighlight: "Unlock Intelligent, Scalable Business Operations",
  heroDescription:
    "We build AI-powered automation systems, intelligent assistants, and custom AI features that help your team work faster, make smarter decisions, and scale without proportionally increasing headcount.",
  aboutIcon: Bot,
  aboutDescription:
    "Our AI Automation and Development Services combine workflow automation, large language model integration, custom AI tooling, and intelligent data processing to deliver real operational leverage for your business.",
  whoForDescription:
    "SMBs, agencies, and enterprises who want to automate repetitive workflows, add AI-powered features to their products, or build custom AI solutions tailored to their specific industry and data.",
  painPointsHeading: "Common Pain Points AI Automation Solves",
  painPoints: [
    "Hours wasted on repetitive manual tasks that could be fully automated.",
    "No AI integration in products or workflows, falling behind competitors.",
    "Slow data processing and report generation bottlenecking decisions.",
    "Customer support overloaded with routine queries that AI could handle.",
    "Disconnected tools requiring manual data transfer between systems.",
    "No intelligent recommendations to guide customers or internal teams.",
  ],
  solutionDescription:
    "We assess your workflow, identify the highest-value automation opportunities, and build systems using the right AI tools — from LLM APIs to custom-trained models. Every solution is measured by the time saved and business value delivered.",
  featuresHeading: "What's Included in Our AI Development Services",
  features: [
    { title: "Workflow Automation", description: "End-to-end automation of repetitive business processes using AI and integration platforms." },
    { title: "LLM Integration", description: "GPT-4, Claude, Gemini, and other LLM integrations for content generation, classification, and analysis." },
    { title: "AI Chatbots & Assistants", description: "Intelligent customer-facing or internal assistants with context-aware responses and escalation logic." },
    { title: "Data Pipeline Automation", description: "Automated ingestion, transformation, and reporting pipelines that eliminate manual data work." },
    { title: "Smart Recommendations", description: "AI-driven recommendation engines for products, content, or internal decision support." },
    { title: "Custom AI Feature Development", description: "Purpose-built AI features integrated directly into your existing web or mobile product." },
  ],
  processHeading: "Step-by-Step AI Development Workflow",
  processSteps: [
    { title: "Workflow Discovery & ROI Mapping", description: "We audit your current processes and identify where AI delivers the highest time and cost savings." },
    { title: "Solution Architecture", description: "We design the AI system: model selection, data flow, integration points, and fallback logic." },
    { title: "Prototype & Validation", description: "A working prototype tested against real business data before full development commitment." },
    { title: "Full Development & Integration", description: "End-to-end build: AI models, APIs, automation pipelines, and product integrations." },
    { title: "Testing & Accuracy Validation", description: "Output quality testing, edge case handling, and performance benchmarking." },
    { title: "Deployment & Monitoring", description: "Live deployment with logging, drift monitoring, and continuous improvement loops." },
  ],
  benefits: [
    { icon: Clock3, title: "Hours Saved Weekly", text: "Automated tasks eliminate manual work, freeing your team for high-value activity." },
    { icon: Zap, title: "Faster Decision Making", text: "AI surfaces insights and recommendations instantly instead of after manual analysis." },
    { icon: TrendingUp, title: "Scalable Operations", text: "Handle more volume without proportional headcount growth." },
    { icon: BarChart3, title: "Measurable ROI", text: "Every automation is tied to quantifiable time or cost savings from day one." },
  ],
  technologies: ["OpenAI GPT-4", "Claude API", "Gemini", "LangChain", "Python", "n8n", "Zapier", "Make", "FastAPI", "Supabase", "Pinecone", "Qdrant", "Node.js"],
  caseStudies: [
    { name: "Agency Content Pipeline", niche: "Digital Marketing Agency", summary: "Built an AI-powered content generation and review pipeline that reduced content production time by 70% while maintaining brand voice consistency." },
    { name: "Customer Support Automation", niche: "E-commerce Platform", summary: "Deployed an AI assistant that resolved 60% of routine support tickets automatically, freeing the human team for complex escalations." },
  ],
  testimonials: [
    { quote: "The AI workflow they built saves our team roughly 15 hours per week. It paid for itself in the first month.", author: "Operations Manager, Marketing Agency" },
    { quote: "Their LLM integration added a genuinely useful AI feature to our product without slowing down our roadmap.", author: "CTO, SaaS Startup" },
    { quote: "The automation they built handles our data processing end-to-end. We haven't manually touched a spreadsheet since.", author: "Head of Analytics, E-commerce Brand" },
  ],
  faqs: [
    { question: "Do I need a large dataset to use AI?", answer: "Not always. Many AI features can be built using pre-trained models with minimal custom data. We assess this during discovery." },
    { question: "Which AI models do you work with?", answer: "We work with OpenAI, Anthropic Claude, Google Gemini, and open-source models depending on your accuracy, cost, and privacy requirements." },
    { question: "Is the AI solution secure?", answer: "Yes. We follow data minimization principles, use encrypted API communication, and can build fully on-premise solutions for sensitive data." },
    { question: "How long does an AI automation project take?", answer: "Simple automations: 2–4 weeks. Custom AI features or complex pipelines: 6–14 weeks depending on scope." },
    { question: "Can AI integrate with our existing tools?", answer: "Yes. We integrate AI into Slack, CRMs, ERPs, custom APIs, and most platforms with a webhook or API interface." },
  ],
  ctaTitle: "Ready to Put AI to Work in Your Business?",
  ctaDescription: "Let's identify your highest-value automation opportunities and build AI systems that deliver real, measurable results.",
}

export const seoServiceData: ServicePageData = {
  badge: "SEO Services",
  heroTitle: "SEO Services That Build Organic Visibility and",
  heroTitleHighlight: "Deliver Compounding, Long-Term Traffic Growth",
  heroDescription:
    "We improve your search rankings through technical SEO, strategic keyword targeting, content optimization, and authority building — turning Google into a reliable, predictable source of qualified leads.",
  aboutIcon: Search,
  aboutDescription:
    "Our SEO Services combine technical excellence with content strategy and off-page authority building to create a complete SEO program that grows your organic presence sustainably.",
  whoForDescription:
    "Businesses that rely on organic search for leads and customers but are not ranking for the keywords their buyers are using, or who want to reduce dependency on expensive paid traffic.",
  painPointsHeading: "Common Pain Points SEO Services Solve",
  painPoints: [
    "Little to no organic traffic despite having a professionally designed website.",
    "Ranking on page 2–3 for target keywords but getting almost no clicks.",
    "Technical SEO issues like slow load times, broken links, and crawl errors.",
    "Content that is not optimized for search intent, failing to rank.",
    "No link authority — competitors outrank you because they have more backlinks.",
    "No visibility into what is working or how to improve rankings over time.",
  ],
  solutionDescription:
    "We run a complete SEO audit first, then execute across three pillars: technical health, on-page optimization, and authority building. Every action is prioritized by expected search impact and mapped to business goals.",
  featuresHeading: "What's Included in Our SEO Services",
  features: [
    { title: "Technical SEO Audit & Fix", description: "Core Web Vitals, crawlability, indexation, site speed, schema markup, and mobile-friendliness." },
    { title: "Keyword Strategy", description: "Intent-based keyword research mapped to your buyer journey — top, middle, and bottom of funnel." },
    { title: "On-Page Optimization", description: "Title tags, meta descriptions, headers, content structure, and internal linking optimized for target keywords." },
    { title: "Content Optimization", description: "Existing content audited and improved for relevance, depth, E-E-A-T signals, and keyword alignment." },
    { title: "Link Building", description: "White-hat authority building through relevant, high-quality backlink acquisition strategies." },
    { title: "Rank Tracking & Reporting", description: "Monthly ranking reports with traffic analysis, keyword movement, and clear next-step recommendations." },
  ],
  processHeading: "Step-by-Step SEO Delivery Workflow",
  processSteps: [
    { title: "Full SEO Audit", description: "Technical, on-page, and off-page audit to identify every issue and opportunity in your current SEO." },
    { title: "Keyword & Competitor Research", description: "Target keyword selection based on search volume, intent, competition, and business value." },
    { title: "Technical Fixes", description: "Resolving crawl errors, speed issues, schema gaps, and indexation problems first." },
    { title: "On-Page Optimization", description: "Updating pages with optimized titles, headers, content, and internal links." },
    { title: "Content & Authority Building", description: "New content creation and backlink acquisition campaigns based on keyword gaps and authority targets." },
    { title: "Monthly Review & Reporting", description: "Rank tracking, traffic analysis, and strategy refinement based on real performance data." },
  ],
  benefits: [
    { icon: TrendingUp, title: "Compounding Traffic Growth", text: "SEO builds over time — rankings earned today generate traffic for years." },
    { icon: Search, title: "Lower Cost Per Lead", text: "Organic leads cost significantly less than paid traffic at scale." },
    { icon: BarChart3, title: "Full Visibility", text: "Monthly reports show exactly what moved, why, and what is next." },
    { icon: Clock3, title: "Long-Term Asset", text: "Unlike ads, SEO authority compounds and does not disappear when you stop spending." },
  ],
  technologies: ["Google Search Console", "Google Analytics 4", "Ahrefs", "Semrush", "Screaming Frog", "SurferSEO", "Google Tag Manager", "PageSpeed Insights", "Schema.org"],
  caseStudies: [
    { name: "B2B Services Company", niche: "Professional Services", summary: "Grew organic traffic by 3x in 6 months through technical SEO fixes, content optimization, and targeted keyword cluster strategy for high-intent service pages." },
    { name: "E-commerce Store", niche: "Consumer Products", summary: "Recovered from a Google algorithm update through content quality improvements and technical fixes, restoring rankings and increasing organic revenue 40% YoY." },
  ],
  testimonials: [
    { quote: "Our organic leads doubled within 4 months of starting the SEO program. The ROI is obvious.", author: "Marketing Manager, B2B Services Firm" },
    { quote: "They fixed technical issues we didn't even know existed and our rankings improved within weeks.", author: "E-commerce Owner" },
    { quote: "Finally an SEO agency that reports on actual business metrics, not just keyword rankings.", author: "Director of Growth, SaaS Company" },
  ],
  faqs: [
    { question: "How long before I see SEO results?", answer: "Initial improvements from technical fixes typically show in 4–8 weeks. Significant ranking and traffic growth typically takes 3–6 months." },
    { question: "Do you guarantee rankings?", answer: "No reputable SEO provider can guarantee specific rankings — Google controls that. We guarantee a thorough, professional process and transparent reporting." },
    { question: "Do you write content as part of SEO?", answer: "Yes. Content creation and optimization is included. We produce or rewrite content aligned to search intent and your target keywords." },
    { question: "Is link building included?", answer: "Yes. White-hat link building through outreach, content partnerships, and PR is part of our authority-building deliverable." },
    { question: "Can you work alongside our existing marketing team?", answer: "Absolutely. We work well as a specialist partner integrating with in-house teams and other agencies." },
  ],
  ctaTitle: "Ready to Turn Google Into Your Most Reliable Lead Source?",
  ctaDescription: "Let's build an SEO strategy that gets your business in front of the right buyers at the exact moment they are searching.",
}

export const ppcServiceData: ServicePageData = {
  badge: "PPC Services",
  heroTitle: "PPC Services That Maximize Return on Every",
  heroTitleHighlight: "Rupee and Dollar Spent on Paid Advertising",
  heroDescription:
    "We run high-intent, ROI-focused paid campaigns across Google and Meta that bring qualified traffic, lower your cost per acquisition, and generate measurable business results from day one.",
  aboutIcon: Megaphone,
  aboutDescription:
    "Our PPC Services combine strategic campaign architecture, continuous bid optimization, ad creative testing, and conversion-focused landing pages to make your paid budget work harder than it ever has.",
  whoForDescription:
    "Businesses that want immediate qualified traffic, are running ads without clear ROI visibility, or have wasted budget on campaigns that generated clicks but not conversions.",
  painPointsHeading: "Common Pain Points PPC Services Solve",
  painPoints: [
    "High spend with low conversion — traffic comes in but leads do not.",
    "Broad targeting wasting budget on unqualified audiences.",
    "No conversion tracking, making it impossible to measure real ROAS.",
    "Ad creative that is not tested, leading to audience fatigue and declining performance.",
    "Landing pages that do not match ad intent, killing conversion potential.",
    "Campaigns set and forgotten — no ongoing optimization or bid management.",
  ],
  solutionDescription:
    "We start with conversion tracking setup and audience strategy, then build campaigns with tight targeting, intent-matched creative, and optimized landing pages. Every week, we analyze performance and optimize toward your cost-per-acquisition target.",
  featuresHeading: "What's Included in Our PPC Services",
  features: [
    { title: "Google Search & Display Ads", description: "High-intent search campaigns and targeted display remarketing built around your buyer journey." },
    { title: "Meta Ads (Facebook & Instagram)", description: "Audience-first social campaigns with creative testing across awareness, consideration, and conversion objectives." },
    { title: "Conversion Tracking Setup", description: "Full GA4 + Google Tag Manager + Meta Pixel implementation so every conversion is attributed correctly." },
    { title: "Landing Page Optimization", description: "CRO recommendations and design improvements to match landing page content with ad intent." },
    { title: "A/B Ad Creative Testing", description: "Systematic headline, creative, and CTA testing to continuously improve click-through and conversion rates." },
    { title: "Weekly Optimization & Reporting", description: "Bid adjustments, negative keyword management, audience refinement, and clear performance reports." },
  ],
  processHeading: "Step-by-Step PPC Campaign Workflow",
  processSteps: [
    { title: "Audit & Strategy", description: "We audit existing campaigns (or start fresh) and define targeting, budget allocation, and CPA targets." },
    { title: "Tracking Setup", description: "Full conversion tracking implementation before any budget is spent." },
    { title: "Campaign Build", description: "Keyword research, audience setup, ad copy creation, and campaign structure built for quality score and relevance." },
    { title: "Launch & Initial Optimization", description: "Campaigns go live with aggressive monitoring in the first 2 weeks." },
    { title: "Ongoing Testing & Refinement", description: "Weekly bid adjustments, creative testing, and audience expansion or pruning based on performance data." },
    { title: "Monthly Reporting & Strategy Review", description: "Full performance report with ROAS, CPA, and next-month strategy adjustments." },
  ],
  benefits: [
    { icon: Zap, title: "Immediate Traffic", text: "PPC delivers qualified visitors from day one — no waiting for organic growth." },
    { icon: BarChart3, title: "Full ROAS Visibility", text: "Every rupee tracked from ad click to conversion with clear attribution." },
    { icon: TrendingUp, title: "Lower CPA Over Time", text: "Continuous optimization drives cost per acquisition down month over month." },
    { icon: Search, title: "Competitive Intelligence", text: "Campaign data reveals what messaging and offers resonate best with your market." },
  ],
  technologies: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Google Tag Manager", "Meta Pixel", "Semrush", "Unbounce", "Hotjar"],
  caseStudies: [
    { name: "B2B Lead Generation", niche: "Professional Services", summary: "Restructured Google Search campaigns with tighter match types and negative keywords, reducing cost per lead by 45% while maintaining lead volume." },
    { name: "D2C E-commerce", niche: "Consumer Products", summary: "Built a full-funnel Meta Ads strategy with awareness, retargeting, and catalog campaigns that achieved a 4.2x ROAS within 60 days." },
  ],
  testimonials: [
    { quote: "Our Google Ads were burning money before they restructured everything. CPA dropped by 40% in the first month.", author: "Founder, Professional Services Firm" },
    { quote: "They set up proper tracking from day one and now we finally know which campaigns are actually driving revenue.", author: "E-commerce Director" },
    { quote: "Consistent, transparent reporting and real results. This is what PPC should look like.", author: "Marketing Head, B2B Company" },
  ],
  faqs: [
    { question: "What budget do I need to start PPC?", answer: "For meaningful data and optimization cycles, we recommend a minimum monthly ad spend of ₹30,000–₹50,000 (or $500–$1,000) alongside our management fee." },
    { question: "How long before I see PPC results?", answer: "You will see traffic from day one. Optimization cycles that improve CPA typically take 4–8 weeks of data collection." },
    { question: "Do you manage both Google and Meta Ads?", answer: "Yes. We offer combined or individual platform management depending on your strategy and budget." },
    { question: "Do you create ad creatives?", answer: "Yes. Ad copy, headlines, and creative briefs are included. High-production video or photography requires separate scope." },
    { question: "What does PPC management include monthly?", answer: "Bid management, negative keyword maintenance, creative testing, audience optimization, and a full performance report every month." },
  ],
  ctaTitle: "Ready to Make Every Advertising Rupee Count?",
  ctaDescription: "Let's build a PPC strategy that targets the right buyers, converts efficiently, and gives you complete visibility into your ad ROI.",
}

export const socialMediaServiceData: ServicePageData = {
  badge: "Social Media Marketing Services",
  heroTitle: "Social Media Marketing Services That Build Brand Authority and",
  heroTitleHighlight: "Turn Followers Into Paying Customers",
  heroDescription:
    "We create and execute strategic social media programs that grow your brand presence, build community trust, and generate real business results through consistent, platform-native content.",
  aboutIcon: Megaphone,
  aboutDescription:
    "Our Social Media Marketing Services cover strategy, content creation, scheduling, community management, and paid amplification — managed as a complete program aligned to your business and revenue goals.",
  whoForDescription:
    "Businesses that need a consistent, professional social media presence but lack the in-house capacity, strategy, or content production capability to do it effectively.",
  painPointsHeading: "Common Pain Points in Social Media Marketing",
  painPoints: [
    "Inconsistent posting with no clear strategy or content calendar.",
    "Content that gets no engagement because it is generic or not platform-native.",
    "No clear connection between social media activity and business results.",
    "Brand voice and visual identity inconsistent across platforms.",
    "No community management — comments and DMs going unanswered.",
    "Spending time on social media without knowing if it is working.",
  ],
  solutionDescription:
    "We build a strategy-first social media program: platform selection, content pillars, production workflows, and performance tracking — all aligned to your business goals, not vanity metrics.",
  featuresHeading: "What's Included in Our Social Media Marketing Services",
  features: [
    { title: "Platform Strategy & Audit", description: "Platform selection and content strategy aligned to where your audience actually spends time." },
    { title: "Content Calendar & Planning", description: "Monthly content calendars with post types, topics, formats, and publish schedule." },
    { title: "Content Creation", description: "Platform-native graphic, carousel, and video content creation aligned with your brand identity." },
    { title: "Community Management", description: "Daily comment monitoring, DM response, and audience engagement to build loyalty." },
    { title: "Paid Social Amplification", description: "Boosting high-performing organic content and running targeted awareness or conversion campaigns." },
    { title: "Performance Analytics", description: "Monthly reporting on reach, engagement, follower growth, and link clicks with strategy recommendations." },
  ],
  processHeading: "Step-by-Step Social Media Marketing Workflow",
  processSteps: [
    { title: "Audit & Strategy Development", description: "We audit your current presence and develop a platform-specific content strategy." },
    { title: "Brand Voice & Content System", description: "We define your social brand voice, visual templates, and content pillar framework." },
    { title: "Month 1 Content Build", description: "Full first month of content created, reviewed, and scheduled before going live." },
    { title: "Publishing & Community Management", description: "Daily publishing and active community engagement across all managed platforms." },
    { title: "Paid Amplification", description: "Identifying best-performing content for paid boosting and running targeted audience campaigns." },
    { title: "Monthly Review & Reporting", description: "Performance analysis, content performance review, and strategy adjustments for the next month." },
  ],
  benefits: [
    { icon: TrendingUp, title: "Growing Brand Awareness", text: "Consistent, quality content builds brand recognition and authority over time." },
    { icon: BarChart3, title: "Measurable Engagement", text: "Clear metrics show exactly how your audience is growing and engaging." },
    { icon: Zap, title: "Consistent Content Output", text: "Never miss a post or struggle for content ideas again." },
    { icon: Search, title: "Audience Insights", text: "Social analytics reveal what your market cares about and responds to." },
  ],
  technologies: ["Meta Business Suite", "Instagram", "LinkedIn", "YouTube", "Canva Pro", "Later", "Buffer", "Hootsuite", "Meta Ads Manager", "CapCut"],
  caseStudies: [
    { name: "Agency Brand Growth", niche: "Digital Services Agency", summary: "Built a LinkedIn and Instagram content program from scratch that grew followers 5x in 3 months and generated 20+ inbound inquiries directly from social." },
    { name: "D2C Product Brand", niche: "Consumer Lifestyle", summary: "Managed a content-heavy Instagram and YouTube presence with consistent weekly content, growing engagement rate from 1.2% to 4.8% over 4 months." },
  ],
  testimonials: [
    { quote: "Our LinkedIn presence went from zero to generating real inbound leads. Social finally works for us.", author: "CEO, B2B Services Company" },
    { quote: "Consistent content, great creative quality, and they actually understand our brand voice.", author: "Marketing Manager, D2C Brand" },
    { quote: "The strategy shift they made doubled our engagement rate. We used to post randomly — now there is a real system.", author: "Founder, Consumer Brand" },
  ],
  faqs: [
    { question: "Which platforms do you manage?", answer: "Instagram, LinkedIn, Facebook, YouTube, and X (Twitter). We recommend platforms based on your audience and goals." },
    { question: "How many posts per month are included?", answer: "Typically 12–20 posts per platform per month depending on the package. Custom volume can be scoped." },
    { question: "Do you create the content or do we provide it?", answer: "We create all content — graphics, captions, and video edits. You provide raw assets (photos, videos) when available, or we work with brand assets." },
    { question: "Can you handle multiple platforms?", answer: "Yes. Multi-platform management is our standard offering with adapted content for each platform's format." },
    { question: "Is paid advertising included?", answer: "Basic paid amplification is included. Dedicated paid social campaigns are scoped separately." },
  ],
  ctaTitle: "Ready for a Social Media Presence That Builds Your Brand and Drives Business?",
  ctaDescription: "Let's build a social media program that creates real brand authority and converts your audience into customers.",
}

export const maintenanceServiceData: ServicePageData = {
  badge: "Website Maintenance Services",
  heroTitle: "Website Maintenance Services That Keep Your Site",
  heroTitleHighlight: "Secure, Fast, and Performing at Its Best — Always",
  heroDescription:
    "We proactively monitor, update, and maintain your website so you never have to worry about security vulnerabilities, broken features, or performance degradation affecting your business.",
  aboutIcon: Settings,
  aboutDescription:
    "Our Website Maintenance Services include regular updates, security patching, uptime monitoring, performance optimization, backup management, and bug resolution — covering everything that keeps a website reliable.",
  whoForDescription:
    "Business owners and marketing teams who need their website to run reliably without dedicating internal resources to monitoring, updates, and technical maintenance.",
  painPointsHeading: "Common Pain Points Website Maintenance Solves",
  painPoints: [
    "Security vulnerabilities from outdated plugins, CMS versions, or unpatched code.",
    "Website downtime discovered by customers before the business team.",
    "Slow page speeds degrading over time due to accumulated bloat.",
    "No backup system — any data loss or hack means full rebuild.",
    "Broken forms, links, or features noticed only after customer complaints.",
    "Development team spending time on maintenance instead of new features.",
  ],
  solutionDescription:
    "We run proactive maintenance cycles: scheduled updates, security scans, performance checks, and uptime monitoring — so issues are caught and resolved before they ever affect your customers.",
  featuresHeading: "What's Included in Our Website Maintenance Services",
  features: [
    { title: "Security Updates & Patching", description: "Regular CMS, plugin, and dependency updates with security scanning to close vulnerabilities." },
    { title: "Uptime Monitoring", description: "24/7 automated uptime monitoring with immediate alerts and resolution for outages." },
    { title: "Backup Management", description: "Scheduled automated backups with tested restore procedures and off-site storage." },
    { title: "Performance Monitoring", description: "Monthly Core Web Vitals checks and proactive page speed optimization." },
    { title: "Bug Fixes & Content Updates", description: "Included development hours each month for bug resolution and minor content changes." },
    { title: "Monthly Health Report", description: "Full report covering uptime, security status, performance scores, and actions taken." },
  ],
  processHeading: "Website Maintenance Workflow",
  processSteps: [
    { title: "Onboarding Audit", description: "Full audit of your current website's security, performance, backup status, and known issues." },
    { title: "Baseline Setup", description: "Monitoring configuration, backup system activation, and security scanning setup." },
    { title: "Regular Update Cycle", description: "Scheduled monthly updates to all dependencies, CMS, and security patches." },
    { title: "Performance Reviews", description: "Quarterly deep performance audits with Core Web Vitals checks and optimization." },
    { title: "Bug Resolution", description: "Issues flagged through monitoring or reported by your team resolved within agreed SLA." },
    { title: "Monthly Reporting", description: "Detailed report shared monthly with health status, actions taken, and upcoming work." },
  ],
  benefits: [
    { icon: ShieldCheck, title: "Always Secure", text: "Proactive patching means vulnerabilities are closed before they can be exploited." },
    { icon: Clock3, title: "Maximum Uptime", text: "Monitoring catches downtime immediately, minimizing customer-facing impact." },
    { icon: Zap, title: "Sustained Performance", text: "Regular optimization keeps your site fast as it grows and evolves." },
    { icon: BarChart3, title: "Full Visibility", text: "Monthly reports keep you informed of your website's health without technical jargon." },
  ],
  technologies: ["Cloudflare", "Vercel", "AWS", "Sentry", "UptimeRobot", "GitHub Actions", "Lighthouse", "WP Engine", "UpdraftPlus", "Wordfence"],
  caseStudies: [
    { name: "E-commerce Client", niche: "D2C Online Store", summary: "Caught and resolved a SQL injection vulnerability during a routine security scan before it could be exploited. Performance optimization improved LCP by 35%." },
    { name: "Corporate Website", niche: "B2B Professional Services", summary: "Maintained 99.9% uptime over 12 months, handled 3 major dependency updates without downtime, and resolved 15 bugs that were affecting lead form submissions." },
  ],
  testimonials: [
    { quote: "We sleep better knowing they are watching our website. Three issues caught and fixed before we even knew about them.", author: "Managing Director, Professional Services Firm" },
    { quote: "Maintenance used to eat our developer's time. Now that is handled and she focuses on new features.", author: "CTO, SaaS Company" },
    { quote: "The monthly report is clear, honest, and tells us exactly what was done and why.", author: "Marketing Head, E-commerce Brand" },
  ],
  faqs: [
    { question: "What does a monthly maintenance package include?", answer: "Security updates, uptime monitoring, backups, performance checks, bug fix hours, and a monthly health report." },
    { question: "How quickly are bugs fixed?", answer: "Critical issues within 4 hours, standard bugs within 48 hours, minor issues within the next maintenance cycle." },
    { question: "Do you work with any CMS or tech stack?", answer: "Yes. We maintain WordPress, Next.js, React, and custom-built websites regardless of the underlying technology." },
    { question: "Can I add more development hours if needed?", answer: "Yes. Additional development time can be added outside the maintenance package at a pre-agreed rate." },
    { question: "How is backup restoration handled?", answer: "We test restores quarterly and can restore a full backup within hours of a critical failure or security incident." },
  ],
  ctaTitle: "Ready to Stop Worrying About Your Website and Focus on Your Business?",
  ctaDescription: "Let's set up a maintenance program that keeps your website secure, fast, and reliable — without you lifting a finger.",
}

export const softwareServiceData: ServicePageData = {
  badge: "Software Development Services",
  heroTitle: "Software Development Services That Build the Systems",
  heroTitleHighlight: "Your Business Needs to Operate, Scale, and Compete",
  heroDescription:
    "We design and develop custom software solutions — from internal tools and SaaS platforms to business automation systems — tailored precisely to your processes and growth requirements.",
  aboutIcon: Code2,
  aboutDescription:
    "Our Software Development Services cover the full lifecycle: requirements analysis, system architecture, development, testing, deployment, and ongoing support — delivered by engineers who prioritize business outcomes over technical complexity.",
  whoForDescription:
    "Businesses with complex operational workflows that off-the-shelf software cannot solve, or companies building proprietary software products as their core business.",
  painPointsHeading: "Common Pain Points Custom Software Solves",
  painPoints: [
    "Off-the-shelf tools that almost fit your workflow but require constant workarounds.",
    "Manual operations that could be fully automated with the right system.",
    "Data living in disconnected silos with no unified operational view.",
    "Legacy systems that are expensive to maintain and impossible to integrate.",
    "Growing business volume that your current tools cannot handle.",
    "No way to build the product-specific features your competitive position requires.",
  ],
  solutionDescription:
    "We start with a deep requirements phase to understand your exact workflow, then architect a solution that is maintainable, scalable, and precisely fitted to your business logic — not forced into a generic framework.",
  featuresHeading: "What's Included in Our Software Development Services",
  features: [
    { title: "Requirements Engineering", description: "Deep discovery to document functional requirements, edge cases, and integration needs before a line of code is written." },
    { title: "System Architecture Design", description: "Scalable, maintainable architecture decisions documented before development begins." },
    { title: "Full-Stack Development", description: "Frontend, backend, database, and API development delivered as a cohesive, well-structured system." },
    { title: "Third-Party Integrations", description: "CRM, ERP, payment, communication, and data system integrations built with reliability." },
    { title: "Testing & Quality Assurance", description: "Unit, integration, and end-to-end testing to ensure software works correctly under real conditions." },
    { title: "DevOps & Deployment", description: "CI/CD pipelines, containerization, and cloud deployment with monitoring and rollback capability." },
  ],
  processHeading: "Step-by-Step Software Development Workflow",
  processSteps: [
    { title: "Discovery & Requirements", description: "Stakeholder interviews, process mapping, and requirement documentation." },
    { title: "Architecture & Technical Design", description: "System design, database schema, API contracts, and technology stack selection." },
    { title: "Iterative Development", description: "Agile sprint cycles with working software demonstrated at the end of each sprint." },
    { title: "Testing & QA", description: "Automated and manual testing across functional, performance, and security dimensions." },
    { title: "Deployment & Handover", description: "Production deployment with documentation, monitoring setup, and team knowledge transfer." },
    { title: "Ongoing Support & Iteration", description: "Post-launch support, bug resolution, and feature iteration based on real usage." },
  ],
  benefits: [
    { icon: Zap, title: "Operational Efficiency", text: "Custom software eliminates the workarounds and manual steps that slow your team down." },
    { icon: TrendingUp, title: "Scalable by Design", text: "Architecture built for your growth trajectory, not just today's needs." },
    { icon: BarChart3, title: "Competitive Advantage", text: "Proprietary systems give you capabilities your competitors cannot easily replicate." },
    { icon: Clock3, title: "Long-term Maintainability", text: "Clean code and documentation reduce future maintenance cost significantly." },
  ],
  technologies: ["Node.js", "Python", "TypeScript", "React", "Next.js", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform"],
  caseStudies: [
    { name: "Operations Management Platform", niche: "Field Service Company", summary: "Built a custom job scheduling, technician tracking, and invoice generation platform that replaced 4 separate tools and saved 20 hours of admin work per week." },
    { name: "SaaS Product MVP", niche: "B2B Startup", summary: "Designed and developed a full SaaS platform from scratch — multi-tenant architecture, subscription billing, user management, and API — launched in 10 weeks." },
  ],
  testimonials: [
    { quote: "The software they built does exactly what our business needs. No compromises, no workarounds.", author: "CEO, Field Service Company" },
    { quote: "Our SaaS MVP was delivered on budget and on schedule. The architecture they chose has scaled without issues.", author: "Founder, B2B SaaS Startup" },
    { quote: "Finally a development team that asks the right questions before starting to code.", author: "COO, Operations-Heavy Business" },
  ],
  faqs: [
    { question: "How do you handle complex or unclear requirements?", answer: "We run a paid discovery sprint first to clarify requirements, document edge cases, and de-risk the full development phase." },
    { question: "Do you build MVPs or full production systems?", answer: "Both. We scope MVPs for validation and full-scale systems for established businesses, with clear architectural continuity between the two." },
    { question: "What tech stack do you use?", answer: "We are technology-agnostic and recommend the best stack for your requirements. Our primary expertise is Node.js, Python, TypeScript, React, and PostgreSQL." },
    { question: "How long does custom software development take?", answer: "MVPs: 6–12 weeks. Full production systems: 3–9 months depending on scope and complexity." },
    { question: "Do you provide source code and documentation?", answer: "Yes. You own all source code, and we deliver comprehensive technical documentation and handover materials." },
  ],
  ctaTitle: "Ready to Build Software That Actually Fits How Your Business Works?",
  ctaDescription: "Let's design and build a custom software solution that eliminates your operational bottlenecks and gives you a real competitive edge.",
}

export const apiServiceData: ServicePageData = {
  badge: "API Integration Services",
  heroTitle: "API Integration Services That Connect Your Tools and",
  heroTitleHighlight: "Eliminate the Manual Work Between Disconnected Systems",
  heroDescription:
    "We design and implement reliable API integrations that make your platforms, CRMs, payment systems, and third-party tools work together seamlessly — turning data silos into unified business workflows.",
  aboutIcon: Plug,
  aboutDescription:
    "Our API Integration Services cover discovery, design, implementation, and monitoring of integrations between any systems that expose an API — reducing manual data transfer and enabling automated workflows.",
  whoForDescription:
    "Businesses whose operations depend on multiple software tools that are not talking to each other, causing manual data entry, errors, and process bottlenecks.",
  painPointsHeading: "Common Pain Points API Integration Solves",
  painPoints: [
    "Teams manually copying data between systems for hours every week.",
    "CRM, accounting, and operations tools not sharing data in real time.",
    "Payment systems not syncing with inventory or order management.",
    "Customer data scattered across multiple tools with no single source of truth.",
    "New software investments failing to deliver value because they cannot integrate.",
    "Webhook failures or API mismatches causing silent data corruption.",
  ],
  solutionDescription:
    "We map your integration landscape, design reliable data flows, and build integrations with proper error handling, retry logic, and monitoring — so your systems stay in sync and your team stops doing manual data work.",
  featuresHeading: "What's Included in Our API Integration Services",
  features: [
    { title: "Integration Architecture Design", description: "Mapping data flows, transformation requirements, and sync frequency before any code is written." },
    { title: "REST & GraphQL API Integration", description: "Connecting APIs across platforms using industry-standard protocols with authentication and rate limiting handled correctly." },
    { title: "Webhook Setup & Management", description: "Real-time event-driven integrations with proper validation, error handling, and retry logic." },
    { title: "CRM & ERP Connectivity", description: "Salesforce, HubSpot, Zoho, SAP, and other enterprise tool integrations." },
    { title: "Payment & Commerce Integrations", description: "Stripe, Razorpay, PayPal, Shopify, WooCommerce, and marketplace API connections." },
    { title: "Monitoring & Alerting", description: "Integration health monitoring with alerts for failures, latency spikes, and data inconsistencies." },
  ],
  processHeading: "Step-by-Step API Integration Workflow",
  processSteps: [
    { title: "Integration Discovery", description: "We map all systems, their APIs, and the data flows required between them." },
    { title: "API Audit & Documentation Review", description: "We review API documentation, rate limits, authentication methods, and known limitations." },
    { title: "Integration Design", description: "Data mapping, transformation logic, error handling, and sync frequency defined before development." },
    { title: "Development & Testing", description: "Integration built in a sandbox environment with comprehensive test coverage." },
    { title: "Production Deployment", description: "Staged rollout with monitoring and rollback capability." },
    { title: "Monitoring & Maintenance", description: "Ongoing integration health monitoring and updates when APIs change." },
  ],
  benefits: [
    { icon: Clock3, title: "Hours Saved Weekly", text: "Automated data flows eliminate manual transfer and re-entry work." },
    { icon: Zap, title: "Real-time Data Sync", text: "Systems stay in sync without delays or manual intervention." },
    { icon: BarChart3, title: "Single Source of Truth", text: "Unified data across tools means everyone works from the same accurate information." },
    { icon: TrendingUp, title: "Scalable Workflows", text: "Automated integrations handle volume growth without additional manual effort." },
  ],
  technologies: ["REST APIs", "GraphQL", "Webhooks", "OAuth 2.0", "Node.js", "Python", "Postman", "HubSpot API", "Salesforce API", "Stripe API", "Razorpay", "Zapier", "n8n"],
  caseStudies: [
    { name: "CRM-ERP Integration", niche: "Manufacturing Company", summary: "Integrated HubSpot CRM with a legacy ERP system, syncing customer records, order status, and invoice data in real time — eliminating 10 hours of weekly manual data entry." },
    { name: "Payment & Inventory Sync", niche: "E-commerce Business", summary: "Connected Razorpay, Shopify, and a custom inventory system with real-time webhooks, reducing order processing errors by 90%." },
  ],
  testimonials: [
    { quote: "The CRM integration they built eliminated hours of manual work and the data is always accurate now.", author: "Operations Manager, Manufacturing Company" },
    { quote: "They handled a complex three-way integration that two previous vendors failed to deliver. Clean, reliable, and well-documented.", author: "CTO, E-commerce Platform" },
    { quote: "The webhook monitoring they set up catches failures before they become customer-facing problems.", author: "Head of Engineering, SaaS Product" },
  ],
  faqs: [
    { question: "Can you integrate any API?", answer: "Any system with a documented REST, GraphQL, or webhook interface. We also work with SOAP and legacy protocols where needed." },
    { question: "What if the API does not have the data we need?", answer: "We explore alternatives: custom extraction, screen scraping where permitted, or database-level integration if appropriate." },
    { question: "How do you handle API authentication?", answer: "We support OAuth 2.0, API key, JWT, and basic auth. Security is handled correctly at every integration point." },
    { question: "What happens when an API changes or breaks?", answer: "Our monitoring detects failures immediately and we have an SLA for integration maintenance and updates." },
    { question: "Can you work with APIs that have strict rate limits?", answer: "Yes. We design queue-based integration architectures that respect rate limits without data loss." },
  ],
  ctaTitle: "Ready to Make All Your Tools Work Together Seamlessly?",
  ctaDescription: "Let's map your integration landscape and build reliable connections that keep your data flowing and your team out of spreadsheets.",
}

export const cloudServiceData: ServicePageData = {
  badge: "Cloud Solutions",
  heroTitle: "Cloud Solutions That Give Your Business Scalable,",
  heroTitleHighlight: "Resilient, and Cost-Efficient Infrastructure",
  heroDescription:
    "We design, deploy, and manage cloud infrastructure that scales with your growth, keeps your applications reliable, and optimizes your hosting costs — without requiring deep DevOps expertise in-house.",
  aboutIcon: Cloud,
  aboutDescription:
    "Our Cloud Solutions cover architecture design, cloud migration, infrastructure-as-code, CI/CD pipeline setup, CDN configuration, and ongoing infrastructure management for businesses of all sizes.",
  whoForDescription:
    "Businesses experiencing infrastructure scaling issues, high hosting costs, frequent downtime, or teams ready to adopt modern cloud-native deployment practices for the first time.",
  painPointsHeading: "Common Pain Points Cloud Solutions Address",
  painPoints: [
    "Applications that go down or slow to a crawl during traffic spikes.",
    "Hosting costs growing faster than revenue as the business scales.",
    "Manual deployment processes that are slow, error-prone, and stressful.",
    "No disaster recovery plan — a single server failure could cause data loss.",
    "Development environments that do not match production, causing deployment surprises.",
    "Security misconfigurations in cloud accounts creating undetected vulnerabilities.",
  ],
  solutionDescription:
    "We assess your current infrastructure, design a cloud-native architecture appropriate for your scale, and implement it with infrastructure-as-code, automated deployments, and proactive monitoring — delivering reliability without operational complexity.",
  featuresHeading: "What's Included in Our Cloud Solutions",
  features: [
    { title: "Cloud Architecture Design", description: "Right-sized, cost-optimized infrastructure architecture designed for your current and future scale." },
    { title: "Cloud Migration", description: "Zero-downtime migration from on-premise or legacy hosting to modern cloud environments." },
    { title: "Infrastructure as Code", description: "Terraform or CloudFormation-based infrastructure management for reproducible, version-controlled environments." },
    { title: "CI/CD Pipeline Setup", description: "Automated build, test, and deployment pipelines that eliminate manual deployment steps." },
    { title: "CDN & Edge Optimization", description: "Cloudflare, AWS CloudFront, or Vercel Edge configuration for global performance." },
    { title: "Security Hardening & Compliance", description: "IAM policy review, network security groups, secrets management, and compliance posture improvement." },
  ],
  processHeading: "Step-by-Step Cloud Solutions Workflow",
  processSteps: [
    { title: "Infrastructure Audit", description: "Current environment assessment: architecture, costs, security posture, and reliability gaps." },
    { title: "Architecture Design", description: "Target state architecture with cost projections, redundancy design, and migration plan." },
    { title: "Infrastructure Provisioning", description: "Cloud environment setup using infrastructure-as-code with staging and production environments." },
    { title: "CI/CD Implementation", description: "Automated deployment pipelines with testing stages, rollback capability, and deployment notifications." },
    { title: "Migration & Cutover", description: "Staged migration with rollback plan and zero-downtime cutover execution." },
    { title: "Monitoring & Ongoing Management", description: "CloudWatch/Datadog monitoring, cost alerting, and ongoing infrastructure maintenance." },
  ],
  benefits: [
    { icon: TrendingUp, title: "Infinite Scalability", text: "Auto-scaling handles traffic spikes without manual intervention or downtime." },
    { icon: Zap, title: "Faster Deployments", text: "CI/CD pipelines cut deployment time from hours to minutes." },
    { icon: BarChart3, title: "Optimized Costs", text: "Right-sized infrastructure and reserved capacity reduces cloud spend 20–40%." },
    { icon: Clock3, title: "Maximum Reliability", text: "Multi-AZ deployments and automated recovery eliminate single points of failure." },
  ],
  technologies: ["AWS", "Google Cloud", "Vercel", "Cloudflare", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Datadog", "PagerDuty", "Nginx", "Let's Encrypt"],
  caseStudies: [
    { name: "SaaS Platform Migration", niche: "B2B Software", summary: "Migrated a monolithic application to a containerized microservices architecture on AWS, reducing infrastructure costs 35% and achieving 99.95% uptime in the first quarter." },
    { name: "E-commerce Scale Infrastructure", niche: "D2C Brand", summary: "Designed auto-scaling infrastructure for a high-traffic sale event, handling 10x normal traffic without performance degradation or additional manual intervention." },
  ],
  testimonials: [
    { quote: "Our infrastructure costs dropped 30% and we have not had a downtime incident since they redesigned our cloud setup.", author: "CTO, B2B SaaS Company" },
    { quote: "The CI/CD pipeline they built has transformed how our team deploys. What took 2 hours now takes 8 minutes.", author: "Engineering Lead, Product Startup" },
    { quote: "They handled a complex migration with zero downtime. It was seamless and exactly what we needed.", author: "COO, E-commerce Platform" },
  ],
  faqs: [
    { question: "Which cloud providers do you work with?", answer: "Primarily AWS and Google Cloud, plus Vercel and Cloudflare for edge and frontend deployments." },
    { question: "Can you reduce our current cloud bill?", answer: "Typically yes. We start with a cost audit and identify right-sizing, reserved instance, and architecture changes that reduce costs 20–40%." },
    { question: "Do you handle security in the cloud setup?", answer: "Yes. Security is built in from the start — IAM least-privilege policies, network isolation, secrets management, and vulnerability scanning." },
    { question: "What if we have no DevOps experience internally?", answer: "That is exactly who we serve. We build infrastructure-as-code and documentation that your team can understand and operate." },
    { question: "How long does a cloud migration take?", answer: "Simple migrations: 2–4 weeks. Complex multi-service architectures: 2–3 months with staged cutover." },
  ],
  ctaTitle: "Ready to Move to Cloud Infrastructure That Scales With Your Business?",
  ctaDescription: "Let's design a cloud architecture that is reliable, cost-efficient, and ready for whatever growth comes next.",
}

export const serviceRoutes: Record<string, string> = {
  "Website Development Services": "/services/website-development-services",
  "E-commerce Web Development Services": "/services/ecommerce-web-development-services",
  "Android App Development Services": "/services/android-app-development-services",
  "Web Design Services": "/services/web-design-services",
  "AI Automation and AI Development Services": "/services/ai-automation-development-services",
  "SEO Services": "/services/seo-services",
  "PPC Services": "/services/ppc-services",
  "Social Media Marketing Services": "/services/social-media-marketing-services",
  "Website Maintenance Services": "/services/website-maintenance-services",
  "Software Development Services": "/services/software-development-services",
  "API Integration Services": "/services/api-integration-services",
  "Cloud Solutions": "/services/cloud-solutions",
}
