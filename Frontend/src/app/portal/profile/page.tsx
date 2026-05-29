'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PortalShell, PageHeader } from '@/components/portal/portal-shell'

const inputCls =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400'

function ProfileForm() {
  const router = useRouter()
  const params = useSearchParams()
  const mustComplete = params.get('complete') === '1'

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    fetch('/api/client/profile')
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!json?.data) return
        setEmail(json.data.email || '')
        setName(json.data.name || '')
        setCompany(json.data.company || '')
        setPhone(json.data.phone || '')
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch('/api/client/profile', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, company, phone }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Could not save profile')
      setSaved(true)
      if (mustComplete) {
        router.replace('/portal')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <PageHeader title="My Profile" description="Keep your details up to date." />

      {mustComplete && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Please add your name to finish setting up your account.
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {saved && !mustComplete && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Profile saved.
        </div>
      )}

      {loading ? (
        <div className="text-sm text-slate-500 py-12 text-center">Loading…</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-slate-200 rounded-xl p-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
            <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email (login)</label>
            <input className={inputCls + ' bg-slate-50 text-slate-500'} value={email} disabled readOnly />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save profile'}
          </button>
        </form>
      )}
    </div>
  )
}

export default function PortalProfilePage() {
  return (
    <PortalShell>
      <Suspense>
        <ProfileForm />
      </Suspense>
    </PortalShell>
  )
}
