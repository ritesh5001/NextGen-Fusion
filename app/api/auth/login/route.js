import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import { ensureAdminSeed, findAdminByEmail } from '../../../../lib/admin.js';
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionPayload,
  getAuthCookieOptions,
  signAdminSession,
  toPublicAdmin,
} from '../../../../lib/auth.js';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    await ensureAdminSeed();

    const body = await request.json().catch(() => null);
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const admin = await findAdminByEmail(email);

    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid admin credentials.' },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordMatches) {
      return NextResponse.json(
        { message: 'Invalid admin credentials.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        message: 'Login successful.',
        admin: toPublicAdmin(admin),
      },
      { status: 200 }
    );

    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      signAdminSession(createAdminSessionPayload(admin)),
      getAuthCookieOptions()
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Unable to sign in right now.',
      },
      { status: 500 }
    );
  }
}