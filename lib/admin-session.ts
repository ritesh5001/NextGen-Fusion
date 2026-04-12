import { NextRequest } from 'next/server';

import { ADMIN_SESSION_COOKIE, readAdminSession } from './auth';

export function requireAdminSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return readAdminSession(token);
}
