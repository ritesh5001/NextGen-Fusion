"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import BadgeSubtitle from "./badge-subtitle"

// TODO: Replace with real client testimonials (name, company, photo, verified result).
type Testimonial = {
  quote: string
  name: string
  company: string
  result: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "They rebuilt our store and the difference was immediate — checkout finally works and enquiries went up within weeks.",
    name: "Placeholder Name",
    company: "D2C Brand",
    result: "+40% enquiries",
    initials: "PN",
  },
  {
    quote:
      "What stood out was the follow-through. Most agencies vanish after launch — these guys actually kept improving the site.",
    name: "Placeholder Name",
    company: "Marketplace",
    result: "3,226+ vendors onboarded",
    initials: "PN",
  },
  {
    quote:
      "Fast, clear, and no hand-holding required from us. The new site looks premium and converts far better than the old one.",
    name: "Placeholder Name",
    company: "Ecommerce Startup",
    result: "Launched in 3 weeks",
    initials: "PN",
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.div variants={item} className="mb-4">
            <BadgeSubtitle>Testimonials</BadgeSubtitle>
          </motion.div>
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            Results our clients{" "}
            <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
              actually talk about
            </span>
          </motion.h2>
          <motion.div variants={item} className="mt-4 flex items-center justify-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            {/* TODO: replace with real aggregate rating */}
            <span className="ml-2 text-sm text-gray-500">5.0 average from happy clients</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                {t.result}
              </span>
              <p className="mt-4 flex-1 text-gray-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2B35AB] to-[#8A38F5] text-sm font-semibold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
