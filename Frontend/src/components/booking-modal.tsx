"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, m } from "framer-motion"
import { X, CalendarDays, PhoneCall, ArrowRight, CheckCircle2, Loader2, Clock, MessageSquareText, FileCheck2 } from "lucide-react"
import { API_BASE_URL } from "@/lib/api"
import { trackEvent } from "@/lib/analytics"
import { OPEN_BOOKING_MODAL_EVENT, type BookingRequest } from "@/lib/booking"
import { Turnstile, type TurnstileHandle } from "@/components/turnstile"
import { TURNSTILE_ENABLED, turnstileHeaders } from "@/lib/turnstile"

type BookingSlot = {
  startsAt: string
  endsAt: string
  label: string
}

type BookingResult = { startsAt: string; endsAt: string }

/** The studio's calendar runs in India time; slots are fetched per IST date. */
const STUDIO_TIMEZONE = "Asia/Kolkata"
const CALL_METHODS = ["WhatsApp call", "Phone call", "Google Meet"] as const
type CallMethod = (typeof CALL_METHODS)[number]

const LENIS_SCROLL_LOCK_EVENT = "lenis-scroll-lock"

// Re-exported for existing importers; new code should import from
// "@/lib/booking" so the modal stays out of the first-load bundle.
export { openBookingModal } from "@/lib/booking"

function visitorTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || STUDIO_TIMEZONE
  } catch {
    return STUDIO_TIMEZONE
  }
}

/** YYYY-MM-DD of an instant in a zone. */
function dateInZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(date)
}

/**
 * The next ten working days on the studio calendar (no Sundays). Built from
 * India dates, not the browser's UTC date, which picked the wrong day before
 * 05:30 IST.
 */
function studioDates(): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = []
  const seen = new Set<string>()
  for (let i = 0; out.length < 10 && i < 16; i++) {
    const value = dateInZone(new Date(Date.now() + i * 86_400_000), STUDIO_TIMEZONE)
    if (seen.has(value)) continue
    seen.add(value)
    const noon = new Date(`${value}T12:00:00Z`)
    if (noon.getUTCDay() === 0) continue
    const label = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(noon)
    out.push({ value, label })
  }
  return out
}

function timeLabel(iso: string, timeZone: string, withDay: boolean): string {
  return new Intl.DateTimeFormat("en-GB", {
    ...(withDay ? { weekday: "short" as const } : {}),
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date(iso))
}

function fullLabel(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date(iso))
}

/** "Gulf Standard Time", falling back to the zone id. */
function zoneName(timeZone: string): string {
  try {
    const part = new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "long" })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")
    return part?.value || timeZone.replace(/_/g, " ")
  } catch {
    return timeZone.replace(/_/g, " ")
  }
}

function googleCalendarLink(result: BookingResult): string {
  const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Discovery call with NextGen Fusion",
    dates: `${fmt(result.startsAt)}/${fmt(result.endsAt)}`,
    details: "Free 30-minute discovery call. To change the time, reply to the confirmation email.",
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

const emptyForm = {
  conversationId: "",
  requestType: "meeting" as "meeting" | "callback",
  name: "",
  email: "",
  phone: "",
  companyName: "",
  projectSummary: "",
  budget: "",
  timeline: "",
  preferredContactTime: "",
  aiContext: "",
  selectedDate: "",
  scheduledAt: "",
  endsAt: "",
  callMethod: "WhatsApp call" as CallMethod,
}

export default function BookingModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")
  const [loading, setLoading] = useState(false)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState(false)
  const [slotsAttempt, setSlotsAttempt] = useState(0)
  const [error, setError] = useState("")
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<TurnstileHandle>(null)
  const captchaReady = !TURNSTILE_ENABLED || captchaToken !== null
  const [result, setResult] = useState<BookingResult | null>(null)
  const [slots, setSlots] = useState<BookingSlot[]>([])
  const [showExtras, setShowExtras] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [timezone, setTimezone] = useState(STUDIO_TIMEZONE)
  const dateOptions = useMemo(() => (open ? studioDates() : []), [open])

  const isMeeting = form.requestType === "meeting"
  const phoneRequired = !isMeeting || form.callMethod !== "Google Meet"
  const set = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    function onOpen(event: Event) {
      const detail = (event as CustomEvent<BookingRequest>).detail || {}
      setForm((prev) => ({
        ...prev,
        conversationId: detail.conversationId || prev.conversationId,
        requestType: detail.requestType || "meeting",
        name: detail.name || prev.name,
        email: detail.email || prev.email,
        phone: detail.phone || prev.phone,
        companyName: detail.companyName || prev.companyName,
        projectSummary: detail.projectSummary || prev.projectSummary,
        budget: detail.budget || prev.budget,
        timeline: detail.timeline || prev.timeline,
        aiContext: detail.aiContext || prev.aiContext,
      }))
      setShowExtras(Boolean(detail.companyName || detail.budget || detail.timeline))
      setTimezone(visitorTimezone())
      setError("")
      setResult(null)
      setStep("form")
      setOpen(true)
    }

    window.addEventListener(OPEN_BOOKING_MODAL_EVENT, onOpen as EventListener)
    return () => window.removeEventListener(OPEN_BOOKING_MODAL_EVENT, onOpen as EventListener)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const bodyStyle = document.body.style
    const htmlStyle = document.documentElement.style
    const previous = {
      bodyOverflow: bodyStyle.overflow,
      bodyOverscroll: bodyStyle.overscrollBehavior,
      bodyPosition: bodyStyle.position,
      bodyTop: bodyStyle.top,
      bodyWidth: bodyStyle.width,
      htmlOverflow: htmlStyle.overflow,
      htmlOverscroll: htmlStyle.overscrollBehavior,
    }

    window.dispatchEvent(new CustomEvent(LENIS_SCROLL_LOCK_EVENT, { detail: { locked: true } }))
    bodyStyle.overflow = "hidden"
    bodyStyle.overscrollBehavior = "none"
    bodyStyle.position = "fixed"
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.width = "100%"
    htmlStyle.overflow = "hidden"
    htmlStyle.overscrollBehavior = "none"

    return () => {
      window.dispatchEvent(new CustomEvent(LENIS_SCROLL_LOCK_EVENT, { detail: { locked: false } }))
      bodyStyle.overflow = previous.bodyOverflow
      bodyStyle.overscrollBehavior = previous.bodyOverscroll
      bodyStyle.position = previous.bodyPosition
      bodyStyle.top = previous.bodyTop
      bodyStyle.width = previous.bodyWidth
      htmlStyle.overflow = previous.htmlOverflow
      htmlStyle.overscrollBehavior = previous.htmlOverscroll
      window.scrollTo(0, scrollY)
    }
  }, [open])

  useEffect(() => {
    if (!open || !isMeeting) return
    if (!form.selectedDate) {
      const first = dateOptions[0]?.value
      if (first) setForm((prev) => ({ ...prev, selectedDate: first }))
      return
    }

    let ignore = false
    setSlotsLoading(true)
    setSlotsError(false)
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/bookings/availability?date=${encodeURIComponent(form.selectedDate)}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || "Could not load times. Please try again.")
        if (!ignore) setSlots(json.data || [])
      } catch {
        if (ignore) return
        setSlotsError(true)
        setSlots([])
      } finally {
        if (!ignore) setSlotsLoading(false)
      }
    })()

    return () => {
      ignore = true
    }
  }, [open, isMeeting, form.selectedDate, dateOptions, slotsAttempt])

  async function submitBookingRequest(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !captchaReady) return
    if (phoneRequired && !form.phone) {
      setError("Please add a phone number we can reach you on.")
      return
    }
    if (isMeeting && !form.scheduledAt) {
      setError("Please pick a time for the call.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...turnstileHeaders(captchaToken) },
        body: JSON.stringify({ ...form, timezone }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Something went wrong. Please try again.")
      if (isMeeting) {
        setResult({ startsAt: json.data?.scheduled_at || form.scheduledAt, endsAt: json.data?.ends_at || form.endsAt })
      }
      trackEvent("book_call_confirmed", { request_type: form.requestType })
      setStep("success")
      setForm((prev) => ({ ...prev, scheduledAt: "", endsAt: "" }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      captchaRef.current?.reset()
    } finally {
      setLoading(false)
    }
  }

  const selectedDateIndia = form.selectedDate
  const chosenSlotLabel = form.scheduledAt ? timeLabel(form.scheduledAt, timezone, true) : ""
  const differentZone = timezone !== STUDIO_TIMEZONE

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/55 md:items-center md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl md:h-[min(90dvh,820px)] md:max-w-4xl md:rounded-3xl lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
          >
            {/* What to expect: the reason to book, shown beside the form on large screens. */}
            <aside className="hidden min-w-0 flex-col justify-between overflow-y-auto bg-ink p-8 text-white lg:flex">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-light">
                  {isMeeting ? <CalendarDays className="h-3.5 w-3.5" /> : <PhoneCall className="h-3.5 w-3.5" />}
                  {isMeeting ? "Free discovery call" : "Request a callback"}
                </div>
                <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-tight xl:text-3xl">
                  {isMeeting ? "Talk through your project in 30 minutes" : "Tell us when to call you"}
                </h2>
                <ul className="mt-8 space-y-5 text-sm leading-6 text-white/80">
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-light" />
                    <span>Free, 30 minutes, no obligation. On WhatsApp, a phone call or Google Meet.</span>
                  </li>
                  <li className="flex gap-3">
                    <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-brand-light" />
                    <span>You talk to the people who would build it, not a salesperson.</span>
                  </li>
                  <li className="flex gap-3">
                    <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-light" />
                    <span>A fixed written quote after the call, usually within one working day.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-white/50">Your details are used only to arrange and prepare for the call.</p>
            </aside>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4 sm:px-6">
                <div>
                  <h2 id="booking-title" className="text-lg font-semibold text-ink sm:text-xl">
                    {step === "success"
                      ? isMeeting ? "You're booked" : "Request received"
                      : isMeeting ? "Book a free 30-minute call" : "Request a callback"}
                  </h2>
                  {step === "form" && (
                    <p className="mt-0.5 text-sm text-ink-soft lg:hidden">
                      {isMeeting ? "Pick a time, tell us a little, and we'll come prepared." : "Leave your number and the best time to call."}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="-mr-1 shrink-0 rounded-full p-2 text-ink-mute transition hover:bg-white/70 hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {step === "form" && (
                <form onSubmit={submitBookingRequest} className="flex min-h-0 flex-1 flex-col">
                  <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
                    {isMeeting && (
                      <section>
                        <SectionTitle>Pick a time</SectionTitle>
                        <div className="-mx-5 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6">
                          {dateOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, selectedDate: option.value, scheduledAt: "", endsAt: "" }))}
                              aria-pressed={selectedDateIndia === option.value}
                              className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                                selectedDateIndia === option.value
                                  ? "border-gray-900 bg-ink text-white"
                                  : "border-ink/10 bg-white text-ink hover:border-gray-400"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        <div className="mt-3">
                          {slotsLoading ? (
                            <div className="flex items-center gap-2 py-3 text-sm text-ink-soft">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Loading times…
                            </div>
                          ) : slotsError ? (
                            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                              We couldn&apos;t load the times.{" "}
                              <button type="button" onClick={() => setSlotsAttempt((n) => n + 1)} className="font-semibold underline underline-offset-2">
                                Try again
                              </button>
                            </p>
                          ) : slots.length === 0 ? (
                            <p className="rounded-xl bg-white/50 px-4 py-3 text-sm text-ink-soft">
                              No times left on this day. Please pick another date.
                            </p>
                          ) : (
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                              {slots.map((slot) => {
                                const otherDay = dateInZone(new Date(slot.startsAt), timezone) !== selectedDateIndia
                                return (
                                  <button
                                    key={slot.startsAt}
                                    type="button"
                                    onClick={() => setForm((p) => ({ ...p, scheduledAt: slot.startsAt, endsAt: slot.endsAt }))}
                                    aria-pressed={form.scheduledAt === slot.startsAt}
                                    className={`min-h-11 rounded-xl border px-2 py-2 text-sm font-medium transition ${
                                      form.scheduledAt === slot.startsAt
                                        ? "border-gray-900 bg-ink text-white"
                                        : "border-ink/10 bg-white text-ink hover:border-gray-400"
                                    }`}
                                  >
                                    {timeLabel(slot.startsAt, timezone, otherDay)}
                                  </button>
                                )
                              })}
                            </div>
                          )}
                          <p className="mt-2 text-xs text-ink-mute">
                            Times are shown in your time zone ({zoneName(timezone)}).
                          </p>
                        </div>
                      </section>
                    )}

                    <section className="space-y-4">
                      <SectionTitle>Your details</SectionTitle>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Name">
                          <input value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={inputClass} required />
                        </Field>
                        <Field label="Email">
                          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" inputMode="email" className={inputClass} required />
                        </Field>
                      </div>

                      {isMeeting && (
                        <fieldset>
                          <legend className="mb-2 block text-sm font-medium text-ink">How should we connect?</legend>
                          <div className="flex flex-wrap gap-2">
                            {CALL_METHODS.map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => set("callMethod", method)}
                                aria-pressed={form.callMethod === method}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                  form.callMethod === method
                                    ? "border-gray-900 bg-ink text-white"
                                    : "border-ink/10 bg-white text-ink hover:border-gray-400"
                                }`}
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                      )}

                      <Field label={phoneRequired ? "Phone (with country code)" : "Phone (optional)"}>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+91 98765 43210"
                          className={inputClass}
                          required={phoneRequired}
                        />
                      </Field>

                      {isMeeting ? (
                        <Field label="What would you like to discuss?">
                          <textarea
                            value={form.projectSummary}
                            onChange={(e) => set("projectSummary", e.target.value)}
                            rows={3}
                            placeholder="e.g. A new website for our clinic with online booking"
                            className={inputClass}
                          />
                        </Field>
                      ) : (
                        <Field label="Best time to call you">
                          <input
                            value={form.preferredContactTime}
                            onChange={(e) => set("preferredContactTime", e.target.value)}
                            placeholder="e.g. Today after 6 pm, or tomorrow morning"
                            className={inputClass}
                          />
                        </Field>
                      )}

                      <div>
                        <button
                          type="button"
                          onClick={() => setShowExtras((v) => !v)}
                          aria-expanded={showExtras}
                          className="text-sm font-medium text-brand underline-offset-4 hover:underline"
                        >
                          {showExtras ? "Hide extra details" : "Add company, budget or timeline (optional)"}
                        </button>
                        {showExtras && (
                          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Field label="Company">
                              <input value={form.companyName} onChange={(e) => set("companyName", e.target.value)} autoComplete="organization" className={inputClass} />
                            </Field>
                            <Field label="Budget">
                              <input value={form.budget} onChange={(e) => set("budget", e.target.value)} placeholder="Rough range" className={inputClass} />
                            </Field>
                            <Field label="Timeline">
                              <input value={form.timeline} onChange={(e) => set("timeline", e.target.value)} placeholder="e.g. 6 weeks" className={inputClass} />
                            </Field>
                          </div>
                        )}
                      </div>
                    </section>

                    <Turnstile ref={captchaRef} action="booking" onToken={setCaptchaToken} />
                    {error && (
                      <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-ink/10 bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
                    {isMeeting && (
                      <p className="mb-2 text-sm text-ink-soft" aria-live="polite">
                        {chosenSlotLabel ? (
                          <>
                            Your call: <span className="font-semibold text-ink">{chosenSlotLabel}</span>
                          </>
                        ) : (
                          "Pick a time above"
                        )}
                      </p>
                    )}
                    <button type="submit" disabled={loading || !captchaReady} className={primaryButtonClass}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      {loading ? "Booking…" : isMeeting ? "Confirm booking" : "Request callback"}
                      {!loading && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  {isMeeting && result ? (
                    <>
                      <p className="mt-5 text-xl font-semibold text-ink">{fullLabel(result.startsAt, timezone)}</p>
                      <p className="mt-1 text-sm text-ink-soft">
                        {zoneName(timezone)} · {form.callMethod}
                        {differentZone && <> · {timeLabel(result.startsAt, STUDIO_TIMEZONE, false)} in India</>}
                      </p>
                      <p className="mt-4 max-w-md text-sm leading-6 text-ink-soft">
                        A confirmation is on its way to <span className="font-medium text-ink">{form.email}</span>. To change the time, just reply to it.
                      </p>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <a href={googleCalendarLink(result)} target="_blank" rel="noopener noreferrer" className={primaryButtonClass}>
                          <CalendarDays className="h-4 w-4" />
                          Add to Google Calendar
                        </a>
                        <button type="button" onClick={() => setOpen(false)} className={secondaryButtonClass}>
                          Done
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-5 max-w-md text-sm leading-6 text-ink-soft">
                        Thanks, {form.name.split(" ")[0]}. We&apos;ll call you on {form.phone}
                        {form.preferredContactTime ? `, ${form.preferredContactTime.toLowerCase()}` : " soon"}.
                      </p>
                      <button type="button" onClick={() => setOpen(false)} className={`mt-6 ${secondaryButtonClass}`}>
                        Done
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-mute">{children}</h3>
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 sm:text-sm"
const primaryButtonClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
const secondaryButtonClass =
  "inline-flex w-full items-center justify-center rounded-full border border-ink/10 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/50 sm:w-auto"
