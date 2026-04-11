import jwt from 'jsonwebtoken';

export const ADMIN_SESSION_COOKIE = 'nextgenfusion_admin_session';
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

export type AdminSession = {
  id: string;
  email: string;
  name: string;
  role: 'admin';
};

type AdminLike = {
  _id: { toString: () => string };
  email: string;
  name: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('Missing JWT_SECRET. Add it to .env.local before using admin auth.');
  }

  return secret;
}

export function createAdminSessionPayload(admin: AdminLike): AdminSession {
  return {
    id: admin._id.toString(),
    email: admin.email,
    name: admin.name,
    role: 'admin',
  };
}

export function signAdminSession(payload: AdminSession): string {
  return jwt.sign(payload, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: TOKEN_TTL_SECONDS,
  });
}

export function verifyAdminSession(token: string): AdminSession | null {
  const decoded = jwt.verify(token, getJwtSecret());

  if (!decoded || typeof decoded === 'string') {
    return null;
  }

  if (!decoded.email || !decoded.id || !decoded.name || !decoded.role) {
    return null;
  }

  return decoded as AdminSession;
}

export function readAdminSession(token?: string): AdminSession | null {
  if (!token) {
    return null;
  }

  try {
    const session = verifyAdminSession(token);

    if (!session?.email) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: TOKEN_TTL_SECONDS,
  };
}

export function getClearedAuthCookieOptions() {
  return {
    ...getAuthCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  };
}

export function toPublicAdmin(admin: AdminLike) {
  return {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
  };
}