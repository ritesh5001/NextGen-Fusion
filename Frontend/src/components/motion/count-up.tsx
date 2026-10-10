"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/lib/gsap"

/**
 * Renders the final figure on the server ("3,226+") and, in the browser,
 * counts up to it the first time it scrolls into view.
 *
 * The real text never changes: while counting it is made transparent and the
 * running number is painted over it from a data attribute, so crawlers and
 * screen readers only ever see the final value, and the box is already the
 * final width (no layout shift). Figures already on screen at load are left
 * alone rather than flashing back to zero.
 */
export function CountUp({ value, className = "", immediate = false }: { value: string; className?: string; immediate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/)
    if (!el || !match || prefersReducedMotion()) return
    // `immediate` is for a figure that is on screen at load (the hero): count
    // once the intro has played, instead of skipping it.
    if (!immediate && el.getBoundingClientRect().top < window.innerHeight) return

    const [, prefix, raw, suffix] = match
    const target = parseFloat(raw.replace(/,/g, ""))
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0
    const grouped = raw.includes(",")
    const format = (n: number) =>
      prefix +
      (grouped
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)) +
      suffix

    let frame = 0
    let timer = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const run = () => {
          el.style.setProperty("--count-color", getComputedStyle(el).color)
          el.dataset.counting = "true"
          const start = performance.now()
          const duration = 1100
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            el.dataset.n = format(target * eased)
            if (t < 1) frame = requestAnimationFrame(tick)
            else delete el.dataset.counting
          }
          frame = requestAnimationFrame(tick)
        }
        // After the preloader on a first visit, shortly after load otherwise.
        if (immediate) timer = window.setTimeout(run, document.documentElement.dataset.intro === "done" ? 500 : 1300)
        else run()
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
      delete el.dataset.counting
    }
  }, [value, immediate])

  return (
    <span ref={ref} className={`count-up ${className}`}>
      {value}
    </span>
  )
}
