'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Only allow internal redirects (e.g. /support) — never an absolute/external URL.
  const rawRedirect = searchParams.get('redirect') || ''
  const safeRedirect = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/portal'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/client/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const json = await res.json()
        setError(json.error || 'Invalid email or password')
        return
      }
      router.replace(safeRedirect)
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
          <h1 className="text-xl font-semibold mt-1">Client Login</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to build and export your product catalog</p>
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
              placeholder="you@yourcompany.com"
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between gap-3">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <Link href="/portal/forgot-password" className="text-xs font-medium text-slate-600 hover:text-slate-900">
                Forgot?
              </Link>
            </div>
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

        <p className="mt-5 text-center text-sm text-slate-500">
          New to NextGen Fusion?{' '}
          <Link
            href={safeRedirect !== '/portal' ? `/portal/signup?redirect=${encodeURIComponent(safeRedirect)}` : '/portal/signup'}
            className="font-medium text-slate-900 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function ClientLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
