"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { loadGsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * Four real client sites fanned out along the bottom of the hero, each a link
 * to its case study.
 *
 * SEO notes, because this sits above the fold:
 *  - Plain <img> via next/image with real alt text and fixed dimensions (no
 *    layout shift), not a background image — crawlers and Google Images read
 *    them, and each links to a page that already exists.
 *  - Never `priority`: they are not the LCP element and must not compete with
 *    the headline for the first bytes.
 *  - Tilt (pointer) and drift (scroll) are transforms on wrappers only; the
 *    images themselves are untouched.
 */
const SHOTS = [
  { slug: "maribiz-ai", title: "MariBiz.ai", src: "/projects/maribiz-ai/clean-1.png", rot: -7, lift: 38, depth: 18, drift: -70 },
  { slug: "deetoo", title: "DeeToo", src: "/projects/deetoo/screenshot-1.png", rot: -2.5, lift: 10, depth: 9, drift: -24 },
  { slug: "cleanship", title: "Cleanship", src: "/projects/cleanship/screenshot-1.png", rot: 2.5, lift: 10, depth: -9, drift: 24 },
  { slug: "krushidoctor", title: "Krushi Doctor", src: "/projects/krushidoctor/clean-1.png", rot: 7, lift: 38, depth: -18, drift: 70 },
]

export function HeroMockups() {
  const root = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    let revert = () => {}
    let cancelled = false

    loadGsap().then(({ gsap }) => {
      if (cancelled) return
      const mm = gsap.matchMedia()
      // Desktop only: as the page scrolls the cards drift apart and sink.
      mm.add("(min-width: 1024px)", () => {
        const cards = el.querySelectorAll<HTMLElement>("[data-drift]")
        const tween = gsap.to(cards, {
          x: (_i, target: HTMLElement) => Number(target.dataset.drift),
          y: 36,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 85%", end: "bottom -40%", scrub: 0.6 },
        })
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
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
    <ul ref={root} className="mock-row">
      {SHOTS.map((shot, index) => (
        <li
          key={shot.slug}
          className={`mock-in ${index === 3 ? "max-sm:hidden" : ""}`}
          style={{ "--i": index, marginTop: shot.lift } as React.CSSProperties}
        >
          <div data-drift={shot.drift}>
            <div className="mock-card" style={{ "--r": `${shot.rot}deg`, "--d": shot.depth } as React.CSSProperties}>
              <Link href={`/work/${shot.slug}/`} prefetch={false} data-cursor="View" data-vt-image className="mock-frame">
                <span className="mock-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <Image
                  src={shot.src}
                  alt={`${shot.title} — website built by NextGen Fusion`}
                  width={640}
                  height={400}
                  sizes="(max-width: 640px) 150px, (max-width: 1280px) 26vw, 340px"
                  className="mock-img"
                />
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
