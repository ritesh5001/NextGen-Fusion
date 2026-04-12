import { NextRequest, NextResponse } from 'next/server';

import { requireAdminSession } from '../../../../../lib/admin-session';
import {
  addRecipientsToCampaign,
  getCampaignById,
  listCampaignRecipients,
  parseCsvRecipients,
  serializeRecipient,
} from '../../../../../lib/campaigns';

export const runtime = 'nodejs';

export async function GET(
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

  const recipients = await listCampaignRecipients(params.id, 300);

  return NextResponse.json(
    {
      recipients: recipients.map(serializeRecipient),
    },
    { status: 200 }
  );
}

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

  try {
    const body = await request.json().catch(() => null);
    const manualRecipients = Array.isArray(body?.recipients) ? body.recipients : [];
    const csvText = typeof body?.csvText === 'string' ? body.csvText : '';

    const parsedCsvRecipients = csvText ? parseCsvRecipients(csvText) : [];
    const normalizedManualRecipients = manualRecipients
      .map((item) => ({
        email: typeof item?.email === 'string' ? item.email : '',
        name: typeof item?.name === 'string' ? item.name : undefined,
      }))
      .filter((item) => item.email);

    const allRecipients = [...normalizedManualRecipients, ...parsedCsvRecipients];

    if (!allRecipients.length) {
      return NextResponse.json(
        { message: 'Add at least one valid recipient.' },
        { status: 400 }
      );
    }

    const result = await addRecipientsToCampaign(params.id, allRecipients);

    return NextResponse.json(
      {
        message: 'Recipients processed.',
        ...result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to add recipients.',
      },
      { status: 500 }
    );
  }
}
