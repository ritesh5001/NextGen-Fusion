'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { ClientBrandForm } from '@/components/admin/client-brand-form'

type Client = { id: string; name: string; company: string | null; email: string }

export default function ClientBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    fetch('/api/admin/client-users')
      .then((r) => r.json())
      .then((j) => {
        const found = (j.data as Client[] | undefined)?.find((c) => c.id === id) ?? null
        setClient(found)
      })
      .catch(() => {})
  }, [id])

  const subtitle = client
    ? `${client.name || client.email}${client.company ? ` · ${client.company}` : ''}`
    : 'Website & brand details'

  return (
    <AdminShell>
      <div className="p-8 max-w-4xl">
        <Link href="/admin/clients" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Link>
        <PageHeader
          title="Brand profile"
          description={`${subtitle} — saved once here, then reused to prefill the WP Plugin and Banner generators.`}
        />
        <ClientBrandForm clientId={id} />
      </div>
    </AdminShell>
  )
}
