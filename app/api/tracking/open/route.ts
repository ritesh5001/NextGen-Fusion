import { NextRequest, NextResponse } from 'next/server';

import { applyTrackingEvent } from '../../../../lib/campaigns';
import { verifyTrackingToken } from '../../../../lib/campaign-tracking';

export const runtime = 'nodejs';

const TRANSPARENT_GIF_BASE64 = 'R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const payload = token ? verifyTrackingToken(token) : null;

  if (payload && payload.type === 'open') {
    await applyTrackingEvent({
      campaignId: payload.campaignId,
      recipientId: payload.recipientId,
      eventType: 'opened',
    });
  }

  const imageBuffer = Buffer.from(TRANSPARENT_GIF_BASE64, 'base64');

  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Content-Length': imageBuffer.length.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
