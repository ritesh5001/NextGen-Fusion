"use client"

import { m } from "framer-motion"
import Image from "next/image"
import { Check, X } from "lucide-react"
import Link from "next/link"
import BadgeSubtitle from "./badge-subtitle"
import { OFFICE_HOURS } from "@/data/offices"
import { priceTier } from "@/lib/estimator-pricing"

// Every claim in the table points at something a visitor can check. No prices
// are shown anywhere on the site; they are shared in conversation.
const launch = priceTier("launch")

type ComparisonRow = {
  category: string
  livingTech: string
  others: string
  links: { label: string; href: string }[]
}

const comparisonData: ComparisonRow[] = [
  {
    category: "Quotes",
    livingTech: `One fixed written quote after a short chat, within ${OFFICE_HOURS.replyWithin}. No hidden costs.`,
    others: "Open-ended estimates that grow as the project does.",
    links: [{ label: "Get a written quote", href: "/contact/" }],
  },
  {
    category: "Speed",
    livingTech: `Business sites in ${launch.weeksMin}–${launch.weeksMax} weeks from content sign-off; larger builds get one delivery window in the quote.`,
    others: "Slower delivery, often months with unclear timelines.",
    links: [{ label: "Delivered projects", href: "/work/" }],
  },
  {
    category: "Proof",
    livingTech: "Our work is published as case studies you can open — from D2C stores to a B2B marketplace with 3,226+ vendors.",
    others: "Portfolio screenshots with no detail on what was built.",
    links: [
      { label: "DeeToo store", href: "/work/deetoo/" },
      { label: "MariBiz.ai platform", href: "/work/maribiz-ai/" },
    ],
  },
  {
    category: "Post-Launch Support",
    livingTech: `A support plan quoted upfront with every project. Requests handled ${OFFICE_HOURS.label}; uptime checked around the clock.`,
    others: "Limited support, focus on new projects",
    links: [{ label: "Ask about support", href: "/contact/" }],
  },
]

function RowLinks({ links, className }: { links: ComparisonRow["links"]; className: string }) {
  return (
    <span className={`mt-2 flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          prefetch={false}
          className="ulink ulink-static font-medium text-ink"
        >
          {link.label} →
        </Link>
      ))}
    </span>
  )
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const tableVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

const rowVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    x: 5,
    transition: {
      duration: 0.2
    }
  }
}

// Create motion-enabled table row to avoid undefined motion.tr in some builds
const MotionTr = m.tr

export default function ComparisonSection() {
  return (
    <m.section 
      className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <m.div 
          className="mb-12"
          variants={itemVariants}
        >
          <m.div 
            className="mb-5 text-left"
            variants={textVariants}
          >
            <BadgeSubtitle>Advantages</BadgeSubtitle>
          </m.div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <m.div 
              className="text-left"
              variants={textVariants}
            >
              <m.h2 className="display text-4xl sm:text-5xl lg:text-6xl" variants={textVariants}>
                Why <span className="text-gradient">Partner</span> with Us?
              </m.h2>
            </m.div>
            <m.div 
              className="flex items-center"
              variants={textVariants}
            >
              <p className="text-ink-soft text-base sm:text-lg leading-relaxed">
                Four claims, each linked to something you can check: how we quote, our timelines, the
                case studies and support after launch. Check any of them before you call us.
              </p>
            </m.div>
          </div>
        </m.div>

        {/* Desktop Table - Hidden on Mobile */}
        <m.div 
          className="glass hidden sm:block overflow-hidden rounded-[32px] p-2"
          variants={tableVariants}
        >
          <table className="w-full">
            {/* Header Row */}
            <thead>
              <MotionTr
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <th className="p-6 text-left text-sm font-medium text-ink-mute">
                  Comparison
                </th>
                <th className="rounded-t-[24px] bg-gradient-to-br from-brand to-violet p-6 text-left">
                  <div className="flex items-center gap-3">
                    <m.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image 
                        src="/images/site-logo.png" 
                        alt="" 
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                    </m.div>
                    <span className="font-medium text-white">NextGen Fusion</span>
                  </div>
                </th>
                <th className="p-6 text-left text-sm font-medium text-ink-mute">Other Agencies</th>
              </MotionTr>
            </thead>

            {/* Body Rows */}
            <tbody>
              {comparisonData.map((item, index) => (
                <MotionTr 
                  key={item.category} 
                  className="border-t border-ink/5"
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                >
                  <td className="p-6 font-medium text-ink">{item.category}</td>
                  <td className={`bg-brand/[0.07] p-6 ${index === comparisonData.length - 1 ? "rounded-b-[24px]" : ""}`}>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full icon-badge">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm leading-relaxed text-ink">{item.livingTech}</p>
                        <RowLinks links={item.links} className="text-sm" />
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-canvas-deep text-ink-mute">
                        <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <p className="text-sm leading-relaxed text-ink-mute">{item.others}</p>
                    </div>
                  </td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </m.div>

        {/* Mobile Table */}
        <m.div 
          className="glass sm:hidden overflow-hidden rounded-[28px] p-1.5"
          variants={tableVariants}
        >
          <table className="w-full">
            {/* Header Row */}
            <thead>
              <MotionTr
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <th className="p-3 text-left text-xs font-medium text-ink-mute">
                  Comparison
                </th>
                <th className="rounded-t-[20px] bg-gradient-to-br from-brand to-violet p-3 text-left">
                  <div className="flex items-center gap-2">
                    <m.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image 
                        src="/images/site-logo.png" 
                        alt="" 
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    </m.div>
                    <span className="font-medium text-white text-sm">NextGen Fusion</span>
                  </div>
                </th>
                <th className="p-3 text-left text-xs font-medium text-ink-mute">Other Agencies</th>
              </MotionTr>
            </thead>

            {/* Body Rows */}
            <tbody>
              {comparisonData.map((item, index) => (
                <MotionTr 
                  key={item.category} 
                  className="border-t border-ink/5"
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                >
                  <td className="p-3 align-top font-medium text-ink text-sm">{item.category}</td>
                  <td className={`bg-brand/[0.07] p-3 align-top ${index === comparisonData.length - 1 ? "rounded-b-[20px]" : ""}`}>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full icon-badge">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs leading-relaxed text-ink">{item.livingTech}</p>
                        <RowLinks links={item.links} className="text-xs" />
                      </div>
                    </div>
                  </td>
                  <td className="p-3 align-top">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-canvas-deep text-ink-mute">
                        <X className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <p className="text-xs leading-relaxed text-ink-mute">{item.others}</p>
                    </div>
                  </td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </m.div>
      </div>
    </m.section>
  )
}
