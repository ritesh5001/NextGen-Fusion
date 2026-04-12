'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

type CampaignDetailClientProps = {
  campaignId: string;
  campaignStatus: string;
};

export default function CampaignDetailClient({
  campaignId,
  campaignStatus,
}: CampaignDetailClientProps) {
  const router = useRouter();
  const [manualEmail, setManualEmail] = useState('');
  const [manualName, setManualName] = useState('');
  const [csvText, setCsvText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const runAction = async (url: string, body?: Record<string, unknown>) => {
    setErrorMessage('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Action failed.');
      }

      setMessage(result?.message || 'Action completed.');
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Action failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipientSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const recipients = manualEmail
      ? [
          {
            email: manualEmail,
            name: manualName || undefined,
          },
        ]
      : [];

    await runAction(`/api/campaigns/${campaignId}/recipients`, {
      recipients,
      csvText,
    });

    setManualEmail('');
    setManualName('');
    setCsvText('');
  };

  const canStart = campaignStatus === 'draft' || campaignStatus === 'paused';
  const canPause = campaignStatus === 'active' || campaignStatus === 'queued';

  return (
    <section className="space-y-6">
      <div className="rounded-[1.6rem] border border-white/10 bg-[#0e1727]/80 p-6">
        <h3 className="font-[SansitaBold] text-2xl text-[#f5f19c]">Campaign controls</h3>
        <p className="mt-2 text-sm text-white/65">
          Use these actions to start paced sending, pause delivery, or manually trigger one process
          tick.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => runAction(`/api/campaigns/${campaignId}/start`)}
            disabled={isLoading || !canStart}
            className="rounded-xl bg-[#f5f19c] px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            Start campaign
          </button>
          <button
            type="button"
            onClick={() => runAction(`/api/campaigns/${campaignId}/pause`)}
            disabled={isLoading || !canPause}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Pause campaign
          </button>
          <button
            type="button"
            onClick={() => runAction(`/api/campaigns/${campaignId}/resume`)}
            disabled={isLoading}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Resume campaign
          </button>
          <button
            type="button"
            onClick={() => runAction('/api/campaigns/process')}
            disabled={isLoading}
            className="rounded-xl border border-emerald-300/35 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Run processor now
          </button>
        </div>
      </div>

      <form
        className="space-y-5 rounded-[1.6rem] border border-white/10 bg-[#0e1727]/80 p-6"
        onSubmit={handleRecipientSubmit}
      >
        <h3 className="font-[SansitaBold] text-2xl text-[#f5f19c]">Add recipients</h3>
        <p className="text-sm text-white/65">
          Add one recipient manually or paste CSV rows. CSV header supports email,name.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white/70" htmlFor="manual-email">
              Manual email
            </label>
            <input
              id="manual-email"
              type="email"
              value={manualEmail}
              onChange={(event) => setManualEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f5f19c]"
              placeholder="owner@business.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/70" htmlFor="manual-name">
              Manual name
            </label>
            <input
              id="manual-name"
              value={manualName}
              onChange={(event) => setManualName(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f5f19c]"
              placeholder="Business Owner"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70" htmlFor="csv-recipients">
            CSV recipients
          </label>
          <textarea
            id="csv-recipients"
            value={csvText}
            onChange={(event) => setCsvText(event.target.value)}
            className="min-h-[160px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f5f19c]"
            placeholder={'email,name\nfirst@biz.com,First Owner\nsecond@biz.com,Second Owner'}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-[#f5f19c] px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Processing...' : 'Save recipients'}
        </button>
      </form>

      {message ? (
        <p className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {message}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}
    </section>
  );
}
