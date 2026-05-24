import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'ngf_admin_session'

async function isValid(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return false
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    return payload.role === 'admin' || payload.role === 'member'
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'
  const isLoginPage =
    normalizedPath === '/admin/login' || normalizedPath === '/admin/agency/login'

  // Only guard /admin/* pages (not login pages themselves)
  if (!normalizedPath.startsWith('/admin') || isLoginPage) return NextResponse.next()

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (await isValid(token)) return NextResponse.next()

  const url = req.nextUrl.clone()
  // Redirect agency paths to agency login, others to admin login
  url.pathname = normalizedPath.startsWith('/admin/agency')
    ? '/admin/agency/login'
    : '/admin/login'
  url.searchParams.set('redirect', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*'],
}
