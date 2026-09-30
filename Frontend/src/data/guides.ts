/**
 * Guide and specialist pages: the cost guides, the ecommerce-vs-marketplace
 * decision page, and the marketplace, Next.js and Shopify service pages.
 *
 * NO PRICES. The business decision is that pricing is shared in conversation
 * (WhatsApp or a call), never published on the site. These pages describe what
 * decides a cost and how to get a quote; they must not state a figure, a band
 * or a "from" price. Timelines are fine.
 *
 * Every proof point names a build with a case study at /work/<slug>/ or, for
 * the Shopify list, a store that is live today. If a claim cannot be linked to
 * one of those sources, it does not go here.
 */
import { OFFICE_HOURS, officeHoursAt, PRIMARY_PHONE_DISPLAY } from "@/data/offices"
import { priceTier } from "@/lib/estimator-pricing"

export type GuideLink = { label: string; href: string }

export type GuideTable = {
  caption: string
  columns: string[]
  rows: string[][]
  note?: string
}

export type GuideSection = {
  heading: string
  body: string[]
  table?: GuideTable
  links?: GuideLink[]
}

export type GuideCaseStudy = { slug: string; title: string; body: string }

export type GuideFaq = { question: string; answer: string }

export type GuidePage = {
  /** No trailing slash, matching the rest of the site's `path` convention. */
  path: string
  /** "guide" pages emit Article schema; "service" pages emit Service schema. */
  kind: "guide" | "service"
  /** Short name for footer, breadcrumbs and llms.txt. */
  label: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string[]
  /** ISO date of the last meaningful edit. Feeds dateModified and the sitemap. */
  updated: string
  sections: GuideSection[]
  caseStudiesHeading?: string
  caseStudies: GuideCaseStudy[]
  faqs: GuideFaq[]
  related: GuideLink[]
}

/**
 * Shopify stores we built that are live today, checked against each storefront
 * on 2026-09-22. Two more delivered stores (zarqaa.in, qathirsnaturals.com) are
 * closed on Shopify and are left out until they reopen. Only Vashtara Heaven has
 * a written case study; the rest link to the live store.
 *
 * The blog post /blog/woocommerce-vs-shopify-india/ states the same counts
 * (seven built, five live). Change both together.
 */
export const shopifyStores: { name: string; url: string; sells: string; caseStudy?: string }[] = [
  { name: "Tatvivah", url: "https://www.tatvivah.in", sells: "Men's ethnic and formal wear: kurta sets, Jodhpuri and Modi jackets, shirts and trousers" },
  { name: "Swarn Sutra", url: "https://swarnsutra.com", sells: "Handloom sarees (Banarasi, Jamdani, Chanderi, Kosa silk), blouses and pashmina stoles" },
  { name: "Vashtara Heaven", url: "https://www.vashtaraheaven.com", sells: "Kids' denim co-ords and printed sets, shipped direct from each designer studio", caseStudy: "vashtaraheaven" },
  { name: "Shukala", url: "https://shukala.com", sells: "Women's co-ords, kurtis and feeding frocks" },
  { name: "Rumane Royale", url: "https://rumaneroyale.com", sells: "Leather and embellished jackets" },
]

const CLOSED_SHOPIFY_STORES = 2
export const shopifyDeliveredCount = shopifyStores.length + CLOSED_SHOPIFY_STORES
const shopifyCountText = `${shopifyDeliveredCount} Shopify stores, ${shopifyStores.length} of them live today`

// ─── Cost guides (India, UAE, Singapore) ────────────────────────────────────
//
// These pages target "website development cost in <place>" searches and answer
// them without publishing a price. Pricing is discussed in a conversation and
// shared in chat, so what these pages give a reader is what decides the cost,
// how to compare quotes, and how to get a written one.

const weeks = (id: "launch" | "store" | "platform") => {
  const t = priceTier(id)
  return `${t.weeksMin}–${t.weeksMax} weeks`
}
const launchWeeks = weeks("launch")
const storeWeeks = weeks("store")
const platformWeeks = weeks("platform")

type CostRegion = {
  path: string
  label: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  place: string
  intro: string[]
  regionSections: GuideSection[]
  caseStudiesHeading: string
  caseStudies: GuideCaseStudy[]
  extraFaqs: GuideFaq[]
  related: GuideLink[]
}

function costGuideFor(region: CostRegion): GuidePage {
  const { place } = region
  return {
    path: region.path,
    kind: "guide",
    label: region.label,
    metaTitle: region.metaTitle,
    metaDescription: region.metaDescription,
    eyebrow: region.eyebrow,
    h1: region.h1,
    intro: region.intro,
    updated: "2026-09-30",
    sections: [
      {
        heading: "The short answer: three kinds of project, very different costs",
        body: [
          "Almost every website brief falls into one of three kinds. The kind is set by what the site has to do, not by how it looks, and the difference in cost between the first and the second is large.",
          `We do not publish prices, because a number on a page is a guess about a project we have not heard yet. After a short conversation on WhatsApp or a call you get one written number and one delivery window.`,
        ],
        table: {
          caption: `What decides the cost of a website for a ${place} business, by kind of project`,
          columns: ["Kind of project", "What it is", "What pushes the cost up", "Typical timeline"],
          rows: [
            ["Business site", "Brochure or business site on WordPress", "Number of pages, content we have to write, integrations", launchWeeks],
            ["Online store", "WooCommerce, Shopify or custom-coded store", "Catalogue size and options, custom checkout logic, integrations, custom code over a platform", storeWeeks],
            ["Platform", "Portals, marketplaces, dashboards, web apps", "Roles and permissions, payments, third-party systems, data migration", platformWeeks],
          ],
          note: "Timelines run from content sign-off",
        },
      },
      {
        heading: "What moves the cost inside each kind",
        body: [
          "Two projects with the same feature list can differ by weeks. These are the things we ask about, because each one changes the amount of work.",
        ],
        table: {
          caption: "The factors that change what a website costs",
          columns: ["Factor", "Why it matters"],
          rows: [
            ["WordPress or custom-coded", "A custom-coded site (typically Next.js) has every template written rather than configured. It costs more and earns that back when speed or unusual logic matter."],
            ["Number of pages and templates", "Each distinct template is design and build time. Ten pages that share one layout cost far less than ten pages that each need their own."],
            ["Content", "If the words and photos arrive on day one the build is faster. If we are waiting for them, or writing them, it takes longer and costs more."],
            ["Integrations", "CRM, ERP, courier, payment and booking systems each need connecting and testing."],
            ["Custom functionality", "Anything beyond what a platform or plugin does out of the box: special checkout rules, calculators, dashboards."],
            ["Design level", "A conversion-focused design with custom illustration or motion takes longer than a clean, standard one."],
            ["Deadline", "A faster delivery than our usual window means reshuffling other work."],
            ["Second language", "Each extra language is more pages to build and check, plus copy from a native writer."],
          ],
        },
      },
      ...region.regionSections,
      {
        heading: "Running costs after launch",
        body: [
          "The build is a one-time cost. Three things recur, and a quote that leaves them out is not complete. Ask every agency about all three.",
        ],
        table: {
          caption: `Recurring costs for a ${place} business website`,
          columns: ["Cost", "Paid to", "What to know"],
          rows: [
            ["Support and maintenance", "Your developer", "Uptime monitoring, fixes and, on some plans, ongoing changes. We quote it with the project."],
            ["Domain and hosting", "Your registrar and host, directly", "Set up in your company's name from day one. We do not resell hosting."],
            ["Payment gateway fees", "Your gateway, per transaction", "Charged by the gateway, not by us."],
            ["Platform and app fees", "The platform, directly", "For example a Shopify monthly plan, themes and paid apps."],
          ],
        },
      },
      {
        heading: "Why quotes for the same site vary so much",
        body: [
          "If you have three quotes for what sounds like the same site and they differ several times over, it is usually one of three things. The cheap quote is a theme with your logo on it and no content work. The expensive quote includes things the others left out, such as copy, SEO structure or support. Or the agencies heard three different projects in the same brief.",
          "The fix is to compare scope, not totals. Ask each one what is excluded, who owns the domain and hosting accounts, what happens when you need a change in month six, and what the payment terms are.",
          "Also check what \"fast\" means. Google measures real-user speed with Core Web Vitals, and it is worth asking any agency to show you those numbers for a site they have already built.",
        ],
        links: [{ label: "Core Web Vitals (web.dev)", href: "https://web.dev/articles/vitals" }],
      },
      {
        heading: "How to get a number from us",
        body: [
          `Message us on WhatsApp at ${PRIMARY_PHONE_DISPLAY} or use the contact form, and tell us what the site has to do. We reply within ${OFFICE_HOURS.replyWithin}, ask the few questions in the table above, and send one written scope with a fixed price and one delivery window. There is no charge for the scope.`,
        ],
        links: [{ label: "Contact us", href: "/contact/" }],
      },
    ],
    caseStudiesHeading: region.caseStudiesHeading,
    caseStudies: region.caseStudies,
    faqs: [
      {
        question: `How much does a website cost in ${place}?`,
        answer: `It depends on the kind of project: a business site, an online store and a platform are very different amounts of work, and pages, content, integrations and deadline move the number further. We do not publish prices. Message us on WhatsApp at ${PRIMARY_PHONE_DISPLAY} and you get a fixed written quote within ${OFFICE_HOURS.replyWithin}.`,
      },
      {
        question: "Why don't you publish your prices?",
        answer: "Because a published number is a guess about a project we have not heard yet, and the range between a simple site and a custom one is too wide to be useful. A short conversation gives you a real number instead.",
      },
      {
        question: "Is the quote fixed?",
        answer: "Yes. The written quote names one price and one delivery window, agreed before any work starts, with no per-revision charge inside the agreed scope.",
      },
      {
        question: "How long does a website take?",
        answer: `A business site typically takes ${launchWeeks} from content sign-off, an online store ${storeWeeks} and a platform ${platformWeeks}. The written quote names one delivery window.`,
      },
      ...region.extraFaqs,
    ],
    related: region.related,
  }
}

const costGuide = costGuideFor({
  path: "/website-development-cost-in-india",
  label: "Website development cost in India",
  metaTitle: "Website Development Cost in India (2026): What Decides the Price",
  metaDescription:
    "What decides the cost of a website in India in 2026: kind of project, pages, integrations, content and deadline. How to compare quotes, what recurs after launch, and how to get a fixed written quote.",
  eyebrow: "Cost guide · 2026",
  h1: "Website development cost in India: what decides the price in 2026",
  place: "India",
  intro: [
    "A business website in India can cost very little or a great deal, and both ends are honest. The spread is not agencies making numbers up. It is three different kinds of project that happen to share the word \"website\".",
    "This guide covers what decides the price, what recurs after launch and how to compare quotes. We do not publish figures here; you get a fixed number in writing after a short conversation.",
  ],
  regionSections: [
    {
      heading: "Payments, shipping and GST for Indian stores",
      body: [
        "An Indian online store usually needs a payment gateway such as Razorpay, shipping integration (Shiprocket, for example), cash-on-delivery rules and GST-ready invoices. These are part of a store build, not extras added at the end.",
        "Gateway transaction fees are charged by the gateway. Check the current rates on the gateway's own pricing page rather than trusting a figure in any agency's article, including this one.",
      ],
      links: [
        { label: "Razorpay pricing (official)", href: "https://razorpay.com/pricing/" },
        { label: "Shopify India plans (official)", href: "https://www.shopify.com/in/pricing" },
        { label: "Ecommerce store or marketplace?", href: "/ecommerce-store-vs-marketplace/" },
      ],
    },
  ],
  caseStudiesHeading: "Builds at each end of the range",
  caseStudies: [
    {
      slug: "hcbengineering",
      title: "HCB Engineering",
      body: "A WordPress corporate site for an engineering firm, built to show 20+ years of work, three service verticals and licensed credentials: a business site.",
    },
    {
      slug: "deetoo",
      title: "DeeToo",
      body: "A WooCommerce store cataloguing 12 brands across 8 categories with pan-India cash on delivery: an online store.",
    },
    {
      slug: "maribiz-ai",
      title: "MariBiz.ai",
      body: "A B2B procurement marketplace with an RFQ engine, vendor verification and real-time messaging, now listing 3,226+ vendors: a platform.",
    },
  ],
  extraFaqs: [
    {
      question: "How much does an ecommerce website cost in India?",
      answer: `It depends on the platform, catalogue size and how much custom checkout logic you need. A WooCommerce or Shopify store and a custom-coded store are different amounts of work, and payment gateway and shipping integration are part of every store build. Message us on WhatsApp at ${PRIMARY_PHONE_DISPLAY} for a fixed quote.`,
    },
    {
      question: "Why is a custom-coded site more expensive than WordPress?",
      answer: "Every template is written rather than configured. It is worth it when speed, a very specific design or later application logic matter, and not worth it for a mostly-text site that a non-technical person edits.",
    },
    {
      question: "What are the ongoing costs of a website?",
      answer: "Support with your developer, domain and hosting paid to your registrar and host, payment gateway fees paid to the gateway, and any platform plan such as Shopify. We quote support with the project.",
    },
  ],
  related: [
    { label: "Get a written quote", href: "/contact/" },
    { label: "Ecommerce store vs marketplace", href: "/ecommerce-store-vs-marketplace/" },
    { label: "Website development cost in Dubai and the UAE", href: "/website-development-cost-in-dubai/" },
    { label: "Projects we've delivered", href: "/work/" },
  ],
})

const dubaiCostGuide = costGuideFor({
  path: "/website-development-cost-in-dubai",
  label: "Website development cost in Dubai",
  metaTitle: "Website Development Cost in Dubai & UAE (2026): What Decides the Price",
  metaDescription:
    "What decides the cost of a website for a Dubai or UAE business in 2026: kind of project, Arabic, dirham checkout, VAT, integrations and deadline. How to compare quotes and get a fixed written quote.",
  eyebrow: "Cost guide · UAE · 2026",
  h1: "Website development cost in Dubai and the UAE: what decides the price",
  place: "UAE",
  intro: [
    "A UAE website costs more or less depending on the kind of project, whether it needs Arabic, and how it takes payment. We are an Indian team working UAE hours, and we do not publish prices; you get a fixed number in writing after a short conversation.",
    "This guide covers what decides the price for a UAE business, what recurs after launch and how to compare quotes from agencies in Dubai, Abu Dhabi and India.",
  ],
  regionSections: [
    {
      heading: "What a UAE site adds: Arabic, dirham checkout and VAT",
      body: [
        "An Arabic version is, for costing purposes, more pages: each Arabic page is built and checked like an English one, so a full Arabic version roughly doubles the page count. The Arabic copy itself should come from a native writer.",
        "UAE stores usually settle in AED through gateways such as Network International, Telr, PayTabs or Stripe, and offer buy-now-pay-later through Tabby or Tamara. Which fits depends on your bank and margins, and we choose it with you during scoping.",
        "UAE VAT is 5%. How it applies to a supplier outside the UAE depends on your registration, so ask your accountant before comparing our quote with a local one.",
      ],
      links: [
        { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
        { label: "Shopify development", href: "/services/shopify-development-services/" },
      ],
    },
    {
      heading: "What you give up by hiring outside the UAE",
      body: [
        "Two things. Meetings are on video, not across a table, although our hours overlap the whole UAE working week. And without a UAE office we cannot put you in the Google Maps results for \"near me\" searches; that needs your own Google Business Profile at your own address, which we can help you set up.",
        "Everything else (the developer who writes the code answering after launch, accounts in your name, a fixed written quote) is the same as for our clients in India.",
      ],
      links: [{ label: "Website development in the UAE", href: "/website-development-company-in-uae/" }],
    },
  ],
  caseStudiesHeading: "UAE and comparable builds",
  caseStudies: [
    {
      slug: "cleanship",
      title: "Cleanship",
      body: "An Ajman Free Zone marine company: 310 service-and-port landing pages across 13 UAE ports and beyond, with UAE and India contact paths.",
    },
    {
      slug: "deetoo",
      title: "DeeToo",
      body: "A WooCommerce store with 12 brands across 8 categories: an online store.",
    },
    {
      slug: "maribiz-ai",
      title: "MariBiz.ai",
      body: "A B2B procurement marketplace with an RFQ engine and 3,226+ vendors: a platform.",
    },
  ],
  extraFaqs: [
    {
      question: "Does an Arabic version cost extra?",
      answer: "Yes, in pages: each Arabic page is built and checked like an English one, so a full Arabic version roughly doubles the page count. The Arabic copy should come from a native writer.",
    },
    {
      question: "Do you have an office in the UAE?",
      answer: `No. We work with UAE businesses remotely from Lucknow and Mumbai, ${officeHoursAt(-90)} UAE time, Monday to Saturday.`,
    },
  ],
  related: [
    { label: "Website development in the UAE", href: "/website-development-company-in-uae/" },
    { label: "Website development in Dubai", href: "/website-development-company-in-dubai/" },
    { label: "Get a written quote", href: "/contact/" },
    { label: "The India cost guide", href: "/website-development-cost-in-india/" },
  ],
})

const singaporeCostGuide = costGuideFor({
  path: "/website-development-cost-in-singapore",
  label: "Website development cost in Singapore",
  metaTitle: "Website Development Cost in Singapore (2026): What Decides the Price",
  metaDescription:
    "What decides the cost of a website for a Singapore business in 2026: kind of project, PayNow checkout, GST, integrations and deadline. How to compare quotes, the PSG grant, and how to get a fixed written quote.",
  eyebrow: "Cost guide · Singapore · 2026",
  h1: "Website development cost in Singapore: what decides the price",
  place: "Singapore",
  intro: [
    "A Singapore website costs more or less depending on the kind of project, how it takes payment and how much has to connect to other systems. We are an Indian team, and we do not publish prices; you get a fixed number in writing after a short conversation.",
    "This guide covers what decides the price for a Singapore business, what recurs after launch, and where the Productivity Solutions Grant fits.",
  ],
  regionSections: [
    {
      heading: "What a Singapore site adds: PayNow, GST and PSG",
      body: [
        "Singapore stores usually take PayNow alongside cards, through a gateway such as Stripe, Adyen, HitPay or 2C2P. A second language, such as Chinese, is more pages to build and check.",
        "Singapore GST is 9%, and how it applies to services bought from a supplier outside Singapore depends on your registration, so ask your accountant before comparing our quote with a local one.",
        "We are not a pre-approved vendor under the Productivity Solutions Grant, so our work cannot be claimed under PSG. If the grant decides your budget, you need a Singapore-registered PSG vendor.",
      ],
      links: [{ label: "Shopify development", href: "/services/shopify-development-services/" }],
    },
    {
      heading: "What you give up by hiring outside Singapore",
      body: [
        `Mornings and meetings. Our day runs ${officeHoursAt(150)} Singapore time, so a morning question waits until lunchtime, and meetings are on video. And without a Singapore address we cannot put you in Google Maps results; that needs your own Google Business Profile at your own address.`,
      ],
      links: [{ label: "Website development in Singapore", href: "/website-development-company-in-singapore/" }],
    },
  ],
  caseStudiesHeading: "Comparable builds",
  caseStudies: [
    {
      slug: "maribiz-ai",
      title: "MariBiz.ai",
      body: "A global marine procurement marketplace with an RFQ engine and 3,226+ vendors: a platform.",
    },
    {
      slug: "nextmentor",
      title: "NEXTmentor",
      body: "A Next.js course platform with payments, verifiable certificates and referral commission: a typical startup platform build.",
    },
    {
      slug: "deetoo",
      title: "DeeToo",
      body: "A WooCommerce store with 12 brands across 8 categories: an online store.",
    },
  ],
  extraFaqs: [
    {
      question: "Can I use the Productivity Solutions Grant with you?",
      answer: "No. We are not a PSG pre-approved vendor, so our work cannot be claimed under the grant.",
    },
    {
      question: "What hours do you work in Singapore time?",
      answer: `${officeHoursAt(150)} Singapore time, Monday to Saturday, which covers every Singapore afternoon.`,
    },
  ],
  related: [
    { label: "Website development in Singapore", href: "/website-development-company-in-singapore/" },
    { label: "Get a written quote", href: "/contact/" },
    { label: "The UAE cost guide", href: "/website-development-cost-in-dubai/" },
    { label: "The India cost guide", href: "/website-development-cost-in-india/" },
  ],
})

const storeVsMarketplace: GuidePage = {
  path: "/ecommerce-store-vs-marketplace",
  kind: "guide",
  label: "Ecommerce store vs marketplace",
  metaTitle: "Ecommerce Store vs Marketplace: Which Should You Build?",
  metaDescription: `Should you build an online store or a multi-vendor marketplace? A decision guide from a team that has built both: who owns the stock, who ships, and how much more work a marketplace is.`,
  eyebrow: "Decision guide",
  h1: "Ecommerce store or marketplace: which one are you actually building?",
  intro: [
    "The short answer: if you own the stock, you need a store. If other people sell through you and you earn from their sales, you need a marketplace. Everything else is detail, but the detail is where budgets go wrong, because a marketplace is more work than a store and takes longer to build.",
    "We have built both — WooCommerce, Shopify and custom stores (one of them shipping from multiple designers) and two full multi-vendor marketplaces — so this is written from the build side, with the case studies linked.",
  ],
  updated: "2026-09-30",
  sections: [
    {
      heading: "The difference in one table",
      body: [
        "The platform is not the difference. The difference is who controls the catalogue, who ships, and who gets paid.",
      ],
      table: {
        caption: "Ecommerce store vs multi-vendor marketplace",
        columns: ["", "Online store", "Multi-vendor marketplace"],
        rows: [
          ["Who owns the stock", "You", "Each seller"],
          ["Who lists products", "Your team", "Sellers, through their own login"],
          ["Who ships", "You, from one place", "Each seller, often separately"],
          ["How you earn", "Margin on your products", "Commission, listing or subscription fees"],
          ["Extra you have to build", "Nothing structural", "Seller onboarding, verification, seller dashboards"],
          ["Build effort", "Lower: no seller-facing tools", "Higher: seller onboarding, verification and dashboards on top of the store"],
          ["Typical timeline", storeWeeks, platformWeeks],
          ["Our examples", "DeeToo, Samaraha, Krushi Doctor", "TatVivah Trends, MariBiz.ai"],
        ],
      },
    },
    {
      heading: "The middle option most people miss",
      body: [
        "There is a step between the two that is much cheaper than a marketplace: a store with several suppliers, where you control the listings but products ship from wherever they are made. Vashtara Heaven works like this. Kidswear comes from independent designer studios and each studio dispatches its own orders, but the designers do not have logins or a seller dashboard.",
        "The hard part there is not software. It is telling the buyer, before checkout, that one order may arrive in more than one package, so it reads as the model working and not as a broken order. We put that explanation in the FAQ and policy pages rather than burying it in the terms.",
        "If you are not sure sellers will want to manage their own listings, start here. You can build seller self-service later once you know the demand is there.",
      ],
      links: [{ label: "Vashtara Heaven case study", href: "/work/vashtaraheaven/" }],
    },
    {
      heading: "You need a marketplace if…",
      body: [
        "Sellers need to add and edit their own products without asking you. On TatVivah Trends, individual sellers list and manage their products independently, with admin oversight and verified-seller badges. That self-service is exactly what separates a marketplace from a store with suppliers.",
        "Buyers need to compare sellers, not just products. On MariBiz.ai, shipowners send a request for quote and compare responses from verified vendors at a given port. A store has no concept of that.",
        "Trust between strangers is the product. Both marketplaces we built put vendor verification in from day one, because a marketplace where buyers cannot tell good sellers from bad ones does not survive its first bad order.",
      ],
    },
    {
      heading: "You need a store if…",
      body: [
        "You make or buy the products yourself and ship them. That covers most D2C brands we work with: textiles, fashion, agri inputs, solar products, gifting. A store is faster to launch, cheaper to run, and you control every product page.",
        "You want to test demand before you build more. A store gets you selling in weeks. A marketplace only works once you have both sellers and buyers, and building for both at once is the most common way these projects stall.",
      ],
      links: [
        { label: "DeeToo case study", href: "/work/deetoo/" },
        { label: "Samaraha case study", href: "/work/samaraha/" },
        { label: "Krushi Doctor case study", href: "/work/krushidoctor/" },
      ],
    },
    {
      heading: "Questions to settle before you ask for a quote",
      body: [
        "How do sellers get paid? Either the platform collects payment and pays sellers out, or sellers are paid directly. That choice changes the payment integration and what you are responsible for, so decide it with your accountant before the build is scoped, not after.",
        "Who handles returns when two sellers are in one order? Who is the buyer's point of contact? What does a seller agree to when they sign up? These are policy questions, but each one becomes screens and logic, and each unanswered one adds weeks to a marketplace build.",
      ],
    },
  ],
  caseStudiesHeading: "Both, built and live",
  caseStudies: [
    {
      slug: "tatvivahtrends",
      title: "TatVivah Trends",
      body: "A multi-vendor wedding-wear marketplace with 3,000+ products, verified seller badges, Razorpay payments and occasion-based filtering: haldi, mehendi, sangeet.",
    },
    {
      slug: "maribiz-ai",
      title: "MariBiz.ai",
      body: "A B2B marine procurement marketplace built around a request-for-quote engine, listing 3,226+ vendors across 121 service categories with port-based discovery.",
    },
    {
      slug: "deetoo",
      title: "DeeToo",
      body: "A single-brand-owner store: 12 brands of mobile accessories across 8 categories on WooCommerce, with pan-India cash on delivery.",
    },
  ],
  faqs: [
    {
      question: "What is the difference between an ecommerce store and a marketplace?",
      answer: "In a store you own the stock and sell it. In a marketplace other sellers list and ship their own products, and you earn a commission or fee. A marketplace needs seller onboarding, verification and seller dashboards that a store does not.",
    },
    {
      question: "How much more does a marketplace cost than a store?",
      answer: `A marketplace is meaningfully more work than a store, because sellers need onboarding, verification and their own dashboards on top of everything a store does. We do not publish prices; message us on WhatsApp at ${PRIMARY_PHONE_DISPLAY} and you get a fixed written quote for whichever you need.`,
    },
    {
      question: "Can I start as a store and become a marketplace later?",
      answer: "Yes, and it is often the right order. Start as a store with several suppliers, like Vashtara Heaven, and add seller self-service once you know sellers want it.",
    },
    {
      question: "Can WooCommerce or Shopify run a marketplace?",
      answer: "Both can handle multiple suppliers, and Vashtara Heaven runs multi-vendor dispatch on Shopify. Full seller self-service, verification and seller dashboards need more than a plugin: TatVivah Trends pairs a custom Next.js front end with a WooCommerce back end, and MariBiz.ai is fully custom.",
    },
    {
      question: "How long does a marketplace take to build?",
      answer: `Typically ${platformWeeks} from content sign-off, against ${storeWeeks} for a custom store. The written quote names one delivery window after scoping.`,
    },
  ],
  related: [
    { label: "Marketplace development", href: "/services/marketplace-development-services/" },
    { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
    { label: "Website development cost in India", href: "/website-development-cost-in-india/" },
    { label: "Get a written quote", href: "/contact/" },
  ],
}

const marketplaceService: GuidePage = {
  path: "/services/marketplace-development-services",
  kind: "service",
  label: "Marketplace Development",
  metaTitle: "Multi-Vendor Marketplace Development Company in India",
  metaDescription: `Multi-vendor marketplace development from Lucknow and Mumbai: seller onboarding, verification, RFQ and seller dashboards. Built TatVivah Trends and MariBiz.ai. Scoped and quoted after a short call.`,
  eyebrow: "Marketplace development",
  h1: "Multi-vendor marketplace development",
  intro: [
    "We build marketplaces where other people sell: multi-vendor stores, B2B procurement platforms and supplier networks. Two are live with full case studies, TatVivah Trends (3,000+ wedding-wear products from verified sellers) and MariBiz.ai (3,226+ maritime vendors across 121 categories). A third, Vashtara Heaven, runs multi-vendor dispatch on Shopify.",
    "Most agencies that say \"marketplace\" mean a store with a vendor plugin. The difference shows up the first time a seller uploads a bad listing, two sellers end up in one order, or a buyer cannot tell a verified vendor from an unverified one. Those are the parts we design first.",
  ],
  updated: "2026-09-30",
  sections: [
    {
      heading: "What a marketplace build includes",
      body: [
        "Seller onboarding and verification, so buyers can trust who they are buying from. Both of our marketplaces had verification in from day one: verified-seller badges on TatVivah, vendor vetting on MariBiz.ai.",
        "Seller self-service: listings, stock and orders managed from the seller's own login, with admin oversight for quality control. Buyer discovery built around how your buyers actually search. On TatVivah that is by occasion (haldi, mehendi, sangeet), not product type. On MariBiz.ai it is by port and service category.",
        "The transaction flow your market needs. That might be a cart and checkout with Razorpay, as on TatVivah, or a request-for-quote engine with quote comparison and real-time messaging, as on MariBiz.ai.",
      ],
    },
    {
      heading: "Two marketplace models we have shipped",
      body: [
        "Retail marketplaces, where buyers check out from several sellers. TatVivah Trends is a Next.js multi-vendor marketplace for wedding ethnic wear, with verified sellers, a 3,000+ product catalogue, a 10-day returns policy built into the trust system, gift cards, wishlists and product comparison.",
        "B2B procurement marketplaces, where buyers ask for quotes instead of adding to a cart. MariBiz.ai is built around an RFQ engine: shipowners describe what they need, verified vendors at the relevant port respond, and quotes are compared in one dashboard with messaging alongside.",
      ],
      links: [
        { label: "TatVivah Trends case study", href: "/work/tatvivahtrends/" },
        { label: "MariBiz.ai case study", href: "/work/maribiz-ai/" },
      ],
    },
    {
      heading: "How marketplace projects are priced",
      body: [
        `A marketplace is priced from its scope: how many roles it has (buyer, seller, admin), whether it takes payments and pays sellers out, what has to be verified, and which outside systems it connects to. Typical delivery is ${platformWeeks} from content sign-off.`,
        "If you are not sure you need a full marketplace yet, a custom store with several suppliers is a smaller first project and can become a marketplace later. We do not publish prices; a short chat gives you one written number and one delivery window.",
      ],
      links: [
        { label: "Store or marketplace?", href: "/ecommerce-store-vs-marketplace/" },
        { label: "Get a written quote", href: "/contact/" },
      ],
    },
    {
      heading: "What we will ask you before quoting",
      body: [
        "How sellers get paid (through the platform, or directly), who owns returns when an order spans two sellers, and what a seller agrees to at sign-up. Each answer becomes screens and logic, so settling them early is what keeps a marketplace inside its delivery window.",
        "Whether you already have sellers lined up. A marketplace needs both sides at launch. If you have buyers but not sellers, or the other way round, we will usually suggest launching a smaller first version and say so before you commit to the full build.",
      ],
    },
  ],
  caseStudiesHeading: "Marketplaces we've built",
  caseStudies: [
    {
      slug: "tatvivahtrends",
      title: "TatVivah Trends",
      body: "Next.js multi-vendor marketplace for wedding ethnic wear: 3,000+ products, verified seller badges, Razorpay payments, occasion-based filtering and a 10-day returns system.",
    },
    {
      slug: "maribiz-ai",
      title: "MariBiz.ai",
      body: "B2B marine procurement marketplace: RFQ engine, vendor verification, 121 service categories, port-based discovery, real-time messaging and 3,226+ vendors onboarded.",
    },
    {
      slug: "vashtaraheaven",
      title: "Vashtara Heaven",
      body: "Shopify kidswear store with a multi-vendor dispatch model: products ship direct from each designer studio, with split shipments explained to buyers before checkout.",
    },
  ],
  faqs: [
    {
      question: "How much does it cost to build a multi-vendor marketplace in India?",
      answer: `It depends on the number of roles, payments, verification and integrations, so we scope it before quoting; typical delivery is ${platformWeeks} from content sign-off. Message us on WhatsApp at ${PRIMARY_PHONE_DISPLAY} and you get one written number and one delivery window.`,
    },
    {
      question: "Have you built marketplaces before?",
      answer: "Yes. TatVivah Trends (multi-vendor wedding-wear marketplace) and MariBiz.ai (B2B maritime procurement marketplace with 3,226+ vendors) are both live, with full case studies on our work page.",
    },
    {
      question: "Do you use a marketplace plugin or build custom?",
      answer: "Neither of our full marketplaces runs on a plugin alone, because seller self-service, verification and RFQ flows fit badly into one. TatVivah Trends is a custom Next.js front end over WooCommerce and MariBiz.ai is fully custom. For a store with several suppliers but no seller logins, a platform like Shopify can be enough, as with Vashtara Heaven.",
    },
    {
      question: "Can the marketplace handle payments to sellers?",
      answer: "That is a scoping decision: the platform can collect payment and pay sellers out, or sellers can be paid directly. The choice changes the payment integration and your obligations, so we settle it with you, and ideally your accountant, before quoting.",
    },
    {
      question: "Do you build B2B marketplaces as well as retail ones?",
      answer: "Yes. MariBiz.ai is B2B: buyers send requests for quote to verified vendors instead of checking out from a cart, with quote comparison and messaging in one dashboard.",
    },
  ],
  related: [
    { label: "Ecommerce store vs marketplace", href: "/ecommerce-store-vs-marketplace/" },
    { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
    { label: "Next.js development", href: "/services/nextjs-development-services/" },
    { label: "What decides website cost in India", href: "/website-development-cost-in-india/" },
  ],
}

const nextjsService: GuidePage = {
  path: "/services/nextjs-development-services",
  kind: "service",
  label: "Next.js Development",
  metaTitle: "Next.js Development Agency in India",
  metaDescription: `Next.js development from Lucknow and Mumbai: fast custom websites, headless stores and web apps. Built TatVivah Trends, NEXTmentor and The Grafftee on Next.js. Scoped and quoted after a short call.`,
  eyebrow: "Next.js development",
  h1: "Next.js development agency",
  intro: [
    "We build custom websites, headless stores and web apps in Next.js, the React framework behind this site. TatVivah Trends (a multi-vendor marketplace with a Next.js front end over WooCommerce), NEXTmentor (a course platform with Razorpay payments, verifiable certificates and referral commission) and The Grafftee (an HR services platform with demo booking and CRM integration) are three client builds with full case studies.",
    "Next.js is not always the right answer, and it is not the cheapest. Below is when we recommend it, when we talk people out of it, and how we price it.",
  ],
  updated: "2026-09-30",
  sections: [
    {
      heading: "When Next.js is the right choice",
      body: [
        "When speed decides revenue. Pages are rendered on the server and ship as HTML, so they load fast on a mid-range phone on a patchy connection and search engines read the content without running JavaScript. That matters most for stores and content-heavy sites where every slow page loses a visitor.",
        "When the site has to do something. Logged-in areas, dashboards, calculators, booking flows or data from other systems are all ordinary Next.js work. They are awkward to bolt onto a theme, and this is where custom code earns its cost.",
        "When you want a headless setup. TatVivah Trends runs a Next.js front end over a WooCommerce and WordPress back end, so the catalogue team keeps a familiar admin while buyers get a faster, custom storefront.",
      ],
      links: [
        { label: "TatVivah Trends case study", href: "/work/tatvivahtrends/" },
        { label: "NEXTmentor case study", href: "/work/nextmentor/" },
        { label: "The Grafftee case study", href: "/work/thegrafftee/" },
      ],
    },
    {
      heading: "When we will recommend WordPress instead",
      body: [
        "If the site is mostly text and pictures, and a non-technical person will edit it every week, WordPress is the better buy. The same site custom-coded costs more, and your team can edit the WordPress one without a developer.",
        "We build both, so we have no reason to push you toward the expensive one. Most of our delivered stores are WooCommerce for exactly this reason.",
      ],
    },
    {
      heading: "What a Next.js build with us includes",
      body: [
        "TypeScript throughout, server-rendered pages, structured data, and analytics and Search Console connected before launch. Core Web Vitals are checked on a throttled mobile connection, not just on a fast office laptop.",
        "A repository, hosting and every account in your name from day one, plus a staging environment on platform builds. If you ever leave us, another developer can pick up the code, because it is a standard Next.js project with nothing hidden in it.",
        "This site is itself a Next.js App Router build: server-rendered pages, structured data on every page and a shared content layer, which is the sort of thing a framework makes easy and a theme does not.",
      ],
    },
    {
      heading: "How Next.js projects are priced",
      body: [
        `A Next.js project is priced from its scope: how many distinct templates it has, whether it is a marketing site, a store or a web app, and what it connects to. Custom code costs more than a platform, and earns it back when speed or unusual logic matter. Typical delivery runs from ${launchWeeks} for a small site to ${platformWeeks} for a web app, from content sign-off.`,
        "We do not publish prices. Tell us what the site has to do and you get one written number and one delivery window.",
      ],
      links: [
        { label: "Get a written quote", href: "/contact/" },
        { label: "What decides website cost in India", href: "/website-development-cost-in-india/" },
      ],
    },
  ],
  caseStudiesHeading: "Next.js builds",
  caseStudies: [
    {
      slug: "tatvivahtrends",
      title: "TatVivah Trends",
      body: "Next.js multi-vendor marketplace over a WooCommerce back end: 3,000+ products, verified sellers, Razorpay payments and occasion-based filtering.",
    },
    {
      slug: "nextmentor",
      title: "NEXTmentor",
      body: "Next.js course platform: three skill packs sold through Razorpay, a resume-where-you-stopped player, serial-numbered certificates with public verification pages, and a referral programme paying up to 50% commission.",
    },
    {
      slug: "thegrafftee",
      title: "The Grafftee",
      body: "Next.js and TypeScript platform site for an HR and recruitment firm: seven service modules, an integrated demo booking system and CRM-connected contact forms.",
    },
  ],
  faqs: [
    {
      question: "How much does a Next.js website cost in India?",
      answer: `It depends on the number of templates, the integrations and whether it is a marketing site, a store or a web app; custom code costs more than a WordPress site. Message us on WhatsApp at ${PRIMARY_PHONE_DISPLAY} and you get a fixed written quote within ${OFFICE_HOURS.replyWithin}.`,
    },
    {
      question: "Is Next.js better than WordPress?",
      answer: "For speed, custom features and headless stores, yes. For a mostly-text site that a non-technical team edits every week, WordPress is usually the better and cheaper choice, and we build both.",
    },
    {
      question: "Is Next.js good for SEO?",
      answer: "Yes. Pages are rendered on the server, so search engines and AI crawlers get the full content as HTML, and structured data and metadata are set per page. Speed, which Google measures through Core Web Vitals, is also easier to keep good.",
    },
    {
      question: "Can you build a headless store with Next.js?",
      answer: "Yes. TatVivah Trends is a Next.js front end over a WooCommerce and WordPress back end, so the catalogue is managed in a familiar admin while buyers get a custom storefront.",
    },
    {
      question: "Who owns the code?",
      answer: "You do. The repository, hosting and every account are in your name from day one, and the code is a standard Next.js project any developer can pick up.",
    },
  ],
  related: [
    { label: "Website development", href: "/services/website-development-services/" },
    { label: "Marketplace development", href: "/services/marketplace-development-services/" },
    { label: "Software development", href: "/services/software-development-services/" },
    { label: "What decides website cost in India", href: "/website-development-cost-in-india/" },
  ],
}

const shopifyService: GuidePage = {
  path: "/services/shopify-development-services",
  kind: "service",
  label: "Shopify Development",
  metaTitle: "Shopify Development Company in India",
  metaDescription: `Shopify store development from Lucknow and Mumbai for Indian D2C fashion and apparel brands. ${shopifyDeliveredCount} Shopify stores built, including Tatvivah and Swarn Sutra. Scoped and quoted after a short call.`,
  eyebrow: "Shopify development",
  h1: "Shopify development for Indian D2C brands",
  intro: [
    `We build Shopify stores for Indian brands, mostly fashion and apparel: menswear, handloom sarees, kidswear, womenswear and jackets. We have built ${shopifyCountText}, all linked below, so you can open them on your phone and judge the work yourself.`,
    "We build on WooCommerce and custom code too, so we will tell you when Shopify is the wrong fit. The short version: Shopify is right when the people running the store are not technical and want to add products between customer calls without touching code.",
  ],
  updated: "2026-09-30",
  sections: [
    {
      heading: "Shopify stores we've built",
      body: [`These are the ${shopifyStores.length} that are live today; ${CLOSED_SHOPIFY_STORES} more have since closed on Shopify. Vashtara Heaven has a full written case study; the others link straight to the storefront.`],
      table: {
        caption: "Live Shopify stores built by NextGen Fusion",
        columns: ["Store", "What it sells"],
        rows: shopifyStores.map((store) => [store.name, store.sells]),
      },
      links: [
        ...shopifyStores.map((store) => ({ label: store.name, href: store.url })),
        { label: "Vashtara Heaven case study", href: "/work/vashtaraheaven/" },
      ],
    },
    {
      heading: "When Shopify is the right choice",
      body: [
        "When the store team is not technical. Adding a product, changing a price or running a sale takes minutes in Shopify's admin, and nobody has to update plugins or worry about hosting.",
        "When the catalogue is conventional, even if it is large. Tatvivah and Swarn Sutra both carry catalogues of over a hundred products, with sizes, colours and fabrics as variants, which is exactly what Shopify handles well.",
        "When products ship from more than one place. Vashtara Heaven sells kidswear from independent designer studios that each dispatch their own orders, and the store explains split shipments before checkout so one order arriving in two parcels does not read as a mistake.",
      ],
    },
    {
      heading: "When we will recommend something else",
      body: [
        "When the catalogue is strange rather than big: made-to-order lead times, blouse and fabric options on every saree, or pricing that depends on the customer. Each of those tends to become a paid Shopify app, and the monthly bill adds up. WooCommerce or a custom build is often cheaper over two years.",
        "When other sellers need their own logins to list products. That is a marketplace, not a store, and Shopify is not built for it.",
      ],
      links: [
        { label: "WooCommerce vs Shopify for Indian brands", href: "/blog/woocommerce-vs-shopify-india/" },
        { label: "Ecommerce store or marketplace?", href: "/ecommerce-store-vs-marketplace/" },
      ],
    },
    {
      heading: "How Shopify projects are priced",
      body: [
        `A Shopify store is priced from its scope: catalogue size and variants, design level, custom functionality and integrations such as a courier. Typical delivery is ${storeWeeks} from content sign-off. Payment gateway and Shiprocket integration are part of the build.`,
        "Shopify's own monthly plan, any paid theme and any paid apps are billed by Shopify to you, in your account, not through us; check Shopify's current India plans on their pricing page. We do not publish our prices: a short chat gives you one written number and one delivery window.",
      ],
      links: [
        { label: "Shopify India plans (official)", href: "https://www.shopify.com/in/pricing" },
        { label: "Get a written quote", href: "/contact/" },
      ],
    },
  ],
  caseStudiesHeading: "Shopify case study",
  caseStudies: [
    {
      slug: "vashtaraheaven",
      title: "Vashtara Heaven",
      body: "Shopify kidswear store with a multi-vendor dispatch model, Girls and Boys as the primary categories, a free-shipping threshold, a 7-day return window and cash on delivery nationwide.",
    },
  ],
  faqs: [
    {
      question: "How much does a Shopify store cost in India?",
      answer: `It depends on catalogue size, design level, custom functionality and integrations. Shopify's own monthly plan, paid themes and paid apps are billed separately by Shopify. Message us on WhatsApp at ${PRIMARY_PHONE_DISPLAY} for a fixed written quote.`,
    },
    {
      question: "Have you built Shopify stores before?",
      answer: `Yes. We have built ${shopifyCountText}, including Tatvivah (men's ethnic wear), Swarn Sutra (handloom sarees) and Vashtara Heaven (kidswear), which has a full case study.`,
    },
    {
      question: "Shopify or WooCommerce: which should I choose?",
      answer: "Shopify if the people running the store are not technical and the catalogue is conventional. WooCommerce if you want to avoid monthly app fees for unusual product options, or already work in WordPress. We build both and will recommend one on the first call.",
    },
    {
      question: "Who owns the Shopify store?",
      answer: "You do. The Shopify account, domain and payment gateway are set up in your name from day one, so nothing has to be transferred if you ever stop working with us.",
    },
    {
      question: "Can you move my store to Shopify from another platform?",
      answer: "Yes. Products, collections and customer records can be migrated, and we map redirects from your old URLs so existing search rankings are not thrown away.",
    },
  ],
  related: [
    { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
    { label: "What decides website cost in India", href: "/website-development-cost-in-india/" },
    { label: "Ecommerce store vs marketplace", href: "/ecommerce-store-vs-marketplace/" },
    { label: "Projects we've delivered", href: "/work/" },
  ],
}

export const guidePages: GuidePage[] = [costGuide, dubaiCostGuide, singaporeCostGuide, storeVsMarketplace, marketplaceService, nextjsService, shopifyService]

export function getGuidePage(path: string): GuidePage {
  const page = guidePages.find((p) => p.path === path)
  if (!page) throw new Error(`No guide page for ${path}`)
  return page
}

/** Root-level guides, for the footer and llms.txt. Service pages list with the other services. */
export const guideLinks = guidePages.filter((p) => p.kind === "guide")
