'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Mail, Search, Reply } from 'lucide-react'

type Submission = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  information_source: string
  status: 'new' | 'replied'
  email_count: number
  last_emailed_at: string | null
  created_at: string
}

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-amber-100 text-amber-800',
  replied: 'bg-emerald-100 text-emerald-800',
}

export default function ContactFormsPage() {
  const [items, setItems] = useState<Submission[]>([])
  const [count, setCount] = useState(0)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [setupWarning, setSetupWarning] = useState<string | null>(null)

  async function load(query = q, nextStatus = status) {
    setLoading(true)
    setError(null)
    setSetupWarning(null)
    try {
      const params = new URLSearchParams()
      params.set('limit', '200')
      if (query.trim()) params.set('q', query.trim())
      if (nextStatus) params.set('status', nextStatus)

      const res = await fetch(`/api/admin/contact-forms?${params.toString()}`)
      const json = await res.json()
      if (json?.setupRequired) {
        setItems([])
        setCount(0)
        setSetupWarning(json?.message || 'Form submissions storage is not provisioned yet.')
        return
      }
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
    load('', '')
  }, [])

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <PageHeader
          title="Form Submissions"
          description="Website form entries from your public contact flow. Open one and send a reply from here."
        />

        {setupWarning && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {setupWarning}
          </div>
        )}

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              load()
            }}
            className="flex items-center gap-2 max-w-xl w-full"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, email, phone, source, or message"
                className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                load(q, e.target.value)
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="">All</option>
              <option value="new">New</option>
              <option value="replied">Replied</option>
            </select>
            <button
              type="submit"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Search
            </button>
          </form>
          <div className="text-sm text-slate-500">
            {loading ? 'Loading…' : `${count.toLocaleString()} submissions`}
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Email</th>
                  <th className="px-4 py-2 font-medium">Phone</th>
                  <th className="px-4 py-2 font-medium">Source</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Created</th>
                  <th className="px-4 py-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                      No submissions yet.
                    </td>
                  </tr>
                )}
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-900">{item.name}</td>
                    <td className="px-4 py-2 text-slate-700">{item.email}</td>
                    <td className="px-4 py-2 text-slate-700">{item.phone}</td>
                    <td className="px-4 py-2 text-slate-700">{item.information_source}</td>
                    <td className="px-4 py-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${STATUS_BADGE[item.status]}`}>
                        {item.status}
                      </span>
                      {item.email_count > 0 && (
                        <span className="ml-2 inline-flex items-center gap-1 text-xs text-slate-500">
                          <Reply className="h-3.5 w-3.5" />
                          {item.email_count} sent
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-slate-500">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end">
                        <Link
                          href={`/admin/contact-forms/${item.id}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Open
                        </Link>
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
