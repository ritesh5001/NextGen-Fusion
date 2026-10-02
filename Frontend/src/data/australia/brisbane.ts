import type { AuCity } from "./types"
import { AEST } from "./zones"

export const brisbane: AuCity = {
  slug: "brisbane",
  name: "Brisbane",
  state: "Queensland",
  stateCode: "QLD",
  summary: "A fast-growing capital where construction, trades and services are scaling ahead of the 2032 Games.",
  zone: { std: AEST },
  areas: ["Brisbane CBD", "Fortitude Valley", "South Brisbane", "Newstead", "West End", "Chermside", "Indooroopilly", "Carindale", "Logan", "Ipswich", "Springfield", "Redcliffe", "North Lakes", "Capalaba"],
  nearby: ["gold-coast", "sunshine-coast", "sydney"],
  page: {
    metaTitle: "Websites, SEO & Business Systems for Brisbane Businesses",
    metaDescription:
      "Websites, SEO, Google Ads and job management systems for Brisbane builders, trades, property and service businesses growing ahead of the 2032 Games.",
    h1: "Helping Brisbane businesses keep up with Brisbane's growth",
    intro: [
      "Brisbane is growing fast, and the run-up to the 2032 Olympic and Paralympic Games has added to a construction and infrastructure pipeline that was already busy. Builders, trades, engineering firms, property and the services around them are quoting, hiring and expanding.",
      "Growth like that exposes the systems a business runs on. We help Brisbane businesses fix them: websites that win the right jobs, search visibility across a spread-out city, and software that takes quoting and admin off the owner's evenings. We work remotely from India and have no Brisbane office.",
    ],
    sections: [
      {
        heading: "The bottleneck usually isn't demand",
        body: [
          "Most Brisbane business owners we speak to have enough enquiries. What holds them back is turning those enquiries into profitable work: slow replies to quote requests, quotes built in spreadsheets, jobs tracked in a group chat, and a website that attracts tyre-kickers instead of the jobs they want.",
          "So we often start behind the scenes, with faster replies, better quote forms and a job system, before spending anything on more leads.",
        ],
      },
      {
        heading: "No daylight saving, no confusion",
        body: [
          "Queensland does not change its clocks, so our hours in Brisbane stay the same all year: 14:30 to 23:30, Monday to Saturday. Send a message in the morning, get the answer that afternoon.",
        ],
      },
    ],
    industries: [
      { name: "Construction and trades", need: "Builders and trades need project galleries, licence details up front and quote forms that capture the job properly." },
      { name: "Property and real estate", need: "Agencies and developers need listings, enquiry routing and pages that rank in the suburbs they sell." },
      { name: "Engineering and mining services", need: "Firms based in the city need capability statements and sites that pass a procurement check." },
      { name: "Health and education", need: "Clinics, training providers and schools need booking, enrolment and course pages that work on a phone." },
    ],
    problems: [
      {
        service: "ai-automation",
        symptom: "We lose jobs because we can't reply to quote requests fast enough",
        cause: "Owners are on site all day, and the first business to reply with a sensible next step usually wins the job.",
        steps: [
          "Reply to every quote request within minutes with useful questions",
          "Let customers upload photos and book a site visit straight away",
          "Hand the owner a summary to price that evening",
        ],
      },
      {
        service: "software-development",
        symptom: "Quotes, variations and timesheets live in spreadsheets and group chats",
        cause: "Systems that worked at five staff break at fifteen, and nobody has time to replace them.",
        steps: [
          "Map the job from enquiry to final invoice",
          "Pick an existing job system or build what it cannot do",
          "Connect it to Xero so invoicing happens from the job record",
        ],
      },
      {
        service: "seo",
        symptom: "We work all over Brisbane but only show up near our yard",
        cause: "Google ranks local businesses by distance, and one generic Brisbane page does not tell it which areas you serve.",
        steps: [
          "Set your Google profile's service area to match where you work",
          "Build a useful page for each region you want more work in",
          "Collect reviews from customers in those areas",
        ],
      },
      {
        service: "google-ads",
        symptom: "Lead sites charge us for jobs we never win",
        cause: "Lead marketplaces sell the same lead to several businesses, so you pay to compete on price.",
        steps: [
          "Run a small search campaign for your highest-value jobs",
          "Send it to a page built to convert that job type",
          "Compare cost per won job against the lead sites",
        ],
      },
      {
        service: "website-development",
        symptom: "Our website brings in small jobs we don't want",
        cause: "The site doesn't say what you specialise in or what size of job you take on, so everyone enquires.",
        steps: [
          "Lead with the work you want more of",
          "Show project examples at the scale you are after",
          "Ask qualifying questions in the quote form",
        ],
      },
      {
        service: "web-design",
        symptom: "Our off-the-plan project isn't getting registrations",
        cause: "The site lists specs but doesn't sell the lifestyle, location or floor plans in a way buyers can picture.",
        steps: [
          "Lead with location, lifestyle and the best views or renders",
          "Make floor plans and pricing guidance easy to request",
          "Route registrations straight to the sales team's CRM",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Brisbane?",
        answer: "No. We work from Lucknow and Mumbai, India, with Brisbane clients over video calls, WhatsApp and email. We tell you up front so you can decide if that suits you.",
      },
      {
        question: "What are your hours in Brisbane time?",
        answer: "14:30 to 23:30, Monday to Saturday, all year. Queensland has no daylight saving, so unlike Sydney and Melbourne, the hours never shift.",
      },
      {
        question: "We're a trade business. Where should we start?",
        answer: "Usually with how fast you reply to quote requests and what your website says about the jobs you want. Those two often matter more than any marketing spend.",
      },
      {
        question: "Do you work with businesses in Logan, Ipswich and Moreton Bay?",
        answer: "Yes, and anywhere else in Queensland. We work remotely, so your location within the region makes no difference to how we work.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Brisbane — For Builders, Trades & Contractors",
      metaDescription:
        "Website development for Brisbane builders and trades: project galleries, licence details up front and quote forms that capture the job so you can price it fast.",
      h1: "Website development for Brisbane builders and trades who want the right jobs, not just more",
      card: "Sites for builders and trades that attract the jobs you want.",
      intro: [
        "For a Brisbane builder or trade business, the website has two jobs. It has to convince a homeowner or developer that you are licensed, insured and good at this exact kind of work, and it has to capture enough detail in the quote request that you can price the job without three phone calls.",
        "We build sites that do both, and that put off the enquiries you do not want by saying clearly what you do, where and at what scale.",
      ],
      sections: [
        {
          heading: "Credibility where homeowners look for it",
          body: [
            "Your QBCC licence number, insurance and memberships go where people look before they enquire, near the top and beside the quote form. Homeowners check them, and QBCC's advertising rules expect licensees to show them.",
            "Project galleries are organised by job type, such as extensions, renovations, new builds or commercial fit-outs, with a line on scope and suburb, so a visitor finds work like theirs in two taps.",
          ],
        },
        {
          heading: "Quote forms that do the first site visit",
          body: [
            "A good quote form asks what you would ask on the phone: the type of job, rough size, timeline, budget range and suburb, with photo uploads. It feels like progress to the customer and saves you a call. Requests go to your inbox or job system with everything attached.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We get lots of enquiries for jobs too small to bother with",
          cause: "The site doesn't say what you specialise in or what scale you work at.",
          steps: [
            "Lead every page with the work you want more of",
            "Show realistic budget ranges or minimum job sizes",
            "Add qualifying questions to the quote form",
          ],
        },
        {
          symptom: "Customers don't trust us until they've met us",
          cause: "There is no visible proof online: no licence details, no real project photos, no reviews on the site.",
          steps: [
            "Show licence, insurance and memberships prominently",
            "Replace stock photos with your own finished jobs",
            "Bring Google reviews onto the site, next to the quote form",
          ],
        },
      ],
      checklist: [
        "Your QBCC licence number is visible on every page",
        "Your project gallery is grouped by job type",
        "The quote form allows photo uploads",
        "The site says which areas of Brisbane you cover",
        "A customer can see roughly what size jobs you take on",
      ],
      faqs: [
        {
          question: "Can the quote form send jobs into ServiceM8 or simPRO?",
          answer: "Usually yes, through the job system's API or a connector. We check what your plan supports before quoting.",
        },
        {
          question: "How long does a builder's website take?",
          answer: "Typically four to six weeks. The slowest part is gathering good project photos, so we start that in week one.",
        },
        {
          question: "Can we update the project gallery ourselves?",
          answer: "Yes. Adding a project takes a few minutes: photos, job type, suburb and a short description.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "web-design": {
      metaTitle: "Web Design in Brisbane — Property, Development & Real Estate Sites",
      metaDescription:
        "Web design for Brisbane property developers and agencies: project sites that sell location and lifestyle, floor plans buyers can explore and registrations sent to CRM.",
      h1: "Web design for Brisbane property projects that need to sell before the slab is poured",
      card: "Project and agency sites that sell location, lifestyle and plans.",
      intro: [
        "Brisbane's population growth has kept developers and agencies busy, and many projects sell off the plan. That means the website is selling something buyers cannot walk through yet. It has to make the location, lifestyle and layout real enough that people register their interest.",
        "We design sites for Brisbane property projects and agencies that do that, and send every registration straight to the sales team.",
      ],
      sections: [
        {
          heading: "Selling what isn't built yet",
          body: [
            "Buyers decide on location and lifestyle first, then layout and price. The design follows that order: the neighbourhood and views, the renders and finishes, then floor plans buyers can explore and compare. Specifications sit behind a click for the people who want them.",
            "Large renders and videos are compressed and loaded progressively, so the site stays fast on a phone even with heavy imagery.",
          ],
        },
        {
          heading: "Registrations that reach sales",
          body: [
            "Every registration goes into your CRM with the source, the apartment or lot type of interest and the buyer's timeframe, so sales follow up with context instead of a bare email address.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Lots of visitors, few registrations",
          cause: "The page shows renders but asks for nothing until the very bottom.",
          steps: [
            "Offer floor plans or a price guide in exchange for a registration",
            "Keep a short registration form visible throughout",
            "Test the form on a phone, where most visits happen",
          ],
        },
        {
          symptom: "Our agency site looks like every other agency site",
          cause: "Template portals put listings first and the agency's strengths nowhere.",
          steps: [
            "Lead with your suburbs, results and team",
            "Give each suburb you specialise in a real page",
            "Make appraisal requests the main call to action",
          ],
        },
      ],
      checklist: [
        "Floor plans can be viewed on a phone without pinching",
        "Registrations are sent to your CRM automatically",
        "The site loads quickly despite large renders",
        "The location's best features appear before the specifications",
      ],
      faqs: [
        {
          question: "Can you connect our CRM?",
          answer: "Yes. We connect most CRMs used in property sales so registrations arrive with their source and details.",
        },
        {
          question: "Do you produce renders?",
          answer: "No. We work with renders from your architect or visualisation studio and design the site around them.",
        },
      ],
      caseStudies: ["saurally"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Brisbane — Click & Collect, Fast Delivery",
      metaDescription:
        "Ecommerce development for Brisbane retailers: online stores with click and collect, local same-day delivery, national shipping and checkout that converts on mobile.",
      h1: "Ecommerce development for Brisbane retailers with a showroom and a warehouse",
      card: "Online stores with click and collect and local delivery built in.",
      intro: [
        "Many Brisbane retailers have a showroom or warehouse and customers across South East Queensland who would happily collect or take same-day delivery, if the store offered it. Instead, a lot of online stores here charge everyone the same national shipping and lose local buyers to the big chains.",
        "We build stores that use your local presence as an advantage: click and collect, local delivery by postcode, and national shipping that is priced properly.",
      ],
      sections: [
        {
          heading: "Your location is a selling point",
          body: [
            "Click and collect at checkout, with a notification when the order is ready. Local delivery to Brisbane, Logan, Ipswich and Moreton Bay postcodes at a lower price or the same day. Stock shown by location, so customers know what is at the showroom before they drive over.",
          ],
        },
        {
          heading: "A checkout that works on a phone",
          body: [
            "Guest checkout, Apple Pay and Google Pay, buy-now-pay-later and delivery costs shown early. Each one removes a reason to leave at the last step, and together they usually matter more than any redesign.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Local customers buy from big chains instead of us",
          cause: "The chains offer click and collect and fast delivery, while our store charges standard shipping to a suburb down the road.",
          steps: [
            "Add click and collect with a ready notification",
            "Offer local delivery rates by postcode",
            "Show stock by location on product pages",
          ],
        },
        {
          symptom: "Our online store and showroom feel like different businesses",
          cause: "Prices, stock and promotions don't match between the two.",
          steps: [
            "Sync stock and prices between POS and store",
            "Run promotions in both places at once",
            "Let staff look up and place online orders in-store",
          ],
        },
      ],
      checklist: [
        "Customers can choose click and collect at checkout",
        "Brisbane postcodes get a local delivery option",
        "Product pages show whether items are in stock at your showroom",
        "Online and in-store prices match",
      ],
      faqs: [
        {
          question: "Which platform suits a store with a showroom?",
          answer: "Shopify with Shopify POS works well when you want online and in-store on one system. If you already use another POS, we can connect it instead.",
        },
        {
          question: "Can you set up same-day courier delivery?",
          answer: "Yes. We connect same-day courier services available in Brisbane, or set up your own delivery runs with postcode rules.",
        },
      ],
      caseStudies: ["deetoo", "saurally"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Brisbane — From Markets & DMs to a Real Store",
      metaDescription:
        "Shopify developers for Brisbane small brands moving off market stalls and Instagram DMs: a proper store with payments, shipping, pickup and stock in one place.",
      h1: "Shopify development for Brisbane brands still selling through DMs and market stalls",
      card: "Move from Instagram DMs and market stalls to a proper store.",
      intro: [
        "Plenty of Brisbane brands start at the weekend markets or in Instagram messages: taking orders by DM, payment by bank transfer and tracking stock in a notes app. It works until it doesn't, usually when orders double and something gets missed.",
        "We set up Shopify stores that replace all of that with one system: products, payments, shipping, local pickup and stock, plus Shopify POS for the market stall so everything stays in sync.",
      ],
      sections: [
        {
          heading: "One system for every channel",
          body: [
            "Your Shopify store sells online, Shopify POS takes card payments at markets and pop-ups, and Instagram and Facebook shops pull from the same catalogue. Stock counts update wherever you sell, so you stop selling things you no longer have.",
          ],
        },
        {
          heading: "Set up to grow",
          body: [
            "We configure GST, shipping zones, local pickup, abandoned-cart emails and Google Shopping from the start, and give you a store your team can run without a developer. When you are ready for more, the foundation is already there.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We miss orders that come in through DMs",
          cause: "Orders arrive across Instagram, Facebook, email and in person, with no single list.",
          steps: [
            "Move ordering to a Shopify store with social shopping links",
            "Reply to DMs with product links instead of taking orders manually",
            "Track every order in one admin",
          ],
        },
        {
          symptom: "We sold something at the market that was already sold online",
          cause: "Market stock and online stock are counted separately.",
          steps: [
            "Use Shopify POS at markets",
            "Keep one stock count for every channel",
            "Set low-stock alerts for popular products",
          ],
        },
      ],
      checklist: [
        "Every order, from any channel, appears in one list",
        "Market and online stock counts are the same",
        "Customers can pay without a bank transfer",
        "You can see your best sellers for the last month",
      ],
      faqs: [
        {
          question: "Is Shopify worth it for a small brand?",
          answer: "Usually, once you are taking orders regularly. It replaces manual work you are already doing and lets you take payments properly. We can set up a lean store that keeps monthly costs low.",
        },
        {
          question: "Can you teach us to run the store?",
          answer: "Yes. Every store comes with a handover session and a short guide to the tasks you will do most.",
        },
      ],
      caseStudies: ["clickngreet"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Brisbane — Hire, Trades & Services Platforms",
      metaDescription:
        "Marketplace development for Brisbane founders: equipment hire, subcontractor and services platforms with verified providers, bookings, payments and reviews.",
      h1: "Marketplace development for Brisbane platforms connecting builders, trades and hire",
      card: "Platforms for equipment hire, subcontractors and services.",
      intro: [
        "Brisbane's construction boom has produced a steady stream of platform ideas: equipment and plant hire, subcontractor matching, short-notice labour, and services for the people moving here. Each one depends on trust. A builder will not book a subcontractor or hire equipment through a platform that can't vouch for who is on it.",
        "We build marketplaces with verification at their core: licences and insurance checked, providers rated, bookings and payments handled on-platform. We built the verified-vendor marketplace MariBiz.ai, so this is familiar work.",
      ],
      sections: [
        {
          heading: "Verification buyers can rely on",
          body: [
            "Providers upload licences, insurance and certificates during onboarding, with expiry dates tracked and reminders sent before they lapse. Buyers see what has been verified and when. Your team reviews documents in an admin queue instead of an inbox.",
          ],
        },
        {
          heading: "Bookings, deposits and payouts",
          body: [
            "Hire and services bookings often need deposits, damage bonds or staged payments. We build those rules into checkout using Stripe Connect, pay providers automatically, and invoice your commission on each transaction.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Buyers don't trust providers on our platform",
          cause: "There is no visible verification of licences, insurance or past work.",
          steps: [
            "Require documents at onboarding and verify them",
            "Show verification badges with dates",
            "Collect reviews after every completed job",
          ],
        },
        {
          symptom: "Hire bookings clash or overlap",
          cause: "Availability is tracked by hand or in separate calendars.",
          steps: [
            "Give each item or provider a single availability calendar",
            "Hold dates when a deposit is paid",
            "Send reminders before pickup and return",
          ],
        },
      ],
      checklist: [
        "Licences and insurance are verified before providers go live",
        "Expiring documents trigger reminders automatically",
        "Deposits and bonds are handled in the checkout",
        "Providers are paid without manual transfers",
      ],
      faqs: [
        {
          question: "Can the platform handle bonds and refunds?",
          answer: "Yes. We use payment holds or separate bond charges, released or captured according to the rules you set.",
        },
        {
          question: "What does a first version include?",
          answer: "Provider onboarding and verification, listings, search, booking and payments, reviews and an admin panel. Extras are added once it is live.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Brisbane — Fast Sites at Large Scale",
      metaDescription:
        "Next.js developers for Brisbane property, listings and content-heavy sites: thousands of pages that stay fast, rank well and update without rebuilds.",
      h1: "Next.js development for Brisbane sites with thousands of pages",
      card: "Large listing and content sites that stay fast at scale.",
      intro: [
        "Some Brisbane businesses run sites with thousands of pages: property listings, suburb guides, product catalogues, directories and course libraries. On a typical CMS, sites like that get slow and hard to manage. Next.js handles them well, generating pages ahead of time and refreshing them as data changes.",
        "We build large, fast Next.js sites for Brisbane businesses, connected to your listings feed, CMS or database.",
      ],
      sections: [
        {
          heading: "Thousands of pages, still fast",
          body: [
            "Pages are pre-built and served from a global CDN, then refreshed in the background when a listing or product changes. Visitors and search engines get fast pages, and your team never waits for a full rebuild.",
            "Structured data, internal linking and sitemaps are generated from the same data, so every new listing is set up for search the moment it appears.",
          ],
        },
        {
          heading: "Fed by your existing systems",
          body: [
            "We connect to listing feeds, product information systems, a headless CMS or your own database, so content is entered once and published everywhere it needs to be.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our listings site is slow and Google indexes only part of it",
          cause: "Pages are built on every request, internal linking is weak, and sitemaps are incomplete.",
          steps: [
            "Pre-render pages and serve them from a CDN",
            "Generate complete sitemaps from the data",
            "Link related listings and areas to each other",
          ],
        },
        {
          symptom: "Updating our catalogue means editing pages one by one",
          cause: "Content is stored as individual pages rather than structured data.",
          steps: [
            "Move content into structured records",
            "Generate pages from templates and data",
            "Let a single edit update every page that uses it",
          ],
        },
      ],
      checklist: [
        "Search Console shows most of your pages as indexed",
        "New listings appear on the site within minutes",
        "Pages load fast on mobile even on large category pages",
        "Content is stored once, not copied across pages",
      ],
      faqs: [
        {
          question: "Can you connect to a property listings feed?",
          answer: "Yes, if the feed or API is available to you. We check the format and access terms during scoping.",
        },
        {
          question: "Will our team still be able to edit content?",
          answer: "Yes. We pair Next.js with a CMS your team can use, chosen for how they work.",
        },
      ],
      caseStudies: ["maribiz-ai", "nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Brisbane — Site Diaries & Safety Apps",
      metaDescription:
        "Android apps for Brisbane builders and contractors: site diaries, prestart and safety checklists, photos and timesheets that work offline on site.",
      h1: "Android apps for Brisbane construction sites, where paperwork slows everything down",
      card: "Site diaries, safety checklists and timesheets that work offline.",
      intro: [
        "On a busy Brisbane construction site, paperwork is everywhere: site diaries, prestart checklists, safety documents, toolbox talks, photos for variations and timesheets. Much of it is still on paper or spread across messaging apps, and it is the first thing that matters when a dispute or incident happens.",
        "We build native Android apps for builders and contractors that capture all of it on site, offline if needed, and send it to the office automatically.",
      ],
      sections: [
        {
          heading: "Built for site conditions",
          body: [
            "Large buttons for gloved hands, high contrast for direct sunlight, and offline storage for basements and new estates with poor reception. Photos are timestamped and located, so evidence for variations and defects is never in doubt.",
            "Our native strength is Android, which suits company-issued rugged phones and tablets. If subcontractors need the app on their own iPhones, we scope a React Native build separately. We don't take on native iOS work.",
          ],
        },
        {
          heading: "Into the office without retyping",
          body: [
            "Diaries, checklists and timesheets sync to your job system or a simple web dashboard, so supervisors and the office see the same information on the same day.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We can't prove what happened on site when there's a dispute",
          cause: "Diaries are incomplete and photos are scattered across personal phones.",
          steps: [
            "Capture daily diaries with timestamped photos in one app",
            "Store records against the job automatically",
            "Make them searchable from the office",
          ],
        },
        {
          symptom: "Timesheets arrive late and wrong",
          cause: "Hours are written down at the end of the week from memory.",
          steps: [
            "Clock on and off by job in the app",
            "Let supervisors approve hours daily",
            "Send approved hours to payroll automatically",
          ],
        },
      ],
      checklist: [
        "Site diaries are completed every day",
        "Variation photos are stored with the job, not on personal phones",
        "Safety checklists are completed before work starts",
        "Timesheets are approved weekly without chasing",
      ],
      faqs: [
        {
          question: "Will the app work without reception?",
          answer: "Yes. Everything is saved on the device and synced when a connection returns.",
        },
        {
          question: "Couldn't we use an off-the-shelf construction app?",
          answer: "Often, yes, and we will say so if one fits. Custom apps make sense when your process differs from the off-the-shelf options or you need them to connect with your own systems.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Brisbane — Rank Across Logan, Ipswich & Moreton Bay",
      metaDescription:
        "Local SEO for Brisbane businesses serving a spread-out city: service-area set-up, regional pages and reviews that get you found beyond your own suburb.",
      h1: "SEO for Brisbane businesses that work across the whole of South East Queensland",
      card: "Local SEO that reaches beyond the suburb you're based in.",
      intro: [
        "Brisbane is spread out. A business in Logan, Ipswich, Moreton Bay or the Redlands is competing in a different local search from one in the inner city, and Google strongly favours businesses close to the person searching. Many service businesses work across the whole region but only show up near their base.",
        "We plan SEO around the areas you actually serve: service-area settings in your Google profile, a genuinely useful page for each region you want more work in, and reviews from customers in those areas.",
      ],
      sections: [
        {
          heading: "Reaching beyond your base",
          body: [
            "You cannot move your address, but you can give Google strong evidence that you serve other areas: a page for each region describing the work you do there, projects completed there, and reviews from customers who live there. That evidence builds over months, so we focus on the regions where you want work most.",
          ],
        },
        {
          heading: "Growing with the city",
          body: [
            "New estates in places like Springfield, North Lakes and Ripley are full of homeowners searching for builders, landscapers, solar installers and cleaners for the first time. Early visibility in growth areas pays back for years.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We rank near our yard and nowhere else",
          cause: "Google sees only your address, with no strong evidence that you serve the wider region.",
          steps: [
            "Set your profile's service area to the regions you cover",
            "Create a page for each region with real local projects",
            "Ask customers in those regions for reviews",
          ],
        },
        {
          symptom: "Our area pages don't rank at all",
          cause: "They are copies of each other with the suburb name changed, which Google ignores.",
          steps: [
            "Rewrite each page around work actually done in that area",
            "Add local projects, photos and reviews",
            "Merge areas where you have nothing specific to say",
          ],
        },
      ],
      checklist: [
        "Your Google profile's service area matches where you work",
        "Each region you want work in has its own useful page",
        "You have reviews from customers outside your own suburb",
        "You know where you rank in Logan, Ipswich and Moreton Bay",
      ],
      faqs: [
        {
          question: "Can we rank in suburbs where we don't have an office?",
          answer: "In the organic results, yes, with genuinely useful area pages. In the map pack it is harder, because distance matters most. We set expectations for both.",
        },
        {
          question: "Should we open more Google Business Profiles?",
          answer: "Only for real staffed locations. Profiles for virtual offices break Google's rules and can be suspended.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Brisbane — Own Your Leads Instead of Renting Them",
      metaDescription:
        "Google Ads management for Brisbane trades and services: stop paying for shared leads, run targeted search campaigns and track cost per won job.",
      h1: "Google Ads for Brisbane trades tired of paying for shared leads",
      card: "Search campaigns that compete with lead sites on cost per job.",
      intro: [
        "Many Brisbane trades rely on lead sites like hipages or Oneflare. They are handy for filling gaps, but the same lead often goes to several businesses, so you pay to compete on price for a job you may never win.",
        "A well-run Google Ads campaign sends people straight to you instead. We manage campaigns for Brisbane trades and service businesses focused on the jobs worth having, and we measure cost per won job, not per click.",
      ],
      sections: [
        {
          heading: "Focus on the high-value jobs",
          body: [
            "Not every job is worth advertising for. We build campaigns around your most profitable work, such as switchboard upgrades, full bathroom renovations or commercial maintenance contracts, and leave small jobs to word of mouth.",
          ],
        },
        {
          heading: "Measure the jobs, not the clicks",
          body: [
            "We track calls and quote requests from ads, and with your help connect them to jobs won. Then you can compare Google Ads with lead sites on what matters: what each won job cost.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We tried Google Ads and only got price shoppers",
          cause: "Broad keywords like \"cheap\" and \"quote\" attract people comparing on price.",
          steps: [
            "Add negative keywords for price-shopping searches",
            "Target specific job types that need expertise",
            "Write ads that lead with quality and guarantees, not price",
          ],
        },
        {
          symptom: "We don't know which leads came from ads",
          cause: "Calls go to the same mobile number as everything else.",
          steps: [
            "Use a tracking number for ad calls",
            "Record each enquiry's source in your job system",
            "Review cost per won job monthly",
          ],
        },
      ],
      checklist: [
        "You know your cost per won job from each lead source",
        "Your ads exclude searches for cheap or DIY work",
        "Ad calls are tracked separately",
        "Your campaigns focus on your most profitable job types",
      ],
      faqs: [
        {
          question: "Should we stop using lead sites?",
          answer: "Not necessarily. Many businesses keep them for quiet periods. Measure cost per won job from each source and shift budget towards what wins work.",
        },
        {
          question: "How much should a trade spend?",
          answer: "Enough to get steady data on your main job types. We estimate click costs for your keywords and suggest a starting budget during scoping.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Brisbane — Builders, Property & Local Services",
      metaDescription:
        "Social media marketing for Brisbane builders, agents and local services: project progress videos, community reach on Facebook and ads aimed at your areas.",
      h1: "Social media for Brisbane builders and agents who have great work to show",
      card: "Project videos, community reach and ads aimed at your areas.",
      intro: [
        "Brisbane builders, renovators and agents create great social content every week without realising: a slab poured, a kitchen finished, a before-and-after, a sold sign. Most of it stays on someone's phone.",
        "We turn that work into a steady stream of posts and short videos, use Facebook's community reach across the suburbs you serve, and put modest paid budget behind the content that brings enquiries.",
      ],
      sections: [
        {
          heading: "Progress is content",
          body: [
            "A project filmed from start to finish, with a quick clip every week, makes some of the most effective content a builder can post. We give your site supervisors a simple shot list and edit the clips into before-and-afters, walkthroughs and finished reveals.",
          ],
        },
        {
          heading: "Facebook still matters here",
          body: [
            "For local services across Brisbane's suburbs, Facebook community groups and local ads still drive enquiries. We focus your paid reach on the suburbs and estates you want work in, rather than the whole city.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We do great work but our social pages are empty",
          cause: "Nobody has time to film, edit and post during busy weeks.",
          steps: [
            "Give site teams a weekly shot list",
            "Let us edit and schedule the posts",
            "Turn finished projects into case-study posts",
          ],
        },
        {
          symptom: "Our ads reach people outside our service area",
          cause: "Targeting is set to all of Brisbane, or by interest alone.",
          steps: [
            "Target ads by the suburbs and estates you serve",
            "Use project videos from those areas",
            "Track enquiries from each campaign",
          ],
        },
      ],
      checklist: [
        "You posted a project photo or video this week",
        "Your social ads target the suburbs you serve",
        "Your posts link to a quote form or appraisal request",
        "You can see which posts led to enquiries",
      ],
      faqs: [
        {
          question: "Do we need to be on TikTok?",
          answer: "Not necessarily. For Brisbane builders and local services, Facebook and Instagram usually bring more enquiries. For lifestyle brands, TikTok can be worth testing.",
        },
        {
          question: "Can you post for multiple brands or branches?",
          answer: "Yes. We plan content for each brand or branch separately, with targeting for its own area.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Brisbane — Reply to Every Quote Request in Minutes",
      metaDescription:
        "AI automation for Brisbane trades and contractors: instant quote-request replies, site visit booking, job summaries and tender document checks, with a person in control.",
      h1: "AI automation for Brisbane trades who lose jobs to whoever replies first",
      card: "Instant replies to quote requests and tidy job summaries.",
      intro: [
        "Busy Brisbane trades lose work to slow replies. The owner is on the tools all day, the quote request sits until evening, and by then the customer has booked whoever called back first.",
        "We build automation that replies within minutes with the right questions, lets the customer upload photos and book a site visit, and hands you a tidy summary to price when you get a moment.",
      ],
      sections: [
        {
          heading: "The first reply, done for you",
          body: [
            "When a quote request comes in, the customer gets an immediate, useful reply: what happens next, a few questions about the job, a link to upload photos and available site-visit times. AI reads their answers and photos and writes a short job summary for you.",
            "Nothing is priced or promised automatically. You stay in charge of the quote. The automation just makes sure the customer isn't left waiting.",
          ],
        },
        {
          heading: "Tenders and documents",
          body: [
            "For commercial contractors, AI can read tender documents and pull out requirements, dates, insurances and obligations into a checklist your estimator reviews, rather than reading hundreds of pages from scratch.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Quote requests sit until the evening",
          cause: "Nobody is free to reply during the working day.",
          steps: [
            "Send an instant reply with questions and photo upload",
            "Offer site-visit times automatically",
            "Summarise each request for the owner",
          ],
        },
        {
          symptom: "Reading tender documents takes our estimator days",
          cause: "Requirements are buried in long documents in different formats.",
          steps: [
            "Extract requirements and dates into a checklist",
            "Flag unusual clauses for a closer look",
            "Have the estimator review instead of reading everything",
          ],
        },
      ],
      checklist: [
        "Every quote request gets a reply within an hour",
        "Customers can send photos before a site visit",
        "Site visits can be booked without phone tag",
        "Tender requirements are tracked in a checklist",
      ],
      faqs: [
        {
          question: "Will customers know they're talking to an automation?",
          answer: "Yes. We write replies that are clearly from your business and say what happens next, without pretending to be a person.",
        },
        {
          question: "Does it work with our job management software?",
          answer: "Usually. We connect to systems like ServiceM8, simPRO and Tradify where their APIs allow.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Brisbane — Job Systems for Growing Contractors",
      metaDescription:
        "Custom software for Brisbane contractors outgrowing spreadsheets: quotes, variations, scheduling and timesheets in one system connected to Xero.",
      h1: "Custom software for Brisbane contractors who've outgrown spreadsheets",
      card: "Quotes, variations, scheduling and timesheets in one system.",
      intro: [
        "Growing Brisbane contractors often hit the same wall. Jobs, quotes, variations, schedules and timesheets are spread across spreadsheets, messaging apps and someone's head. It worked at five staff. At fifteen it causes missed variations, double-booked crews and invoices that go out weeks late.",
        "We help you fix it, with an existing job management system where one fits, or custom software where your process is different enough that off-the-shelf tools get in the way.",
      ],
      sections: [
        {
          heading: "Off-the-shelf first, custom where it counts",
          body: [
            "Tools like ServiceM8, simPRO, Tradify and Fergus suit many trades. We will recommend one if it fits your work. Custom software makes sense when your quoting, scheduling or reporting is genuinely different, or when you need several systems tied together.",
          ],
        },
        {
          heading: "Variations get billed",
          body: [
            "Unbilled variations are one of the biggest leaks in contracting. A good system records each variation on site with photos and customer approval, and adds it to the next invoice automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Variations get done but never invoiced",
          cause: "They are agreed verbally on site and never recorded properly.",
          steps: [
            "Record variations in the field with photos and approval",
            "Link them to the job automatically",
            "Add approved variations to the next invoice",
          ],
        },
        {
          symptom: "Crews get double-booked",
          cause: "Scheduling lives in a spreadsheet that only one person updates.",
          steps: [
            "Move scheduling into a shared calendar by crew",
            "Show clashes before a job is confirmed",
            "Send crews their schedule on their phones",
          ],
        },
      ],
      checklist: [
        "Every variation is recorded with customer approval",
        "Crew schedules are visible to the whole team",
        "Invoices go out within a week of job completion",
        "Quotes are built from a price list, not from scratch",
      ],
      faqs: [
        {
          question: "Should we build custom or buy a job management app?",
          answer: "Buy if one fits; it's cheaper. Build when your process genuinely differs or you need to connect several systems. We give you an honest comparison during scoping.",
        },
        {
          question: "Can you move our data out of spreadsheets?",
          answer: "Yes. We clean and import existing customers, jobs and price lists as part of the project.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "api-integration": {
      metaTitle: "API Integration in Brisbane — Connect Job Systems, Xero & Your Site",
      metaDescription:
        "API integration for Brisbane trades and service businesses: connect ServiceM8, simPRO or Tradify with Xero, your CRM and your website forms.",
      h1: "API integration for Brisbane service businesses with a job system that stands alone",
      card: "Connect job management, Xero, CRM and website forms.",
      intro: [
        "Brisbane service businesses often run a job management system, Xero, a CRM, a website and a booking tool that do not talk to each other. Someone copies customer details from one to the next, and mistakes creep in at every step.",
        "We connect them so a website enquiry becomes a job, a completed job becomes an invoice, and a paid invoice updates the CRM.",
      ],
      sections: [
        {
          heading: "From enquiry to paid invoice",
          body: [
            "We map how information should flow from the first enquiry to the final payment, then connect each step. Ready-made connectors are used where they work, and small custom integrations where they don't.",
          ],
        },
        {
          heading: "Integrations that report problems",
          body: [
            "Every integration logs what it did and alerts someone if a step fails, so a broken connection is fixed the same day instead of discovered at the end of the quarter.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Website enquiries are typed into the job system by hand",
          cause: "The website form only sends an email.",
          steps: [
            "Send form submissions straight into the job system",
            "Attach photos and details from the form",
            "Notify the right person instantly",
          ],
        },
        {
          symptom: "Invoices in Xero don't match completed jobs",
          cause: "Jobs and invoices are created separately and drift apart.",
          steps: [
            "Create invoices from completed jobs automatically",
            "Sync payments back to the job record",
            "Report jobs completed but not invoiced",
          ],
        },
      ],
      checklist: [
        "Website enquiries land in your job system automatically",
        "Completed jobs create invoices without retyping",
        "Payments in Xero update the job status",
        "You can list jobs that are done but not invoiced",
      ],
      faqs: [
        {
          question: "Which job systems can you connect?",
          answer: "Most with an API, including ServiceM8, simPRO, Tradify and Fergus. We check your plan's API access before quoting.",
        },
        {
          question: "Is Zapier good enough?",
          answer: "For simple flows, often yes. For high volumes or complex logic, custom code is more reliable and cheaper over time.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Brisbane — Hosting for Image-Heavy Sites",
      metaDescription:
        "Cloud hosting for Brisbane property, construction and media sites: fast image delivery, Australian data regions, backups and predictable costs.",
      h1: "Cloud hosting for Brisbane sites full of photos, plans and video",
      card: "Fast hosting for image-heavy sites, in Australian regions.",
      intro: [
        "Brisbane property, construction and design businesses run sites full of large photos, floor plans, renders and video. On basic hosting, those sites are slow, and slow sites lose enquiries and rankings.",
        "We set up hosting that serves heavy media quickly, through image optimisation and a CDN, with Australian data regions, automatic backups and costs that stay predictable.",
      ],
      sections: [
        {
          heading: "Images that load fast",
          body: [
            "Images are resized and converted to modern formats automatically, then served from a CDN close to each visitor. Video is streamed rather than downloaded in full. The result is a site that looks just as good and loads in a fraction of the time.",
          ],
        },
        {
          heading: "Backups and documents",
          body: [
            "Project files, plans and documents are stored in Australian regions with versioning and backups, so nothing is lost when a file is overwritten or a laptop fails.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our gallery pages take ages to load",
          cause: "Full-size photos are served to every visitor, from a single server.",
          steps: [
            "Resize and compress images automatically",
            "Serve them through a CDN",
            "Lazy-load images below the fold",
          ],
        },
        {
          symptom: "Project files are scattered across laptops and inboxes",
          cause: "There is no central, backed-up storage for documents.",
          steps: [
            "Set up cloud storage with folders by project",
            "Turn on versioning and backups",
            "Control access by role",
          ],
        },
      ],
      checklist: [
        "Your largest gallery page loads in under three seconds on mobile",
        "Images are served through a CDN",
        "Project files are backed up automatically",
        "You know where your data is stored",
      ],
      faqs: [
        {
          question: "Can our data stay in Australia?",
          answer: "Yes. AWS, Azure and Google Cloud all have Australian regions, and we host there when you need it.",
        },
        {
          question: "Will cloud hosting cost more than what we have?",
          answer: "Sometimes slightly more, sometimes less. We estimate monthly costs up front and set budget alerts.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Brisbane — Keep Your Projects Page Current",
      metaDescription:
        "Website maintenance for Brisbane builders and service businesses: new projects added, software updated, backups and monitoring, with one person to message.",
      h1: "Website maintenance for Brisbane businesses too busy on the tools to update the site",
      card: "New projects added, updates and backups handled for you.",
      intro: [
        "A builder's or trade's website is only as convincing as its most recent project. When the newest job on the site is from three years ago, customers assume the business has slowed down, even when it's busier than ever.",
        "Our maintenance plans keep your site current, with new projects, reviews and services added when you send them, alongside the technical upkeep: updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "Send photos, we post the project",
          body: [
            "Send us a few photos and a line about the job by WhatsApp. We write it up, add it to the right gallery and share the link back. Your site stays current without you sitting at a computer.",
          ],
        },
        {
          heading: "The upkeep behind it",
          body: [
            "Software updates tested before going live, security monitoring, daily backups kept off the server and alerts if the site goes down. Each month you get a short note of what was done.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our newest project online is years old",
          cause: "Adding projects is nobody's job, and the team is always on site.",
          steps: [
            "Send us photos by WhatsApp after each job",
            "We write and post the project the same week",
            "Share it on social at the same time",
          ],
        },
        {
          symptom: "Our site broke after an update and nobody could fix it",
          cause: "Updates were applied straight to the live site without a backup.",
          steps: [
            "Restore from the most recent backup",
            "Test future updates on a copy first",
            "Keep daily off-site backups",
          ],
        },
      ],
      checklist: [
        "Your newest project on the site is from the last three months",
        "Your site's software was updated this month",
        "You have a backup from the last 24 hours",
        "You would know within minutes if the site went down",
      ],
      faqs: [
        {
          question: "Can you maintain a site we built ourselves on Wix or Squarespace?",
          answer: "Yes, for content updates. Those platforms handle hosting and security themselves, so the plan focuses on keeping content current.",
        },
        {
          question: "How quickly are changes made?",
          answer: "Within one working day for routine changes, and immediately during our hours if the site is down.",
        },
      ],
    },
  },
}
