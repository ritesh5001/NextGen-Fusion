import { NextRequest, NextResponse } from 'next/server';

import {
  getDueRecipientsForCampaign,
  getProcessableCampaigns,
  getRecentSentCount,
  markRecipientFailed,
  markRecipientSent,
  recordCampaignEvent,
  refreshCampaignCompletion,
} from '../../../../lib/campaigns';
import { requireAdminSession } from '../../../../lib/admin-session';
import { sendCampaignEmail } from '../../../../lib/resend';

export const runtime = 'nodejs';

type CampaignProcessSummary = {
  campaignId: string;
  status: string;
  sent: number;
  failed: number;
  skippedReason?: string;
};

function isAuthorizedCronRequest(request: NextRequest) {
  const expectedSecret = process.env.CAMPAIGN_CRON_SECRET;

  if (!expectedSecret) {
    return true;
  }

  const headerSecret =
    request.headers.get('x-campaign-cron-secret') ||
    request.headers.get('x-cron-secret') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  return headerSecret === expectedSecret;
}

export async function POST(request: NextRequest) {
  const session = requireAdminSession(request);
  const authorizedByCronSecret = isAuthorizedCronRequest(request);

  if (!authorizedByCronSecret && !session) {
    return NextResponse.json({ message: 'Unauthorized cron request.' }, { status: 401 });
  }

  try {
    const processBatchSize = Math.max(
      1,
      Number(process.env.CAMPAIGN_PROCESS_BATCH || 5)
    );
    const campaigns = await getProcessableCampaigns();
    const summary: CampaignProcessSummary[] = [];

    for (const campaign of campaigns) {
      const sentLast24h = await getRecentSentCount(
        campaign._id.toString(),
        new Date(Date.now() - 24 * 60 * 60 * 1000)
      );
      const remaining = Math.max(0, campaign.dailyLimit - sentLast24h);

      if (remaining <= 0) {
        summary.push({
          campaignId: campaign._id.toString(),
          status: campaign.status,
          sent: 0,
          failed: 0,
          skippedReason: 'daily-limit-reached',
        });
        continue;
      }

      const dueRecipients = await getDueRecipientsForCampaign(
        campaign._id.toString(),
        Math.min(processBatchSize, remaining)
      );

      let sent = 0;
      let failed = 0;

      for (const recipient of dueRecipients) {
        try {
          const messageId = await sendCampaignEmail({
            campaignId: campaign._id.toString(),
            recipientId: recipient._id.toString(),
            to: recipient.email,
            subject: campaign.subject,
            html: campaign.htmlBody,
          });

          await markRecipientSent({
            recipientId: recipient._id.toString(),
            messageId,
          });

          await recordCampaignEvent({
            campaignId: campaign._id.toString(),
            recipientId: recipient._id.toString(),
            email: recipient.email,
            eventType: 'sent',
            providerMessageId: messageId,
            at: new Date(),
          });

          sent += 1;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unable to send email.';

          await markRecipientFailed({
            recipientId: recipient._id.toString(),
            errorMessage,
          });

          await recordCampaignEvent({
            campaignId: campaign._id.toString(),
            recipientId: recipient._id.toString(),
            email: recipient.email,
            eventType: 'failed',
            error: errorMessage,
            at: new Date(),
          });

          failed += 1;
        }
      }

      await refreshCampaignCompletion(campaign._id.toString());

      summary.push({
        campaignId: campaign._id.toString(),
        status: campaign.status,
        sent,
        failed,
      });
    }

    return NextResponse.json(
      {
        message: 'Campaign processor finished.',
        campaignsProcessed: campaigns.length,
        summary,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Campaign processor failed.',
      },
      { status: 500 }
    );
  }
}
