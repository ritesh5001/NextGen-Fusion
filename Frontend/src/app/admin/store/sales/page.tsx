'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { ArrowLeft, Mail, Download } from 'lucide-react'

type Purchase = {
  id: string
  customer_email: string
  customer_name: string | null
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  license_key: string | null
  download_count: number
  download_limit: number
  razorpay_payment_id: string | null
  created_at: string
  paid_at: string | null
  store_products: { title: string; slug: string } | null
}

function errorMessage(json: { error?: string; details?: string } | null, fallback: string): string {
  const base = json?.error || fallback
  return json?.details ? `${base}: ${json.details}` : base
}

function fmtDate(s: string | null): string {
  if (!s) return '—'
  return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const badge: Record<string, string> = {
  paid: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  failed: 'bg-red-50 text-red-600',
  refunded: 'bg-slate-100 text-slate-500',
}

export default function AdminSalesPage() {
  const [items, setItems] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendingId, setResendingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/store-purchases')
      const json = await res.json()
      if (!res.ok) throw new Error(errorMessage(json, 'Failed to load sales'))
      setItems(json.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sales')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const stats = useMemo(() => {
    const paid = items.filter((i) => i.status === 'paid')
    const revenue = paid.reduce((sum, i) => sum + (i.amount || 0), 0)
    return {
      revenue,
      sales: paid.length,
      pending: items.filter((i) => i.status === 'pending').length,
      downloads: items.reduce((sum, i) => sum + (i.download_count || 0), 0),
    }
  }, [items])

  async function resend(p: Purchase) {
    setResendingId(p.id)
    try {
      const res = await fetch(`/api/admin/store-purchases/${p.id}/resend`, { method: 'POST' })
      const json = await res.json()
      if (!res.ok) throw new Error(errorMessage(json, 'Failed to resend'))
      alert(`Delivery email re-sent to ${p.customer_email}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to resend')
    } finally {
      setResendingId(null)
    }
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <Link href="/admin/store" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> Back to products
        </Link>
        <div className="mt-3">
          <PageHeader title="Sales" description="Purchases, revenue, and downloads across the store." />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Revenue (paid)</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">₹{stats.revenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Sales</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{stats.sales}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Pending</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{stats.pending}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Downloads</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{stats.downloads}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Product</th>
                  <th className="px-4 py-2 font-medium">Customer</th>
                  <th className="px-4 py-2 font-medium">Amount</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Downloads</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="px-4 py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                      No sales yet.
                    </td>
                  </tr>
                )}
                {items.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-900">{p.store_products?.title || '—'}</td>
                    <td className="px-4 py-2 text-slate-700">
                      {p.customer_email}
                      {p.customer_name && <span className="block text-xs text-slate-400">{p.customer_name}</span>}
                    </td>
                    <td className="px-4 py-2 text-slate-700">₹{(p.amount || 0).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-2">
                      <span className={'text-xs px-2 py-0.5 rounded-full ' + (badge[p.status] || 'bg-slate-100 text-slate-500')}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      <span className="inline-flex items-center gap-1">
                        <Download className="h-3.5 w-3.5 text-slate-400" />
                        {p.download_count}/{p.download_limit}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-slate-500">{fmtDate(p.paid_at || p.created_at)}</td>
                    <td className="px-4 py-2 text-right">
                      {p.status === 'paid' && (
                        <button
                          onClick={() => resend(p)}
                          disabled={resendingId === p.id}
                          className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-600 hover:bg-slate-200 disabled:opacity-50"
                          title="Re-send download link"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {resendingId === p.id ? 'Sending…' : 'Resend'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
