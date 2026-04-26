import type { Metadata } from 'next'
import './admin.css'

export const metadata: Metadata = {
  title: 'NextGen Fusion — Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="ngf-admin min-h-screen bg-slate-50 text-slate-900">{children}</div>
}
