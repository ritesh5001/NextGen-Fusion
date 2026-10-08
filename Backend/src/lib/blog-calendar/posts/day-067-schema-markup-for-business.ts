import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 67,
  title: "Schema markup explained for business owners: which structured data actually matters",
  slug: "schema-markup-for-business",
  excerpt: "Schema markup explained for business owners: what structured data does, which types actually matter for a business website, and how to add and test it properly.",
  category: "SEO",
  primaryKeyword: "schema markup for small business",
  cover_image: "/projects/cleanship/screenshot-1.png",
  introduction: `<p>Schema markup (structured data) is code on your pages that tells search engines and AI systems exactly what things are: this is a business with this address and phone number, this is a product with this price, this is an article by this author. It can make pages eligible for richer search results, such as product prices, ratings and breadcrumbs, and it helps machines understand and describe your business accurately. For most businesses, a handful of types covers what matters: Organization or LocalBusiness, Product, Article, BreadcrumbList and, where relevant, Service and Event.</p>
<p>Structured data sounds technical, but the parts that matter for a business website are small and quick to add.</p>`,
  content: `<h2>What structured data does</h2>
<p>Search engines read your page's text, but structured data removes guesswork. Google's <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" rel="noopener">introduction to structured data</a> explains that it uses this information to understand content and to enable certain rich results. It doesn't directly improve rankings, but richer, clearer listings can earn more clicks, and accurate information helps AI assistants describe you correctly; see <a href="/blog/get-cited-in-ai-answers/">getting mentioned in AI answers</a>.</p>
<h2>The format to use</h2>
<p>Use JSON-LD: a block of code in the page that describes the content, separate from the visible HTML. It's what Google recommends and the easiest to maintain.</p>
<h2>The types that matter most</h2>
<h3>Organization or LocalBusiness</h3>
<p>On your homepage or contact page: business name, logo, address, phone, opening hours, website and links to your official social profiles (using <code>sameAs</code>). Use a specific LocalBusiness type where one fits, such as Dentist, Restaurant or ProfessionalService.</p>
<h3>Product</h3>
<p>On product pages: name, image, description, brand, price, currency, availability and, if you have genuine reviews, rating information. This can make products eligible for price and availability details in search.</p>
<h3>Article or BlogPosting</h3>
<p>On blog posts: headline, author, publish and update dates, image and publisher.</p>
<h3>BreadcrumbList</h3>
<p>On pages deeper in the site, showing the path (Home › Services › SEO). It can replace the URL with a readable path in search results.</p>
<h3>Service</h3>
<p>On service pages: the service, who provides it and the area served. Rich results are limited, but it clarifies what you offer.</p>
<h3>Event</h3>
<p>If you run events, workshops or webinars, Event markup can make them eligible for event listings.</p>
<h2>What to be careful with</h2>
<ul>
<li><strong>FAQ markup:</strong> Google now shows FAQ rich results only for a limited set of authoritative sites, so don't expect them for a business site. Marking up a genuine FAQ is harmless, but it isn't a shortcut.</li>
<li><strong>Review markup:</strong> only for genuine reviews visible on the page. Marking up reviews of your own business on your own site isn't eligible for star ratings in most cases, and fake or hidden reviews break the rules.</li>
<li><strong>Matching visible content:</strong> structured data must describe what's actually on the page. Marking up things visitors can't see risks a manual action.</li>
</ul>
<h2>How to add it</h2>
<ul>
<li><strong>WordPress:</strong> SEO plugins add Organization, Article and breadcrumbs; WooCommerce and many themes add Product markup. Check what's output and fill in the gaps.</li>
<li><strong>Shopify:</strong> most themes output Product markup; check that reviews and prices are included correctly.</li>
<li><strong>Custom sites:</strong> generate JSON-LD from your data in the page templates, so it's always current. See our <a href="/blog/nextjs-seo-checklist/">Next.js SEO checklist</a> for an example.</li>
</ul>
<h2>How to test it</h2>
<ol>
<li>Run key pages through Google's Rich Results Test to see which rich results they're eligible for and any errors.</li>
<li>Use the Schema Markup Validator for general schema.org checks.</li>
<li>Watch the Enhancements reports in Search Console for errors across the site.</li>
<li>Re-test after theme changes, plugin updates or redesigns, which often break markup silently.</li>
</ol>
<h2>A sensible order</h2>
<ol>
<li>Organization or LocalBusiness on the homepage, with consistent name, address and phone.</li>
<li>BreadcrumbList across the site.</li>
<li>Product on product pages, or Service on service pages.</li>
<li>Article on blog posts, with author information.</li>
</ol>
<h2>Schema questions</h2>
<p><strong>Will schema get me to the top of Google?</strong> No. It helps search engines understand your pages and can improve how listings look. Rankings come from content, relevance and authority.</p>
<p><strong>Can schema hurt my site?</strong> Only if it's misleading, such as fake reviews or content not on the page, which can lead to manual actions.</p>
<p><strong>How do I see what my site has now?</strong> Our <a href="/free-seo-checker/">free SEO checker</a> lists the structured data types found on any page.</p>`,
  conclution: `<p>Start with Organization or LocalBusiness on the homepage, breadcrumbs across the site, and Product, Service or Article where they fit. Keep it matched to what visitors can see, and re-test after every redesign.</p>
<p>You can check what any page has today with our <a href="/free-seo-checker/">free SEO checker</a>.</p>`,
}
