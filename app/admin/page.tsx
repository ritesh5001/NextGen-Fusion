import { cookies } from 'next/headers';

import { ADMIN_SESSION_COOKIE, readAdminSession } from '../../lib/auth';

const adminHighlights = [
  {
    title: 'Session status',
    value: 'Active',
    description: 'The current admin session is verified by a signed httpOnly cookie.',
  },
  {
    title: 'Database',
    value: 'MongoDB',
    description: 'Credentials are stored in the admins collection with hashed passwords.',
  },
  {
    title: 'Access',
    value: 'Restricted',
    description: 'Only the seeded admin account can sign in to the protected area.',
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
          This protected area is ready for future admin tools. For now it confirms the login flow,
          MongoDB connection, and session persistence are all wired correctly.
        </p>
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