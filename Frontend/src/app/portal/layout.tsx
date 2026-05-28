import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextGen Fusion — Client Portal',
  robots: { index: false, follow: false },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ngf-admin min-h-screen bg-slate-50 text-slate-900">
      {children}
    </div>
  )
}
