"use client"

import { useEffect } from "react"
import { prefersReducedMotion } from "@/lib/gsap"

/**
 * One set of delegated listeners for pointer-driven hover effects, so
 * components only add a class or data attribute:
 *
 * - `.btn` and `[data-fill]`: sets --fill-x / --fill-y to where the pointer
 *   entered or left, so the hover fill (globals.css) grows from that point.
 * - `[data-tilt]`: sets --tilt-x / --tilt-y (degrees) and --spot-x / --spot-y
 *   (percent) for the 3D tilt and the spotlight that follows the pointer.
 * - `[data-wordmark]`: sets --lift (0–1) on each letter by its distance from
 *   the pointer, so the footer wordmark rises and glows as the pointer passes.
 *
 * Desktop with a mouse only; nothing runs for touch or reduced motion.
 */
export function HoverEffects() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return
    if (prefersReducedMotion()) return

    const setFill = (el: HTMLElement, event: PointerEvent) => {
      const box = el.getBoundingClientRect()
      el.style.setProperty("--fill-x", `${event.clientX - box.left}px`)
      el.style.setProperty("--fill-y", `${event.clientY - box.top}px`)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element
      const fill = target.closest<HTMLElement>(".btn, [data-fill]")
      if (fill && !fill.contains(event.relatedTarget as Node | null)) setFill(fill, event)
    }
    const onOut = (event: PointerEvent) => {
      const target = event.target as Element
      const fill = target.closest<HTMLElement>(".btn, [data-fill]")
      if (fill && !fill.contains(event.relatedTarget as Node | null)) setFill(fill, event)
      const word = target.closest<HTMLElement>("[data-wordmark]")
      if (word && !word.contains(event.relatedTarget as Node | null)) {
        for (const letter of Array.from(word.children) as HTMLElement[]) letter.style.setProperty("--lift", "0")
      }
      const tilt = target.closest<HTMLElement>("[data-tilt]")
      if (tilt && !tilt.contains(event.relatedTarget as Node | null)) {
        tilt.style.setProperty("--tilt-x", "0deg")
        tilt.style.setProperty("--tilt-y", "0deg")
      }
    }

    const liftLetters = (word: HTMLElement, x: number, y: number) => {
      for (const letter of Array.from(word.children) as HTMLElement[]) {
        const box = letter.getBoundingClientRect()
        const distance = Math.hypot(x - (box.left + box.width / 2), y - (box.top + box.height / 2))
        const lift = Math.max(0, 1 - distance / Math.max(160, box.height * 0.9))
        letter.style.setProperty("--lift", lift.toFixed(3))
      }
    }

    let pending: PointerEvent | null = null
    let frame = 0
    const flushTilt = () => {
      frame = 0
      const event = pending
      pending = null
      if (!event) return
      const word = (event.target as Element).closest<HTMLElement>("[data-wordmark]")
      if (word) liftLetters(word, event.clientX, event.clientY)
      const tilt = (event.target as Element).closest<HTMLElement>("[data-tilt]")
      if (!tilt) return
      const box = tilt.getBoundingClientRect()
      const px = (event.clientX - box.left) / box.width
      const py = (event.clientY - box.top) / box.height
      const max = Number(tilt.dataset.tilt) || 6
      tilt.style.setProperty("--tilt-x", `${((0.5 - py) * max * 2).toFixed(2)}deg`)
      tilt.style.setProperty("--tilt-y", `${((px - 0.5) * max * 2).toFixed(2)}deg`)
      tilt.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`)
      tilt.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`)
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      pending = event
      if (!frame) frame = requestAnimationFrame(flushTilt)
    }

    document.addEventListener("pointerover", onOver, { passive: true })
    document.addEventListener("pointerout", onOut, { passive: true })
    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("pointerover", onOver)
      document.removeEventListener("pointerout", onOut)
      document.removeEventListener("pointermove", onMove)
    }
  }, [])

  return null
}
