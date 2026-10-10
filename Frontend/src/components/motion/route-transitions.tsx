"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { prefersReducedMotion, refreshScrollTriggers } from "@/lib/gsap"

// Never animated: authenticated areas and the outbound redirect route.
const SKIP = /^\/(admin|portal|api|go)(\/|$)/

/**
 * Wraps internal navigations in the View Transitions API: the brand-blue wipe
 * and the project-image morph are both CSS (see "Route transitions" in
 * globals.css). Browsers without the API, reduced motion and modified clicks
 * fall through to a normal navigation.
 *
 * The click is intercepted in the capture phase with preventDefault only — not
 * stopPropagation — so React onClick handlers (analytics, menu close) still
 * run, and next/link sees `defaultPrevented` and leaves the navigation to us.
 */
export function RouteTransitions() {
  const router = useRouter()
  const pathname = usePathname()
  const finish = useRef<(() => void) | null>(null)

  useEffect(() => {
    finish.current?.()
    finish.current = null
    // Positions cached by ScrollTrigger belong to the previous page.
    requestAnimationFrame(() => refreshScrollTriggers())
  }, [pathname])

  useEffect(() => {
    if (!("startViewTransition" in document)) return

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (prefersReducedMotion()) return

      const anchor = (event.target as Element | null)?.closest?.("a")
      if (!anchor || !anchor.href) return
      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return // same page or a #fragment
      if (SKIP.test(url.pathname)) return

      event.preventDefault()

      // Only the clicked card's image gets the shared name, so a page listing
      // the same project twice never has duplicate transition names.
      const image = anchor.querySelector<HTMLElement>("[data-vt-image]")
      if (image) image.style.viewTransitionName = "case-hero"

      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            finish.current = resolve
            router.push(url.pathname + url.search + url.hash)
            // Never leave the page frozen if the route is slow to commit.
            window.setTimeout(resolve, 2500)
          }),
      )
      transition.finished.finally(() => {
        if (image) image.style.viewTransitionName = ""
      })
    }

    window.addEventListener("click", onClick, true)
    return () => window.removeEventListener("click", onClick, true)
  }, [router])

  return null
}
