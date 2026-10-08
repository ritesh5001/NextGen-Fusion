import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 34,
  title: "Pages 'Crawled – currently not indexed' in Search Console: what it means and how to fix it",
  slug: "crawled-currently-not-indexed",
  excerpt: "\"Crawled – currently not indexed\" in Search Console: what it means, how it differs from \"Discovered\", and how to fix pages Google chose not to keep.",
  category: "SEO",
  primaryKeyword: "crawled currently not indexed fix",
  cover_image: "/projects/cleanship/screenshot-1.png",
  introduction: `<p>"Crawled – currently not indexed" means Google visited the page, read it, and decided not to add it to the index for now. Nothing technical blocked it. Google simply didn't think the page was worth showing yet, usually because it's thin, very similar to other pages, low on internal links, or on a site Google doesn't fully trust yet. The fix is to make each affected page clearly useful and distinct, link to it properly, and remove or merge the pages that don't deserve to be indexed.</p>
<p>Here's how to diagnose it, how it differs from the "Discovered" status, and what we do about it.</p>`,
  content: `<h2>Crawled vs Discovered: what's the difference?</h2>
<p>Both appear in the <a href="https://support.google.com/webmasters/answer/7440203" rel="noopener">Page indexing report</a> in Search Console, and they mean different things:</p>
<ul>
<li><strong>Discovered – currently not indexed:</strong> Google knows the URL exists but hasn't visited it yet. Usually a crawl budget or priority issue: too many URLs, too few signals that they matter, or a server that seems slow.</li>
<li><strong>Crawled – currently not indexed:</strong> Google has visited and decided against indexing. Usually a quality or duplication issue.</li>
</ul>
<p>We've seen the "Discovered" version on our own site: after publishing a large set of location pages, Search Console listed hundreds of URLs as discovered but not indexed. The fix there was to reduce the number of near-identical pages we asked Google to crawl, and strengthen the important ones.</p>
<h2>Step 1: Look at which pages are affected</h2>
<p>Open the report and look at the example URLs. Group them:</p>
<ul>
<li><strong>Pages you don't need indexed:</strong> tag archives, filtered views, internal search results, paginated pages, thank-you pages, old test pages. These are fine to leave out; consider noindexing or removing them so they stop using Google's attention.</li>
<li><strong>Thin pages:</strong> short product or service pages with little unique content.</li>
<li><strong>Near-duplicates:</strong> pages that differ only by a city name, a colour or a small detail.</li>
<li><strong>Genuinely good pages:</strong> useful, unique content that Google hasn't picked up yet, often new or poorly linked.</li>
</ul>
<h2>Step 2: Check the page with URL Inspection</h2>
<p>Inspect an affected URL. Confirm the page returns status 200, isn't blocked, has the canonical you expect, and that the rendered HTML contains the real content. If Google chose a different canonical, it considers your page a duplicate of that one, which is a different fix: consolidate the two pages or make them clearly distinct.</p>
<h2>Step 3: Improve the pages that should be indexed</h2>
<ul>
<li><strong>Add real substance:</strong> answer the questions a visitor to that page actually has, with specifics, examples and detail other pages don't have.</li>
<li><strong>Make each page distinct.</strong> If ten pages say nearly the same thing, merge them into one strong page, or give each one content that only applies to it.</li>
<li><strong>Link to them internally</strong> from relevant, well-visited pages, with descriptive link text. Pages buried deep with few internal links look unimportant.</li>
<li><strong>Include them in your sitemap,</strong> and keep the sitemap free of URLs you don't want indexed.</li>
</ul>
<h2>Step 4: Reduce the noise</h2>
<p>A site that asks Google to crawl thousands of low-value URLs dilutes attention from its best pages. Remove or noindex pages that will never be useful in search, consolidate duplicates with redirects, and stop generating parameter or filter URLs that create endless variations.</p>
<h2>Step 5: Build site-wide trust</h2>
<p>On newer sites, Google is more selective about what it indexes. Links from other reputable sites, mentions of your business and consistent publishing of useful content all help Google decide your pages are worth keeping. This is slow work, measured in months.</p>
<h2>Step 6: Request indexing, then wait</h2>
<p>After improving a page, use URL Inspection and request indexing. Don't do it for hundreds of pages at once; prioritise the ones that matter most. Then give it a few weeks. You can also click <strong>Validate fix</strong> in the report, but validation only tracks; it doesn't force anything.</p>
<h2>When to stop worrying</h2>
<p>Every site has some pages in this status. If they're low-value pages, it's Google doing you a favour. Focus on whether your important pages (services, products, key articles) are indexed and getting impressions. If they are, the rest can wait.</p>
<h2>What people ask about this status</h2>
<h3>Is "Crawled – currently not indexed" a penalty?</h3>
<p>No. It's a decision about individual pages, not a punishment for the site.</p>
<h3>Will the pages get indexed on their own?</h3>
<p>Sometimes, especially new pages on sites Google trusts. Thin or duplicate pages usually stay out until they change.</p>
<h3>Should I delete pages that aren't indexed?</h3>
<p>Only if they serve no visitors either. Otherwise improve them, merge them, or keep them out of the index deliberately. For broader indexing problems, start with <a href="/blog/website-not-showing-on-google/">why your website isn't showing on Google</a>.</p>`,
  conclution: `<p>Don't chase every URL in the report. Make sure your important pages are indexed, make the thin ones substantial or remove them, and give it time.</p>
<p>If you'd like help working through your own report, our <a href="/services/seo-services/">SEO team</a> starts exactly there.</p>`,
}
