import { NextRequest, NextResponse } from 'next/server';

import { applyTrackingEvent } from '../../../../lib/campaigns';
import { verifyTrackingToken } from '../../../../lib/campaign-tracking';

export const runtime = 'nodejs';

function getFallbackRedirect() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenfusion.in';
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const payload = token ? verifyTrackingToken(token) : null;

  if (!payload || payload.type !== 'click' || !payload.url) {
    return NextResponse.redirect(getFallbackRedirect());
  }

  await applyTrackingEvent({
    campaignId: payload.campaignId,
    recipientId: payload.recipientId,
    eventType: 'clicked',
    url: payload.url,
  });

  return NextResponse.redirect(payload.url);
}
