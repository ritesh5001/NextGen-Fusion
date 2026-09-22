"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { staticProjects } from "@/lib/static-projects"

// TODO: Replace placeholder name chips with real client logos.
const clients = staticProjects.slice(0, 6).map((p) => ({ name: p.title, href: `/work/${p.slug}/` }))

// 3,226+ is one client's number (MariBiz.ai), not a total across clients, so it
// is labelled and linked as such.
const stats: { metric: string; label: string; href?: string }[] = [
  { metric: "3,226+", label: "Vendors on MariBiz.ai, a marketplace we built", href: "/work/maribiz-ai/" },
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
          {clients.map((client) => (
            <motion.span key={client.href} variants={item}>
              <Link
                href={client.href}
                prefetch={false}
                className="text-lg sm:text-xl font-semibold text-gray-300 grayscale transition-colors hover:text-gray-500"
              >
                {client.name}
              </Link>
            </motion.span>
          ))}
        </motion.div>

        {/* Hard numbers */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
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
              <div className="mt-2 text-sm text-gray-500">
                {stat.href ? (
                  <Link href={stat.href} prefetch={false} className="underline-offset-4 hover:text-gray-900 hover:underline">
                    {stat.label}
                  </Link>
                ) : (
                  stat.label
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
