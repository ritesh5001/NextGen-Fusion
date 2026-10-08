import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 35,
  title: "Shopify SEO: fixing collection pages, duplicate product URLs and thin descriptions",
  slug: "shopify-seo",
  excerpt: "Shopify SEO: fixing collection pages, duplicate product URLs, thin descriptions and theme settings so your store's products and collections rank in Google.",
  category: "E-commerce",
  primaryKeyword: "shopify seo",
  cover_image: "/projects/sitaravastram/screenshot-1.png",
  introduction: `<p>Shopify handles much of the technical SEO groundwork for you: it generates a sitemap and robots.txt, sets canonical tags and serves pages over HTTPS. What it can't do is write useful collection pages, unique product descriptions or sensible titles, and some themes and apps create duplicate URLs and slow pages that hold rankings back. Most Shopify stores we look at rank poorly because of content and structure, not the platform.</p>`,
  content: `<h2>1. Make collection pages worth ranking</h2>
<p>Collection pages often target the most valuable searches: "linen kurtas for women", "men's leather wallets". On many stores they're just a heading and a grid of products, which gives Google little to work with.</p>
<ul>
<li>Write a short introduction for each important collection: what's in it, who it's for, how to choose. Two or three helpful paragraphs is plenty; it can sit above or below the grid.</li>
<li>Give each collection a specific title tag and meta description, not the default.</li>
<li>Create collections around how people search, not only how you organise stock.</li>
<li>Link related collections to each other.</li>
</ul>
<h2>2. Write product descriptions that aren't the manufacturer's</h2>
<p>Copying the supplier's description means your page says exactly what hundreds of other stores say. Write your own: materials, sizing, how it fits or works, who it suits, care instructions and answers to common questions. Unique, specific descriptions are one of the clearest advantages a small store can have.</p>
<h2>3. Understand Shopify's duplicate URLs</h2>
<p>A Shopify product can be reached through several addresses, for example <code>/products/linen-kurta</code> and <code>/collections/kurtas/products/linen-kurta</code>. Shopify sets a canonical tag pointing to the <code>/products/</code> version, which tells Google which one to index. That's fine, but some themes link to the collection-based URL everywhere, which spreads signals across duplicates. A developer can change the theme to link directly to the canonical product URL.</p>
<p>Other common sources of duplicates:</p>
<ul>
<li><strong>Tag-filtered collection pages</strong> (such as <code>/collections/kurtas/cotton</code>), which can create many thin variations.</li>
<li><strong>Variant parameters</strong> (<code>?variant=</code>), which Shopify canonicalises to the main product.</li>
<li><strong>Apps that generate extra pages,</strong> such as filters or search pages.</li>
</ul>
<p>Check Search Console's Page indexing report for patterns of duplicates and decide which ones to keep out of the index.</p>
<h2>4. Fix titles and meta descriptions in bulk</h2>
<p>Every product, collection, page and blog post has editable search fields in the admin ("Search engine listing"). Many stores leave them as defaults. Write titles that start with what the page is about, include the main search phrase naturally, and stay around 60 characters. For large catalogues, a consistent pattern applied in bulk is better than nothing.</p>
<h2>5. Speed up the theme</h2>
<p>Heavy themes, oversized images and too many apps slow Shopify stores down, which hurts both rankings and sales. We covered this in detail in <a href="/blog/shopify-speed-optimisation/">Shopify speed optimisation</a>.</p>
<h2>6. Image alt text and file names</h2>
<p>Add descriptive alt text to product images ("olive linen kurta with mandarin collar, front view"), which helps Google Images and accessibility. Name image files descriptively before uploading where you can.</p>
<h2>7. Structured data</h2>
<p>Most modern Shopify themes output Product structured data with price and availability. Check yours in Google's Rich Results Test, and make sure reviews from your review app are included if you want star ratings to be eligible in results. We explain which schema matters most later in this series.</p>
<h2>8. Use the blog for questions buyers ask</h2>
<p>Buying guides, size guides, care guides and comparisons attract searches your product pages can't, and they can link to the relevant collections. Write for real questions, not for keywords alone.</p>
<h2>9. Handle discontinued products properly</h2>
<p>Don't simply delete products that have links or traffic. Keep the page with "out of stock" and alternatives if it may return, or redirect it to the closest product or collection using Shopify's URL redirects.</p>
<h2>10. Connect Search Console and watch it</h2>
<p>Verify your store in Google Search Console, submit the sitemap Shopify generates at <code>/sitemap.xml</code>, and check the Performance and Page indexing reports monthly. That's where you'll see which pages rank, for what, and what's being left out.</p>
<h2>Shopify SEO questions</h2>
<p><strong>Is Shopify bad for SEO?</strong> No. It has some fixed structures (URL patterns, limited robots.txt control without theme edits), but stores rank well on it every day. Content and structure matter far more.</p>
<p><strong>Do I need an SEO app?</strong> Not necessarily. Many SEO apps do things you can do in the admin, and each app adds weight. Use one only if it solves a specific problem.</p>
<p><strong>How long until changes show in rankings?</strong> Weeks to months, depending on competition and how often Google crawls your store.</p>`,
  conclution: `<p>Start with your three most valuable collections and your ten best-selling products. Rewrite them properly before touching anything else; it's where most of the gains are.</p>
<p>Our <a href="/services/shopify-development-services/">Shopify team</a> can audit the rest of the store when you're ready.</p>`,
}
