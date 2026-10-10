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
      className="ambient-pink px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
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
              What We <span className="mark-lime whitespace-nowrap">Do for You</span>
            </m.h2>
          </div>
          <m.p className="text-base leading-relaxed text-ink-soft sm:text-lg" variants={itemVariants}>
            Most projects start as one of three jobs: build a site, get an existing one producing
            enquiries, or build something that is not a website at all. Every service below is quoted
            in writing after a short conversation, with one fixed price and one delivery window.
          </m.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {/* All twelve render: each card is a real <Link>, so this is the
              homepage's internal-link signal for every service page. Slicing to
              six left half of them with no link from the site's strongest page. */}
          {services.map((service) => {
            const href = serviceRoutes[service.title] ?? "#"

            return (
              <m.div key={service.title} variants={itemVariants} className="h-full">
                <Link
                  href={href}
                  prefetch={false}
                  className="glass group flex h-full flex-col rounded-[28px] p-6 transition hover:-translate-y-1 hover:bg-white"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-lime">
                      <service.Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-ink transition group-hover:bg-lime">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-medium leading-snug tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{service.description}</p>
                </Link>
              </m.div>
            )
          })}
        </div>

        {/* View all services */}
        <m.div className="mt-10" variants={itemVariants}>
          <Link href="/services/" prefetch={false} className="btn btn-ink">
            View all services
          </Link>
        </m.div>
      </div>
    </m.section>
  )
}
