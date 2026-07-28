'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RetrievePurchasesPage() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/store/purchases/resend', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Something went wrong')
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-4 pt-28 pb-24">
        <Link href="/store" className="text-sm text-gray-500 hover:text-gray-900">← Back to store</Link>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Retrieve your purchases</h1>
        <p className="mt-2 text-gray-500">
          Enter the email you used at checkout and we&apos;ll re-send your license keys and download links.
        </p>

        {done ? (
          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            If any purchases are linked to <strong>{email}</strong>, we&apos;ve emailed your download links. Check your inbox (and spam).
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-slate-900 px-6 py-3 text-base font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {busy ? 'Sending…' : 'Email me my downloads'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
