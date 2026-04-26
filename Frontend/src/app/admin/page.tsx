import Link from 'next/link'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { getSupabaseAdmin } from '@/lib/admin/supabase'
import { Users, Send, CheckCircle2, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const sb = getSupabaseAdmin()
    const [contacts, campaigns, activeCampaigns, queued, sent] = await Promise.all([
      sb.from('contacts').select('id', { count: 'exact', head: true }),
      sb.from('campaigns').select('id', { count: 'exact', head: true }),
      sb.from('campaigns').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      sb
        .from('campaign_recipients')
        .select('id', { count: 'exact', head: true })
        .in('status', ['pending', 'followup_pending']),
      sb.from('email_logs').select('id', { count: 'exact', head: true }).eq('status', 'sent'),
    ])
    return {
      contacts: contacts.count || 0,
      campaigns: campaigns.count || 0,
      activeCampaigns: activeCampaigns.count || 0,
      queued: queued.count || 0,
      sent: sent.count || 0,
      error: null as string | null,
    }
  } catch (err) {
    return {
      contacts: 0,
      campaigns: 0,
      activeCampaigns: 0,
      queued: 0,
      sent: 0,
      error: err instanceof Error ? err.message : 'Failed to load stats',
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const cards = [
    { label: 'Contacts', value: stats.contacts, icon: Users, href: '/admin/contacts' },
    { label: 'Campaigns', value: stats.campaigns, icon: Send, href: '/admin/campaigns' },
    {
      label: 'Active campaigns',
      value: stats.activeCampaigns,
      icon: CheckCircle2,
      href: '/admin/campaigns',
    },
    { label: 'Emails queued', value: stats.queued, icon: Clock, href: '/admin/campaigns' },
  ]
  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <PageHeader
          title="Dashboard"
          description="Overview of your contacts and campaigns."
        />
        {stats.error && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <div className="font-medium">Supabase isn't connected yet.</div>
            <div className="mt-1 text-amber-700">{stats.error}</div>
            <div className="mt-2 text-amber-700">
              Set <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
              <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> in{' '}
              <code className="font-mono">.env.local</code>, then run the SQL in{' '}
              <code className="font-mono">supabase/schema.sql</code>.
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
