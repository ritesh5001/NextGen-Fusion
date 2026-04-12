import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { applyRecipientEventByMessageId, refreshCampaignCompletion } from '../../../../lib/campaigns';

export const runtime = 'nodejs';

function asObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as Record<string, unknown>;
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function mapResendEventType(rawType: string) {
  const normalized = rawType.toLowerCase();

  if (normalized.includes('click')) {
    return 'clicked';
  }

  if (normalized.includes('open')) {
    return 'opened';
  }

  if (normalized.includes('deliver')) {
    return 'delivered';
  }

  if (
    normalized.includes('bounce') ||
    normalized.includes('complain') ||
    normalized.includes('failed')
  ) {
    return 'failed';
  }

  return null;
}

function parseDate(dateValue: unknown) {
  if (!dateValue || typeof dateValue !== 'string') {
    return undefined;
  }

  const parsed = new Date(dateValue);

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    let payload: Record<string, unknown>;

    if (webhookSecret) {
      const resend = new Resend(process.env.RESEND_API_KEY || '');
      const verifiedPayload = resend.webhooks.verify({
        payload: rawBody,
        headers: {
          id: request.headers.get('svix-id') || '',
          timestamp: request.headers.get('svix-timestamp') || '',
          signature: request.headers.get('svix-signature') || '',
        },
        webhookSecret,
      });

      payload = asObject(verifiedPayload) || {};
    } else {
      payload = asObject(JSON.parse(rawBody)) || {};
    }

    const type = mapResendEventType(
      asString(payload.type) || asString(payload.event)
    );

    if (!type) {
      return NextResponse.json({ message: 'Event ignored.' }, { status: 200 });
    }

    const data = asObject(payload.data) || payload;
    const messageId =
      asString(data.email_id) ||
      asString(data.emailId) ||
      asString(data.message_id) ||
      asString(data.messageId) ||
      asString(data.id);

    if (!messageId) {
      return NextResponse.json({ message: 'Missing message id.' }, { status: 200 });
    }

    const clickObject = asObject(data.click);

    const updatedRecipient = await applyRecipientEventByMessageId({
      messageId,
      eventType: type,
      providerEventId: asString(payload.id) || asString(data.id),
      eventAt: parseDate(data.created_at) || parseDate(data.createdAt),
      url: asString(data.url) || asString(clickObject?.link),
      error: asString(data.reason) || asString(data.error),
    });

    if (updatedRecipient?.campaignId) {
      await refreshCampaignCompletion(updatedRecipient.campaignId.toString());
    }

    return NextResponse.json({ message: 'Webhook processed.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Webhook processing failed.',
      },
      { status: 500 }
    );
  }
}
