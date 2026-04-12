'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function CampaignCreateForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlBody, setHtmlBody] = useState('');
  const [dailyLimit, setDailyLimit] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          subject,
          htmlBody,
          dailyLimit,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to create campaign.');
      }

      router.replace(`/admin/campaigns/${result.campaign.id}`);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to create campaign.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="campaign-name">
          Campaign name
        </label>
        <input
          id="campaign-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f5f19c]"
          placeholder="Website Growth Pitch - Batch 1"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="campaign-subject">
          Subject line
        </label>
        <input
          id="campaign-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f5f19c]"
          placeholder="Quick website idea for your business"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="campaign-daily-limit">
          Daily send limit
        </label>
        <input
          id="campaign-daily-limit"
          type="number"
          min={1}
          max={1000}
          value={dailyLimit}
          onChange={(event) => setDailyLimit(Number(event.target.value) || 100)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f5f19c]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="campaign-html">
          HTML content
        </label>
        <textarea
          id="campaign-html"
          value={htmlBody}
          onChange={(event) => setHtmlBody(event.target.value)}
          className="min-h-[260px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f5f19c]"
          placeholder={'<h1>Hello business owner</h1><p>...</p><a href="https://nextgenfusion.in">Visit</a>'}
          required
        />
      </div>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-[#f5f19c] px-5 py-3 font-[SansitaBold] text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Creating campaign...' : 'Create campaign'}
      </button>
    </form>
  );
}
