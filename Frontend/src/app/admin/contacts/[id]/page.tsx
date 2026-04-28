import { notFound } from 'next/navigation'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { ContactForm } from '@/components/admin/contact-form'
import { serverFetch } from '@/lib/server-fetch'

export const dynamic = 'force-dynamic'

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await serverFetch(`/api/admin/contacts/${id}`)
  if (!res.ok) notFound()
  const { data } = await res.json()
  if (!data) notFound()
  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        <PageHeader title="Edit contact" description={data.email} />
        <ContactForm
          initial={{
            id: data.id,
            email: data.email,
            name: data.name || '',
            company: data.company || '',
            phone: data.phone || '',
            website: data.website || '',
            industry: data.industry || '',
            notes: data.notes || '',
            unsubscribed: !!data.unsubscribed,
          }}
        />
      </div>
    </AdminShell>
  )
}
