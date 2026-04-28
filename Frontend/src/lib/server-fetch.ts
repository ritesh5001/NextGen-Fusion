import { cookies } from 'next/headers'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

export async function serverFetch(path: string, init?: RequestInit): Promise<Response> {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ')
  return fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string> | undefined),
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  })
}
