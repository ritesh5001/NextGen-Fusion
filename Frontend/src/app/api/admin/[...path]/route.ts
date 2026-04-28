function buildBackendUrl(pathname: string, search: string): string {
  const baseUrl = process.env.BACKEND_URL || 'http://localhost:4000'
  const normalizedBase = baseUrl.replace(/\/$/, '')
  return `${normalizedBase}${pathname}${search}`
}

async function proxyRequest(req: Request, method: string, path: string) {
  const { search } = new URL(req.url)
  const backendUrl = buildBackendUrl(`/api/admin/${path}`, search)
  const headers = new Headers()

  const reqContentType = req.headers.get('content-type')
  if (reqContentType) headers.set('content-type', reqContentType)

  const cookie = req.headers.get('cookie')
  if (cookie) headers.set('cookie', cookie)

  const body = method === 'GET' || method === 'HEAD' ? undefined : await req.arrayBuffer()

  const upstream = await fetch(backendUrl, {
    method,
    headers,
    body,
    cache: 'no-store',
  })

  const responseBody = await upstream.text()
  const responseHeaders = new Headers()
  const resContentType = upstream.headers.get('content-type')
  if (resContentType) responseHeaders.set('content-type', resContentType)

  const setCookie = upstream.headers.get('set-cookie')
  if (setCookie) responseHeaders.set('set-cookie', setCookie)

  return new Response(responseBody, {
    status: upstream.status,
    headers: responseHeaders,
  })
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(req, 'GET', path.join('/'))
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(req, 'POST', path.join('/'))
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(req, 'PATCH', path.join('/'))
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(req, 'DELETE', path.join('/'))
}
