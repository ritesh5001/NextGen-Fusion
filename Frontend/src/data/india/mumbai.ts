import type { InCity } from "./types"

export const mumbai: InCity = {
  slug: "mumbai",
  name: "Mumbai",
  state: "Maharashtra",
  stateCode: "MH",
  office: "Mumbai",
  summary: "Our Mahim office's home market: finance, media, D2C brands and traders who move fast and expect the same.",
  areas: ["Mahim", "Dadar", "Bandra", "Andheri", "Lower Parel", "BKC", "Powai", "Goregaon", "Malad", "Borivali", "Fort", "Thane", "Navi Mumbai", "Vashi"],
  nearby: ["pune", "surat", "ahmedabad"],
  page: {
    metaTitle: "Digital Agency in Mumbai — Websites, Apps, Ads & Automation",
    metaDescription:
      "A Mumbai digital agency with an office in Mahim: websites, Shopify, apps, Google Ads, social media and automation for Mumbai brands, firms and traders.",
    h1: "A digital team in Mahim for Mumbai businesses that move fast",
    intro: [
      "Mumbai doesn't wait. Brands launch drops on a Friday, CA firms juggle hundreds of clients at year end, traders in Dadar and Masjid Bunder take orders from across the country, and everyone expects replies in minutes. Your website, store and systems have to keep up.",
      "Our Mumbai office is in Mahim, near the railway station, so you can meet us by appointment. We build websites, stores and apps, run Google Ads and social media, and automate the admin that slows Mumbai businesses down.",
    ],
    sections: [
      {
        heading: "An office you can visit",
        body: [
          "Many Mumbai clients want one meeting in person before committing a budget. Our office is at Banwari Compound, Mahim (E), close to Mahim station on the Western line and a short trip from Dadar on the Central line. After that, most projects run on WhatsApp and short calls, because nobody in Mumbai wants to cross the city for a status update.",
        ],
        links: [{ label: "Contact the Mumbai office", href: "/contact/" }],
      },
      {
        heading: "What Mumbai clients usually need first",
        body: [
          "For brands, it's usually conversion and repeat orders: a faster store, fewer abandoned carts, better use of WhatsApp. For firms and traders, it's systems: leads, orders and invoices in one place instead of across Excel, Tally and fifty chats.",
        ],
      },
    ],
    industries: [
      { name: "D2C and fashion brands", need: "Brands need fast Shopify stores, COD control, Instagram that sells and a reason for customers to come back." },
      { name: "Finance, CA and legal firms", need: "Firms need credible websites, client portals and document workflows that cut year-end chaos." },
      { name: "Traders and distributors", need: "Dadar, Masjid Bunder and Bhiwandi businesses need B2B ordering, catalogues and Tally integration." },
      { name: "Media, events and hospitality", need: "Studios, venues and restaurants need bookings, portfolios and social content that keeps up with the city." },
    ],
    problems: [
      {
        service: "shopify-development",
        symptom: "Our Shopify store slows down on launch days",
        cause: "Too many apps and heavy images on a theme that was never meant for drops.",
        steps: [
          "Remove apps the theme can replace",
          "Compress images and trim scripts",
          "Test the store before the next launch",
        ],
      },
      {
        service: "software-development",
        symptom: "Year end is chaos for our CA firm",
        cause: "Client documents arrive on WhatsApp and email with no tracking.",
        steps: [
          "Give clients a portal to upload documents",
          "Track what's pending for each client",
          "Send automatic reminders",
        ],
      },
      {
        service: "api-integration",
        symptom: "Orders are typed into Tally every evening",
        cause: "The website, marketplaces and Tally aren't connected.",
        steps: [
          "Map orders and GST with your accountant",
          "Sync orders and invoices automatically",
          "Flag anything that doesn't match",
        ],
      },
      {
        service: "social-media-marketing",
        symptom: "We post daily but Instagram doesn't bring orders",
        cause: "Posts build awareness but give viewers no easy next step.",
        steps: [
          "Use click-to-WhatsApp ads for offers",
          "Plan Reels around launches and real moments",
          "Track sales from social",
        ],
      },
      {
        service: "google-ads",
        symptom: "Google Ads clicks in Mumbai are expensive and leads are poor",
        cause: "Broad targeting across the whole metro and landing pages that don't match the ad.",
        steps: [
          "Narrow targeting to the suburbs you serve",
          "Block irrelevant searches",
          "Send each ad to a matching page",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Our team answers the same WhatsApp questions all day",
        cause: "Size, price, delivery and order-status questions are handled one chat at a time.",
        steps: [
          "Answer common questions instantly",
          "Send order updates automatically",
          "Hand complex chats to your team",
        ],
      },
    ],
    faqs: [
      {
        question: "Where is your Mumbai office?",
        answer: "GNM/95/347, Ground Floor, Banwari Compound, Mahim (E), near Mahim railway station. Meetings are by appointment.",
      },
      {
        question: "Do you work with businesses in Thane and Navi Mumbai?",
        answer: "Yes, across the Mumbai Metropolitan Region, including Thane, Navi Mumbai and Bhiwandi.",
      },
      {
        question: "Do you have pages for website development and SEO in Mumbai?",
        answer: "Yes. Website development, SEO and ecommerce in Mumbai have their own detailed pages, linked in the services list on this page.",
      },
      {
        question: "What are your payment terms?",
        answer: "50% to start and the balance at the agreed milestone, with a fixed written quote before any work begins.",
      },
    ],
  },
  services: {
    "website-development": {
      existingPath: "/website-development-company-in-mumbai/",
      card: "Our detailed Mumbai website development page, with process and pricing factors.",
    },
    seo: {
      existingPath: "/seo-services-in-mumbai/",
      card: "Our Mumbai SEO page: local search, content and technical SEO in detail.",
    },
    "ecommerce-development": {
      existingPath: "/ecommerce-development-company-in-mumbai/",
      card: "Our Mumbai ecommerce page: online stores, payments, shipping and support.",
    },
    "web-design": {
      metaTitle: "Web Design Company in Mumbai — Design for Brands That Get Compared",
      metaDescription:
        "Web design in Mumbai for brands, studios and firms: design built around your real work and photography, with clear paths to enquire, book or buy.",
      h1: "Web design for Mumbai brands that get compared with the best",
      card: "Design that holds its own next to Mumbai's best-known brands.",
      intro: [
        "Mumbai customers see the best design in the country every day, from big consumer brands to agencies in Bandra and Lower Parel. A dated or generic site makes even an excellent business look second-rate here.",
        "We design sites around your real work, photography and voice, with layouts that make it easy to enquire, book or buy. You can review designs with us in person at our Mahim office if you prefer.",
      ],
      sections: [
        {
          heading: "Design that sells, not decorates",
          body: [
            "We start from what the site has to achieve, such as bookings, enquiries or orders, and design every page so that action is obvious on a phone. Visual style follows, built on your brand rather than a theme's defaults.",
          ],
        },
        {
          heading: "Studios, firms and brands",
          body: [
            "A production house needs a showreel-led portfolio. A CA firm needs calm credibility and clear services. A fashion label needs product imagery front and centre. We design for what your customers come to see.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site looks dated next to competitors",
          cause: "A template from years ago with stock imagery.",
          steps: [
            "Redesign around your real work and photos",
            "Simplify navigation to what customers need",
            "Make the next step clear on every page",
          ],
        },
        {
          symptom: "Visitors admire the site but don't enquire",
          cause: "Style was prioritised over clear actions.",
          steps: [
            "Keep the look, make actions visible",
            "Add WhatsApp and booking buttons",
            "Test with real users on phones",
          ],
        },
      ],
      checklist: [
        "Your site uses your own imagery",
        "The main action is visible without scrolling",
        "Design works on mid-range phones",
        "Text contrast is easy to read",
      ],
      faqs: [
        {
          question: "Can we review designs in person?",
          answer: "Yes, at our Mahim office by appointment, or on a video call.",
        },
        {
          question: "Can you work from our agency's brand guidelines?",
          answer: "Yes. We build within your brand and flag anything that would hurt speed or usability.",
        },
      ],
      caseStudies: ["tatvivahtrends", "kalamohini"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development Agency in Mumbai — Stores for D2C Brands",
      metaDescription:
        "Shopify developers in Mumbai for D2C brands: fast themes, launch-day stability, COD confirmation, Razorpay and Shiprocket, and flows that bring repeat orders.",
      h1: "Shopify development for Mumbai D2C brands that launch in drops",
      card: "Fast Shopify stores that hold up on launch day and earn repeat orders.",
      intro: [
        "Mumbai is home to a large share of India's D2C brands, in fashion, beauty, food and lifestyle, and most of them run on Shopify. Many launch in drops, get a rush of traffic from Instagram, and then fight COD returns and one-time buyers.",
        "We build and tune Shopify stores for that pattern: themes that stay fast under load, Indian payments and COD control, and the WhatsApp and email flows that bring the second order.",
      ],
      sections: [
        {
          heading: "Launch days without crashes",
          body: [
            "Shopify's servers cope; heavy themes and stacked apps don't. Before a drop we trim scripts, compress images and test the pages everyone will hit first, so the store stays fast when it matters.",
          ],
        },
        {
          heading: "The second order",
          body: [
            "Post-purchase WhatsApp and email flows, reviews, loyalty and win-back campaigns turn first-time buyers into repeat customers, which is where most brand profit comes from.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers buy once and never come back",
          cause: "There's no follow-up after the first order.",
          steps: [
            "Send post-purchase WhatsApp and email sequences",
            "Ask for reviews with photos",
            "Run win-back offers for lapsed buyers",
          ],
        },
        {
          symptom: "COD returns are eating our margin",
          cause: "COD orders ship without confirmation.",
          steps: [
            "Confirm COD orders on WhatsApp",
            "Offer prepaid discounts",
            "Block COD on high-RTO pin codes",
          ],
        },
      ],
      checklist: [
        "Your store was tested before your last launch",
        "COD orders are confirmed before shipping",
        "New customers receive post-purchase messages",
        "You know your repeat purchase rate",
      ],
      faqs: [
        {
          question: "Can you work on our existing store?",
          answer: "Yes. Most of our Shopify work is improving existing stores. We start with an audit.",
        },
        {
          question: "Do you set up WhatsApp marketing?",
          answer: "Yes, through the WhatsApp Business API, with consent and opt-out handled properly.",
        },
      ],
      caseStudies: ["clickngreet", "mahhika"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Mumbai — Multi-Vendor & Services Platforms",
      metaDescription:
        "Marketplace development in Mumbai: multi-vendor stores, services and booking platforms with vendor onboarding, split payouts, commissions and admin tools.",
      h1: "Marketplace development for Mumbai founders building two-sided platforms",
      card: "Multi-vendor, services and booking platforms with split payouts.",
      intro: [
        "Mumbai founders build marketplaces for everything: home services, fashion resale, B2B supplies, event vendors, freelancers. The idea is rarely the hard part. The hard part is getting both sides to show up and keeping quality high once they do.",
        "We build marketplaces that launch with the core transaction and grow with real usage: vendor onboarding, listings, bookings or orders, split payouts and admin. We built TatVivah Trends and MariBiz.ai, so we know where these projects get difficult.",
      ],
      sections: [
        {
          heading: "Start narrow",
          body: [
            "A marketplace in Mumbai usually works best starting with one category in a few areas, such as one suburb cluster or one vendor type, and building density before adding features.",
          ],
        },
        {
          heading: "Money flows automatically",
          body: [
            "Razorpay Route or Cashfree splits payments between vendors and your platform, commission and GST on commission are invoiced per order, and vendors see their payouts. Plan TCS and GST registration with your CA early.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We're managing the marketplace on WhatsApp groups",
          cause: "Demand is proven, but every order goes through the founders.",
          steps: [
            "Move listings and orders onto a platform",
            "Automate payments and payouts",
            "Add reviews and vendor tools next",
          ],
        },
        {
          symptom: "Vendor quality is inconsistent",
          cause: "Anyone can list, with no review.",
          steps: [
            "Approve vendors before they go live",
            "Set listing standards",
            "Use reviews to remove poor vendors",
          ],
        },
      ],
      checklist: [
        "The core transaction is clear in a single sentence",
        "Vendors are approved before going live",
        "Payouts are automatic",
        "You've discussed TCS and GST with your CA",
      ],
      faqs: [
        {
          question: "How long does a first version take?",
          answer: "Usually ten to sixteen weeks, depending on scope.",
        },
        {
          question: "Do we own the code?",
          answer: "Yes, from day one, along with the gateway and hosting accounts.",
        },
      ],
      caseStudies: ["tatvivahtrends", "maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development Company in Mumbai — Fast Sites for Startups & Fintech",
      metaDescription:
        "Next.js developers in Mumbai for startups, fintech and media: fast, secure web apps and marketing sites on code you own, with a team you can meet in Mahim.",
      h1: "Next.js development for Mumbai startups, fintech and media",
      card: "Fast, secure Next.js products and sites for startups and fintech.",
      intro: [
        "Mumbai's startups, fintech firms and media businesses need sites and products that are fast, secure and able to grow: a marketing site that ranks, a dashboard customers trust and an app that holds up on a busy day.",
        "We build those in Next.js, on code your company owns, with a team you can meet at our Mahim office.",
      ],
      sections: [
        {
          heading: "Security and trust",
          body: [
            "For finance-adjacent products, we build with secure authentication, role-based access, audit logs and data hosted in Indian regions. We're not a regulated entity ourselves, so compliance decisions stay with your team and advisers.",
          ],
        },
        {
          heading: "Media and content at scale",
          body: [
            "Media and publishing sites with thousands of articles, galleries and videos stay fast with pre-rendering and a CDN, and editors publish without waiting for a developer.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our MVP needs to become a real product",
          cause: "It was built fast to prove the idea, without the foundations to grow.",
          steps: [
            "Review the code and architecture",
            "Rebuild the weak parts on solid foundations",
            "Add tests and a staging environment",
          ],
        },
        {
          symptom: "Our content site is slow and hard to update",
          cause: "An overloaded CMS and plugins.",
          steps: [
            "Move to Next.js with a headless CMS",
            "Pre-render and cache pages",
            "Train editors on the new workflow",
          ],
        },
      ],
      checklist: [
        "Your code is in your company's repository",
        "There's a staging environment",
        "User data is hosted in India",
        "Pages pass Core Web Vitals",
      ],
      faqs: [
        {
          question: "Can you work with our in-house developers?",
          answer: "Yes, in your repository and following your review process.",
        },
        {
          question: "Can we meet in person?",
          answer: "Yes, at our Mahim office by appointment.",
        },
      ],
      caseStudies: ["nextmentor", "maribiz-ai"],
    },
    "android-app-development": {
      metaTitle: "Android App Development Company in Mumbai — Apps for Brands & Teams",
      metaDescription:
        "Android app development in Mumbai: native Kotlin apps for distributors, delivery teams and brands, built for the phones Mumbai actually uses.",
      h1: "Android apps for Mumbai distributors, delivery teams and brands",
      card: "Native Android apps for distribution, delivery and loyalty.",
      intro: [
        "Mumbai runs on movement: distributors supplying shops across the city, delivery staff criss-crossing suburbs and brands wanting customers to reorder with one tap. Most of those people use Android phones.",
        "We build native Android apps in Kotlin for field and delivery teams, and for brands whose customers order often enough to install an app.",
      ],
      sections: [
        {
          heading: "Field and delivery apps",
          body: [
            "Delivery staff see their route, capture proof of delivery and collect COD with records. Sales staff take orders at each shop and sync to the office. Everything works when the network drops in a basement or a local train.",
          ],
        },
        {
          heading: "Customer apps, only where they make sense",
          body: [
            "A customer app is worth it when people order weekly or more. Otherwise a fast mobile site does the job. For iPhone users, we scope React Native separately; we don't do native iOS.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We don't know if deliveries were actually made",
          cause: "Proof of delivery is a signature on paper or a phone call.",
          steps: [
            "Capture photo and OTP proof of delivery",
            "Record COD collected per order",
            "Show deliveries live to the office",
          ],
        },
        {
          symptom: "Customers want to reorder but find it hard",
          cause: "Reordering means messaging and waiting.",
          steps: [
            "Let customers reorder past orders in one tap",
            "Send order updates by notification",
            "Offer saved addresses and UPI",
          ],
        },
      ],
      checklist: [
        "Deliveries have photo or OTP proof",
        "Field apps work offline",
        "Customers can reorder in one tap",
        "The app runs well on budget phones",
      ],
      faqs: [
        {
          question: "Do you build iPhone apps?",
          answer: "Not natively. For both platforms, we scope a React Native build separately.",
        },
        {
          question: "Can the app connect to our ERP or Tally?",
          answer: "Yes, through APIs or connectors.",
        },
      ],
    },
    "google-ads": {
      metaTitle: "Google Ads Agency in Mumbai — PPC Built for Expensive Clicks",
      metaDescription:
        "Google Ads management in Mumbai: suburb-level targeting, negative keywords, Shopping campaigns for brands and tracking of calls and WhatsApp leads.",
      h1: "Google Ads for Mumbai businesses where every click costs more",
      card: "Suburb-level targeting and tracking for expensive Mumbai clicks.",
      intro: [
        "Clicks in Mumbai cost more than in most Indian cities, and the metro is huge. A campaign targeting \"Mumbai\" shows ads in Virar to a business that only serves South Mumbai. Waste adds up fast.",
        "We manage Google Ads for Mumbai businesses with suburb-level targeting, strong negative keywords, Shopping campaigns for brands and tracking of real calls and WhatsApp leads.",
      ],
      sections: [
        {
          heading: "Target the suburbs you serve",
          body: [
            "Mumbai is a chain of separate markets. We target the suburbs and pin codes you actually serve, use presence-only location settings and schedule ads for the hours you can answer.",
          ],
        },
        {
          heading: "Shopping for brands",
          body: [
            "For D2C brands, Shopping and Performance Max run on your product feed. We clean the feed first, then split campaigns by margin so ad spend follows profit.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Leads come from areas we don't serve",
          cause: "Targeting covers all of Mumbai and nearby.",
          steps: [
            "Target specific suburbs or pin codes",
            "Use presence-only location settings",
            "Exclude areas you don't serve",
          ],
        },
        {
          symptom: "Performance Max spends but we can't see where",
          cause: "Automated campaigns without guidance or exclusions.",
          steps: [
            "Separate brand searches",
            "Group products by margin",
            "Review placements and add exclusions",
          ],
        },
      ],
      checklist: [
        "Ads target only the suburbs you serve",
        "Your product feed has no errors",
        "Calls and WhatsApp leads are tracked",
        "You know your cost per real lead or sale",
      ],
      faqs: [
        {
          question: "What budget do Mumbai businesses need?",
          answer: "It varies by industry. We estimate click costs and suggest a starting budget during scoping.",
        },
        {
          question: "Do we keep the account if we stop?",
          answer: "Yes. The account is always in your company's name.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing Agency in Mumbai — Reels, Creators & Meta Ads",
      metaDescription:
        "Social media marketing in Mumbai for D2C brands, restaurants and studios: Reels from real moments, creator tie-ups and Meta ads that bring orders.",
      h1: "Social media for Mumbai brands competing in India's busiest feed",
      card: "Reels, creator tie-ups and Meta ads aimed at orders.",
      intro: [
        "Mumbai's Instagram feed is crowded with brands, cafés, studios and creators. Standing out takes consistent, real content and paid reach aimed at people who actually buy, not just more posts.",
        "We plan content around what your business really does, help you collaborate with Mumbai creators, and run Meta ads with tracking to orders and bookings.",
      ],
      sections: [
        {
          heading: "Content from what you already do",
          body: [
            "New collections, kitchen moments, studio sessions, behind the scenes. Your team films short clips from a weekly shot list; we edit, caption and schedule. Consistency beats production value.",
          ],
        },
        {
          heading: "Creators who actually move product",
          body: [
            "We choose creators by audience fit and past engagement, not follower count, and give each a trackable link or code so you see sales, not just views. Every post follows ASCI's disclosure rules.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Creator campaigns brought views but no sales",
          cause: "Creators were picked on reach, with no tracking.",
          steps: [
            "Pick creators whose audience matches your buyers",
            "Use unique codes or links",
            "Measure orders per creator",
          ],
        },
        {
          symptom: "Our content looks like everyone else's",
          cause: "Trend-chasing instead of showing your brand.",
          steps: [
            "Build content pillars around your brand",
            "Show real people and process",
            "Use trends only where they fit",
          ],
        },
      ],
      checklist: [
        "You posted at least three Reels this month",
        "Creator posts have trackable codes",
        "Ads are tracked to orders",
        "Paid posts are marked as ads",
      ],
      faqs: [
        {
          question: "Do you shoot content?",
          answer: "We plan shoots and brief your team or a Mumbai creator; we edit and run everything else.",
        },
        {
          question: "Can we meet to plan the calendar?",
          answer: "Yes, at our Mahim office or on a call.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Mumbai — WhatsApp Support & Admin on Autopilot",
      metaDescription:
        "AI automation for Mumbai brands and firms: WhatsApp customer support, order updates, document processing for CA firms and lead qualification, with people in control.",
      h1: "AI automation for Mumbai teams drowning in WhatsApp and paperwork",
      card: "WhatsApp support, order updates and document processing.",
      intro: [
        "For Mumbai brands, the inbox never stops: where's my order, what size, is COD available. For CA and professional firms, it's documents: invoices, statements and forms arriving on WhatsApp and email in every format.",
        "We build AI automation for both: instant, accurate WhatsApp replies from your own information, and document processing that extracts what matters for your team to check.",
      ],
      sections: [
        {
          heading: "Support that answers in seconds",
          body: [
            "Order status, size guidance, return policy and delivery questions get instant answers, with order details pulled from Shopify or your system. Complaints and unusual requests go straight to a person.",
          ],
        },
        {
          heading: "Documents into data",
          body: [
            "For CA firms and back offices, AI reads invoices, bank statements and forms, extracts the key fields and prepares them for review, cutting hours of typing during busy seasons.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Support can't keep up after a sale",
          cause: "Every order-status question is answered manually.",
          steps: [
            "Answer order status automatically on WhatsApp",
            "Send proactive delivery updates",
            "Route complaints to staff",
          ],
        },
        {
          symptom: "Staff type data from client documents for days",
          cause: "Documents arrive as PDFs and photos.",
          steps: [
            "Collect documents in one inbox or portal",
            "Extract fields automatically",
            "Have staff review and approve",
          ],
        },
      ],
      checklist: [
        "Order-status questions are answered instantly",
        "Complaints reach a person quickly",
        "Client documents aren't retyped by hand",
        "A person reviews every automated output",
      ],
      faqs: [
        {
          question: "Is client data safe with AI tools?",
          answer: "We use providers that don't train on your data and design workflows to share only what each task needs.",
        },
        {
          question: "Will the AI talk to customers in Hindi or Marathi?",
          answer: "It can understand and reply in Hindi, Marathi and Hinglish.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software Development in Mumbai — Portals for CA & Professional Firms",
      metaDescription:
        "Custom software in Mumbai for CA, legal and professional firms: client portals, document tracking, task management and billing that cut year-end chaos.",
      h1: "Custom software for Mumbai CA and professional firms",
      card: "Client portals, document tracking and billing for firms.",
      intro: [
        "Mumbai's CA, tax, legal and consulting firms handle hundreds of clients, each with documents, deadlines and billing. Most still chase documents on WhatsApp, track tasks in Excel and send invoices from Tally by hand. Year end becomes a crisis every time.",
        "We build client portals and practice systems that bring documents, tasks, deadlines and billing into one place, designed around how your firm works.",
      ],
      sections: [
        {
          heading: "A portal clients actually use",
          body: [
            "Clients upload documents against a checklist, see what's pending and approve work, all from their phone. Your team sees every client's status at a glance, and reminders go out automatically.",
          ],
        },
        {
          heading: "Deadlines that don't slip",
          body: [
            "Recurring compliance tasks such as GST, TDS and ROC filings are scheduled per client, assigned to staff and tracked to completion.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Client documents are lost in WhatsApp chats",
          cause: "There's no single place for documents.",
          steps: [
            "Give each client a document checklist in a portal",
            "Remind them automatically",
            "Store everything against the client",
          ],
        },
        {
          symptom: "We miss filing deadlines",
          cause: "Tasks are tracked in spreadsheets.",
          steps: [
            "Schedule recurring tasks per client",
            "Assign owners and due dates",
            "Show overdue tasks on a dashboard",
          ],
        },
      ],
      checklist: [
        "Clients upload documents to one place",
        "Recurring deadlines are scheduled automatically",
        "Staff workloads are visible",
        "Billing is linked to completed work",
      ],
      faqs: [
        {
          question: "Is client data stored securely?",
          answer: "Yes, in Indian data centres with access by role and logs of who viewed what.",
        },
        {
          question: "Can it connect to Tally?",
          answer: "Yes, for billing and ledgers.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "api-integration": {
      metaTitle: "API Integration in Mumbai — Connect Shopify, Marketplaces & Tally",
      metaDescription:
        "API integration in Mumbai: connect Shopify, Amazon, Flipkart, Tally, Shiprocket and WhatsApp so orders, stock and invoices stay in sync without manual entry.",
      h1: "API integration for Mumbai sellers on five channels and one spreadsheet",
      card: "Sync Shopify, marketplaces, Tally, Shiprocket and WhatsApp.",
      intro: [
        "Many Mumbai brands and traders sell on their own store, Amazon, Flipkart and offline, ship through Shiprocket and account in Tally. Stock is tracked in a spreadsheet that's always out of date, and orders are typed in every evening.",
        "We connect those channels so stock, orders and invoices stay in sync, with alerts when anything fails.",
      ],
      sections: [
        {
          heading: "One stock count",
          body: [
            "Stock is held in one system and updated by every sale, online or offline, so you stop overselling on one channel while items sit unsold on another.",
          ],
        },
        {
          heading: "Clean books",
          body: [
            "Orders, fees, returns and GST from each channel post to Tally or Zoho Books in a form your accountant recognises, instead of hundreds of manual entries.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We oversell on marketplaces",
          cause: "Stock isn't synced across channels.",
          steps: [
            "Choose one stock source",
            "Sync it to every channel",
            "Keep buffers on fast sellers",
          ],
        },
        {
          symptom: "Reconciling marketplace payouts takes days",
          cause: "Fees and returns are matched by hand.",
          steps: [
            "Import settlement reports automatically",
            "Match them to orders",
            "Post summaries to accounting",
          ],
        },
      ],
      checklist: [
        "Stock is synced across channels",
        "Orders reach Tally without typing",
        "Marketplace settlements are reconciled automatically",
        "Failed syncs trigger alerts",
      ],
      faqs: [
        {
          question: "Can you connect Amazon and Flipkart?",
          answer: "Yes, through their seller APIs or approved connectors, depending on your account.",
        },
        {
          question: "Will our accountant need to change anything?",
          answer: "We map entries with them first, so the books look the way they expect.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Mumbai — AWS Mumbai Region Setup & Migration",
      metaDescription:
        "Cloud services in Mumbai: AWS and Azure set up in Indian regions, migrations off old servers, backups, monitoring and cost control for growing businesses.",
      h1: "Cloud set-up for Mumbai businesses outgrowing their first server",
      card: "AWS and Azure in Indian regions, with backups and cost control.",
      intro: [
        "Mumbai businesses often start on shared hosting or a single cloud server set up by a freelancer. As traffic and data grow, that set-up becomes slow, fragile and expensive in surprising ways.",
        "We design and migrate cloud infrastructure in AWS's Mumbai region or other Indian regions, with backups, monitoring and costs you can predict.",
      ],
      sections: [
        {
          heading: "Close to your customers",
          body: [
            "AWS's Mumbai region and Azure's Indian regions keep latency low for Indian users and keep data in India, which many clients and partners now ask about.",
          ],
        },
        {
          heading: "Grown-up basics",
          body: [
            "Separate staging and production, automated deployments, daily backups that have been tested, monitoring with alerts and budget alerts. Simple things that prevent most disasters.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our cloud bill keeps rising",
          cause: "Oversized servers, unused resources and no alerts.",
          steps: [
            "Audit every resource",
            "Resize or remove what isn't needed",
            "Set budget alerts",
          ],
        },
        {
          symptom: "We changed something and the live site broke",
          cause: "There's no staging environment.",
          steps: [
            "Create staging",
            "Automate deployments",
            "Add one-step rollback",
          ],
        },
      ],
      checklist: [
        "Data is hosted in an Indian region",
        "Changes are tested on staging first",
        "Backups have been restored successfully",
        "Budget alerts are on",
      ],
      faqs: [
        {
          question: "AWS or Azure?",
          answer: "Whichever fits your existing tools and team. We recommend one during scoping.",
        },
        {
          question: "Can you handle the migration without downtime?",
          answer: "Usually, by running old and new side by side and switching over at a quiet time.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Mumbai — A Team in Mahim You Can Reach",
      metaDescription:
        "Website maintenance in Mumbai: updates, security, backups, monitoring and content changes handled by a team with a Mahim office and a WhatsApp number that answers.",
      h1: "Website maintenance for Mumbai businesses that want someone who answers",
      card: "Updates, security and changes by a team with a Mahim office.",
      intro: [
        "Mumbai businesses change their sites constantly: new collections, offers, menus, team members and events. When the agency that built the site goes quiet, small changes wait for weeks.",
        "Our maintenance plans cover updates, security, backups, monitoring and content changes, handled by a team with an office in Mahim and a WhatsApp number that answers.",
      ],
      sections: [
        {
          heading: "Changes within a working day",
          body: [
            "Send the change on WhatsApp and it's live within one working day. A set number of changes is included each month, so you aren't invoiced for every small edit.",
          ],
        },
        {
          heading: "The technical work",
          body: [
            "Software updates tested before going live, security monitoring, daily off-server backups and uptime alerts, with a short monthly summary.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Small website changes take weeks",
          cause: "The agency deprioritises small jobs.",
          steps: [
            "Send changes to a named person on WhatsApp",
            "Get them live within a working day",
            "See them in a monthly summary",
          ],
        },
        {
          symptom: "Our site has old offers and prices",
          cause: "Nobody owns updates.",
          steps: [
            "Review the site for outdated content",
            "Update it in one go",
            "Keep it current monthly",
          ],
        },
      ],
      checklist: [
        "Offers and prices on the site are current",
        "Software was updated this month",
        "A recent backup exists",
        "Someone answers when you message about the site",
      ],
      faqs: [
        {
          question: "Can we drop by the office?",
          answer: "Yes, by appointment at our Mahim office.",
        },
        {
          question: "Do you maintain Shopify stores?",
          answer: "Yes. For Shopify we focus on content, theme fixes, apps and speed.",
        },
      ],
    },
  },
}
