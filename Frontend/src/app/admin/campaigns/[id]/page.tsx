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

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

function formatDuration(ms: number | null): string {
  if (ms == null || !Number.isFinite(ms) || ms <= 0) return '—'
  const totalMinutes = Math.round(ms / 60000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
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
  const queue = recipients
    .filter((r) => r.status === 'pending' || r.status === 'followup_pending')
    .slice()
    .sort((a, b) => {
      const at = a.next_send_at ? new Date(a.next_send_at).getTime() : Number.POSITIVE_INFINITY
      const bt = b.next_send_at ? new Date(b.next_send_at).getTime() : Number.POSITIVE_INFINITY
      return at - bt
    })
  const nextMail = queue[0] || null
  const timeline = queue.slice(0, 8)
  const sentLogs = logs.filter((log) => log.status === 'sent')
  const failedLogs = logs.filter((log) => log.status === 'failed')
  const initialLogs = logs.filter((log) => log.email_type === 'initial')
  const followupLogs = logs.filter((log) => log.email_type.startsWith('followup_'))
  const followupQueued = recipients.filter((r) => r.status === 'followup_pending').length
  const initialDelivered = recipients.filter((r) => r.initial_sent_at).length
  const completedRecipients = recipients.filter((r) => r.status === 'completed').length
  const failedRecipients = recipients.filter((r) => r.status === 'failed').length
  const deliveryRate = counts.total ? (initialDelivered / counts.total) * 100 : 0
  const completionRate = counts.total ? (completedRecipients / counts.total) * 100 : 0
  const failureRate = logs.length ? (failedLogs.length / logs.length) * 100 : 0
  const queueRate = counts.total ? (queue.length / counts.total) * 100 : 0
  const avgFollowupsPerRecipient = initialDelivered ? followupLogs.length / initialDelivered : 0
  const latestQueuedAt = queue.length > 0 ? queue[queue.length - 1].next_send_at : null
  const campaignStartMs = campaign.started_at ? new Date(campaign.started_at).getTime() : null
  const campaignEndMs = campaign.completed_at
    ? new Date(campaign.completed_at).getTime()
    : campaign.status === 'active'
      ? Date.now()
      : null
  const runtimeMs =
    campaignStartMs != null && campaignEndMs != null ? campaignEndMs - campaignStartMs : null
  const sortedSentLogs = sentLogs
    .slice()
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  const avgGapMs =
    sortedSentLogs.length > 1
      ? sortedSentLogs.slice(1).reduce((sum, log, index) => {
          const prev = new Date(sortedSentLogs[index].created_at).getTime()
          const next = new Date(log.created_at).getTime()
          return sum + (next - prev)
        }, 0) /
        (sortedSentLogs.length - 1)
      : null
  const sendVelocityPerHour =
    runtimeMs && runtimeMs > 0 ? sentLogs.length / (runtimeMs / (60 * 60 * 1000)) : 0
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const sentToday = sentLogs.filter((log) => new Date(log.created_at).getTime() >= startOfToday).length
  const failedToday = failedLogs.filter((log) => new Date(log.created_at).getTime() >= startOfToday).length
  const statusBreakdown = [
    { label: 'Pending', value: counts.pending || 0, tone: 'slate' as const },
    { label: 'Follow-up queued', value: followupQueued, tone: 'indigo' as const },
    { label: 'Completed', value: completedRecipients, tone: 'emerald' as const },
    { label: 'Failed', value: failedRecipients, tone: 'red' as const },
  ]
  const hourlyBuckets = Array.from({ length: 24 }, (_, hour) => {
    const value = sentLogs.filter((log) => new Date(log.created_at).getHours() === hour).length
    return { hour, value }
  })
  const peakHour = hourlyBuckets.reduce(
    (best, bucket) => (bucket.value > best.value ? bucket : best),
    { hour: 0, value: 0 }
  )
  const maxHourlyValue = hourlyBuckets.reduce((best, bucket) => Math.max(best, bucket.value), 0)
  const recentActivity = logs
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8)

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

        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-sm text-slate-500 mb-1">Queue</div>
            <div className="text-3xl font-semibold text-slate-900">{queue.length}</div>
            <div className="mt-2 text-sm text-slate-600">
              {queue.length === 0
                ? 'No recipients waiting to be sent.'
                : `${queue.length.toLocaleString()} recipients are waiting in the send queue.`}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-sm text-slate-500 mb-1">Next mail</div>
            {nextMail ? (
              <div className="space-y-2">
                <div className="text-lg font-semibold text-slate-900 truncate">
                  {nextMail.contacts?.email || '(deleted contact)'}
                </div>
                <div className="text-sm text-slate-600">
                  {nextMail.status === 'followup_pending' ? 'Follow-up' : 'Initial send'} queued for{' '}
                  {nextMail.next_send_at ? new Date(nextMail.next_send_at).toLocaleString() : '—'}
                </div>
                <div className="text-xs text-slate-500">
                  {formatTimeUntil(nextMail.next_send_at)} · {nextMail.contacts?.company || 'No company'}
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-600">Nothing is queued right now.</div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-sm text-slate-500 mb-1">Timeline</div>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {timeline.length === 0 ? (
                <div className="text-sm text-slate-600">No scheduled sends.</div>
              ) : (
                timeline.map((r, idx) => (
                  <div key={r.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-900 mt-1" />
                      {idx !== timeline.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                    </div>
                    <div className="min-w-0 pb-3">
                      <div className="text-sm font-medium text-slate-900 truncate">
                        {r.contacts?.email || '(deleted contact)'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {r.status === 'followup_pending' ? 'Follow-up' : 'Initial'} ·{' '}
                        {r.next_send_at ? new Date(r.next_send_at).toLocaleString() : '—'} ·{' '}
                        {formatTimeUntil(r.next_send_at)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
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
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-medium text-slate-900">Campaign analytics</h3>
                  <p className="text-sm text-slate-500">
                    Full delivery, queue, and runtime analytics for this campaign.
                  </p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <div>{logs.length.toLocaleString()} log entries</div>
                  <div>{recipients.length.toLocaleString()} recipients tracked</div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 mb-6">
                <AnalyticsCard
                  label="Delivery rate"
                  value={formatPercent(deliveryRate)}
                  hint={`${initialDelivered.toLocaleString()} of ${counts.total.toLocaleString()} received the initial email`}
                />
                <AnalyticsCard
                  label="Completion rate"
                  value={formatPercent(completionRate)}
                  hint={`${completedRecipients.toLocaleString()} recipients fully completed`}
                />
                <AnalyticsCard
                  label="Failure rate"
                  value={formatPercent(failureRate)}
                  hint={`${failedLogs.length.toLocaleString()} failed attempts out of ${logs.length.toLocaleString()}`}
                  tone="red"
                />
                <AnalyticsCard
                  label="Queue load"
                  value={formatPercent(queueRate)}
                  hint={`${queue.length.toLocaleString()} recipients still waiting`}
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <AnalyticsPanel title="Performance">
                  <MetricRow label="Sent successfully" value={sentLogs.length.toLocaleString()} />
                  <MetricRow label="Sent today" value={sentToday.toLocaleString()} />
                  <MetricRow label="Failed today" value={failedToday.toLocaleString()} />
                  <MetricRow
                    label="Velocity"
                    value={sendVelocityPerHour > 0 ? `${sendVelocityPerHour.toFixed(1)}/hr` : '—'}
                  />
                  <MetricRow label="Average send gap" value={formatDuration(avgGapMs)} />
                  <MetricRow label="Campaign runtime" value={formatDuration(runtimeMs)} />
                </AnalyticsPanel>

                <AnalyticsPanel title="Queue forecast">
                  <MetricRow label="Queued now" value={queue.length.toLocaleString()} />
                  <MetricRow label="Follow-up queued" value={followupQueued.toLocaleString()} />
                  <MetricRow
                    label="Next mail"
                    value={nextMail?.next_send_at ? new Date(nextMail.next_send_at).toLocaleString() : '—'}
                  />
                  <MetricRow
                    label="Queue clears by"
                    value={latestQueuedAt ? new Date(latestQueuedAt).toLocaleString() : '—'}
                  />
                  <MetricRow
                    label="Daily send limit"
                    value={campaign.daily_send_limit ? campaign.daily_send_limit.toLocaleString() : 'Unlimited'}
                  />
                  <MetricRow
                    label="Configured interval"
                    value={`${campaign.send_interval_seconds.toLocaleString()}s`}
                  />
                </AnalyticsPanel>

                <AnalyticsPanel title="Sequence mix">
                  <MetricRow label="Initial sends" value={initialLogs.length.toLocaleString()} />
                  <MetricRow label="Follow-up sends" value={followupLogs.length.toLocaleString()} />
                  <MetricRow
                    label="Avg follow-ups / delivered"
                    value={initialDelivered ? avgFollowupsPerRecipient.toFixed(2) : '0.00'}
                  />
                  <MetricRow
                    label="Follow-up enabled"
                    value={campaign.followup_enabled ? 'Yes' : 'No'}
                  />
                  <MetricRow
                    label="Follow-up delay"
                    value={`${campaign.followup_days.toLocaleString()} day${campaign.followup_days === 1 ? '' : 's'}`}
                  />
                  <MetricRow
                    label="Max follow-ups"
                    value={campaign.max_followups.toLocaleString()}
                  />
                </AnalyticsPanel>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-medium text-slate-900 mb-4">Recipient status distribution</h3>
                <div className="space-y-4">
                  {statusBreakdown.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-medium text-slate-900">
                          {item.value.toLocaleString()}
                        </span>
                      </div>
                      <ProgressBar
                        value={counts.total ? (item.value / counts.total) * 100 : 0}
                        tone={item.tone}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-medium text-slate-900 mb-4">Best send hour</h3>
                <div className="text-3xl font-semibold text-slate-900">
                  {peakHour.value > 0 ? `${String(peakHour.hour).padStart(2, '0')}:00` : '—'}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  {peakHour.value > 0
                    ? `${peakHour.value.toLocaleString()} successful sends happened in this hour block.`
                    : 'No successful sends recorded yet.'}
                </div>
                <div className="mt-5 grid grid-cols-12 gap-1 items-end h-32">
                  {hourlyBuckets.map((bucket) => (
                    <div key={bucket.hour} className="flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-slate-900/80 min-h-1"
                        style={{
                          height:
                            maxHourlyValue > 0
                              ? `${Math.max(6, (bucket.value / maxHourlyValue) * 100)}%`
                              : '6px',
                        }}
                        title={`${String(bucket.hour).padStart(2, '0')}:00 - ${bucket.value} sends`}
                      />
                      <div className="text-[10px] text-slate-400">
                        {bucket.hour % 4 === 0 ? String(bucket.hour).padStart(2, '0') : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-medium text-slate-900 mb-4">Upcoming timeline</h3>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {timeline.length === 0 ? (
                    <div className="text-sm text-slate-600">No scheduled sends.</div>
                  ) : (
                    timeline.map((r, idx) => (
                      <div key={r.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-slate-900 mt-1" />
                          {idx !== timeline.length - 1 && (
                            <div className="w-px flex-1 bg-slate-200 mt-1" />
                          )}
                        </div>
                        <div className="min-w-0 pb-3">
                          <div className="text-sm font-medium text-slate-900 truncate">
                            {r.contacts?.email || '(deleted contact)'}
                          </div>
                          <div className="text-xs text-slate-500">
                            {r.status === 'followup_pending' ? 'Follow-up' : 'Initial'} send
                          </div>
                          <div className="text-xs text-slate-500">
                            {r.next_send_at ? new Date(r.next_send_at).toLocaleString() : '—'} ·{' '}
                            {formatTimeUntil(r.next_send_at)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-medium text-slate-900 mb-4">Recent activity</h3>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {recentActivity.length === 0 ? (
                    <div className="text-sm text-slate-600">No send activity yet.</div>
                  ) : (
                    recentActivity.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-slate-900 truncate">
                            {log.to_email || 'Unknown recipient'}
                          </div>
                          <div className="text-xs text-slate-500">
                            {log.email_type} · {log.subject || 'No subject'}
                          </div>
                          <div className="text-xs text-slate-500">
                            {new Date(log.created_at).toLocaleString()}
                          </div>
                        </div>
                        <span
                          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded ${
                            log.status === 'sent'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

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

function AnalyticsCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string
  value: string
  hint: string
  tone?: 'red'
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${tone === 'red' ? 'text-red-600' : 'text-slate-900'}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-500">{hint}</div>
    </div>
  )
}

function AnalyticsPanel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <h4 className="text-sm font-medium text-slate-900 mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900 text-right">{value}</span>
    </div>
  )
}

function ProgressBar({
  value,
  tone,
}: {
  value: number
  tone: 'slate' | 'indigo' | 'emerald' | 'red'
}) {
  const toneClass =
    tone === 'indigo'
      ? 'bg-indigo-500'
      : tone === 'emerald'
        ? 'bg-emerald-500'
        : tone === 'red'
          ? 'bg-red-500'
          : 'bg-slate-700'

  return (
    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
      <div className={`h-full rounded-full ${toneClass}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
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
