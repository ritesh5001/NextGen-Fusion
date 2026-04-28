'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Plus, Upload, Search, Pencil, Trash2, Building2 } from 'lucide-react'

type Lead = {
  id: string
  company_name: string
  contact_name: string | null
  contact_title: string | null
  email: string | null
  phone: string | null
  industry: string | null
  target_service: string | null
  status: string
  location: string | null
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  contacted: 'bg-yellow-50 text-yellow-700',
  replied: 'bg-purple-50 text-purple-700',
  meeting_scheduled: 'bg-indigo-50 text-indigo-700',
  proposal_sent: 'bg-orange-50 text-orange-700',
  won: 'bg-green-50 text-green-700',
  lost: 'bg-red-50 text-red-700',
  not_interested: 'bg-slate-100 text-slate-500',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  replied: 'Replied',
  meeting_scheduled: 'Meeting',
  proposal_sent: 'Proposal Sent',
  won: 'Won',
  lost: 'Lost',
  not_interested: 'Not Interested',
}

export default function LeadsPage() {
  const [items, setItems] = useState<Lead[]>([])
  const [count, setCount] = useState(0)
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [setupWarning, setSetupWarning] = useState<string | null>(null)

  async function load(query = q, status = statusFilter) {
    setLoading(true)
    setError(null)
    setSetupWarning(null)
    try {
      const params = new URLSearchParams({ limit: '200' })
      if (query) params.set('q', query)
      if (status) params.set('status', status)
      const res = await fetch(`/api/admin/leads?${params}`)
      const json = await res.json()
      if (json?.setupRequired) {
        setItems([])
        setCount(0)
        setSetupWarning(json?.message || 'Leads storage is not provisioned yet.')
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

  useEffect(() => { load('', '') }, [])

  async function onDelete(id: string) {
    if (!confirm('Delete this lead? This cannot be undone.')) return
    const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      alert(j?.error || 'Delete failed')
      return
    }
    setItems((prev) => prev.filter((l) => l.id !== id))
    setCount((c) => c - 1)
  }

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    load(q, statusFilter)
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <PageHeader
          title="B2B Leads"
          description={`${count.toLocaleString()} prospect businesses targeted for outreach.`}
          action={
            <div className="flex gap-2">
              <Link
                href="/admin/leads/upload"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                <Upload className="h-4 w-4" /> Bulk upload
              </Link>
              <Link
                href="/admin/leads/new"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-slate-800 transition"
              >
                <Plus className="h-4 w-4" /> New lead
              </Link>
            </div>
          }
        />

        {setupWarning && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {setupWarning}
          </div>
        )}

        {/* Filters */}
        <form onSubmit={onSearch} className="mt-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search company, name, email…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); load(q, e.target.value) }}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
          >
            <option value="">All statuses</option>
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
        )}

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Industry</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">Loading…</td>
                </tr>
              )}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Building2 className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                    <p className="text-slate-400">No leads yet. Upload a CSV or add one manually.</p>
                  </td>
                </tr>
              )}
              {items.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link href={`/admin/leads/${lead.id}`} className="hover:underline">
                      {lead.company_name}
                    </Link>
                    {lead.email && <div className="text-xs text-slate-400 mt-0.5">{lead.email}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {lead.contact_name || '—'}
                    {lead.contact_title && <div className="text-xs text-slate-400">{lead.contact_title}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-48">
                    <span className="text-xs">{lead.target_service || '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{lead.industry || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[lead.status] ?? 'bg-slate-100 text-slate-600'}`}>
                      {STATUS_LABELS[lead.status] ?? lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{lead.location || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
