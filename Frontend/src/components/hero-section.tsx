"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { openBookingModal } from "@/lib/booking"
import { PROJECTS_DELIVERED } from "@/lib/seo"
import { prefersReducedMotion } from "@/lib/gsap"
import { heroSerif } from "@/app/fonts"
import { Magnetic } from "@/components/motion/magnetic"
import { CountUp } from "@/components/motion/count-up"
import { HeroMockups } from "@/components/motion/hero-mockups"

/**
 * Entrance animations are plain CSS (`.hero-rise` in globals.css), not
 * framer-motion. framer made every animated line paint nothing until the JS
 * bundle had downloaded and hydrated — on a throttled phone that was seconds of
 * blank hero — and it put the whole library in the homepage's first-load JS.
 * CSS animations start with the first paint and respect prefers-reduced-motion.
 */

// Squarish client marks that stay legible in a small circle.
const PROOF_LOGOS = [
  { slug: "krushidoctor", name: "Krushi Doctor" },
  { slug: "ladyscootytrainer", name: "Lady Scooty Trainer" },
  { slug: "vashtaraheaven", name: "Vashtara Heaven" },
  { slug: "kalamohini", name: "Kala Mohini" },
  { slug: "samaraha", name: "Samaraha" },
]

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

    {/* H1 — leads with the query the homepage ranks for and is close to the
        <title>; a heading with no keyword was one reason Google kept rewriting
        the title in results. Deliberately static: this is the LCP element, and
        any entrance animation on it delays LCP. Only the accent phrase eases
        into focus, and it starts partly visible, never at opacity 0. */}
    <h1 className="display mb-6 max-sm:order-2 text-[2.25rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
      <span className="block text-balance">Web development &amp; AI solutions</span>{" "}
      <span className={`hero-focus ${heroSerif.className} text-gradient block pr-[0.12em] text-[1.1em] leading-[1.02]`}>
        that grow your business.
      </span>
    </h1>

    {/* One description: what, for whom, and that we stay after launch. */}
    <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-ink-soft hero-rise hero-delay-4 max-sm:order-4 max-sm:mb-0 max-sm:mt-6 max-sm:text-base">
      Conversion-focused websites, online stores and AI automation for growing brands in India
      and worldwide. Designed, built and supported end to end.
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
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      </Magnetic>
      <Magnetic className="max-sm:w-full">
        <Link href="/work/" prefetch={false} className="btn btn-glass max-sm:w-full sm:text-lg">
          See Our Work
        </Link>
      </Magnetic>
    </div>

    {/* Proof: overlapping client marks plus the figure. */}
    <div className="mt-7 flex flex-col items-center gap-3 hero-rise hero-delay-4 max-sm:order-3 max-sm:mt-5 sm:flex-row sm:justify-center">
      <ul aria-hidden="true" className="flex -space-x-2.5">
        {PROOF_LOGOS.map((logo) => (
          <li key={logo.slug} className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5 shadow-sm ring-2 ring-white">
            <Image src={`/images/clients/${logo.slug}.webp`} alt="" width={28} height={28} sizes="28px" className="h-full w-full object-contain" />
          </li>
        ))}
      </ul>
      <p className="text-sm text-ink-mute">
        <CountUp value={PROJECTS_DELIVERED} immediate className="font-medium text-ink" /> projects
        delivered for brands in India, the UAE, the UK &amp; Italy · 0 clients ghosted
      </p>
    </div>
  </div>
)

// Main Hero Section Component
export default function HeroSection() {
  const slab = useRef<HTMLDivElement>(null)

  // Spotlight and tilt follow the pointer. Mouse only, and not for reduced
  // motion; touch and keyboard users get the same hero without them.
  useEffect(() => {
    const el = slab.current
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect()
        const x = event.clientX - box.left
        const y = event.clientY - box.top
        el.style.setProperty("--sx", `${x}px`)
        el.style.setProperty("--sy", `${y}px`)
        el.style.setProperty("--tx", ((x / box.width) * 2 - 1).toFixed(3))
        el.style.setProperty("--ty", ((y / box.height) * 2 - 1).toFixed(3))
        el.dataset.hover = "true"
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.dataset.hover = "false"
      el.style.setProperty("--tx", "0")
      el.style.setProperty("--ty", "0")
    }
    el.addEventListener("pointermove", onMove, { passive: true })
    el.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    // xl top padding is 24px more than before, so the floating navbar clears
    // the hero card's rounded top edge.
    <div className="relative w-full px-3 pb-12 pt-3 sm:px-6 sm:pt-6 lg:px-8 lg:pb-20 xl:pt-[8.5rem]">
      <div className="relative mx-auto max-w-7xl">
        {/* Colour for the glass to blur: CSS gradients, so there is nothing to
            download and nothing here can become the LCP element. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="orb orb-blue orb-drift left-[-8%] top-[-12%] h-[58%] w-[46%] sm:h-[75%] sm:w-[42%]" />
          <div className="orb orb-violet orb-drift-slow right-[-6%] top-[2%] h-[52%] w-[40%] sm:h-[70%] sm:w-[36%]" />
          <div className="orb orb-cyan orb-drift bottom-[-14%] right-[18%] h-[48%] w-[44%] sm:h-[60%] sm:w-[38%]" />
          <div className="orb orb-pink orb-drift-slow bottom-[-8%] left-[10%] h-[36%] w-[30%]" />
        </div>

        <div
          ref={slab}
          className="hero-slab glass-blur relative isolate overflow-hidden rounded-[32px] px-5 pt-8 sm:rounded-[48px] sm:px-10 sm:pt-16 lg:pt-20"
        >
          {/* Depth: a faint dot grid, film grain, and a spotlight that trails
              the cursor. All CSS, all decorative. */}
          <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0 -z-10" />
          <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0 -z-10" />
          <div aria-hidden="true" className="hero-spot pointer-events-none absolute inset-0 -z-10" />
          <HeroContent />
          <div className="mock-stage">
            <HeroMockups />
          </div>
        </div>
      </div>
    </div>
  )
}
