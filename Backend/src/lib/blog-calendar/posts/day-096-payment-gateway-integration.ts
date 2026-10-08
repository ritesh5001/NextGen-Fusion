import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 96,
  title: "Payment gateway integration for web apps: Stripe, Razorpay and PayPal compared",
  slug: "payment-gateway-integration",
  excerpt: "Payment gateway integration for web apps: Stripe, Razorpay and PayPal compared on markets, methods, subscriptions and payouts, and how to integrate safely.",
  category: "Custom Software",
  primaryKeyword: "stripe vs razorpay vs paypal",
  cover_image: "/projects/tatvivahtrends/screenshot-1.png",
  introduction: `<p>Choose a payment gateway by where your business is registered and where your customers are, which payment methods they expect, and what your product needs: one-off payments, subscriptions, split payouts to sellers, or international currencies. Razorpay is built around Indian payments such as UPI, cards, net banking and wallets. Stripe is strong for international cards, subscriptions and developer tools in the many countries it supports. PayPal is a familiar wallet for international buyers. Many businesses use more than one. Whatever you choose, integrate it so payment status is confirmed on your server, not trusted from the browser.</p>`,
  content: `<h2>Start with availability</h2>
<p>Gateways onboard businesses country by country, and availability changes. Check that each provider currently accepts businesses registered where yours is, and supports payouts to your bank, before planning anything else. This has changed in some markets, including India, so check the provider's current onboarding pages rather than older articles.</p>
<h2>How they compare</h2>
<table>
<thead><tr><th></th><th>Razorpay</th><th>Stripe</th><th>PayPal</th></tr></thead>
<tbody>
<tr><td>Strongest for</td><td>Indian customers: UPI, cards, net banking, wallets, EMI</td><td>International cards, subscriptions, developer experience</td><td>International buyers who trust and use PayPal</td></tr>
<tr><td>Subscriptions</td><td>Supported, including UPI mandates where available</td><td>Very mature billing features</td><td>Supported</td></tr>
<tr><td>Marketplace payouts</td><td>Split payment and payout products</td><td>Connected-account products for platforms</td><td>Options for platforms</td></tr>
<tr><td>Documentation</td><td><a href="https://razorpay.com/docs/" rel="noopener">Razorpay docs</a></td><td><a href="https://docs.stripe.com/" rel="noopener">Stripe docs</a></td><td><a href="https://developer.paypal.com/" rel="noopener">PayPal developer</a></td></tr>
</tbody>
</table>
<p>Fees differ by method, country and volume, and change over time. Compare current pricing pages for your expected mix of payments.</p>
<h2>Questions to decide the choice</h2>
<ol>
<li>Where are most customers, and how do they prefer to pay?</li>
<li>Do you need recurring billing, and with which methods?</li>
<li>Do you pay out to sellers or partners?</li>
<li>Which currencies do you charge in, and where do you settle?</li>
<li>Does your platform (Shopify, WooCommerce, custom) have a well-maintained integration?</li>
<li>What are settlement times and support quality like?</li>
</ol>
<p>Indian businesses selling domestically and internationally often combine an Indian gateway for local methods with a second option for international buyers. For stores specifically, see <a href="/blog/cod-upi-international-payments-ecommerce/">COD, UPI and international payments</a>.</p>
<h2>Integrating safely</h2>
<h3>Never trust the browser</h3>
<p>Create orders and payment intents on your server, and confirm payment status on your server, either by verifying the gateway's signature on the response or, better, through webhooks. A user can tamper with anything in the browser.</p>
<h3>Use webhooks</h3>
<p>Gateways send webhook events when payments succeed, fail, are refunded or disputed. Verify webhook signatures, handle events idempotently (the same event may arrive twice) and log them.</p>
<h3>Keep card data off your servers</h3>
<p>Use the gateway's hosted checkout or secure fields, so card details never touch your systems. This greatly reduces your security and compliance burden.</p>
<h3>Handle every state</h3>
<p>Pending, succeeded, failed, cancelled, refunded, partially refunded, disputed. Many bugs come from states nobody planned for, such as a UPI payment that completes minutes later.</p>
<h3>Store references, not secrets</h3>
<p>Keep the gateway's payment and order IDs with your records for reconciliation. Keep API keys in environment variables, separate test and live keys, and rotate them if exposed.</p>
<h3>Test thoroughly</h3>
<p>Use test mode for every scenario: success, failure, timeout, refund, webhook retries. Then run a few real low-value transactions in live mode before launch.</p>
<h2>Subscriptions</h2>
<p>Subscriptions add plan changes, proration, failed renewal retries, dunning emails, cancellations and invoices. Use the gateway's billing features rather than building your own scheduler. Keep your app's access rights in sync with subscription status through webhooks.</p>
<h2>Reconciliation and reporting</h2>
<p>Match gateway settlements to orders regularly. Automate it where possible, especially at volume; your accountant will thank you.</p>
<h2>Integration questions</h2>
<h3>Can we switch gateways later?</h3>
<p>Yes, but saved cards and subscriptions don't always move easily. Design your code so the gateway is behind your own interface.</p>
<h3>Do we need PCI compliance?</h3>
<p>Some level applies to anyone taking card payments. Using hosted checkout or secure fields keeps your scope minimal; the gateway explains what applies.</p>
<h3>Why are some UPI payments marked pending?</h3>
<p>UPI confirmations can arrive late. Rely on webhooks and status checks rather than the first response.</p>`,
  conclution: `<p>Never trust the browser to tell you a payment succeeded. Confirm it on your server with verified webhooks, and test every state, including the awkward ones like late UPI confirmations.</p>
<p>We integrate payment gateways through our <a href="/services/api-integration-services/">API integration services</a>.</p>`,
}
