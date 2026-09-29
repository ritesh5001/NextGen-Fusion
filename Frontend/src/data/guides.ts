/**
 * Guide and specialist pages: the cost guide, the ecommerce-vs-marketplace
 * decision page, and the marketplace, Next.js and Shopify service pages.
 *
 * Every rupee figure below is computed from the rate card in
 * `lib/estimator-pricing.ts`, the same source as /pricing/ and the project
 * estimator, so these pages cannot quote a number the quote will not match.
 * Every proof point names a build with a case study at /work/<slug>/ or, for
 * the Shopify list, a store that is live today. If a claim cannot be linked to
 * one of those sources, it does not go here.
 */
import { OFFICE_HOURS, officeHoursAt } from "@/data/offices"
import {
  computeBallpark,
  computeSupport,
  formatAED,
  formatSGD,
  SGD_FX_NOTE,
  formatINR,
  FX_NOTE,
  PAYMENT_TERMS,
  priceTier,
  rateCardForm,
} from "@/lib/estimator-pricing"
import type { ProjectEstimatorData } from "@/lib/api"
import { staticProjects } from "@/lib/static-projects"

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

// ─── Rate-card figures ──────────────────────────────────────────────────────

// WordPress builds hit the rate-card cap, so some bands collapse to one figure.
const range = (min: number, max: number) => (min === max ? formatINR(min) : `${formatINR(min)}–${formatINR(max)}`)

const band = (form: Partial<ProjectEstimatorData>) => {
  const { cost, weeks } = computeBallpark(rateCardForm(form))
  return { cost: range(cost.min, cost.max), weeks: `${weeks.min}–${weeks.max} weeks`, ...cost }
}
const tierText = (id: "launch" | "store" | "platform") => {
  const t = priceTier(id)
  return { cost: range(t.min, t.max), weeks: `${t.weeksMin}–${t.weeksMax} weeks`, ...t }
}

const launch = tierText("launch")
const store = tierText("store")
const platform = tierText("platform")

// Modifier deltas, measured on a custom-coded brochure site. WordPress builds
// are capped inside the Launch band, so deltas measured there would read as zero.
const customBase = computeBallpark(rateCardForm({ buildType: "custom" })).cost.min
const delta = (form: Partial<ProjectEstimatorData>) =>
  computeBallpark(rateCardForm({ buildType: "custom", ...form })).cost.min - customBase
const pct = (form: Partial<ProjectEstimatorData>) => `+${Math.round((delta(form) / customBase) * 100)}%`

const support = {
  basic: computeSupport(rateCardForm({ maintenance: "basic" })),
  growthWp: computeSupport(rateCardForm({ maintenance: "growth", buildType: "wordpress" })),
  growthCustom: computeSupport(rateCardForm({ maintenance: "growth", buildType: "custom" })),
}
const plan = (p: (typeof support)[keyof typeof support]) => (p ? `${formatINR(p.amount)} / ${p.cadence}` : "—")

const wooStandard = band({ projectType: "ecommerce", ecommercePackage: "standard" })
const wooCustomFn = band({ projectType: "ecommerce", ecommercePackage: "custom-functionality" })
const customFnStore = band({ projectType: "ecommerce", buildType: "custom", ecommercePackage: "custom-functionality" })
const customBrochure = band({ buildType: "custom" })

// Counted from the case studies, so the claim grows with the work page.
const wooStoreCount = staticProjects.filter(
  (p) => p.techStack.includes("WooCommerce") && !p.techStack.includes("Next.js"),
).length

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

// ─── Pages ──────────────────────────────────────────────────────────────────

const costGuide: GuidePage = {
  path: "/website-development-cost-in-india",
  kind: "guide",
  label: "Website development cost in India",
  metaTitle: "Website Development Cost in India (2026): Real Rupee Bands",
  metaDescription: `What a website costs in India in 2026, from our published rate card: brochure sites ${launch.cost}, custom online stores ${store.cost}, platforms ${platform.cost} — with timelines, what moves the price, and the running costs.`,
  eyebrow: "Cost guide · 2026",
  h1: "Website development cost in India: what you will actually pay in 2026",
  intro: [
    `On our rate card, a business website in India costs from ${formatINR(launch.min)} to ${formatINR(platform.max)}, and both ends of that range are honest. The spread is not agencies making numbers up. It is three different kinds of project that happen to share the word "website".`,
    "This guide uses our own published rate card rather than survey averages, because a real rate card is the only number you can check against a quote. Every figure on this page is computed from the same rate card as our pricing page and project estimator, so if we change a price, this page changes with it.",
  ],
  updated: "2026-09-22",
  sections: [
    {
      heading: "The short answer: three bands",
      body: [
        `Almost every website enquiry we get lands in one of three bands. Knowing which one you are in matters more than any individual price: the step from Launch to Store is more than tenfold (${formatINR(launch.min)} to ${formatINR(store.min)}), and it is driven by what the site has to do, not how it looks.`,
      ],
      table: {
        caption: "Website development cost in India by project type (NextGen Fusion rate card, 2026)",
        columns: ["Band", "What it is", "Price", "Typical timeline"],
        rows: [
          ["Launch", "Brochure or business site on WordPress", launch.cost, launch.weeks],
          ["Store", "Custom-coded online store", store.cost, store.weeks],
          ["Platform", "Dashboards, marketplaces, B2B tools, web apps", platform.cost, platform.weeks],
        ],
        note: "Timelines run from content sign-off. Your written quote names one number and one delivery window, not a range.",
      },
      links: [
        { label: "Launch tier", href: "/pricing/#launch" },
        { label: "Store tier", href: "/pricing/#store" },
        { label: "Platform tier", href: "/pricing/#platform" },
      ],
    },
    {
      heading: "Brochure and business websites",
      body: [
        `A brochure site is the credible, fast, findable presence: home, about, services, contact, maybe a blog. On WordPress it sits in the Launch band, ${launch.cost}. Built as custom code, typically in Next.js, the same site starts at ${customBrochure.cost}.`,
        "Custom code costs more for the same page count because every template is written rather than configured. It earns that back when speed, a very specific design or later application logic matter. If the site is mostly text that a non-technical person will edit, WordPress is the better buy, and we will say so on the call.",
        "Page count is the main lever inside this band. Each additional page on a brochure build adds a fixed amount on the rate card, which is why the table climbs in steps.",
      ],
      table: {
        caption: "Brochure website cost by page count and build type",
        columns: ["Pages", "WordPress", "Custom-coded (Next.js)", "Timeline"],
        rows: (["1-5", "6-15", "16-30"] as const).map((pages) => {
          const wp = band({ pageCount: pages })
          const custom = band({ buildType: "custom", pageCount: pages })
          return [pages.replace("-", "–"), wp.cost, custom.cost, custom.weeks]
        }),
        note: `WordPress builds stay inside the Launch band (${launch.cost}) whatever the page count.`,
      },
    },
    {
      heading: "Online stores",
      body: [
        `Stores split on the same line. A WooCommerce or Shopify store is quoted from ${wooStandard.cost}, rising to ${wooCustomFn.cost} where it needs custom functionality on top of plugins or apps. ${wooStoreCount} of our delivered stores are WooCommerce builds with case studies on our work page, and we have built ${shopifyCountText}.`,
        `A custom-coded store is the Store band, ${store.cost}, and goes up to ${customFnStore.cost} when it needs custom functionality. That is the right call when merchandising, checkout speed and catalogue logic decide revenue and a template has started getting in the way.`,
        "Payment gateway and Shiprocket integration are included in every ecommerce build at no extra cost. Gateway transaction fees are separate and paid by you to the gateway. Check the current rates on the gateway's own pricing page (Razorpay's is linked below) rather than trusting a figure in any agency's blog, including this one.",
      ],
      table: {
        caption: "Online store cost in India by package and build type",
        columns: ["Package", "WooCommerce or Shopify", "Custom-coded"],
        rows: (
          [
            ["Standard", "standard"],
            ["Premium", "premium"],
            ["Extra premium", "extra-premium"],
            ["Custom functionality", "custom-functionality"],
          ] as const
        ).map(([label, pkg]) => [
          label,
          band({ projectType: "ecommerce", ecommercePackage: pkg }).cost,
          band({ projectType: "ecommerce", buildType: "custom", ecommercePackage: pkg }).cost,
        ]),
        note: `Typical timeline for either build: ${wooStandard.weeks} from content sign-off.`,
      },
      links: [
        { label: "Razorpay pricing (official)", href: "https://razorpay.com/pricing/" },
        { label: "Shopify India plans (official)", href: "https://www.shopify.com/in/pricing" },
        { label: "Shopify development", href: "/services/shopify-development-services/" },
        { label: "Ecommerce store or marketplace?", href: "/ecommerce-store-vs-marketplace/" },
      ],
    },
    {
      heading: "Platforms, marketplaces and web apps",
      body: [
        `The Platform band, ${platform.cost} over ${platform.weeks}, covers anything with logged-in users doing work: dashboards, B2B quoting, internal tools and multi-vendor marketplaces. The upper end of the band is a build with authentication, an admin dashboard and payments, which is what most marketplaces need.`,
        "These are the projects where the brief matters most. Two platforms with the same feature list can differ by weeks depending on how many roles there are, what data has to be migrated and which third-party systems have to be integrated. That is why the Platform band is wide and why the written quote comes after a scoping call, not before.",
      ],
      links: [
        { label: "Marketplace development", href: "/services/marketplace-development-services/" },
        { label: "Next.js development", href: "/services/nextjs-development-services/" },
      ],
    },
    {
      heading: "What moves the number",
      body: [
        "Inside any band, the price moves for a handful of reasons, and they are all on the rate card rather than negotiated. The figures below are measured on a custom-coded brochure site so you can see their size.",
      ],
      table: {
        caption: "Rate-card modifiers (measured on a custom-coded brochure site)",
        columns: ["Factor", "Effect on price"],
        rows: [
          ["Content partly ready (we fill gaps)", `+${formatINR(delta({ contentReadiness: "partial" }))}`],
          ["Content written by us", `+${formatINR(delta({ contentReadiness: "need-help" }))}`],
          ["Each third-party integration (CRM, ERP, etc.)", `+${formatINR(delta({ integrations: ["crm"] }))}`],
          ["Premium design", pct({ designLevel: "premium" })],
          ["Conversion-focused design", pct({ designLevel: "conversion-focused" })],
          ["Delivery within a month", pct({ timeline: "1-month" })],
          ["As soon as possible", pct({ timeline: "asap" })],
        ],
      },
    },
    {
      heading: "Running costs after launch",
      body: [
        "The build is a one-time cost. Three things recur, and a quote that does not mention them is not a complete quote.",
        `Support is a separate plan with us: ${plan(support.basic)} for uptime monitoring and fixes, or ${plan(support.growthWp)} (WordPress) and ${plan(support.growthCustom)} (custom-coded) for support plus ongoing changes. Requests are handled ${OFFICE_HOURS.label}.`,
        "Domain, hosting and any platform fees are paid by you, into accounts in your name from day one. We do not resell hosting, so there is no margin hiding in it, and if you leave us nothing has to be transferred.",
      ],
      table: {
        caption: "Recurring costs for a website in India",
        columns: ["Cost", "Paid to", "Amount"],
        rows: [
          ["Support: uptime and fixes", "NextGen Fusion", plan(support.basic)],
          ["Support + changes (WordPress)", "NextGen Fusion", plan(support.growthWp)],
          ["Support + changes (custom-coded)", "NextGen Fusion", plan(support.growthCustom)],
          ["Domain and hosting", "Your registrar and host, directly", "Their current price"],
          ["Payment gateway fees", "Your gateway, per transaction", "Their current rate"],
        ],
      },
      links: [{ label: "Support plans", href: "/pricing/#support" }],
    },
    {
      heading: "Why quotes for the same site vary so much",
      body: [
        "If you have three quotes for what sounds like the same site and they differ by five times, it is usually one of three things. The cheap quote is a theme with your logo on it and no content work. The expensive quote includes things the others left out, such as copy, SEO structure or support. Or the agencies heard three different projects in the same brief.",
        "The fix is to compare scope, not totals. Ask each one what is excluded, who owns the domain and hosting accounts, what happens when you need a change in month six, and what the payment terms are. Ours are the same on every project: " + PAYMENT_TERMS + ".",
        "Also check what \"fast\" means. Google measures real-user speed with Core Web Vitals, and it is worth asking any agency to show you those numbers for a site they have already built.",
      ],
      links: [{ label: "Core Web Vitals (web.dev)", href: "https://web.dev/articles/vitals" }],
    },
  ],
  caseStudiesHeading: "Builds at each end of the range",
  caseStudies: [
    {
      slug: "hcbengineering",
      title: "HCB Engineering",
      body: "A WordPress corporate site for an engineering firm, built to show 20+ years of work, three service verticals and licensed credentials: the kind of site the Launch band covers.",
    },
    {
      slug: "deetoo",
      title: "DeeToo",
      body: "A WooCommerce store cataloguing 12 brands across 8 categories with pan-India cash on delivery: the WooCommerce end of the store range.",
    },
    {
      slug: "maribiz-ai",
      title: "MariBiz.ai",
      body: "A B2B procurement marketplace with an RFQ engine, vendor verification and real-time messaging, now listing 3,226+ vendors: the kind of project the Platform band covers.",
    },
  ],
  faqs: [
    {
      question: "How much does a website cost in India in 2026?",
      answer: `On our rate card: a WordPress business site costs ${launch.cost}, a custom-coded online store ${store.cost}, and a custom platform or web app ${platform.cost}. WooCommerce and Shopify stores start at ${wooStandard.cost}.`,
    },
    {
      question: "How much does a small business website cost in India?",
      answer: `A small business website on WordPress sits in our Launch band, ${launch.cost}, and typically takes ${launch.weeks} from content sign-off. The price includes on-page SEO, analytics setup and every account in your name.`,
    },
    {
      question: "How much does an ecommerce website cost in India?",
      answer: `A WooCommerce or Shopify store starts at ${wooStandard.cost} (Shopify's own monthly plan is paid to Shopify). A custom-coded store is ${store.cost}, rising to ${customFnStore.cost} with custom functionality. Payment gateway and Shiprocket integration are included in every store.`,
    },
    {
      question: "Why is a custom-coded site more expensive than WordPress?",
      answer: `Every template is written rather than configured. A custom-coded brochure site starts at ${customBrochure.cost} against ${launch.cost} on WordPress. It is worth it when speed, a very specific design or later application logic matter, and not worth it for a mostly-text site a non-technical person edits.`,
    },
    {
      question: "What are the ongoing costs of a website?",
      answer: `Support with us is ${plan(support.basic)} for uptime and fixes, or ${plan(support.growthWp)} (WordPress) / ${plan(support.growthCustom)} (custom) including changes. Domain, hosting and gateway fees are paid by you directly to those providers.`,
    },
    {
      question: "What are the payment terms?",
      answer: `${PAYMENT_TERMS}. There is no separate design fee and no per-revision charge inside the agreed scope.`,
    },
  ],
  related: [
    { label: "Full pricing and tiers", href: "/pricing/" },
    { label: "Get a tailored estimate", href: "/#project-estimator" },
    { label: "Ecommerce store vs marketplace", href: "/ecommerce-store-vs-marketplace/" },
    { label: "Projects we've delivered", href: "/work/" },
  ],
}

// Both currencies side by side for UAE readers; the quote itself is in INR.
const dual = (form: Partial<ProjectEstimatorData>) => {
  const { cost } = computeBallpark(rateCardForm(form))
  return {
    inr: range(cost.min, cost.max),
    aed: cost.min === cost.max ? formatAED(cost.min) : `${formatAED(cost.min)}–${formatAED(cost.max).replace("AED ", "")}`,
  }
}
const tierDual = (id: "launch" | "store" | "platform") => {
  const t = priceTier(id)
  return { inr: range(t.min, t.max), aed: `${formatAED(t.min)}–${formatAED(t.max).replace("AED ", "")}`, weeks: `${t.weeksMin}–${t.weeksMax} weeks` }
}
const launchAe = tierDual("launch")
const storeAe = tierDual("store")
const platformAe = tierDual("platform")
const planAe = (p: (typeof support)[keyof typeof support]) =>
  p ? `${formatINR(p.amount)} (${formatAED(p.amount)}) / ${p.cadence}` : "—"

const dubaiCostGuide: GuidePage = {
  path: "/website-development-cost-in-dubai",
  kind: "guide",
  label: "Website development cost in Dubai",
  metaTitle: "Website Development Cost in Dubai & UAE (2026), in AED",
  metaDescription: `What a website costs a Dubai or UAE business in 2026, in AED and INR from our published rate card: business sites ${launchAe.aed}, custom online stores ${storeAe.aed}, platforms ${platformAe.aed}.`,
  eyebrow: "Cost guide · UAE · 2026",
  h1: "Website development cost in Dubai and the UAE: the numbers in AED",
  intro: [
    `On our rate card, a UAE business website costs from about ${formatAED(launch.min)} for a WordPress business site to about ${formatAED(platform.max)} for a custom platform. We are an Indian team working UAE hours, so these are Indian rates, shown in dirhams.`,
    `Every figure is computed from the same rate card as our pricing page, so it moves when the rate card does. ${FX_NOTE}`,
  ],
  updated: "2026-09-29",
  sections: [
    {
      heading: "The short answer: three bands",
      body: [
        "Almost every UAE brief falls into one of three bands. The band is set by what the site has to do, not by how it looks, and the step from the first band to the second is more than tenfold.",
      ],
      table: {
        caption: "Website development cost for UAE businesses by project type (NextGen Fusion rate card, 2026)",
        columns: ["Band", "What it is", "AED (approx.)", "INR", "Timeline"],
        rows: [
          ["Launch", "Business or brochure site on WordPress", launchAe.aed, launchAe.inr, launchAe.weeks],
          ["Store", "Custom-coded online store", storeAe.aed, storeAe.inr, storeAe.weeks],
          ["Platform", "Portals, marketplaces, RFQ platforms, web apps", platformAe.aed, platformAe.inr, platformAe.weeks],
        ],
        note: "Timelines run from content sign-off. Your written quote names one number and one delivery window",
      },
      links: [
        { label: "Launch tier", href: "/pricing/#launch" },
        { label: "Store tier", href: "/pricing/#store" },
        { label: "Platform tier", href: "/pricing/#platform" },
      ],
    },
    {
      heading: "Business websites, and what Arabic adds",
      body: [
        "A business site on WordPress stays inside the Launch band whatever the page count. Built as custom code, typically in Next.js, the price climbs with the number of pages.",
        "An Arabic version is, for pricing purposes, more pages: each Arabic page is a page to build and check, so a 10-page English site with a full Arabic version is priced like a 20-page site. The Arabic copy itself should come from a native writer and is not included.",
      ],
      table: {
        caption: "Business website cost by page count, in AED (approx.)",
        columns: ["Pages", "WordPress", "Custom-coded (Next.js)"],
        rows: (["1-5", "6-15", "16-30"] as const).map((pages) => [
          pages.replace("-", "–"),
          dual({ pageCount: pages }).aed,
          dual({ buildType: "custom", pageCount: pages }).aed,
        ]),
        note: "INR equivalents are on the India cost guide",
      },
      links: [{ label: "The same guide in INR", href: "/website-development-cost-in-india/" }],
    },
    {
      heading: "Online stores",
      body: [
        "A WooCommerce or Shopify store is the cheapest way to sell online in the UAE, and a custom-coded store is right when checkout speed and catalogue logic decide revenue.",
        "Payment gateway integration is included in every store. Gateway fees are paid by you to the gateway, and on Shopify the monthly plan, themes and apps are paid to Shopify. UAE stores usually settle in AED through gateways such as Network International, Telr, PayTabs or Stripe.",
      ],
      table: {
        caption: "Online store cost for UAE businesses, in AED (approx.)",
        columns: ["Package", "WooCommerce or Shopify", "Custom-coded"],
        rows: (
          [
            ["Standard", "standard"],
            ["Premium", "premium"],
            ["Extra premium", "extra-premium"],
            ["Custom functionality", "custom-functionality"],
          ] as const
        ).map(([label, pkg]) => [
          label,
          dual({ projectType: "ecommerce", ecommercePackage: pkg }).aed,
          dual({ projectType: "ecommerce", buildType: "custom", ecommercePackage: pkg }).aed,
        ]),
      },
      links: [
        { label: "Shopify development", href: "/services/shopify-development-services/" },
        { label: "Ecommerce store or marketplace?", href: "/ecommerce-store-vs-marketplace/" },
      ],
    },
    {
      heading: "Running costs after launch",
      body: [
        "Three things recur, and a quote that leaves them out is not complete. Support is a plan with us; domain, hosting and gateway fees are paid by you to those providers, in accounts in your company's name.",
        "VAT in the UAE is 5%. How it applies to a supplier outside the UAE depends on your registration, so ask your accountant before you compare our INR quote with a local one.",
      ],
      table: {
        caption: "Recurring costs for a UAE business website",
        columns: ["Cost", "Paid to", "Amount"],
        rows: [
          ["Support: uptime and fixes", "NextGen Fusion", planAe(support.basic)],
          ["Support + changes (WordPress)", "NextGen Fusion", planAe(support.growthWp)],
          ["Support + changes (custom-coded)", "NextGen Fusion", planAe(support.growthCustom)],
          ["Domain and hosting", "Your registrar and host", "Their current price"],
          ["Payment gateway fees", "Your gateway, per transaction", "Their current rate"],
        ],
      },
      links: [{ label: "Support plans", href: "/pricing/#support" }],
    },
    {
      heading: "What you give up by hiring outside the UAE",
      body: [
        `Two things. Meetings are on video, not across a table, although our hours overlap the whole UAE working week. And without a UAE office we cannot put you in the Google Maps results for "near me" searches; that needs your own Google Business Profile at your own address, which we can help you set up.`,
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
      body: "A WooCommerce store with 12 brands across 8 categories: the WooCommerce end of the store range.",
    },
    {
      slug: "maribiz-ai",
      title: "MariBiz.ai",
      body: "A B2B procurement marketplace with an RFQ engine and 3,226+ vendors: the kind of project the Platform band covers.",
    },
  ],
  faqs: [
    {
      question: "How much does a website cost in Dubai?",
      answer: `On our rate card: about ${launchAe.aed} for a WordPress business site, ${storeAe.aed} for a custom-coded online store, and ${platformAe.aed} for a custom platform. Quotes are issued in INR (${launchAe.inr}, ${storeAe.inr} and ${platformAe.inr}).`,
    },
    {
      question: "How much does an ecommerce website cost in the UAE?",
      answer: `A WooCommerce or Shopify store starts at about ${dual({ projectType: "ecommerce" }).aed}; a custom-coded store is ${storeAe.aed}. Gateway fees and any Shopify plan are paid to those providers.`,
    },
    {
      question: "Why is an Indian team cheaper for a UAE website?",
      answer: "Our rates are set for an Indian cost base. Compare scope rather than totals: ask every quote what is excluded, who owns the accounts and what happens when you need a change in month six.",
    },
    {
      question: "Does an Arabic version cost extra?",
      answer: "Yes, in pages: each Arabic page is built and checked like an English one, so a full Arabic version roughly doubles the page count. The Arabic copy should come from a native writer.",
    },
    {
      question: "How long does a website take?",
      answer: `A business site typically takes ${launchAe.weeks} from content sign-off, a custom store ${storeAe.weeks} and a platform ${platformAe.weeks}. The written quote names one delivery window.`,
    },
  ],
  related: [
    { label: "Website development in the UAE", href: "/website-development-company-in-uae/" },
    { label: "Website development in Dubai", href: "/website-development-company-in-dubai/" },
    { label: "Full pricing and tiers", href: "/pricing/" },
    { label: "The India cost guide", href: "/website-development-cost-in-india/" },
  ],
}

// Singapore figures in SGD; the quote itself is in INR.
const sgRange = (min: number, max: number) => (min === max ? formatSGD(min) : `${formatSGD(min)}–${formatSGD(max)}`)
const dualSg = (form: Partial<ProjectEstimatorData>) => {
  const { cost } = computeBallpark(rateCardForm(form))
  return { inr: range(cost.min, cost.max), sgd: sgRange(cost.min, cost.max) }
}
const tierSg = (id: "launch" | "store" | "platform") => {
  const t = priceTier(id)
  return { inr: range(t.min, t.max), sgd: sgRange(t.min, t.max), weeks: `${t.weeksMin}–${t.weeksMax} weeks` }
}
const SG_HOURS = officeHoursAt(150)
const launchSg = tierSg("launch")
const storeSg = tierSg("store")
const platformSg = tierSg("platform")
const planSg = (p: (typeof support)[keyof typeof support]) =>
  p ? `${formatINR(p.amount)} (${formatSGD(p.amount)}) / ${p.cadence}` : "—"

const singaporeCostGuide: GuidePage = {
  path: "/website-development-cost-in-singapore",
  kind: "guide",
  label: "Website development cost in Singapore",
  metaTitle: "Website Development Cost in Singapore (2026), in SGD",
  metaDescription: `What a website costs a Singapore business in 2026, in SGD and INR from our published rate card: business sites ${launchSg.sgd}, custom online stores ${storeSg.sgd}, platforms ${platformSg.sgd}.`,
  eyebrow: "Cost guide · Singapore · 2026",
  h1: "Website development cost in Singapore: the numbers in SGD",
  intro: [
    `On our rate card, a Singapore business website costs from about ${formatSGD(launch.min)} for a WordPress business site to about ${formatSGD(platform.max)} for a custom platform. We are an Indian team, so these are Indian rates, shown in Singapore dollars.`,
    `Every figure is computed from the same rate card as our pricing page. ${SGD_FX_NOTE}`,
  ],
  updated: "2026-09-29",
  sections: [
    {
      heading: "The short answer: three bands",
      body: [
        "Almost every brief falls into one of three bands, set by what the site has to do rather than how it looks. The step from the first band to the second is more than tenfold.",
      ],
      table: {
        caption: "Website development cost for Singapore businesses by project type (NextGen Fusion rate card, 2026)",
        columns: ["Band", "What it is", "SGD (approx.)", "INR", "Timeline"],
        rows: [
          ["Launch", "Business or brochure site on WordPress", launchSg.sgd, launchSg.inr, launchSg.weeks],
          ["Store", "Custom-coded online store", storeSg.sgd, storeSg.inr, storeSg.weeks],
          ["Platform", "SaaS products, portals, marketplaces, web apps", platformSg.sgd, platformSg.inr, platformSg.weeks],
        ],
        note: "Timelines run from content sign-off. Your written quote names one number and one delivery window",
      },
      links: [
        { label: "Launch tier", href: "/pricing/#launch" },
        { label: "Store tier", href: "/pricing/#store" },
        { label: "Platform tier", href: "/pricing/#platform" },
      ],
    },
    {
      heading: "Business websites",
      body: [
        "A business site on WordPress stays inside the Launch band whatever the page count. Built as custom code, typically in Next.js, the price climbs with the number of pages. A second language, such as Chinese, is priced as more pages.",
      ],
      table: {
        caption: "Business website cost by page count, in SGD (approx.)",
        columns: ["Pages", "WordPress", "Custom-coded (Next.js)"],
        rows: (["1-5", "6-15", "16-30"] as const).map((pages) => [
          pages.replace("-", "–"),
          dualSg({ pageCount: pages }).sgd,
          dualSg({ buildType: "custom", pageCount: pages }).sgd,
        ]),
        note: "INR equivalents are on the India cost guide",
      },
      links: [{ label: "The same guide in INR", href: "/website-development-cost-in-india/" }],
    },
    {
      heading: "Online stores",
      body: [
        "Payment gateway integration is included in every store. Singapore stores usually take PayNow alongside cards, through a gateway such as Stripe, Adyen, HitPay or 2C2P; gateway fees are paid by you to the gateway, and on Shopify the monthly plan, themes and apps are paid to Shopify.",
      ],
      table: {
        caption: "Online store cost for Singapore businesses, in SGD (approx.)",
        columns: ["Package", "WooCommerce or Shopify", "Custom-coded"],
        rows: (
          [
            ["Standard", "standard"],
            ["Premium", "premium"],
            ["Extra premium", "extra-premium"],
            ["Custom functionality", "custom-functionality"],
          ] as const
        ).map(([label, pkg]) => [
          label,
          dualSg({ projectType: "ecommerce", ecommercePackage: pkg }).sgd,
          dualSg({ projectType: "ecommerce", buildType: "custom", ecommercePackage: pkg }).sgd,
        ]),
      },
      links: [{ label: "Shopify development", href: "/services/shopify-development-services/" }],
    },
    {
      heading: "Running costs, GST and PSG",
      body: [
        "Support is a plan with us; domain, hosting and gateway fees are paid by you to those providers, in accounts in your company's name.",
        "Singapore GST is 9%, and how it applies to services bought from a supplier outside Singapore depends on your registration, so ask your accountant before comparing our INR quote with a local one. We are not a pre-approved vendor under the Productivity Solutions Grant, so our work cannot be claimed under PSG.",
      ],
      table: {
        caption: "Recurring costs for a Singapore business website",
        columns: ["Cost", "Paid to", "Amount"],
        rows: [
          ["Support: uptime and fixes", "NextGen Fusion", planSg(support.basic)],
          ["Support + changes (WordPress)", "NextGen Fusion", planSg(support.growthWp)],
          ["Support + changes (custom-coded)", "NextGen Fusion", planSg(support.growthCustom)],
          ["Domain and hosting", "Your registrar and host", "Their current price"],
          ["Payment gateway fees", "Your gateway, per transaction", "Their current rate"],
        ],
      },
      links: [{ label: "Support plans", href: "/pricing/#support" }],
    },
    {
      heading: "What you give up by hiring outside Singapore",
      body: [
        `Mornings and meetings. Our day runs ${SG_HOURS} Singapore time, so a morning question waits until lunchtime, and meetings are on video. And without a Singapore address we cannot put you in Google Maps results; that needs your own Google Business Profile at your own address.`,
      ],
      links: [{ label: "Website development in Singapore", href: "/website-development-company-in-singapore/" }],
    },
  ],
  caseStudiesHeading: "Comparable builds",
  caseStudies: [
    {
      slug: "maribiz-ai",
      title: "MariBiz.ai",
      body: "A global marine procurement marketplace with an RFQ engine and 3,226+ vendors: the kind of project the Platform band covers.",
    },
    {
      slug: "nextmentor",
      title: "NEXTmentor",
      body: "A Next.js course platform with payments, verifiable certificates and referral commission: a typical startup platform build.",
    },
    {
      slug: "deetoo",
      title: "DeeToo",
      body: "A WooCommerce store with 12 brands across 8 categories: the WooCommerce end of the store range.",
    },
  ],
  faqs: [
    {
      question: "How much does a website cost in Singapore?",
      answer: `On our rate card: about ${launchSg.sgd} for a WordPress business site, ${storeSg.sgd} for a custom-coded online store, and ${platformSg.sgd} for a custom platform. Quotes are issued in INR (${launchSg.inr}, ${storeSg.inr} and ${platformSg.inr}).`,
    },
    {
      question: "How much does an ecommerce website cost in Singapore?",
      answer: `A WooCommerce or Shopify store starts at about ${dualSg({ projectType: "ecommerce" }).sgd}; a custom-coded store is ${storeSg.sgd}. Gateway fees and any Shopify plan are paid to those providers.`,
    },
    {
      question: "Can I use the Productivity Solutions Grant with you?",
      answer: "No. We are not a PSG pre-approved vendor, so our work cannot be claimed under the grant.",
    },
    {
      question: "What hours do you work in Singapore time?",
      answer: `${SG_HOURS} Singapore time, Monday to Saturday, which covers every Singapore afternoon.`,
    },
    {
      question: "How long does a website take?",
      answer: `A business site typically takes ${launchSg.weeks} from content sign-off, a custom store ${storeSg.weeks} and a platform ${platformSg.weeks}.`,
    },
  ],
  related: [
    { label: "Website development in Singapore", href: "/website-development-company-in-singapore/" },
    { label: "Full pricing and tiers", href: "/pricing/" },
    { label: "The UAE cost guide (AED)", href: "/website-development-cost-in-dubai/" },
    { label: "The India cost guide", href: "/website-development-cost-in-india/" },
  ],
}

const storeVsMarketplace: GuidePage = {
  path: "/ecommerce-store-vs-marketplace",
  kind: "guide",
  label: "Ecommerce store vs marketplace",
  metaTitle: "Ecommerce Store vs Marketplace: Which Should You Build?",
  metaDescription: `Should you build an online store or a multi-vendor marketplace? A decision guide from a team that has built both: who owns the stock, who ships, and what each costs (${store.cost} vs ${platform.cost}).`,
  eyebrow: "Decision guide",
  h1: "Ecommerce store or marketplace: which one are you actually building?",
  intro: [
    "The short answer: if you own the stock, you need a store. If other people sell through you and you earn from their sales, you need a marketplace. Everything else is detail, but the detail is where budgets go wrong, because a marketplace costs more than a store and takes longer to build.",
    "We have built both — WooCommerce, Shopify and custom stores (one of them shipping from multiple designers) and two full multi-vendor marketplaces — so this is written from the build side, with the case studies linked.",
  ],
  updated: "2026-09-22",
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
          ["Build cost (our rate card)", `${wooStandard.cost} (WooCommerce) · ${store.cost} (custom)`, `Platform band, ${platform.cost}`],
          ["Typical timeline", store.weeks, platform.weeks],
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
      answer: `On our rate card a custom-coded store is ${store.cost} and a marketplace sits in the Platform band, ${platform.cost}. A WooCommerce store starts at ${wooStandard.cost}.`,
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
      answer: `Typically ${platform.weeks} from content sign-off, against ${store.weeks} for a custom store. The written quote names one delivery window after scoping.`,
    },
  ],
  related: [
    { label: "Marketplace development", href: "/services/marketplace-development-services/" },
    { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
    { label: "Website development cost in India", href: "/website-development-cost-in-india/" },
    { label: "Full pricing and tiers", href: "/pricing/" },
  ],
}

const marketplaceService: GuidePage = {
  path: "/services/marketplace-development-services",
  kind: "service",
  label: "Marketplace Development",
  metaTitle: "Multi-Vendor Marketplace Development Company in India",
  metaDescription: `Multi-vendor marketplace development from Lucknow and Mumbai: seller onboarding, verification, RFQ and seller dashboards. Built TatVivah Trends and MariBiz.ai. Priced from our rate card, ${platform.cost}.`,
  eyebrow: "Marketplace development",
  h1: "Multi-vendor marketplace development",
  intro: [
    "We build marketplaces where other people sell: multi-vendor stores, B2B procurement platforms and supplier networks. Two are live with full case studies, TatVivah Trends (3,000+ wedding-wear products from verified sellers) and MariBiz.ai (3,226+ maritime vendors across 121 categories). A third, Vashtara Heaven, runs multi-vendor dispatch on Shopify.",
    "Most agencies that say \"marketplace\" mean a store with a vendor plugin. The difference shows up the first time a seller uploads a bad listing, two sellers end up in one order, or a buyer cannot tell a verified vendor from an unverified one. Those are the parts we design first.",
  ],
  updated: "2026-09-22",
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
      heading: "What it costs",
      body: [
        `Marketplaces sit in the Platform band of our published rate card: ${platform.cost}, typically ${platform.weeks} from content sign-off. The upper end is a build with authentication, seller and admin dashboards and payments, which is what most marketplaces need.`,
        `If you are not sure you need a full marketplace yet, a custom store with several suppliers is the Store band, ${store.cost}, and can become a marketplace later. Payment terms are the same on every project: ${PAYMENT_TERMS}.`,
      ],
      links: [
        { label: "Platform tier on the rate card", href: "/pricing/#platform" },
        { label: "Store or marketplace?", href: "/ecommerce-store-vs-marketplace/" },
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
      answer: `On our rate card, a marketplace sits in the Platform band: ${platform.cost}, typically ${platform.weeks} from content sign-off. Your written quote names one number after scoping.`,
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
    { label: "Website development cost in India", href: "/website-development-cost-in-india/" },
  ],
}

const nextjsService: GuidePage = {
  path: "/services/nextjs-development-services",
  kind: "service",
  label: "Next.js Development",
  metaTitle: "Next.js Development Agency in India",
  metaDescription: `Next.js development from Lucknow and Mumbai: fast custom websites, headless stores and web apps. Built TatVivah Trends, NEXTmentor and The Grafftee on Next.js. Custom sites from ${customBrochure.cost}.`,
  eyebrow: "Next.js development",
  h1: "Next.js development agency",
  intro: [
    "We build custom websites, headless stores and web apps in Next.js, the React framework behind this site. TatVivah Trends (a multi-vendor marketplace with a Next.js front end over WooCommerce), NEXTmentor (a course platform with Razorpay payments, verifiable certificates and referral commission) and The Grafftee (an HR services platform with demo booking and CRM integration) are three client builds with full case studies.",
    "Next.js is not always the right answer, and it is not the cheapest. Below is when we recommend it, when we talk people out of it, and what it costs on our rate card.",
  ],
  updated: "2026-09-22",
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
        `If the site is mostly text and pictures, and a non-technical person will edit it every week, WordPress is the better buy. On our rate card a WordPress business site is ${launch.cost} against ${customBrochure.cost} for the same site custom-coded, and your team can edit it without a developer.`,
        "We build both, so we have no reason to push you toward the expensive one. Most of our delivered stores are WooCommerce for exactly this reason.",
      ],
    },
    {
      heading: "What a Next.js build with us includes",
      body: [
        "TypeScript throughout, server-rendered pages, structured data, and analytics and Search Console connected before launch. Core Web Vitals are checked on a throttled mobile connection, not just on a fast office laptop.",
        "A repository, hosting and every account in your name from day one, plus a staging environment on platform builds. If you ever leave us, another developer can pick up the code, because it is a standard Next.js project with nothing hidden in it.",
        "This site is itself a Next.js App Router build. Its pricing page, estimator and this page all compute their rupee figures from one rate card, which is the sort of thing a framework makes easy and a theme does not.",
      ],
    },
    {
      heading: "What it costs",
      body: [
        `A custom-coded brochure site in Next.js starts at ${customBrochure.cost}. A custom store is the Store band, ${store.cost}. Web apps, dashboards and marketplaces are the Platform band, ${platform.cost}. Payment terms are the same on every project: ${PAYMENT_TERMS}.`,
      ],
      table: {
        caption: "Next.js development cost by project type (NextGen Fusion rate card)",
        columns: ["Project", "Price", "Typical timeline"],
        rows: [
          ["Custom website, 1–5 pages", customBrochure.cost, customBrochure.weeks],
          ["Custom website, 6–15 pages", band({ buildType: "custom", pageCount: "6-15" }).cost, band({ buildType: "custom", pageCount: "6-15" }).weeks],
          ["Custom online store", store.cost, store.weeks],
          ["Web app, dashboard or marketplace", platform.cost, platform.weeks],
        ],
      },
      links: [
        { label: "Full pricing and tiers", href: "/pricing/" },
        { label: "Website development cost in India", href: "/website-development-cost-in-india/" },
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
      answer: `On our rate card a custom-coded Next.js site starts at ${customBrochure.cost} for 1–5 pages. Custom stores are ${store.cost} and web apps ${platform.cost}.`,
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
    { label: "Website development cost in India", href: "/website-development-cost-in-india/" },
  ],
}

const shopifyService: GuidePage = {
  path: "/services/shopify-development-services",
  kind: "service",
  label: "Shopify Development",
  metaTitle: "Shopify Development Company in India",
  metaDescription: `Shopify store development from Lucknow and Mumbai for Indian D2C fashion and apparel brands. ${shopifyDeliveredCount} Shopify stores built, including Tatvivah and Swarn Sutra. Stores from ${wooStandard.cost} on our rate card.`,
  eyebrow: "Shopify development",
  h1: "Shopify development for Indian D2C brands",
  intro: [
    `We build Shopify stores for Indian brands, mostly fashion and apparel: menswear, handloom sarees, kidswear, womenswear and jackets. We have built ${shopifyCountText}, all linked below, so you can open them on your phone and judge the work yourself.`,
    "We build on WooCommerce and custom code too, so we will tell you when Shopify is the wrong fit. The short version: Shopify is right when the people running the store are not technical and want to add products between customer calls without touching code.",
  ],
  updated: "2026-09-22",
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
      heading: "What it costs",
      body: [
        `On our rate card, Shopify stores are quoted in the same band as WooCommerce: ${wooStandard.cost} for a standard store, up to ${wooCustomFn.cost} with custom functionality, typically ${wooStandard.weeks} from content sign-off. Payment gateway and Shiprocket integration are included.`,
        `Shopify's own monthly plan, any paid theme and any paid apps are billed by Shopify to you, in your account, not through us; check Shopify's current India plans on their pricing page. Support after launch is ${plan(support.basic)} for fixes, or ${plan(support.growthWp)} including ongoing changes. Payment terms: ${PAYMENT_TERMS}.`,
      ],
      table: {
        caption: "Shopify store cost on our rate card",
        columns: ["Package", "Price"],
        rows: (
          [
            ["Standard", "standard"],
            ["Premium", "premium"],
            ["Extra premium", "extra-premium"],
            ["Custom functionality", "custom-functionality"],
          ] as const
        ).map(([label, pkg]) => [label, band({ projectType: "ecommerce", ecommercePackage: pkg }).cost]),
        note: "Shopify plan, theme and app fees are paid to Shopify and are not included",
      },
      links: [
        { label: "Shopify India plans (official)", href: "https://www.shopify.com/in/pricing" },
        { label: "Full pricing and tiers", href: "/pricing/" },
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
      answer: `On our rate card a Shopify store is ${wooStandard.cost} for a standard build, up to ${wooCustomFn.cost} with custom functionality. Shopify's own monthly plan, paid themes and paid apps are billed separately by Shopify.`,
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
    { label: "Website development cost in India", href: "/website-development-cost-in-india/" },
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
