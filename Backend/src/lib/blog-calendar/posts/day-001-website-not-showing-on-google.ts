import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 1,
  title: "Why is my website not showing on Google? 10 checks before you panic",
  slug: "website-not-showing-on-google",
  excerpt: "Website not showing on Google? Work through these 10 checks in order, from a stray noindex tag to a site that is simply too new, before you spend money on SEO.",
  category: "SEO",
  primaryKeyword: "website not showing on google",
  cover_image: "/projects/cleanship/screenshot-1.png",
  introduction: `<p>If your website is not showing on Google, the cause is usually one of a short list: Google hasn't found the site yet, something on the site is telling Google to stay away, or Google has looked and decided the pages aren't worth showing for the searches you're trying. The first two are often fixed in an afternoon. The third takes longer, but you can't start on it until the first two are ruled out.</p>
<p>Below are the ten checks we run, in the order we run them, when a business owner tells us "we're not on Google". Do them in this order. Each one either finds the problem or takes it off the list.</p>`,
  content: `<h2>1. Search for your site the way Google sees it</h2>
<p>Type <code>site:yourdomain.com</code> into Google, with your real domain and no spaces. This shows the pages Google has in its index for that domain.</p>
<ul>
<li><strong>No results at all:</strong> Google hasn't indexed anything. Carry on with checks 2 to 6; the problem is almost certainly technical or the site is very new.</li>
<li><strong>Some results, but not the page you care about:</strong> skip to checks 5 to 8.</li>
<li><strong>Your pages are there, but you can't find them for your keywords:</strong> the site is indexed but not ranking. That's checks 8 to 10.</li>
</ul>
<p>The <code>site:</code> search is rough, not a precise count, but it tells you which of the three situations you're in, and that decides everything else.</p>
<h2>2. Is the site brand new?</h2>
<p>A site that went live last week may simply not have been crawled yet. Google finds new sites mostly through links from pages it already knows about, and a fresh domain with no links can sit unnoticed for days or weeks. That's normal, not a penalty. Checks 3 and 4 speed it up.</p>
<h2>3. Add the site to Google Search Console</h2>
<p>If you only do one thing from this list, do this. <a href="https://search.google.com/search-console/about" rel="noopener">Google Search Console</a> is free, and it's the only place Google tells you directly what it thinks of your site. Verify the domain (the DNS option covers every version of it: with and without www, http and https), then wait a day or two for data to appear.</p>
<p>Once it's set up, the <strong>Pages</strong> report lists every URL Google knows about and, for the ones it hasn't indexed, a reason. Most of the checks below are quicker in Search Console than anywhere else.</p>
<h2>4. Submit a sitemap</h2>
<p>A sitemap is a file, usually at <code>/sitemap.xml</code>, that lists the pages you want found. WordPress SEO plugins such as Yoast and Rank Math create one for you; Shopify generates one automatically; most modern frameworks can too. Open it in your browser to make sure it loads and lists real pages, then submit its address under <strong>Sitemaps</strong> in Search Console.</p>
<p>A sitemap doesn't force anything into the index. It's a list of suggestions. But for a new site with no links pointing to it, it's often how Google discovers the pages in the first place.</p>
<h2>5. Look for a noindex tag</h2>
<p>This is the most common cause of a site that has vanished completely, and it's usually an accident. A <code>noindex</code> instruction tells search engines not to show a page, and it often gets left behind from the development stage.</p>
<ul>
<li><strong>WordPress:</strong> go to Settings › Reading and make sure "Discourage search engines from indexing this site" is unticked. Developers tick it while building and forget to untick it at launch.</li>
<li><strong>Any site:</strong> view the page source and search for <code>noindex</code>. If you find <code>&lt;meta name="robots" content="noindex"&gt;</code> on a page you want ranked, that's your answer.</li>
<li><strong>Headers:</strong> a server can also send an <code>X-Robots-Tag: noindex</code> header, which you won't see in the page source. The URL Inspection tool in Search Console shows it.</li>
</ul>
<p>Our <a href="/free-seo-checker/">free SEO checker</a> looks for both the tag and the header, along with most of the other checks in this list, in about 20 seconds.</p>
<h2>6. Check robots.txt isn't blocking the site</h2>
<p>Open <code>yourdomain.com/robots.txt</code>. If you see this:</p>
<pre><code>User-agent: *
Disallow: /</code></pre>
<p>then every search engine has been asked not to crawl any page. Like the noindex tag, it's often a leftover from a staging site. Removing that <code>Disallow: /</code> line (or narrowing it to the folders you really want hidden) fixes it. Google's <a href="https://developers.google.com/search/docs/crawling-indexing/robots/intro" rel="noopener">robots.txt documentation</a> explains the rules if your file is more complicated.</p>
<h2>7. Inspect the exact page in Search Console</h2>
<p>Paste the full address of the page you care about into the URL Inspection bar at the top of Search Console. It tells you whether the page is indexed, when Google last crawled it, which canonical URL Google chose, and whether anything blocked it. If the page isn't indexed and nothing is blocking it, click <strong>Request indexing</strong>. It isn't instant, and it isn't a guarantee, but it puts the page in the queue.</p>
<p>Pay attention to the canonical. If Google says it chose a different URL as the canonical, it thinks your page is a duplicate of that one, and it will show that one instead.</p>
<h2>8. Make sure the page actually has content Google can read</h2>
<p>Some sites look fine in a browser but send almost nothing in the HTML itself, because the text is drawn in by JavaScript after the page loads. Google can render JavaScript, but it's slower and less reliable, and many AI search tools don't render it at all. Right-click, choose <strong>View page source</strong>, and search for a sentence from the page. If it isn't there, the content is invisible until scripts run.</p>
<p>The other version of this problem is a page that simply says very little: a heading, a stock photo and "contact us for more". Google has no reason to show a page like that for anything competitive.</p>
<h2>9. Are you searching for the right thing?</h2>
<p>A business often expects to appear for a broad phrase such as "web design" or "best restaurant", while its pages never use those words, or use them on one thin page out of fifty. Google ranks pages for what they're about. If you want to appear for "physiotherapy in Pune", you need a page that is clearly about physiotherapy in Pune.</p>
<p>Search Console's <strong>Performance</strong> report shows which searches you already appear for, and on which pages. That list is usually more useful than the keywords you hoped for, because it shows what Google already associates you with.</p>
<h2>10. Check for a manual action or security issue</h2>
<p>Rarely, a site disappears because Google has applied a manual action for spam, or because the site was hacked and flagged. Both appear in Search Console under <strong>Security &amp; Manual Actions</strong>. If either report shows an issue, fix that first; nothing else on this list will help until it's resolved.</p>
<h2>How long until the site shows up?</h2>
<p>After you fix a technical block, pages usually start appearing within days to a few weeks, depending on how often Google crawls the site. Ranking for competitive searches is a different, slower process: it depends on how useful your pages are compared with everyone else's, and on how many other websites link to yours.</p>
<h2>Things people usually ask next</h2>
<h3>My site shows for my business name but nothing else. Is that a problem?</h3>
<p>No, that's the normal starting point. It means the site is indexed. Showing up for service searches is a content and authority job, not a technical fix.</p>
<h3>Will paying for Google Ads help my site show in normal results?</h3>
<p>No. Ads and organic results are separate systems. Ads put you on the page immediately, but they don't change where your site ranks once you stop paying.</p>
<h3>Can I check all of this myself?</h3>
<p>Yes. Everything above uses free tools. If you'd rather hand it over, it's the first hour of any SEO audit we run.</p>`,
  conclution: `<p>Usually, the answer is in the first six checks. A stray noindex tag or a robots.txt rule left over from development has hidden more small business sites than any algorithm update.</p>
<p>If you've been through the list and still can't see what's wrong, send us the address and our <a href="/services/seo-services/">SEO team</a> will take a look.</p>`,
}
