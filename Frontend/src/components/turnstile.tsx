"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { TURNSTILE_ENABLED, TURNSTILE_SITE_KEY } from "@/lib/turnstile"

/**
 * Cloudflare Turnstile, the CAPTCHA on every public form.
 *
 * In "interaction-only" mode most visitors never see it: Cloudflare checks the
 * browser in the background and only shows a checkbox when it is unsure. The
 * token it produces is sent with the form in the `x-turnstile-token` header and
 * verified by the Backend (lib/turnstile.ts). Tokens are single-use, so a form
 * calls `reset()` after every submission attempt.
 *
 * Without NEXT_PUBLIC_TURNSTILE_SITE_KEY (local development) nothing renders and
 * forms submit without a token; the Backend skips the check when its secret is
 * unset too.
 */
type TurnstileApi = {
  render(
    container: HTMLElement,
    options: {
      sitekey: string
      action?: string
      appearance?: "always" | "execute" | "interaction-only"
      theme?: "light" | "dark" | "auto"
      size?: "normal" | "flexible" | "compact"
      callback?: (token: string) => void
      "expired-callback"?: () => void
      "error-callback"?: () => void
    },
  ): string
  reset(widgetId: string): void
  remove(widgetId: string): void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
let scriptPromise: Promise<TurnstileApi> | null = null

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.async = true
    script.defer = true
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile failed to load")))
    script.onerror = () => {
      scriptPromise = null
      reject(new Error("Turnstile failed to load"))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

export type TurnstileHandle = { reset(): void }

type TurnstileProps = {
  /** Called with a fresh token, or null when it expires or fails. */
  onToken(token: string | null): void
  /** Shown in the Cloudflare dashboard, e.g. "contact" or "booking". */
  action: string
  className?: string
}

export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { onToken, action, className },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  useImperativeHandle(ref, () => ({
    reset() {
      onTokenRef.current(null)
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current)
    },
  }))

  useEffect(() => {
    if (!TURNSTILE_ENABLED || !containerRef.current) return
    let cancelled = false
    const container = containerRef.current

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled) return
        widgetIdRef.current = turnstile.render(container, {
          sitekey: TURNSTILE_SITE_KEY,
          action,
          appearance: "interaction-only",
          theme: "light",
          size: "flexible",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        })
      })
      .catch(() => onTokenRef.current(null))

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current)
      widgetIdRef.current = null
    }
  }, [action])

  if (!TURNSTILE_ENABLED) return null
  return <div ref={containerRef} className={className} />
})
