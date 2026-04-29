'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { ArrowLeft } from 'lucide-react'

type Submission = {
  id: string
  name: string
  email: string
  phone: string | null
  company_name: string | null
  project_type: string
  features: string[]
  timeline: string
  page_count: string
  design_level: string
  content_readiness: string
  maintenance: string
  integrations: string[]
  goals: string
  notes: string | null
  estimate_summary: string
  estimated_cost_min: number
  estimated_cost_max: number
  estimated_timeline_min_weeks: number
  estimated_timeline_max_weeks: number
  confidence: 'low' | 'medium' | 'high'
  highlighted_features: string[]
  scope_breakdown: string[]
  assumptions: string[]
  next_step: string
  created_at: string
}

export default function ProjectEstimatorSubmissionDetailPage() {
  const params = useParams<{ id: string }>()
  const [item, setItem] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/project-estimator-submissions/${params.id}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Failed to load')
        setItem(json.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      } finally {
        setLoading(false)
      }
    })()
  }, [params.id])

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <div className="mb-6">
          <Link
            href="/admin/project-estimator-submissions"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to estimator leads
          </Link>
        </div>

        <PageHeader title="Estimator lead" description="Saved project brief and generated estimate." />

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center text-slate-500">Loading…</div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        {!loading && item && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-semibold text-slate-900">{item.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.email}</p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Meta label="Company" value={item.company_name || '—'} />
                  <Meta label="Phone" value={item.phone || '—'} />
                  <Meta label="Project type" value={item.project_type.replace(/-/g, ' ')} />
                  <Meta label="Timeline" value={item.timeline.replace(/-/g, ' ')} />
                  <Meta label="Pages" value={item.page_count} />
                  <Meta label="Design" value={item.design_level.replace(/-/g, ' ')} />
                  <Meta label="Content" value={item.content_readiness.replace(/-/g, ' ')} />
                  <Meta label="Maintenance" value={item.maintenance} />
                </div>
                <div className="mt-6">
                  <div className="text-sm font-medium text-slate-700">Goal</div>
                  <div className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{item.goals}</div>
                </div>
                {item.notes && (
                  <div className="mt-6">
                    <div className="text-sm font-medium text-slate-700">Notes</div>
                    <div className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{item.notes}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Estimate</div>
                <div className="mt-3 text-3xl font-semibold text-slate-900">
                  {formatINR(item.estimated_cost_min)} - {formatINR(item.estimated_cost_max)}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  {item.estimated_timeline_min_weeks}-{item.estimated_timeline_max_weeks} weeks · {item.confidence} confidence
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-700">{item.estimate_summary}</p>
              </div>

              <CardList title="Highlighted features" items={item.highlighted_features} />
              <CardList title="Selected features" items={item.features} emptyLabel="No special features selected." />
              <CardList title="Integrations" items={item.integrations} emptyLabel="No integrations selected." />
              <CardList title="Scope breakdown" items={item.scope_breakdown} />
              <CardList title="Assumptions" items={item.assumptions} />

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-sm font-medium text-slate-900">Next step</div>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.next_step}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-900 break-words">{value}</div>
    </div>
  )
}

function CardList({ title, items, emptyLabel }: { title: string; items: string[]; emptyLabel?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="text-sm font-medium text-slate-900">{title}</div>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">{emptyLabel || 'No items.'}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function formatINR(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}
