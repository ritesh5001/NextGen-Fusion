'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Plus } from 'lucide-react'

type Campaign = {
  id: string
  name: string
  status: string
  subject: string
  from_email: string
  followup_days: number
  send_interval_seconds: number
  created_at: string
}

const STATUS_BADGE: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-700',
  active: 'bg-emerald-100 text-emerald-800',
  paused: 'bg-amber-100 text-amber-800',
  completed: 'bg-blue-100 text-blue-800',
}

export default function CampaignsPage() {
  const [items, setItems] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/admin/campaigns')
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Failed')
        setItems(json.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <PageHeader
          title="Campaigns"
          description="Email campaigns. Create one, add recipients, and start sending."
          action={
            <Link
              href="/admin/campaigns/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" /> New campaign
            </Link>
          }
        />

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">From</th>
                <th className="px-4 py-2 font-medium">Interval</th>
                <th className="px-4 py-2 font-medium">Follow-up</th>
                <th className="px-4 py-2 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    No campaigns yet.{' '}
                    <Link href="/admin/campaigns/new" className="underline text-slate-900">
                      Create your first
                    </Link>
                    .
                  </td>
                </tr>
              )}
              {items.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2">
                    <Link
                      href={`/admin/campaigns/${c.id}`}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      {c.name}
                    </Link>
                    <div className="text-xs text-slate-500 mt-0.5 truncate max-w-md">
                      {c.subject}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded ${
                        STATUS_BADGE[c.status] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-700">{c.from_email}</td>
                  <td className="px-4 py-2 text-slate-700">{c.send_interval_seconds}s</td>
                  <td className="px-4 py-2 text-slate-700">{c.followup_days}d</td>
                  <td className="px-4 py-2 text-slate-500">
                    {new Date(c.created_at).toLocaleDateString()}
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
