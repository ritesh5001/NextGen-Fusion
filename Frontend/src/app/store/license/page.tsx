import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl, siteUrl } from "@/lib/seo"


export const metadata: Metadata = {
  title: 'License Agreement — NextGen Fusion Store',
  description: 'End User License Agreement for digital products purchased from the NextGen Fusion store.',
  alternates: { canonical: absoluteUrl("/store/license") },
}

// NOTE FOR THE OWNER: this is a starter template. Review it with a legal
// professional and edit the bracketed placeholders (jurisdiction, contact,
// effective date) before relying on it.
export default function LicensePage() {
  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <Link href="/store" className="text-sm text-gray-500 hover:text-gray-900">← Back to store</Link>
        <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">License Agreement</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: [DATE]</p>

        <div className="mt-8 space-y-6 text-gray-600 leading-relaxed [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>
            This End User License Agreement (&quot;Agreement&quot;) is between you (&quot;Licensee&quot;) and
            NextGen Fusion (&quot;we&quot;, &quot;us&quot;). By purchasing, downloading, or using any digital
            product (&quot;Product&quot;) from our store, you agree to these terms.
          </p>

          <h2>1. License grant</h2>
          <p>
            Upon full payment, we grant you a worldwide, non-exclusive, non-transferable license to use the
            Product&apos;s source code and assets to build, deploy, and operate applications for your own business
            or for your clients.
          </p>

          <h2>2. What you may do</h2>
          <ul>
            <li>Use and modify the source code for your own projects or client projects.</li>
            <li>Deploy the resulting application on any hosting you control.</li>
            <li>Keep using what you purchased indefinitely (a one-time purchase, unless stated otherwise).</li>
          </ul>

          <h2>3. What you may not do</h2>
          <ul>
            <li>Resell, redistribute, sublicense, or share the Product&apos;s source code, in whole or in part.</li>
            <li>Repackage or list the Product (modified or not) as a competing product, template, or theme.</li>
            <li>Share your download link or license key with anyone outside your organization.</li>
            <li>Remove or alter copyright, license, or attribution notices in the source.</li>
          </ul>

          <h2>4. Ownership</h2>
          <p>
            We retain all intellectual property rights, title, and interest in the Product. This Agreement grants a
            license to use it — not a transfer of ownership.
          </p>

          <h2>5. License key &amp; delivery</h2>
          <p>
            Each purchase includes a unique license key and a secure, limited-use download link. The license key
            identifies your entitlement for support and updates. Download links may expire or be usage-limited;
            you can re-request them from the <Link href="/store/purchases" className="text-purple-600 hover:underline">retrieve purchases</Link> page.
          </p>

          <h2>6. Support &amp; updates</h2>
          <p>
            Support and updates (if any) are provided as described on the Product page and are tied to your valid
            license. We may release updates at our discretion; we do not guarantee ongoing updates unless stated.
          </p>

          <h2>7. No warranty</h2>
          <p>
            The Product is provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind,
            express or implied, including fitness for a particular purpose or non-infringement.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential
            damages arising from your use of the Product. Our total liability is limited to the amount you paid for it.
          </p>

          <h2>9. Termination</h2>
          <p>
            This license terminates automatically if you breach these terms. On termination you must stop using and
            delete the Product&apos;s source code.
          </p>

          <h2>10. Governing law</h2>
          <p>
            This Agreement is governed by the laws of India, and disputes are subject to the courts of [YOUR CITY],
            India.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about licensing? Email{' '}
            <a href="mailto:contact@nextgenfusion.in" className="text-purple-600 hover:underline">contact@nextgenfusion.in</a>.
          </p>

          <p className="pt-4 text-sm text-gray-400">
            See also our <Link href="/store/refunds" className="text-purple-600 hover:underline">Refund Policy</Link>.
          </p>
        </div>
      </article>
    </main>
  )
}
