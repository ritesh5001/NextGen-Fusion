"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import { openBookingModal } from "@/components/booking-modal"
import { deliveredProjects } from "@/lib/delivered-projects"

// Types
type AnimationVariants = Record<string, Variants>

// Animation variants
const heroVariants: AnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
  },
  sleek: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  fast: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.05,
      },
    },
  },
  trafficLight: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },
  and: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  },
  ghostText: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.15,
      },
    },
  },
  anime: {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: "backOut",
        delay: 0.2,
      },
    },
  },
  animeMobile: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.5,
      },
    },
  },
}

// Hero Content Component
const HeroContent = () => {
  const defaultVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    sleek: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    fast: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    trafficLight: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    and: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    ghostText: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    anime: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    animeMobile: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    subtitle: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  }

  const animationVariants = heroVariants || defaultVariants

  return (
    <motion.div
      className="max-w-7xl mx-auto text-center"
      variants={animationVariants.container}
      initial="hidden"
      animate="visible"
    >
      {/* Available for work badge */}
      <motion.div
        className="flex items-center justify-center mb-8"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
      >
        <div className="inline-flex items-center px-4 py-1.5 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="relative flex h-2.5 w-2.5 mr-2">
            <div className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></div>
            <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></div>
          </div>
          <span className="text-xs font-medium text-gray-700">Available for work</span>
        </div>
      </motion.div>

      {/* H1 — carries search intent. "Websites", "online stores" and "after
          launch" are terms buyers actually type; the stylised brand line moved
          below it and is deliberately no longer a heading. */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5 max-w-5xl mx-auto"
        variants={animationVariants.sleek}
      >
        Websites &amp; Online Stores That Don&apos;t Get Abandoned{" "}
        <span
          className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(90deg, #2B35AB 0%, #8A38F5 46%, #13CBD4 90%)'
          }}
        >
          After Launch
        </span>
      </motion.h1>

      {/* Brand signature — the original line, kept as decoration rather than a
          heading so it no longer competes with the H1 for what this page is about. */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        {/* Grouped so punctuation never wraps onto the start of a line. */}
        <motion.span
          className="inline-flex items-center gap-2 whitespace-nowrap"
          variants={animationVariants.sleek}
        >
          Sleek
          <Image
            src="/images/man-hero.png"
            alt=""
            width={40}
            height={40}
            priority
            className="object-contain w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 hero-icon"
          />
          ,
        </motion.span>
        <motion.span
          className="inline-flex items-center gap-2 whitespace-nowrap"
          variants={animationVariants.fast}
        >
          Fast
          <Image
            src="/images/eagle-hero.png"
            alt=""
            width={40}
            height={40}
            priority
            className="object-contain w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 hero-icon"
          />
          ,
        </motion.span>
        <motion.span
          className="inline-flex items-center gap-2 whitespace-nowrap"
          variants={animationVariants.ghostText}
        >
          Doesn&apos;t Ghost
          <Image
            src="/images/ghost-hero.png"
            alt=""
            width={40}
            height={40}
            priority
            className="object-contain w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 hero-icon"
          />
          You
        </motion.span>
      </div>

      {/* Subtitle — outcome, not feature list */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10"
        variants={animationVariants.subtitle}
      >
        Conversion-focused websites for growing D2C and ecommerce brands across India and
        worldwide — designed, built, and supported end to end.
      </motion.p>

      {/* CTA Buttons — one primary, one lighter secondary */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
        variants={animationVariants.subtitle}
      >
        <motion.button
          type="button"
          onClick={() => openBookingModal({ requestType: "meeting" })}
          className="px-8 py-3.5 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors text-base sm:text-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Book a Free Call
        </motion.button>
        <motion.a
          href="#project-estimator"
          className="px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-base sm:text-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Get a Free Estimate
        </motion.a>
      </motion.div>

      {/* Proof line directly under the CTA */}
      <motion.p
        className="mt-5 text-sm text-gray-500"
        variants={animationVariants.subtitle}
      >
        {deliveredProjects.length}+ projects delivered · 0 clients ghosted
      </motion.p>
    </motion.div>
  )
}

// Main Hero Section Component
export default function HeroSection() {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Left Background Image */}
        <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 hidden sm:block">
          <Image 
            src="/images/kiri.png" 
            alt="Left background" 
            width={599.6} 
            height={695.8} 
            className="opacity-100"
          />
        </div>
        
        {/* Right Background Image */}
        <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2 hidden sm:block">
          <Image 
            src="/images/kanan.png" 
            alt="Right background" 
            width={599} 
            height={775.8} 
            className="opacity-100"
          />
        </div>

        {/* Mobile Background Images - Smaller */}
        <div className="block sm:hidden">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4">
            <Image 
              src="/images/kiri.png" 
              alt="Left background" 
              width={300} 
              height={350} 
              className="opacity-60"
            />
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4">
            <Image 
              src="/images/kanan.png" 
              alt="Right background" 
              width={300} 
              height={388} 
              className="opacity-60"
            />
          </div>
        </div>
      </div>

      <motion.div
        className="w-full max-w-7xl mx-auto text-center relative z-10"
        variants={heroVariants.container}
        initial="hidden"
        animate="visible"
      >
        <HeroContent />
      </motion.div>
    </div>
  )
}
