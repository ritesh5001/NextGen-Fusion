"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, X, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react"
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

// Same-origin client API (the Next proxy forwards the session cookie). 200 means
// the visitor is logged in as a portal account.
async function isLoggedIn(): Promise<boolean> {
  try {
    const res = await fetch("/api/client/profile", { cache: "no-store" })
    return res.ok
  } catch {
    return false
  }
}

type Status = "idle" | "loading" | "success" | "error"

export default function SubscribePlans({ plans = subscriptionPlans }: { plans?: SubscriptionPlan[] }) {
  const router = useRouter()
  const [active, setActive] = useState<SubscriptionPlan | null>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  const close = () => {
    if (status === "loading") return
    setActive(null)
    setStatus("idle")
    setMessage("")
  }

  async function startCheckout(plan: SubscriptionPlan) {
    // Any payment requires login first.
    if (!(await isLoggedIn())) {
      alert("Please log in first to continue with the payment.")
      router.push(`/portal/login?redirect=${encodeURIComponent("/support")}`)
      return
    }

    setActive(plan)
    setStatus("loading")
    setMessage("")

    try {
      const sdkOk = await loadRazorpay()
      if (!sdkOk) throw new Error("Could not load the payment SDK. Check your connection and retry.")

      const orderRes = await fetch("/api/client/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      })
      const orderJson = await orderRes.json()
      if (orderRes.status === 401) {
        alert("Please log in first to continue with the payment.")
        router.push(`/portal/login?redirect=${encodeURIComponent("/support")}`)
        return
      }
      if (!orderRes.ok) throw new Error(orderJson?.error || "Could not start the payment.")

      const { orderId, amount, currency, keyId, prefill, plan: planInfo } = orderJson.data
      const Razorpay = (window as unknown as { Razorpay: RazorpayConstructor }).Razorpay

      const rzp = new Razorpay({
        key: keyId,
        amount,
        currency,
        name: "NextGen Fusion",
        description: `${planInfo.name} — ${inr(planInfo.amount)}/${planInfo.period === "year" ? "yr" : "mo"}`,
        order_id: orderId,
        prefill: { name: prefill?.name || "", email: prefill?.email || "", contact: prefill?.phone || "" },
        theme: { color: "#2B35AB" },
        modal: {
          ondismiss: () => {
            setStatus("idle")
            setMessage("Payment cancelled.")
          },
        },
        handler: async (resp) => {
          try {
            const vRes = await fetch("/api/client/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...resp, planId: plan.id }),
            })
            const vJson = await vRes.json()
            if (!vRes.ok || !vJson?.data?.verified) throw new Error(vJson?.error || "Verification failed.")
            setStatus("success")
            setMessage(
              plan.id === "product-catalog"
                ? "Payment successful! Your Product Catalog access is now active."
                : "Payment successful! Your plan is now active.",
            )
          } catch (e) {
            setStatus("error")
            setMessage(e instanceof Error ? e.message : "Verification failed.")
          }
        },
      })
      rzp.open()
      setStatus("idle")
    } catch (e) {
      setStatus("error")
      setMessage(e instanceof Error ? e.message : "Something went wrong.")
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
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
              onClick={() => startCheckout(plan)}
              disabled={status === "loading"}
              className={`mt-6 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${
                plan.highlighted
                  ? "bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] text-white hover:opacity-90"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {status === "loading" && active?.id === plan.id
                ? "Starting…"
                : `Subscribe — ${inr(plan.amount)}/${plan.period === "year" ? "yr" : "mo"}`}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4" /> Secure payments by Razorpay · You&apos;ll be asked to log in before paying · GST extra where applicable
      </p>

      {/* Status modal (success / error) */}
      {active && (status === "success" || status === "error") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-gray-900">{active.name}</h3>
              <button onClick={close} className="rounded-full p-1 text-gray-400 hover:bg-gray-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {status === "success" ? (
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{message}</span>
                </div>
                {active.id === "product-catalog" && (
                  <Link
                    href="/portal/products"
                    className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Go to my products
                  </Link>
                )}
              </div>
            ) : (
              <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{message}</p>
            )}
          </div>
        </div>
      )}

      {/* Loading overlay while the Razorpay SDK / order is being prepared */}
      {status === "loading" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 text-sm font-medium text-gray-700 shadow-2xl">
            <Loader2 className="h-5 w-5 animate-spin" /> Starting secure checkout…
          </div>
        </div>
      )}
    </>
  )
}
