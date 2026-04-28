'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { ArrowLeft, Mail, Send } from 'lucide-react'

type Submission = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  information_source: string
  status: 'new' | 'replied'
  admin_reply_subject: string | null
  admin_reply_body: string | null
  last_emailed_at: string | null
  email_count: number
  last_email_message_id: string | null
  last_email_error: string | null
  created_at: string
  updated_at: string
}

export default function ContactFormDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params.id
  const [item, setItem] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/contact-forms/${id}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Failed to load submission')
        setItem(json.data)
        setSubject(json.data?.admin_reply_subject || `We got your form, ${json.data?.name || 'there'}`)
        setBody(
          json.data?.admin_reply_body ||
            defaultReplyBody(json.data?.name || 'there', json.data?.information_source || 'your website form')
        )
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load submission')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  async function sendEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!item) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/contact-forms/${item.id}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Email failed')
      setItem(json.data)
      setSubject(json.data?.admin_reply_subject || subject)
      setBody(json.data?.admin_reply_body || body)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Email failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <div className="mb-6">
          <Link
            href="/admin/contact-forms"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to submissions
          </Link>
        </div>

        <PageHeader
          title="Submission details"
          description="Review the form and send a follow-up email from this screen."
        />

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center text-slate-500">
            Loading…
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && item && (
          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Contact</div>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">{item.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{item.email}</p>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <div>{new Date(item.created_at).toLocaleString()}</div>
                    <div className="mt-1">{item.status}</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Meta label="Phone" value={item.phone} />
                  <Meta label="Source" value={item.information_source} />
                  <Meta label="Email count" value={String(item.email_count || 0)} />
                  <Meta label="Last emailed" value={item.last_emailed_at ? new Date(item.last_emailed_at).toLocaleString() : '—'} />
                </div>

                <div className="mt-6">
                  <div className="text-sm font-medium text-slate-700">Message</div>
                  <div className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                    {item.message}
                  </div>
                </div>

                {item.last_email_error && (
                  <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    Last email error: {item.last_email_error}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500" />
                <h3 className="text-lg font-semibold text-slate-900">Send email reply</h3>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Use a short acknowledgement like “We got your form, we will reach you soon”.
              </p>

              <form onSubmit={sendEmail} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    placeholder="We got your form"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    placeholder="Write a reply that reassures the lead you will follow up soon."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {saving ? 'Sending…' : 'Send email'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubject(`We got your form, ${item.name}`)
                      setBody(defaultReplyBody(item.name, item.information_source))
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Use default reply
                  </button>
                </div>
              </form>

              {item.admin_reply_subject && (
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="font-medium text-slate-900">Last sent reply</div>
                  <div className="mt-2 text-slate-600">{item.admin_reply_subject}</div>
                </div>
              )}
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
      <div className="mt-1 text-sm font-medium text-slate-900 break-words">{value || '—'}</div>
    </div>
  )
}

function defaultReplyBody(name: string, source: string) {
  return `<h2 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#0f172a">Thanks, ${escapeHtml(name)}.</h2>
<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#334155">
We got your form submission from ${escapeHtml(source)} and we will reach you soon.
</p>
<p style="margin:0;font-size:16px;line-height:1.7;color:#334155">
If your request is urgent, reply to this email and we will prioritize it.
</p>`
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
