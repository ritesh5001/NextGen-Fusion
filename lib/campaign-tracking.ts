import jwt from 'jsonwebtoken';

export type TrackingTokenPayload = {
  campaignId: string;
  recipientId: string;
  type: 'open' | 'click';
  url?: string;
};

function getTrackingSecret() {
  const secret = process.env.CAMPAIGN_TRACKING_SECRET || process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('Missing CAMPAIGN_TRACKING_SECRET or JWT_SECRET.');
  }

  return secret;
}

export function signTrackingToken(payload: TrackingTokenPayload): string {
  return jwt.sign(payload, getTrackingSecret(), {
    algorithm: 'HS256',
    expiresIn: '30d',
  });
}

export function verifyTrackingToken(token: string): TrackingTokenPayload | null {
  try {
    const decoded = jwt.verify(token, getTrackingSecret());

    if (!decoded || typeof decoded === 'string') {
      return null;
    }

    if (!decoded.campaignId || !decoded.recipientId || !decoded.type) {
      return null;
    }

    return decoded as TrackingTokenPayload;
  } catch {
    return null;
  }
}
