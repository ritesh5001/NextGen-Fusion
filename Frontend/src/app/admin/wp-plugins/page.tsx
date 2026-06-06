'use client'

import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { WpPluginForm } from '@/components/admin/wp-plugin-form'

export default function WpPluginsPage() {
  return (
    <AdminShell>
      <div className="p-8 max-w-4xl">
        <PageHeader
          title="WP Plugin Generator"
          description="Generate two installable WordPress plugins (Pages + Header/Footer) from a brand's details. Colors are extracted from the logo by AI."
        />
        <WpPluginForm />
      </div>
    </AdminShell>
  )
}
