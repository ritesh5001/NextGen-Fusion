import type { AuCity } from "./types"
import { AEDT, AEST } from "./zones"

export const melbourne: AuCity = {
  slug: "melbourne",
  name: "Melbourne",
  state: "Victoria",
  stateCode: "VIC",
  summary: "A city of independent venues, labels, studios and founders who expect their brand to look the part.",
  zone: { std: AEST, dst: AEDT },
  areas: ["Melbourne CBD", "Richmond", "Fitzroy", "Collingwood", "South Yarra", "St Kilda", "Brunswick", "Cremorne", "Docklands", "Box Hill", "Footscray", "Dandenong", "Frankston", "Doncaster"],
  nearby: ["sydney", "adelaide", "hobart"],
  page: {
    metaTitle: "Websites, Online Stores & Marketing for Melbourne Businesses",
    metaDescription:
      "Help for Melbourne venues, fashion labels, makers and startups: websites, Shopify stores, SEO, social and automation that turn a good brand into steady sales.",
    h1: "Turning good Melbourne brands into busy ones",
    intro: [
      "Melbourne runs on independents: cafés and restaurants, fashion labels, design studios, makers and a busy startup scene. Taste matters here. Customers judge a business by its Instagram and its website before they walk in or buy, and they notice when either feels off.",
      "We help Melbourne businesses make the part underneath the brand work as well as the brand does: fast sites, stores that sell on a phone, bookings and orders that do not need someone at a keyboard. We work remotely from Lucknow and Mumbai in India, with no Melbourne office, and the person who scopes your work is the one who does it.",
    ],
    sections: [
      {
        heading: "Style first, systems later, and the cost of that order",
        body: [
          "Melbourne businesses are quick to invest in how they look and slower to fix what sits behind it. We see beautiful sites with menus as PDFs nobody can read on a phone, Shopify stores with twenty apps fighting each other, and booking enquiries handled by hand across three inboxes.",
          "None of that shows in a mood board, but it shows up in the numbers: slower pages, abandoned carts, missed bookings. The growth usually comes from fixing those without losing what makes the brand worth choosing.",
        ],
      },
      {
        heading: "Working with us from Melbourne",
        body: [
          "We start with a short written brief from you and reply with what we would change first and a fixed price. Our day begins at 14:30 Melbourne time (15:30 in daylight saving) and runs into the evening, which suits venues that are busy at lunch and quiet mid-afternoon.",
        ],
      },
    ],
    industries: [
      { name: "Hospitality", need: "Venues need menus, bookings and Google listings that are right every day, not just at launch." },
      { name: "Fashion and lifestyle labels", need: "Direct-to-consumer brands need a store that sells on Instagram traffic and brings customers back." },
      { name: "Startups and tech", need: "Founders need a marketing site now and a product they can raise on soon, ideally on one codebase." },
      { name: "Manufacturing and wholesale", need: "Firms in Dandenong, Laverton and the north need trade ordering online instead of email chains." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "Our menu is a PDF and people can't read it on a phone",
        cause: "PDF menus are slow to open, impossible to read without zooming, and invisible to Google when someone searches for a dish near them.",
        steps: [
          "Turn the menu into a real web page your team can update in minutes",
          "Mark it up so Google can show it in search and Maps",
          "Link bookings straight from the menu page",
        ],
      },
      {
        service: "shopify-development",
        symptom: "Our store crashes or slows to a crawl on drop days",
        cause: "Limited releases bring traffic spikes that heavy themes, stacked apps and unoptimised images can't handle.",
        steps: [
          "Strip apps and scripts that load on every page",
          "Load-test the store before the next drop",
          "Set up a queue or pre-order flow for the most popular items",
        ],
      },
      {
        service: "social-media-marketing",
        symptom: "We have followers, but they don't turn into sales",
        cause: "Posts build awareness but rarely give a reason to act now, and there is no tracking from post to purchase.",
        steps: [
          "Give regular posts a clear action: shop, book or visit",
          "Retarget people who engaged but did not buy",
          "Track sales from social so you know which content earns",
        ],
      },
      {
        service: "software-development",
        symptom: "Trade customers still order by email and phone",
        cause: "Wholesale orders arrive in every format, so someone re-keys them, checks stock by hand and chases missing details.",
        steps: [
          "Give trade customers a login with their own prices",
          "Let them reorder from history and see stock levels",
          "Send orders straight to your accounting or warehouse system",
        ],
      },
      {
        service: "seo",
        symptom: "People search for what we do in our suburb and find someone else",
        cause: "Inner Melbourne is dense: ten similar venues or studios within walking distance, and Google favours the ones with fuller profiles and more reviews.",
        steps: [
          "Complete your Google Business Profile, including products, menu and photos",
          "Build a steady flow of reviews that mention what you do",
          "Add pages that answer the specific searches people make",
        ],
      },
      {
        service: "api-integration",
        symptom: "Our shop and online stock never match",
        cause: "The POS in-store and the online store keep separate stock counts, so items sell twice or show as sold out when they are not.",
        steps: [
          "Pick one system as the source of truth for stock",
          "Sync stock both ways in near real time",
          "Alert someone when a sync fails instead of failing silently",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have a Melbourne office?",
        answer: "No. Our offices are in Lucknow and Mumbai, India. Melbourne clients work with us over video calls, WhatsApp and email, and we are upfront about that so you can decide early whether it suits you.",
      },
      {
        question: "Can you work with our existing designer or brand agency?",
        answer: "Yes, and we often do. Many Melbourne brands already have a designer they love. We build from their designs, flag anything that will hurt speed or usability, and keep the brand intact.",
      },
      {
        question: "When are you available in Melbourne time?",
        answer: "From 14:30 to 23:30 AEST, or 15:30 to 00:30 during daylight saving, Monday to Saturday. Send something in the morning and you will hear back in the afternoon.",
      },
      {
        question: "What does it cost?",
        answer: "We quote a fixed price for each project after reading your brief, usually within one working day. Scoping is free, and if what you need is small, we will tell you that too.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Melbourne — For Venues, Studios & Brands",
      metaDescription:
        "Website development for Melbourne venues, studios and independent brands: fast sites with real menus, bookings and content your team can update in minutes.",
      h1: "Website development for Melbourne businesses whose website is the first visit",
      card: "Sites with real menus, bookings and pages your team can update.",
      intro: [
        "In Melbourne, people visit your website before they visit you. They check the menu before choosing a dinner spot, the portfolio before booking a studio, and the opening hours before crossing town. If the site is slow, out of date or hard to use on a phone, they choose somewhere else without telling you.",
        "We build websites for Melbourne venues, studios, clinics and independent businesses that keep up with how often you change: menus, events, team, prices and opening hours your own staff can update.",
      ],
      sections: [
        {
          heading: "A site that keeps up with your week",
          body: [
            "Most Melbourne businesses change something on their site every week: a seasonal menu, a new collection, an event or a guest chef. We build editing screens for exactly those things, so updating the menu takes five minutes and nobody has to wait for a developer.",
            "Menus, events and opening hours are built as real web pages with structured data, so Google can show them in search results and Maps, rather than as PDFs or images that search engines cannot read.",
          ],
        },
        {
          heading: "Bookings without the back-and-forth",
          body: [
            "Whether you take table bookings, appointments or studio sessions, we connect the platform you already use, or build booking into the site if your rules are unusual. Deposits, cancellation policies and reminder messages are set up so fewer bookings become no-shows.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Updating the website means waiting days for a developer",
          cause: "The site was built without editing tools for the content that changes most, so every small update becomes a request.",
          steps: [
            "List what you change most often: menu, events, team, prices",
            "Build simple editing screens for each one",
            "Train your team in a single short session",
          ],
        },
        {
          symptom: "People ring us to ask things the website should answer",
          cause: "Opening hours, dietary options, parking and booking rules are missing or out of date.",
          steps: [
            "Note the questions your staff answer most often for a week",
            "Answer each one clearly on the site",
            "Keep hours and details in sync with your Google Business Profile",
          ],
        },
      ],
      checklist: [
        "Your menu or price list is a web page, not a PDF",
        "Your staff can update hours and specials without a developer",
        "Someone can book from your site at midnight",
        "Your website and Google listing show the same opening hours",
      ],
      faqs: [
        {
          question: "Can we keep our current booking system?",
          answer: "Usually yes. We connect most booking platforms to the site. If yours has no proper integration, we will say so and suggest options.",
        },
        {
          question: "WordPress or something else?",
          answer: "For content-led Melbourne businesses that update often, WordPress with a tidy custom theme is often right. For sites that need speed and custom features, we use Next.js. We explain the choice in the scope.",
        },
        {
          question: "Who writes the content?",
          answer: "You know your business; we know how to structure pages so they are found and read. We draft from a short interview with you, then you edit.",
        },
      ],
      caseStudies: ["thegrafftee", "saurally"],
    },
    "web-design": {
      metaTitle: "Web Design in Melbourne — Considered Design That Still Converts",
      metaDescription:
        "Web design for Melbourne brands that care how they look: built around your photography and voice, with speed, accessibility and clear next steps intact.",
      h1: "Web design for Melbourne brands that care how they look, and need it to sell",
      card: "Considered design that keeps speed and clear next steps.",
      intro: [
        "Design carries more weight in Melbourne than in most markets. Customers here notice type, photography and tone, and an off-the-shelf look can undo years of work on a brand. But a beautiful site that loads slowly or hides the booking button still loses customers.",
        "We design around your real photography and your voice, and we keep the basics intact underneath: fast pages, clear actions, readable text and a layout that works with one hand on a tram.",
      ],
      sections: [
        {
          heading: "Your brand, not a theme",
          body: [
            "We start from your existing identity, including your type, colour, photography and the way you write, and design templates that feel like you rather than adjusting a theme until it nearly fits. If you work with a brand studio, we design alongside them.",
            "Motion and big imagery are used where they add something, and we measure their effect on load time. Nothing ships if it makes the site noticeably slower on a phone.",
          ],
        },
        {
          heading: "Taste and accessibility can coexist",
          body: [
            "Light grey text on white and tiny type look refined in a mock-up and are hard to read for many people. We design to WCAG 2.2 AA from the start, adjusting the palette and type scale so the site stays both readable and on-brand.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site looks great but doesn't bring in bookings or sales",
          cause: "Design choices put mood ahead of action: the call to action is hidden, the menu is unclear and key information sits below long imagery.",
          steps: [
            "Watch real visitors use the site with session recordings",
            "Keep the look, but move the next step into view on every screen",
            "Measure enquiries before and after each change",
          ],
        },
        {
          symptom: "Our designer's work doesn't survive being built",
          cause: "Designs were handed over without mobile layouts or detail on states, and the build filled in the gaps differently.",
          steps: [
            "Design every key template for mobile and desktop",
            "Agree on the states: hover, error, empty and loading",
            "Review the built pages against the designs before launch",
          ],
        },
      ],
      checklist: [
        "Your site uses your own photography, not stock",
        "Body text is easy to read on a phone in daylight",
        "The next step is visible without scrolling on mobile",
        "Animations don't delay the page from appearing",
      ],
      faqs: [
        {
          question: "Can you work from our designer's Figma files?",
          answer: "Yes. We build from Figma files regularly and will flag anything that would hurt performance, accessibility or editing before we start.",
        },
        {
          question: "Do you design logos?",
          answer: "Our focus is website and product design. If you need a new identity, we will say so up front and agree how to approach it before web design starts.",
        },
      ],
      caseStudies: ["tatvivahtrends", "kalamohini"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Melbourne — Stores for Independent Labels",
      metaDescription:
        "Ecommerce development for Melbourne fashion, lifestyle and food brands: size guides, easy exchanges, national freight and checkout that sells on mobile.",
      h1: "Ecommerce development for Melbourne labels selling beyond Victoria",
      card: "Online stores with sizing, exchanges and national freight sorted.",
      intro: [
        "A lot of Melbourne's independent labels sell well in their own shop and at markets, then find that selling online to the rest of Australia is a different problem. Customers cannot try the product on, freight to Perth costs a lot more than to Brunswick, and returns can quietly swallow the margin.",
        "We build online stores that deal with those problems directly: clear sizing, easy exchanges, freight priced by zone and a checkout that works on a phone.",
      ],
      sections: [
        {
          heading: "Selling things people want to touch first",
          body: [
            "For fashion and homewares, the product page does the job a fitting room or shelf would. We design for that: several real photos and short videos, sizing in centimetres with a fit note, fabric and care details, and reviews that mention fit.",
            "Exchanges are cheaper than refunds and keep the customer. We build an exchange-first returns flow that stays within Australian Consumer Law, so customers keep their rights and you keep more of the sale.",
          ],
        },
        {
          heading: "Freight from Victoria",
          body: [
            "Shipping from Melbourne to WA, the NT or Tasmania costs more and takes longer. We set rates by zone, set a free-shipping threshold that protects margin, and connect your courier or warehouse so labels and tracking happen automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Returns are eating our margin",
          cause: "Unclear sizing leads to wrong orders, and a refund-only process loses both the sale and the customer.",
          steps: [
            "Add sizing in centimetres and a fit note on every product",
            "Offer exchanges and store credit first, within consumer law",
            "Track the return reasons and fix the products causing them",
          ],
        },
        {
          symptom: "We sell well in-store but not online",
          cause: "The online store shows the product but not the experience: few photos, no fit or material detail, no story.",
          steps: [
            "Reshoot hero products with detail and on-body photos",
            "Write product copy that answers in-store questions",
            "Add reviews and user photos where buyers decide",
          ],
        },
      ],
      checklist: [
        "Every clothing product has measurements in centimetres",
        "Customers can request an exchange without emailing you",
        "Freight to WA and the NT is priced separately from metro",
        "You know your top three return reasons",
      ],
      faqs: [
        {
          question: "Can you connect our store to a third-party warehouse?",
          answer: "Yes. We connect stores to most Australian 3PLs and couriers so orders flow to the warehouse and tracking flows back to the customer.",
        },
        {
          question: "Do you handle product photography?",
          answer: "No, but we will tell you exactly what shots each product page needs and can recommend how to brief a photographer.",
        },
      ],
      caseStudies: ["samaraha", "vashtaraheaven"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Melbourne — Built for Drops & Repeat Buyers",
      metaDescription:
        "Shopify developers for Melbourne labels: themes that match your brand, stores that survive launch-day traffic, and email flows that bring the second order.",
      h1: "Shopify development for Melbourne labels that launch in drops",
      card: "Shopify stores that hold up on launch day and earn repeat orders.",
      intro: [
        "Melbourne has one of the densest communities of independent fashion and lifestyle labels in the country, and most of them sell on Shopify. Many sell in drops: a limited release, a rush of traffic in the first hour, and then a quiet week.",
        "We build and tune Shopify stores for that pattern, with themes that match the brand, stores that stay fast when everyone arrives at once, and the email and loyalty flows that bring buyers back between drops.",
      ],
      sections: [
        {
          heading: "Surviving launch day",
          body: [
            "Shopify's servers handle traffic well. What slows a store under load is usually the theme and its apps: scripts that run on every page, oversized images and third-party widgets that all call home at once. We trim those before a launch, and test the pages people will hit first.",
            "For limited stock, we set up pre-orders, waitlists or back-in-stock alerts so demand you cannot fill today still becomes a sale later.",
          ],
        },
        {
          heading: "The second order",
          body: [
            "Most of a label's profit comes from customers who buy again. We set up post-purchase, browse-abandonment and win-back emails, and loyalty or referral programmes where they make sense, so your best customers hear from you between drops.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Most customers buy once and never come back",
          cause: "There is no follow-up after the first order: no thank-you sequence, no care tips and no reason to return.",
          steps: [
            "Set up a post-purchase email sequence with care and styling tips",
            "Add a win-back email for customers who have gone quiet",
            "Reward referrals and repeat purchases",
          ],
        },
        {
          symptom: "Our app bill keeps growing",
          cause: "Each new need was met with another app, and some overlap or are no longer used.",
          steps: [
            "List every app, its cost and what it actually does",
            "Remove duplicates and anything a theme section can replace",
            "Re-measure speed and monthly spend afterwards",
          ],
        },
      ],
      checklist: [
        "You have tested your store's speed before your last drop",
        "Sold-out products collect back-in-stock emails",
        "First-time buyers get a follow-up sequence",
        "You know which of your apps you could remove",
      ],
      faqs: [
        {
          question: "Can you migrate us from another platform to Shopify?",
          answer: "Yes. Products, customers and order history move across, and every old URL is redirected so search traffic is kept.",
        },
        {
          question: "Do you set up Klaviyo or Shopify Email?",
          answer: "Yes, either one. We set up the core flows, connect the store's events, and hand over templates in your brand that your team can reuse.",
        },
      ],
      caseStudies: ["clickngreet", "mahhika"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Melbourne — Platforms With Quality Control",
      metaDescription:
        "Marketplace development for Melbourne founders: makers, hire and services platforms with seller vetting, reviews, split payments and admin that keeps quality high.",
      h1: "Marketplace development for Melbourne founders curating makers, hire or services",
      card: "Curated marketplaces with seller vetting and split payments.",
      intro: [
        "Melbourne's marketplace ideas often come from its creative economy: platforms for makers, studio hire, equipment rental, event services or local trades. The ones that work are curated. Buyers trust them because someone keeps quality high.",
        "We build marketplaces with that curation built in: seller applications and vetting, listings that meet a standard, reviews, messaging and payouts, plus the admin tools that let a small team keep it that way. We built MariBiz.ai, a verified-vendor procurement marketplace, so seller verification is familiar ground.",
      ],
      sections: [
        {
          heading: "Quality control is the product",
          body: [
            "An open marketplace fills quickly with poor listings. We build seller onboarding with applications, review queues and listing standards, so your team approves who sells and what they list. As you grow, some of that review can be automated, with a person making the final call.",
          ],
        },
        {
          heading: "Payments and records",
          body: [
            "Buyers pay once, sellers get paid automatically, and your commission is calculated and invoiced on every order, using Stripe Connect in AUD. Seller records are kept in a form you can export for the ATO's reporting rules for platforms, rather than assembled by hand at the end of each period.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Listing quality is all over the place",
          cause: "Sellers can publish anything, with no standards for photos, descriptions or pricing.",
          steps: [
            "Set clear listing standards and required fields",
            "Add a review queue for new sellers and listings",
            "Let buyers report listings and act on reports quickly",
          ],
        },
        {
          symptom: "We match buyers and sellers by hand and can't scale it",
          cause: "The business works, but every booking runs through the founders' inboxes.",
          steps: [
            "Write down every step from enquiry to payment",
            "Move search, booking and payment onto the platform first",
            "Automate reminders, payouts and reviews next",
          ],
        },
      ],
      checklist: [
        "You can explain who is allowed to sell and why",
        "Sellers are paid automatically, not by manual transfer",
        "Every transaction produces an invoice for your commission",
        "Your team can remove a bad listing in under a minute",
      ],
      faqs: [
        {
          question: "Should we build custom or use a marketplace platform?",
          answer: "Off-the-shelf marketplace software can work for a test. Custom makes sense once your rules for vetting, pricing or booking stop fitting the template. We will tell you which stage you are at.",
        },
        {
          question: "How long does a first version take?",
          answer: "Typically ten to sixteen weeks for listings, search, checkout or booking, payouts and basic admin. A tighter first scope makes for a faster launch.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Melbourne — For Startups & Headless Stores",
      metaDescription:
        "Next.js developers for Melbourne startups and brands: marketing site and product on one codebase, headless Shopify, and code an in-house team can take over.",
      h1: "Next.js development for Melbourne startups that need to move fast",
      card: "Startup products and headless stores on one fast codebase.",
      intro: [
        "Melbourne's startups, from Cremorne to the CBD, usually need two things at once: a marketing site that explains the product clearly, and the product itself, ready for customers and the next investor demo. Next.js lets both live in one codebase with one design system.",
        "We build Next.js products, marketing sites and headless Shopify storefronts for Melbourne founders, with tidy code that a future in-house team can pick up without a rewrite.",
      ],
      sections: [
        {
          heading: "One codebase, two jobs",
          body: [
            "Your marketing pages are rendered for speed and search, and your app sits behind a login in the same project. Changes to the brand, pricing or components update everywhere at once, and you only pay for one set of hosting and tooling.",
            "We used this approach for NEXTmentor, a course platform with payments, a player that remembers progress and verifiable certificates.",
          ],
        },
        {
          heading: "Headless commerce for brands",
          body: [
            "For Melbourne labels whose design ambitions outgrow Shopify themes, a headless storefront in Next.js keeps Shopify's checkout and admin while giving full control over the front end. It costs more to build and run, so we only recommend it when a theme genuinely cannot do the job.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our MVP is held together with no-code tools",
          cause: "No-code got you to launch, and now limits, workarounds and per-user costs are slowing you down.",
          steps: [
            "Map what the product does today and where it breaks",
            "Rebuild the core in Next.js and Postgres you own",
            "Migrate users and data with no downtime",
          ],
        },
        {
          symptom: "Our theme can't do what our designer wants",
          cause: "The design needs layouts and interactions the theme was never built for.",
          steps: [
            "Check whether a custom theme would be enough",
            "If not, build a headless front end on Shopify",
            "Keep checkout on Shopify for reliability and payment options",
          ],
        },
      ],
      checklist: [
        "Your product's code is in a repository your company owns",
        "There are automated tests for the core user flows",
        "A new developer could run the project locally within a day",
        "Marketing pages load fast and are indexable",
      ],
      faqs: [
        {
          question: "Can you work alongside our in-house developers?",
          answer: "Yes. We work in your repository, follow your conventions and review process, and document what we build.",
        },
        {
          question: "Where would our app be hosted?",
          answer: "Usually on Vercel or AWS. AWS has a Melbourne region, so data can stay in Victoria if your customers require it.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Melbourne — Staff & Warehouse Apps",
      metaDescription:
        "Android app development for Melbourne warehouses, manufacturers and service teams: native Kotlin apps for scanning, jobs and stock, with honest advice on iPhone.",
      h1: "Android apps for Melbourne warehouses, workshops and field teams",
      card: "Native Android apps for scanning, stock and staff workflows.",
      intro: [
        "Our native strength is Android. In Melbourne that fits best in the places where you choose the hardware: warehouses and factories in the south-east and west, delivery fleets, service technicians and venues using tablets at the counter.",
        "For consumer apps, we are honest about the market. Australians use iPhones more than Android phones, so a customer app usually needs both. In that case we scope a React Native build separately and say so in the quote, because we do not take on native iOS work.",
      ],
      sections: [
        {
          heading: "Scanning, stock and staff",
          body: [
            "Many Melbourne manufacturers and wholesalers still count stock on paper and type it in later. An Android app on a rugged scanner or phone can record receiving, picking and stock counts as they happen, with barcode scanning and offline support for areas with poor reception.",
            "The data goes straight into your inventory or accounting system, so the office and the floor see the same numbers.",
          ],
        },
        {
          heading: "Do you need an app at all?",
          body: [
            "For customer-facing ideas, we will check whether a fast mobile website would do the job without an app store download. For staff tools, an app is usually the right answer because it can use the camera and scanner and work offline.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Stock counts never match the system",
          cause: "Counts are written on paper and entered later, with errors and delays.",
          steps: [
            "Put barcode scanning on Android devices on the floor",
            "Record stock movements as they happen, even offline",
            "Sync to your inventory system automatically",
          ],
        },
        {
          symptom: "Technicians send photos and notes by text message",
          cause: "There is no structured way to record job details on site, so information gets lost.",
          steps: [
            "Build a job app with checklists, photos and signatures",
            "Attach everything to the job record automatically",
            "Send completion reports to customers from the app",
          ],
        },
      ],
      checklist: [
        "You know which devices your staff would use",
        "You know what must work without a signal",
        "You know which system the app must send data to",
        "You have someone to own the app after launch",
      ],
      faqs: [
        {
          question: "Can the app run on scanners as well as phones?",
          answer: "Yes. Many rugged scanners run Android, and we can build for their scanning hardware as well as phone cameras.",
        },
        {
          question: "Do you build for iPhone?",
          answer: "Not natively. If you need both platforms, we scope a React Native build separately and make that clear in the quote.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Melbourne — Get Found in Your Neighbourhood",
      metaDescription:
        "SEO for Melbourne venues, studios and shops: Google Business Profile, local content and reviews that win discovery searches in crowded inner suburbs.",
      h1: "SEO for Melbourne businesses competing on the same street",
      card: "Local SEO for crowded inner suburbs and discovery searches.",
      intro: [
        "Inner Melbourne is dense. In Fitzroy, Richmond or the CBD there might be ten similar venues, studios or shops within walking distance, and people choose between them from a search on their phone: \"best ramen CBD\", \"pilates Richmond\", \"vintage furniture Collingwood\".",
        "We help Melbourne businesses win those searches through a complete Google Business Profile, a steady stream of reviews, and pages that answer exactly what people are looking for.",
      ],
      sections: [
        {
          heading: "Discovery searches, not just your name",
          body: [
            "People who already know you will find you. Growth comes from the people who search for what you do without a name in mind. We research those searches for your category and suburb, then build pages and profile content that match them.",
            "For venues, that includes the menu, dietary options and features like outdoor seating or private dining, marked up so Google can show them in results.",
          ],
        },
        {
          heading: "Reviews that help you rank",
          body: [
            "Reviews influence both rankings and choices, and reviews that mention what you do help most. We set up a simple, compliant way to ask happy customers for reviews, and a routine for replying to all of them.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We're on Google Maps but rarely in the top three",
          cause: "Your profile is less complete than competitors' nearby, with fewer recent reviews and photos.",
          steps: [
            "Fill every section of the profile: products, services, attributes",
            "Post photos and updates every week",
            "Ask every satisfied customer for a review",
          ],
        },
        {
          symptom: "Our blog gets visits but no customers",
          cause: "Posts target broad topics far from what you sell, so the readers are not buyers.",
          steps: [
            "Find searches made by people ready to buy or book",
            "Write pages that answer those searches directly",
            "Link those pages to booking or product pages",
          ],
        },
      ],
      checklist: [
        "Your Google profile lists your menu, products or services in full",
        "You posted a photo to your profile in the last two weeks",
        "You reply to every Google review, good or bad",
        "You know three searches people use to find businesses like yours",
      ],
      faqs: [
        {
          question: "How quickly can a Melbourne venue see results?",
          answer: "Profile improvements often show within a few weeks. Ranking pages for competitive discovery searches usually takes three to six months of steady work.",
        },
        {
          question: "Can we buy reviews or offer discounts for them?",
          answer: "No. Fake or incentivised reviews breach Google's policies and can mislead consumers under Australian Consumer Law. We help you ask real customers at the right moment.",
        },
      ],
      caseStudies: ["krushidoctor", "newsaraswatisareecentre"],
    },
    "google-ads": {
      metaTitle: "Google Ads Management in Melbourne — Shopping & Search That Pays",
      metaDescription:
        "Google Ads for Melbourne retailers and labels: Shopping campaigns from a clean product feed, sale-season planning and tracking that shows profit, not clicks.",
      h1: "Google Ads for Melbourne retailers who need ads to show a profit",
      card: "Shopping and search campaigns planned around profit and sale seasons.",
      intro: [
        "For Melbourne retailers and labels, Google Ads is mostly Shopping: product listings with a photo and price at the top of the results. Those campaigns run on your product feed, and a messy feed with vague titles and missing details limits results whatever the budget.",
        "We manage Google Ads for Melbourne retailers with the feed fixed first, campaigns split by margin, and reporting that shows profit after ad spend.",
      ],
      sections: [
        {
          heading: "The feed comes first",
          body: [
            "Product titles that include what the item is, the material, colour and size win more relevant searches. Correct categories, GTINs where they exist, and good images keep products approved. We clean the feed in Merchant Center before raising any bids.",
          ],
        },
        {
          heading: "Planning around the sale calendar",
          body: [
            "Australian retail has its peaks: end of financial year, Click Frenzy, Black Friday, Boxing Day. We plan budgets and creative ahead of them, and protect margin by keeping discounted and full-price products in separate campaigns.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Performance Max spends the budget and we can't see where",
          cause: "Automated campaigns given little guidance spend on whatever converts cheapest, often your own brand searches or low-margin items.",
          steps: [
            "Separate brand searches from the rest",
            "Group products by margin so bids reflect profit",
            "Review where spend went and add exclusions",
          ],
        },
        {
          symptom: "Our products are disapproved in Merchant Center",
          cause: "Missing identifiers, mismatched prices or policy problems on the product pages.",
          steps: [
            "Work through the diagnostics report item by item",
            "Fix the feed and the product pages it points to",
            "Set up alerts so new issues are caught early",
          ],
        },
      ],
      checklist: [
        "Your product titles say what each item actually is",
        "Merchant Center shows no disapproved products",
        "You can see profit after ad spend, not just revenue",
        "Brand searches are reported separately from new customers",
      ],
      faqs: [
        {
          question: "Do you manage Meta ads as well?",
          answer: "Yes, as part of our social media marketing. Many Melbourne labels do best with both: Google for people searching, Meta for discovery.",
        },
        {
          question: "What is the minimum contract?",
          answer: "We agree a trial period in the scope, long enough for the account to collect meaningful data. You own the account throughout.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Melbourne — Instagram & TikTok That Sells",
      metaDescription:
        "Social media marketing for Melbourne venues and labels: content you can keep up, creator partnerships, and paid social that drives bookings and sales.",
      h1: "Social media marketing for Melbourne venues and labels people discover on their phones",
      card: "Instagram and TikTok content and ads tied to bookings and sales.",
      intro: [
        "In Melbourne, a venue or label is often found on Instagram or TikTok before anyone searches for it. A video of a dish, a fitting-room try-on or a studio tour can fill a weekend, and a feed that has gone quiet tells people the business has too.",
        "We plan content around what you actually do each week, help you work with local creators, and run paid social aimed at people within reach of your door or likely to buy.",
      ],
      sections: [
        {
          heading: "Content from the work you already do",
          body: [
            "We build a monthly plan from your calendar, such as new menu items, collection launches, events and behind-the-scenes moments, with a short shot list your team can film on a phone. We edit, caption and schedule.",
          ],
        },
        {
          heading: "Creators and paid reach",
          body: [
            "Melbourne has a strong community of local food, fashion and lifestyle creators. We help you find ones whose audiences match yours and agree clear terms. Then we put paid budget behind the posts that are already working, and track bookings and sales, not just views.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our posts get likes from people who never come in",
          cause: "Reach goes to people outside your area or outside your audience.",
          steps: [
            "Target paid reach by location and interest",
            "Partner with creators whose followers are local",
            "Track visits, bookings and sales from social",
          ],
        },
        {
          symptom: "We go quiet when the business gets busy",
          cause: "Content depends on one person finding time to plan and film.",
          steps: [
            "Batch-film a month of content in one session",
            "Keep a backlog of evergreen posts for busy weeks",
            "Let us handle editing and scheduling",
          ],
        },
      ],
      checklist: [
        "You have posted at least once a week this month",
        "Your bio link leads to booking or shopping, not just your homepage",
        "You know which post brought the most sales this quarter",
        "You have worked with at least one local creator",
      ],
      faqs: [
        {
          question: "Do creator partnerships need to be disclosed?",
          answer: "Yes. Paid or gifted posts must be clearly marked as advertising under Australian Consumer Law and the advertising code. We include that in every agreement.",
        },
        {
          question: "Do you film content in Melbourne?",
          answer: "No. We are remote, so we plan the shots and you or a local creator film them. In our experience, phone footage from your own team often performs best.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Melbourne — Less Admin for Venues & Brands",
      metaDescription:
        "AI automation for Melbourne venues, studios and brands: function enquiries, supplier invoices, customer emails and reporting handled automatically, with a person reviewing.",
      h1: "AI automation for Melbourne businesses where the admin happens after closing time",
      card: "Function enquiries, invoices and inboxes handled automatically.",
      intro: [
        "In many Melbourne venues and small brands, the admin happens after close: answering function enquiries, entering supplier invoices, replying to customer emails and pulling together sales figures. It is work that needs doing and adds nothing to the customer's experience.",
        "We build AI automation that handles much of it, reading, sorting and drafting, with a person approving anything that goes to a customer or into the books.",
      ],
      sections: [
        {
          heading: "Common first projects",
          body: [
            "Function and event enquiries answered instantly with packages, availability and a booking link. Supplier invoices read from email and entered into Xero for approval. Customer emails sorted by type, with drafted replies for the common ones. Weekly sales summaries built from your POS and store.",
          ],
        },
        {
          heading: "Your data, handled carefully",
          body: [
            "We work from India, so for businesses covered by the Privacy Act, giving us access to customers' personal data is a disclosure overseas under Australian Privacy Principle 8. We build with test data, limit production access, and choose AI providers whose terms keep your data out of model training.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Function enquiries take days to answer",
          cause: "Each one needs packages, menus and availability checked by the one person who knows them.",
          steps: [
            "Put packages and pricing into a structured form",
            "Reply instantly with options and a booking link",
            "Pass confirmed interest to your events lead with a summary",
          ],
        },
        {
          symptom: "Supplier invoices pile up until the weekend",
          cause: "Invoices arrive as PDFs in email and are entered by hand.",
          steps: [
            "Read invoices from a dedicated inbox automatically",
            "Create draft bills in your accounting software",
            "Approve them in batches with a quick check",
          ],
        },
      ],
      checklist: [
        "Event enquiries get a useful reply within an hour",
        "Supplier invoices are not typed in by hand",
        "Common customer emails have ready replies",
        "You can see last week's sales without building a spreadsheet",
      ],
      faqs: [
        {
          question: "Is this affordable for a single venue?",
          answer: "Often, yes. A focused automation that saves a few hours a week can pay for itself quickly. We estimate the time saved before you commit.",
        },
        {
          question: "What if the AI gets something wrong?",
          answer: "Anything going to a customer or into your accounts is reviewed by a person first, at least until the automation has a long, reliable track record.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Melbourne — Trade Portals for Manufacturers",
      metaDescription:
        "Custom software for Melbourne manufacturers and wholesalers: B2B ordering portals, customer pricing, reorders and stock visibility, connected to your accounting.",
      h1: "Custom software for Melbourne manufacturers and wholesalers still taking orders by email",
      card: "B2B ordering portals with customer pricing and reorders.",
      intro: [
        "Melbourne's manufacturing and wholesale businesses, from Dandenong and Braeside to Laverton and the northern suburbs, often take trade orders by email, phone and spreadsheet. Someone re-keys each order, checks stock by hand and chases missing details.",
        "We build B2B ordering portals and internal tools that end that: customers log in, see their own prices and stock, reorder in a few clicks, and orders flow straight into your systems.",
      ],
      sections: [
        {
          heading: "A trade portal that fits how you sell",
          body: [
            "Trade customers each have their own price list, credit terms and minimum quantities. We build portals that handle all of that, with quick reorder from history, saved lists, delivery scheduling and invoices they can download.",
            "Orders go into your accounting or ERP system automatically, and your team sees one queue instead of three inboxes.",
          ],
        },
        {
          heading: "Start small, then extend",
          body: [
            "The first version usually covers ordering for your biggest customers. Once it works, we add quoting, returns, sales-rep tools or a field app, each scoped and priced separately.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our sales team spends the day typing in orders",
          cause: "Orders arrive in every format and must be re-entered by hand.",
          steps: [
            "Give trade customers a portal with their own pricing",
            "Send portal orders straight to your accounting system",
            "Move your largest customers across first",
          ],
        },
        {
          symptom: "Customers call to ask if things are in stock",
          cause: "Stock levels live in a system customers cannot see.",
          steps: [
            "Show live stock levels in the portal",
            "Let customers see expected restock dates",
            "Notify them when back-ordered items arrive",
          ],
        },
      ],
      checklist: [
        "Trade customers can reorder without calling or emailing",
        "Each customer sees their own price list automatically",
        "Orders reach your accounting system without re-keying",
        "Customers can download their own invoices",
      ],
      faqs: [
        {
          question: "Can the portal work with MYOB or Xero?",
          answer: "Yes. We connect to both, and to many ERPs through their APIs. We confirm what your version supports before quoting.",
        },
        {
          question: "Could we use Shopify B2B instead?",
          answer: "Sometimes. If your pricing and ordering rules fit Shopify's B2B features, that can be cheaper. We will compare both honestly during scoping.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "api-integration": {
      metaTitle: "API Integration in Melbourne — Sync POS, Store, 3PL & Xero",
      metaDescription:
        "API integration for Melbourne retailers and brands: keep POS, online store, warehouse and accounting in sync so stock, orders and payments match everywhere.",
      h1: "API integration for Melbourne retailers running a shop, a store and a warehouse",
      card: "Keep POS, online store, 3PL and accounting in sync.",
      intro: [
        "A Melbourne retailer with a physical shop and an online store often runs four systems: a POS like Square or Lightspeed, Shopify or WooCommerce, a third-party warehouse, and Xero or MYOB. When they disagree, items sell twice, orders go missing and month-end takes days.",
        "We connect those systems so stock, orders, refunds and payments match everywhere, with alerts when anything fails.",
      ],
      sections: [
        {
          heading: "One source of truth for stock",
          body: [
            "We decide with you which system owns stock, then sync it to the others in near real time. Sales in-store reduce online stock, online orders reach the warehouse, and returns go back into the right count.",
          ],
        },
        {
          heading: "Clean books",
          body: [
            "Daily sales, fees, refunds and GST flow into your accounting software in a summary your bookkeeper can reconcile, instead of hundreds of separate entries or a monthly spreadsheet.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We oversell items that are actually out of stock",
          cause: "The shop and online store keep separate counts that sync slowly or not at all.",
          steps: [
            "Choose one system as the stock master",
            "Sync stock changes across systems within minutes",
            "Hold a small safety buffer on fast-selling items",
          ],
        },
        {
          symptom: "Month-end reconciliation takes days",
          cause: "Payments, fees and refunds from several channels are entered by hand.",
          steps: [
            "Map each channel's transactions to your chart of accounts",
            "Post daily summaries to accounting automatically",
            "Flag anything that does not reconcile",
          ],
        },
      ],
      checklist: [
        "An in-store sale updates online stock within minutes",
        "Online orders reach your warehouse automatically",
        "Daily sales post to your accounting software without typing",
        "You are alerted when a sync fails",
      ],
      faqs: [
        {
          question: "Which POS systems can you connect?",
          answer: "Any with a usable API, including Square, Lightspeed and Shopify POS. We check the specific version and plan before quoting.",
        },
        {
          question: "What happens if a sync breaks?",
          answer: "Every integration we build logs what it does and sends an alert on failure, so problems are caught the same day, not at month-end.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Melbourne — AWS Set-Up for Startups & Brands",
      metaDescription:
        "Cloud set-up for Melbourne startups and brands: AWS in the Melbourne region, staging environments, scaling for launches and bills that don't creep.",
      h1: "Cloud set-up for Melbourne startups and brands that have outgrown basic hosting",
      card: "AWS in the Melbourne region, staging, scaling and cost control.",
      intro: [
        "Melbourne startups often launch on whatever hosting was quickest, then hit the limits: no staging environment, deployments done by hand, nobody sure what is running or why the bill went up. Brands with big launch days need hosting that scales without paying for peak capacity all month.",
        "We set up cloud infrastructure that fits: environments for testing, automatic deployments, scaling for launch days and budgets with alerts.",
      ],
      sections: [
        {
          heading: "Data in Victoria if you need it",
          body: [
            "AWS opened a Melbourne region, alongside its Sydney region, and Azure and Google Cloud also run Australian regions. Customers in health, education and government often ask where data is held. We host in the region you need and document it so you can answer that question accurately.",
          ],
        },
        {
          heading: "Grown-up deployments",
          body: [
            "Every change goes to a staging environment first, then to production through an automated pipeline. Rollback is one step. Startups that set this up early ship faster and break less as the team grows.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We test changes on the live site",
          cause: "There is no staging environment, so every release risks breaking production.",
          steps: [
            "Create a staging environment that mirrors production",
            "Automate deployments from your repository",
            "Add one-step rollback",
          ],
        },
        {
          symptom: "Our hosting falls over on launch days",
          cause: "Fixed capacity sized for normal traffic, with no caching or scaling.",
          steps: [
            "Put a CDN and caching in front of the site",
            "Configure automatic scaling for traffic spikes",
            "Load-test before the next launch",
          ],
        },
      ],
      checklist: [
        "Changes are tested on staging before going live",
        "Deployments are automated, not done by hand",
        "Budget alerts are set on your cloud account",
        "You can say which region your customer data is stored in",
      ],
      faqs: [
        {
          question: "Can you help us apply for startup cloud credits?",
          answer: "We can set up your account so it is ready to use credits from programmes like AWS Activate. Eligibility is decided by the provider.",
        },
        {
          question: "Do you offer on-call support?",
          answer: "Our hours are Melbourne afternoons and evenings, Monday to Saturday, with monitoring alerts. We do not offer 24/7 on-call, and we will help you plan for it if you need it.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Melbourne — Weekly Updates Handled",
      metaDescription:
        "Website maintenance for Melbourne venues and small brands: menu, event and content updates each week, plus security, backups and uptime monitoring.",
      h1: "Website maintenance for Melbourne businesses that change something every week",
      card: "Weekly content updates plus security, backups and monitoring.",
      intro: [
        "Melbourne venues and small brands change their sites constantly: new menus, events, collections, staff and opening hours over public holidays. When nobody has time to update the site, it drifts out of date, and customers notice before you do.",
        "Our maintenance plans include those weekly updates as well as the technical work: software updates, security, backups and uptime monitoring.",
      ],
      sections: [
        {
          heading: "Send it, and it's done",
          body: [
            "Message us the new menu, the event details or the photos, and they are live within one working day. A set number of content changes is included each month, so you are not invoiced for every small edit.",
          ],
        },
        {
          heading: "And the work you don't see",
          body: [
            "Updates applied safely after testing on a copy of the site. Security monitoring. Daily backups kept off the server. Alerts if the site goes down. A short monthly summary of what we did.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our website shows last season's menu",
          cause: "Updating it is nobody's job, and it slips during busy periods.",
          steps: [
            "Agree a simple way to send us changes",
            "Update within one working day",
            "Check hours and details before every public holiday",
          ],
        },
        {
          symptom: "Our site is running old software and we're worried about it",
          cause: "Updates were skipped for fear of breaking something.",
          steps: [
            "Back up the site in full",
            "Update on a staging copy and test",
            "Release to the live site and monitor",
          ],
        },
      ],
      checklist: [
        "Your website shows this season's menu or range",
        "Public holiday hours are on the site before the holiday",
        "Plugins and themes were updated this month",
        "You have a recent backup stored off the server",
      ],
      faqs: [
        {
          question: "Can we still edit the site ourselves?",
          answer: "Of course. Many clients make some changes themselves and send us the rest. Our plan is there so nothing waits.",
        },
        {
          question: "Do you maintain Shopify stores too?",
          answer: "Yes. Shopify handles hosting and security, so for Shopify we focus on content updates, theme fixes, app reviews and speed.",
        },
      ],
    },
  },
}
