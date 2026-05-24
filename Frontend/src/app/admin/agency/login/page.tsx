'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/agency/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const json = await res.json()
        setError(json.error || 'Invalid email or password')
        return
      }
      const redirect = searchParams.get('redirect') || '/admin/agency'
      router.replace(redirect)
      router.refresh()
    } catch {
      setError('Unable to connect. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="mb-6">
          <div className="text-sm font-semibold tracking-tight text-slate-900">NextGen Fusion</div>
          <h1 className="text-xl font-semibold mt-1">Agency Partner Login</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to access the Agency CRM</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              placeholder="partner@nextgenfusion.in"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AgencyLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
