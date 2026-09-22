"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import BadgeSubtitle from "./badge-subtitle"
import { useMobileIcon } from "@/hooks/use-mobile-icon"
import { OFFICE_HOURS } from "@/data/offices"
import { computeSupport, formatINR, priceTier, rateCardForm } from "@/lib/estimator-pricing"

// Every claim in the table points at the page that proves it. The figures come
// from the rate card, so they cannot drift from /pricing/.
const launch = priceTier("launch")
const basicSupport = computeSupport(rateCardForm({ maintenance: "basic" }))

type ComparisonRow = {
  category: string
  livingTech: string
  others: string
  links: { label: string; href: string }[]
}

const comparisonData: ComparisonRow[] = [
  {
    category: "Pricing",
    livingTech: `Published rate card — sites from ${formatINR(launch.min)}, then one fixed written quote. No hidden costs.`,
    others: "Price only after a sales call, often with extras added later.",
    links: [
      { label: "Launch", href: "/pricing/#launch" },
      { label: "Store", href: "/pricing/#store" },
      { label: "Platform", href: "/pricing/#platform" },
    ],
  },
  {
    category: "Speed",
    livingTech: `Launch-tier sites in ${launch.weeksMin}–${launch.weeksMax} weeks from content sign-off; larger builds get one delivery window in the quote.`,
    others: "Slower delivery, often months with unclear timelines.",
    links: [{ label: "Timelines by tier", href: "/pricing/" }],
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
    livingTech: `Plans from ${basicSupport ? formatINR(basicSupport.amount) : ""} a year. Requests handled ${OFFICE_HOURS.label}; uptime checked around the clock.`,
    others: "Limited support, focus on new projects",
    links: [{ label: "Support plans", href: "/pricing/#support" }],
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
          className="font-medium text-purple-600 underline-offset-4 hover:underline"
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

const iconVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -10
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3
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
const MotionTr = motion.create("tr")

export default function ComparisonSection() {
  const { getIconSrc } = useMobileIcon()
  
  return (
    <motion.section 
      className="bg-white pt-40 pb-24 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="mb-4 text-left"
            variants={textVariants}
          >
            <BadgeSubtitle>Advantages</BadgeSubtitle>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <motion.div 
              className="text-left"
              variants={textVariants}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-none"
                variants={textVariants}
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span>Why</span>{" "}
                  <motion.div 
                    className="relative inline-block"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Image
                      src={getIconSrc("/images/Handsake.svg", "/images/handshake.png")}
                      alt=""
                      width={56}
                      height={56}
                      className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                    />
                  </motion.div>
                  <span 
                    className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent" 
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #2B35AB 0%, #8A38F5 46%, #13CBD4 90%)'
                    }}
                  >
                    Partner
                  </span>
                </div>
                {" "}
                <div>with Us?</div>
              </motion.h2>
            </motion.div>
            <motion.div 
              className="flex items-center"
              variants={textVariants}
            >
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Four claims, each linked to the page that backs it up: the published rate card, the
                timelines, the case studies and the support plans. Check any of them before you call us.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop Table - Hidden on Mobile */}
        <motion.div 
          className="hidden sm:block overflow-hidden rounded-2xl border border-gray-200"
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
                <th className="bg-white p-6 text-left font-semibold text-gray-900 border-r border-gray-200">
                  Comparison
                </th>
                <th className="bg-white p-6 text-left border-r border-gray-200">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image 
                        src="/images/site-logo.png" 
                        alt="NextGen Fusion" 
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </motion.div>
                    <span className="font-semibold text-black">NextGen Fusion</span>
                  </div>
                </th>
                <th className="bg-white p-6 text-left font-semibold text-gray-900">Other Agencies</th>
              </MotionTr>
            </thead>

            {/* Body Rows */}
            <tbody>
              {comparisonData.map((item, index) => (
                <MotionTr 
                  key={item.category} 
                  className="border-t border-gray-200"
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                >
                  <td className="bg-white p-6 font-medium text-gray-900 border-r border-gray-200">{item.category}</td>
                  <td className="bg-gray-50 p-6 border-r border-gray-200">
                    <div className="flex items-start gap-3">
                      <motion.div 
                        className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </motion.div>
                      <div>
                        <p className="text-sm text-gray-700">{item.livingTech}</p>
                        <RowLinks links={item.links} className="text-sm" />
                      </div>
                    </div>
                  </td>
                  <td className="bg-white p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0 mt-1"></div>
                      <p className="text-sm text-gray-600">{item.others}</p>
                    </div>
                  </td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Table */}
        <motion.div 
          className="sm:hidden overflow-hidden rounded-2xl border border-gray-200"
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
                <th className="bg-white p-4 text-left font-semibold text-gray-900 border-r border-gray-200 text-sm">
                  Comparison
                </th>
                <th className="bg-white p-4 text-left border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image 
                        src="/images/site-logo.png" 
                        alt="NextGen Fusion" 
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </motion.div>
                    <span className="font-semibold text-black text-sm">NextGen Fusion</span>
                  </div>
                </th>
                <th className="bg-white p-4 text-left font-semibold text-gray-900 text-sm">Other Agencies</th>
              </MotionTr>
            </thead>

            {/* Body Rows */}
            <tbody>
              {comparisonData.map((item, index) => (
                <MotionTr 
                  key={item.category} 
                  className="border-t border-gray-200"
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                >
                  <td className="bg-white p-4 font-medium text-gray-900 border-r border-gray-200 text-sm">{item.category}</td>
                  <td className="bg-gray-50 p-4 border-r border-gray-200">
                    <div className="flex items-start gap-2">
                      <motion.div 
                        className="w-3 h-3 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </motion.div>
                      <div>
                        <p className="text-xs text-gray-700">{item.livingTech}</p>
                        <RowLinks links={item.links} className="text-xs" />
                      </div>
                    </div>
                  </td>
                  <td className="bg-white p-4">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0 mt-1"></div>
                      <p className="text-xs text-gray-600">{item.others}</p>
                    </div>
                  </td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.section>
  )
}
