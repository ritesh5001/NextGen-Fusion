import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'ngf_admin_session'

async function getRole(token: string | undefined): Promise<string | null> {
  if (!token) return null
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return null
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    return typeof payload.role === 'string' ? payload.role : null
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'
  const token = req.cookies.get(COOKIE_NAME)?.value

  // ----- Client portal -----
  if (normalizedPath === '/portal' || normalizedPath.startsWith('/portal/')) {
    const publicPortalPaths = new Set([
      '/portal/login',
      '/portal/signup',
      '/portal/forgot-password',
      '/portal/reset-password',
    ])
    if (publicPortalPaths.has(normalizedPath)) return NextResponse.next()
    const role = await getRole(token)
    if (role === 'client') return NextResponse.next()
    const url = req.nextUrl.clone()
    url.pathname = '/portal/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // ----- Admin / Agency -----
  const isLoginPage =
    normalizedPath === '/admin/login' || normalizedPath === '/admin/agency/login'
  if (!normalizedPath.startsWith('/admin') || isLoginPage) return NextResponse.next()

  const role = await getRole(token)
  if (role === 'admin' || role === 'member') return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = normalizedPath.startsWith('/admin/agency')
    ? '/admin/agency/login'
    : '/admin/login'
  url.searchParams.set('redirect', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
}
