'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, CircleSlash2 } from 'lucide-react'
import { PortalShell, PageHeader } from '@/components/portal/portal-shell'

type Profile = {
  subscription_plan?: string | null
  subscription_status?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive' | null
  subscription_current_period_end?: string | null
  allowed_tools?: string[] | null
}

const TOOL_LABELS: Record<string, string> = {
  product_catalog: 'Product catalog builder',
  image_library: 'Image library',
  ai_product_copy: 'AI product copy',
}

function fmtDate(iso?: string | null): string {
  if (!iso) return 'No renewal date set'
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function statusLabel(status?: string | null): string {
  if (!status) return 'Active'
  return status.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
}

export default function PortalSubscriptionPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/client/profile')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load subscription'))))
      .then((json) => setProfile(json.data || null))
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load subscription'))
      .finally(() => setLoading(false))
  }, [])

  const tools = useMemo(() => {
    const allowed = Array.isArray(profile?.allowed_tools) ? profile.allowed_tools : Object.keys(TOOL_LABELS)
    return Object.entries(TOOL_LABELS).map(([key, label]) => ({ key, label, enabled: allowed.includes(key) }))
  }, [profile])

  const status = profile?.subscription_status || 'active'
  const active = status === 'active' || status === 'trialing'

  return (
    <PortalShell>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <PageHeader
          title="Subscription"
          description="Review your current plan and included portal tools."
        />

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-sm text-slate-500 py-12 text-center">Loading...</div>
        ) : (
          <div className="space-y-5">
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Current plan</p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                    {profile?.subscription_plan || 'Starter'}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {status === 'trialing' ? 'Trial ends' : 'Current period ends'}: {fmtDate(profile?.subscription_current_period_end)}
                  </p>
                  {!active && (
                    <p className="mt-2 text-sm text-slate-600">
                      You don&apos;t have an active plan yet. Unlock the Product Catalog tools from{' '}
                      <a href="/support" className="font-medium text-slate-900 underline">Support &amp; Plans</a>.
                    </p>
                  )}
                </div>
                <span
                  className={
                    'rounded-full px-3 py-1 text-xs font-medium ' +
                    (active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')
                  }
                >
                  {statusLabel(status)}
                </span>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900">Included tools</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {tools.map((tool) => (
                  <div key={tool.key} className="rounded-lg border border-slate-200 p-4">
                    {tool.enabled ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <CircleSlash2 className="h-5 w-5 text-slate-300" />
                    )}
                    <p className="mt-3 text-sm font-medium text-slate-900">{tool.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{tool.enabled ? 'Included' : 'Not included'}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </PortalShell>
  )
}
