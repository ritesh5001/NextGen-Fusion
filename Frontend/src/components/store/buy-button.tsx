'use client'

import { useState } from 'react'
import { formatInr } from '@/lib/store'

// Minimal shape of the Razorpay checkout we use.
type RazorpayResponse = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}
type RazorpayOptions = {
  key: string
  order_id: string
  amount: number
  currency: string
  name: string
  description?: string
  prefill?: { name?: string; email?: string; contact?: string }
  theme?: { color?: string }
  handler: (response: RazorpayResponse) => void
  modal?: { ondismiss?: () => void }
}
type RazorpayInstance = { open: () => void }
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const inputCls =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10'

export function BuyButton({
  productId,
  title,
  priceInr,
}: {
  productId: string
  slug: string
  title: string
  priceInr: number
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<{ licenseKey: string; downloadUrl: string | null } | null>(null)

  async function pay(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const loaded = await loadRazorpay()
      if (!loaded) throw new Error('Could not load the payment gateway. Check your connection and try again.')

      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productId, name, email, phone }),
      })
      const json = await res.json()
      if (!res.ok) {
        const base = json?.error || 'Checkout failed'
        throw new Error(json?.details ? `${base}: ${json.details}` : base)
      }
      const d = json.data
      if (!window.Razorpay) throw new Error('Payment gateway unavailable.')

      const rzp = new window.Razorpay({
        key: d.keyId,
        order_id: d.orderId,
        amount: d.amount,
        currency: d.currency,
        name: 'NextGen Fusion',
        description: title,
        prefill: d.prefill,
        theme: { color: '#2B35AB' },
        handler: async (resp) => {
          try {
            const vr = await fetch('/api/store/verify', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
              }),
            })
            const vj = await vr.json()
            if (!vr.ok) throw new Error(vj?.error || 'We could not confirm your payment. Contact support with your payment id.')
            setSuccess({ licenseKey: vj.data.licenseKey, downloadUrl: vj.data.downloadUrl ?? null })
            setOpen(false)
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Verification failed')
          } finally {
            setBusy(false)
          }
        },
        modal: { ondismiss: () => setBusy(false) },
      })
      rzp.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
      setBusy(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="font-semibold text-green-800">Payment successful 🎉</p>
        <p className="mt-1 text-sm text-green-700">Your license key:</p>
        <code className="mt-1 block select-all rounded-md bg-white px-3 py-2 font-mono text-sm text-gray-900">
          {success.licenseKey}
        </code>
        {success.downloadUrl && (
          <a
            href={success.downloadUrl}
            className="mt-4 inline-block rounded-lg bg-slate-900 px-6 py-3 text-base font-medium text-white transition hover:bg-slate-800"
          >
            Download now
          </a>
        )}
        <p className="mt-3 text-sm text-green-700">
          We&apos;ve also emailed your license key and download link to <strong>{email || 'your email'}</strong>.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{formatInr(priceInr)}</span>
        <span className="text-sm text-gray-500">one-time · lifetime access</span>
      </div>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3.5 text-base font-medium text-white transition hover:bg-slate-800 sm:w-auto"
        >
          Buy now
        </button>
      ) : (
        <form onSubmit={pay} className="mt-4 space-y-3">
          <input className={inputCls} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <input
            type="email"
            required
            className={inputCls}
            placeholder="Email (your download link goes here) *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className={inputCls} placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-slate-900 px-6 py-3 text-base font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {busy ? 'Processing…' : `Pay ${formatInr(priceInr)}`}
            </button>
            <button
              type="button"
              onClick={() => { setOpen(false); setError('') }}
              className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-gray-400">Secure payment via Razorpay. Digital product — no refunds after download.</p>
        </form>
      )}
    </div>
  )
}
