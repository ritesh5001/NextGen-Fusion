'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Search, MessageSquare } from 'lucide-react'

type Conversation = {
  id: string
  name: string | null
  email: string | null
  company_name: string | null
  status: string
  last_user_message: string | null
  captured_budget: string | null
  captured_timeline: string | null
  updated_at: string
}

export default function ChatbotConversationsPage() {
  const [items, setItems] = useState<Conversation[]>([])
  const [count, setCount] = useState(0)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [setupWarning, setSetupWarning] = useState<string | null>(null)

  async function load(query = q) {
    setLoading(true)
    setError(null)
    setSetupWarning(null)
    try {
      const params = new URLSearchParams({ limit: '200' })
      if (query.trim()) params.set('q', query.trim())
      const res = await fetch(`/api/admin/chatbot-conversations?${params.toString()}`)
      const json = await res.json()
      if (json?.setupRequired) {
        setItems([])
        setCount(0)
        setSetupWarning(json?.message || 'Chat storage is not provisioned yet.')
        return
      }
      if (!res.ok) throw new Error(json?.error || 'Failed to load')
      setItems(json.data || [])
      setCount(json.count || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load('') }, [])

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <PageHeader
          title="Chatbot Conversations"
          description="Saved website assistant chats, including the assistant replies and qualification signals."
        />

        {setupWarning && <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{setupWarning}</div>}

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <form onSubmit={(e) => { e.preventDefault(); load() }} className="flex items-center gap-2 max-w-xl w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, company, or message" className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10" />
            </div>
            <button type="submit" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">Search</button>
          </form>
          <div className="text-sm text-slate-500">{loading ? 'Loading…' : `${count.toLocaleString()} conversations`}</div>
        </div>

        {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Lead</th>
                  <th className="px-4 py-2 font-medium">Latest message</th>
                  <th className="px-4 py-2 font-medium">Budget</th>
                  <th className="px-4 py-2 font-medium">Timeline</th>
                  <th className="px-4 py-2 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                      <MessageSquare className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                      No conversations yet.
                    </td>
                  </tr>
                )}
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2">
                      <Link href={`/admin/chatbot-conversations/${item.id}`} className="font-medium text-slate-900 hover:underline">
                        {item.name || 'Anonymous visitor'}
                      </Link>
                      <div className="text-xs text-slate-500">{item.email || 'No email captured'}</div>
                      <div className="text-xs text-slate-400">{item.company_name || item.status}</div>
                    </td>
                    <td className="px-4 py-2 text-slate-700 max-w-md">
                      <div className="line-clamp-2">{item.last_user_message || '—'}</div>
                    </td>
                    <td className="px-4 py-2 text-slate-700">{item.captured_budget || '—'}</td>
                    <td className="px-4 py-2 text-slate-700">{item.captured_timeline || '—'}</td>
                    <td className="px-4 py-2 text-slate-500">{new Date(item.updated_at).toLocaleString()}</td>
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
