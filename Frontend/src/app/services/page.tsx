import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { serviceRoutes } from "@/components/services/service-data"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, ORGANIZATION_ID, siteUrl } from "@/lib/seo"


export const metadata: Metadata = {
  title: "Services — Web, Ecommerce, SEO & Software",
  description:
    "Website and ecommerce development, web design, SEO, PPC, social media, AI automation, software and cloud — all twelve services, explained.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
}

const serviceDescriptions: Record<string, string> = {
  "Website Development Services":
    "Fast, scalable, conversion-focused websites with clean architecture and SEO-ready structure.",
  "E-commerce Web Development Services":
    "Secure online stores with optimized checkout, payment integration, and order management.",
  "Android App Development Services":
    "Robust Android apps with smooth performance, API connectivity, and long-term maintainability.",
  "Web Design Services":
    "Modern, user-centric design with clear hierarchy, responsive layouts, and strong branding.",
  "AI Automation and AI Development Services":
    "Automate workflows and build AI features like assistants, recommendations, and data processing.",
  "SEO Services":
    "Grow organic visibility with technical SEO, keyword strategy, and content performance tracking.",
  "PPC Services":
    "High-intent paid campaigns with ad optimization, budget control, and ROI-focused reporting.",
  "Social Media Marketing Services":
    "Strategic content, campaign planning, and performance-driven social media execution.",
  "Website Maintenance Services":
    "Updates, uptime monitoring, fixes, backups, and performance checks to keep your site reliable.",
  "Software Development Services":
    "Custom software tailored to your processes, from architecture to deployment and support.",
  "API Integration Services":
    "Connect CRMs, payments, and internal platforms through reliable, secure API integrations.",
  "Cloud Solutions":
    "Scalable, resilient cloud infrastructure for secure application delivery.",
}

export default function ServicesPage() {
  const services = Object.entries(serviceRoutes)

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${absoluteUrl("/services")}#collection`,
      url: absoluteUrl("/services"),
      name: "Services — NextGen Fusion",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": ORGANIZATION_ID },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: services.length,
        itemListElement: services.map(([title, href], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: title,
          url: absoluteUrl(href),
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
  ]

  return (
    <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <JsonLd data={schema} />
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Services
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
              grow online
            </span>
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            From conversion-focused websites to SEO, software, and AI automation — explore how we
            help growing brands turn traffic into enquiries and sales.
          </p>
        </div>

        {/* Hub copy. A category page with a heading and twelve cards ranks for
            nothing; the twelve service pages are what we want to rank, and this
            page's job is to route intent to the right one. */}
        <div className="mb-14 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Twelve services, but most projects start as one of three
              conversations. <strong className="font-semibold text-gray-900">You need a site
              built</strong> — a new business, a rebrand, or an existing site that has become more
              expensive to change than it was to make. That is website development, web design and,
              if you sell online, ecommerce development.
            </p>
            <p>
              <strong className="font-semibold text-gray-900">You have a site and it is not
              producing anything.</strong> That is usually SEO first — technical structure and
              speed before content — with PPC where you need enquiries this quarter rather than
              next, and social media where the audience is already there and the funnel is not.
            </p>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              <strong className="font-semibold text-gray-900">You need something built that is
              not a website.</strong> Internal software, an Android app, an integration between
              systems that do not talk to each other, cloud infrastructure that stops falling over,
              or automation that removes a job nobody should be doing manually.
            </p>
            <p>
              Underneath all three is maintenance, which is the one nobody asks for and everybody
              needs. If you are not sure which of these you are,{" "}
              <Link href="/contact/" className="font-medium text-purple-600 hover:underline">
                describe the problem
              </Link>{" "}
              rather than the solution and we will tell you — including when the answer is that you
              do not need us. You can also look at{" "}
              <Link href="/work/" className="font-medium text-purple-600 hover:underline">
                what we have delivered
              </Link>{" "}
              to see which of these we do most.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(([title, href]) => (
            <Link
              key={title}
              href={href}
              className="group rounded-2xl border border-gray-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {serviceDescriptions[title]}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600">
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
