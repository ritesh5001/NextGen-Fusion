/**
 * Singapore landing page.
 *
 * No Singapore office and, as of September 2026, no Singapore-registered
 * client. The page says both. Its proof is maritime work relevant to
 * Singapore's port cluster (MariBiz.ai, MariMail, Cleanship, whose site lists
 * Singapore among the ports it mobilises to) and builds that match the other
 * common Singapore briefs, each described as what it is.
 *
 * Marked in schema as served remotely from the Lucknow office
 * (`areaCountry: "SG"`); no Singapore address is claimed.
 */
import type { LocationPage } from "@/data/locations"
import { OFFICE_HOURS, officeHoursAt, offices } from "@/data/offices"
import { SGD_FX_NOTE, formatINR, formatSGD, priceTier } from "@/lib/estimator-pricing"

const LUCKNOW = offices.find((office) => office.city === "Lucknow")!

// Singapore is 2h30 ahead of India all year.
const SG_HOURS = officeHoursAt(150)

const launch = priceTier("launch")
const store = priceTier("store")
const platform = priceTier("platform")
const both = (min: number, max: number) =>
  `${formatINR(min)} – ${formatINR(max)} (about ${formatSGD(min)} – ${formatSGD(max)})`

export const sgLocationPages: LocationPage[] = [
  {
    slug: "website-development-company-in-singapore",
    city: "Lucknow",
    area: "Singapore",
    areaType: "Country",
    areaCountry: "SG",
    serviceLabel: "Website Development",
    title: "Website Development Company in Singapore",
    metaTitle: "Website Development Company in Singapore — Served from India",
    metaDescription: `Websites, online stores and platforms for Singapore businesses, from maritime and trading firms to startups, built by an Indian team working Singapore afternoons. From ${formatSGD(launch.min)} on a published rate card.`,
    h1: "Website development for Singapore businesses",
    intro: [
      "NextGen Fusion builds websites, online stores and platforms from our offices in Lucknow and Mumbai. We have no office in Singapore, and we have not yet built for a Singapore-registered company, so this page shows the work closest to what Singapore businesses ask for instead of a logo wall.",
      "The closest is maritime. We built MariBiz.ai, a marine procurement marketplace with more than 3,226 verified vendors, and the site for Cleanship, a marine cleaning company whose crews mobilise to ports including Singapore.",
    ],
    sections: [
      {
        heading: "How a Singapore project runs from India",
        body: [
          `Singapore is two and a half hours ahead of India. Our team works ${OFFICE_HOURS.opens}–${OFFICE_HOURS.closes} India time, Monday to Saturday, which is ${SG_HOURS} in Singapore. That covers every Singapore afternoon; a message sent first thing in the morning is answered when our day starts.`,
          `Projects run on WhatsApp, email and video calls. WhatsApp ${LUCKNOW.contact.phone} reaches the team directly, and the developer who scopes your site is the one who writes it and answers after launch.`,
          "Scope comes first, in writing: what the site has to do, what it costs on our rate card and one delivery window. Every account (domain, hosting, payment gateway, analytics) is opened in your company's name from day one.",
        ],
        links: [
          { label: "What a website costs in Singapore", href: "/website-development-cost-in-singapore/" },
          { label: "Our published rate card", href: "/pricing/" },
        ],
      },
      {
        heading: "Maritime, shipping and trade",
        body: [
          "Singapore is one of the world's largest bunkering ports and a hub for ship management, procurement and chartering. That is the sector we have built most for outside India.",
          "MariBiz.ai connects shipowners with verified marine vendors port by port, through a request-for-quote engine with real-time messaging. MariMail, its companion product, shows marine service companies which vessels are heading to which port before they arrive. Cleanship's site has a landing page for every service at every port it covers, because ship operators search by port, not by company name.",
        ],
        links: [
          { label: "MariBiz.ai case study", href: "/work/maribiz-ai/" },
          { label: "Cleanship case study", href: "/work/cleanship/" },
        ],
      },
      {
        heading: "Startups, SaaS and platforms",
        body: [
          "Singapore startups usually need a fast marketing site now and a product later. We build both in Next.js, so the two can share one codebase and one design system.",
          "NEXTmentor is the example: a course platform with Razorpay payments, a player that remembers where each learner stopped, certificates with public verification pages and a referral programme that pays commission. A Singapore version would swap the gateway for one that settles in SGD.",
        ],
        links: [
          { label: "NEXTmentor case study", href: "/work/nextmentor/" },
          { label: "Next.js development", href: "/services/nextjs-development-services/" },
        ],
      },
      {
        heading: "Online stores for Singapore",
        body: [
          "A Singapore store needs PayNow at checkout alongside cards, prices that include the 9% GST, and delivery options that match how quickly buyers expect a parcel in a city this size. Stripe, Adyen, HitPay and 2C2P all support Singapore stores; which one fits depends on your bank and your margins.",
          "We build on Shopify where the team running the store is not technical, and on WooCommerce or custom code where the catalogue is unusual.",
        ],
        links: [
          { label: "Shopify development", href: "/services/shopify-development-services/" },
          { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
        ],
      },
      {
        heading: "Two things to know before you hire us",
        body: [
          "We are not a pre-approved vendor under Singapore's Productivity Solutions Grant, so our work cannot be claimed under PSG. If the grant decides your budget, you need a Singapore-registered PSG vendor.",
          "A .sg domain needs a Singapore administrative contact, so it has to be registered by your company, not by us. That is how we would want it anyway: the domain should be in your name.",
        ],
      },
    ],
    caseStudies: [
      {
        slug: "maribiz-ai",
        title: "MariBiz.ai",
        body: "A global marine procurement marketplace: RFQ engine, vendor verification, port-based discovery, real-time messaging and 3,226+ vendors across 121 categories.",
      },
      {
        slug: "cleanship",
        title: "Cleanship",
        body: "A marine cleaning company's site with 310 service-and-port landing pages. Its crews mobilise to ports across the Gulf, India, West Africa and beyond, Singapore included.",
      },
      {
        slug: "nextmentor",
        title: "NEXTmentor",
        body: "A Next.js course platform with skill packs, a resume-where-you-stopped player, verifiable certificates and a referral programme paying up to 50% commission.",
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Singapore?",
        answer: `No. Our offices are in Lucknow and Mumbai, and we work with Singapore businesses remotely. Our hours are ${SG_HOURS} Singapore time, Monday to Saturday.`,
      },
      {
        question: "Have you worked with Singapore companies?",
        answer: "Not with a Singapore-registered company yet. Our closest work is maritime: MariBiz.ai, a global marine procurement marketplace, and Cleanship, whose crews mobilise to Singapore among other ports.",
      },
      {
        question: "How much does a website cost for a Singapore business?",
        answer: `On our rate card, a WordPress business site is ${both(launch.min, launch.max)}, a custom-coded online store ${both(store.min, store.max)}, and a custom platform ${both(platform.min, platform.max)}. Quotes are issued in INR.`,
      },
      {
        question: "Can your work be claimed under the Productivity Solutions Grant?",
        answer: "No. We are not a PSG pre-approved vendor. If you need the grant, you need a Singapore-registered vendor on the PSG list.",
      },
      {
        question: "Which payment options do you set up for Singapore stores?",
        answer: "PayNow alongside card payments, through a gateway such as Stripe, Adyen, HitPay or 2C2P. We choose one with you during scoping, based on your bank and margins.",
      },
      {
        question: "What hours can we reach you in Singapore time?",
        answer: `${SG_HOURS}, Monday to Saturday. That covers every Singapore afternoon; morning messages are answered when our day starts.`,
      },
    ],
    priceBand: both(launch.min, platform.max),
    priceNote: `A WordPress business site is ${both(launch.min, launch.max)}; a custom-coded online store ${both(store.min, store.max)}; a custom platform ${both(platform.min, platform.max)}. ${SGD_FX_NOTE}`,
    localProof: [],
    relatedServices: [
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "nextjs-development-services", label: "Next.js Development" },
      { slug: "marketplace-development-services", label: "Marketplace Development" },
      { slug: "shopify-development-services", label: "Shopify Development" },
    ],
    relatedLocations: ["website-development-company-in-uae", "website-development-company-in-dubai"],
  },
]
