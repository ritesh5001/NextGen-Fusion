import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LogoutButton from './LogoutButton';
import { ADMIN_SESSION_COOKIE, readAdminSession } from '../../lib/auth';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const session = readAdminSession(token);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#08111d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,241,156,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(174,222,224,0.18),_transparent_30%),linear-gradient(180deg,_rgba(8,17,29,1)_0%,_rgba(4,8,15,1)_100%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-[SansitaReg] text-xs uppercase tracking-[0.35em] text-white/45">
              NextGen Fusion Admin
            </p>
            <h1 className="mt-2 font-[SansitaBold] text-3xl text-white sm:text-4xl">
              {session.name}
            </h1>
            <p className="mt-1 text-sm text-white/60">{session.email}</p>

            <nav className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/admin"
                className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/10"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/campaigns"
                className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/10"
              >
                Campaigns
              </Link>
              <Link
                href="/admin/campaigns/new"
                className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/10"
              >
                New
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="font-[SansitaReg] text-xs uppercase tracking-[0.3em] text-emerald-300/80">
                Authenticated
              </p>
              <p className="text-sm text-white/55">Protected admin session</p>
            </div>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 pb-6">{children}</main>
      </div>
    </div>
  );
}