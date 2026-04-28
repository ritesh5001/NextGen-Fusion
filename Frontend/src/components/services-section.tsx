"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import BadgeSubtitle from "./badge-subtitle"
import Image from "next/image"
import { useState } from "react"
import { RetroGrid } from "./ui/retro-grid"
import { OptimizedIcon } from "./ui/optimized-icon"
import { useMobileIcon } from "@/hooks/use-mobile-icon"
import { serviceRoutes } from "./services/service-data"

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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 15
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

const descriptionVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)"
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function ServicesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const { getIconSrc } = useMobileIcon()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index)
  }
  
  const services = [
    {
      title: "Website Development Services",
      description: "Build fast, scalable, and conversion-focused websites using modern frameworks, clean architecture, and SEO-ready structure.",
      icon: "/icons/webdev.svg",
    },
    {
      title: "E-commerce Web Development Services",
      description: "Launch secure online stores with product catalogs, payment gateway integration, checkout optimization, and order management flows.",
      icon: "/icons/uiuxdesign.svg",
    },
    {
      title: "Android App Development Services",
      description: "Create robust Android applications with smooth UI performance, API connectivity, push notifications, and long-term maintainability.",
      icon: "/icons/webdev.svg",
    },
    {
      title: "Web Design Services",
      description: "Design modern, user-centric web experiences with clear information hierarchy, responsive layouts, and strong visual branding.",
      icon: "/icons/uiuxdesign.svg",
    },
    {
      title: "AI Automation and AI Development Services",
      description: "Automate repetitive workflows and develop AI-powered features like smart assistants, recommendations, and intelligent data processing.",
      icon: "/icons/datascience.svg",
    },
    {
      title: "SEO Services",
      description: "Improve your organic visibility with technical SEO, keyword strategy, on-page optimization, and content performance tracking.",
      icon: "/icons/dataanalys.svg",
    },
    {
      title: "PPC Services",
      description: "Run high-intent paid campaigns across Google and social platforms with ad optimization, budget control, and ROI-focused reporting.",
      icon: "/icons/branding.svg",
    },
    {
      title: "Social Media Marketing Services",
      description: "Grow your brand reach with strategic content, campaign planning, audience engagement, and performance-driven social media execution.",
      icon: "/icons/graphicdesign.svg",
    },
    {
      title: "Website Maintenance Services",
      description: "Keep your website secure and reliable with regular updates, uptime monitoring, bug fixes, backups, and performance checks.",
      icon: "/icons/videoediting.svg",
    },
    {
      title: "Software Development Services",
      description: "Develop custom software solutions tailored to your business processes, from planning and architecture to deployment and support.",
      icon: "/icons/webdev.svg",
    },
    {
      title: "API Integration Services",
      description: "Connect third-party tools, CRMs, payment systems, and internal platforms through reliable API integrations and secure data flows.",
      icon: "/icons/nocode.svg",
    },
    {
      title: "Cloud Solutions",
      description: "Design and deploy cloud-ready infrastructure for scalability, resilience, and secure application delivery across modern environments.",
      icon: "/icons/datascience.svg",
    },
  ]

  return (
    <motion.section 
      id="services" 
      className="bg-white py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Retro Grid Background */}
      <motion.div 
        className="absolute inset-0 h-96"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <RetroGrid 
          angle={65}
          cellSize={60}
          opacity={0.8}
          lightLineColor="#9ca3af"
          darkLineColor="#374151"
        />
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-left mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="mb-4"
            variants={textVariants}
          >
            <BadgeSubtitle>Services</BadgeSubtitle>
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            variants={textVariants}
          >
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <span>What We</span>
              <motion.div
                className="relative inline-block mx-1"
                variants={iconVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <OptimizedIcon
                  src={getIconSrc("/images/paint.svg", "/images/paint.png")}
                  alt="paint icon"
                  variants={iconVariants}
                />
              </motion.div>
              <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                Do for You
              </span>
            </div>
          </motion.h2>
          <motion.p
            className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed"
            variants={textVariants}
          >
            At NextGen Fusion, we offer comprehensive digital solutions from concept to execution.
            We combine cutting-edge technology with creative excellence to deliver results that drive your business forward.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y divide-gray-100/50 sm:divide-y-0 sm:divide-x divide-gray-100/50"
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const isActive = activeCard === index
            const href = serviceRoutes[service.title] ?? "#"

            return (
              <Link key={index} href={href} className="block">
                <motion.div
                  className="group relative p-4 sm:p-6 lg:p-8 cursor-pointer overflow-hidden transition-all duration-500"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.3, ease: "easeOut" } }}
                  onClick={() => handleCardClick(index)}
                >
                  {/* Hover overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#2B35AB]/3 via-[#8A38F5]/3 to-[#13CBD4]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                  />
                  {/* Service Content */}
                  <div className="relative z-10">
                    {/* Service Icon */}
                    <motion.div className="mb-6 sm:mb-8" variants={iconVariants}>
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-[#2B35AB]/5 via-[#8A38F5]/5 to-[#13CBD4]/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 flex items-center justify-center">
                          <OptimizedIcon
                            src={service.icon || "/placeholder.svg"}
                            alt={service.title}
                            variants={iconVariants}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Service Content */}
                    <motion.div variants={textVariants} className="text-left">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:bg-gradient-to-r group-hover:from-[#2B35AB] group-hover:via-[#8A38F5] group-hover:to-[#13CBD4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {service.title}
                      </h3>
                      <div className="overflow-hidden">
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base transition-all duration-300 block lg:hidden lg:group-hover:block lg:opacity-0 lg:h-0 lg:group-hover:opacity-100 lg:group-hover:h-auto lg:mt-2">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
