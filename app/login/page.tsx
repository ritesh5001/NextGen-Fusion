import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ADMIN_SESSION_COOKIE, readAdminSession } from '../../lib/auth';

import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: '/login',
  },
};

export default function LoginPage() {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const session = readAdminSession(token);

  if (session) {
    redirect('/admin');
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08111d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,241,156,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(174,222,224,0.18),_transparent_35%),linear-gradient(180deg,_rgba(8,17,29,1)_0%,_rgba(4,8,15,1)_100%)]" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-12">
        <section className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur md:p-12">
          <p className="font-[SansitaReg] text-xs uppercase tracking-[0.4em] text-white/45">
            NextGen Fusion
          </p>
          <h1 className="mt-4 max-w-xl font-[SansitaBold] text-5xl leading-tight sm:text-6xl">
            Admin login for the protected dashboard.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Sign in with the seeded admin account to manage the private area of the website. The
            session is stored in a secure httpOnly cookie and backed by MongoDB.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['MongoDB', 'Admin credentials are stored in a dedicated collection.'],
              ['JWT cookie', 'Sessions persist through a signed httpOnly cookie.'],
              ['Protected route', 'Direct access to /admin redirects if you are signed out.'],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-[#0e1727]/85 p-4"
              >
                <h2 className="font-[SansitaBold] text-lg text-[#f5f19c]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/62">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0e1727]/90 p-8 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="font-[SansitaReg] text-xs uppercase tracking-[0.35em] text-[#f5f19c]">
              Secure entry
            </p>
            <h2 className="mt-4 font-[SansitaBold] text-3xl text-white">Sign in to continue</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Use the admin email and password defined in your environment variables.
            </p>

            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}