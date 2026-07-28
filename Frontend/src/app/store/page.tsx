import type { Metadata } from 'next'
import Link from 'next/link'
import { getStoreProducts, formatInr } from '@/lib/store'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenfusion.in'

export const metadata: Metadata = {
  title: 'Store — Ready-to-Use CRM, ERP & Software',
  description:
    'Buy production-ready CRM, ERP, and software systems built by NextGen Fusion. Instant download, full source code, one-time price.',
  alternates: { canonical: `${siteUrl}/store` },
}

export default async function StorePage() {
  const products = await getStoreProducts()

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
          Digital products
        </span>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
          Ready-to-use{' '}
          <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
            software systems
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-500">
          Production-grade CRM, ERP, and tools we&apos;ve built — buy once, download the full source, and ship faster.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 py-24 text-center text-gray-500">
            Products are coming soon. Check back shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/store/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                  {p.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2B35AB]/10 via-[#8A38F5]/10 to-[#13CBD4]/10 px-4 text-center text-sm font-semibold text-gray-500">
                      {p.title}
                    </div>
                  )}
                  {p.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-gray-700 shadow-sm">
                      {p.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">{p.title}</h2>
                  {p.summary && <p className="mt-1 line-clamp-2 text-sm text-gray-500">{p.summary}</p>}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{formatInr(p.price_inr)}</span>
                    <span className="text-sm font-medium text-purple-600 group-hover:underline">View details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
