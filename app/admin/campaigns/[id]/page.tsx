import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { ADMIN_SESSION_COOKIE, readAdminSession } from '../../../../lib/auth';
import { getCampaignDetail, serializeEvent, serializeRecipient } from '../../../../lib/campaigns';

import CampaignDetailClient from './CampaignDetailClient';

export const metadata = {
  title: 'Campaign Detail',
};

function formatDate(value?: Date | string) {
  if (!value) {
    return '-';
  }

  const date = typeof value === 'string' ? new Date(value) : value;

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleString();
}

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const session = readAdminSession(token);

  if (!session) {
    redirect('/login');
  }

  const detail = await getCampaignDetail(params.id);

  if (!detail) {
    notFound();
  }

  if (detail.campaign.createdBy !== session.id) {
    redirect('/admin/campaigns');
  }

  const { campaign, counts } = detail;

  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-[SansitaReg] text-xs uppercase tracking-[0.35em] text-[#f5f19c]">
              Campaign Detail
            </p>
            <h2 className="mt-4 max-w-2xl font-[SansitaBold] text-4xl leading-tight sm:text-5xl">
              {campaign.name}
            </h2>
            <p className="mt-3 max-w-3xl text-white/70">{campaign.subject}</p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70">
            {campaign.status}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/campaigns"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Back to campaigns
          </Link>
          <Link
            href="/admin/campaigns/new"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            New campaign
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {[
          ['Queued', counts.queued],
          ['Sent', counts.sent],
          ['Delivered', counts.delivered],
          ['Opened', counts.opened],
          ['Clicked', counts.clicked],
          ['Failed', counts.failed],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-[1.2rem] border border-white/10 bg-[#0e1727]/85 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </article>
        ))}
      </div>

      <CampaignDetailClient
        campaignId={campaign._id.toString()}
        campaignStatus={campaign.status}
      />

      <div className="rounded-[1.6rem] border border-white/10 bg-[#0e1727]/80 p-6">
        <h3 className="font-[SansitaBold] text-2xl text-[#f5f19c]">Recipient timeline</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Sent</th>
                <th className="px-3 py-2">Opened</th>
                <th className="px-3 py-2">Clicked</th>
                <th className="px-3 py-2">Last error</th>
              </tr>
            </thead>
            <tbody>
              {detail.recipients.map((recipientRaw) => {
                const recipient = serializeRecipient(recipientRaw);

                return (
                  <tr key={recipient.id} className="border-b border-white/5">
                    <td className="px-3 py-2">{recipient.email}</td>
                    <td className="px-3 py-2 capitalize">{recipient.status}</td>
                    <td className="px-3 py-2">{formatDate(recipient.sentAt)}</td>
                    <td className="px-3 py-2">{formatDate(recipient.openedAt)}</td>
                    <td className="px-3 py-2">{formatDate(recipient.clickedAt)}</td>
                    <td className="px-3 py-2 text-red-300/85">{recipient.lastError || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-[#0e1727]/80 p-6">
        <h3 className="font-[SansitaBold] text-2xl text-[#f5f19c]">Recent events</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Event</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">URL</th>
                <th className="px-3 py-2">Error</th>
              </tr>
            </thead>
            <tbody>
              {detail.events.map((eventRaw) => {
                const event = serializeEvent(eventRaw);

                return (
                  <tr key={event.id} className="border-b border-white/5">
                    <td className="px-3 py-2">{formatDate(event.at)}</td>
                    <td className="px-3 py-2 capitalize">{event.eventType}</td>
                    <td className="px-3 py-2">{event.email}</td>
                    <td className="px-3 py-2 text-white/60">{event.url || '-'}</td>
                    <td className="px-3 py-2 text-red-300/85">{event.error || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
