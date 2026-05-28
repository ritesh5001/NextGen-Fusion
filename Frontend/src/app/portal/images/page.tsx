'use client'

import { PortalShell, PageHeader } from '@/components/portal/portal-shell'
import { ImageManager } from '@/components/portal/image-library'

export default function PortalImagesPage() {
  return (
    <PortalShell>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="My Images"
          description="Upload product photos here, then pick them when building products."
        />
        <ImageManager />
      </div>
    </PortalShell>
  )
}
