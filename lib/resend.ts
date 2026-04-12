import { Resend } from 'resend';

import { instrumentCampaignHtml } from './campaign-html';

let resendClient: Resend | null = null;

function getResendApiKey() {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    throw new Error('Missing RESEND_API_KEY.');
  }

  return key;
}

function getResendFromEmail() {
  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    throw new Error('Missing RESEND_FROM_EMAIL.');
  }

  return from;
}

export function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(getResendApiKey());
  }

  return resendClient;
}

export async function sendCampaignEmail({
  campaignId,
  recipientId,
  to,
  subject,
  html,
}: {
  campaignId: string;
  recipientId: string;
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResendClient();
  const instrumentedHtml = instrumentCampaignHtml({
    html,
    campaignId,
    recipientId,
  });

  const response = await resend.emails.send({
    from: getResendFromEmail(),
    to,
    subject,
    html: instrumentedHtml,
    tags: [
      { name: 'campaignId', value: campaignId },
      { name: 'recipientId', value: recipientId },
    ],
  });

  if (response.error) {
    throw new Error(response.error.message || 'Resend send failed.');
  }

  return response.data?.id || '';
}
