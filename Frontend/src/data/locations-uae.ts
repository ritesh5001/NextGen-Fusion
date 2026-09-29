/**
 * UAE landing pages: one UAE hub plus Dubai, Abu Dhabi and Sharjah.
 *
 * There is no UAE office. These pages say so plainly and are marked in schema
 * as served remotely from the Lucknow office (`areaCountry: "AE"`), never with
 * a UAE address. Inventing one would break Google's guidelines on location
 * pages and the site's own standard of claims you can check.
 *
 * The smaller emirates (Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain) and
 * Al Ain are sections of the hub rather than pages of their own: near-identical
 * city pages read to Google as doorway pages, and the hub can say something
 * specific about each.
 *
 * Proof is limited to work with a case study behind it. Cleanship is the one
 * UAE-registered client (Ajman Free Zone); everything else is relevant work
 * for clients elsewhere and is described that way.
 */
import type { LocationPage } from "@/data/locations"
import { OFFICE_HOURS, offices } from "@/data/offices"
import { FX_NOTE, formatAED, formatINR, priceTier } from "@/lib/estimator-pricing"

const LUCKNOW = offices.find((office) => office.city === "Lucknow")!

// The UAE is 1h30 behind India all year (neither country uses daylight saving).
function toUaeTime(ist: string): string {
  const [h, m] = ist.split(":").map(Number)
  const minutes = h * 60 + m - 90
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`
}
const UAE_HOURS = `${toUaeTime(OFFICE_HOURS.opens)}–${toUaeTime(OFFICE_HOURS.closes)}`

const launch = priceTier("launch")
const store = priceTier("store")
const platform = priceTier("platform")
const both = (min: number, max: number) =>
  `${formatINR(min)} – ${formatINR(max)} (about ${formatAED(min)} – ${formatAED(max).replace("AED ", "")})`

const WORKING_FROM_INDIA = [
  `Our team works ${OFFICE_HOURS.opens}–${OFFICE_HOURS.closes} India time, Monday to Saturday. That is ${UAE_HOURS} in the UAE, which covers the whole of a Monday-to-Friday UAE working week, plus Saturday morning.`,
  `UAE projects run on WhatsApp and video calls. WhatsApp ${LUCKNOW.contact.phone} reaches the team directly; the developer who scopes your site is the one who writes it and the one who answers after launch.`,
]

export const uaeLocationPages: LocationPage[] = [
  {
    slug: "website-development-company-in-uae",
    city: "Lucknow",
    area: "UAE",
    areaType: "Country",
    areaCountry: "AE",
    serviceLabel: "Website Development",
    title: "Website Development Company in UAE",
    metaTitle: "Website Development Company in UAE — Served from India",
    metaDescription: `Websites, online stores and platforms for businesses in Dubai, Abu Dhabi, Sharjah and every emirate — built by an Indian team working UAE hours, from ${formatAED(launch.min)} on a published rate card.`,
    h1: "Website development for businesses across the UAE",
    intro: [
      "NextGen Fusion builds websites, online stores and platforms for UAE businesses from our offices in Lucknow and Mumbai. We do not have an office in the UAE, and we would rather say so here than have you find out on the first call.",
      "What we do have is UAE work you can check. Cleanship, a marine cleaning company registered in Ajman Free Zone, runs on a site we built with a landing page for every service at 13 UAE ports, from Jebel Ali to Khor Fakkan.",
    ],
    sections: [
      {
        heading: "How a UAE project runs from India",
        body: [
          ...WORKING_FROM_INDIA,
          "Scope comes first, in writing: what the site has to do, what it costs on our rate card and one delivery window. You approve design and build at agreed milestones, and every account (domain, hosting, payment gateway, analytics) is set up in your company's name from day one.",
        ],
        links: [
          { label: "What a website costs in Dubai", href: "/website-development-cost-in-dubai/" },
          { label: "Our published rate card", href: "/pricing/" },
        ],
      },
      {
        heading: "Dubai, Abu Dhabi and Sharjah",
        body: [
          "The three largest emirates each have their own page. In Dubai that means online stores, trading companies and marine and logistics firms around Jebel Ali. Abu Dhabi means B2B companies, procurement-heavy buyers and portals. Sharjah means manufacturers, traders and free-zone businesses in SAIF Zone and Hamriyah that need a catalogue buyers can find.",
        ],
        links: [
          { label: "Dubai", href: "/website-development-company-in-dubai/" },
          { label: "Abu Dhabi", href: "/website-development-company-in-abu-dhabi/" },
          { label: "Sharjah", href: "/website-development-company-in-sharjah/" },
        ],
      },
      {
        heading: "Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain and Al Ain",
        body: [
          "Ajman is where our one UAE-registered client is based: Cleanship's head office is in Ajman Free Zone, and its site carries its own pages for Ajman Port. Ajman Free Zone companies are often small teams that need one credible site to win their first contracts, which is exactly what the Launch band on our rate card covers.",
          "Ras Al Khaimah has RAKEZ, its economic zone, and two ports, Ras Al Khaimah Port and Mina Saqr, both of which have their own pages on the Cleanship site. Fujairah is one of the world's largest bunkering hubs and the east-coast base Cleanship works from, so if you are in marine services there, the case study below is the closest thing to your brief we have built.",
          "Umm Al Quwain businesses, including those in UAQ Free Trade Zone, work with us the same way as every other emirate: remotely, on UAE hours. Al Ain is part of Abu Dhabi emirate and is covered by our Abu Dhabi page.",
        ],
        links: [{ label: "Cleanship case study", href: "/work/cleanship/" }],
      },
      {
        heading: "What a UAE site needs that an Indian one often does not",
        body: [
          "Arabic. Both WordPress and Next.js handle right-to-left Arabic layouts properly, and we set up Arabic as a proper second language rather than a translation plugin. The Arabic copy itself should come from a native writer; we will say so rather than machine-translate your homepage.",
          "Checkout in dirhams. UAE stores use gateways that settle in AED, such as Network International, Telr, PayTabs or Stripe, and buy-now-pay-later options such as Tabby and Tamara. Which one fits depends on your bank and your margins, and we choose it with you during scoping.",
          "WhatsApp as the main contact. UAE buyers expect to message a business, so we treat the WhatsApp button as a primary action, tracked like a form submission, rather than a floating icon nobody measures.",
        ],
        links: [
          { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
          { label: "Shopify development", href: "/services/shopify-development-services/" },
        ],
      },
    ],
    caseStudies: [
      {
        slug: "cleanship",
        title: "Cleanship",
        body: "An Ajman Free Zone marine cleaning company. The site has 310 service-and-port landing pages, including every UAE port the company covers, with separate UAE and India contact paths.",
      },
      {
        slug: "maribiz-ai",
        title: "MariBiz.ai",
        body: "A global marine procurement marketplace with 3,226+ verified vendors, an RFQ engine and port-based discovery. It is used by shipowners and vendors in UAE ports among others.",
      },
      {
        slug: "tatvivahtrends",
        title: "TatVivah Trends",
        body: "A multi-vendor ecommerce marketplace with 3,000+ products, verified sellers and occasion-based filtering. It is the closest build to a UAE marketplace brief.",
      },
    ],
    faqs: [
      {
        question: "Do you have an office in the UAE?",
        answer: `No. Our offices are in Lucknow and Mumbai, and we work with UAE businesses remotely. Our hours are ${UAE_HOURS} UAE time, Monday to Saturday, and most UAE projects run on WhatsApp and video calls.`,
      },
      {
        question: "Have you worked with UAE companies before?",
        answer: "Yes. Cleanship, a marine cleaning company registered in Ajman Free Zone with bases in Fujairah and Khor Fakkan, runs on a site we built. It has a full case study on our work page.",
      },
      {
        question: "How much does a website cost for a UAE business?",
        answer: `On our rate card, a WordPress business site is ${both(launch.min, launch.max)}, a custom-coded online store ${both(store.min, store.max)}, and a custom platform ${both(platform.min, platform.max)}. Quotes are issued in INR.`,
      },
      {
        question: "Can you build an Arabic and English website?",
        answer: "Yes. WordPress and Next.js both support right-to-left Arabic layouts. We set up Arabic as a proper second language; the Arabic copy should be written or checked by a native speaker.",
      },
      {
        question: "Which payment gateways do you use for UAE online stores?",
        answer: "It depends on your bank and margins. Common choices that settle in AED include Network International, Telr, PayTabs and Stripe, with Tabby or Tamara for buy-now-pay-later. We pick one with you during scoping.",
      },
      {
        question: "Do you work with free zone companies?",
        answer: "Yes. Our UAE client Cleanship is registered in Ajman Free Zone. Free zone companies are often small teams that need one credible site quickly, which our Launch band covers.",
      },
    ],
    priceBand: both(launch.min, platform.max),
    priceNote: `A WordPress business site is ${both(launch.min, launch.max)}; a custom-coded online store ${both(store.min, store.max)}; a custom platform or marketplace ${both(platform.min, platform.max)}. ${FX_NOTE}`,
    localProof: [
      {
        client: "Cleanship — Ajman Free Zone",
        detail: "Marine cleaning company with bases in Ajman, Fujairah and Khor Fakkan. Its site covers 13 UAE ports with a page for each service at each port.",
      },
    ],
    relatedServices: [
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "ecommerce-web-development-services", label: "E-commerce Web Development" },
      { slug: "shopify-development-services", label: "Shopify Development" },
      { slug: "seo-services", label: "SEO Services" },
    ],
    relatedLocations: [
      "website-development-company-in-dubai",
      "website-development-company-in-abu-dhabi",
      "website-development-company-in-sharjah",
    ],
  },

  {
    slug: "website-development-company-in-dubai",
    city: "Lucknow",
    area: "Dubai",
    areaType: "City",
    areaCountry: "AE",
    serviceLabel: "Website Development",
    title: "Website Development Company in Dubai",
    metaTitle: "Website Development Company in Dubai",
    metaDescription: `Websites and online stores for Dubai businesses — ecommerce, trading and marine firms — built by an Indian team on UAE hours. From ${formatAED(launch.min)} on a published rate card, with a Jebel Ali case study.`,
    h1: "Website development company for Dubai businesses",
    intro: [
      "We build websites and online stores for Dubai businesses from our team in India: D2C brands selling online, trading companies, free-zone startups, and marine and logistics firms working out of Jebel Ali and Port Rashid.",
      "We have no Dubai office. What you get instead is an Indian rate card, the same working week, and the developer who scopes your project writing the code and answering after launch.",
    ],
    sections: [
      {
        heading: "Who we build for in Dubai",
        body: [
          "Online stores selling to UAE buyers, which need checkout in dirhams, cash on delivery for buyers who still expect it, and product pages that load fast on a phone on mobile data.",
          "Trading and distribution companies, whose buyers search for a product and a delivery point rather than a company name, so the site has to be built around the catalogue.",
          "Free-zone companies in DMCC, Dubai Internet City, DIFC or JAFZA that need a credible site before their first sales conversation, and marine and logistics firms around Jebel Ali, where our closest work sits.",
        ],
      },
      {
        heading: "Marine and logistics around Jebel Ali",
        body: [
          "This is the Dubai sector we know best. Cleanship's site has its own pages for hull, hold and tank cleaning at Jebel Ali and Port Rashid, because a ship operator searches by port, not by company.",
          "MariBiz.ai, the marine procurement marketplace we built, connects shipowners with verified vendors at ports worldwide, and MariMail, its companion product, tracks which vessels are heading to which port. If your business sells to ships, those three builds are the closest thing to your brief on our work page.",
        ],
        links: [
          { label: "Cleanship case study", href: "/work/cleanship/" },
          { label: "MariBiz.ai case study", href: "/work/maribiz-ai/" },
        ],
      },
      {
        heading: "Online stores for Dubai",
        body: [
          "A Dubai online store usually needs four things: a gateway that settles in AED, such as Network International, Telr, PayTabs or Stripe; cash on delivery; an Arabic version; and prices shown with the 5% VAT included.",
          "We build on Shopify where the team running the store is not technical, and on WooCommerce or custom code where the catalogue is unusual. We have built both, so we have no reason to push one.",
        ],
        links: [
          { label: "Shopify development", href: "/services/shopify-development-services/" },
          { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
        ],
      },
      {
        heading: "Working with us from Dubai",
        body: WORKING_FROM_INDIA,
        links: [{ label: "What a website costs in Dubai", href: "/website-development-cost-in-dubai/" }],
      },
    ],
    caseStudies: [
      {
        slug: "cleanship",
        title: "Cleanship",
        body: "An Ajman Free Zone marine cleaning company whose site carries pages for Jebel Ali and Port Rashid among 13 UAE ports: 310 service-and-port landing pages in all.",
      },
      {
        slug: "tatvivahtrends",
        title: "TatVivah Trends",
        body: "A multi-vendor ecommerce marketplace with 3,000+ products, verified sellers, Razorpay payments and filtering by occasion. It is the model for a Dubai store with more than one seller.",
      },
      {
        slug: "maribiz-ai",
        title: "MariBiz.ai",
        body: "A marine procurement marketplace with 3,226+ vendors across 121 categories, an RFQ engine and port-based discovery, including UAE ports.",
      },
    ],
    faqs: [
      {
        question: "Are you based in Dubai?",
        answer: `No. Our team is in Lucknow and Mumbai and works with Dubai businesses remotely, ${UAE_HOURS} UAE time, Monday to Saturday. Projects run on WhatsApp and video calls.`,
      },
      {
        question: "How much does a website cost in Dubai with you?",
        answer: `A WordPress business site is ${both(launch.min, launch.max)}; a custom-coded online store ${both(store.min, store.max)}. Quotes are issued in INR, and the full breakdown is on our Dubai cost guide.`,
      },
      {
        question: "How long does a website take?",
        answer: `A business site typically takes ${launch.weeksMin}–${launch.weeksMax} weeks from content sign-off, and a custom online store ${store.weeksMin}–${store.weeksMax} weeks. Your written quote names one delivery window.`,
      },
      {
        question: "Shopify or WooCommerce for a Dubai store?",
        answer: "Shopify if the store team is not technical and the catalogue is conventional; WooCommerce if you need unusual product options without monthly app fees. We build both and recommend one on the first call.",
      },
      {
        question: "Can you build the site in Arabic and English?",
        answer: "Yes, with proper right-to-left Arabic layouts. The Arabic copy should be written or checked by a native speaker; we will not machine-translate it.",
      },
      {
        question: "Do you do SEO for Dubai?",
        answer: "Yes: technical SEO and on-page structure are part of every build, and we run ongoing SEO for clients who want it. Without a Dubai office we cannot get you into the Google Maps pack, and we will not pretend otherwise.",
      },
    ],
    priceBand: both(launch.min, store.max),
    priceNote: `A WordPress business site is ${both(launch.min, launch.max)}; a custom-coded online store ${both(store.min, store.max)}. Platforms and marketplaces run to ${formatAED(platform.max)}. ${FX_NOTE}`,
    localProof: [
      {
        client: "Cleanship",
        detail: "Ajman Free Zone marine company. Its site has hull, hold and tank cleaning pages for Jebel Ali and Port Rashid.",
      },
    ],
    relatedServices: [
      { slug: "ecommerce-web-development-services", label: "E-commerce Web Development" },
      { slug: "shopify-development-services", label: "Shopify Development" },
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "seo-services", label: "SEO Services" },
    ],
    relatedLocations: [
      "website-development-company-in-uae",
      "website-development-company-in-abu-dhabi",
      "website-development-company-in-sharjah",
    ],
  },

  {
    slug: "website-development-company-in-abu-dhabi",
    city: "Lucknow",
    area: "Abu Dhabi",
    areaType: "City",
    areaCountry: "AE",
    serviceLabel: "Website Development",
    title: "Website Development Company in Abu Dhabi",
    metaTitle: "Website Development Company in Abu Dhabi",
    metaDescription: `Corporate websites, B2B portals and procurement platforms for Abu Dhabi businesses, built by an Indian team on UAE hours. From ${formatAED(launch.min)} on a published rate card.`,
    h1: "Website development company for Abu Dhabi businesses",
    intro: [
      "We build corporate websites, B2B portals and procurement platforms for Abu Dhabi businesses from our team in India, including companies in ADGM, Masdar City and KEZAD, and suppliers working around Khalifa Port.",
      "We have no Abu Dhabi office and say so up front. You work with a small in-house team on UAE hours, priced on a rate card you can read before the first call.",
    ],
    sections: [
      {
        heading: "Sites that hold up in procurement",
        body: [
          "Much B2B work in Abu Dhabi is won through procurement, where a buyer checks your site before they shortlist you. That site needs licences and certifications where an evaluator will look for them, a service page for each thing you actually tender for, and a company profile they can download and forward.",
          "HCB Engineering is our closest build to that brief: a licensed contractor with twenty years of work and no site to show for it, rebuilt with a page per service vertical and its credentials up front.",
        ],
        links: [{ label: "HCB Engineering case study", href: "/work/hcbengineering/" }],
      },
      {
        heading: "Portals, RFQ platforms and dashboards",
        body: [
          "Where the site has to do work, such as taking requests for quote, managing suppliers or giving clients a login, we build it as a custom platform. MariBiz.ai is the example: an RFQ engine, vendor verification, real-time messaging and a buyer dashboard, used by more than 3,226 vendors.",
          `Platforms sit in the top band of our rate card, ${both(platform.min, platform.max)}, typically ${platform.weeksMin}–${platform.weeksMax} weeks from content sign-off.`,
        ],
        links: [
          { label: "MariBiz.ai case study", href: "/work/maribiz-ai/" },
          { label: "Software development", href: "/services/software-development-services/" },
        ],
      },
      {
        heading: "Arabic and English",
        body: [
          "Organisations that deal with government entities often need a complete Arabic version, not a translated homepage. We set up Arabic as a proper second language with right-to-left layouts, and the Arabic copy should come from a native writer.",
        ],
      },
      {
        heading: "Al Ain and the rest of the emirate",
        body: [
          "Al Ain and the western region are part of Abu Dhabi emirate, and we work with businesses there the same way: remotely, on UAE hours, with the same rate card.",
          ...WORKING_FROM_INDIA,
        ],
        links: [{ label: "What a website costs in Dubai and the UAE", href: "/website-development-cost-in-dubai/" }],
      },
    ],
    caseStudies: [
      {
        slug: "maribiz-ai",
        title: "MariBiz.ai",
        body: "A B2B procurement marketplace with an RFQ engine, vendor verification, port-based discovery and 3,226+ vendors across 121 service categories.",
      },
      {
        slug: "hcbengineering",
        title: "HCB Engineering",
        body: "A licensed engineering contractor's corporate site, built so an evaluator can find each service vertical and every credential without calling.",
      },
      {
        slug: "thegrafftee",
        title: "The Grafftee",
        body: "A Next.js platform site for an HR and recruitment firm, with seven service modules, integrated demo booking and CRM-connected enquiry forms.",
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Abu Dhabi?",
        answer: `No. We work with Abu Dhabi businesses remotely from Lucknow and Mumbai, ${UAE_HOURS} UAE time, Monday to Saturday.`,
      },
      {
        question: "Can you build a B2B portal or RFQ platform?",
        answer: `Yes. MariBiz.ai is an RFQ marketplace with vendor verification and dashboards. Platforms like it are ${both(platform.min, platform.max)} on our rate card.`,
      },
      {
        question: "How much does a corporate website cost?",
        answer: `A WordPress corporate site is ${both(launch.min, launch.max)}; a custom-coded site starts higher because every template is written rather than configured. Quotes are issued in INR.`,
      },
      {
        question: "Can you build a full Arabic version?",
        answer: "Yes, with right-to-left layouts built properly. The Arabic copy should be written or checked by a native speaker.",
      },
      {
        question: "Do you work with businesses in Al Ain?",
        answer: "Yes. Al Ain is part of Abu Dhabi emirate, and we work with businesses there remotely on UAE hours, like everywhere else in the UAE.",
      },
    ],
    priceBand: both(launch.min, platform.max),
    priceNote: `A WordPress corporate site is ${both(launch.min, launch.max)}; a custom platform or portal ${both(platform.min, platform.max)}. ${FX_NOTE}`,
    localProof: [],
    relatedServices: [
      { slug: "software-development-services", label: "Software Development" },
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "nextjs-development-services", label: "Next.js Development" },
      { slug: "web-design-services", label: "Web Design" },
    ],
    relatedLocations: [
      "website-development-company-in-uae",
      "website-development-company-in-dubai",
      "website-development-company-in-sharjah",
    ],
  },

  {
    slug: "website-development-company-in-sharjah",
    city: "Lucknow",
    area: "Sharjah",
    areaType: "City",
    areaCountry: "AE",
    serviceLabel: "Website Development",
    title: "Website Development Company in Sharjah",
    metaTitle: "Website Development Company in Sharjah",
    metaDescription: `Websites and product catalogues for Sharjah manufacturers, traders and free-zone companies in SAIF Zone and Hamriyah, built by an Indian team on UAE hours. From ${formatAED(launch.min)}.`,
    h1: "Website development company for Sharjah businesses",
    intro: [
      "We build websites for Sharjah manufacturers, traders and free-zone companies, in SAIF Zone, Hamriyah Free Zone, Sharjah Media City and SRTIP, from our team in India.",
      "Sharjah is also where some of our UAE work already sits: Cleanship has a base in Khor Fakkan, on Sharjah's east coast, and its site has pages for Sharjah Port, Hamriyah and Khor Fakkan.",
    ],
    sections: [
      {
        heading: "Catalogues buyers can find",
        body: [
          "The usual problem for manufacturers and traders is that buyers search for a product, and the site shows a company. The fix is a catalogue with a page per product line, the specifications a buyer checks before calling, and an enquiry form that asks for quantity and delivery point.",
          "Saurally Solar is our closest build: 40+ products with a side-by-side comparison tool, multiple payment options and WhatsApp support, for a category where buyers research before they buy.",
        ],
        links: [{ label: "Saurally Solar case study", href: "/work/saurally/" }],
      },
      {
        heading: "Ports and marine services",
        body: [
          "Cleanship's site carries hull, hold and tank cleaning pages for Sharjah Port, Hamriyah Port and Khor Fakkan, the deep-water transhipment terminal on the Gulf of Oman. Cleanship works from a base in Khor Fakkan, so this is the closest to local proof we have in Sharjah.",
        ],
        links: [{ label: "Cleanship case study", href: "/work/cleanship/" }],
      },
      {
        heading: "Engineering and industrial firms",
        body: [
          "Industrial buyers check credentials before they shortlist. HCB Engineering is the pattern we follow: a page per service vertical, licences and certifications where an evaluator looks for them, and a clear route to a quote.",
        ],
        links: [{ label: "HCB Engineering case study", href: "/work/hcbengineering/" }],
      },
      {
        heading: "Working with us from Sharjah",
        body: WORKING_FROM_INDIA,
        links: [{ label: "What a website costs in Dubai and the UAE", href: "/website-development-cost-in-dubai/" }],
      },
    ],
    caseStudies: [
      {
        slug: "cleanship",
        title: "Cleanship",
        body: "A marine cleaning company with a base in Khor Fakkan. Its site has pages for Sharjah Port, Hamriyah and Khor Fakkan among 310 service-and-port landing pages.",
      },
      {
        slug: "saurally",
        title: "Saurally Solar",
        body: "A 40+ product catalogue store with a comparison tool, three payment gateways and WhatsApp support, built for buyers who research before they buy.",
      },
      {
        slug: "hcbengineering",
        title: "HCB Engineering",
        body: "A licensed engineering contractor's corporate site with a page per service vertical and credentials up front.",
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Sharjah?",
        answer: `No. We work with Sharjah businesses remotely from Lucknow and Mumbai, ${UAE_HOURS} UAE time, Monday to Saturday.`,
      },
      {
        question: "Have you built anything for a Sharjah business?",
        answer: "Cleanship, a marine cleaning company with a base in Khor Fakkan, runs on a site we built, including pages for Sharjah Port, Hamriyah and Khor Fakkan. It has a full case study.",
      },
      {
        question: "Can you build a product catalogue without online payment?",
        answer: "Yes. Many industrial and trading sites take enquiries rather than orders. We build the catalogue with a quote form that asks for quantity and delivery point, and add checkout later if you want it.",
      },
      {
        question: "How much does a website cost?",
        answer: `A WordPress business or catalogue site is ${both(launch.min, launch.max)}; a custom-coded online store ${both(store.min, store.max)}. Quotes are issued in INR.`,
      },
      {
        question: "Do you work with SAIF Zone and Hamriyah Free Zone companies?",
        answer: "Yes, remotely and on UAE hours, the same as every other UAE client. Free-zone companies often need one credible site quickly, which our Launch band covers.",
      },
    ],
    priceBand: both(launch.min, store.max),
    priceNote: `A WordPress business or catalogue site is ${both(launch.min, launch.max)}; a custom-coded online store ${both(store.min, store.max)}. ${FX_NOTE}`,
    localProof: [
      {
        client: "Cleanship — Khor Fakkan base",
        detail: "Marine cleaning company working from Khor Fakkan, with site pages for Sharjah Port, Hamriyah Port and Khor Fakkan.",
      },
    ],
    relatedServices: [
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "ecommerce-web-development-services", label: "E-commerce Web Development" },
      { slug: "web-design-services", label: "Web Design" },
      { slug: "seo-services", label: "SEO Services" },
    ],
    relatedLocations: [
      "website-development-company-in-uae",
      "website-development-company-in-dubai",
      "website-development-company-in-abu-dhabi",
    ],
  },
]
