"use client"

import Image from "next/image"
import { openBookingModal } from "@/lib/booking"

/**
 * Entrance animations are plain CSS (`.hero-rise` in globals.css), not
 * framer-motion. framer made every animated line paint nothing until the JS
 * bundle had downloaded and hydrated — on a throttled phone that was seconds of
 * blank hero — and it put the whole library in the homepage's first-load JS.
 * CSS animations start with the first paint and respect prefers-reduced-motion.
 */
const HeroContent = ({ projectCount }: { projectCount: number }) => (
  <div className="max-w-7xl mx-auto text-center">
    {/* Available for work badge */}
    <div className="flex items-center justify-center mb-8 hero-rise">
      <div className="inline-flex items-center px-4 py-1.5 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="relative flex h-2.5 w-2.5 mr-2">
          <div className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></div>
          <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></div>
        </div>
        {/* The H1 is brand copy with no location in it; this line carries the
            query the homepage is meant to rank for. */}
        <p className="text-xs font-medium text-gray-700">
          Website development company in Lucknow, India
          <span className="hidden sm:inline text-gray-600"> · Available for work</span>
        </p>
      </div>
    </div>

    {/* H1 — carries search intent. Deliberately static: it is the LCP element
        on mobile, and any entrance animation on it delays LCP. */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5 max-w-5xl mx-auto">
      Websites &amp; Online Stores That Don&apos;t Get Abandoned{" "}
      <span
        className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(90deg, #2B35AB 0%, #8A38F5 46%, #13CBD4 90%)",
        }}
      >
        After Launch
      </span>
    </h1>

    {/* Brand signature — decoration, not a heading. */}
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8">
      {/* Grouped so punctuation never wraps onto the start of a line. */}
      <span className="inline-flex items-center gap-2 whitespace-nowrap hero-rise hero-delay-1">
        Sleek
        <Image
          src="/images/man-hero.png"
          alt=""
          width={40}
          height={40}
          className="object-contain w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 hero-icon"
        />
        ,
      </span>
      <span className="inline-flex items-center gap-2 whitespace-nowrap hero-rise hero-delay-2">
        Fast
        <Image
          src="/images/eagle-hero.png"
          alt=""
          width={40}
          height={40}
          className="object-contain w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 hero-icon"
        />
        ,
      </span>
      <span className="inline-flex items-center gap-2 whitespace-nowrap hero-rise hero-delay-3">
        Doesn&apos;t Ghost
        <Image
          src="/images/ghost-hero.png"
          alt=""
          width={40}
          height={40}
          className="object-contain w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 hero-icon"
        />
        You
      </span>
    </div>

    {/* Subtitle — outcome, not feature list */}
    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 hero-rise hero-delay-4">
      Conversion-focused websites for growing D2C and ecommerce brands across India and
      worldwide — designed, built, and supported end to end.
    </p>

    {/* CTA Buttons — one primary, one lighter secondary */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 hero-rise hero-delay-4">
      <button
        type="button"
        onClick={() => openBookingModal({ requestType: "meeting" })}
        className="px-8 py-3.5 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-[background-color,transform] hover:scale-[1.03] active:scale-[0.98] text-base sm:text-lg"
      >
        Book a Free Call
      </button>
      <a
        href="/work/"
        className="px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-[background-color,transform] hover:scale-[1.03] active:scale-[0.98] text-base sm:text-lg"
      >
        See Our Work
      </a>
    </div>

    {/* Proof line directly under the CTA */}
    <p className="mt-5 text-sm text-gray-600 hero-rise hero-delay-4">
      {projectCount} real projects delivered · 0 clients ghosted
    </p>
  </div>
)

// Main Hero Section Component
export default function HeroSection({ projectCount }: { projectCount: number }) {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Images

          One <Image> per side rather than a separate desktop/mobile pair, so
          phones don't download the 600px render.

          Deliberately NOT `priority` / `fetchPriority="high"`. These are
          aria-hidden decorative flourishes hidden below `sm`. Promoting them
          made kanan.png *become* the LCP element on mobile. Leaving them at
          default priority hands LCP back to the hero headline, which is plain
          text already present in the server-rendered HTML. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/4 sm:left-1/4 sm:-translate-x-1/2">
          <Image
            src="/images/kiri.png"
            alt=""
            aria-hidden="true"
            width={600}
            height={696}
            sizes="(max-width: 640px) 300px, 600px"
            className="w-[300px] sm:w-[600px] h-auto opacity-60 sm:opacity-100"
          />
        </div>
        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/4 sm:right-1/4 sm:translate-x-1/2">
          <Image
            src="/images/kanan.png"
            alt=""
            aria-hidden="true"
            width={599}
            height={776}
            sizes="(max-width: 640px) 300px, 599px"
            className="w-[300px] sm:w-[599px] h-auto opacity-60 sm:opacity-100"
          />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto text-center relative z-10">
        <HeroContent projectCount={projectCount} />
      </div>
    </div>
  )
}
