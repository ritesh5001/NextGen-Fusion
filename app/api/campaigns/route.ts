import { NextRequest, NextResponse } from 'next/server';

import { requireAdminSession } from '../../../lib/admin-session';
import {
  createCampaign,
  listCampaigns,
  serializeCampaign,
} from '../../../lib/campaigns';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const session = requireAdminSession(request);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const campaigns = await listCampaigns(session.id);

    return NextResponse.json(
      {
        campaigns: campaigns.map((campaign) => ({
          ...serializeCampaign(campaign),
          stats: campaign.stats,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to load campaigns.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = requireAdminSession(request);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    const name = body?.name?.trim();
    const subject = body?.subject?.trim();
    const htmlBody = body?.htmlBody;
    const dailyLimit = Number(body?.dailyLimit);

    if (!name || !subject || !htmlBody) {
      return NextResponse.json(
        { message: 'Name, subject, and HTML body are required.' },
        { status: 400 }
      );
    }

    const campaign = await createCampaign({
      name,
      subject,
      htmlBody,
      createdBy: session.id,
      dailyLimit: Number.isFinite(dailyLimit) ? dailyLimit : 100,
    });

    return NextResponse.json(
      {
        message: 'Campaign created successfully.',
        campaign: serializeCampaign(campaign),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to create campaign.',
      },
      { status: 500 }
    );
  }
}
