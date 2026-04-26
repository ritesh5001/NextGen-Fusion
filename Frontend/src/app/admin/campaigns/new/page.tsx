import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { CampaignForm } from '@/components/admin/campaign-form'

export default function NewCampaignPage() {
  const fromEmail = process.env.RESEND_FROM_EMAIL || ''
  const fromName = process.env.RESEND_FROM_NAME || 'NextGen Fusion'
  const replyTo = process.env.RESEND_REPLY_TO || ''
  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        <PageHeader
          title="New campaign"
          description="Configure the email content, pacing, and follow-up. You'll add recipients on the next screen."
        />
        <CampaignForm
          initial={{
            from_email: fromEmail,
            from_name: fromName,
            reply_to: replyTo,
          }}
        />
      </div>
    </AdminShell>
  )
}
