"use client"

import { motion } from "framer-motion"
import BadgeSubtitle from "./badge-subtitle"

const steps = [
  {
    number: "1",
    title: "Free call & scope",
    description:
      "We learn your business, goals, and budget, then map a clear scope and a fixed quote — no jargon, no surprises.",
  },
  {
    number: "2",
    title: "Design & build",
    description:
      "We design and develop your site with review rounds at each milestone, so you approve as we go and stay in control.",
  },
  {
    number: "3",
    title: "Launch & grow",
    description:
      "We launch fast, then keep improving — performance, SEO, and conversions. We don't ghost you after launch.",
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

export default function ProcessSection() {
  return (
    <section className="bg-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.div variants={item} className="mb-4">
            <BadgeSubtitle>How we work</BadgeSubtitle>
          </motion.div>
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            From idea to launch in{" "}
            <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
              three simple steps
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={item}
              className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2B35AB] to-[#8A38F5] text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
