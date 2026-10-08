import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 90,
  title: "How to build a multi-vendor marketplace like Amazon or Etsy: features, cost and timeline",
  slug: "build-multi-vendor-marketplace",
  excerpt: "How to build a multi-vendor marketplace like Amazon or Etsy: the features you need, how payments and payouts work, the platform options, and timeline drivers.",
  category: "E-commerce",
  primaryKeyword: "build multi vendor marketplace",
  cover_image: "/projects/sitaravastram/screenshot-1.png",
  introduction: `<p>A multi-vendor marketplace needs everything an online store has, plus the parts that make it a marketplace: seller sign-up and verification, seller dashboards to manage listings, orders and payouts, commission and payout handling, rules for shipping and returns across sellers, and trust features such as reviews and dispute handling. The biggest decisions are how money flows (who collects payment and how sellers are paid) and how much seller self-service you need on day one. Start narrower than Amazon: one category, one region, a small set of good sellers.</p>`,
  content: `<h2>Store or marketplace?</h2>
<p>If you own the stock, you need a store. If other sellers list and ship their own products, you need a marketplace. There's a middle option, a store with several suppliers but no seller logins, that's much simpler. Our guide to <a href="/ecommerce-store-vs-marketplace/">ecommerce store vs marketplace</a> covers the decision.</p>
<h2>Core features</h2>
<h3>For buyers</h3>
<ul>
<li>Search, filters and categories across all sellers.</li>
<li>Product pages showing the seller, ratings and delivery details.</li>
<li>A cart that can include items from several sellers.</li>
<li>Order tracking per seller shipment.</li>
<li>Reviews of products and sellers, and a way to raise issues.</li>
</ul>
<h3>For sellers</h3>
<ul>
<li>Registration with verification (business documents, bank details).</li>
<li>A dashboard to add and edit products, manage stock and prices.</li>
<li>Order management: accept, ship, update tracking, handle returns.</li>
<li>Payout reports and statements.</li>
</ul>
<h3>For the marketplace operator</h3>
<ul>
<li>Seller approval and quality control.</li>
<li>Commission rules by category or seller.</li>
<li>Payouts, refunds and dispute handling.</li>
<li>Moderation of listings and reviews.</li>
<li>Reports on sales, sellers and performance.</li>
</ul>
<h2>Payments and payouts</h2>
<p>The most important design decision. Common models:</p>
<ul>
<li><strong>Marketplace collects, then pays sellers:</strong> you take payment, deduct commission and pay sellers on a schedule. Payment providers offer split payment and payout products built for this; using them is far better than handling seller money manually.</li>
<li><strong>Sellers paid directly:</strong> simpler for you, but harder to control commissions and refunds.</li>
</ul>
<p>Either way, involve your accountant early: commissions, taxes, invoices and, in some countries, rules for marketplaces collecting money on behalf of sellers all matter.</p>
<h2>Platform options</h2>
<ul>
<li><strong>Marketplace plugins on WooCommerce,</strong> for smaller marketplaces with standard needs.</li>
<li><strong>Marketplace apps on Shopify,</strong> similarly for simpler models.</li>
<li><strong>Dedicated marketplace software</strong>, configured to your rules.</li>
<li><strong>Custom builds,</strong> for unusual models, B2B workflows or scale; see our <a href="/services/marketplace-development-services/">marketplace development services</a>.</li>
</ul>
<p>We've built both kinds: <a href="/work/tatvivahtrends/">TatVivah Trends</a>, a wedding-wear marketplace with 3,000+ products and verified sellers, and <a href="/work/maribiz-ai/">MariBiz.ai</a>, a B2B marine procurement marketplace built around requests for quotes.</p>
<h2>What drives the timeline</h2>
<ul>
<li>How much seller self-service you need at launch.</li>
<li>Payment and payout model and its integration.</li>
<li>Shipping complexity across many sellers.</li>
<li>Verification and compliance requirements.</li>
<li>Mobile apps for buyers or sellers.</li>
</ul>
<p>Our typical range for platforms like this is four to fourteen weeks or more of build time from scope sign-off, depending on these factors; see <a href="/blog/how-long-to-build-a-website/">how long a website takes</a>.</p>
<h2>A sensible first version</h2>
<ol>
<li>One category and one region.</li>
<li>Seller sign-up with manual approval by your team.</li>
<li>A simple seller dashboard: products, stock, orders, payouts.</li>
<li>Marketplace-collected payments with automated split payouts.</li>
<li>Clear shipping and returns rules for every seller.</li>
<li>Product and seller reviews.</li>
</ol>
<p>Promotions, advertising for sellers, advanced analytics, seller tiers and mobile apps can all wait until buyers and sellers are active.</p>
<h2>The chicken-and-egg problem</h2>
<p>A marketplace needs sellers to attract buyers and buyers to attract sellers. Software doesn't solve that. Most successful marketplaces start narrow, recruit a core of good sellers by hand, sometimes manage listings for them at first, and focus on one audience before expanding.</p>
<h2>Marketplace questions</h2>
<h3>Should we build mobile apps at launch?</h3>
<p>Usually not. A strong mobile website first; apps once you have active, repeat users.</p>
<h3>How do we handle returns across sellers?</h3>
<p>Set clear marketplace-wide rules, then let each seller handle their own returns within them, with you as the arbiter in disputes.</p>
<h3>Can we start as a store and add sellers later?</h3>
<p>Yes. Many marketplaces start by selling a curated range themselves, then open to sellers.</p>`,
  conclution: `<p>The software is the easier half of a marketplace. The harder half is getting the first good sellers and the first buyers at the same time, so start narrower than feels comfortable.</p>
<p>If you're planning one, see our <a href="/services/marketplace-development-services/">marketplace development services</a> or message us on WhatsApp at +91 73482 28167.</p>`,
}
