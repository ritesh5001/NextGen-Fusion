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
  TrendingUp,
  Users,
} from "lucide-react"

import BadgeSubtitle from "@/components/badge-subtitle"

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
      "Three to five weeks for a structured brochure site and six to ten for something with commerce or custom logic, measured from content sign-off rather than from the contract date. The variable is almost never the code — it is how quickly copy and photography arrive.",
  },
  {
    question: "What does a website cost?",
    answer:
      "A template build on WordPress or Shopify sits at the bottom of our range; a custom-coded build is an order of magnitude higher because it is a different product. We publish the bands rather than holding them for a call — what moves a project within its band is the number of custom features, the number of integrations, and how ready your content is.",
  },
  {
    question: "Who owns the code, the domain and the hosting?",
    answer:
      "You do, from day one. Domain, hosting, repository, analytics and payment gateway are all registered in your name and we work inside your accounts. Nothing has to be handed over if you leave, because none of it was ever ours.",
  },
  {
    question: "Do you provide SEO with Website Development Services?",
    answer:
      "Technical SEO foundations are part of every build rather than an upsell: titles, descriptions, heading structure, internal links, schema, a sitemap, and Search Console and analytics connected and verified before launch. Ongoing SEO growth work is a separate engagement.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Review rounds at agreed milestones, and we keep iterating until the result matches the signed scope. What is charged extra is new scope — a page or feature that was not in the agreement — and we tell you that before doing the work, not in the final invoice.",
  },
  {
    question: "Can you redesign our current website without losing rankings?",
    answer:
      "Yes. Migration planning, redirect mapping, metadata continuity and a performance-safe rollout. A redesign that loses rankings is almost always a redirect problem rather than a design one, and it is the step most rebuilds skip.",
  },
  {
    question: "What happens after launch, and what does it cost?",
    answer:
      "Every build comes with a defined support arrangement rather than a handshake — updates, uptime monitoring, backups and a named developer to call. It is billed separately from the build as a recurring plan; the figures are on the pricing page.",
  },
  {
    question: "What are the payment terms?",
    answer:
      "50% advance to start and 50% at payment-gateway integration, the same on every project regardless of size. There is no separate design fee, no per-revision charge inside the agreed scope, and no charge for the pre-launch performance, analytics and Search Console checks.",
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// This page renders its own layout rather than ServicePageTemplate, which is why
// it was the only one of the twelve shipping visible FAQs with no FAQPage markup
// behind them — and it is the most commercially important page on the site.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

export default function WebsiteDevelopmentServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
                  href="/work"
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
            <div className="mt-8 grid md:grid-cols-2 gap-6 lg:grid-cols-3">
              {[
                {
                  slug: "tatvivahtrends",
                  name: "TatVivah Trends",
                  niche: "Multi-vendor wedding ethnic wear",
                  summary: "A three-thousand-product marketplace with occasion-based filtering, Razorpay checkout, gift cards and a returns and trust system — built so multiple vendors could sell into one storefront without the catalogue becoming unusable on a phone.",
                },
                {
                  slug: "maribiz-ai",
                  name: "MariBiz.ai",
                  niche: "B2B maritime marketplace",
                  summary: "An RFQ engine, vendor verification, port-based service discovery and quote comparison for ship operators sourcing everything from spare parts to hull cleaning. The kind of model where a platform gets in the way and custom is the honest answer.",
                },
                {
                  slug: "hcbengineering",
                  name: "HCB Engineering",
                  niche: "Engineering and contracting",
                  summary: "A government-licensed electrical contractor with twenty years behind it and no site to match. Service pages per vertical so prospects self-qualify, with licences and certifications placed where a procurement officer looks first.",
                },
              ].map((project) => (
                <div key={project.name} className="rounded-2xl border border-gray-100 p-7 bg-white shadow-sm">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#2B35AB]/10 px-3 py-1 text-xs font-semibold text-[#2B35AB]">
                    <Rocket className="h-3.5 w-3.5" />
                    Case Preview
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-gray-900">
                    <Link href={`/work/${project.slug}/`} className="inline-block py-1 hover:underline">
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-500">{project.niche}</p>
                  <p className="mt-4 text-gray-600 leading-relaxed">{project.summary}</p>
                  <Link
                    href={`/work/${project.slug}/`}
                    className="mt-4 inline-block py-1 text-sm font-semibold text-[#2B35AB] hover:underline"
                  >
                    Read the {project.name} case study
                  </Link>
                </div>
              ))}
            </div>
          </motion.section>

          {/* In practice */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>In practice</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
              How a build actually runs
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-gray-600 leading-relaxed">
                It starts with a written scope, not a meeting. Send us what the business does, who
                buys from it and what the site has to achieve, and you get back a page describing
                what we would build, what it would cost and how long it would take. If the number
                does not work, you have spent one email finding that out instead of three calls.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From there the sequence is fixed: structure and content plan, design of the
                templates that matter, build, content load, then a pre-launch pass covering
                performance, mobile layout, analytics and Search Console. That last step is the one
                most rebuilds skip, and it is why so many of the sites we are asked to rescue lost
                their rankings on the day they launched.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Choosing the platform is the most expensive decision in the project and it is made
                in week one. Next.js where the site needs speed, custom logic or a large content
                structure. WordPress where a non-technical team has to publish daily and the site is
                content-led. Shopify where the priority is merchandising and payments rather than
                bespoke behaviour. We tell you which one your project is, with the reasoning, before
                you commit — getting this wrong is recoverable only by starting again.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Then the part nobody sells: what happens in month four. Every build ships with a
                defined support arrangement rather than a handshake, and the developer who wrote the
                code is the one who answers. An agency that has not thought about month four is
                telling you exactly what month four will look like.
              </p>
            </div>
          </motion.section>

          {/* Pricing */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Pricing</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">What a website costs</h2>
            <div className="mt-6 space-y-4">
              <p className="text-gray-600 leading-relaxed">
                A template build on WordPress or Shopify sits at the bottom of our range — you are
                paying for setup, configuration and content rather than engineering, and for plenty
                of businesses that is genuinely the right purchase. A custom-coded build starts an
                order of magnitude higher because it is a different product, and you should not buy
                it until the template version is provably the constraint.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What moves a project within its band is the number of custom features, the number of
                systems that have to talk to each other, and how ready your content is. A build
                where copy and photography arrive on day one is meaningfully cheaper than one still
                waiting on them in week six.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Terms are the same on every project regardless of size: 50% advance to start, 50% at
                payment-gateway integration. No separate design fee, no per-revision charge inside
                the agreed scope, and no charge for the pre-launch performance, analytics and Search
                Console checks.
              </p>
            </div>
            <Link
              href="/pricing/"
              className="mt-6 inline-block rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900"
            >
              See the full price bands
            </Link>
          </motion.section>

          {/* Industries */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Industries</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Industries we build for</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              The common thread is not a sector, it is a situation: the site has a commercial job to
              do, and somebody owns whether it does it. These are the ones we see most.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "D2C and ecommerce brands",
                "Manufacturers and industrial suppliers",
                "Engineering and contracting firms",
                "Professional and B2B services",
                "Marketplaces and B2B platforms",
                "Institutes and education",
                "Clinics and healthcare practices",
                "Hospitality and food",
                "Renewable energy and infrastructure",
              ].map((industry) => (
                <li key={industry} className="rounded-xl border border-gray-100 bg-white px-5 py-4 text-gray-700 shadow-sm">
                  {industry}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* City pages */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <BadgeSubtitle>Where we work</BadgeSubtitle>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
              Looking for website development in your city?
            </h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                { slug: "website-development-company-in-lucknow", label: "Website development company in Lucknow" },
                { slug: "website-development-company-in-mumbai", label: "Website development company in Mumbai" },
                { slug: "ecommerce-development-company-in-lucknow", label: "Ecommerce development company in Lucknow" },
                { slug: "seo-services-in-lucknow", label: "SEO services in Lucknow" },
              ].map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/${location.slug}/`}
                    className="block rounded-xl border border-gray-200 px-5 py-4 font-medium text-gray-900 transition-colors hover:border-gray-900"
                  >
                    {location.label}
                  </Link>
                </li>
              ))}
            </ul>
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
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Explore Our Work
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

    </div>
  )
}
