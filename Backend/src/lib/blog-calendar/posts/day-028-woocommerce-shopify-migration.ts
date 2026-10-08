import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 28,
  title: "Moving between WooCommerce and Shopify: what migrates cleanly and what doesn't",
  slug: "woocommerce-shopify-migration",
  excerpt: "Moving between WooCommerce and Shopify: which data migrates cleanly, what needs rebuilding, and how to keep your Google rankings through the switch.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "migrate woocommerce to shopify",
  cover_image: "/projects/samaraha/screenshot-1.png",
  introduction: `<p>Products, customers and order history can usually be moved between WooCommerce and Shopify with import tools. What doesn't move cleanly is everything around them: URLs (Shopify uses fixed URL patterns), customer passwords, reviews, custom checkout logic, plugin features and your theme. A successful migration plans for those before the switch, especially the redirects that protect your Google rankings.</p>`,
  content: `<h2>First: are you sure you need to move?</h2>
<p>Platform switches are expensive in time and risk. Make sure the problem is the platform, not the setup. A slow WooCommerce store can often be fixed (see our <a href="/blog/woocommerce-speed-optimisation/">WooCommerce speed guide</a>), and a Shopify store with rising app costs can often be trimmed. Our <a href="/blog/woocommerce-vs-shopify-india/">WooCommerce vs Shopify comparison</a> covers when each platform fits better.</p>
<h2>What usually migrates cleanly</h2>
<ul>
<li><strong>Products:</strong> titles, descriptions, prices, SKUs, stock levels and images. Variants need checking: the two platforms structure options differently, and Shopify has limits on options and variants per product.</li>
<li><strong>Customers:</strong> names, emails, addresses and marketing consent, if you have it recorded.</li>
<li><strong>Order history:</strong> past orders can be imported for reference and customer records.</li>
<li><strong>Categories and collections:</strong> with some restructuring.</li>
<li><strong>Blog posts and pages:</strong> content moves; layouts usually don't.</li>
</ul>
<p>Shopify provides its own store import tools, and specialist migration services handle larger catalogues. Whatever you use, migrate to a test store first and check a sample of products, variants and customers by hand.</p>
<h2>What doesn't migrate cleanly</h2>
<h3>URLs</h3>
<p>Shopify uses fixed patterns such as <code>/products/product-name</code> and <code>/collections/category-name</code>. WooCommerce URLs are usually different (for example <code>/product/product-name/</code>). Every old URL needs a redirect to its new one, or you lose search traffic and links. Shopify has a built-in URL redirect tool that accepts bulk imports.</p>
<h3>Customer passwords</h3>
<p>Passwords are stored encrypted and can't be transferred. Customers will need to set a new password or activate their account. Plan an email explaining this, so returning customers aren't confused.</p>
<h3>Reviews</h3>
<p>Product reviews often live in a plugin or app. Export them and import them into the new review app on the other platform.</p>
<h3>Plugin and app features</h3>
<p>Every feature that came from a plugin (wishlists, bundles, subscriptions, custom fields, GST invoices, delivery date pickers) needs an equivalent on the new platform. List them all before deciding to move; one missing feature can change the decision.</p>
<h3>Theme and design</h3>
<p>Themes don't transfer. You'll choose or build a new one, which is often a chance to fix design problems at the same time.</p>
<h3>Integrations</h3>
<p>Payment gateways, shipping providers, accounting, ERP and marketing tools all need reconnecting and testing.</p>
<h2>Protecting your SEO</h2>
<ol>
<li>Export every URL from the old store that gets traffic or links: products, categories, pages and blog posts.</li>
<li>Map each one to its new URL in a spreadsheet.</li>
<li>Carry over titles, meta descriptions and product descriptions; don't let the import replace them with defaults.</li>
<li>Import redirects before launch and test a sample.</li>
<li>Submit the new sitemap and watch Search Console closely for the first weeks.</li>
</ol>
<p>Our guide to <a href="/blog/migrate-website-without-losing-rankings/">migrating a website without losing rankings</a> covers the SEO process in more detail.</p>
<h2>Going the other way: Shopify to WooCommerce</h2>
<p>Most of the above applies in reverse, with a few differences worth knowing:</p>
<ul>
<li><strong>You take on hosting and maintenance.</strong> Shopify handled servers, security and updates; on WooCommerce that becomes your job or your developer's. Budget for it before you move.</li>
<li><strong>URLs become flexible.</strong> You can choose a structure on WooCommerce, but you still need redirects from Shopify's <code>/products/</code> and <code>/collections/</code> paths.</li>
<li><strong>Apps become plugins.</strong> Each Shopify app needs a WooCommerce equivalent, and some will be paid plugins with yearly licences.</li>
<li><strong>Checkout is fully yours.</strong> That's often the reason to move: full control over the checkout flow, payment gateways and custom logic, which Shopify restricts on most plans.</li>
</ul>
<p>Businesses usually move to WooCommerce for control and ownership, and to Shopify to stop managing hosting and plugins. Be honest about which trade-off you want before you start.</p>
<h2>The order we'd do it in</h2>
<ol>
<li>Audit the current store: data, features, integrations, URLs, traffic.</li>
<li>Choose equivalents for every plugin or app feature.</li>
<li>Set up the new store: theme, settings, payments, shipping, taxes.</li>
<li>Run a test migration and check the data by hand.</li>
<li>Build redirects and carry over SEO fields.</li>
<li>Test orders end to end with each payment method.</li>
<li>Freeze changes on the old store, run the final migration of new orders and customers.</li>
<li>Switch the domain, put redirects live, and test again.</li>
<li>Email customers about account activation.</li>
<li>Watch sales, errors and Search Console for a month.</li>
</ol>
<h2>Switching questions</h2>
<h3>Will I lose my Google rankings?</h3>
<p>Some fluctuation is common for a few weeks. With complete redirects and the same content, rankings usually recover. Without redirects, losses can be serious and lasting.</p>
<h3>Can I keep my domain?</h3>
<p>Yes. You point the domain to the new platform at launch.</p>
<h3>How long does a migration take?</h3>
<p>It depends on catalogue size, custom features and integrations. Plan for checking and testing time, not just the data transfer.</p>`,
  conclution: `<p>Products and customers are the easy part. Redirects, passwords, reviews and the plugin features nobody wrote down are where migrations trip up, so list those first.</p>
<p>We've moved stores in both directions; our <a href="/services/ecommerce-web-development-services/">e-commerce team</a> can plan yours.</p>`,
}
