import Link from 'next/link';
import { cookies } from 'next/headers';

import { ADMIN_SESSION_COOKIE, readAdminSession } from '../../../lib/auth';
import { listCampaigns, serializeCampaign } from '../../../lib/campaigns';

export const metadata = {
  title: 'Campaigns',
};

export default async function CampaignsPage() {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const session = readAdminSession(token);
  const campaigns = await listCampaigns(session?.id);

  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
        <p className="font-[SansitaReg] text-xs uppercase tracking-[0.35em] text-[#f5f19c]">
          Campaign Manager
        </p>
        <h2 className="mt-4 max-w-2xl font-[SansitaBold] text-4xl leading-tight sm:text-5xl">
          Build, run, and track every outreach campaign.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
          Create a campaign, add recipients via CSV/manual input, and monitor each delivery stage:
          queued, sent, delivered, opened, clicked, or failed.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admin/campaigns/new"
            className="rounded-xl bg-[#f5f19c] px-5 py-3 font-[SansitaBold] text-black transition hover:brightness-95"
          >
            New campaign
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaignRecord) => {
          const campaign = serializeCampaign(campaignRecord);
          const stats = campaignRecord.stats;

          return (
            <article
              key={campaign?.id}
              className="rounded-[1.6rem] border border-white/10 bg-[#0e1727]/85 p-6 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-[SansitaBold] text-2xl text-[#f5f19c]">{campaign?.name}</h3>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
                  {campaign?.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-white/60">{campaign?.subject}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-white/45">Recipients</p>
                  <p className="mt-1 text-lg font-semibold text-white">{stats.totalRecipients}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-white/45">Queued</p>
                  <p className="mt-1 text-lg font-semibold text-white">{stats.queuedCount}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-white/45">Opened</p>
                  <p className="mt-1 text-lg font-semibold text-white">{stats.openedCount}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-white/45">Clicked</p>
                  <p className="mt-1 text-lg font-semibold text-white">{stats.clickedCount}</p>
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href={`/admin/campaigns/${campaign?.id}`}
                  className="inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  Open campaign
                </Link>
              </div>
            </article>
          );
        })}

        {!campaigns.length ? (
          <article className="rounded-[1.6rem] border border-white/10 bg-[#0e1727]/85 p-8 text-white/65">
            No campaigns yet. Create your first campaign to start sending emails.
          </article>
        ) : null}
      </div>
    </section>
  );
}
