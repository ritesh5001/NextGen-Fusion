"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Globe,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

import BadgeSubtitle from "@/components/badge-subtitle"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"

const painPoints = [
  "Outdated websites that look untrustworthy and reduce conversion rates.",
  "Slow loading pages that hurt user experience and SEO rankings.",
  "No clear conversion flow, so traffic comes in but leads do not convert.",
  "Hard-to-manage codebase that makes updates expensive and risky.",
  "Website and backend tools not integrated, causing manual operations.",
]

const features = [
  {
    title: "Conversion-First UX Architecture",
    description:
      "Information flow and page structure designed to turn visitors into qualified leads.",
  },
  {
    title: "Performance Optimization",
    description:
      "Core Web Vitals focused implementation for faster load, better retention, and stronger rankings.",
  },
  {
    title: "SEO-Ready Technical Foundation",
    description:
      "Clean semantic markup, metadata strategy, schema support, and crawl-friendly structure.",
  },
  {
    title: "Scalable Engineering",
    description:
      "Modular architecture that supports growth, feature expansion, and long-term maintainability.",
  },
  {
    title: "Security & Reliability",
    description:
      "Best-practice security headers, safe auth handling, and stable deployment workflows.",
  },
  {
    title: "Analytics & Tracking Setup",
    description:
      "Event tracking and funnel visibility to measure outcomes and optimize ROI continuously.",
  },
]

const processSteps = [
  {
    title: "Discovery & Strategy",
    description:
      "We audit your business goals, audience behavior, and competitors to define winning web strategy.",
  },
  {
    title: "UX Wireframes & Content Mapping",
    description:
      "We create page flow, conversion touchpoints, and structured content hierarchy before UI design.",
  },
  {
    title: "UI Design & Prototype",
    description:
      "High-fidelity interface design aligned with your brand, optimized for clarity and trust.",
  },
  {
    title: "Development & Integrations",
    description:
      "Frontend and backend implementation with CRM, API, and third-party integrations as required.",
  },
  {
    title: "QA, Speed & SEO Validation",
    description:
      "Cross-device testing, performance checks, and technical SEO verification before launch.",
  },
  {
    title: "Launch & Growth Iteration",
    description:
      "We deploy, monitor, and optimize based on real user data and conversion performance.",
  },
]

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "REST APIs",
  "Cloudflare CDN",
  "Vercel",
  "Google Analytics 4",
  "Google Search Console",
  "Meta Pixel",
]

const faqs = [
  {
    question: "How long does a Website Development Services project take?",
    answer:
      "Typical delivery ranges from 3 to 8 weeks depending on scope, integrations, and content readiness.",
  },
  {
    question: "Do you provide SEO with Website Development Services?",
    answer:
      "Yes. Every project includes technical SEO foundations and can be extended with ongoing SEO growth support.",
  },
  {
    question: "Can you redesign our current website without losing rankings?",
    answer:
      "Absolutely. We handle migration planning, redirects, metadata continuity, and performance-safe rollout.",
  },
  {
    question: "Will the website be easy for our team to update?",
    answer:
      "Yes. We build maintainable structures and provide admin-friendly workflows for content and updates.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Yes, we provide Website Maintenance Services including monitoring, updates, security patches, and enhancements.",
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function WebsiteDevelopmentServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <IntegratedNavbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-[#f8faff] via-white to-[#f4f7ff] p-8 sm:p-12 lg:p-16"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8A38F5]/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#13CBD4]/10 blur-3xl" />

            <div className="relative z-10 max-w-4xl">
              <BadgeSubtitle>Website Development Services</BadgeSubtitle>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Website Development Services Built for Growth,
                <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent"> Performance, and Conversions</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl">
                We build high-performance, SEO-optimized websites that help businesses generate better leads,
                increase trust, and convert more traffic into measurable revenue.
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

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-gray-100 p-8 bg-white shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B35AB]/10 text-[#2B35AB]">
                  <Globe className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">About Website Development Services</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Our Website Development Services combine strategy, design, engineering, and optimization to build digital
                  experiences that are not just beautiful but profitable. We focus on business outcomes, not vanity metrics.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 p-8 bg-white shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#13CBD4]/10 text-[#0d9ea5]">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Who It Is For</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Startups, SMBs, and scaling brands who need a modern website that drives lead generation, supports sales,
                  and reflects premium brand positioning.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Problems We Solve</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Common Pain Points in Website Development Services</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {painPoints.map((point) => (
                <div key={point} className="rounded-xl border border-red-100 bg-red-50/40 p-5 flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-red-500 mt-0.5" />
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Our Solution</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">How We Deliver Better Website Development Services</h2>
            <div className="mt-8 rounded-2xl border border-gray-100 p-8 bg-gradient-to-br from-white to-gray-50">
              <p className="text-gray-700 leading-relaxed text-lg">
                We use a conversion-led framework: strategic discovery, UX planning, technical implementation, and post-launch
                optimization. This ensures your website performs as a business asset, not just a digital brochure.
              </p>
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Key Features</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">What’s Included in Our Website Development Services</h2>
            <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {features.map((feature) => (
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

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Our Process</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Step-by-Step Website Development Workflow</h2>
            <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {processSteps.map((step, index) => (
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

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Benefits & ROI</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Business Outcomes You Can Expect</h2>
            <div className="mt-8 grid lg:grid-cols-4 gap-5">
              {[
                { icon: TrendingUp, title: "Higher Conversion Rates", text: "Optimized funnels and trust signals improve lead-to-customer conversion." },
                { icon: Search, title: "Better Organic Visibility", text: "Technical SEO foundations support stronger long-term search performance." },
                { icon: Clock3, title: "Faster Time-to-Launch", text: "Structured process and clear milestones reduce delivery delays." },
                { icon: BarChart3, title: "Measurable ROI", text: "Tracking setup helps you attribute growth to specific pages and campaigns." },
              ].map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                  <benefit.icon className="h-5 w-5 text-[#2B35AB]" />
                  <h3 className="mt-3 font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{benefit.text}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Technologies Used</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Modern Tech Stack Behind Our Website Development Services</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Portfolio Preview</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Recent Website Development Use Cases</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Tatvivah",
                  niche: "Premium Ethnic Wear E-commerce",
                  summary: "Built a premium storefront experience with category-first navigation, trust-focused product pages, and conversion-oriented checkout flow.",
                },
                {
                  name: "MariBiz",
                  niche: "Global Marine Marketplace",
                  summary: "Designed and engineered a lead-focused platform with structured RFQ intake, supplier trust framing, and scalable service discovery journeys.",
                },
              ].map((project) => (
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

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Testimonials</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">What Clients Say About Our Website Development Services</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: "Their Website Development Services gave us a premium web presence and a clear increase in qualified leads.",
                  author: "Founder, D2C Fashion Brand",
                },
                {
                  quote: "Fast delivery, clean execution, and great communication. The new site feels built for growth.",
                  author: "Director, Marine Services Firm",
                },
                {
                  quote: "They understood both design and conversion. The website now performs as a real sales asset.",
                  author: "Marketing Head, B2B Company",
                },
              ].map((testimonial) => (
                <div key={testimonial.author} className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                  <Sparkles className="h-5 w-5 text-[#8A38F5]" />
                  <p className="mt-4 text-gray-700 leading-relaxed">“{testimonial.quote}”</p>
                  <p className="mt-4 text-sm font-semibold text-gray-900">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>FAQ</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Website Development Services FAQs</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-gray-100 p-6 bg-white">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="rounded-3xl border border-gray-100 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 text-white"
          >
            <div className="max-w-3xl">
              <BadgeSubtitle className="text-white/90 border-white/30">Final CTA</BadgeSubtitle>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
                Ready to Scale with High-Impact Website Development Services?
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                Let’s build a website that helps your business rank higher, convert better, and grow faster.
              </p>
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
                  Explore Our Work
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
