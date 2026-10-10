"use client"

import { useEffect, useRef } from "react"
import { loadGsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * A paragraph whose words go from faint to full as it scrolls through the
 * viewport. The text is the same plain sentence in the HTML — words are only
 * wrapped in spans — and it is dimmed by `[data-sw-ready]`, set once the
 * animation is armed, so it is fully readable with JavaScript off.
 */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = text.split(" ")

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let revert = () => {}
    let cancelled = false
    loadGsap().then(({ gsap }) => {
      if (cancelled) return
      const mm = gsap.matchMedia()
      mm.add("(min-width: 768px)", () => {
        el.setAttribute("data-sw-ready", "")
        const tween = gsap.to(el.querySelectorAll(".sw"), {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: 0.4 },
        })
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          el.removeAttribute("data-sw-ready")
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
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="sw">{word}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  )
}
