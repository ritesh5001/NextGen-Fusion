// Binary-aware proxy for plugin zip downloads. The shared [...path] proxy reads
// upstream with .text() and only forwards content-type/set-cookie, which would
// corrupt a zip and drop Content-Disposition — so downloads use this route.

function backendBase(): string {
  return (process.env.BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '')
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { searchParams } = new URL(req.url)
  const plugin = searchParams.get('plugin') === 'hf' ? 'hf' : 'pages'

  const headers = new Headers()
  const cookie = req.headers.get('cookie')
  if (cookie) headers.set('cookie', cookie)

  const upstream = await fetch(
    `${backendBase()}/api/admin/wp-plugins/download/${id}?plugin=${plugin}`,
    { headers, cache: 'no-store' },
  )

  if (!upstream.ok) {
    const text = await upstream.text()
    return new Response(text, {
      status: upstream.status,
      headers: { 'content-type': upstream.headers.get('content-type') || 'application/json' },
    })
  }

  const body = await upstream.arrayBuffer()
  const responseHeaders = new Headers()
  responseHeaders.set('content-type', upstream.headers.get('content-type') || 'application/zip')
  const disposition = upstream.headers.get('content-disposition')
  if (disposition) responseHeaders.set('content-disposition', disposition)

  return new Response(body, { status: 200, headers: responseHeaders })
}
