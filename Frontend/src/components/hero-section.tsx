"use client"

import Link from "next/link"
import { ArrowUpRight, Check, ShieldCheck, X } from "lucide-react"
import { openBookingModal } from "@/lib/booking"
import { PROJECTS_DELIVERED } from "@/lib/seo"

/**
 * Entrance animations are plain CSS (`.hero-rise` in globals.css), not
 * framer-motion. framer made every animated line paint nothing until the JS
 * bundle had downloaded and hydrated — on a throttled phone that was seconds of
 * blank hero — and it put the whole library in the homepage's first-load JS.
 * CSS animations start with the first paint and respect prefers-reduced-motion.
 */
const SIGNATURE = ["Sleek", "Fast", "Doesn't Ghost You"]

const HeroContent = () => (
  <div className="text-left">
    {/* Available for work badge */}
    <div className="mb-7 hero-rise">
      <div className="eyebrow eyebrow-plain">
        <div className="relative flex h-2.5 w-2.5">
          <div className="absolute inline-flex h-full w-full rounded-full bg-leaf opacity-60 animate-ping"></div>
          <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-leaf"></div>
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
    <h1 className="mb-7 max-w-3xl">
      <span className="display block text-[2.5rem] sm:text-6xl xl:text-[4.5rem]">
        Web Development &amp; AI Solutions for Growing Businesses
      </span>
      <span className="mt-5 block text-xl leading-snug tracking-tight text-ink-soft sm:text-2xl lg:text-[1.7rem]">
        Websites &amp; online stores that don&apos;t get abandoned{" "}
        <span className="mark-lime whitespace-nowrap">after launch</span>
      </span>
    </h1>

    {/* Brand signature — decoration, not a heading. */}
    <ul className="mb-7 flex flex-wrap gap-2">
      {SIGNATURE.map((word, index) => (
        <li
          key={word}
          className={`glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink hero-rise hero-delay-${index + 1}`}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
          </span>
          {word}
        </li>
      ))}
    </ul>

    {/* Subtitle — outcome, not feature list */}
    <p className="mb-4 max-w-xl text-lg leading-relaxed text-ink-soft hero-rise hero-delay-4">
      Conversion-focused websites for growing D2C and ecommerce brands across India and
      worldwide — designed, built, and supported end to end.
    </p>

    {/* The Lucknow landing page owns the "website development company in
        Lucknow" query; the homepage links to it rather than competing for it. */}
    <p className="mb-9 text-base text-ink-mute hero-rise hero-delay-4">
      Based in Lucknow? See our{" "}
      <Link
        href="/website-development-company-in-lucknow/"
        // Visible on load, so a default prefetch fetched the whole Lucknow
        // page while the homepage was still painting.
        prefetch={false}
        className="font-medium text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink"
      >
        website development company in Lucknow
      </Link>{" "}
      page.
    </p>

    {/* CTA Buttons — one primary, one lighter secondary */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center hero-rise hero-delay-4">
      <button
        type="button"
        onClick={() => openBookingModal({ requestType: "meeting" })}
        className="btn btn-lime sm:text-lg"
      >
        Book a Free Call
        <span className="btn-dot" aria-hidden="true">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </button>
      <Link href="/work/" prefetch={false} className="btn btn-glass sm:text-lg">
        See Our Work
      </Link>
    </div>

    {/* Proof line directly under the CTA */}
    <p className="mt-5 text-sm text-ink-mute hero-rise hero-delay-4">
      {PROJECTS_DELIVERED} projects delivered · 0 clients ghosted
    </p>
  </div>
)

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/**
 * The decorative panel beside the headline: a colour wash with frosted cards
 * on it. It is built from markup and CSS gradients, so there is no image to
 * download and nothing here can become the LCP element (the two PNG
 * flourishes it replaces once did).
 *
 * aria-hidden, and every phrase in it repeats a claim made in real text
 * elsewhere on the page — it adds no information of its own.
 */
const HeroPanel = () => (
  <div aria-hidden="true" className="relative mx-auto w-full max-w-xl lg:max-w-none">
    <div className="wash-green relative overflow-hidden rounded-[40px] p-5 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_28%_18%,rgba(255,255,255,0.5),rgba(255,255,255,0)_70%)]" />

      <div className="relative flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4 hero-rise hero-delay-1">
          <p className="text-white">
            <span className="block text-6xl font-normal leading-none tracking-tighter sm:text-7xl">
              {PROJECTS_DELIVERED}
            </span>
            <span className="mt-2 block text-base text-white/90">projects delivered</span>
          </p>
          <span className="mt-1 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-[0_14px_30px_-18px_rgba(15,16,13,0.6)]">
            Written quote in one working day
          </span>
        </div>

        <div className="glass-blur rounded-[28px] p-4 sm:p-5 hero-rise hero-delay-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-base font-medium text-white">Support after launch</p>
            <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-medium text-white">Month by month</span>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            {MONTHS.map((month, index) => (
              <div
                key={month}
                className="flex flex-col items-start gap-2 rounded-2xl bg-white/20 p-2.5 ring-1 ring-inset ring-white/30 sm:p-3"
              >
                {/* Drawn from an attribute so twelve month names do not land in
                    the page's text content. */}
                <span data-label={month} className="text-xs text-white/90 before:content-[attr(data-label)] sm:text-sm" />
                {index < 10 ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-ink sm:h-7 sm:w-7">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-inset ring-white/50 sm:h-7 sm:w-7" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 hero-rise hero-delay-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-[0_14px_30px_-18px_rgba(15,16,13,0.6)]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-lime">
              <X className="h-3 w-3" strokeWidth={3} />
            </span>
            0 clients ghosted
          </span>
          <span className="inline-flex min-w-0 flex-1 basis-full items-center gap-2 rounded-full bg-ink/80 px-4 py-2.5 text-sm font-medium text-white sm:basis-0">
            <ShieldCheck className="h-4 w-4 shrink-0 text-lime" />
            <span className="truncate">You own the domain, code and every account</span>
          </span>
        </div>
      </div>
    </div>
  </div>
)

// Main Hero Section Component
export default function HeroSection() {
  return (
    <div className="ambient-lime relative w-full overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 xl:pt-36">
      {/* minmax(0, …) on every breakpoint: a plain grid column grows to fit its
          widest unbreakable child, and the panel's one-line pill pushed the
          whole hero wider than a phone screen. */}
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <HeroContent />
        <HeroPanel />
      </div>
    </div>
  )
}
