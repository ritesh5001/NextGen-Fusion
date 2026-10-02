"use client"

import { useEffect, useRef, useState } from "react"

/**
 * True once the element is within `rootMargin` of the viewport, and stays true.
 *
 * Used to hold back below-the-fold images. Native `loading="lazy"` still starts
 * them up to ~2,500px ahead on a slow phone, which on the homepage meant about
 * 150 KB of screenshots downloading in parallel with the hero. Mounting the
 * <Image> only when it is close keeps first-load bandwidth for what is on screen.
 */
export function useNearViewport<T extends Element>(rootMargin = "400px") {
  const ref = useRef<T | null>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    if (typeof IntersectionObserver === "undefined") {
      setNear(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [near, rootMargin])

  return [ref, near] as const
}
