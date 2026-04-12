import { NextRequest, NextResponse } from 'next/server';

import { requireAdminSession } from '../../../../../lib/admin-session';
import { getCampaignById, pauseCampaign, serializeCampaign } from '../../../../../lib/campaigns';

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

  const updated = await pauseCampaign(params.id);

  return NextResponse.json(
    {
      message: 'Campaign paused.',
      campaign: serializeCampaign(updated),
    },
    { status: 200 }
  );
}
