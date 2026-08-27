import type { Metadata } from 'next'
import Link from 'next/link'
import { siteUrl } from "@/lib/seo"


export const metadata: Metadata = {
  title: 'Refund Policy — NextGen Fusion Store',
  description: 'Refund policy for digital products purchased from the NextGen Fusion store.',
  alternates: { canonical: `${siteUrl}/store/refunds` },
}

// NOTE FOR THE OWNER: starter template. Review with a legal professional and
// edit the bracketed placeholders before relying on it.
export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <Link href="/store" className="text-sm text-gray-500 hover:text-gray-900">← Back to store</Link>
        <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">Refund Policy</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: [DATE]</p>

        <div className="mt-8 space-y-6 text-gray-600 leading-relaxed [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>
            Our products are digital goods (downloadable source code and files) delivered instantly after payment.
            Because access to the full source cannot be &quot;returned&quot; once downloaded, the following policy applies.
          </p>

          <h2>1. All sales are generally final</h2>
          <p>
            Once a product has been downloaded or its license key has been issued, the sale is final and
            non-refundable. Please review the product description, screenshots, tech stack, and live demo (where
            available) before purchasing.
          </p>

          <h2>2. When we will refund</h2>
          <p>We will issue a full refund if:</p>
          <ul>
            <li>You were charged more than once for the same order (duplicate payment).</li>
            <li>You have not downloaded the product, and you request a refund within [7] days of purchase.</li>
            <li>A technical fault on our side prevents you from downloading the product and we cannot resolve it within [5] business days.</li>
          </ul>

          <h2>3. What is not covered</h2>
          <ul>
            <li>&quot;I changed my mind&quot; or &quot;I no longer need it&quot; after downloading.</li>
            <li>Lack of the skills or environment required to run/customize the product (the required tech stack is listed on each product page).</li>
            <li>Requests for features that were never advertised for the product.</li>
          </ul>

          <h2>4. How to request a refund</h2>
          <p>
            Email{' '}
            <a href="mailto:contact@nextgenfusion.in" className="text-purple-600 hover:underline">contact@nextgenfusion.in</a>{' '}
            with your order email, the product name, and your payment/reference id. We aim to respond within
            [2] business days.
          </p>

          <h2>5. Chargebacks</h2>
          <p>
            Please contact us first — we&apos;re happy to help. Filing a chargeback without contacting us may result in
            your license being revoked.
          </p>

          <p className="pt-4 text-sm text-gray-400">
            See also our <Link href="/store/license" className="text-purple-600 hover:underline">License Agreement</Link>.
          </p>
        </div>
      </article>
    </main>
  )
}
