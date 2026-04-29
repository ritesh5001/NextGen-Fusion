'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Search, Calculator } from 'lucide-react'

type Submission = {
  id: string
  name: string
  email: string
  phone: string | null
  company_name: string | null
  project_type: string
  estimated_cost_min: number
  estimated_cost_max: number
  estimated_timeline_min_weeks: number
  estimated_timeline_max_weeks: number
  confidence: 'low' | 'medium' | 'high'
  created_at: string
}

export default function ProjectEstimatorSubmissionsPage() {
  const [items, setItems] = useState<Submission[]>([])
  const [count, setCount] = useState(0)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [setupWarning, setSetupWarning] = useState<string | null>(null)

  async function load(query = q) {
    setLoading(true)
    setError(null)
    setSetupWarning(null)
    try {
      const params = new URLSearchParams({ limit: '200' })
      if (query.trim()) params.set('q', query.trim())
      const res = await fetch(`/api/admin/project-estimator-submissions?${params.toString()}`)
      const json = await res.json()
      if (json?.setupRequired) {
        setItems([])
        setCount(0)
        setSetupWarning(json?.message || 'Estimator submissions storage is not provisioned yet.')
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

  useEffect(() => { load('') }, [])

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <PageHeader
          title="Estimator Leads"
          description="Saved website pricing requests generated from the public estimator."
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
                placeholder="Search name, email, company, project type, or goal"
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
                  <th className="px-4 py-2 font-medium">Lead</th>
                  <th className="px-4 py-2 font-medium">Project</th>
                  <th className="px-4 py-2 font-medium">Estimate</th>
                  <th className="px-4 py-2 font-medium">Timeline</th>
                  <th className="px-4 py-2 font-medium">Confidence</th>
                  <th className="px-4 py-2 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                      <Calculator className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                      No estimator submissions yet.
                    </td>
                  </tr>
                )}
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2">
                      <Link href={`/admin/project-estimator-submissions/${item.id}`} className="font-medium text-slate-900 hover:underline">
                        {item.name}
                      </Link>
                      <div className="text-xs text-slate-500">{item.email}</div>
                      <div className="text-xs text-slate-400">{item.company_name || item.phone || '—'}</div>
                    </td>
                    <td className="px-4 py-2 text-slate-700 capitalize">{item.project_type.replace(/-/g, ' ')}</td>
                    <td className="px-4 py-2 text-slate-700">{formatUSD(item.estimated_cost_min)} - {formatUSD(item.estimated_cost_max)}</td>
                    <td className="px-4 py-2 text-slate-700">{item.estimated_timeline_min_weeks}-{item.estimated_timeline_max_weeks} weeks</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.confidence === 'high' ? 'bg-emerald-100 text-emerald-800' :
                        item.confidence === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.confidence}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-slate-500">{new Date(item.created_at).toLocaleString()}</td>
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

function formatUSD(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
