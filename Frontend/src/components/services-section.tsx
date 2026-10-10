"use client"

import { m } from "framer-motion"
import Link from "next/link"
import {
  AppWindow,
  ArrowUpRight,
  Bot,
  Cloud,
  Code2,
  MousePointerClick,
  PenTool,
  Plug,
  Search,
  Share2,
  ShoppingCart,
  Smartphone,
  Wrench,
} from "lucide-react"
import BadgeSubtitle from "./badge-subtitle"
import { serviceRoutes } from "./services/service-data"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// The three jobs projects start as (see the section paragraph), with every
// service under the one it belongs to.
const PILLARS = [
  {
    label: "Build a site",
    wash: "wash-blue",
    titles: [
      "Website Development Services",
      "E-commerce Web Development Services",
      "Web Design Services",
      "Android App Development Services",
    ],
  },
  {
    label: "Get it producing enquiries",
    wash: "wash-violet",
    titles: ["SEO Services", "PPC Services", "Social Media Marketing Services", "Website Maintenance Services"],
  },
  {
    label: "Build what isn't a website",
    wash: "wash-cyan",
    titles: [
      "AI Automation and AI Development Services",
      "Software Development Services",
      "API Integration Services",
      "Cloud Solutions",
    ],
  },
]

export default function ServicesSection() {
  const services = [
    {
      title: "Website Development Services",
      description: "Build fast, scalable, and conversion-focused websites using modern frameworks, clean architecture, and SEO-ready structure.",
      Icon: Code2,
    },
    {
      title: "E-commerce Web Development Services",
      description: "Launch secure online stores with product catalogs, payment gateway integration, checkout optimization, and order management flows.",
      Icon: ShoppingCart,
    },
    {
      title: "Android App Development Services",
      description: "Android apps that run well on the mid-range phones your customers actually use, with push notifications and a back end you own.",
      Icon: Smartphone,
    },
    {
      title: "Web Design Services",
      description: "Layouts built around the one thing a visitor came to do, and tested on real phones rather than a resized browser.",
      Icon: PenTool,
    },
    {
      title: "AI Automation and AI Development Services",
      description: "Take repetitive jobs off your team — sorting enquiries, writing product descriptions, building reports — where it saves real hours.",
      Icon: Bot,
    },
    {
      title: "SEO Services",
      description: "Improve your organic visibility with technical SEO, keyword strategy, on-page optimization, and content performance tracking.",
      Icon: Search,
    },
    {
      title: "PPC Services",
      description: "Run high-intent paid campaigns across Google and social platforms with ad optimization, budget control, and ROI-focused reporting.",
      Icon: MousePointerClick,
    },
    {
      title: "Social Media Marketing Services",
      description: "Content and campaigns on the platforms your buyers already use, reported against enquiries and sales rather than likes.",
      Icon: Share2,
    },
    {
      title: "Website Maintenance Services",
      description: "Keep your website secure and reliable with regular updates, uptime monitoring, bug fixes, backups, and performance checks.",
      Icon: Wrench,
    },
    {
      title: "Software Development Services",
      description: "Internal tools, dashboards and CRMs built around how your team already works, from a written scope to deployment.",
      Icon: AppWindow,
    },
    {
      title: "API Integration Services",
      description: "Connect third-party tools, CRMs, payment systems, and internal platforms through reliable API integrations and secure data flows.",
      Icon: Plug,
    },
    {
      title: "Cloud Solutions",
      description: "Hosting and infrastructure that stays up when traffic spikes, set up in a cloud account in your name.",
      Icon: Cloud,
    },
  ]


  return (
    <m.section
      id="services"
      className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <m.div className="mb-5" variants={itemVariants}>
              <BadgeSubtitle>Services</BadgeSubtitle>
            </m.div>
            <m.h2 className="display text-4xl sm:text-5xl lg:text-6xl" variants={itemVariants}>
              What We <span className="text-gradient whitespace-nowrap">Do for You</span>
            </m.h2>
          </div>
          <m.p className="text-base leading-relaxed text-ink-soft sm:text-lg" variants={itemVariants}>
            Most projects start as one of three jobs: build a site, get an existing one producing
            enquiries, or build something that is not a website at all. Every service below is quoted
            in writing after a short conversation, with one fixed price and one delivery window.
          </m.p>
        </div>

        {/* Three pillars, matching the three jobs the paragraph above names.
            All twelve services still render as real <Link>s with their own
            h3 — this is the homepage's internal-link signal for every service
            page — and the pillar names are labels, not headings, so the page
            outline is unchanged. */}
        <div className="grid gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <m.div key={pillar.label} variants={itemVariants} className="svc-pillar glass flex flex-col rounded-[36px] p-3">
              <div className={`${pillar.wash} svc-wash relative flex min-h-36 flex-col justify-between overflow-hidden rounded-[28px] p-6`}>
                <span className="text-sm font-medium text-white/85">0{index + 1}</span>
                <p className="text-2xl font-normal leading-tight tracking-tight text-white">{pillar.label}</p>
              </div>
              <ul className="svc-list flex-1 divide-y divide-ink/10 px-3 pt-2">
                {pillar.titles.map((title) => {
                  const service = services.find((item) => item.title === title)
                  if (!service) return null
                  const href = serviceRoutes[service.title] ?? "#"
                  return (
                    <li key={service.title}>
                      <Link href={href} prefetch={false} className="svc-row group flex gap-4 py-5">
                        <span className="svc-icon icon-badge h-10 w-10">
                          <service.Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <h3 className="flex items-start justify-between gap-3 text-base font-medium leading-snug tracking-tight text-ink">
                            <span className="svc-title">{service.title}</span>
                            <ArrowUpRight className="svc-arrow mt-0.5 h-4 w-4 shrink-0 text-ink-mute" aria-hidden="true" />
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{service.description}</p>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </m.div>
          ))}
        </div>

        {/* View all services */}
        <m.div className="mt-10" variants={itemVariants}>
          <Link href="/services/" prefetch={false} className="btn btn-ink">
            View all services
          </Link>
          {/* The Lucknow landing page owns the "website development company in
              Lucknow" query; the homepage links to it rather than competing
              for it. (Moved here from the hero, text and link unchanged.) */}
          <p className="mt-6 text-base text-ink-mute">
            Based in Lucknow? See our{" "}
            <Link
              href="/website-development-company-in-lucknow/"
              prefetch={false}
              className="font-medium text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
            >
              website development company in Lucknow
            </Link>{" "}
            page.
          </p>
        </m.div>
      </div>
    </m.section>
  )
}
