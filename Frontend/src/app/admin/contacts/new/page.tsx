import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { ContactForm } from '@/components/admin/contact-form'

export default function NewContactPage() {
  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        <PageHeader title="New contact" description="Add a single contact to the database." />
        <ContactForm />
      </div>
    </AdminShell>
  )
}
