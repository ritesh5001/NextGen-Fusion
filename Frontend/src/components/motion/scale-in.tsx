"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { loadGsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * Grows its child from slightly smaller to full size as it scrolls into the
 * viewport, scrubbed to the scroll position — the "CTA scale-up". Transform
 * only, so nothing reflows; full size from the start with motion off.
 */
export function ScaleIn({ children, from = 0.9, className = "" }: { children: ReactNode; from?: number; className?: string }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    let revert = () => {}
    let cancelled = false

    loadGsap().then(({ gsap }) => {
      if (cancelled) return
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { scale: from, transformOrigin: "50% 100%" },
          { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: 0.4 } },
        )
      }, el)
      revert = () => ctx.revert()
    })

    return () => {
      cancelled = true
      revert()
    }
  }, [from])

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  )
}
