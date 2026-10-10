import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getStoreProducts, formatInr } from '@/lib/store'
import { buildMetadata } from "@/lib/seo"


export const metadata: Metadata = buildMetadata({
  title: 'Store — Ready-to-Use CRM, ERP & Software',
  description:
    'Buy production-ready CRM, ERP, and software systems built by NextGen Fusion. Instant download, full source code, one-time price.',
  path: '/store',
  ogEyebrow: 'NextGen Fusion Store',
})

export default async function StorePage() {
  const products = await getStoreProducts()

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
          Digital products
        </span>
        <h1 className="mt-3 text-4xl font-medium leading-tight text-ink sm:text-5xl tracking-tight">
          Ready-to-use{' '}
          <span className="text-gradient">
            software systems
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-mute">
          Production-grade CRM, ERP, and tools we&apos;ve built — buy once, download the full source, and ship faster.
        </p>
        <p className="mt-4 text-sm text-ink-mute">
          Already bought?{' '}
          <Link href="/store/purchases/" className="font-medium text-brand hover:underline">
            Retrieve your downloads
          </Link>
          <span className="mx-2 text-gray-300">·</span>
          <Link href="/store/license/" className="text-ink-mute hover:underline">License</Link>
          <span className="mx-2 text-gray-300">·</span>
          <Link href="/store/refunds/" className="text-ink-mute hover:underline">Refund Policy</Link>
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        {products.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-ink/10 py-24 text-center text-ink-mute">
            Products are coming soon. Check back shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/store/${p.slug}`}
                className="glass group flex flex-col overflow-hidden rounded-[28px] transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white/50">
                  {p.cover_image ? (
                    <Image
                      src={p.cover_image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      // Product art is served from the CMS host, which is not in
                      // next.config remotePatterns; matches how blog covers are handled.
                      unoptimized={p.cover_image.startsWith('http')}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/10 via-violet/10 to-cyan/10 px-4 text-center text-sm font-semibold text-ink-mute">
                      {p.title}
                    </div>
                  )}
                  {p.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-ink-soft shadow-sm">
                      {p.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-semibold text-ink group-hover:text-brand">{p.title}</h2>
                  {p.summary && <p className="mt-1 line-clamp-2 text-sm text-ink-mute">{p.summary}</p>}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-ink">{formatInr(p.price_inr)}</span>
                    <span className="text-sm font-medium text-brand group-hover:underline">View details →</span>
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
