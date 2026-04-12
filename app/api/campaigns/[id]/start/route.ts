import { NextRequest, NextResponse } from 'next/server';

import { requireAdminSession } from '../../../../../lib/admin-session';
import { getCampaignById, queueCampaignRecipients } from '../../../../../lib/campaigns';

export const runtime = 'nodejs';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = requireAdminSession(request);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  const campaign = await getCampaignById(params.id);

  if (!campaign) {
    return NextResponse.json({ message: 'Campaign not found.' }, { status: 404 });
  }

  if (campaign.createdBy !== session.id) {
    return NextResponse.json({ message: 'Forbidden.' }, { status: 403 });
  }

  if (!campaign.subject || !campaign.htmlBody) {
    return NextResponse.json(
      {
        message: 'Campaign subject and HTML body are required before sending.',
      },
      { status: 400 }
    );
  }

  try {
    const result = await queueCampaignRecipients(params.id);

    return NextResponse.json(
      {
        message: 'Campaign queued successfully.',
        ...result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to queue campaign.',
      },
      { status: 500 }
    );
  }
}
