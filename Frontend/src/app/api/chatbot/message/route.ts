function buildBackendUrl(pathname: string): string {
  const baseUrl = process.env.BACKEND_URL || 'http://localhost:4000'
  return `${baseUrl.replace(/\/$/, '')}${pathname}`
}

export async function POST(req: Request) {
  const backendUrl = buildBackendUrl('/api/chatbot/message')
  const body = await req.text()

  const upstream = await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': req.headers.get('content-type') || 'application/json' },
    body,
    cache: 'no-store',
  })

  const responseBody = await upstream.text()
  const headers = new Headers()
  const contentType = upstream.headers.get('content-type')
  if (contentType) headers.set('content-type', contentType)

  return new Response(responseBody, {
    status: upstream.status,
    headers,
  })
}
