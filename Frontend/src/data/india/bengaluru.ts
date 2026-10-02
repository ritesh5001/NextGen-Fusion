import type { InCity } from "./types"

export const bengaluru: InCity = {
  slug: "bengaluru",
  name: "Bengaluru",
  state: "Karnataka",
  stateCode: "KA",
  summary: "India's startup capital, where SaaS founders, D2C brands and tech-savvy buyers expect product-grade work.",
  areas: ["Koramangala", "HSR Layout", "Indiranagar", "Whitefield", "Electronic City", "Jayanagar", "JP Nagar", "Marathahalli", "Bellandur", "Sarjapur Road", "Hebbal", "Yelahanka", "MG Road", "Peenya"],
  nearby: ["chennai", "hyderabad", "coimbatore"],
  page: {
    metaTitle: "Web, App & Growth Agency for Bengaluru Startups and Businesses",
    metaDescription:
      "Product-grade websites, Next.js apps, Shopify stores, SEO and automation for Bengaluru startups, SaaS founders, D2C brands and local businesses.",
    h1: "Product-grade work for Bengaluru founders and businesses",
    intro: [
      "Bengaluru has more startups per square kilometre than anywhere else in India, and its customers are some of the most tech-savvy in the country. A slow site, a clunky checkout or a dashboard that breaks on mobile gets noticed, and gets compared with products built by well-funded teams down the road in Koramangala.",
      "We build to that standard: Next.js products and marketing sites, Shopify stores for D2C brands, SEO for SaaS, and automation for teams who'd rather not hire for admin. Our offices are in Lucknow and Mumbai, and we work with Bengaluru teams the way they already work, async, in writing, on shared boards.",
    ],
    sections: [
      {
        heading: "Async by default",
        body: [
          "Most Bengaluru teams already run on Slack, Notion and Linear-style boards, not daily calls. We fit into that: written scopes, async updates, shared task boards and a short demo when there's something to see.",
          "That's also why being outside Bengaluru rarely matters to our clients here. The work happens in the repository and the shared board, not in a meeting room.",
        ],
      },
      {
        heading: "Not just startups",
        body: [
          "Bengaluru also has thousands of non-tech businesses: clinics in Jayanagar, manufacturers in Peenya, restaurants in Indiranagar, schools and coaching centres everywhere. Their customers are just as demanding online, and they often get far less attention from agencies.",
        ],
      },
    ],
    industries: [
      { name: "SaaS and tech startups", need: "Founders need marketing sites that convert, product UI that feels polished and SEO that brings signups." },
      { name: "D2C brands", need: "Brands need fast Shopify stores, retention flows and a way to cut COD returns." },
      { name: "Clinics, schools and services", need: "Local businesses need Google Maps visibility, online booking and fast replies." },
      { name: "Manufacturing in Peenya and beyond", need: "Industrial units need credible B2B websites and systems that replace Excel." },
    ],
    problems: [
      {
        service: "seo",
        symptom: "Our SaaS gets traffic but few signups",
        cause: "Content targets broad topics, not the problems buyers search when they're ready to try a tool.",
        steps: [
          "Map searches by buying stage",
          "Build comparison, use-case and alternative pages",
          "Link content to signup with a clear trial offer",
        ],
      },
      {
        service: "nextjs-development",
        symptom: "Our marketing site and product feel like two different companies",
        cause: "They were built by different teams on different stacks.",
        steps: [
          "Share one design system across site and app",
          "Move the marketing site to Next.js alongside the product",
          "Keep pricing and features in sync from one source",
        ],
      },
      {
        service: "shopify-development",
        symptom: "Our D2C brand's repeat rate is low",
        cause: "No post-purchase journey; customers forget you after the first order.",
        steps: [
          "Set up post-purchase WhatsApp and email flows",
          "Collect reviews with photos",
          "Offer subscriptions or refill reminders",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Our small team spends hours on support and ops tickets",
        cause: "Repetitive questions and tasks are handled by people.",
        steps: [
          "Classify incoming tickets automatically",
          "Draft replies for common issues",
          "Automate routine ops tasks with review",
        ],
      },
      {
        service: "website-development",
        symptom: "Our clinic's website doesn't bring bookings",
        cause: "No online booking, slow pages and no reviews visible.",
        steps: [
          "Add online booking and WhatsApp",
          "Show doctors, timings and fees clearly",
          "Display Google reviews on the site",
        ],
      },
      {
        service: "google-ads",
        symptom: "Our Google Ads cost per signup keeps rising",
        cause: "Broad keywords compete with funded competitors on expensive terms.",
        steps: [
          "Focus on high-intent, specific keywords",
          "Build matching landing pages",
          "Track signups and activation, not clicks",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Bengaluru?",
        answer: "No. Our offices are in Lucknow and Mumbai. We work with Bengaluru teams async and over video, which is how most of them prefer to work anyway.",
      },
      {
        question: "Can you work with our in-house engineers?",
        answer: "Yes. We work in your repository, follow your conventions and go through your code review.",
      },
      {
        question: "Do you sign NDAs?",
        answer: "Yes, before you share anything confidential.",
      },
      {
        question: "Who owns the code?",
        answer: "Your company, from day one, in your own repository.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development Company in Bengaluru — For Startups & Local Businesses",
      metaDescription:
        "Website development in Bengaluru: fast marketing sites for startups and conversion-focused sites for clinics, schools and services, with a fixed written quote.",
      h1: "Website development for Bengaluru startups and the businesses next door",
      card: "Marketing sites for startups and booking-ready sites for local businesses.",
      intro: [
        "Bengaluru websites get judged hard. Startup visitors compare you with well-funded competitors' sites; local customers in Jayanagar or Whitefield compare your clinic or school with the slick one across the road. Either way, a slow or vague site loses.",
        "We build fast, specific websites for both: marketing sites that turn traffic into trials and demos, and local business sites that turn visits into bookings and WhatsApp messages.",
      ],
      sections: [
        {
          heading: "For startups",
          body: [
            "Clear positioning above the fold, pages per use case and persona, pricing that's easy to understand, and signup or demo booking that works on mobile. Built so your marketing team can launch pages without engineering time.",
          ],
        },
        {
          heading: "For local businesses",
          body: [
            "Online booking, doctor or teacher profiles, fees and timings, location and parking, and reviews where people decide. WhatsApp and call buttons on every screen.",
          ],
          links: [{ label: "What a website costs in India", href: "/website-development-cost-in-india/" }],
        },
      ],
      problems: [
        {
          symptom: "Visitors don't understand what our product does",
          cause: "The homepage leads with vision statements, not the problem solved.",
          steps: [
            "Rewrite the hero around the problem and outcome",
            "Add a product screenshot or short demo",
            "Make the trial or demo the obvious next step",
          ],
        },
        {
          symptom: "Our marketing team waits weeks for page changes",
          cause: "Every edit needs a developer.",
          steps: [
            "Move content into a CMS",
            "Build reusable page sections",
            "Let marketing launch pages themselves",
          ],
        },
      ],
      checklist: [
        "A visitor understands what you do in five seconds",
        "Your team can publish pages without a developer",
        "The site passes Core Web Vitals",
        "Signups or bookings are tracked as conversions",
      ],
      faqs: [
        {
          question: "How fast can you launch a startup site?",
          answer: "A focused marketing site often launches in three to four weeks once positioning and copy are agreed.",
        },
        {
          question: "Can you write the copy?",
          answer: "We draft from interviews with your team and can work with your existing writers.",
        },
      ],
      caseStudies: ["nextmentor", "thegrafftee"],
    },
    "web-design": {
      metaTitle: "Web & UI Design in Bengaluru — Product-Grade Design for Startups",
      metaDescription:
        "Web and UI design in Bengaluru for startups and SaaS: design systems, product UI and marketing pages that look and work like a well-funded product.",
      h1: "UI and web design for Bengaluru startups that need to look funded",
      card: "Design systems, product UI and marketing pages for startups.",
      intro: [
        "In Bengaluru, buyers, candidates and investors judge a startup by its product and site in seconds. A design that looks home-made signals risk, even when the technology is excellent.",
        "We design marketing sites and product interfaces that look and feel polished, built on a design system your engineers can implement quickly and keep consistent.",
      ],
      sections: [
        {
          heading: "A design system, not a mood board",
          body: [
            "Type scale, colours, spacing, components and states, documented in Figma and matched in code. New features look consistent without a designer reviewing every screen.",
          ],
        },
        {
          heading: "Product UI that reduces support",
          body: [
            "Clear onboarding, empty states that tell users what to do, readable tables and forms that explain errors. Good UI cuts support tickets as well as looking better.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Every new screen looks slightly different",
          cause: "There's no shared design system.",
          steps: [
            "Audit existing screens for inconsistencies",
            "Build a component library in Figma and code",
            "Refactor key screens onto it",
          ],
        },
        {
          symptom: "New users drop off during onboarding",
          cause: "Too many steps and no guidance.",
          steps: [
            "Map the onboarding flow",
            "Remove or defer non-essential steps",
            "Add helpful empty states and prompts",
          ],
        },
      ],
      checklist: [
        "You have a documented design system",
        "Components match between Figma and code",
        "Onboarding has been tested with real users",
        "Your UI meets accessibility contrast standards",
      ],
      faqs: [
        {
          question: "Do you work in Figma?",
          answer: "Yes, with files your team owns.",
        },
        {
          question: "Can you implement the design too?",
          answer: "Yes, in React or Next.js, or hand off to your engineers.",
        },
      ],
      caseStudies: ["nextmentor", "maribiz-ai"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Bengaluru — Custom Stores for Growing Brands",
      metaDescription:
        "Ecommerce in Bengaluru for brands outgrowing templates: custom catalogues, subscriptions, fast local delivery and integrations with your ops stack.",
      h1: "Ecommerce development for Bengaluru brands outgrowing their template store",
      card: "Custom stores with subscriptions, fast delivery and ops integrations.",
      intro: [
        "Bengaluru shoppers are used to quick commerce: groceries in minutes, slick apps and instant refunds. A brand store that's slow, unclear about delivery or awkward to reorder from feels dated next to that.",
        "We build ecommerce for Bengaluru brands that need more than a template: custom catalogues, subscriptions, local fast delivery and integrations with warehouse and ops tools.",
      ],
      sections: [
        {
          heading: "Delivery promises that are true",
          body: [
            "Pin code-level delivery estimates, same-day options in the areas you can actually serve, and live tracking, so customers know exactly when their order arrives.",
          ],
        },
        {
          heading: "Built for repeat orders",
          body: [
            "Subscriptions, one-tap reorder, saved UPI and addresses, and reminders when customers are likely to run out. For consumables, this is where the profit is.",
          ],
          links: [{ label: "Online store or marketplace?", href: "/ecommerce-store-vs-marketplace/" }],
        },
      ],
      problems: [
        {
          symptom: "Customers expect fast delivery we can't show",
          cause: "The store gives one generic delivery estimate for all of India.",
          steps: [
            "Show delivery dates by pin code",
            "Offer same-day where you can deliver",
            "Send live tracking on WhatsApp",
          ],
        },
        {
          symptom: "Subscribers churn after two months",
          cause: "Subscriptions are hard to pause or change.",
          steps: [
            "Let customers skip, pause and swap",
            "Send reminders before each charge",
            "Ask for feedback on cancellation",
          ],
        },
      ],
      checklist: [
        "Delivery estimates are shown by pin code",
        "Customers can reorder in one tap",
        "Subscriptions can be paused by the customer",
        "Orders sync to your warehouse automatically",
      ],
      faqs: [
        {
          question: "Shopify or custom?",
          answer: "Shopify for most brands; custom when your catalogue, pricing or subscriptions don't fit. We compare honestly during scoping.",
        },
        {
          question: "Can you integrate our 3PL?",
          answer: "Yes, most Indian 3PLs and shipping aggregators have APIs.",
        },
      ],
      caseStudies: ["krushidoctor", "clickngreet"],
    },
    "shopify-development": {
      metaTitle: "Shopify Experts in Bengaluru — Stores for D2C Brands That Scale",
      metaDescription:
        "Shopify development in Bengaluru for D2C brands: fast themes, Indian checkout, COD control, retention flows and analytics that show what's actually working.",
      h1: "Shopify development for Bengaluru D2C brands chasing repeat customers",
      card: "Shopify stores built for retention, COD control and clean analytics.",
      intro: [
        "Bengaluru's D2C brands, in coffee, skincare, snacks, apparel and pet care, often raise money on growth and then discover their repeat rate is the number that matters. Shopify is usually the right platform; how it's set up decides the outcome.",
        "We build and tune Shopify stores for retention: fast themes, Indian checkout, COD control, post-purchase flows and analytics that show which channels bring customers who come back.",
      ],
      sections: [
        {
          heading: "Retention, built in",
          body: [
            "Post-purchase sequences on WhatsApp and email, review requests, loyalty points, subscriptions for consumables and win-back flows for lapsed customers. Each one is measured.",
          ],
        },
        {
          heading: "Analytics you can trust",
          body: [
            "GA4, Meta pixel and server-side events set up correctly, with UTMs and cohort reports, so you can see repeat rate by acquisition channel instead of arguing about attribution.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We can't tell which ads bring loyal customers",
          cause: "Tracking stops at the first purchase.",
          steps: [
            "Fix tracking and UTMs",
            "Build cohort reports by channel",
            "Shift budget to channels with repeat buyers",
          ],
        },
        {
          symptom: "Our store has 30 apps",
          cause: "Each problem was solved with a new app.",
          steps: [
            "Audit apps by cost and speed impact",
            "Replace simple ones with theme code",
            "Re-measure speed and spend",
          ],
        },
      ],
      checklist: [
        "You know your 90-day repeat rate",
        "Tracking is verified on purchase events",
        "Post-purchase flows are live",
        "You can justify every installed app",
      ],
      faqs: [
        {
          question: "Do you work with Shopify Plus?",
          answer: "Yes, including checkout extensibility and Plus-specific features.",
        },
        {
          question: "Can you set up subscriptions?",
          answer: "Yes, with an app suited to Indian payment methods and your products.",
        },
      ],
      caseStudies: ["clickngreet", "vashtaraheaven"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Bengaluru — Platforms for Founders",
      metaDescription:
        "Marketplace and platform development in Bengaluru: services, rentals, B2B and gig platforms with onboarding, matching, payments and admin, built to launch lean.",
      h1: "Marketplace development for Bengaluru founders testing a two-sided idea",
      card: "Lean marketplace MVPs with matching, payments and admin.",
      intro: [
        "Bengaluru founders pitch marketplaces constantly: home services, rentals, freelancers, B2B procurement, tutoring. The ones that survive launch small, prove that one transaction works, and only then add features.",
        "We build marketplace MVPs that do exactly that: the core transaction, payments and payouts, basic admin, and nothing you don't need yet. We built MariBiz.ai, a verified-vendor procurement marketplace, so we've seen what matters after launch.",
      ],
      sections: [
        {
          heading: "The smallest thing that proves demand",
          body: [
            "We scope the first version around one transaction and one city segment. Everything else, including ratings, referrals and dashboards, waits until real users ask for it.",
          ],
        },
        {
          heading: "Ready for investor questions",
          body: [
            "Clean data on liquidity, repeat usage and take rate from day one, so you can answer investor questions with numbers rather than estimates.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our MVP has too many features and no users",
          cause: "We built for the vision, not the first transaction.",
          steps: [
            "Strip back to the core transaction",
            "Launch in one segment",
            "Add features from real feedback",
          ],
        },
        {
          symptom: "We can't show investors marketplace metrics",
          cause: "Events and transactions aren't tracked properly.",
          steps: [
            "Instrument key events",
            "Build a metrics dashboard",
            "Track cohorts from launch",
          ],
        },
      ],
      checklist: [
        "Your MVP does one transaction well",
        "Liquidity and repeat metrics are tracked",
        "Payouts are automatic",
        "You own the code and accounts",
      ],
      faqs: [
        {
          question: "How long does an MVP take?",
          answer: "Typically eight to fourteen weeks, depending on scope.",
        },
        {
          question: "Can you hand over to our future team?",
          answer: "Yes, with documentation and a clean codebase.",
        },
      ],
      caseStudies: ["maribiz-ai", "tatvivahtrends"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development Company in Bengaluru — Products & Marketing Sites",
      metaDescription:
        "Next.js developers in Bengaluru: SaaS products, dashboards and marketing sites on one codebase, with strong performance, SEO and code your team can own.",
      h1: "Next.js development for Bengaluru SaaS teams",
      card: "SaaS products, dashboards and marketing sites on one codebase.",
      intro: [
        "Many Bengaluru SaaS companies run their marketing site on one stack and their product on another, with two design systems and two teams. Next.js lets the marketing site, docs and product share one codebase and one set of components.",
        "We build Next.js products and sites for Bengaluru teams, either as an extension of your engineering team or as a self-contained build, with code your engineers will be comfortable owning.",
      ],
      sections: [
        {
          heading: "Fits into your engineering process",
          body: [
            "TypeScript, tests, pull requests, CI and your conventions. We work in your repository, go through your code review and document as we go.",
          ],
        },
        {
          heading: "Marketing pages that rank",
          body: [
            "Server-rendered pages, structured data and fast loading help marketing pages rank, and marketing can publish new pages from a CMS without engineering time.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our marketing site slows our engineers down",
          cause: "Every page change needs engineering.",
          steps: [
            "Move the site to Next.js with a CMS",
            "Build reusable sections",
            "Hand page building to marketing",
          ],
        },
        {
          symptom: "Our app's performance hurts conversions",
          cause: "Heavy client-side rendering and large bundles.",
          steps: [
            "Profile bundle size and render time",
            "Move rendering to the server where possible",
            "Set and track a performance budget",
          ],
        },
      ],
      checklist: [
        "Your app passes Core Web Vitals",
        "Marketing can publish without engineers",
        "There are tests on critical flows",
        "Docs, site and app share components",
      ],
      faqs: [
        {
          question: "Can you work as part of our team?",
          answer: "Yes, joining your standups or async updates and working through your board.",
        },
        {
          question: "Do you work on the App Router?",
          answer: "Yes, and we can migrate Pages Router projects incrementally.",
        },
      ],
      caseStudies: ["nextmentor", "maribiz-ai"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Bengaluru — Native Kotlin Apps",
      metaDescription:
        "Native Android app development in Bengaluru: Kotlin apps for startups, field teams and services, with offline support, clean architecture and Play Store publishing.",
      h1: "Native Android apps for Bengaluru startups and field teams",
      card: "Native Kotlin apps with offline support and clean architecture.",
      intro: [
        "Even in Bengaluru, where iPhones are more common than elsewhere in India, most of your users, delivery partners and field staff use Android. For a lot of products, a fast native Android app is where to start.",
        "We build native Android apps in Kotlin with clean architecture, offline support and analytics, for consumer products, partner apps and field operations. For iPhone, we scope React Native separately rather than doing native iOS.",
      ],
      sections: [
        {
          heading: "Partner and field apps",
          body: [
            "Delivery partners, service professionals and field agents need apps that work on budget phones, with patchy networks and long shifts. We build for those conditions: offline queues, small app size and battery-friendly location tracking.",
          ],
        },
        {
          heading: "Consumer apps that keep users",
          body: [
            "Fast startup, sensible notifications, UPI payments and analytics on the actions that matter, so you can see what keeps users coming back.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our partner app fails when the network drops",
          cause: "It assumes a constant connection.",
          steps: [
            "Queue actions offline",
            "Sync when back online",
            "Show partners what's pending",
          ],
        },
        {
          symptom: "Our app is slow on budget phones",
          cause: "It was tested only on flagship devices.",
          steps: [
            "Profile on entry-level devices",
            "Reduce app size and startup work",
            "Optimise heavy screens",
          ],
        },
      ],
      checklist: [
        "Your app works offline where it matters",
        "It has been tested on budget phones",
        "Crashes are reported automatically",
        "Key actions are tracked in analytics",
      ],
      faqs: [
        {
          question: "Kotlin or Flutter?",
          answer: "We build natively in Kotlin. If you need iOS too, we scope React Native separately.",
        },
        {
          question: "Can you take over an existing app?",
          answer: "Yes, after a code review that tells you honestly what state it's in.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Company in Bengaluru — SaaS SEO & Local SEO That Converts",
      metaDescription:
        "SEO in Bengaluru: SaaS content that brings signups, technical SEO for growing sites, and local SEO for clinics, schools and services across the city.",
      h1: "SEO for Bengaluru SaaS companies and local businesses",
      card: "SaaS content that brings signups, plus local SEO across the city.",
      intro: [
        "Bengaluru SEO comes in two very different forms. SaaS companies need content and technical SEO that bring signups from across the world. Local businesses need to win Google Maps in HSR Layout, Whitefield or Jayanagar, where the traffic jams make people search close to home.",
        "We do both, measured in signups and enquiries rather than traffic.",
      ],
      sections: [
        {
          heading: "SaaS SEO",
          body: [
            "Comparison and alternative pages, use-case pages, integration pages and helpful guides, written with your product team, structured for search and AI assistants, and linked to trials or demos.",
          ],
        },
        {
          heading: "Local SEO in a city of traffic",
          body: [
            "Bengaluru customers rarely cross the city for a dentist or a school. Your Google profile, area pages and reviews should match the neighbourhoods you actually serve.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our blog gets traffic that never converts",
          cause: "Topics are broad and far from what buyers search.",
          steps: [
            "Prioritise bottom-of-funnel searches",
            "Build comparison and use-case pages",
            "Add clear calls to action",
          ],
        },
        {
          symptom: "Customers across town find us but nearby ones don't",
          cause: "Our Google profile doesn't reflect our area well.",
          steps: [
            "Complete the profile with local details",
            "Collect reviews from nearby customers",
            "Add area-specific content",
          ],
        },
      ],
      checklist: [
        "You have comparison or alternative pages",
        "Signups from organic search are tracked",
        "Your Google profile is complete",
        "Technical SEO issues are fixed in Search Console",
      ],
      faqs: [
        {
          question: "Do you write technical content?",
          answer: "Yes, with input from your product and engineering teams for accuracy.",
        },
        {
          question: "How do you measure SaaS SEO?",
          answer: "By signups, demos and activation from organic search, alongside rankings.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads Agency in Bengaluru — Paid Search for SaaS & Startups",
      metaDescription:
        "Google Ads management in Bengaluru for SaaS and startups: high-intent keywords, landing pages and tracking through to signups, activation and revenue.",
      h1: "Google Ads for Bengaluru startups that need efficient growth",
      card: "Paid search tracked through to signups, activation and revenue.",
      intro: [
        "Bengaluru startups often compete in Google Ads against well-funded rivals bidding on the same broad terms. Outspending them rarely works. Out-targeting them usually does.",
        "We run campaigns focused on high-intent searches, with landing pages built for each and tracking that follows users past signup to activation and revenue.",
      ],
      sections: [
        {
          heading: "Intent over volume",
          body: [
            "Competitor and alternative searches, problem-specific queries and integration terms often convert far better than broad category keywords, and cost less.",
          ],
        },
        {
          heading: "Tracking beyond the click",
          body: [
            "We pass signup and activation events back to Google Ads, so bidding learns from users who actually use the product, not just those who fill a form.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our cost per signup keeps rising",
          cause: "Budgets go to broad, competitive terms.",
          steps: [
            "Shift budget to specific, high-intent keywords",
            "Build a landing page for each",
            "Cut keywords with poor activation",
          ],
        },
        {
          symptom: "Signups from ads don't become customers",
          cause: "Bidding optimises for form fills.",
          steps: [
            "Send activation events back to Google Ads",
            "Bid on qualified signups",
            "Review revenue by campaign",
          ],
        },
      ],
      checklist: [
        "Activation events are tracked in Google Ads",
        "Each campaign has its own landing page",
        "Competitor terms are tested",
        "You know cost per activated user",
      ],
      faqs: [
        {
          question: "Can you run ads globally?",
          answer: "Yes, for SaaS selling outside India, with campaigns by region.",
        },
        {
          question: "Do you work with LinkedIn ads too?",
          answer: "Where your buyers are best reached there, yes.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Bengaluru — LinkedIn for SaaS, Instagram for D2C",
      metaDescription:
        "Social media marketing in Bengaluru: LinkedIn content for SaaS founders and teams, Instagram and Reels for D2C brands and cafés, with tracking to pipeline and sales.",
      h1: "Social media for Bengaluru founders and brands",
      card: "LinkedIn for SaaS founders, Instagram for D2C brands and cafés.",
      intro: [
        "For Bengaluru SaaS companies, the most valuable social channel is usually the founder's LinkedIn profile. For D2C brands, cafés and studios, it's Instagram. The approach is different; the principle is the same: real content, posted consistently, tied to business results.",
        "We help with both: LinkedIn content drafted from founders' own thinking, and Instagram content and ads for brands and local businesses.",
      ],
      sections: [
        {
          heading: "Founder-led LinkedIn",
          body: [
            "We interview founders and leaders regularly, turn their thinking into posts in their voice, and schedule them. They approve everything; we do the drafting and planning.",
          ],
        },
        {
          heading: "Instagram for brands and cafés",
          body: [
            "Reels from real moments, creator collaborations and Meta ads targeted by neighbourhood and interest, with tracking to orders and bookings.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our founder's LinkedIn is silent",
          cause: "Writing takes time founders don't have.",
          steps: [
            "Run a short monthly interview",
            "Draft posts in the founder's voice",
            "Schedule after approval",
          ],
        },
        {
          symptom: "Our café's Instagram doesn't bring footfall",
          cause: "Reach goes to people far away.",
          steps: [
            "Target ads to nearby neighbourhoods",
            "Post Reels of signature items",
            "Track redemptions of social offers",
          ],
        },
      ],
      checklist: [
        "Your founder posts on LinkedIn regularly",
        "Brand content is posted weekly",
        "Ads target nearby areas or real buyers",
        "Social results are tracked to business outcomes",
      ],
      faqs: [
        {
          question: "Will posts sound like us?",
          answer: "They're drafted from your words and approved by you before posting.",
        },
        {
          question: "Do you manage community replies?",
          answer: "We can, during our working hours, or support your team with templates.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Bengaluru — Agents & Workflows for Lean Teams",
      metaDescription:
        "AI automation in Bengaluru: support triage, sales research, ops workflows and internal tools powered by LLMs, built with guardrails and human review.",
      h1: "AI automation for Bengaluru teams that would rather not hire for admin",
      card: "LLM-powered support, sales and ops workflows with human review.",
      intro: [
        "Bengaluru startups run lean, and every hire for repetitive work slows the path to profitability. Much of that work, such as support triage, lead research, data cleanup and report generation, can now be handled by AI workflows with a person reviewing.",
        "We build practical AI automation on top of the tools you already use, with guardrails, logging and review steps, not a demo that breaks in production.",
      ],
      sections: [
        {
          heading: "Workflows that hold up",
          body: [
            "Clear inputs and outputs, retries when an API fails, logs of every decision and a review queue for anything uncertain. We measure accuracy before removing the manual step.",
          ],
        },
        {
          heading: "Common first projects",
          body: [
            "Ticket classification and draft replies, enriching inbound leads, extracting data from documents, summarising calls into the CRM and weekly reports generated from your data.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Support tickets pile up overnight",
          cause: "Every ticket is read and routed by a person.",
          steps: [
            "Classify and route tickets automatically",
            "Draft replies for common issues",
            "Escalate uncertain cases",
          ],
        },
        {
          symptom: "Sales spends hours researching leads",
          cause: "Lead research is manual.",
          steps: [
            "Enrich leads automatically",
            "Score them against your ideal customer",
            "Summarise them in the CRM",
          ],
        },
      ],
      checklist: [
        "Repetitive tasks are timed and listed",
        "Automations log every action",
        "Uncertain cases go to a person",
        "Accuracy is measured before going live",
      ],
      faqs: [
        {
          question: "Which LLMs do you use?",
          answer: "Whichever fits the task and your data policies. We document the provider and data handling in the scope.",
        },
        {
          question: "Can it run in our cloud?",
          answer: "Yes, deployed in your own AWS, Azure or GCP account if you prefer.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software Development in Bengaluru — Internal Tools & Platforms",
      metaDescription:
        "Custom software in Bengaluru: internal tools, admin panels, partner portals and B2B platforms for startups and manufacturers, on code your team owns.",
      h1: "Custom software for Bengaluru startups and manufacturers",
      card: "Internal tools, admin panels and portals that replace spreadsheets.",
      intro: [
        "Bengaluru startups end up running operations on spreadsheets and Retool hacks once they grow past the first hundred customers. Manufacturers in Peenya and Bommasandra run production and dispatch on Excel and phone calls. Both need software built around how they actually work.",
        "We build internal tools, admin panels, partner portals and B2B platforms, with code your team can own and extend.",
      ],
      sections: [
        {
          heading: "Ops tools for startups",
          body: [
            "Admin panels, approval workflows, partner management and reporting that your ops team uses every day, built fast and maintained properly.",
          ],
        },
        {
          heading: "Production and dispatch for manufacturers",
          body: [
            "Orders, production plans, quality checks and dispatch in one system, with dashboards for owners and simple screens on the shop floor.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Ops runs on a dozen spreadsheets",
          cause: "Internal tools were never prioritised.",
          steps: [
            "Map the ops workflows",
            "Build an admin panel for the core ones",
            "Retire spreadsheets one by one",
          ],
        },
        {
          symptom: "We don't know where each order is on the shop floor",
          cause: "Production is tracked on paper.",
          steps: [
            "Track orders through each stage",
            "Update status from the shop floor",
            "Show delays on a dashboard",
          ],
        },
      ],
      checklist: [
        "Ops data lives in one system",
        "Access is controlled by role",
        "Order status is visible in real time",
        "The code is in your repository",
      ],
      faqs: [
        {
          question: "Can you build on Retool or low-code tools?",
          answer: "Sometimes that's right. For core workflows, custom code is usually cheaper long term.",
        },
        {
          question: "Where is data hosted?",
          answer: "In Indian cloud regions by default, in your company's account.",
        },
      ],
      caseStudies: ["maribiz-ai", "thegrafftee"],
    },
    "api-integration": {
      metaTitle: "API Integration in Bengaluru — Connect Your SaaS Stack",
      metaDescription:
        "API integration in Bengaluru: connect CRM, billing, product analytics, support and data warehouse, and build integrations your customers ask for.",
      h1: "API integration for Bengaluru companies with a growing SaaS stack",
      card: "Connect CRM, billing, analytics and support, or build customer integrations.",
      intro: [
        "A Bengaluru startup at Series A might run HubSpot or Salesforce, Razorpay or Stripe, a support desk, product analytics and a data warehouse, with data copied between them by hand or through brittle scripts. Customers also start asking for integrations with their own tools.",
        "We build both kinds: internal integrations that keep your stack in sync, and product integrations your customers can use.",
      ],
      sections: [
        {
          heading: "Internal data flows",
          body: [
            "Signups to CRM, billing events to revenue reports, support tickets linked to accounts and product usage to customer success. Logged, monitored and documented.",
          ],
        },
        {
          heading: "Product integrations",
          body: [
            "OAuth connections, webhooks and sync logic for the tools your customers use, built with retries, rate-limit handling and clear error messages.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Revenue numbers differ in every tool",
          cause: "Billing, CRM and analytics aren't synced.",
          steps: [
            "Choose a source of truth for revenue",
            "Sync it to other tools",
            "Report from one place",
          ],
        },
        {
          symptom: "Customers keep asking for integrations",
          cause: "Building them distracts the core team.",
          steps: [
            "Prioritise by customer demand",
            "Build integrations on a shared framework",
            "Document and support them",
          ],
        },
      ],
      checklist: [
        "Revenue data matches across tools",
        "Integrations retry and alert on failure",
        "Customer integrations are documented",
        "Webhooks are logged",
      ],
      faqs: [
        {
          question: "Can you work with our data warehouse?",
          answer: "Yes, including loading data into BigQuery, Snowflake or Postgres.",
        },
        {
          question: "Who maintains the integrations?",
          answer: "We can on a support plan, or hand over with documentation.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Bengaluru — AWS, Cost Optimisation & DevOps",
      metaDescription:
        "Cloud and DevOps in Bengaluru: AWS and GCP set up properly, CI/CD, staging, monitoring and cost optimisation for startups burning more than they should.",
      h1: "Cloud and DevOps for Bengaluru startups whose AWS bill is a surprise",
      card: "AWS and GCP set-up, CI/CD and cost optimisation for startups.",
      intro: [
        "Bengaluru startups often discover their cloud bill growing faster than revenue: forgotten instances, oversized databases, logs nobody reads and credits that ran out. At the same time, deployments are manual and there's no proper staging environment.",
        "We set up cloud infrastructure and DevOps properly, then cut the waste, so you ship faster and spend less.",
      ],
      sections: [
        {
          heading: "Cost optimisation",
          body: [
            "We audit every resource, right-size what's oversized, remove what's unused, use reserved or spot capacity where it fits and set budget alerts. Savings usually pay for the work.",
          ],
        },
        {
          heading: "DevOps basics, done right",
          body: [
            "Infrastructure as code, CI/CD pipelines, staging that mirrors production, monitoring and alerting, and backups that have been tested.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our cloud bill doubled and nobody knows why",
          cause: "Resources were added without review.",
          steps: [
            "Audit and tag every resource",
            "Right-size and remove waste",
            "Set budgets and alerts",
          ],
        },
        {
          symptom: "Deployments are manual and scary",
          cause: "There's no CI/CD or staging.",
          steps: [
            "Add CI/CD from your repository",
            "Create staging",
            "Add rollback",
          ],
        },
      ],
      checklist: [
        "Every cloud resource is tagged and owned",
        "Deployments are automated",
        "Budget alerts are set",
        "Backups have been restored successfully",
      ],
      faqs: [
        {
          question: "Can you help with startup credits?",
          answer: "We set accounts up to use credits from provider programmes; eligibility is up to the provider.",
        },
        {
          question: "Do you offer on-call?",
          answer: "No 24/7 on-call. We set up monitoring and help you plan coverage.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Bengaluru — Care Plans for Busy Teams",
      metaDescription:
        "Website maintenance in Bengaluru: updates, security, backups, performance checks and content changes for startups and local businesses without in-house developers.",
      h1: "Website maintenance for Bengaluru teams with no time for their website",
      card: "Updates, security, performance and changes for busy teams.",
      intro: [
        "Bengaluru founders and business owners have more urgent things to do than update plugins or fix a broken form. Yet a slow, outdated or hacked website quietly costs signups and customers.",
        "Our maintenance plans cover updates, security, backups, performance checks and content changes, with a named person to message.",
      ],
      sections: [
        {
          heading: "Performance, not just updates",
          body: [
            "Each month we check speed and Core Web Vitals as well as updating software, because sites slow down as content and scripts pile up.",
          ],
        },
        {
          heading: "Changes on request",
          body: [
            "Send changes by WhatsApp, email or your team's Slack, and they're live within one working day.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our signup form broke and we didn't notice for a week",
          cause: "Nobody tests key flows after updates.",
          steps: [
            "Test key forms after every update",
            "Monitor form submissions",
            "Alert when submissions stop",
          ],
        },
        {
          symptom: "Our site has slowed down over time",
          cause: "Scripts and heavy content accumulate.",
          steps: [
            "Audit scripts and images",
            "Remove what isn't needed",
            "Track speed monthly",
          ],
        },
      ],
      checklist: [
        "Key forms are tested after updates",
        "Speed is checked monthly",
        "Software is updated",
        "Backups run daily",
      ],
      faqs: [
        {
          question: "Can you join our Slack?",
          answer: "Yes, as a shared channel, if that suits your team.",
        },
        {
          question: "Do you maintain Webflow or Framer sites?",
          answer: "Yes, for content and design changes. Those platforms handle hosting and security.",
        },
      ],
    },
  },
}
