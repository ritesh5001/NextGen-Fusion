'use client'

import { useEffect, useState } from 'react'
import { Loader2, Users } from 'lucide-react'
import { BrandProfile, hydrateBrand } from '@/lib/brand-profile'

type Client = { id: string; name: string; company: string | null; email: string; is_active: boolean }

// A small "Load saved brand profile from a client" control. On selection it
// fetches that client's brand profile and hands the hydrated profile back so the
// host form can prefill itself. Used by both generators.
export function ClientBrandPicker({ onLoad }: { onLoad: (profile: BrandProfile) => void }) {
  const [clients, setClients] = useState<Client[]>([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/client-users')
      .then((r) => r.json())
      .then((j) => setClients(((j.data as Client[]) ?? []).filter((c) => c.is_active)))
      .catch(() => {})
  }, [])

  async function pick(id: string) {
    setSelected(id)
    setError(null)
    if (!id) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/clients/${id}/brand`)
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load profile')
      onLoad(hydrateBrand(json.data?.profile))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  if (clients.length === 0) return null

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
        <Users className="h-4 w-4 text-slate-500" /> Load from client
      </span>
      <select
        value={selected}
        onChange={(e) => pick(e.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none"
      >
        <option value="">Select a saved client…</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name || c.email}
            {c.company ? ` — ${c.company}` : ''}
          </option>
        ))}
      </select>
      {loading && <Loader2 className="h-4 w-4 animate-spin text-slate-500" />}
      <span className="text-xs text-slate-500">prefills the fields below from the saved brand profile</span>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
