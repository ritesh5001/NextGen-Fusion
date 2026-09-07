import type { Metadata } from "next"
import Link from "next/link"
import { Check, Minus } from "lucide-react"
import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, buildMetadata, ORGANIZATION_ID, siteUrl } from "@/lib/seo"
import {
  computeBallpark,
  computeSupport,
  ECOMMERCE_INCLUDED,
  formatCurrency,
  PAYMENT_TERMS,
} from "@/lib/estimator-pricing"
import type { ProjectEstimatorData } from "@/lib/api"
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from "@/data/offices"

const PATH = "/pricing"

export const metadata: Metadata = buildMetadata({
  title: "Pricing — What a Website Actually Costs",
  description:
    "Real price bands for websites, online stores and custom builds, straight from our rate card — plus payment terms and support plan costs. No 'contact us for a quote'.",
  path: PATH,
})

/**
 * Every figure on this page is computed from the same rate card the project
 * estimator uses, so the page cannot drift from the quote a visitor is given.
 * Nothing here is hardcoded — change `src/lib/estimator-pricing.ts` and this
 * page follows.
 */
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

const form = (overrides: Partial<ProjectEstimatorData>): ProjectEstimatorData => ({
  ...baseForm,
  ...overrides,
})

type Tier = {
  id: string
  name: string
  who: string
  /** The estimator configuration this band is priced from. */
  form: ProjectEstimatorData
  /** Second configuration, where a tier spans a range of packages. */
  upperForm?: ProjectEstimatorData
  included: string[]
  excluded: string[]
}

const TIERS: Tier[] = [
  {
    id: "launch",
    name: "Launch",
    who: "A brochure site on WordPress or Shopify. Right when you need a credible, fast, findable presence and the catalogue or logic is simple.",
    form: form({ projectType: "landing-page", buildType: "wordpress" }),
    upperForm: form({ projectType: "landing-page", buildType: "wordpress", pageCount: "6-15" }),
    included: [
      "Design and build of every template the site needs",
      "Responsive layouts tested on real devices, not a resized browser",
      "Content loaded by us from what you supply",
      "On-page SEO during the build — titles, descriptions, headings, schema",
      "Analytics and Search Console connected and verified before launch",
      "Redirects mapped from any previous URLs",
      "Domain, hosting, repository and every account in your name from day one",
    ],
    excluded: [
      "Long-form copywriting beyond structural editing",
      "Product or lifestyle photography",
      "Custom application logic or dashboards",
      "Paid ad management",
    ],
  },
  {
    id: "store",
    name: "Store",
    who: "A custom-coded online store. Right when merchandising, checkout and speed decide revenue, and a template has stopped being enough.",
    form: form({ projectType: "ecommerce", buildType: "custom", ecommercePackage: "standard" }),
    upperForm: form({
      projectType: "ecommerce",
      buildType: "custom",
      ecommercePackage: "extra-premium",
    }),
    included: [
      "Everything in Launch",
      ...ECOMMERCE_INCLUDED,
      "Catalogue architecture, filters and search",
      "Checkout built and tested with real orders before launch",
      "Shipping zones, weight slabs and COD rules matched to how you fulfil",
      "Core Web Vitals checked on a throttled mobile connection",
    ],
    excluded: [
      "Product photography and catalogue copywriting",
      "Marketplace or multi-vendor logic (that is a Platform build)",
      "Ongoing catalogue data entry",
    ],
  },
  {
    id: "platform",
    name: "Platform",
    who: "Custom software: dashboards, marketplaces, B2B quoting, internal tools. Right when the model is unusual enough that a platform gets in the way.",
    form: form({ projectType: "saas", buildType: "custom" }),
    upperForm: form({
      projectType: "saas",
      buildType: "custom",
      features: ["dashboard", "auth", "payment"],
    }),
    included: [
      "Everything in Store, where a storefront is part of the scope",
      "Authentication, roles and permissions",
      "Admin dashboard and reporting",
      "API design and third-party integrations",
      "Staging environment and a repository you own",
    ],
    excluded: [
      "Native iOS development — we do not take this on",
      "Ongoing product management or staffing",
      "Data migration from systems with no export path",
    ],
  },
]

const priced = TIERS.map((tier) => {
  const lower = computeBallpark(tier.form)
  const upper = computeBallpark(tier.upperForm ?? tier.form)
  return {
    ...tier,
    min: lower.cost.min,
    max: Math.max(lower.cost.max, upper.cost.max),
    weeksMin: Math.min(lower.weeks.min, upper.weeks.min),
    weeksMax: Math.max(lower.weeks.max, upper.weeks.max),
  }
})

const overallMin = Math.min(...priced.map((t) => t.min))
const overallMax = Math.max(...priced.map((t) => t.max))

const supportBasic = computeSupport(form({ maintenance: "basic" }))
const supportGrowthWp = computeSupport(form({ maintenance: "growth", buildType: "wordpress" }))
const supportGrowthCustom = computeSupport(form({ maintenance: "growth", buildType: "custom" }))
const supportPlans = [supportBasic, supportGrowthWp, supportGrowthCustom].filter(
  (plan): plan is NonNullable<typeof plan> => plan !== null,
)

const FAQS = [
  {
    question: "Why publish prices at all when every other agency hides them?",
    answer:
      "Because the alternative wastes both sides' time. Most enquiries we lose on price would have been lost after three meetings anyway. Publishing the bands means the people who call us have already decided the range works.",
  },
  {
    question: "Is this a quote?",
    answer:
      "No — it is the rate card the quote is built from. Your written quote comes back from a brief and names one number and one delivery window, not a range. The project estimator on the homepage gets you closer in about two minutes.",
  },
  {
    question: "What are the payment terms?",
    answer: `${PAYMENT_TERMS}. There is no separate design fee, no per-revision charge inside the agreed scope, and no charge for the pre-launch checks.`,
  },
  {
    question: "What makes a project land at the top of its band rather than the bottom?",
    answer:
      "Three things, in order: how many custom features are in scope, how many third-party systems have to be integrated, and how ready your content is. A build where the copy and photography arrive on day one is meaningfully cheaper than one where we are waiting on them in week six.",
  },
  {
    question: "What does it cost to run after launch?",
    answer: supportPlans.length
      ? `Support is billed separately from the build. ${supportPlans
          .map((plan) => `${plan.label} is ${formatCurrency(plan.amount)} per ${plan.cadence}`)
          .join("; ")}. On top of that you pay for your own domain, hosting and any platform fees, all in your own accounts.`
      : "Support is billed separately from the build, as a recurring plan.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do, from day one. Domain, hosting, repository, analytics and payment gateway are all registered in your name and we work inside your accounts. We do not hold anything as leverage — if you leave, nothing has to be handed over because it was never ours.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Review rounds at agreed milestones, and we keep iterating until the result matches the signed scope. What is charged extra is new scope — a page or feature that was not in the agreement — and we tell you that before doing the work, not after.",
  },
  {
    question: "Do you take on work outside these three tiers?",
    answer:
      "Sometimes, and sometimes we say no. We do not do native iOS, brand-only engagements with no build attached, or ecommerce projects where the catalogue and photography are not ready. Referring that work elsewhere costs us less than delivering it badly.",
  },
]

export default function PricingPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "@id": `${absoluteUrl(PATH)}#offer`,
      name: "Website, ecommerce and custom software development",
      url: absoluteUrl(PATH),
      priceCurrency: "INR",
      priceRange: `₹${overallMin.toLocaleString("en-IN")}–₹${overallMax.toLocaleString("en-IN")}`,
      availability: "https://schema.org/InStock",
      areaServed: ["IN", "Worldwide"],
      seller: { "@id": ORGANIZATION_ID },
      offeredBy: { "@id": ORGANIZATION_ID },
      priceSpecification: priced.map((tier) => ({
        "@type": "PriceSpecification",
        name: tier.name,
        priceCurrency: "INR",
        minPrice: tier.min,
        maxPrice: tier.max,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${absoluteUrl(PATH)}#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Pricing", path: PATH },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${absoluteUrl(PATH)}#webpage`,
      url: absoluteUrl(PATH),
      name: "Pricing",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": ORGANIZATION_ID },
    },
  ]

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-600">Pricing</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            What a website actually costs
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            These are the bands our quotes are built from, not a teaser. They come from the same
            rate card the{" "}
            <Link href="/#project-estimator" className="font-medium text-purple-600 hover:underline">
              project estimator
            </Link>{" "}
            uses, so the number here and the number you are quoted cannot drift apart.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">
            Payment terms are the same on every project: <strong className="font-semibold text-gray-900">{PAYMENT_TERMS}</strong>.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {priced.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col rounded-2xl border border-gray-200 p-7"
              >
                <h2 className="text-2xl font-bold text-gray-900">{tier.name}</h2>
                <p className="mt-3 text-3xl font-bold text-gray-900">
                  {formatCurrency(tier.min)}
                  <span className="text-gray-400"> – </span>
                  {formatCurrency(tier.max)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Typically {tier.weeksMin}–{tier.weeksMax} weeks from content sign-off
                </p>
                <p className="mt-4 leading-relaxed text-gray-600">{tier.who}</p>

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-gray-900">
                  Included
                </h3>
                <ul className="mt-3 space-y-2">
                  {tier.included.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-gray-900">
                  Not included
                </h3>
                <ul className="mt-3 space-y-2">
                  {tier.excluded.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-500">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {supportPlans.length > 0 && (
          <section className="border-y border-gray-100 bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900">After launch</h2>
              <p className="mt-3 max-w-3xl text-gray-600">
                Support is a recurring plan billed separately from the build. This is the part of
                the industry that is broken, and the reason most of our enquiries come from
                businesses whose previous developer stopped replying.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {supportPlans.map((plan) => (
                  <div
                    key={`${plan.label}-${plan.cadence}-${plan.amount}`}
                    className="rounded-2xl border border-gray-200 bg-white p-6"
                  >
                    <h3 className="font-semibold text-gray-900">{plan.label}</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {formatCurrency(plan.amount)}
                      <span className="text-base font-normal text-gray-500"> / {plan.cadence}</span>
                    </p>
                    {plan.note && <p className="mt-3 text-sm text-gray-600">{plan.note}</p>}
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-3xl text-sm text-gray-600">
                Full details are on the{" "}
                <Link href="/support/" className="font-medium text-purple-600 hover:underline">
                  support and plans page
                </Link>
                .
              </p>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">Pricing questions</h2>
          <dl className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {FAQS.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="font-semibold text-gray-900">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-gray-600">
            Still not sure which band you are in? Call{" "}
            <a
              href={`tel:${PRIMARY_PHONE_E164}`}
              className="font-medium text-purple-600 hover:underline"
            >
              {PRIMARY_PHONE_DISPLAY}
            </a>{" "}
            or{" "}
            <Link href="/contact/" className="font-medium text-purple-600 hover:underline">
              send us the brief
            </Link>{" "}
            — you get a written reply with a scope and a number within one working day.
          </p>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </main>
    </>
  )
}
