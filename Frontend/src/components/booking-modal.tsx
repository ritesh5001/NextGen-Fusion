"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, CalendarDays, PhoneCall, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

type BookingState = {
  open: boolean
  conversationId?: string
  name?: string
  email?: string
  phone?: string
  companyName?: string
  projectSummary?: string
  budget?: string
  timeline?: string
  aiContext?: string
  requestType?: "meeting" | "callback"
}

type BookingSlot = {
  startsAt: string
  endsAt: string
  label: string
}

export function openBookingModal(detail: Partial<BookingState> = {}) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent("open-booking-modal", { detail }))
}

export default function BookingModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")
  const [loading, setLoading] = useState(false)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [error, setError] = useState("")
  const [bookingResponse, setBookingResponse] = useState<any>(null)
  const [slots, setSlots] = useState<BookingSlot[]>([])
  const [form, setForm] = useState({
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
    slotLabel: "",
    timezone: "Asia/Kolkata",
  })

  useEffect(() => {
    function onOpen(event: Event) {
      const detail = (event as CustomEvent<Partial<BookingState>>).detail || {}
      setForm((prev) => ({
        ...prev,
        conversationId: detail.conversationId || prev.conversationId,
        requestType: detail.requestType || prev.requestType,
        name: detail.name || prev.name,
        email: detail.email || prev.email,
        phone: detail.phone || prev.phone,
        companyName: detail.companyName || prev.companyName,
        projectSummary: detail.projectSummary || prev.projectSummary,
        budget: detail.budget || prev.budget,
        timeline: detail.timeline || prev.timeline,
        aiContext: detail.aiContext || prev.aiContext,
      }))
      setError("")
      setBookingResponse(null)
      setStep("form")
      setOpen(true)
    }

    window.addEventListener("open-booking-modal", onOpen as EventListener)
    return () => window.removeEventListener("open-booking-modal", onOpen as EventListener)
  }, [])

  const dateOptions = useMemo(() => {
    const out: Array<{ value: string; label: string }> = []
    const now = new Date()
    for (let i = 0; i < 10; i++) {
      const d = new Date(now)
      d.setDate(now.getDate() + i)
      const weekday = d.getDay()
      if (weekday === 0) continue
      const value = d.toISOString().slice(0, 10)
      const label = new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(d)
      out.push({ value, label })
    }
    return out
  }, [])

  useEffect(() => {
    if (!open || form.requestType !== "meeting") return
    if (!form.selectedDate) {
      const firstDate = dateOptions[0]?.value || ""
      if (firstDate) setForm((prev) => ({ ...prev, selectedDate: firstDate }))
      return
    }

    let ignore = false
    setSlotsLoading(true)
    setError("")
    ;(async () => {
      try {
        const res = await fetch(`/api/bookings/availability?date=${encodeURIComponent(form.selectedDate)}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || "Failed to load slots")
        if (ignore) return
        setSlots(json.data || [])
      } catch (err) {
        if (ignore) return
        setError(err instanceof Error ? err.message : "Failed to load slots")
        setSlots([])
      } finally {
        if (!ignore) setSlotsLoading(false)
      }
    })()

    return () => { ignore = true }
  }, [open, form.requestType, form.selectedDate, dateOptions])

  async function submitBookingRequest(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email) return
    if (form.requestType === "meeting" && (!form.scheduledAt || !form.endsAt || !form.slotLabel)) {
      setError("Please select an available slot.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/bookings/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to save booking request")
      setBookingResponse(json.data)
      setStep("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save booking request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-4 py-4 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#f7f4ec] shadow-[0_35px_120px_rgba(0,0,0,0.28)]"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full border border-[#d9d0bc] bg-white p-2 text-[#282620] transition hover:bg-[#f4efe5]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-[#e6dfcf] bg-[#121419] p-7 text-white lg:border-b-0 lg:border-r">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[#f2d799]">
                  {form.requestType === "meeting" ? <CalendarDays className="h-3.5 w-3.5" /> : <PhoneCall className="h-3.5 w-3.5" />}
                  {form.requestType === "meeting" ? "Book Discovery Call" : "Request Callback"}
                </div>
                <h3 className="mt-5 text-3xl font-semibold tracking-tight">
                  {form.requestType === "meeting" ? "Schedule without leaving the website." : "Leave the details and get a callback."}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  {form.requestType === "meeting"
                    ? "Choose a real time slot directly on your website. Confirmed bookings are saved to your database immediately."
                    : "This request lands in your admin panel immediately with the context from the chat or booking trigger."}
                </p>
              </div>

              <div className="bg-white">
                {step === "form" && (
                  <form onSubmit={submitBookingRequest} className="space-y-4 p-6 md:p-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Field label="Name">
                        <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputClass} required />
                      </Field>
                      <Field label="Email">
                        <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={inputClass} required />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Field label="Phone">
                        <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className={inputClass} />
                      </Field>
                      <Field label="Company">
                        <input value={form.companyName} onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))} className={inputClass} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Field label="Budget">
                        <input value={form.budget} onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))} placeholder="e.g. 1.5L to 3L" className={inputClass} />
                      </Field>
                      <Field label="Timeline">
                        <input value={form.timeline} onChange={(e) => setForm((p) => ({ ...p, timeline: e.target.value }))} placeholder="e.g. 6 weeks" className={inputClass} />
                      </Field>
                    </div>
                    <Field label={form.requestType === "meeting" ? "What should we discuss?" : "Best time to call you back"}>
                      {form.requestType === "meeting" ? (
                        <textarea value={form.projectSummary} onChange={(e) => setForm((p) => ({ ...p, projectSummary: e.target.value }))} rows={4} className={textareaClass} />
                      ) : (
                        <input value={form.preferredContactTime} onChange={(e) => setForm((p) => ({ ...p, preferredContactTime: e.target.value }))} placeholder="Today after 7 PM / Tomorrow morning" className={inputClass} />
                      )}
                    </Field>
                    {form.requestType === "meeting" && (
                      <>
                        <Field label="Select a date">
                          <div className="flex flex-wrap gap-2">
                            {dateOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => setForm((p) => ({ ...p, selectedDate: option.value, scheduledAt: "", endsAt: "", slotLabel: "" }))}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                  form.selectedDate === option.value
                                    ? "border-[#111318] bg-[#111318] text-white"
                                    : "border-[#ddd4c0] bg-white text-[#2a2926] hover:border-[#b9aa82] hover:bg-[#faf7f1]"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </Field>
                        <Field label="Available slots">
                          {slotsLoading ? (
                            <div className="flex items-center gap-2 rounded-2xl border border-[#e1d9c8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#605948]">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Loading slots…
                            </div>
                          ) : slots.length === 0 ? (
                            <div className="rounded-2xl border border-[#e1d9c8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#605948]">
                              No slots available on this date.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {slots.map((slot) => (
                                <button
                                  key={slot.startsAt}
                                  type="button"
                                  onClick={() => setForm((p) => ({ ...p, scheduledAt: slot.startsAt, endsAt: slot.endsAt, slotLabel: slot.label }))}
                                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                                    form.scheduledAt === slot.startsAt
                                      ? "border-[#111318] bg-[#111318] text-white"
                                      : "border-[#e1d9c8] bg-[#fbfaf7] text-[#1f1f1f] hover:border-[#b9aa82]"
                                  }`}
                                >
                                  {slot.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </Field>
                      </>
                    )}
                    {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                    <button type="submit" disabled={loading} className={primaryButtonClass}>
                      {loading ? "Saving..." : form.requestType === "meeting" ? "Confirm booking" : "Request callback"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                {step === "success" && (
                  <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="mt-5 text-2xl font-semibold text-[#171717]">
                      {form.requestType === "meeting" ? "Booking confirmed." : "Callback request saved."}
                    </h4>
                    <p className="mt-3 max-w-md text-sm leading-7 text-[#666050]">
                      {form.requestType === "meeting"
                        ? "The meeting is now saved in your database and the internal notification email has been triggered."
                        : "Your request is now in the admin panel. The team can follow up using the details you submitted."}
                    </p>
                    {bookingResponse?.email && (
                      <p className="mt-3 text-sm font-medium text-[#171717]">{bookingResponse.email}</p>
                    )}
                    {bookingResponse?.slot_label && (
                      <p className="mt-2 text-sm text-[#605948]">{bookingResponse.slot_label}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#3f3a32]">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  "w-full rounded-2xl border border-[#e1d9c8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#1f1f1f] outline-none transition focus:border-[#111318] focus:ring-2 focus:ring-[#111318]/10"
const textareaClass =
  "w-full rounded-3xl border border-[#e1d9c8] bg-[#fbfaf7] px-4 py-3 text-sm leading-6 text-[#1f1f1f] outline-none transition focus:border-[#111318] focus:ring-2 focus:ring-[#111318]/10"
const primaryButtonClass =
  "inline-flex items-center gap-2 rounded-full bg-[#111318] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1a1d24] disabled:cursor-not-allowed disabled:opacity-60"
