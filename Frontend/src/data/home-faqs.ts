/**
 * Homepage FAQ.
 *
 * Lifted out of the client component so the homepage can emit FAQPage schema
 * server-side: the questions were already visible on the page, they just had no
 * markup behind them, which is the whole cost of missing a rich result.
 *
 * Keep the answers here in step with the opening hours in `offices.ts` and the
 * Organization schema in `app/layout.tsx` — they are the same claim in three places.
 */
import { OFFICE_HOURS } from "@/data/offices"
import { computeSupport, formatINR, priceTier, rateCardForm } from "@/lib/estimator-pricing"

export type HomeFaq = { question: string; answer: string }

// Same configurations as the tiers on /pricing/, so the two cannot disagree.
const launch = priceTier("launch")
const store = priceTier("store")
const platform = priceTier("platform")
const launchBand = `${formatINR(launch.min)}–${formatINR(launch.max)}`
const storeBand = `${formatINR(store.min)}–${formatINR(store.max)}`

const supportPlans = [
  computeSupport(rateCardForm({ maintenance: "basic" })),
  computeSupport(rateCardForm({ maintenance: "growth", buildType: "wordpress" })),
  computeSupport(rateCardForm({ maintenance: "growth", buildType: "custom" })),
]
  .filter((plan): plan is NonNullable<typeof plan> => plan !== null)
  .map((plan) => `${formatINR(plan.amount)} a ${plan.cadence}`)

export const homeFaqs: HomeFaq[] = [
  {
    question: "What industries do you serve?",
    answer:
      "Mostly ecommerce and D2C retail — ethnic and wedding wear, sarees and textiles, kidswear, gifting, solar products and agri-inputs — plus engineering contractors, an ed-tech learning platform, HR-tech SaaS and a maritime B2B marketplace. Every one of those has a full case study on our Work page.",
  },
  {
    question: "Can you work with startups or small businesses?",
    answer: `Yes — most of our clients are founder-led businesses, and we work with them from our Lucknow and Mumbai offices. A WordPress or Shopify site starts at ${launchBand}, so a first website does not need an enterprise budget, and you own the domain, hosting and code from day one.`,
  },
  {
    question: "How do I get started with NextGen Fusion?",
    answer:
      "Send us a short brief through the contact form, WhatsApp or a booked call: what the business sells, who buys from it and what the site has to do. You get back a written scope with one price and one delivery window. Work starts on a 50% advance.",
  },
  {
    question: "How much does website development cost in India?",
    answer: `WordPress or Shopify business websites start at ${launchBand}. Custom-coded online stores run ${storeBand}, and custom platforms or web apps are quoted from the same rate card. Full bands are on our pricing page, and the project estimator gives a tailored range in about two minutes — every quote is fixed, with no hidden costs.`,
  },
  {
    question: "How long does a project take?",
    answer:
      `A WordPress or Shopify website typically takes ${launch.weeksMin}–${launch.weeksMax} weeks from content sign-off, a custom online store ${store.weeksMin}–${store.weeksMax} weeks, and a custom platform ${platform.weeksMin}–${platform.weeksMax} weeks. Your written quote names one delivery window, agreed before any work starts.`,
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer:
      "Every project includes review rounds at agreed milestones, so you sign off as we go and there are no surprises at launch. We keep iterating until the result matches the scope and your business goals.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      `Yes. Support is a recurring plan billed separately from the build: ${supportPlans.join(", ")}, depending on whether you need fixes only or ongoing changes too. Support requests are handled ${OFFICE_HOURS.label}; automated uptime checks run around the clock.`,
  },
  {
    question: "What are the working hours of NextGen Fusion?",
    answer:
      `Our offices are open ${OFFICE_HOURS.label}, and we reply to every enquiry within ${OFFICE_HOURS.replyWithin}. We regularly schedule calls around clients in other time zones.`,
  },
]
