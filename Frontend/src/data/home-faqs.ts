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
import { priceTier } from "@/lib/estimator-pricing"

export type HomeFaq = { question: string; answer: string }

// Timelines only. Prices are not published; they are shared in conversation.
const launch = priceTier("launch")
const store = priceTier("store")
const platform = priceTier("platform")


export const homeFaqs: HomeFaq[] = [
  {
    question: "What industries do you serve?",
    answer:
      "Mostly ecommerce and D2C retail — ethnic and wedding wear, sarees and textiles, kidswear, gifting, solar products and agri-inputs — plus engineering contractors, an ed-tech learning platform, HR-tech SaaS and a maritime B2B marketplace. Every one of those has a full case study on our Work page.",
  },
  {
    question: "Can you work with startups or small businesses?",
    answer: `Yes — most of our clients are founder-led businesses, and we work with them from our Lucknow and Mumbai offices. A first website does not need an enterprise budget, and you own the domain, hosting and code from day one. Tell us the budget you have in mind on WhatsApp and we will say honestly what it can buy.`,
  },
  {
    question: "How do I get started with NextGen Fusion?",
    answer:
      "Send us a short brief through the contact form, WhatsApp or a booked call: what the business sells, who buys from it and what the site has to do. You get back a written scope with one price and one delivery window. Work starts on a 50% advance.",
  },
  {
    question: "How much does website development cost in India?",
    answer: `It depends on the kind of project: a business site, an online store and a custom platform are very different amounts of work, and pages, content, integrations and deadline move the number further. We do not publish prices. Message us on WhatsApp or use the contact form and you get one fixed written quote, with no hidden costs, within one working day.`,
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
      `Yes. Support is a recurring plan billed separately from the build, quoted with your project, depending on whether you need fixes only or ongoing changes too. Support requests are handled ${OFFICE_HOURS.label}; automated uptime checks run around the clock.`,
  },
  {
    question: "What are the working hours of NextGen Fusion?",
    answer:
      `Our offices are open ${OFFICE_HOURS.label}, and we reply to every enquiry within ${OFFICE_HOURS.replyWithin}. We regularly schedule calls around clients in other time zones.`,
  },
]
