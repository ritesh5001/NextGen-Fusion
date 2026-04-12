import { NextRequest, NextResponse } from 'next/server';

import { requireAdminSession } from '../../../../lib/admin-session';
import {
  getCampaignDetail,
  getCampaignById,
  serializeCampaign,
  serializeEvent,
  serializeRecipient,
  updateCampaign,
} from '../../../../lib/campaigns';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = requireAdminSession(request);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const detail = await getCampaignDetail(params.id);

    if (!detail) {
      return NextResponse.json({ message: 'Campaign not found.' }, { status: 404 });
    }

    if (detail.campaign.createdBy !== session.id) {
      return NextResponse.json({ message: 'Forbidden.' }, { status: 403 });
    }

    return NextResponse.json(
      {
        campaign: serializeCampaign(detail.campaign),
        counts: detail.counts,
        recipients: detail.recipients.map(serializeRecipient),
        events: detail.events.map(serializeEvent),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to load campaign details.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = requireAdminSession(request);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const current = await getCampaignById(params.id);

    if (!current) {
      return NextResponse.json({ message: 'Campaign not found.' }, { status: 404 });
    }

    if (current.createdBy !== session.id) {
      return NextResponse.json({ message: 'Forbidden.' }, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const updated = await updateCampaign(params.id, {
      name: typeof body?.name === 'string' ? body.name : undefined,
      subject: typeof body?.subject === 'string' ? body.subject : undefined,
      htmlBody: typeof body?.htmlBody === 'string' ? body.htmlBody : undefined,
      dailyLimit:
        typeof body?.dailyLimit === 'number' || typeof body?.dailyLimit === 'string'
          ? Number(body.dailyLimit)
          : undefined,
      status: body?.status,
    });

    return NextResponse.json(
      {
        message: 'Campaign updated.',
        campaign: serializeCampaign(updated),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to update campaign.',
      },
      { status: 500 }
    );
  }
}
