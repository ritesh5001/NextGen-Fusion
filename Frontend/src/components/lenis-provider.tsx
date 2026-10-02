"use client"

import { useEffect, type ReactNode } from "react"

const LENIS_SCROLL_LOCK_EVENT = "lenis-scroll-lock"

/**
 * Smooth wheel scrolling on desktop only.
 *
 * Lenis never smoothed touch scrolling here (smoothTouch: false), yet on phones
 * it still shipped in the first-load bundle and ran a requestAnimationFrame loop
 * for the life of the page. It now loads lazily, and only for a fine pointer
 * (mouse or trackpad) with motion allowed.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return

    let cancelled = false
    let rafId: number | null = null
    let lockCount = 0
    let lenis: { raf(time: number): void; stop(): void; start(): void; destroy(): void } | null = null

    const handleScrollLock = (event: Event) => {
      const locked = Boolean((event as CustomEvent<{ locked?: boolean }>).detail?.locked)
      if (locked) {
        lockCount += 1
        lenis?.stop()
        return
      }
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) lenis?.start()
    }

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
      window.addEventListener(LENIS_SCROLL_LOCK_EVENT, handleScrollLock as EventListener)
    })

    return () => {
      cancelled = true
      window.removeEventListener(LENIS_SCROLL_LOCK_EVENT, handleScrollLock as EventListener)
      if (rafId !== null) cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}
