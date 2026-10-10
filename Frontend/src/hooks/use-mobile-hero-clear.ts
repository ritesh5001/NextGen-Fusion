"use client"

import { useEffect, useState } from "react"

/**
 * False while a phone is still showing the first screen of the page.
 *
 * The floating WhatsApp and assistant buttons sat on top of the hero's text
 * and its "Book a Free Call" button on phones. They now wait until the visitor
 * has scrolled most of a screen. Always true from the md breakpoint up, where
 * there is room for them.
 */
export function useMobileHeroClear(fraction = 0.6) {
  const [clear, setClear] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)")
    let frame = 0
    const update = () => {
      frame = 0
      setClear(desktop.matches || window.scrollY > window.innerHeight * fraction)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    desktop.addEventListener("change", update)
    return () => {
      window.removeEventListener("scroll", onScroll)
      desktop.removeEventListener("change", update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [fraction])

  return clear
}
