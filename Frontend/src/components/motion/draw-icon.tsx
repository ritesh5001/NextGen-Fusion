"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { prefersReducedMotion } from "@/lib/gsap"

/**
 * Wraps any SVG icon so it animates in once when it scrolls into view and
 * again whenever its card is hovered (or, on a phone, is at mid-screen):
 * strokes draw for line icons, filled duotone icons pop in.
 *
 * It measures nothing and animates nothing until mounted: the icon is plain
 * and fully visible in the server HTML, and `.draw-ready` — the only thing
 * that hides it — is added after every shape has been given `pathLength="1"`.
 * 300–700ms, once, never looping; skipped for reduced motion.
 */
export function DrawIcon({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    // Line icons (Lucide) draw their strokes; filled icons (Phosphor duotone)
    // have nothing to trace, so they scale and fade in instead.
    const filled = el.querySelector("svg")?.getAttribute("fill") === "currentColor"
    if (filled) {
      el.classList.add("draw-pop")
    } else {
      const shapes = el.querySelectorAll("path, line, circle, rect, polyline, polygon, ellipse")
      if (!shapes.length) return
      shapes.forEach((shape) => shape.setAttribute("pathLength", "1"))
    }
    el.classList.add("draw-ready")
    el.style.setProperty("--draw-delay", `${delay}s`)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        el.classList.add("is-drawn")
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      el.classList.remove("draw-ready", "draw-pop", "is-drawn")
    }
  }, [delay])

  return (
    <span ref={ref} className={`draw-icon inline-flex ${className}`}>
      {children}
    </span>
  )
}
