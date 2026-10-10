"use client"

import { useEffect } from "react"

/**
 * Phones have no hover, so effects written for :hover never showed there. On
 * touch devices this marks whichever card is crossing the middle of the
 * screen with `.is-inview`, and globals.css gives that class the same look as
 * :hover. A single observer for the whole site; does nothing on desktop.
 */
const SELECTORS = ".step-card, .svc-row, .logo-tile, .svc-pillar"

export function TouchInView() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-inview", entry.isIntersecting)),
      // A thin band across the middle of the screen: one card at a time.
      { rootMargin: "-42% 0px -42% 0px" },
    )
    const watch = () => document.querySelectorAll(SELECTORS).forEach((el) => observer.observe(el))
    watch()
    // Sections are code-split, so some arrive after this first pass.
    const mutations = new MutationObserver(watch)
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [])

  return null
}
