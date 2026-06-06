'use client'

import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { BannerGeneratorForm } from '@/components/admin/banner-generator-form'

export default function BannersPage() {
  return (
    <AdminShell>
      <div className="p-8 max-w-4xl">
        <PageHeader
          title="Banner Generator"
          description="Generate a finished marketing banner with AI. Give a brief and (optionally) product images, pick ecommerce or service, choose a ratio, and the image is created with OpenAI."
        />
        <BannerGeneratorForm />
      </div>
    </AdminShell>
  )
}
