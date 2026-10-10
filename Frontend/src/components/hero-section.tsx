"use client"

import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { openBookingModal } from "@/lib/booking"
import { PROJECTS_DELIVERED } from "@/lib/seo"
import { Magnetic } from "@/components/motion/magnetic"
import { MaskWords } from "@/components/motion/mask-words"

/**
 * Entrance animations are plain CSS (`.hero-rise` in globals.css), not
 * framer-motion. framer made every animated line paint nothing until the JS
 * bundle had downloaded and hydrated — on a throttled phone that was seconds of
 * blank hero — and it put the whole library in the homepage's first-load JS.
 * CSS animations start with the first paint and respect prefers-reduced-motion.
 */
const SIGNATURE = ["Sleek", "Fast", "Doesn't Ghost You"]

const HeroContent = () => (
  // A column so phones can lift the call to action above the bottom bar
  // (max-sm:order-*); the DOM, and so the reading order, is unchanged.
  <div className="mx-auto flex max-w-4xl flex-col text-center">
    {/* Available for work badge */}
    <div className="mb-6 hero-rise max-sm:order-1 sm:mb-7">
      <div className="eyebrow eyebrow-plain">
        <div className="relative flex h-2.5 w-2.5">
          <div className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping"></div>
          <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></div>
        </div>
        <p>
          Remote team in India · International clients
          <span className="hidden sm:inline"> · Available for work</span>
        </p>
      </div>
    </div>

    {/* H1 — leads with the query the homepage ranks for and matches the
        <title>; a heading with no keyword was one reason Google kept rewriting
        the title in results. Deliberately static: it is the LCP element on
        mobile, and any entrance animation on it delays LCP. */}
    <h1 className="mb-7 max-sm:order-2">
      <span className="display block text-[2.25rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
        Web Development &amp; AI Solutions for Growing Businesses
      </span>
      {/* The headline line above is the LCP element and is never animated;
          this supporting line rises word by word behind a mask instead. */}
      <span className="mask-words mx-auto mt-5 block max-w-2xl text-xl leading-snug tracking-tight text-ink-soft sm:text-2xl lg:text-[1.7rem]">
        <MaskWords text="Websites & online stores that don't get abandoned" />{" "}
        <span className="whitespace-nowrap">
          <MaskWords text="after launch" start={7} wordClassName="text-gradient" />
        </span>
      </span>
    </h1>

    {/* Brand signature — decoration, not a heading. */}
    <ul className="mb-7 flex flex-wrap justify-center gap-2 max-sm:order-4">
      {SIGNATURE.map((word, index) => (
        <li
          key={word}
          className={`glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink hero-rise hero-delay-${index + 1}`}
        >
          <span className="icon-badge h-6 w-6">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
          </span>
          {word}
        </li>
      ))}
    </ul>

    {/* Subtitle — outcome, not feature list */}
    <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-ink-soft hero-rise hero-delay-4 max-sm:order-4">
      Conversion-focused websites for growing D2C and ecommerce brands across India and
      worldwide — designed, built, and supported end to end.
    </p>

    {/* The Lucknow landing page owns the "website development company in
        Lucknow" query; the homepage links to it rather than competing for it. */}
    <p className="mb-9 text-base text-ink-mute hero-rise hero-delay-4 max-sm:order-4 max-sm:mb-0">
      Based in Lucknow? See our{" "}
      <Link
        href="/website-development-company-in-lucknow/"
        // Visible on load, so a default prefetch fetched the whole Lucknow
        // page while the homepage was still painting.
        prefetch={false}
        className="font-medium text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
      >
        website development company in Lucknow
      </Link>{" "}
      page.
    </p>

    {/* CTA Buttons — one primary, one lighter secondary */}
    <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center hero-rise hero-delay-4 max-sm:order-3">
      <Magnetic className="max-sm:w-full">
        <button
          type="button"
          onClick={() => openBookingModal({ requestType: "meeting" })}
          className="btn btn-brand max-sm:w-full sm:text-lg"
        >
          Book a Free Call
          <span className="btn-dot" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>
      </Magnetic>
      <Magnetic className="max-sm:w-full">
        <Link href="/work/" prefetch={false} className="btn btn-glass max-sm:w-full sm:text-lg">
          See Our Work
        </Link>
      </Magnetic>
    </div>

    {/* Proof line directly under the CTA */}
    <p className="mt-5 text-sm text-ink-mute hero-rise hero-delay-4 max-sm:order-3 max-sm:mb-8 max-sm:mt-4">
      {PROJECTS_DELIVERED} projects delivered · 0 clients ghosted
    </p>
  </div>
)

// Main Hero Section Component
export default function HeroSection() {
  return (
    <div className="relative w-full px-3 pb-12 pt-3 sm:px-6 sm:pt-6 lg:px-8 lg:pb-20 xl:pt-28">
      <div className="relative mx-auto max-w-7xl">
        {/* Colour for the glass to blur: CSS gradients, so there is nothing to
            download and nothing here can become the LCP element. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="orb orb-blue orb-drift left-[-8%] top-[-12%] h-[58%] w-[46%] sm:h-[75%] sm:w-[42%]" />
          <div className="orb orb-violet orb-drift-slow right-[-6%] top-[2%] h-[52%] w-[40%] sm:h-[70%] sm:w-[36%]" />
          <div className="orb orb-cyan orb-drift bottom-[-14%] right-[18%] h-[48%] w-[44%] sm:h-[60%] sm:w-[38%]" />
          <div className="orb orb-pink orb-drift-slow bottom-[-8%] left-[10%] h-[36%] w-[30%]" />
        </div>

        <div className="glass-blur rounded-[32px] px-5 pb-10 pt-8 sm:rounded-[48px] sm:px-10 sm:py-16 lg:py-20">
          <HeroContent />
        </div>
      </div>
    </div>
  )
}
