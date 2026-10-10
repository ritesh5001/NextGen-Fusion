"use client"

import { useEffect, useRef } from "react"
import { loadGsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * A line drawn across the three process steps as the section scrolls by,
 * with each step's dot filling as the line reaches it. Desktop only; purely
 * decorative (aria-hidden), and drawn in full when motion is off.
 */
export function ProcessLine({ steps }: { steps: number }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    let revert = () => {}
    let cancelled = false

    loadGsap().then(({ gsap }) => {
      if (cancelled) return
      const mm = gsap.matchMedia()
      mm.add("(min-width: 768px)", () => {
        const line = el.querySelector("[data-line]")
        const dots = el.querySelectorAll("[data-dot]")
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%", end: "top 30%", scrub: 0.5 },
        })
        tl.fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)
        dots.forEach((dot, index) => {
          tl.fromTo(
            dot,
            { scale: 0.4, backgroundColor: "rgb(255 255 255 / 0.9)" },
            { scale: 1, backgroundColor: "#2a4bf5", duration: 0.15 },
            steps > 1 ? (index / (steps - 1)) * 0.92 : 0,
          )
        })
      })
      revert = () => mm.revert()
    })

    return () => {
      cancelled = true
      revert()
    }
  }, [steps])

  return (
    <div ref={root} aria-hidden="true" className="relative mb-6 hidden h-6 md:block">
      <svg className="absolute inset-x-[16.66%] top-1/2 h-[2px] w-[66.66%] -translate-y-1/2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 2">
        <line x1="0" y1="1" x2="100" y2="1" stroke="rgb(13 16 32 / 0.12)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line
          data-line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="#2a4bf5"
          strokeWidth="2"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {Array.from({ length: steps }, (_, index) => (
        <span
          key={index}
          data-dot
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-white/80"
          style={{ left: `${((index * 2 + 1) / (steps * 2)) * 100}%` }}
        />
      ))}
    </div>
  )
}
