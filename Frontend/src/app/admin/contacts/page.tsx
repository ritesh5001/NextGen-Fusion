'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Plus, Upload, Search, Pencil, Trash2 } from 'lucide-react'

type Contact = {
  id: string
  email: string
  name: string | null
  company: string | null
  phone: string | null
  industry: string | null
  unsubscribed: boolean
  created_at: string
}

export default function ContactsPage() {
  const [items, setItems] = useState<Contact[]>([])
  const [count, setCount] = useState(0)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load(query = q) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/admin/contacts?limit=200&q=${encodeURIComponent(query)}`
      )
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load')
      setItems(json.data || [])
      setCount(json.count || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load('')
  }, [])

  async function onDelete(id: string) {
    if (!confirm('Delete this contact? This cannot be undone.')) return
    const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      alert(j?.error || 'Delete failed')
      return
    }
    setItems((prev) => prev.filter((c) => c.id !== id))
    setCount((c) => c - 1)
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <PageHeader
          title="Contacts"
          description="Your main contacts database. Bulk upload via CSV or add manually."
          action={
            <div className="flex gap-2">
              <Link
                href="/admin/contacts/upload"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                <Upload className="h-4 w-4" /> Bulk upload
              </Link>
              <Link
                href="/admin/contacts/new"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-slate-800 transition"
              >
                <Plus className="h-4 w-4" /> New contact
              </Link>
            </div>
          }
        />

        <form
          onSubmit={(e) => {
            e.preventDefault()
            load()
          }}
          className="mb-4 flex items-center gap-2 max-w-md"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search email, name, or company"
              className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 text-sm text-slate-500 flex items-center justify-between">
            <span>{loading ? 'Loading…' : `${count.toLocaleString()} contacts`}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Email</th>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Company</th>
                  <th className="px-4 py-2 font-medium">Phone</th>
                  <th className="px-4 py-2 font-medium">Industry</th>
                  <th className="px-4 py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                      No contacts yet.{' '}
                      <Link
                        className="text-slate-900 underline"
                        href="/admin/contacts/upload"
                      >
                        Bulk upload a CSV
                      </Link>{' '}
                      to get started.
                    </td>
                  </tr>
                )}
                {items.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2">
                      <span className="font-medium text-slate-900">{c.email}</span>
                      {c.unsubscribed && (
                        <span className="ml-2 text-xs rounded bg-amber-100 text-amber-800 px-1.5 py-0.5">
                          unsubscribed
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-slate-700">{c.name || '—'}</td>
                    <td className="px-4 py-2 text-slate-700">{c.company || '—'}</td>
                    <td className="px-4 py-2 text-slate-700">{c.phone || '—'}</td>
                    <td className="px-4 py-2 text-slate-700">{c.industry || '—'}</td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/contacts/${c.id}`}
                          className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => onDelete(c.id)}
                          className="p-1.5 rounded hover:bg-red-100 text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
