import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ExternalLink } from 'lucide-react'
import { getStoreProduct } from '@/lib/store'
import { BuyButton } from '@/components/store/buy-button'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenfusion.in'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getStoreProduct(slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: `${product.title} — NextGen Fusion Store`,
    description: product.summary || product.description?.slice(0, 160) || product.title,
    alternates: { canonical: `${siteUrl}/store/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.summary || product.title,
      images: product.cover_image ? [product.cover_image] : undefined,
    },
  }
}

export default async function StoreProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getStoreProduct(slug)
  if (!product) notFound()

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <Link href="/store" className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to store
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Media */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              {product.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.cover_image} alt={product.title} className="w-full object-cover" />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center text-gray-400">No preview</div>
              )}
            </div>
            {product.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.gallery.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt={`${product.title} screenshot ${i + 1}`} className="aspect-video w-full rounded-lg border border-gray-100 object-cover" />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                {product.category}
              </span>
            )}
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">{product.title}</h1>
            {product.summary && <p className="mt-3 text-lg text-gray-500">{product.summary}</p>}

            {product.tech_stack.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tech_stack.map((t) => (
                  <span key={t} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-gray-100 p-6 shadow-sm">
              <BuyButton productId={product.id} slug={product.slug} title={product.title} priceInr={product.price_inr} />
              {product.demo_url && (
                <a
                  href={product.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:underline"
                >
                  View live demo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {product.version && <p className="mt-3 text-xs text-gray-400">Version {product.version}</p>}
            </div>

            {product.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">What&apos;s included</h2>
                <ul className="mt-3 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {product.description && (
          <div className="mt-14 max-w-3xl">
            <h2 className="text-xl font-bold text-gray-900">About this product</h2>
            <div className="mt-3 whitespace-pre-line text-gray-600">{product.description}</div>
          </div>
        )}
      </div>
    </main>
  )
}
