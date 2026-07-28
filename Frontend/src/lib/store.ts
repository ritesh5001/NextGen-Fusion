// Public store data — fetched server-side via the same-origin /api/store proxy
// (rewritten to the Backend in next.config.js). Revalidated so the storefront
// stays fast (near-static) instead of hitting the API on every request.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export type StoreProduct = {
  id: string
  slug: string
  title: string
  summary: string | null
  description: string | null
  category: string | null
  price_inr: number
  price_usd: number | null
  cover_image: string | null
  gallery: string[]
  features: string[]
  tech_stack: string[]
  demo_url: string | null
  version: string | null
  is_featured: boolean
  display_order: number
  created_at: string
}

export function formatInr(value: number): string {
  return `₹${(value ?? 0).toLocaleString('en-IN')}`
}

export async function getStoreProducts(): Promise<StoreProduct[]> {
  try {
    const res = await fetch(`${SITE_URL}/api/store/products`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const json = await res.json()
    return (json.data as StoreProduct[]) || []
  } catch {
    return []
  }
}

export async function getStoreProduct(slug: string): Promise<StoreProduct | null> {
  try {
    const res = await fetch(`${SITE_URL}/api/store/products/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return (json.data as StoreProduct) || null
  } catch {
    return null
  }
}
