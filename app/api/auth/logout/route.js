import { NextResponse } from 'next/server';

import {
  ADMIN_SESSION_COOKIE,
  getClearedAuthCookieOptions,
} from '../../../../lib/auth.js';

export const runtime = 'nodejs';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out.' }, { status: 200 });

  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    '',
    getClearedAuthCookieOptions()
  );

  return response;
}