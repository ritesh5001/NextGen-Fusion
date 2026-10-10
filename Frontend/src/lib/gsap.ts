import type { gsap as GsapType } from "gsap"
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger"

type Gsap = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType }

let loading: Promise<Gsap> | null = null
let loaded: Gsap | null = null

/**
 * GSAP and ScrollTrigger, loaded on demand and registered once.
 *
 * Every scroll effect calls this from an effect rather than importing gsap at
 * module level, so the library never lands in a page's first-load JS — it
 * arrives as its own chunk after hydration, and only on pages that animate.
 */
export function loadGsap(): Promise<Gsap> {
  if (!loading) {
    loading = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger)
      loaded = { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger }
      watchPageHeight(st.ScrollTrigger)
      return loaded
    })
  }
  return loading
}

/**
 * Below-the-fold sections use `content-visibility: auto` (.defer-render), so
 * their real height only arrives as they near the viewport — and lazy images
 * do the same. ScrollTrigger caches trigger positions and only re-measures on
 * window resize, so without this every trigger further down drifts. A settled
 * change in page height triggers one refresh.
 */
function watchPageHeight(scrollTrigger: typeof ScrollTriggerType) {
  let lastHeight = document.body.scrollHeight
  let timer = 0
  new ResizeObserver(() => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      const height = document.body.scrollHeight
      if (Math.abs(height - lastHeight) < 2) return
      lastHeight = height
      scrollTrigger.refresh()
    }, 180)
  }).observe(document.body)
}

/** ScrollTrigger caches positions; call after a route change has painted. */
export function refreshScrollTriggers() {
  loaded?.ScrollTrigger.refresh()
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
