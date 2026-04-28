import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { CampaignForm } from '@/components/admin/campaign-form'

export default function NewCampaignPage() {
  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        <PageHeader
          title="New campaign"
          description="Configure the email content, pacing, and follow-up. You'll add recipients on the next screen."
        />
        <CampaignForm initial={{}} />
      </div>
    </AdminShell>
  )
}
