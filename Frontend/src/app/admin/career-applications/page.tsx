'use client'

import { Fragment, useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Download, Search } from 'lucide-react'

type Application = {
  id: string
  role_id: string | null
  role_title: string
  name: string
  email: string
  phone: string
  location: string | null
  experience: string | null
  portfolio_url: string | null
  cover_note: string | null
  resume_filename: string | null
  resume_size: number | null
  status: 'new' | 'shortlisted' | 'interviewing' | 'hired' | 'rejected'
  created_at: string
}

const STATUSES: Application['status'][] = [
  'new',
  'shortlisted',
  'interviewing',
  'hired',
  'rejected',
]

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-amber-100 text-amber-800',
  shortlisted: 'bg-blue-100 text-blue-800',
  interviewing: 'bg-violet-100 text-violet-800',
  hired: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-gray-200 text-gray-700',
}

export default function CareerApplicationsPage() {
  const [items, setItems] = useState<Application[]>([])
  const [count, setCount] = useState(0)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [setupWarning, setSetupWarning] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  async function load(query = q, nextStatus = status) {
    setLoading(true)
    setError(null)
    setSetupWarning(null)
    try {
      const params = new URLSearchParams()
      params.set('limit', '200')
      if (query.trim()) params.set('q', query.trim())
      if (nextStatus) params.set('status', nextStatus)

      const res = await fetch(`/api/admin/career-applications?${params.toString()}`)
      const json = await res.json()
      if (json?.setupRequired) {
        setItems([])
        setCount(0)
        setSetupWarning(json?.message || 'Career application storage is not provisioned yet.')
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

  async function updateStatus(id: string, nextStatus: Application['status']) {
    try {
      const res = await fetch(`/api/admin/career-applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to update status')
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  // Resumes live in a private bucket; the backend returns a short-lived signed URL.
  async function downloadResume(id: string) {
    try {
      const res = await fetch(`/api/admin/career-applications/${id}/resume`)
      const json = await res.json()
      if (!res.ok || !json?.data?.url) throw new Error(json?.error || 'Resume unavailable')
      window.open(json.data.url, '_blank', 'noopener,noreferrer')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Resume unavailable')
    }
  }

  useEffect(() => {
    load('', '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <PageHeader
          title="Career Applications"
          description="Applications submitted through the public /careers form, with resumes."
        />

        {setupWarning && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {setupWarning}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && load()}
              placeholder="Search name, email, phone, role"
              className="w-72 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-gray-900 focus:outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              load(q, e.target.value)
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => load()}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Search
          </button>
          <span className="ml-auto text-sm text-gray-500">{count} total</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No applications yet.
                  </td>
                </tr>
              )}
              {!loading &&
                items.map((item) => (
                  <Fragment key={item.id}>
                    <tr
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.email} · {item.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{item.role_title}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            updateStatus(item.id, e.target.value as Application['status'])
                          }
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            STATUS_BADGE[item.status] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            downloadResume(item.id)
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {item.resume_filename || 'Resume'}
                        </button>
                      </td>
                    </tr>
                    {expandedId === item.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="px-4 py-4">
                          <dl className="grid gap-3 sm:grid-cols-3">
                            <div>
                              <dt className="text-xs uppercase text-gray-500">Location</dt>
                              <dd className="text-gray-900">{item.location || '—'}</dd>
                            </div>
                            <div>
                              <dt className="text-xs uppercase text-gray-500">Experience</dt>
                              <dd className="text-gray-900">{item.experience || '—'}</dd>
                            </div>
                            <div>
                              <dt className="text-xs uppercase text-gray-500">Portfolio</dt>
                              <dd className="truncate text-gray-900">
                                {item.portfolio_url ? (
                                  <a
                                    href={item.portfolio_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                  >
                                    {item.portfolio_url}
                                  </a>
                                ) : (
                                  '—'
                                )}
                              </dd>
                            </div>
                            <div className="sm:col-span-3">
                              <dt className="text-xs uppercase text-gray-500">Cover note</dt>
                              <dd className="whitespace-pre-wrap text-gray-900">
                                {item.cover_note || '—'}
                              </dd>
                            </div>
                          </dl>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
