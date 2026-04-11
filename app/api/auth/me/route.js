import { NextResponse } from 'next/server';

import { ADMIN_SESSION_COOKIE, readAdminSession } from '../../../../lib/auth.js';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = readAdminSession(token);

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json(
      {
        authenticated: true,
        admin: {
          id: session.id,
          email: session.email,
          name: session.name,
          role: session.role,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}