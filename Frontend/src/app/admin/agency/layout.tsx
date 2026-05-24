import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextGen Fusion — Agency CRM',
  robots: { index: false, follow: false },
}

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ngf-admin min-h-screen bg-slate-50 text-slate-900">
      {children}
    </div>
  )
}
