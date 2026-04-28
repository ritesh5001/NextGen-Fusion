import Link from 'next/link'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { serverFetch } from '@/lib/server-fetch'
import { Users, Send, CheckCircle2, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const res = await serverFetch('/api/admin/stats')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    return { ...json.data, error: null as string | null }
  } catch (err) {
    return {
      contacts: 0, campaigns: 0, activeCampaigns: 0, queued: 0, sent: 0,
      error: err instanceof Error ? err.message : 'Failed to load stats',
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const cards = [
    { label: 'Contacts', value: stats.contacts, icon: Users, href: '/admin/contacts' },
    { label: 'Campaigns', value: stats.campaigns, icon: Send, href: '/admin/campaigns' },
    { label: 'Active campaigns', value: stats.activeCampaigns, icon: CheckCircle2, href: '/admin/campaigns' },
    { label: 'Emails queued', value: stats.queued, icon: Clock, href: '/admin/campaigns' },
  ]
  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <PageHeader title="Dashboard" description="Overview of your contacts and campaigns." />
        {stats.error && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <div className="font-medium">Backend isn't reachable.</div>
            <div className="mt-1 text-amber-700">{stats.error}</div>
            <div className="mt-2 text-amber-700">
              Make sure the Backend server is running on port 4000 and BACKEND_URL is set in{' '}
              <code className="font-mono">.env</code>.
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.label}
                href={c.href}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{c.label}</span>
                  <Icon className="h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-3 text-2xl font-semibold tabular-nums">{c.value}</div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/contacts"
            className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition"
          >
            <div className="text-base font-medium">Manage contacts</div>
            <p className="text-sm text-slate-500 mt-1">
              Bulk upload via CSV, edit, search, and clean up your main contacts database.
            </p>
          </Link>
          <Link
            href="/admin/campaigns/new"
            className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition"
          >
            <div className="text-base font-medium">Create a new campaign</div>
            <p className="text-sm text-slate-500 mt-1">
              Set the subject, intervals, and follow-ups, then pick recipients.
            </p>
          </Link>
        </div>
      </div>
    </AdminShell>
  )
}
