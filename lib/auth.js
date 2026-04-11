import jwt from 'jsonwebtoken';

export const ADMIN_SESSION_COOKIE = 'nextgenfusion_admin_session';
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('Missing JWT_SECRET. Add it to .env.local before using admin auth.');
  }

  return secret;
}

export function createAdminSessionPayload(admin) {
  return {
    id: admin._id.toString(),
    email: admin.email,
    name: admin.name,
    role: 'admin',
  };
}

export function signAdminSession(payload) {
  return jwt.sign(payload, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: TOKEN_TTL_SECONDS,
  });
}

export function verifyAdminSession(token) {
  return jwt.verify(token, getJwtSecret());
}

export function readAdminSession(token) {
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
    sameSite: 'lax',
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

export function toPublicAdmin(admin) {
  return {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
  };
}