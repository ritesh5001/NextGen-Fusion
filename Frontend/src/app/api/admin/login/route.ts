import { NextRequest } from 'next/server'

function buildBackendUrl(pathname: string): string {
  const baseUrl = process.env.BACKEND_URL || 'http://localhost:4000'
  return `${baseUrl.replace(/\/$/, '')}${pathname}`
}

export async function POST(req: NextRequest) {
  const backendUrl = buildBackendUrl('/api/admin/login')
  const body = await req.text()

  const upstream = await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    cache: 'no-store',
  })

  const responseBody = await upstream.text()
  const headers = new Headers()
  const contentType = upstream.headers.get('content-type')
  if (contentType) headers.set('content-type', contentType)

  const setCookie = upstream.headers.get('set-cookie')
  if (setCookie) headers.set('set-cookie', setCookie)

  return new Response(responseBody, {
    status: upstream.status,
    headers,
  })
}
