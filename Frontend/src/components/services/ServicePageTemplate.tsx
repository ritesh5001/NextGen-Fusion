"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Bot,
  Cloud,
  Code2,
  Megaphone,
  MonitorSmartphone,
  Plug,
  Search,
  Settings,
  ShoppingCart,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react"

import BadgeSubtitle from "@/components/badge-subtitle"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"

export interface ServiceBenefit {
  icon: ServiceIconName
  title: string
  text: string
}

export interface ServiceCaseStudy {
  name: string
  niche: string
  summary: string
}

export interface ServiceTestimonial {
  quote: string
  author: string
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServicePageData {
  badge: string
  heroTitle: string
  heroTitleHighlight: string
  heroDescription: string
  aboutIcon: ServiceIconName
  aboutDescription: string
  whoForDescription: string
  painPointsHeading: string
  painPoints: string[]
  solutionDescription: string
  featuresHeading: string
  features: { title: string; description: string }[]
  processHeading: string
  processSteps: { title: string; description: string }[]
  benefits: ServiceBenefit[]
  technologies: string[]
  caseStudies: ServiceCaseStudy[]
  testimonials: ServiceTestimonial[]
  faqs: ServiceFaq[]
  ctaTitle: string
  ctaDescription: string
}

export type ServiceIconName = keyof typeof SERVICE_ICON_MAP

const SERVICE_ICON_MAP = {
  'bar-chart-3': BarChart3,
  bot: Bot,
  cloud: Cloud,
  'code-2': Code2,
  'check-circle-2': CheckCircle2,
  'clock-3': Clock3,
  megaphone: Megaphone,
  'monitor-smartphone': MonitorSmartphone,
  plug: Plug,
  rocket: Rocket,
  search: Search,
  settings: Settings,
  'shield-check': ShieldCheck,
  'shopping-cart': ShoppingCart,
  smartphone: Smartphone,
  sparkles: Sparkles,
  'trending-up': TrendingUp,
  zap: Zap,
} as const satisfies Record<string, LucideIcon>

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const AboutIcon = SERVICE_ICON_MAP[data.aboutIcon]

  return (
    <div className="min-h-screen bg-white">
      <IntegratedNavbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">

          {/* Hero */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-[#f8faff] via-white to-[#f4f7ff] p-8 sm:p-12 lg:p-16"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8A38F5]/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#13CBD4]/10 blur-3xl" />
            <div className="relative z-10 max-w-4xl">
              <BadgeSubtitle>{data.badge}</BadgeSubtitle>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                {data.heroTitle}
                <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                  {" "}{data.heroTitleHighlight}
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl">
                {data.heroDescription}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/#contact-section"
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  Get a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portofolio"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </motion.section>

          {/* About + Who it's for */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-gray-100 p-8 bg-white shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B35AB]/10 text-[#2B35AB]">
                  <AboutIcon className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">About {data.badge}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{data.aboutDescription}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 p-8 bg-white shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#13CBD4]/10 text-[#0d9ea5]">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Who It Is For</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">{data.whoForDescription}</p>
              </div>
            </div>
          </motion.section>

          {/* Pain Points */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Problems We Solve</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">{data.painPointsHeading}</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {data.painPoints.map((point) => (
                <div key={point} className="rounded-xl border border-red-100 bg-red-50/40 p-5 flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Solution */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Our Solution</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">How We Deliver Better {data.badge}</h2>
            <div className="mt-8 rounded-2xl border border-gray-100 p-8 bg-gradient-to-br from-white to-gray-50">
              <p className="text-gray-700 leading-relaxed text-lg">{data.solutionDescription}</p>
            </div>
          </motion.section>

          {/* Features */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Key Features</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">{data.featuresHeading}</h2>
            <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {data.features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#8A38F5]/10 text-[#8A38F5]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Process */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Our Process</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">{data.processHeading}</h2>
            <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {data.processSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-gray-100 p-6 bg-white">
                  <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-gray-900 px-2 text-xs font-semibold text-white">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Benefits */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Benefits & ROI</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Business Outcomes You Can Expect</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                  {(() => {
                    const BenefitIcon = SERVICE_ICON_MAP[benefit.icon]
                    return <BenefitIcon className="h-5 w-5 text-[#2B35AB]" />
                  })()}
                  <h3 className="mt-3 font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{benefit.text}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Technologies */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Technologies Used</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Tech Stack Behind Our {data.badge}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {data.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Case Studies */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Portfolio Preview</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Recent {data.badge} Use Cases</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {data.caseStudies.map((project) => (
                <div key={project.name} className="rounded-2xl border border-gray-100 p-7 bg-white shadow-sm">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#2B35AB]/10 px-3 py-1 text-xs font-semibold text-[#2B35AB]">
                    <Rocket className="h-3.5 w-3.5" />
                    Case Preview
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-gray-900">{project.name}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-500">{project.niche}</p>
                  <p className="mt-4 text-gray-600 leading-relaxed">{project.summary}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Testimonials</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">What Clients Say About Our {data.badge}</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {data.testimonials.map((testimonial) => (
                <div key={testimonial.author} className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                  <Sparkles className="h-5 w-5 text-[#8A38F5]" />
                  <p className="mt-4 text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-gray-900">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>FAQ</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">{data.badge} FAQs</h2>
            <div className="mt-8 space-y-4">
              {data.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-gray-100 p-6 bg-white">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="rounded-3xl border border-gray-100 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 text-white"
          >
            <div className="max-w-3xl">
              <BadgeSubtitle className="text-white/90 border-white/30">Ready to Start?</BadgeSubtitle>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">{data.ctaTitle}</h2>
              <p className="mt-4 text-white/80 leading-relaxed">{data.ctaDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#contact-section"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portofolio"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
