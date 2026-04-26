'use client'

import { useEffect, useState } from 'react'

type Contact = {
  id: string
  email: string
  name: string | null
  company: string | null
  industry: string | null
  unsubscribed: boolean
}

export function RecipientPicker({
  campaignId,
  onAdded,
}: {
  campaignId: string
  onAdded: () => void
}) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [count, setCount] = useState(0)
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function load(query = q) {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/admin/contacts?limit=200&q=${encodeURIComponent(query)}`
      )
      const json = await res.json()
      setContacts(json.data || [])
      setCount(json.count || 0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load('')
  }, [])

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAllVisible() {
    setSelected((prev) => {
      const next = new Set(prev)
      const allSelected = contacts.every((c) => next.has(c.id))
      if (allSelected) contacts.forEach((c) => next.delete(c.id))
      else contacts.forEach((c) => !c.unsubscribed && next.add(c.id))
      return next
    })
  }

  async function addSelected() {
    setAdding(true)
    setMsg(null)
    try {
      const res = await fetch(`/api/admin/campaigns/${campaignId}/recipients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact_ids: Array.from(selected) }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed')
      setMsg(`Added ${json.added} recipient${json.added === 1 ? '' : 's'}.`)
      setSelected(new Set())
      onAdded()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed')
    } finally {
      setAdding(false)
    }
  }

  async function addAll() {
    if (
      !confirm(
        `Add ALL ${count.toLocaleString()} non-unsubscribed contacts to this campaign?`
      )
    )
      return
    setAdding(true)
    setMsg(null)
    try {
      const res = await fetch(`/api/admin/campaigns/${campaignId}/recipients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed')
      setMsg(`Added ${json.added} recipients.`)
      onAdded()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            load()
          }}
          className="flex-1 flex gap-2 max-w-md"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search contacts to add"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
          <button
            type="submit"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          >
            Search
          </button>
        </form>
        <div className="flex gap-2">
          <button
            onClick={addSelected}
            disabled={selected.size === 0 || adding}
            className="rounded-lg bg-slate-900 text-white px-3 py-1.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            Add selected ({selected.size})
          </button>
          <button
            onClick={addAll}
            disabled={adding}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            Add all ({count.toLocaleString()})
          </button>
        </div>
      </div>
      {msg && (
        <div className="px-4 py-2 text-xs bg-emerald-50 text-emerald-800 border-b border-emerald-200">
          {msg}
        </div>
      )}
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 sticky top-0 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium w-10">
                <input
                  type="checkbox"
                  onChange={toggleAllVisible}
                  checked={contacts.length > 0 && contacts.every((c) => selected.has(c.id))}
                />
              </th>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Company</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            )}
            {!loading &&
              contacts.map((c) => (
                <tr
                  key={c.id}
                  className={`hover:bg-slate-50 ${c.unsubscribed ? 'opacity-50' : ''}`}
                >
                  <td className="px-3 py-1.5">
                    <input
                      type="checkbox"
                      disabled={c.unsubscribed}
                      checked={selected.has(c.id)}
                      onChange={() => toggle(c.id)}
                    />
                  </td>
                  <td className="px-3 py-1.5">
                    {c.email}
                    {c.unsubscribed && (
                      <span className="ml-2 text-xs text-amber-700">unsubscribed</span>
                    )}
                  </td>
                  <td className="px-3 py-1.5 text-slate-700">{c.name || '—'}</td>
                  <td className="px-3 py-1.5 text-slate-700">{c.company || '—'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
