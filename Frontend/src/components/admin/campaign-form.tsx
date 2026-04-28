'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export type CampaignFormValue = {
  id?: string
  name: string
  description: string
  from_name: string
  from_email: string
  reply_to: string
  subject: string
  body_html: string
  followup_enabled: boolean
  followup_days: number
  followup_subject: string
  followup_body_html: string
  max_followups: number
  send_interval_seconds: number
  daily_send_limit: number
}

const DEFAULT_BODY = `<p>Hi {{first_name}},</p>

<p>I'm reaching out from NextGen Fusion. I came across {{company}} and wanted to share how we help teams like yours ship better software, faster.</p>

<p>Would you be open to a quick 15-minute call this week to see if there's a fit?</p>

<p>Best,<br/>The NextGen Fusion Team</p>`

const DEFAULT_FOLLOWUP = `<p>Hi {{first_name}},</p>

<p>Just bumping this in case it slipped through. Happy to send a short Loom or a few case studies if that's easier than a call.</p>

<p>Best,<br/>The NextGen Fusion Team</p>`

export function CampaignForm({ initial }: { initial?: Partial<CampaignFormValue> }) {
  const router = useRouter()
  const [value, setValue] = useState<CampaignFormValue>({
    id: initial?.id,
    name: initial?.name || '',
    description: initial?.description || '',
    from_name: initial?.from_name || 'NextGen Fusion',
    from_email: initial?.from_email || '',
    reply_to: initial?.reply_to || '',
    subject: initial?.subject || '',
    body_html: initial?.body_html || DEFAULT_BODY,
    followup_enabled: initial?.followup_enabled ?? true,
    followup_days: initial?.followup_days ?? 3,
    followup_subject: initial?.followup_subject || '',
    followup_body_html: initial?.followup_body_html || DEFAULT_FOLLOWUP,
    max_followups: initial?.max_followups ?? 1,
    send_interval_seconds: initial?.send_interval_seconds ?? 60,
    daily_send_limit: initial?.daily_send_limit ?? 0,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof CampaignFormValue>(k: K, v: CampaignFormValue[K]) {
    setValue((p) => ({ ...p, [k]: v }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const url = value.id ? `/api/admin/campaigns/${value.id}` : '/api/admin/campaigns'
      const method = value.id ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Save failed')
      router.push(`/admin/campaigns/${json.data.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <Section title="Campaign basics">
        <Field label="Campaign name" required>
          <input
            required
            value={value.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Q2 Outreach — SaaS founders"
            className={inputClass}
          />
        </Field>
        <Field label="Internal description">
          <input
            value={value.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Optional. Notes for your future self."
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Sender">
        <div className="grid grid-cols-2 gap-4">
          <Field label="From name" required>
            <input
              required
              value={value.from_name}
              onChange={(e) => update('from_name', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="From email" required>
            <input
              required
              type="email"
              value={value.from_email}
              onChange={(e) => update('from_email', e.target.value)}
              placeholder="campaigns@nextgenfusion.in"
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Reply-to">
          <input
            value={value.reply_to}
            onChange={(e) => update('reply_to', e.target.value)}
            placeholder="hello@nextgenfusion.in"
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Pacing">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Seconds between each recipient" required>
            <input
              required
              type="number"
              min={1}
              value={value.send_interval_seconds}
              onChange={(e) => update('send_interval_seconds', Number(e.target.value))}
              className={inputClass}
            />
            <p className="text-xs text-slate-500 mt-1">
              e.g. 60 = one email per minute. Helps avoid spam filters and rate limits.
            </p>
          </Field>
          <Field label="Follow-up after (days)" required>
            <input
              required
              type="number"
              min={0}
              value={value.followup_days}
              onChange={(e) => update('followup_days', Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Daily send limit (0 = no limit)">
            <input
              type="number"
              min={0}
              value={value.daily_send_limit}
              onChange={(e) => update('daily_send_limit', Number(e.target.value))}
              className={inputClass}
            />
            <p className="text-xs text-slate-500 mt-1">
              Sets the maximum number of emails this campaign can send per day.
            </p>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700 mt-2">
            <input
              type="checkbox"
              checked={value.followup_enabled}
              onChange={(e) => update('followup_enabled', e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Enable follow-up emails
          </label>
          <Field label="Max follow-ups per recipient">
            <input
              type="number"
              min={0}
              max={5}
              value={value.max_followups}
              onChange={(e) => update('max_followups', Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Initial email"
        hint="Use {{first_name}}, {{name}}, {{company}}, {{email}}, {{phone}}, {{website}}, {{industry}} or any custom CSV column as variables."
      >
        <Field label="Subject" required>
          <input
            required
            value={value.subject}
            onChange={(e) => update('subject', e.target.value)}
            placeholder="Quick idea for {{company}}"
            className={inputClass}
          />
        </Field>
        <Field label="HTML body" required>
          <textarea
            required
            rows={10}
            value={value.body_html}
            onChange={(e) => update('body_html', e.target.value)}
            className={inputClass + ' font-mono text-xs leading-relaxed'}
          />
        </Field>
      </Section>

      {value.followup_enabled && (
        <Section title="Follow-up email">
          <Field label="Follow-up subject (leave blank to use 'Re: ' + initial subject)">
            <input
              value={value.followup_subject}
              onChange={(e) => update('followup_subject', e.target.value)}
              placeholder={`Re: ${value.subject || 'Quick idea for {{company}}'}`}
              className={inputClass}
            />
          </Field>
          <Field label="Follow-up HTML body">
            <textarea
              rows={8}
              value={value.followup_body_html}
              onChange={(e) => update('followup_body_html', e.target.value)}
              className={inputClass + ' font-mono text-xs leading-relaxed'}
            />
          </Field>
        </Section>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          {saving ? 'Saving…' : value.id ? 'Save changes' : 'Create campaign'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400'

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
      <div>
        <h3 className="font-medium text-slate-900">{title}</h3>
        {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  )
}
