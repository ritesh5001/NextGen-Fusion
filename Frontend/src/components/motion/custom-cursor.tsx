"use client"

import { useEffect, useRef } from "react"
import { loadGsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * A dot that trails the pointer and grows into a label over anything marked
 * `data-cursor="View"` (project cards) or `data-cursor="Drag"` (sliders).
 *
 * Desktop with a fine pointer only, and the system cursor is left alone: this
 * follows it rather than replacing it, so precision and accessibility are
 * unchanged. Mounted lazily (layout-chrome) and gone for reduced motion.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = dot.current
    if (!el) return
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return
    if (prefersReducedMotion()) return

    let cancelled = false
    let cleanup = () => {}

    loadGsap().then(({ gsap }) => {
      if (cancelled) return
      const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" })
      const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" })

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return
        el.dataset.on = "true"
        x(event.clientX)
        y(event.clientY)
      }
      const onOver = (event: PointerEvent) => {
        const target = (event.target as Element | null)?.closest?.<HTMLElement>("[data-cursor]")
        const label = target?.dataset.cursor ?? ""
        el.dataset.label = label
        el.textContent = label
      }
      const onLeave = () => {
        el.dataset.on = "false"
      }

      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("pointerover", onOver, { passive: true })
      document.documentElement.addEventListener("pointerleave", onLeave)
      cleanup = () => {
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerover", onOver)
        document.documentElement.removeEventListener("pointerleave", onLeave)
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return <div ref={dot} className="cursor-dot" aria-hidden="true" />
}
