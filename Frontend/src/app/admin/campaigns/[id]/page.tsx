'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { CampaignForm } from '@/components/admin/campaign-form'
import { RecipientPicker } from '@/components/admin/recipient-picker'
import { Play, Pause, Trash2, RefreshCw } from 'lucide-react'

type Campaign = {
  id: string
  name: string
  description: string | null
  status: 'draft' | 'active' | 'paused' | 'completed'
  from_name: string
  from_email: string
  reply_to: string | null
  subject: string
  body_html: string
  followup_enabled: boolean
  followup_days: number
  followup_subject: string | null
  followup_body_html: string | null
  max_followups: number
  send_interval_seconds: number
  daily_send_limit: number | null
  started_at: string | null
  completed_at: string | null
  created_at: string
}

type Recipient = {
  id: string
  status: string
  next_send_at: string | null
  initial_sent_at: string | null
  last_sent_at: string | null
  followup_count: number
  last_error: string | null
  contacts: { id: string; email: string; name: string | null; company: string | null } | null
}

type EmailLog = {
  id: string
  email_type: string
  status: string
  subject: string | null
  to_email: string | null
  error: string | null
  created_at: string
}

const STATUS_BADGE: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-700',
  active: 'bg-emerald-100 text-emerald-800',
  paused: 'bg-amber-100 text-amber-800',
  completed: 'bg-blue-100 text-blue-800',
  pending: 'bg-slate-100 text-slate-700',
  sent: 'bg-emerald-100 text-emerald-800',
  followup_pending: 'bg-indigo-100 text-indigo-800',
  followup_sent: 'bg-emerald-100 text-emerald-800',
  failed: 'bg-red-100 text-red-700',
  unsubscribed: 'bg-amber-100 text-amber-800',
}

function formatTimeUntil(iso: string | null): string {
  if (!iso) return '—'
  const ms = new Date(iso).getTime() - Date.now()
  if (ms <= 0) return 'due now'
  const sec = Math.round(ms / 1000)
  if (sec < 60) return `in ${sec}s`
  const min = Math.round(sec / 60)
  if (min < 60) return `in ${min}m`
  const hr = Math.round(min / 60)
  if (hr < 48) return `in ${hr}h`
  const d = Math.round(hr / 24)
  return `in ${d}d`
}

export default function CampaignDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [logs, setLogs] = useState<EmailLog[]>([])
  const [tab, setTab] = useState<'overview' | 'recipients' | 'add' | 'logs' | 'edit'>(
    'overview'
  )
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    try {
      const [c, r, l] = await Promise.all([
        fetch(`/api/admin/campaigns/${id}`).then((res) => res.json()),
        fetch(`/api/admin/campaigns/${id}/recipients`).then((res) => res.json()),
        fetch(`/api/admin/campaigns/${id}/logs`).then((res) => res.json()),
      ])
      if (c.error) throw new Error(c.error)
      setCampaign(c.data)
      setRecipients(r.data || [])
      setLogs(l.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  // Auto-refresh every 10s when campaign is active
  useEffect(() => {
    if (campaign?.status !== 'active') return
    const t = setInterval(load, 10000)
    return () => clearInterval(t)
  }, [campaign?.status, load])

  async function setStatus(status: 'active' | 'paused' | 'completed' | 'draft' | 'restart') {
    setBusy(true)
    try {
      const res = await fetch(`/api/admin/campaigns/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  async function deleteCampaign() {
    if (!confirm('Delete this campaign and all its recipients/logs? This cannot be undone.'))
      return
    setBusy(true)
    const res = await fetch(`/api/admin/campaigns/${id}`, { method: 'DELETE' })
    if (res.ok) router.push('/admin/campaigns')
    else {
      const j = await res.json().catch(() => ({}))
      setError(j?.error || 'Delete failed')
      setBusy(false)
    }
  }

  async function removeRecipient(recipientId: string) {
    if (!confirm('Remove this recipient?')) return
    const res = await fetch(
      `/api/admin/campaigns/${id}/recipients?recipient_id=${recipientId}`,
      { method: 'DELETE' }
    )
    if (res.ok) load()
  }

  if (!campaign) {
    return (
      <AdminShell>
        <div className="p-8 max-w-4xl">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : (
            <div className="text-slate-500 text-sm">Loading…</div>
          )}
        </div>
      </AdminShell>
    )
  }

  const counts = recipients.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1
      acc.total++
      return acc
    },
    { total: 0 } as Record<string, number>
  )

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/admin/campaigns"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            ← Campaigns
          </Link>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${
              STATUS_BADGE[campaign.status] || 'bg-slate-100 text-slate-700'
            }`}
          >
            {campaign.status}
          </span>
        </div>

        <PageHeader
          title={campaign.name}
          description={campaign.subject}
          action={
            <div className="flex gap-2">
              <button
                onClick={load}
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <RefreshCw className="h-4 w-4" /> Refresh
              </button>
              {campaign.status === 'draft' && (
                <button
                  onClick={() => setStatus('active')}
                  disabled={busy || counts.total === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                  title={counts.total === 0 ? 'Add recipients first' : 'Start sending'}
                >
                  <Play className="h-4 w-4" /> Start campaign
                </button>
              )}
              {campaign.status === 'active' && (
                <button
                  onClick={() => setStatus('paused')}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 text-white px-3 py-2 text-sm font-medium hover:bg-amber-600"
                >
                  <Pause className="h-4 w-4" /> Pause
                </button>
              )}
              {campaign.status === 'paused' && (
                <button
                  onClick={() => setStatus('active')}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-700"
                >
                  <Play className="h-4 w-4" /> Resume
                </button>
              )}
              {campaign.status === 'completed' && (
                <button
                  onClick={() => {
                    if (
                      confirm(
                        'Restart this completed campaign? This will reset recipient progress and queue the campaign again.'
                      )
                    ) {
                      setStatus('restart')
                    }
                  }}
                  disabled={busy || counts.total === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                  title={counts.total === 0 ? 'Add recipients first' : 'Reset and send again'}
                >
                  <Play className="h-4 w-4" /> Restart campaign
                </button>
              )}
              <button
                onClick={deleteCampaign}
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          }
        />

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <Stat label="Recipients" value={counts.total} />
          <Stat label="Pending" value={counts.pending || 0} />
          <Stat label="Initial sent" value={(counts.followup_pending || 0) + (counts.completed || 0)} />
          <Stat label="Completed" value={counts.completed || 0} />
          <Stat label="Failed" value={counts.failed || 0} tone="red" />
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-4 flex gap-1">
          {(
            [
              ['overview', 'Overview'],
              ['recipients', `Recipients (${counts.total})`],
              ['add', 'Add recipients'],
              ['logs', `Send log (${logs.length})`],
              ['edit', 'Edit'],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k as any)}
              className={`px-3 py-2 text-sm border-b-2 -mb-px transition ${
                tab === k
                  ? 'border-slate-900 text-slate-900 font-medium'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-medium mb-3">Configuration</h3>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <Row k="From" v={`${campaign.from_name} <${campaign.from_email}>`} />
                <Row k="Reply-to" v={campaign.reply_to || '—'} />
                <Row k="Interval between sends" v={`${campaign.send_interval_seconds}s`} />
                <Row k="Follow-up enabled" v={campaign.followup_enabled ? 'Yes' : 'No'} />
                <Row k="Follow-up after" v={`${campaign.followup_days} days`} />
                <Row k="Max follow-ups" v={String(campaign.max_followups)} />
                <Row
                  k="Started"
                  v={campaign.started_at ? new Date(campaign.started_at).toLocaleString() : '—'}
                />
                <Row
                  k="Completed"
                  v={
                    campaign.completed_at
                      ? new Date(campaign.completed_at).toLocaleString()
                      : '—'
                  }
                />
              </dl>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-medium mb-3">Initial email preview</h3>
              <div className="text-sm text-slate-600 mb-2">
                Subject: <span className="text-slate-900">{campaign.subject}</span>
              </div>
              <div
                className="prose prose-sm max-w-none border border-slate-200 rounded-lg p-4 bg-slate-50"
                dangerouslySetInnerHTML={{ __html: campaign.body_html }}
              />
            </div>
            {campaign.followup_enabled && campaign.followup_body_html && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-medium mb-3">Follow-up email preview</h3>
                <div className="text-sm text-slate-600 mb-2">
                  Subject:{' '}
                  <span className="text-slate-900">
                    {campaign.followup_subject || `Re: ${campaign.subject}`}
                  </span>
                </div>
                <div
                  className="prose prose-sm max-w-none border border-slate-200 rounded-lg p-4 bg-slate-50"
                  dangerouslySetInnerHTML={{ __html: campaign.followup_body_html }}
                />
              </div>
            )}
          </div>
        )}

        {tab === 'recipients' && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 sticky top-0 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-2 font-medium">Recipient</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Next send</th>
                    <th className="px-3 py-2 font-medium">Last sent</th>
                    <th className="px-3 py-2 font-medium">Follow-ups</th>
                    <th className="px-3 py-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recipients.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-3 py-12 text-center text-slate-500">
                        No recipients yet. Use the <strong>Add recipients</strong> tab.
                      </td>
                    </tr>
                  )}
                  {recipients.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2">
                        <div className="font-medium text-slate-900">
                          {r.contacts?.email || '(deleted contact)'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {r.contacts?.name || ''}{' '}
                          {r.contacts?.company ? `· ${r.contacts.company}` : ''}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded ${
                            STATUS_BADGE[r.status] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {r.status}
                        </span>
                        {r.last_error && (
                          <div className="text-xs text-red-600 mt-1 truncate max-w-xs">
                            {r.last_error}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2 text-slate-700">
                        {r.next_send_at ? (
                          <>
                            <div>{new Date(r.next_send_at).toLocaleString()}</div>
                            <div className="text-xs text-slate-500">
                              {formatTimeUntil(r.next_send_at)}
                            </div>
                          </>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-3 py-2 text-slate-700">
                        {r.last_sent_at ? new Date(r.last_sent_at).toLocaleString() : '—'}
                      </td>
                      <td className="px-3 py-2 text-slate-700 tabular-nums">
                        {r.followup_count}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => removeRecipient(r.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'add' && (
          <RecipientPicker campaignId={id} onAdded={load} />
        )}

        {tab === 'logs' && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 sticky top-0 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-2 font-medium">When</th>
                    <th className="px-3 py-2 font-medium">To</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Subject</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-3 py-12 text-center text-slate-500">
                        No emails sent yet.
                      </td>
                    </tr>
                  )}
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-700 whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="px-3 py-2">{log.to_email}</td>
                      <td className="px-3 py-2 text-slate-700">{log.email_type}</td>
                      <td className="px-3 py-2 text-slate-700">{log.subject}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded ${
                            log.status === 'sent'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {log.status}
                        </span>
                        {log.error && (
                          <div className="text-xs text-red-600 mt-1">{log.error}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'edit' && (
          <CampaignForm
            initial={{
              id: campaign.id,
              name: campaign.name,
              description: campaign.description || '',
              from_name: campaign.from_name,
              from_email: campaign.from_email,
              reply_to: campaign.reply_to || '',
              subject: campaign.subject,
              body_html: campaign.body_html,
              followup_enabled: campaign.followup_enabled,
              followup_days: campaign.followup_days,
              followup_subject: campaign.followup_subject || '',
              followup_body_html: campaign.followup_body_html || '',
              max_followups: campaign.max_followups,
              send_interval_seconds: campaign.send_interval_seconds,
            }}
          />
        )}
      </div>
    </AdminShell>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: 'red'
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div
        className={`mt-1 text-xl font-semibold tabular-nums ${
          tone === 'red' && value > 0 ? 'text-red-600' : 'text-slate-900'
        }`}
      >
        {value}
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="text-slate-500">{k}</dt>
      <dd className="text-slate-900">{v}</dd>
    </>
  )
}
