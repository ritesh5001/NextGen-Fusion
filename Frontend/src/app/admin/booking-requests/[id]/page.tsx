'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { ArrowLeft } from 'lucide-react'

type Booking = {
  id: string
  conversation_id: string | null
  name: string
  email: string
  phone: string | null
  company_name: string | null
  request_type: 'meeting' | 'callback'
  project_summary: string | null
  budget: string | null
  timeline: string | null
  preferred_contact_time: string | null
  booking_url: string | null
  status: string
  source: string
  ai_context: string | null
  created_at: string
}

export default function BookingRequestDetailPage() {
  const params = useParams<{ id: string }>()
  const [item, setItem] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/booking-requests/${params.id}`)
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
      <div className="p-8 max-w-5xl">
        <div className="mb-6">
          <Link href="/admin/booking-requests" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to bookings
          </Link>
        </div>
        <PageHeader title="Booking request" description="Saved booking or callback request from the website." />

        {loading && <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center text-slate-500">Loading…</div>}
        {!loading && error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        {!loading && item && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-semibold text-slate-900">{item.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{item.email}</p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Meta label="Request type" value={item.request_type} />
                <Meta label="Company" value={item.company_name || '—'} />
                <Meta label="Phone" value={item.phone || '—'} />
                <Meta label="Budget" value={item.budget || '—'} />
                <Meta label="Timeline" value={item.timeline || '—'} />
                <Meta label="Preferred contact time" value={item.preferred_contact_time || '—'} />
                <Meta label="Status" value={item.status} />
                <Meta label="Created" value={new Date(item.created_at).toLocaleString()} />
              </div>
            </div>

            {item.project_summary && (
              <Section title="Project summary" value={item.project_summary} />
            )}
            {item.ai_context && (
              <Section title="Assistant context" value={item.ai_context} />
            )}
            {item.booking_url && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-sm font-medium text-slate-900">Booking link</div>
                <a href={item.booking_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-slate-700 underline">
                  {item.booking_url}
                </a>
              </div>
            )}
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
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="text-sm font-medium text-slate-900">{title}</div>
      <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{value}</div>
    </div>
  )
}
