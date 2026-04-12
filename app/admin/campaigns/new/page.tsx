import Link from 'next/link';

import CampaignCreateForm from '../CampaignCreateForm';

export const metadata = {
  title: 'New Campaign',
};

export default function NewCampaignPage() {
  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
        <p className="font-[SansitaReg] text-xs uppercase tracking-[0.35em] text-[#f5f19c]">
          Create Campaign
        </p>
        <h2 className="mt-4 max-w-2xl font-[SansitaBold] text-4xl leading-tight sm:text-5xl">
          Draft your outreach and start paced sending.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
          This creates a draft campaign first. After adding recipients you can start the queue and
          monitor all status transitions in real time.
        </p>

        <div className="mt-6">
          <Link
            href="/admin/campaigns"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Back to campaigns
          </Link>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[#0e1727]/85 p-8 backdrop-blur">
        <CampaignCreateForm />
      </div>
    </section>
  );
}
