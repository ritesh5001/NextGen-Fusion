import { cookies } from 'next/headers';
import Link from 'next/link';

import { ADMIN_SESSION_COOKIE, readAdminSession } from '../../lib/auth';

const adminHighlights = [
  {
    title: 'Campaign setup',
    value: 'Create draft',
    description: 'Define a subject and HTML message, then add recipients by CSV or manual entry.',
  },
  {
    title: 'Delivery pacing',
    value: '100 / 24h',
    description: 'Queue sending to distribute emails over time and reduce spam-like traffic spikes.',
  },
  {
    title: 'Lifecycle tracking',
    value: 'End-to-end',
    description: 'Monitor queued, sent, delivered, opened, clicked, and failed statuses per recipient.',
  },
];

export default function AdminDashboardPage() {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const session = readAdminSession(token);

  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
        <p className="font-[SansitaReg] text-xs uppercase tracking-[0.35em] text-[#f5f19c]">
          Dashboard
        </p>
        <h2 className="mt-4 max-w-2xl font-[SansitaBold] text-4xl leading-tight sm:text-5xl">
          Welcome back, {session?.name || 'Admin'}.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
          Campaign management is now available in the protected dashboard. Build campaigns, import
          business-owner recipients, and monitor where each email is queued, sent, opened, clicked,
          or failed.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admin/campaigns"
            className="rounded-xl bg-[#f5f19c] px-5 py-3 font-[SansitaBold] text-black transition hover:brightness-95"
          >
            Open campaigns
          </Link>
          <Link
            href="/admin/campaigns/new"
            className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10"
          >
            Create new campaign
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {adminHighlights.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.6rem] border border-white/10 bg-[#0e1727]/85 p-6 backdrop-blur"
          >
            <p className="font-[SansitaReg] text-xs uppercase tracking-[0.3em] text-white/40">
              {item.title}
            </p>
            <h3 className="mt-4 font-[SansitaBold] text-2xl text-[#f5f19c]">{item.value}</h3>
            <p className="mt-3 text-sm leading-6 text-white/65">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}