import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { serviceRoutes } from "@/components/services/service-data"
import { siteUrl } from "@/lib/seo"


export const metadata: Metadata = {
  title: "Services — Web, Ecommerce, SEO & Software",
  description:
    "Explore NextGen Fusion's full range of services: website and ecommerce development, web design, SEO, PPC, social media, AI automation, software, API integration, and cloud solutions.",
  alternates: {
    canonical: `${siteUrl}/services`,
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

  return (
    <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
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
