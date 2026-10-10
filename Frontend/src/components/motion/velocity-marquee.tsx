"use client"

import { useEffect, useRef } from "react"
import { loadGsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * A large outlined word band that drifts on its own and surges with scroll
 * speed, in the direction of travel.
 *
 * Decorative: aria-hidden, and the words are drawn from a data attribute
 * through CSS `content`, so this repeated text is not part of the page's
 * text content — crawlers do not read a keyword list five times over.
 */
export function VelocityMarquee({ words }: { words: string[] }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  // Each word (and each separator dot) is its own span so it can light up as it
  // crosses the middle of the screen. Two copies make the loop seamless.
  const items = words.flatMap((word) => [word, "·"])

  useEffect(() => {
    const trackEl = track.current
    if (!trackEl || prefersReducedMotion()) return
    let cancelled = false
    let cleanup = () => {}

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !root.current) return
      // The track holds two copies; looping by half its width is seamless.
      const loop = gsap.to(trackEl, { xPercent: -50, ease: "none", duration: 38, repeat: -1 })
      const speed = { value: 1 }
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = Math.min(5, 1 + Math.abs(self.getVelocity()) / 400)
          const direction = self.direction === -1 ? -1 : 1
          gsap.to(speed, {
            value: boost * direction,
            duration: 0.2,
            overwrite: true,
            onUpdate: () => {
              loop.timeScale(speed.value)
            },
            onComplete: () => {
              gsap.to(speed, { value: direction, duration: 1.2, onUpdate: () => { loop.timeScale(speed.value) } })
            },
          })
        },
      })
      // Light up whichever word is crossing the centre. A handful of rect
      // reads per frame, and only while the band is on screen.
      const wordEls = Array.from(root.current.querySelectorAll<HTMLElement>(".marquee-word"))
      const centreTrigger = ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top" })
      const light = () => {
        if (!centreTrigger.isActive) return
        const mid = window.innerWidth / 2
        for (const el of wordEls) {
          const box = el.getBoundingClientRect()
          el.classList.toggle("is-center", box.left < mid && box.right > mid)
        }
      }
      gsap.ticker.add(light)
      cleanup = () => {
        gsap.ticker.remove(light)
        centreTrigger.kill()
        trigger.kill()
        loop.kill()
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <div ref={root} aria-hidden="true" className="overflow-hidden py-6 sm:py-10">
      <div ref={track} className="flex w-max">
        {[0, 1].map((copy) =>
          items.map((item, i) => <span key={`${copy}-${i}`} data-text={`${item}  `} className="marquee-word" />)
        )}
      </div>
    </div>
  )
}
