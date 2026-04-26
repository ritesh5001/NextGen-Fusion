import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'ngf_admin_session'

async function isValid(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return false
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only guard /admin pages and /api/admin/* (but not the login endpoint)
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminApi =
    pathname.startsWith('/api/admin') && pathname !== '/api/admin/login'

  if (!isAdminPage && !isAdminApi) return NextResponse.next()

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (await isValid(token)) return NextResponse.next()

  if (isAdminApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  url.searchParams.set('redirect', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
