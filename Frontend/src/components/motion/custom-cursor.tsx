"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/lib/gsap"

/**
 * Replaces the system pointer with a dot that tracks the mouse almost 1:1 and
 * a ring that trails it. The ring inverts colour (mix-blend-mode: difference),
 * so it stays visible on the light page, dark panels and blue buttons.
 *
 * The system pointer is hidden only once this has mounted (`html.has-cursor`),
 * so a slow or failed script never leaves the page without a pointer. Desktop
 * with a mouse only; touch and reduced motion keep the system pointer.
 *
 * States, read from the element under the pointer:
 * - links, buttons, [role=button]           → ring fills ("link")
 * - .btn and [data-cursor="stick"]           → ring wraps the button's pill
 * - disabled / aria-disabled                 → ring turns red with a slash
 * - text fields, contenteditable             → custom cursor hides, I-beam shows
 * - iframes (booking widget, Turnstile)      → custom cursor hides
 * - [data-cursor="hide"]                     → custom cursor hides
 * - any other [data-cursor="Label"]          → large ring with that label
 */
const KEYWORDS = new Set(["link", "stick", "disabled", "hide", "text", "default"])
const INTERACTIVE = "a[href], button, [role='button'], summary, label[for], select"
const TEXT = "input:not([type='checkbox']):not([type='radio']):not([type='button']):not([type='submit']), textarea, [contenteditable='true']"

type State = "default" | "link" | "stick" | "label" | "disabled" | "hide" | "text"

function resolve(target: Element | null): { state: State; label?: string; stick?: HTMLElement } {
  if (!target) return { state: "default" }
  if (target.closest("iframe")) return { state: "hide" }
  if (target.closest(TEXT)) return { state: "text" }

  const tagged = target.closest<HTMLElement>("[data-cursor]")
  const value = tagged?.dataset.cursor
  if (tagged && value && !KEYWORDS.has(value)) return { state: "label", label: value }

  const interactive = target.closest<HTMLElement>(INTERACTIVE)
  const disabled = target.closest("[disabled], [aria-disabled='true']")
  if (disabled && (!interactive || disabled.contains(interactive) || interactive.contains(disabled))) return { state: "disabled" }

  if (value === "hide" || value === "text") return { state: value }
  if (value === "default") return { state: "default" }
  if (value === "stick") return { state: "stick", stick: tagged ?? undefined }
  if (value === "link") return { state: "link" }

  const pill = target.closest<HTMLElement>(".btn")
  if (pill) return { state: "stick", stick: pill }
  if (interactive) return { state: "link" }
  return { state: "default" }
}

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return
    if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return
    if (prefersReducedMotion()) return

    const root = document.documentElement
    root.classList.add("has-cursor")

    let mx = -100, my = -100
    let dx = mx, dy = my, rx = mx, ry = my
    let stick: HTMLElement | undefined
    let frame = 0
    let running = false
    let lastTarget: Element | null = null

    const apply = (target: Element | null) => {
      if (target === lastTarget) return
      lastTarget = target
      const next = resolve(target)
      root.dataset.cursorState = next.state
      stick = next.stick
      ring.textContent = next.label ?? ""
      if (!stick) {
        ring.style.width = ""
        ring.style.height = ""
        ring.style.margin = ""
      }
    }

    const tick = () => {
      dx += (mx - dx) * 0.55
      dy += (my - dy) * 0.55
      if (stick && stick.isConnected) {
        const box = stick.getBoundingClientRect()
        const cx = box.left + box.width / 2
        const cy = box.top + box.height / 2
        rx += (cx + (mx - cx) * 0.1 - rx) * 0.25
        ry += (cy + (my - cy) * 0.1 - ry) * 0.25
        const pad = 6
        ring.style.width = `${box.width + pad * 2}px`
        ring.style.height = `${box.height + pad * 2}px`
        ring.style.margin = `${-(box.height / 2 + pad)}px 0 0 ${-(box.width / 2 + pad)}px`
      } else {
        rx += (mx - rx) * 0.18
        ry += (my - ry) * 0.18
      }
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`

      const settled = Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1 && Math.abs(mx - dx) < 0.1 && !stick
      if (settled) {
        running = false
        return
      }
      frame = requestAnimationFrame(tick)
    }
    const wake = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        root.classList.remove("cursor-on")
        return
      }
      mx = event.clientX
      my = event.clientY
      if (!root.classList.contains("cursor-on")) {
        // First move after entering: jump instead of sliding in from a corner.
        dx = rx = mx
        dy = ry = my
        root.classList.add("cursor-on")
      }
      wake()
    }
    const onOver = (event: PointerEvent) => {
      if (event.pointerType === "mouse") apply(event.target as Element)
    }
    // Scrolling moves content under a still pointer without any pointer event.
    let scrollQueued = false
    const onScroll = () => {
      if (scrollQueued || !root.classList.contains("cursor-on")) return
      scrollQueued = true
      requestAnimationFrame(() => {
        scrollQueued = false
        apply(document.elementFromPoint(mx, my))
        wake()
      })
    }
    const hide = () => root.classList.remove("cursor-on")
    const onDown = () => root.classList.add("cursor-down")
    const onUp = () => root.classList.remove("cursor-down")

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    window.addEventListener("blur", hide)
    root.addEventListener("pointerleave", hide)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("blur", hide)
      root.removeEventListener("pointerleave", hide)
      root.classList.remove("has-cursor", "cursor-on", "cursor-down")
      delete root.dataset.cursorState
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
