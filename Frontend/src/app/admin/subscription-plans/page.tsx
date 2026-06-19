'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'

type Plan = {
  id: string
  name: string
  amount: number
  period: 'year' | 'month'
  tagline: string | null
  features: string[]
  highlighted: boolean
  active: boolean
  sort_order: number
}

type Draft = {
  id: string
  name: string
  amount: string
  period: 'year' | 'month'
  tagline: string
  features: string // newline-separated
  highlighted: boolean
  active: boolean
  sort_order: string
  isNew?: boolean
}

function toDraft(p: Plan): Draft {
  return {
    id: p.id,
    name: p.name,
    amount: String(p.amount),
    period: p.period,
    tagline: p.tagline ?? '',
    features: (p.features || []).join('\n'),
    highlighted: p.highlighted,
    active: p.active,
    sort_order: String(p.sort_order),
  }
}

const emptyDraft = (): Draft => ({
  id: '', name: '', amount: '', period: 'year', tagline: '', features: '',
  highlighted: false, active: true, sort_order: '0', isNew: true,
})

export default function SubscriptionPlansPage() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [loading, setLoading] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [setupWarning, setSetupWarning] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/subscription-plans')
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load')
      setSetupWarning(json.setupRequired ? json.message : null)
      setDrafts((json.data as Plan[]).map(toDraft))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function update(idx: number, patch: Partial<Draft>) {
    setDrafts((d) => d.map((row, i) => (i === idx ? { ...row, ...patch } : row)))
  }

  function payloadFrom(d: Draft) {
    return {
      id: d.id || undefined,
      name: d.name,
      amount: Number(d.amount),
      period: d.period,
      tagline: d.tagline,
      features: d.features.split('\n').map((f) => f.trim()).filter(Boolean),
      highlighted: d.highlighted,
      active: d.active,
      sort_order: Number(d.sort_order) || 0,
    }
  }

  async function save(idx: number) {
    const d = drafts[idx]
    setSavingId(d.id || `new-${idx}`)
    setError(null)
    setNotice(null)
    try {
      const isNew = d.isNew
      const url = isNew ? '/api/admin/subscription-plans' : `/api/admin/subscription-plans/${d.id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadFrom(d)),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Save failed')
      setNotice(`Saved "${json.data.name}".`)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSavingId(null)
    }
  }

  async function remove(idx: number) {
    const d = drafts[idx]
    if (d.isNew) { setDrafts((x) => x.filter((_, i) => i !== idx)); return }
    if (!confirm(`Delete plan "${d.name}"?`)) return
    setSavingId(d.id)
    try {
      const res = await fetch(`/api/admin/subscription-plans/${d.id}`, { method: 'DELETE' })
      if (!res.ok) { const j = await res.json(); throw new Error(j?.error || 'Delete failed') }
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setSavingId(null)
    }
  }

  const inputClass = 'w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500'

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Subscription Plans</h1>
          <p className="mt-1 text-sm text-slate-500">Control the pricing and details shown on the /support page.</p>
        </div>
        <button
          onClick={() => setDrafts((d) => [...d, emptyDraft()])}
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" /> Add plan
        </button>
      </div>

      {setupWarning && (
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {setupWarning}
        </div>
      )}
      {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {notice && <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</div>}

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      ) : (
        <div className="space-y-4">
          {drafts.map((d, idx) => (
            <div key={d.id || `new-${idx}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-slate-700">Name</span>
                  <input className={inputClass} value={d.name} onChange={(e) => update(idx, { name: e.target.value })} />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-slate-700">Price (₹)</span>
                  <input className={inputClass} type="number" value={d.amount} onChange={(e) => update(idx, { amount: e.target.value })} />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-slate-700">Billing period</span>
                  <select className={inputClass} value={d.period} onChange={(e) => update(idx, { period: e.target.value as 'year' | 'month' })}>
                    <option value="year">per year</option>
                    <option value="month">per month</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-slate-700">Sort order</span>
                  <input className={inputClass} type="number" value={d.sort_order} onChange={(e) => update(idx, { sort_order: e.target.value })} />
                </label>
                <label className="text-sm md:col-span-2">
                  <span className="mb-1 block font-medium text-slate-700">Tagline</span>
                  <input className={inputClass} value={d.tagline} onChange={(e) => update(idx, { tagline: e.target.value })} />
                </label>
                {d.isNew && (
                  <label className="text-sm md:col-span-2">
                    <span className="mb-1 block font-medium text-slate-700">Plan ID (slug, optional)</span>
                    <input className={inputClass} value={d.id} placeholder="auto from name" onChange={(e) => update(idx, { id: e.target.value })} />
                  </label>
                )}
                <label className="text-sm md:col-span-2 lg:col-span-4">
                  <span className="mb-1 block font-medium text-slate-700">Features (one per line)</span>
                  <textarea className={inputClass} rows={4} value={d.features} onChange={(e) => update(idx, { features: e.target.value })} />
                </label>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-5 text-sm text-slate-600">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={d.highlighted} onChange={(e) => update(idx, { highlighted: e.target.checked })} />
                    Highlighted
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={d.active} onChange={(e) => update(idx, { active: e.target.checked })} />
                    Active (visible on site)
                  </label>
                  {!d.isNew && <span className="text-xs text-slate-400">id: {d.id}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => remove(idx)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <Trash2 className="h-4 w-4" /> {d.isNew ? 'Discard' : 'Delete'}
                  </button>
                  <button
                    onClick={() => save(idx)}
                    disabled={savingId === (d.id || `new-${idx}`)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
                  >
                    {savingId === (d.id || `new-${idx}`) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
          {drafts.length === 0 && !setupWarning && (
            <p className="text-sm text-slate-500">No plans yet. Click “Add plan” to create one.</p>
          )}
        </div>
      )}
    </div>
  )
}
