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
import type { ProjectEstimatorData } from "@/lib/api"
import { computeBallpark } from "@/lib/estimator-pricing"

export type HomeFaq = { question: string; answer: string }

const baseForm: ProjectEstimatorData = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  projectType: "landing-page",
  buildType: "wordpress",
  ecommercePackage: "standard",
  features: [],
  timeline: "3-months",
  pageCount: "1-5",
  designLevel: "clean",
  contentReadiness: "ready",
  maintenance: "none",
  integrations: [],
  goals: "",
  notes: "",
}

// Always INR, never the estimator's locale-dependent formatter: this text is
// rendered on the server and in FAQPage schema, and the homepage was quoting
// dollars to an Indian audience.
const inr = (value: number) => `₹${value.toLocaleString("en-IN")}`

function band(lower: Partial<ProjectEstimatorData>, upper: Partial<ProjectEstimatorData>) {
  const min = computeBallpark({ ...baseForm, ...lower }).cost.min
  const max = computeBallpark({ ...baseForm, ...upper }).cost.max
  return `${inr(min)}–${inr(max)}`
}

// Same configurations as the tiers on /pricing/, so the two cannot disagree.
const launchBand = band({}, { pageCount: "6-15" })
const storeBand = band(
  { projectType: "ecommerce", buildType: "custom" },
  { projectType: "ecommerce", buildType: "custom", ecommercePackage: "extra-premium" },
)

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
      "Most websites are delivered in 2-3 weeks. Larger ecommerce, custom, or SaaS builds take longer, and we lock an exact timeline with you on the discovery call before any work starts.",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer:
      "Every project includes review rounds at agreed milestones, so you sign off as we go and there are no surprises at launch. We keep iterating until the result matches the scope and your business goals.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes. We don't ghost you after launch. We offer monthly maintenance and growth packages covering updates, monitoring, fixes, and improvements.",
  },
  {
    question: "What are the working hours of NextGen Fusion?",
    answer:
      "Our offices are open Monday to Saturday, 10 AM to 7 PM IST. We're flexible and regularly accommodate clients across different time zones.",
  },
]
