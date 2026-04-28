import { NextRequest } from 'next/server'

function buildBackendUrl(pathname: string, search: string): string {
  const baseUrl = process.env.BACKEND_URL || 'http://localhost:4000'
  const normalizedBase = baseUrl.replace(/\/$/, '')
  return `${normalizedBase}${pathname}${search}`
}

async function proxyRequest(req: NextRequest, method: string, path: string) {
  const backendUrl = buildBackendUrl(`/api/admin/${path}`, req.nextUrl.search)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const cookie = req.headers.get('cookie')
  if (cookie) headers.cookie = cookie

  const body = method === 'GET' || method === 'HEAD' ? undefined : await req.text()

  const upstream = await fetch(backendUrl, {
    method,
    headers,
    body,
    cache: 'no-store',
  })

  const responseBody = await upstream.text()
  const responseHeaders = new Headers()
  const contentType = upstream.headers.get('content-type')
  if (contentType) responseHeaders.set('content-type', contentType)

  const setCookie = upstream.headers.get('set-cookie')
  if (setCookie) responseHeaders.set('set-cookie', setCookie)

  return new Response(responseBody, {
    status: upstream.status,
    headers: responseHeaders,
  })
}

export async function GET(req: NextRequest, context: { params: { path: string[] } }) {
  return proxyRequest(req, 'GET', context.params.path.join('/'))
}

export async function POST(req: NextRequest, context: { params: { path: string[] } }) {
  return proxyRequest(req, 'POST', context.params.path.join('/'))
}

export async function PATCH(req: NextRequest, context: { params: { path: string[] } }) {
  return proxyRequest(req, 'PATCH', context.params.path.join('/'))
}

export async function DELETE(req: NextRequest, context: { params: { path: string[] } }) {
  return proxyRequest(req, 'DELETE', context.params.path.join('/'))
}
