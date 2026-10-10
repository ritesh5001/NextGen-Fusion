"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { loadGsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * A row of cards. On phones (and for reduced motion) it is a native
 * swipeable strip with scroll snapping. On desktop the section pins and
 * vertical scrolling slides the row sideways — the page still scrolls
 * normally, so keyboard, trackpad and find-in-page all keep working.
 *
 * Tabbing to a card that is off to the side scrolls the page to the point
 * where that card is in view, because a transformed row will not scroll a
 * focused element into view by itself.
 */
export function HorizontalGallery({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rootEl = root.current
    const trackEl = track.current
    if (!rootEl || !trackEl || prefersReducedMotion()) return
    let revert = () => {}
    let cancelled = false

    loadGsap().then(({ gsap }) => {
      if (cancelled) return
      const mm = gsap.matchMedia()
      mm.add("(min-width: 1024px)", () => {
        rootEl.dataset.pinned = "true"
        const distance = () => Math.max(0, trackEl.scrollWidth - rootEl.clientWidth)
        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        const onFocus = (event: FocusEvent) => {
          const st = tween.scrollTrigger
          const card = (event.target as HTMLElement).closest<HTMLElement>("[data-gallery-item]")
          if (!st || !card || !distance()) return
          const progress = Math.min(1, Math.max(0, (card.offsetLeft - rootEl.clientWidth / 3) / distance()))
          st.scroll(st.start + progress * (st.end - st.start))
        }
        trackEl.addEventListener("focusin", onFocus)

        return () => {
          trackEl.removeEventListener("focusin", onFocus)
          delete rootEl.dataset.pinned
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
    <div ref={root} className={`gallery ${className}`}>
      <div className="gallery-viewport">
        <div ref={track} className="gallery-track">
          {children}
        </div>
      </div>
    </div>
  )
}
