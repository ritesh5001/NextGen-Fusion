'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { ArrowLeft } from 'lucide-react'

type ConversationDetail = {
  conversation: {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    company_name: string | null
    status: string
    captured_budget: string | null
    captured_timeline: string | null
    captured_requirements: string | null
    ai_summary: string | null
    booking_interest: boolean
    created_at: string
    updated_at: string
  }
  messages: Array<{
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    created_at: string
  }>
}

export default function ChatbotConversationDetailPage() {
  const params = useParams<{ id: string }>()
  const [item, setItem] = useState<ConversationDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/chatbot-conversations/${params.id}`)
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
          <Link href="/admin/chatbot-conversations" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to chatbot conversations
          </Link>
        </div>

        <PageHeader title="Chatbot conversation" description="Saved transcript and qualification data from the website assistant." />

        {loading && <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center text-slate-500">Loading…</div>}
        {!loading && error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        {!loading && item && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-semibold text-slate-900">{item.conversation.name || 'Anonymous visitor'}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.conversation.email || 'No email captured'}</p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Meta label="Phone" value={item.conversation.phone || '—'} />
                  <Meta label="Company" value={item.conversation.company_name || '—'} />
                  <Meta label="Budget" value={item.conversation.captured_budget || '—'} />
                  <Meta label="Timeline" value={item.conversation.captured_timeline || '—'} />
                  <Meta label="Booking interest" value={item.conversation.booking_interest ? 'Yes' : 'No'} />
                  <Meta label="Status" value={item.conversation.status} />
                </div>
                {item.conversation.captured_requirements && (
                  <Section title="Captured requirements" value={item.conversation.captured_requirements} />
                )}
                {item.conversation.ai_summary && (
                  <Section title="Assistant summary" value={item.conversation.ai_summary} />
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-medium text-slate-900">Transcript</div>
              <div className="mt-4 space-y-3">
                {item.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === 'assistant'
                        ? 'border border-slate-200 bg-slate-50 text-slate-800'
                        : 'bg-slate-900 text-white'
                    }`}>
                      <div className="mb-1 text-[10px] uppercase tracking-[0.18em] opacity-60">{message.role}</div>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                ))}
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

function Section({ title, value }: { title: string; value: string }) {
  return (
    <div className="mt-6">
      <div className="text-sm font-medium text-slate-700">{title}</div>
      <div className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{value}</div>
    </div>
  )
}
