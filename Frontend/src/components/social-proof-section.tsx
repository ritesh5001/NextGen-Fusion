"use client"

import { motion } from "framer-motion"
import { staticProjects } from "@/lib/static-projects"
import { deliveredProjects } from "@/lib/delivered-projects"

// TODO: Replace placeholder logos/stats with real client logos and verified numbers.
const clientNames = staticProjects.slice(0, 6).map((p) => p.title)

const stats = [
  { metric: `${deliveredProjects.length}+`, label: "Projects delivered" },
  { metric: "3,226+", label: "Vendors powered" }, // TODO: confirm aggregate
  { metric: "0", label: "Clients ghosted" },
  { metric: "100%", label: "Mobile-optimized builds" },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function SocialProofSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-center text-sm font-medium uppercase tracking-wider text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by growing brands and businesses
        </motion.p>

        {/* Client logo bar (placeholder name chips until real logos are supplied) */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          {clientNames.map((name) => (
            <motion.span
              key={name}
              variants={item}
              className="text-lg sm:text-xl font-semibold text-gray-300 grayscale transition-colors hover:text-gray-500"
            >
              {name}
            </motion.span>
          ))}
        </motion.div>

        {/* Hard numbers */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={item} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                {stat.metric}
              </div>
              <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
