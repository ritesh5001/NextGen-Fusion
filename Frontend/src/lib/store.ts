// Public store data, fetched server-side. In production we hit the Backend
// DIRECTLY (BACKEND_URL) — a server usually can't loop back to its own public
// domain (hairpin NAT), so fetching https://<site>/api/... from the server
// fails even though the same URL works from a browser. BACKEND_URL is reachable
// internally (it's what the /api/store rewrite proxies to). Falls back to the
// same-origin proxy for local dev where BACKEND_URL may be unset.
// Revalidated so the storefront stays fast instead of hitting the API each request.

const API_BASE = process.env.BACKEND_URL
  ? `${process.env.BACKEND_URL.replace(/\/+$/, '')}/api`
  : `${(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')}/api`

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

/**
 * Whether a product page carries enough unique content to deserve indexing.
 *
 * 46 of the site's 82 indexable URLs were store products averaging ~103 words of
 * body copy at 85% vocabulary overlap with each other, all rendering a "No
 * preview" placeholder and all missing the `image` that Product rich results
 * require. Thin, templated commercial pages at that ratio drag the whole domain.
 *
 * Rather than a manual flag that goes stale, the gate reads the content itself:
 * fill in a real description, a cover image and a feature list, and the page
 * indexes itself on the next revalidate. Nothing to remember to switch on.
 */
export const STORE_INDEX_MIN_DESCRIPTION_CHARS = 600
export const STORE_INDEX_MIN_FEATURES = 3

export function isStoreProductIndexable(product: StoreProduct): boolean {
  const descriptionLength = (product.description ?? '').replace(/\s+/g, ' ').trim().length
  return (
    Boolean(product.cover_image) &&
    descriptionLength >= STORE_INDEX_MIN_DESCRIPTION_CHARS &&
    (product.features?.length ?? 0) >= STORE_INDEX_MIN_FEATURES
  )
}

export function formatInr(value: number): string {
  return `₹${(value ?? 0).toLocaleString('en-IN')}`
}

export async function getStoreProducts(): Promise<StoreProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/store/products`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const json = await res.json()
    return (json.data as StoreProduct[]) || []
  } catch {
    return []
  }
}

export async function getStoreProduct(slug: string): Promise<StoreProduct | null> {
  try {
    const res = await fetch(`${API_BASE}/store/products/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return (json.data as StoreProduct) || null
  } catch {
    return null
  }
}
