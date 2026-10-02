import type { AuCity } from "./types"
import { AEDT, AEST } from "./zones"

export const sydney: AuCity = {
  slug: "sydney",
  name: "Sydney",
  state: "New South Wales",
  stateCode: "NSW",
  summary: "Australia's largest and most competitive market, where search and ad costs punish guesswork.",
  zone: { std: AEST, dst: AEDT },
  areas: ["Sydney CBD", "North Sydney", "Parramatta", "Chatswood", "Surry Hills", "Bondi", "Penrith", "Liverpool", "Blacktown", "Hornsby", "Sutherland Shire", "Northern Beaches", "Inner West", "Castle Hill"],
  nearby: ["newcastle", "wollongong", "canberra"],
  page: {
    metaTitle: "Website Development, SEO & Digital Marketing in Sydney",
    metaDescription:
      "Websites, online stores, SEO, Google Ads and automation for Sydney businesses, from Parramatta trades to CBD firms. Find what is holding growth back and fix it.",
    h1: "Helping Sydney businesses grow in Australia's toughest market",
    intro: [
      "Sydney is where attention costs the most. Clicks are expensive, page one is crowded, and customers compare three businesses before they call one. We help Sydney businesses get more from every visitor: websites that turn visits into enquiries, search visibility in the suburbs you actually serve, and automation that takes the admin off your plate.",
      "We work remotely from our offices in Lucknow and Mumbai, India, and have no office in Sydney. We would rather say that here than on the first call. The person who scopes your project is the person who builds it and answers your messages after launch.",
    ],
    sections: [
      {
        heading: "Sydney rewards being specific",
        body: [
          "Most businesses that grow here do not fight for \"Sydney\" at all. They win their suburb and their speciality, such as \"family lawyer Parramatta\" or \"emergency plumber Northern Beaches\", and they make the website convert well enough that each expensive visitor counts.",
          "That changes where the money should go. Before more traffic, most Sydney businesses we talk to need a clearer site, a properly set-up Google Business Profile and tracking that shows which enquiries came from where. Without those, extra traffic costs more and you can't see what it earned.",
        ],
      },
      {
        heading: "Where we usually start",
        body: [
          "Tell us what the business does, who buys from it and what is not working. We reply with a written diagnosis: what we think is holding growth back, what we would fix first and what that would cost. If the honest answer is that you don't need us yet, we say so.",
          "Our day starts at 14:30 Sydney time (15:30 in daylight saving), so anything you send in the morning is answered the same afternoon, and calls are booked in your afternoon.",
        ],
      },
    ],
    industries: [
      { name: "Professional services", need: "Law, accounting and finance firms in the CBD and North Sydney need sites that build trust before the first call." },
      { name: "Trades and home services", need: "Across Western Sydney, the Hills and the Shire, work comes from Google Maps and quote requests made on a phone." },
      { name: "Health and allied health", need: "Clinics need online booking, practitioner pages and a privacy policy that matches how they handle patient data." },
      { name: "Hospitality and retail", need: "Inner West and Eastern Suburbs venues live on reviews, menus that load fast and bookings without a phone call." },
    ],
    problems: [
      {
        service: "google-ads",
        symptom: "We pay for Sydney clicks and the leads don't add up",
        cause: "Sydney click prices magnify every leak: broad keywords matching searches you would never want, ads showing across the whole metro when you only serve a few areas, and clicks landing on a homepage that does not answer the search.",
        steps: [
          "Go through the search terms report and block the searches you would never want to pay for",
          "Narrow location targeting to the suburbs you can actually service",
          "Send each campaign to a page written for that search, and count calls as conversions",
        ],
      },
      {
        service: "seo",
        symptom: "Competitors in our suburb show up on Google Maps and we don't",
        cause: "The map pack ranks on relevance, distance and prominence. A wrong primary category, a thin profile and few recent reviews will keep a good business out of it.",
        steps: [
          "Fix your Google Business Profile categories, services, hours and photos",
          "Make your business name, address and phone identical everywhere they appear",
          "Set up a simple routine that asks every happy customer for a review",
        ],
      },
      {
        service: "web-design",
        symptom: "Our website looks smaller than our business",
        cause: "The site was built years ago, has grown by adding text to old pages, and uses stock photos. Next to a competitor's recent site, you look like the less established choice.",
        steps: [
          "Decide which work you want more of and put it at the front",
          "Replace stock imagery with real team and project photos",
          "Rebuild the page hierarchy so each service has its own clear page",
        ],
      },
      {
        service: "website-development",
        symptom: "Customers want to book online, but we still take bookings by phone",
        cause: "Bookings only happen during office hours, and every phone call costs staff time. Sydney customers who want to book at 10pm book with whoever lets them.",
        steps: [
          "Map how a booking works today, including deposits, cancellations and reminders",
          "Connect a booking system to the site, or build one if your rules are unusual",
          "Add SMS and email reminders so fewer bookings turn into no-shows",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Our team loses hours every week to quotes and follow-ups",
        cause: "The same information is typed into an email, a quote template and a CRM, and follow-ups depend on someone remembering to send them.",
        steps: [
          "List the repetitive tasks and time how long each one takes",
          "Automate the most frequent one first, with a person reviewing before anything is sent",
          "Add automatic follow-ups for quotes that have not been answered",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "We sell online, but checkout drop-off and freight eat the margin",
        cause: "Shipping costs that only appear at checkout, missing express payment options and flat-rate freight that undercharges interstate orders.",
        steps: [
          "Check the checkout funnel to see exactly which step loses buyers",
          "Show delivery costs or a free-shipping threshold before checkout",
          "Set freight by zone so WA, NT and Tasmania orders do not run at a loss",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Sydney?",
        answer: "No. We are based in Lucknow and Mumbai, India, and work with Sydney businesses over video calls, WhatsApp and email. We say this up front so you can decide whether remote working suits you before you spend time on a call.",
      },
      {
        question: "What hours can we reach you from Sydney?",
        answer: "Our working day is 14:30 to 23:30 Sydney time (15:30 to 00:30 during daylight saving), Monday to Saturday. Most clients send a message in the morning and get the reply that afternoon.",
      },
      {
        question: "Which service should a Sydney business start with?",
        answer: "Usually whatever stops your existing traffic from becoming enquiries, because Sydney traffic is expensive. That is often the website or the Google Business Profile, not more advertising. We will tell you which after looking at what you have.",
      },
      {
        question: "How do you price work?",
        answer: "We do not publish prices, because they depend on the project. Send us the details and you will get a fixed written quote, usually within one working day, with no charge for scoping.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Sydney — Sites Built to Convert",
      metaDescription:
        "Website development for Sydney businesses: fast Next.js and WordPress sites built for buyers who compare. Scope and fixed quote in writing before any work starts.",
      h1: "Website development for Sydney businesses whose customers compare before they call",
      card: "Sites built for Sydney buyers who open three tabs and choose one.",
      intro: [
        "Sydney customers rarely choose the first business they find. They open your site next to two competitors, usually on a phone between meetings, and decide in under a minute who seems most specific to their problem. A Sydney website has to win that comparison, not just exist.",
        "We build websites in Next.js or WordPress for Sydney firms, trades, clinics and venues, choosing whichever one your team can actually run. The domain, hosting and analytics are registered to your business from day one.",
      ],
      sections: [
        {
          heading: "Built for the side-by-side comparison",
          body: [
            "We design from the page a buyer lands on, not the homepage. For a North Sydney accounting firm, that is often a specific service page. For a Penrith builder, it is a project gallery. Each landing page answers three questions without scrolling: what you do, who it is for and what to do next.",
            "Proof goes where the decision is made: accreditations next to the enquiry form, reviews next to the phone number, real team photos instead of stock. In a market this crowded, being specific is what makes you look like the specialist.",
          ],
        },
        {
          heading: "What a Sydney build includes",
          body: [
            "A written scope and fixed price before we start. Design for every page template, checked on real phones. Analytics, Search Console, schema and on-page SEO set up during the build, not sold afterwards. If you are replacing an old site, we redirect every old URL to its new page so the rankings you already have carry over.",
            "Prices shown to consumers include GST, and your privacy policy matches how your forms actually handle personal information. These are small details, and rushed builds often leave them out.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Plenty of traffic, very few enquiries",
          cause: "The site talks about the business instead of the buyer's problem, the phone number is hard to find, and the form asks for ten fields before anyone knows the price range.",
          steps: [
            "Find the pages that get traffic but no enquiries in your analytics",
            "Rewrite those pages around one action: call, book or request a quote",
            "Cut the form to the fields you need to reply, then test it on a phone",
          ],
        },
        {
          symptom: "Our site was built for the business we were five years ago",
          cause: "New services were added as text on old pages instead of getting pages of their own, so neither Google nor customers can see what you specialise in now.",
          steps: [
            "List the services you want more of and check whether each has its own page",
            "Restructure the site around those services and the areas you serve",
            "Redirect old URLs so you keep the rankings you already have",
          ],
        },
      ],
      checklist: [
        "Your phone number is a tap-to-call link at the top of every page on mobile",
        "Each service you want more of has its own page, not a bullet on a list",
        "A visitor can tell what you do and where you work within five seconds",
        "The domain, hosting and analytics are in your business's name",
        "You know how many enquiries the website brought in last month",
      ],
      faqs: [
        {
          question: "How long does a website take for a Sydney business?",
          answer: "A business site usually takes three to five weeks from content sign-off, and an online store six to ten. Content is usually what slows a project down, so the scope says who writes what and by when.",
        },
        {
          question: "Will a new site hurt our Google rankings?",
          answer: "Not if it is moved properly. We redirect every old URL to its closest new page, carry titles and content across, and watch Search Console for errors in the weeks after launch.",
        },
        {
          question: "Can we meet in person in Sydney?",
          answer: "No. We work remotely, on video calls, WhatsApp and email. Our day starts at 14:30 Sydney time (15:30 in daylight saving), so morning messages are answered the same afternoon.",
        },
      ],
      caseStudies: ["hcbengineering", "thegrafftee"],
    },
    "web-design": {
      metaTitle: "Web Design in Sydney — Look as Established as You Are",
      metaDescription:
        "Web design for Sydney firms and brands that look smaller online than they are. Clear hierarchy, real photography and pages that make the next step obvious.",
      h1: "Web design for Sydney businesses that look smaller online than they really are",
      card: "Redesigns that make an established Sydney business look established.",
      intro: [
        "A lot of established Sydney firms look small online: a template chosen years ago, stock photos of handshakes, and a services page that lists everything with equal weight. Customers read that as a smaller, less specialised business, and in Sydney they have plenty of alternatives.",
        "Our redesign work is mostly about hierarchy. We put the work you most want at the front, make it obvious why you are the specialist, and keep the next step visible on every screen size.",
      ],
      sections: [
        {
          heading: "Design decisions that change enquiries",
          body: [
            "We start by agreeing what the site is for: which services you want more of, which customers you want fewer of, and what a good enquiry looks like. Every layout decision follows from that. Colour and type matter less than whether a buyer can find the right page in two taps.",
            "Then we design every template the site needs, including service pages, case studies, team and contact pages, in both mobile and desktop layouts. You approve real layouts with your real content, not a homepage mock-up and a promise.",
          ],
        },
        {
          heading: "Accessibility is part of the design",
          body: [
            "Sydney's population includes many people using screen readers, magnification or keyboard navigation, and the Disability Discrimination Act applies to websites. We design to WCAG 2.2 AA: readable contrast, proper focus states, form labels and headings that make sense when read aloud.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors can't tell what we specialise in",
          cause: "Every service gets equal space, so the work you are best at, and earn most from, is lost in a list.",
          steps: [
            "Rank your services by margin and by how much more of each you want",
            "Give the top three their own pages and put them in the main navigation",
            "Move the rest to a single secondary page",
          ],
        },
        {
          symptom: "The site looks fine on desktop and awkward on a phone",
          cause: "The design was made for desktop and squeezed onto mobile afterwards, which pushes the call to action below long blocks of text.",
          steps: [
            "Design the mobile layout first for every key page",
            "Keep a tap-to-call or booking button visible as the visitor scrolls",
            "Test on real devices, not only a resized browser",
          ],
        },
      ],
      checklist: [
        "Your best service is visible without scrolling on the homepage",
        "Every photo on the site shows your real team, premises or work",
        "Text has enough contrast to read on a phone outdoors",
        "The menu has seven or fewer top-level items",
      ],
      faqs: [
        {
          question: "Can you redesign without rebuilding the whole site?",
          answer: "Sometimes. If the site's platform and structure are sound, we can redesign its templates in place. If the structure is the problem, a rebuild usually costs less over two years than patching it. We will tell you which applies after an audit.",
        },
        {
          question: "Do you provide branding as well?",
          answer: "We work from your existing brand and can refine colour, type and layout rules for the web. If you need a full new brand identity, we will say so up front and agree how to handle it before design starts.",
        },
        {
          question: "How many design revisions are included?",
          answer: "Review rounds at agreed milestones, until the design matches the signed scope. New pages or features that were not in the scope are quoted before we design them.",
        },
      ],
      caseStudies: ["tatvivahtrends", "saurally"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Sydney — Stores That Keep Margin",
      metaDescription:
        "Ecommerce development for Sydney brands: fast checkout with Afterpay and Apple Pay, freight that works nationally, and stores that sell on mobile.",
      h1: "Ecommerce development for Sydney brands selling to the whole country",
      card: "Online stores with fast checkout and freight that works nationally.",
      intro: [
        "Sydney shoppers expect delivery in a day or two, Afterpay at checkout and a store that works with one thumb on a train. A store that cannot match those expectations loses the sale to one that can, whatever the product.",
        "We build online stores for Sydney brands and retailers, on Shopify, WooCommerce or custom Next.js depending on the catalogue and the team running it, with freight, payments and GST set up for selling across Australia.",
      ],
      sections: [
        {
          heading: "Checkout is where Sydney stores lose money",
          body: [
            "Most lost sales happen in the last three steps. Delivery costs that appear only at checkout, forced account creation and missing express payments (Apple Pay, Google Pay, PayPal, Afterpay or Zip) are the usual causes. We fix them before spending anything on traffic.",
            "We also set up Google Merchant Center, product schema and abandoned-cart emails during the build, so the store can be found in Google Shopping and win back some of the carts that are left.",
          ],
        },
        {
          heading: "Selling from Sydney to everywhere else",
          body: [
            "Freight from Sydney to Perth, Darwin or Hobart costs more than metro delivery. We set shipping by zone or postcode so remote orders are priced fairly, and connect your courier (Australia Post, Sendle, StarTrack or others) so labels and tracking happen automatically.",
            "Your refund policy has to follow Australian Consumer Law. Customers have rights to a repair, replacement or refund for major faults whatever your policy says, so we write store pages that do not make promises the law would override.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Shoppers add to cart and then leave",
          cause: "Unexpected delivery costs at checkout, forced sign-up and too few payment options.",
          steps: [
            "Find the checkout step where most buyers drop off",
            "Show delivery costs or a free-shipping threshold on product pages",
            "Add express payments and guest checkout",
          ],
        },
        {
          symptom: "Marketplace fees are eating our margin",
          cause: "Without your own store, every repeat customer pays the marketplace again. You rent the customer instead of owning the relationship.",
          steps: [
            "Launch your own store alongside the marketplace, not instead of it",
            "Use packaging inserts and email to bring repeat buyers to your store",
            "Track the margin each channel actually earns per sale",
          ],
        },
      ],
      checklist: [
        "Delivery costs are visible before the checkout page",
        "Customers can buy without creating an account",
        "Apple Pay, Google Pay and a buy-now-pay-later option are offered",
        "Your refund policy does not say \"no refunds\"",
        "Abandoned-cart emails are switched on and tested",
      ],
      faqs: [
        {
          question: "Which platform should our Sydney store use?",
          answer: "Shopify suits most stores run by non-technical teams. WooCommerce suits stores where content and blogging lead. A custom Next.js build makes sense when the catalogue or checkout rules are unusual. We recommend one in the written scope and explain why.",
        },
        {
          question: "Can the store connect to Xero or MYOB?",
          answer: "Yes. Orders, payments and GST can flow into your accounting software automatically, through the platform's apps or a direct integration, so nobody re-keys sales.",
        },
        {
          question: "Can you move our store from another platform?",
          answer: "Yes. We move products, customers and order history, and redirect every old product and category URL so you keep the search traffic the old store earned.",
        },
      ],
      caseStudies: ["clickngreet", "samaraha"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Sydney — Fast, Lean Stores",
      metaDescription:
        "Shopify developers for Sydney brands: custom themes, fewer apps, faster stores, and checkout, freight and GST set up properly for Australian customers.",
      h1: "Shopify development for Sydney brands that have outgrown their theme",
      card: "Shopify stores that load fast and don't depend on a pile of apps.",
      intro: [
        "Plenty of Sydney brands start on a free Shopify theme and add an app for every new need. Two years later the store loads slowly, apps conflict with each other, and the monthly app bill is bigger than the platform fee.",
        "We build and rebuild Shopify stores for Sydney brands: custom or customised themes, fewer apps, and the features that matter written into the theme itself.",
      ],
      sections: [
        {
          heading: "Fewer apps, faster store",
          body: [
            "We start with an app audit. Many apps do one small thing, like a size chart, badge or upsell block, that a few lines of theme code could do without slowing every page. Removing them usually speeds up the store and lowers the monthly bill in one step.",
            "What remains is configured properly: Shopify Payments with Afterpay or Zip if your average order suits it, shipping rates by zone, GST-inclusive pricing and tax invoices that show your ABN.",
          ],
        },
        {
          heading: "Built to be run by your team",
          body: [
            "Your team should be able to launch a collection, change a banner or run a sale without asking a developer. We build sections and templates that can be edited in the theme editor, and hand over a short written guide to the store's custom parts.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our Shopify store has become slow",
          cause: "Each app adds its own scripts to every page. Large uncompressed images and heavy sliders make it worse.",
          steps: [
            "Measure speed on a throttled mobile connection",
            "Remove or replace apps that can be done in theme code",
            "Compress images and drop the homepage slider",
          ],
        },
        {
          symptom: "Our store looks like every other store",
          cause: "An unchanged theme, stock product photography and generic copy give buyers no reason to choose you over a similar brand.",
          steps: [
            "Rework product pages around your story, materials and real photography",
            "Design a homepage that leads with what makes you different",
            "Add reviews and user content where buyers make the decision",
          ],
        },
      ],
      checklist: [
        "You know what each installed app does and what it costs",
        "Product pages load in under three seconds on mobile data",
        "Your team can launch a sale without a developer",
        "Shipping rates differ by zone, not one flat national rate",
      ],
      faqs: [
        {
          question: "Should we use a paid theme or a custom one?",
          answer: "A well-chosen paid theme, customised, suits most stores and keeps costs down. A custom theme makes sense when your brand or merchandising does not fit any existing theme. We will recommend one after looking at your catalogue.",
        },
        {
          question: "Can you work on our existing Shopify store?",
          answer: "Yes. Most of our Shopify work is improving existing stores: speed, design, apps and checkout. We start with an audit and a written list of what we would change.",
        },
        {
          question: "Do you set up Shopify Markets for New Zealand?",
          answer: "Yes. Many Sydney brands sell to New Zealand, and Shopify Markets can show NZD prices and handle shipping rules there. We set it up when it makes commercial sense.",
        },
      ],
      caseStudies: ["clickngreet"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Sydney — Platforms That Launch Lean",
      metaDescription:
        "Marketplace and booking platform development for Sydney founders: vendor onboarding, Stripe Connect payouts, reviews and admin, built to prove demand first.",
      h1: "Marketplace development for Sydney founders building a two-sided platform",
      card: "Two-sided marketplaces and booking platforms, launched lean.",
      intro: [
        "Sydney has no shortage of marketplace ideas: services, rentals, trades, events, B2B supply. Most of them fail because they build too much before proving that buyers and sellers will both show up, not because the code is bad.",
        "We build marketplaces that launch with the smallest version of the core transaction, then grow as real orders reveal what is needed. We built MariBiz.ai, a marine procurement marketplace with requests for quote, vendor verification and messaging, so we know how these platforms behave once they are live.",
      ],
      sections: [
        {
          heading: "Start with one city, one category",
          body: [
            "A Sydney marketplace usually works best when it starts narrow, such as one category across a handful of suburbs, and builds density before it builds features. We scope the first version around one transaction: a buyer finds a seller, pays and leaves a review.",
            "Vendor onboarding, payouts and the admin tools your team needs to keep quality up come next, once you know which sellers and buyers stick.",
          ],
        },
        {
          heading: "Payments, payouts and the ATO",
          body: [
            "We use Stripe Connect for split payments and payouts in AUD. If you are registered for GST, your commission is a taxable supply and needs a tax invoice, so we build invoicing into the platform rather than leaving it to a spreadsheet.",
            "Many platforms also have to report seller transactions under the ATO's sharing economy reporting regime. We store seller details and transaction records so that report can be exported, not rebuilt by hand each period.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We have the idea but don't know what to build first",
          cause: "Trying to build every feature for both sides at once uses up the budget before a single real transaction happens.",
          steps: [
            "Define the one transaction the platform must make easy",
            "Launch it for one category or area of Sydney",
            "Add features only when real users ask for them",
          ],
        },
        {
          symptom: "We run the marketplace by hand on spreadsheets and email",
          cause: "The business proved demand manually and has now outgrown the manual process.",
          steps: [
            "Write down every manual step from enquiry to payout",
            "Automate onboarding, booking and payment first",
            "Move reviews, disputes and reporting onto the platform next",
          ],
        },
      ],
      checklist: [
        "You can describe the core transaction in one sentence",
        "You have sellers ready to list before launch",
        "You know how your commission will be calculated and invoiced",
        "You have a plan for the first hundred buyers",
      ],
      faqs: [
        {
          question: "How long does a marketplace MVP take?",
          answer: "Usually ten to sixteen weeks for a first version with listings, search, booking or checkout, payments and basic admin. Scope decides the timeline, so we keep the first version deliberately small.",
        },
        {
          question: "Do we own the code?",
          answer: "Yes. The repository, hosting and Stripe account are in your company's name. If you hire an in-house team later, they inherit a codebase they can work with.",
        },
      ],
      caseStudies: ["maribiz-ai", "tatvivahtrends"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Sydney — Fast Sites and Web Apps",
      metaDescription:
        "Next.js developers for Sydney businesses and startups: fast marketing sites, headless commerce and web apps that pass Core Web Vitals and scale with you.",
      h1: "Next.js development for Sydney teams that need speed and room to grow",
      card: "Next.js sites and apps that pass Core Web Vitals.",
      intro: [
        "Next.js is what we build most of our work on, including this site. For a Sydney business it makes sense when speed matters for rankings and ad quality scores, when the site needs custom logic, or when a marketing site and a product need to share one codebase.",
        "We build Next.js marketing sites, headless storefronts, dashboards and SaaS products for Sydney businesses and startups, and take over Next.js projects that have stalled with another team.",
      ],
      sections: [
        {
          heading: "When Next.js is the right choice, and when it isn't",
          body: [
            "If a non-technical team needs to publish blog posts every day, WordPress is often the better tool, and we will say so. Next.js earns its place when performance, custom features or scale matter more than editing convenience, or when it is paired with a headless CMS your team can still use.",
            "Most Sydney projects we would build in Next.js are content-heavy sites for competitive searches, startup products and headless stores where Shopify's theme layer is too limiting.",
          ],
        },
        {
          heading: "Taking over a stalled project",
          body: [
            "We regularly pick up React and Next.js projects that a freelancer or agency started and did not finish. We audit the code first, write down what is sound and what is not, and give you a fixed plan to finish it, or an honest recommendation to rebuild parts of it.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site fails Core Web Vitals and rankings are slipping",
          cause: "Heavy client-side JavaScript, unoptimised images and third-party scripts loaded on every page.",
          steps: [
            "Measure field data in Search Console and lab data on a throttled phone",
            "Move rendering to the server and load scripts only where they are needed",
            "Re-measure after release and keep a performance budget",
          ],
        },
        {
          symptom: "Our previous developer left the project half-built",
          cause: "No documentation, no tests and decisions that only one person understood.",
          steps: [
            "Audit the repository and the hosting set-up",
            "Write a fixed plan to finish, with any rebuild recommendations",
            "Document the project so it never depends on one person again",
          ],
        },
      ],
      checklist: [
        "Your site passes Core Web Vitals in Search Console",
        "The code is in a repository your business owns",
        "There is a staging site where changes are checked before going live",
        "Content editors can publish without a developer",
      ],
      faqs: [
        {
          question: "Which CMS do you pair with Next.js?",
          answer: "It depends on who edits the site. We have used Sanity, Strapi, Supabase-backed admin panels and WordPress as a headless CMS. The scope names one and explains why.",
        },
        {
          question: "Where is a Next.js site hosted?",
          answer: "Usually on Vercel or AWS. If you need data to stay in Australia, we use the Sydney or Melbourne regions of AWS or another provider.",
        },
      ],
      caseStudies: ["nextmentor", "maribiz-ai"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Sydney — Honest About iPhone",
      metaDescription:
        "Android app development for Sydney businesses: native Kotlin apps for field teams, bookings and loyalty, with an honest view on when you also need iPhone.",
      h1: "Android app development in Sydney, with an honest answer about iPhone",
      card: "Native Android apps for staff and customers, scoped honestly.",
      intro: [
        "Our strength is native Android in Kotlin. In Sydney that needs a straight answer up front: iPhones make up a bigger share of phones in Australia than Android does, so an Android-only app reaches fewer of your customers than it would in many other countries.",
        "Android-only makes the most sense where you choose the devices: field teams, warehouses, delivery drivers, kiosks and point-of-sale. For customer apps that need iPhone too, we scope a React Native build separately and say so up front. We do not take on native iOS work.",
      ],
      sections: [
        {
          heading: "Where an Android app pays for itself",
          body: [
            "Sydney trades, logistics and service businesses often hand staff rugged Android phones or tablets. An app built for those devices can replace paper job sheets, photo evidence sent by text, and timesheets filled in on Friday from memory.",
            "Because you control the devices, the app can rely on the camera, GPS and offline storage working the same way on every unit, which makes it cheaper to build and support.",
          ],
        },
        {
          heading: "Before you commit to an app",
          body: [
            "Many customer-facing app ideas work better as a fast mobile website that customers do not have to install. We will ask whether people would actually download it, and suggest a web app instead if that serves you better.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our field staff still use paper job sheets",
          cause: "Information is copied from paper into the office system later, with errors and delays to invoicing.",
          steps: [
            "Map the job sheet and every field it collects",
            "Build an Android app that works offline and syncs when back in signal",
            "Connect it to your job management or accounting software",
          ],
        },
        {
          symptom: "We want an app but aren't sure customers would use it",
          cause: "An app is a big ask for a customer. Many will not install one for a business they use a few times a year.",
          steps: [
            "Check how often customers come back and what they do each time",
            "Start with a mobile web app if visits are infrequent",
            "Build a native app once repeat use justifies it",
          ],
        },
      ],
      checklist: [
        "You know whether the app is for staff or customers",
        "You know which devices it must run on",
        "You know what has to work without a signal",
        "You have a plan for updates after launch",
      ],
      faqs: [
        {
          question: "Do you build iPhone apps?",
          answer: "Not natively. For apps that must run on iPhone and Android, we scope a React Native build separately and are clear about it in the quote. Our native strength is Android.",
        },
        {
          question: "Do you publish the app to Google Play for us?",
          answer: "Yes, under your business's own developer account, so the app listing belongs to you. Internal staff apps can also be distributed privately.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Sydney — Win Your Suburb on Google",
      metaDescription:
        "Local SEO for Sydney businesses: Google Business Profile, suburb and service pages, and reporting tied to calls and enquiries, not just rankings.",
      h1: "SEO services for Sydney businesses that want to win their suburb, not just the city",
      card: "Local SEO and Google Maps visibility, suburb by suburb.",
      intro: [
        "In Sydney, SEO is a suburb game. A Bondi café and a Penrith electrician aren't competing with the whole city, only with the businesses Google considers close and relevant to the person searching. Trying to rank for \"Sydney\" alone usually wastes a year.",
        "We build one strong page for each service and each area you genuinely serve, then work on your Google Business Profile and reviews so you appear in the map pack where your customers actually are.",
      ],
      sections: [
        {
          heading: "How local SEO works for a Sydney business",
          body: [
            "Google's local results weigh relevance, distance and prominence. Relevance comes from your Google Business Profile categories and your website's service pages. Distance you cannot change. Prominence comes from reviews, links and mentions across the web, and it is where steady work beats a one-off campaign.",
            "For a service-area business, such as a plumber working from home, we set up the profile without showing your home address and define a service area that matches where you will actually travel.",
          ],
        },
        {
          heading: "Reporting you can act on",
          body: [
            "Monthly reports show calls, form enquiries and booking clicks from organic search and Google Maps, alongside the rankings that drive them. If a piece of work does not move enquiries, we stop doing it and tell you why.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Competitors show up on Google Maps and we don't",
          cause: "A wrong primary category, a thin profile, inconsistent business details across directories and few recent reviews.",
          steps: [
            "Fix your Google Business Profile categories, services and photos",
            "Make your name, address and phone identical across your site and directories",
            "Start a steady routine for asking customers for reviews",
          ],
        },
        {
          symptom: "We paid for SEO and couldn't tell if it worked",
          cause: "Reports full of rankings and impressions, with no link to enquiries.",
          steps: [
            "Set up call and form tracking in Google Analytics 4",
            "Report enquiries from organic search and Maps each month",
            "Cut work that does not move that number",
          ],
        },
      ],
      checklist: [
        "Your Google Business Profile's primary category matches your main service",
        "You have had a new Google review in the last 30 days",
        "Your business details are identical on your site and in every directory",
        "You know where you rank for your main service plus your suburb",
        "Your site is verified in Google Search Console with no indexing errors",
      ],
      faqs: [
        {
          question: "How long does SEO take in Sydney?",
          answer: "Profile and on-page fixes often show results within two to three months. Competitive service terms in Sydney can take six to twelve months of steady work. We set expectations for your market in the first month.",
        },
        {
          question: "Can you get us into the map pack without a Sydney shopfront?",
          answer: "If you serve customers at their location, yes: a service-area profile can rank without showing an address. Google requires a real business location though, so a virtual office address is not something we recommend.",
        },
        {
          question: "Do you write the content?",
          answer: "Yes, with your input. We draft service and area pages from a short interview with you, because you know the details that make a page convincing and we know how to structure them for search.",
        },
      ],
      caseStudies: ["thegrafftee", "krushidoctor"],
    },
    "google-ads": {
      metaTitle: "Google Ads Management in Sydney — Cut Waste, Track Leads",
      metaDescription:
        "Google Ads management for Sydney businesses paying some of Australia's highest click prices: tighter targeting, real conversion tracking, fewer wasted clicks.",
      h1: "Google Ads management for Sydney businesses paying the country's highest click prices",
      card: "Google Ads accounts rebuilt around calls and leads, not clicks.",
      intro: [
        "Sydney clicks are expensive, so the waste in a typical account hurts more here than anywhere else. Broad keywords, metro-wide targeting and ads that send people to the homepage can burn a monthly budget in a week.",
        "We manage Google Ads for Sydney businesses with one goal: more enquiries for the same spend, or the same enquiries for less. The first month is usually spent cutting waste, before any budget is added.",
      ],
      sections: [
        {
          heading: "The first month",
          body: [
            "We go through the search terms you have been paying for and block the irrelevant ones. We tighten location targeting to the suburbs you serve, set it to people who are actually in those areas rather than just interested in them, and schedule ads for the hours someone can answer the phone.",
            "Then we fix tracking. Many accounts count page views or button clicks as conversions, which teaches Google's bidding to find more of the wrong thing. We track real calls and submitted enquiries, so automated bidding learns from real enquiries.",
          ],
        },
        {
          heading: "Landing pages matter as much as ads",
          body: [
            "An ad for \"emergency electrician Chatswood\" should land on a page about emergency electrical work in Chatswood, not on the homepage. We build or improve landing pages as part of management, because that is often where the cost per lead comes down most.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our leads are expensive and poor quality",
          cause: "Broad match keywords without negatives, metro-wide targeting and conversion tracking that counts the wrong actions.",
          steps: [
            "Audit search terms and add negative keywords",
            "Narrow location and schedule targeting",
            "Track only real calls and enquiries as conversions",
          ],
        },
        {
          symptom: "We tried Google Ads, it burned money, and we stopped",
          cause: "The campaign was set up with Google's default settings, which favour spending the budget over getting leads.",
          steps: [
            "Restart with a small budget and tight targeting",
            "Send traffic to a page made for the search",
            "Scale only the campaigns that produce enquiries at a cost you accept",
          ],
        },
      ],
      checklist: [
        "You have looked at the search terms report in the last month",
        "Location targeting is set to people present in your areas",
        "Conversions are real calls and enquiries, not page views",
        "Each campaign lands on a page written for it",
      ],
      faqs: [
        {
          question: "What budget does a Sydney business need?",
          answer: "Enough to get meaningful data in your market, which varies a lot by industry. We will look at likely click costs for your keywords and suggest a starting budget before you commit.",
        },
        {
          question: "Who owns the Google Ads account?",
          answer: "You do. The account is in your business's name and we are given access. If you stop working with us, the account and all its history stay with you.",
        },
        {
          question: "Is GST charged on Google Ads spend?",
          answer: "Google charges GST on ad spend for Australian accounts. If your business is registered for GST, you can usually claim it back. Ask your accountant how it applies to you.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Sydney — Content That Brings People In",
      metaDescription:
        "Social media marketing for Sydney venues, clinics and brands: content plans you can keep up, paid social targeted by suburb, and tracking to bookings.",
      h1: "Social media marketing for Sydney businesses that want customers, not just followers",
      card: "Instagram, Facebook and TikTok plans tied to bookings and sales.",
      intro: [
        "Sydney businesses are told to post every day, and most burn out within a month. The businesses that grow on social media post consistently about what they actually do and use a small paid budget to put the best posts in front of people nearby.",
        "We plan content around your real week, help you capture it without a film crew, and run paid social on Instagram, Facebook and TikTok aimed at the suburbs where your customers live.",
      ],
      sections: [
        {
          heading: "A plan you can keep up",
          body: [
            "We start with what is already happening in your business, such as new stock, a finished project or a seasonal menu, and turn it into a monthly plan. You capture the raw material on a phone, and we edit, caption and schedule it.",
            "For Sydney venues and clinics, short videos of the place and the people consistently do better than designed graphics. We keep templates to a minimum and real footage at the centre.",
          ],
        },
        {
          heading: "Paid social with tracking",
          body: [
            "Organic reach is limited, so a modest paid budget does most of the work. We target by suburb and interest, and set up the Meta pixel and conversions so you can see which ads brought bookings or sales, not just likes.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We post regularly but nothing comes of it",
          cause: "Posts show the business but give viewers no reason or way to act, and nothing is measured beyond likes.",
          steps: [
            "Give each post a clear next step: book, visit or shop",
            "Put a small paid budget behind the posts that perform",
            "Track bookings and sales from social, not just engagement",
          ],
        },
        {
          symptom: "We don't have time to create content",
          cause: "Content is treated as a separate job instead of being captured during the work you already do.",
          steps: [
            "Agree a short weekly capture routine with your team",
            "Let us handle editing, captions and scheduling",
            "Reuse the best pieces across platforms and ads",
          ],
        },
      ],
      checklist: [
        "Your profile link goes to a booking or shop page, not just the homepage",
        "You can see which posts led to enquiries or sales",
        "You have posted real footage of your business in the last fortnight",
        "Your Meta pixel is installed and firing on your site",
      ],
      faqs: [
        {
          question: "Which platform should a Sydney business be on?",
          answer: "Wherever your customers already spend time. Venues, beauty and lifestyle brands usually do best on Instagram and TikTok. Trades and local services often get more from Facebook community reach. We will suggest one or two, not all of them.",
        },
        {
          question: "Do you reply to comments and messages?",
          answer: "We can, during our working hours, which run through the Sydney afternoon and evening. Most businesses prefer to answer customer questions themselves and leave the planning and ads to us.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Sydney — Less Admin, Faster Replies",
      metaDescription:
        "AI automation for Sydney businesses: automatic quotes, follow-ups, document processing and enquiry handling, built with privacy and a human in the loop.",
      h1: "AI automation for Sydney businesses buried in admin",
      card: "Automate quotes, follow-ups and paperwork, with a person reviewing.",
      intro: [
        "Sydney businesses pay Sydney wages, so every hour spent re-typing information, chasing quotes or sorting emails is expensive. Much of that work can now be automated with AI tools that read, sort and draft, while a person still checks anything important before it goes out.",
        "We build practical automation for Sydney firms and service businesses: enquiry handling, quote drafting, document processing and follow-ups, connected to the tools you already use.",
      ],
      sections: [
        {
          heading: "Start with the most repetitive task",
          body: [
            "We begin by timing the repetitive work your team does each week. The best first project is usually frequent, rules-based and annoying, such as reading enquiry emails and creating CRM records, or turning a site visit's notes into a draft quote.",
            "We build it with a review step, run it alongside the manual process for a few weeks, and remove the manual step only when the automated one is reliable.",
          ],
        },
        {
          heading: "Privacy and where your data goes",
          body: [
            "Our team is in India. If an automation involves us handling your customers' personal information, that is a disclosure overseas, which Australian Privacy Principle 8 covers for businesses under the Privacy Act. We design around it, using test data during development and keeping access restricted in production.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Enquiries sit unanswered for hours",
          cause: "Replies depend on someone being free, and enquiries outside business hours wait until the next morning.",
          steps: [
            "Send an instant, useful reply that asks the key qualifying questions",
            "Route qualified enquiries to the right person with a summary",
            "Let customers book a call or site visit directly",
          ],
        },
        {
          symptom: "Our team retypes the same information into three systems",
          cause: "Email, CRM, quoting and accounting tools are not connected.",
          steps: [
            "Map where each piece of information is first entered",
            "Connect the systems so it is entered once",
            "Use AI to extract details from emails and documents automatically",
          ],
        },
      ],
      checklist: [
        "You know how many hours a week go into repetitive admin",
        "Enquiries get a reply within an hour, even after hours",
        "Customer data is entered once, not copied between systems",
        "Someone reviews anything automated before it reaches a customer",
      ],
      faqs: [
        {
          question: "Will AI replace our staff?",
          answer: "That is not how we approach it. The goal is to remove repetitive work so your team spends more time with customers. Every automation we build has a person reviewing where it matters.",
        },
        {
          question: "Which AI tools do you use?",
          answer: "It depends on the job. We use models from major providers through their APIs, with settings that do not use your data for training. We name the provider and explain the data handling in the scope.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software Development in Sydney — Portals & Internal Tools",
      metaDescription:
        "Custom software for Sydney businesses: client portals, dashboards and internal tools that replace spreadsheets, built in Next.js and Postgres you own.",
      h1: "Custom software for Sydney businesses that have outgrown spreadsheets",
      card: "Client portals, dashboards and tools that replace spreadsheets.",
      intro: [
        "Most Sydney businesses run on a mix of spreadsheets, shared inboxes and off-the-shelf tools that nearly fit. That works until a key spreadsheet breaks, a client asks for a portal, or the one person who understands the process goes on leave.",
        "We build custom software for those moments: client portals, job and project tracking, reporting dashboards and internal tools, in Next.js and Postgres, with the code owned by your business.",
      ],
      sections: [
        {
          heading: "Custom, but only where it needs to be",
          body: [
            "We do not rebuild what Xero, HubSpot or your industry software already does well. Custom software earns its cost where your process is what makes your business different, and we connect it to the off-the-shelf tools for everything else.",
            "Projects start with a written scope, including the screens, the data and the people who will use it, and a fixed price for the first version. Later features are scoped and quoted the same way.",
          ],
        },
        {
          heading: "Professional services portals",
          body: [
            "For Sydney accounting, legal and consulting firms, a common project is a client portal: secure document exchange, status updates and approvals in one place instead of email attachments. It cuts admin and looks more professional to the clients you most want to keep.",
          ],
        },
      ],
      problems: [
        {
          symptom: "A critical part of the business runs on one spreadsheet",
          cause: "The spreadsheet grew with the business, and now only one person understands it.",
          steps: [
            "Document what the spreadsheet does and who relies on it",
            "Build a simple app with proper permissions and history",
            "Import the existing data and run both in parallel briefly",
          ],
        },
        {
          symptom: "Clients keep emailing to ask for updates",
          cause: "Project status lives in internal tools that clients cannot see.",
          steps: [
            "Decide what clients need to see and what stays internal",
            "Build a secure portal with status, documents and approvals",
            "Send automatic notifications when something changes",
          ],
        },
      ],
      checklist: [
        "No critical process depends on a single person's spreadsheet",
        "Clients can see project status without emailing you",
        "Your data is backed up and access is limited by role",
        "You own the code and hosting accounts for any software built for you",
      ],
      faqs: [
        {
          question: "Can our data be hosted in Australia?",
          answer: "Yes. We can host in AWS's Sydney region or another Australian region, which some clients and industries require.",
        },
        {
          question: "What happens after the first version?",
          answer: "We support and extend it on an agreed plan. Because the code and documentation are yours, you can also move it to another team or hire in-house later.",
        },
      ],
      caseStudies: ["maribiz-ai", "nextmentor"],
    },
    "api-integration": {
      metaTitle: "API Integration in Sydney — Connect Xero, CRM & Your Website",
      metaDescription:
        "API integration for Sydney businesses: connect your website, CRM, Xero or MYOB, payments and booking tools so data moves itself and nobody re-keys it.",
      h1: "API integration for Sydney businesses whose tools don't talk to each other",
      card: "Connect your website, CRM, Xero and booking tools.",
      intro: [
        "A typical Sydney business uses a website, a CRM, Xero or MYOB, a payment provider, a booking tool and an email platform. Each works well on its own, and staff spend hours a week copying data between them.",
        "We connect them so data moves automatically: enquiries into the CRM, bookings into calendars, paid invoices into accounting, and customers into the right email list.",
      ],
      sections: [
        {
          heading: "What we usually connect",
          body: [
            "Website forms to HubSpot, Pipedrive or Salesforce. Shopify or WooCommerce orders to Xero or MYOB. Stripe payments to invoices. Booking platforms to calendars and SMS reminders. Job management tools such as ServiceM8 to accounting.",
            "Where a ready-made connector exists and works, we use it. Where it doesn't, or where it breaks quietly, we write a small integration that logs every sync and alerts someone when something fails.",
          ],
        },
        {
          heading: "Integrations that fail loudly",
          body: [
            "The worst integration is one that stops working without anyone noticing, so invoices go missing for a month. Everything we build logs what it did and sends an alert when it fails, so problems are caught the same day.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Website enquiries don't reach our CRM",
          cause: "Form submissions go to an inbox and are copied in by hand, if they are copied at all.",
          steps: [
            "Send every form submission straight into the CRM",
            "Tag each one with its source page and campaign",
            "Assign it to the right person with an alert",
          ],
        },
        {
          symptom: "We reconcile online orders with accounting by hand",
          cause: "The store and accounting software are not connected, or the connector maps GST and fees incorrectly.",
          steps: [
            "Map how orders, refunds, fees and GST should land in accounting",
            "Connect the systems with that mapping",
            "Check a month of transactions with your bookkeeper before relying on it",
          ],
        },
      ],
      checklist: [
        "Website enquiries land in your CRM automatically",
        "Online orders appear in your accounting software without re-keying",
        "Someone is alerted when an integration fails",
        "You know which systems hold your customer data",
      ],
      faqs: [
        {
          question: "Do you use Zapier or write custom code?",
          answer: "Both. Zapier or Make is often enough for simple flows. Custom code makes sense when volumes are high, logic is complex or the connector is unreliable. We recommend whichever is cheaper to run over time.",
        },
        {
          question: "Can you integrate with industry-specific software?",
          answer: "If it has an API, usually yes. We review the documentation before quoting and tell you about any limits.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Sydney — Hosting, Migration & AWS Setup",
      metaDescription:
        "Cloud hosting and migration for Sydney businesses: AWS and other providers set up in Australian regions, with backups, monitoring and costs under control.",
      h1: "Cloud hosting and migration for Sydney businesses that need it set up properly",
      card: "Hosting, migrations and AWS set-up in Australian regions.",
      intro: [
        "Plenty of Sydney businesses run important systems on cheap shared hosting, an old server in the office cupboard, or a cloud account someone set up years ago that nobody fully understands. Each works until it doesn't.",
        "We set up and migrate hosting and cloud infrastructure for Sydney businesses, in Australian data regions when you need them, with backups, monitoring and costs you can predict.",
      ],
      sections: [
        {
          heading: "Data in Australia",
          body: [
            "AWS, Microsoft Azure and Google Cloud all run data centres in Sydney and Melbourne. If your clients, insurer or industry expect data to stay in Australia, we host it there and document where everything lives.",
          ],
        },
        {
          heading: "Keeping the bill under control",
          body: [
            "Cloud bills grow quietly through oversized servers, forgotten test environments and storage nobody cleans up. We size infrastructure for real usage, set budget alerts and review costs after the first month.",
            "Every account is opened in your business's name, with access for us that you can remove at any time.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site or app goes down and customers tell us first",
          cause: "There is no monitoring, and hosting is underpowered or shared with other sites.",
          steps: [
            "Add uptime and error monitoring with alerts",
            "Move to hosting sized for your traffic",
            "Set up automatic, tested backups",
          ],
        },
        {
          symptom: "Our cloud bill keeps growing and nobody knows why",
          cause: "Unused resources, oversized servers and no budget alerts.",
          steps: [
            "Audit every resource in the account",
            "Remove or resize what isn't needed",
            "Set budget alerts and a monthly cost review",
          ],
        },
      ],
      checklist: [
        "You get an alert within minutes if your site goes down",
        "Backups run automatically, and you have tested restoring one",
        "Hosting and cloud accounts are in your business's name",
        "You know where your customer data is stored",
      ],
      faqs: [
        {
          question: "Can you move us off an office server?",
          answer: "Often, yes. We review what the server does, plan the move to a cloud or managed service, and run both side by side until the new set-up is proven.",
        },
        {
          question: "Do you provide 24/7 support?",
          answer: "No. We are available Monday to Saturday from 14:30 Sydney time, and monitoring alerts us when something fails. If you need round-the-clock cover, we will say so and help you plan for it.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Sydney — Updates, Backups, Real People",
      metaDescription:
        "Website maintenance for Sydney businesses: updates, security, backups, uptime monitoring and small changes, with a named person to message when you need help.",
      h1: "Website maintenance for Sydney businesses whose developer stopped replying",
      card: "Updates, backups and changes, with a named person to message.",
      intro: [
        "Many of the enquiries we get start the same way: the person who built the site has moved on, nobody has the logins, and something needs changing today. Websites need ongoing care, and many Sydney businesses only find that out when something breaks.",
        "Our maintenance plans cover updates, security, backups, uptime monitoring and small content changes, with a named person you can message.",
      ],
      sections: [
        {
          heading: "Taking over a site someone else built",
          body: [
            "We start by recovering access, including the domain, hosting, CMS and analytics, and moving each account into your business's name if it is not already. Then we audit the site, back it up and update it safely, testing on a copy first.",
            "If the site is past saving, we say so and explain what a rebuild would cost compared with continued patching.",
          ],
        },
        {
          heading: "What a plan covers",
          body: [
            "Plugin, theme and framework updates. Security monitoring. Daily backups stored off the server. Uptime alerts. A set amount of content changes each month. A short monthly note of what was done, so you know what you are paying for.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our developer has disappeared and we don't have the logins",
          cause: "The accounts were set up in the developer's name, not the business's.",
          steps: [
            "Recover the domain through the registrar using your business details",
            "Regain hosting and CMS access, and change every password",
            "Move every account into your business's name",
          ],
        },
        {
          symptom: "Our site was hacked, or went down, and we found out from a customer",
          cause: "Old software, no monitoring and no recent backup.",
          steps: [
            "Clean the site and close the hole that let the attack in",
            "Update everything and add security monitoring",
            "Set up daily off-site backups and uptime alerts",
          ],
        },
      ],
      checklist: [
        "You have admin access to your domain, hosting and CMS",
        "Your site was updated in the last month",
        "A backup exists that is less than a day old and stored off the server",
        "You would know within minutes if the site went down",
      ],
      faqs: [
        {
          question: "Do you maintain sites you didn't build?",
          answer: "Yes. Most of our maintenance clients came to us with sites built by someone else. We audit first and tell you plainly what condition the site is in.",
        },
        {
          question: "How fast do you respond?",
          answer: "Within one working day for routine changes, and the same working session for outages during our hours, which start at 14:30 Sydney time.",
        },
      ],
    },
  },
}
