import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 79,
  title: "Setting up COD, UPI and international payments on an Indian e-commerce store",
  slug: "cod-upi-international-payments-ecommerce",
  excerpt: "Setting up COD, UPI and international payments on an Indian e-commerce store: choosing gateways, managing cash-on-delivery risk and accepting foreign cards.",
  category: "E-commerce",
  primaryKeyword: "cod upi payment ecommerce store",
  cover_image: "/projects/deetoo/screenshot-1.png",
  introduction: `<p>An Indian online store typically needs three things from payments: UPI and cards through a payment gateway for most domestic buyers, cash on delivery for buyers who don't yet trust the store or prefer to pay at the door, and, if you sell abroad, international cards and wallets with the right settings for foreign currency and compliance. Each has its own setup and risks, and COD in particular needs rules to keep returns-to-origin under control.</p>`,
  content: `<h2>Domestic online payments: UPI, cards, net banking, wallets</h2>
<p>Indian payment gateways bundle these methods in one checkout. When choosing one, compare:</p>
<ul>
<li><strong>Methods supported:</strong> UPI (including intent flows that open the buyer's UPI app on mobile), cards, net banking, wallets, EMI and pay-later options.</li>
<li><strong>Platform integration:</strong> a well-maintained plugin or app for your platform (Shopify, WooCommerce or custom).</li>
<li><strong>Fees:</strong> charged by the gateway per transaction and varying by method; check their current pricing page.</li>
<li><strong>Settlement time</strong> to your bank account.</li>
<li><strong>Success rates</strong> and support quality.</li>
<li><strong>Onboarding requirements:</strong> business documents, website policies and KYC.</li>
</ul>
<p>Gateways review your website before activating your account. Have clear contact details, product pages with prices, and terms, privacy, refund and shipping policies published first.</p>
<h2>Cash on delivery</h2>
<p>COD remains important in India, especially for first-time buyers, smaller towns and higher-value items from unfamiliar stores. It also brings risk: orders refused at the door come back (return to origin, or RTO), costing you shipping both ways and tying up stock.</p>
<p>Ways to control COD risk:</p>
<ul>
<li><strong>Confirm COD orders</strong> by call, WhatsApp or automated message before dispatch.</li>
<li><strong>Set limits:</strong> minimum and maximum order values, or no COD for certain products or pin codes with high RTO.</li>
<li><strong>Charge a COD fee</strong> or offer a prepaid discount to nudge buyers towards online payment.</li>
<li><strong>Partial prepayment:</strong> a small advance online, the rest on delivery.</li>
<li><strong>Use your logistics partner's COD tools</strong> and RTO data to spot risky patterns.</li>
</ul>
<p>Be clear about COD availability and fees on product pages and in the cart; surprises at checkout cause abandonment. See <a href="/blog/shopify-cart-abandonment/">cart abandonment</a>.</p>
<h2>International payments</h2>
<p>If you sell to customers abroad:</p>
<ul>
<li><strong>Enable international cards</strong> with your gateway; this is often a separate activation with additional checks.</li>
<li><strong>Multi-currency display and charging,</strong> if supported, so buyers see prices in their currency.</li>
<li><strong>PayPal and other global wallets</strong> that international buyers trust.</li>
<li><strong>Export compliance:</strong> payments from abroad have documentation and reporting requirements for Indian businesses. Talk to your accountant and bank.</li>
<li><strong>Shipping, duties and returns</strong> explained clearly for each destination.</li>
</ul>
<p>Our guides for selling to <a href="/blog/ecommerce-website-uk-payments-vat-returns-delivery/">the UK</a>, <a href="/blog/ecommerce-website-uae-payment-gateways-vat-arabic/">the UAE</a> and <a href="/blog/ecommerce-website-singapore-paynow-gst-pdpa/">Singapore</a> cover market-specific details.</p>
<h2>Platform notes</h2>
<ul>
<li><strong>Shopify:</strong> supports Indian gateways and COD through settings and apps; check whether Shopify charges an additional transaction fee for third-party gateways on your plan.</li>
<li><strong>WooCommerce:</strong> gateway plugins for Indian providers, with COD built in and extendable with rules.</li>
<li><strong>Custom builds:</strong> direct API integration with full control over checkout logic.</li>
</ul>
<p>Our <a href="/blog/woocommerce-vs-shopify-india/">WooCommerce vs Shopify comparison for India</a> covers the wider platform choice.</p>
<h2>Reduce refunds and disputes</h2>
<ul>
<li>Describe products accurately, with real photos and size guidance, so fewer orders come back.</li>
<li>Send order and shipping updates promptly; buyers who know where their order is rarely dispute payments.</li>
<li>Process refunds quickly and say how long each method takes to reach the buyer.</li>
<li>Keep proof of delivery for high-value orders, which helps if a chargeback is raised.</li>
</ul>
<h2>Test before launch</h2>
<ol>
<li>Place real orders with each method: UPI on a phone, a card, net banking, COD.</li>
<li>Test failed payments and retries.</li>
<li>Check refunds work for each method.</li>
<li>Confirm order emails or WhatsApp messages show the right payment status.</li>
<li>Check settlement reports match orders.</li>
</ol>
<h2>Payment questions store owners ask</h2>
<p><strong>Should we offer COD at all?</strong> For most Indian consumer stores, yes, with rules. Removing it can lower conversion significantly for new customers.</p>
<p><strong>Why are some UPI payments failing?</strong> Bank or UPI app downtime, timeouts, or users abandoning the app switch. Gateways' dashboards show failure reasons; offering retry options helps.</p>
<p><strong>Can we use more than one gateway?</strong> Yes. Some stores use a backup gateway, or route international payments through a different provider.</p>`,
  conclution: `<p>Cash on delivery isn't going away for Indian stores, so manage it rather than fight it: confirm orders, set limits, and nudge buyers towards prepaid. Then test every payment method on a phone before launch.</p>
<p>Our <a href="/services/ecommerce-web-development-services/">e-commerce team</a> sets up payments as part of every store build.</p>`,
}
