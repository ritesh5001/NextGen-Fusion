"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { ReactNode } from 'react'

const LENIS_SCROLL_LOCK_EVENT = "lenis-scroll-lock"

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const lockCountRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      } as any)

      const raf = (time: number) => {
        lenisRef.current?.raf(time)
        rafIdRef.current = requestAnimationFrame(raf)
      }

      const handleScrollLock = (event: Event) => {
        const locked = Boolean((event as CustomEvent<{ locked?: boolean }>).detail?.locked)

        if (locked) {
          lockCountRef.current += 1
          lenisRef.current?.stop()
          return
        }

        lockCountRef.current = Math.max(0, lockCountRef.current - 1)
        if (lockCountRef.current === 0) {
          lenisRef.current?.start()
        }
      }

      window.addEventListener(LENIS_SCROLL_LOCK_EVENT, handleScrollLock as EventListener)
      rafIdRef.current = requestAnimationFrame(raf)

      return () => {
        window.removeEventListener(LENIS_SCROLL_LOCK_EVENT, handleScrollLock as EventListener)
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
        }
        lenisRef.current?.destroy()
        lenisRef.current = null
        lockCountRef.current = 0
      }
    }
  }, [])

  return <>{children}</>
}
