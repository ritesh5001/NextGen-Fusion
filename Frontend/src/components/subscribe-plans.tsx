"use client"

import { useState } from "react"
import { Check, X, Loader2, ShieldCheck } from "lucide-react"
import { API_BASE_URL } from "@/lib/api"
import { subscriptionPlans, type SubscriptionPlan } from "@/lib/subscription-plans"

const inr = (v: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v)

type RazorpayOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: { name: string; email: string; contact: string }
  theme: { color: string }
  handler: (resp: RazorpaySuccess) => void
  modal?: { ondismiss?: () => void }
}
type RazorpaySuccess = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}
type RazorpayConstructor = new (options: RazorpayOptions) => { open: () => void }

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false)
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) return resolve(true)
    const s = document.createElement("script")
    s.src = "https://checkout.razorpay.com/v1/checkout.js"
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

type Status = "idle" | "loading" | "success" | "error"

export default function SubscribePlans() {
  const [selected, setSelected] = useState<SubscriptionPlan | null>(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  const close = () => {
    if (status === "loading") return
    setSelected(null)
    setStatus("idle")
    setMessage("")
    setForm({ name: "", email: "", phone: "" })
  }

  async function pay() {
    if (!selected) return
    if (form.name.trim().length < 2 || !form.email.includes("@")) {
      setStatus("error")
      setMessage("Please enter your name and a valid email.")
      return
    }
    setStatus("loading")
    setMessage("")

    try {
      const sdkOk = await loadRazorpay()
      if (!sdkOk) throw new Error("Could not load the payment SDK. Check your connection and retry.")

      const orderRes = await fetch(`${API_BASE_URL}/payments/razorpay/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selected.id, ...form }),
      })
      const orderJson = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderJson?.error || "Could not start the payment.")

      const { orderId, amount, currency, keyId, plan } = orderJson.data
      const Razorpay = (window as unknown as { Razorpay: RazorpayConstructor }).Razorpay

      const rzp = new Razorpay({
        key: keyId,
        amount,
        currency,
        name: "NextGen Fusion",
        description: `${plan.name} — ${inr(plan.amount)}/${plan.period === "year" ? "yr" : "mo"}`,
        order_id: orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#2B35AB" },
        modal: {
          ondismiss: () => {
            setStatus("idle")
            setMessage("Payment cancelled.")
          },
        },
        handler: async (resp) => {
          try {
            const vRes = await fetch(`${API_BASE_URL}/payments/razorpay/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            })
            const vJson = await vRes.json()
            if (!vRes.ok || !vJson?.data?.verified) throw new Error(vJson?.error || "Verification failed.")
            setStatus("success")
            setMessage("Payment successful! We'll be in touch shortly to activate your plan.")
          } catch (e) {
            setStatus("error")
            setMessage(e instanceof Error ? e.message : "Verification failed.")
          }
        },
      })
      rzp.open()
    } catch (e) {
      setStatus("error")
      setMessage(e instanceof Error ? e.message : "Something went wrong.")
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-2xl border p-6 ${
              plan.highlighted ? "border-transparent ring-2 ring-[#8A38F5] shadow-lg" : "border-gray-200 shadow-sm"
            }`}
          >
            {plan.highlighted && (
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{plan.tagline}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">{inr(plan.amount)}</span>
              <span className="text-sm text-gray-500">/{plan.period === "year" ? "yr" : "mo"}</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => { setSelected(plan); setStatus("idle"); setMessage("") }}
              className={`mt-6 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                plan.highlighted
                  ? "bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] text-white hover:opacity-90"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Subscribe — {inr(plan.amount)}/{plan.period === "year" ? "yr" : "mo"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4" /> Secure payments by Razorpay · GST extra where applicable
      </p>

      {/* Checkout modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
                <p className="text-sm text-gray-500">
                  {inr(selected.amount)}/{selected.period === "year" ? "year" : "month"}
                </p>
              </div>
              <button onClick={close} className="rounded-full p-1 text-gray-400 hover:bg-gray-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {status === "success" ? (
              <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-center text-sm text-emerald-700">
                {message}
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="Work email"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="Phone (optional)"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                />

                {message && status === "error" && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{message}</p>
                )}

                <button
                  type="button"
                  onClick={pay}
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {status === "loading" ? "Starting…" : `Pay ${inr(selected.amount)}`}
                </button>
                <p className="text-center text-xs text-gray-400">Powered by Razorpay · UPI, cards, netbanking</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
