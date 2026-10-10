"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { loadGsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * Lights up one `[data-row]` at a time as it crosses the middle of the
 * screen; the rest dim. Desktop only, and the dimming is switched on by JS
 * (`data-spotlight-on`), so without it — phones, reduced motion, no JS —
 * every row is simply shown at full strength.
 */
export function ScrollSpotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    let revert = () => {}
    let cancelled = false

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return
      const mm = gsap.matchMedia()
      mm.add("(min-width: 1024px)", () => {
        el.dataset.spotlightOn = "true"
        const triggers = Array.from(el.querySelectorAll<HTMLElement>("[data-row]")).map((row) =>
          ScrollTrigger.create({
            trigger: row,
            start: "top 62%",
            end: "bottom 38%",
            toggleClass: "is-active",
          }),
        )
        return () => {
          triggers.forEach((t) => t.kill())
          delete el.dataset.spotlightOn
        }
      })
      revert = () => mm.revert()
    })

    return () => {
      cancelled = true
      revert()
    }
  }, [])

  return (
    <div ref={root} className={`spotlight ${className}`}>
      {children}
    </div>
  )
}
