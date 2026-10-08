import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 83,
  title: "WooCommerce checkout not working: payment gateway, shipping and plugin conflicts",
  slug: "woocommerce-checkout-not-working",
  excerpt: "WooCommerce checkout not working? How to find and fix payment gateway errors, shipping and tax problems, plugin conflicts and caching issues that stop orders.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "woocommerce checkout not working",
  cover_image: "/projects/saurally/screenshot-1.png",
  introduction: `<p>When WooCommerce checkout stops working, the cause is usually one of five things: a payment gateway problem (keys, webhooks or the gateway's own outage), shipping or tax settings that leave buyers with no valid option, a plugin or theme conflict after an update, caching serving stale cart or checkout pages, or a JavaScript error that stops the checkout script running. Every hour checkout is broken costs sales, so work through them in order.</p>`,
  content: `<h2>First: reproduce the problem</h2>
<ul>
<li>Place a test order yourself, logged out, in a private window, on desktop and phone.</li>
<li>Note exactly what happens: error message, endless spinner, payment page that doesn't open, order created but marked failed or pending.</li>
<li>Check <strong>WooCommerce › Status › Logs</strong> for recent errors, especially gateway logs.</li>
<li>Open the browser console (right-click, Inspect, Console) during checkout and look for red errors.</li>
</ul>
<h2>Cause 1: Payment gateway</h2>
<ul>
<li><strong>API keys:</strong> test keys left in live mode, expired or regenerated keys.</li>
<li><strong>Webhooks:</strong> the gateway confirms payments by calling your site. If the webhook URL is wrong, blocked by a firewall or security plugin, or failing, payments succeed at the gateway but orders stay pending.</li>
<li><strong>Account status:</strong> the gateway account suspended, under review, or with a method disabled.</li>
<li><strong>Gateway outage:</strong> check the provider's status page.</li>
<li><strong>Plugin version:</strong> an outdated gateway plugin after a WooCommerce update.</li>
</ul>
<h2>Cause 2: Shipping and taxes</h2>
<p>"No shipping options were found" usually means the buyer's address doesn't match any shipping zone, or a method has conditions that exclude the order (weight, minimum value). Check zones cover every area you ship to, and that there's a fallback method. Tax misconfiguration can also produce errors or wrong totals.</p>
<h2>Cause 3: Plugin or theme conflict</h2>
<p>If checkout broke after an update:</p>
<ol>
<li>On a staging copy, switch to a default theme. If checkout works, the theme is the cause.</li>
<li>Deactivate plugins except WooCommerce and the gateway, then reactivate one at a time until it breaks.</li>
<li>Roll back or update the culprit, or contact its developer.</li>
</ol>
<p>Checkout field editors, one-page checkout plugins, COD rule plugins and custom code snippets are frequent suspects.</p>
<h2>Cause 4: Caching</h2>
<p>Cart, checkout and My Account pages must never be cached, because they're different for every customer. Check your caching plugin, server cache and CDN exclude them, and exclude WooCommerce session cookies. Our <a href="/blog/woocommerce-speed-optimisation/">WooCommerce speed guide</a> lists what WooCommerce recommends.</p>
<h2>Cause 5: JavaScript errors</h2>
<p>WooCommerce's checkout relies on JavaScript. An error from any script on the page, such as an optimisation plugin combining or delaying scripts, can stop it. Disable JavaScript optimisation for checkout and test again.</p>
<h2>Cause 6: Block checkout vs classic checkout</h2>
<p>Newer WooCommerce stores use the block-based checkout by default. Some older plugins only support the classic checkout. If a plugin's feature doesn't appear or breaks, check compatibility, or switch the checkout page to the classic shortcode while the plugin is updated.</p>
<h2>Cause 7: Server and security settings</h2>
<ul>
<li>Firewall or security plugin rules blocking gateway callbacks or AJAX requests.</li>
<li>An expired SSL certificate, which payment pages refuse to work without.</li>
<li>PHP errors or memory limits; see <a href="/blog/wordpress-critical-error/">WordPress critical error</a>.</li>
</ul>
<h2>While it's broken</h2>
<ul>
<li>Add a notice to the site with an alternative way to order, such as WhatsApp or phone.</li>
<li>Check pending and failed orders: some customers may have paid; reconcile with the gateway dashboard and contact them.</li>
</ul>
<h2>Prevent it next time</h2>
<ul>
<li>Test updates on staging, including a full checkout.</li>
<li>Run a real test order after any change and on a schedule.</li>
<li>Monitor orders: an alert if no orders arrive in a period when you'd normally expect some.</li>
<li>Keep gateway plugins current and webhook URLs documented.</li>
</ul>
<p>For payment setup in general, see <a href="/blog/cod-upi-international-payments-ecommerce/">setting up COD, UPI and international payments</a>.</p>
<h2>Checkout questions</h2>
<p><strong>Orders are stuck on "pending payment". Why?</strong> Usually the gateway's confirmation (webhook) isn't reaching your site. Check the gateway's webhook logs and your firewall.</p>
<p><strong>Checkout works for me but not for customers. Why?</strong> Caching, specific addresses without shipping options, a particular payment method failing, or a browser-specific script error. Ask for details and test those cases.</p>
<p><strong>Should I switch gateways?</strong> Only if the gateway itself is unreliable. Most problems are configuration or conflicts on the site.</p>`,
  conclution: `<p>Every hour checkout is broken costs real orders, so put a notice on the site with another way to order while you work through the list. And once it's fixed, add a full test checkout to your update routine.</p>
<p>If it's broken right now, our <a href="/services/website-maintenance-services/">maintenance team</a> can help; message us on WhatsApp at +91 73482 28167.</p>`,
}
