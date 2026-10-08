import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 97,
  title: "Why your link previews look broken on WhatsApp and LinkedIn: fixing Open Graph tags",
  slug: "fix-social-share-previews",
  excerpt: "Why your link previews look broken on WhatsApp and LinkedIn, and how to fix Open Graph tags, image sizes and cached previews so shared links look right.",
  category: "Website Maintenance",
  primaryKeyword: "link preview not showing",
  cover_image: "/projects/sidcobharat/screenshot-1.png",
  introduction: `<p>Link previews on WhatsApp, LinkedIn, Facebook and X come from Open Graph tags in your page's HTML: a title, description and image the platforms read when someone shares the link. Previews look broken when those tags are missing, the image is the wrong size or format or can't be fetched, the tags are added by JavaScript after the page loads, or the platform has cached an old version. Fixing the tags and refreshing the platform's cache solves almost every case.</p>
<p>It's a small detail, but a blank preview in a WhatsApp group makes good content look neglected.</p>`,
  content: `<h2>The tags that matter</h2>
<p>The <a href="https://ogp.me/" rel="noopener">Open Graph protocol</a> defines tags such as:</p>
<ul>
<li><code>og:title</code>: the headline shown in the preview.</li>
<li><code>og:description</code>: a sentence or two of description.</li>
<li><code>og:image</code>: the preview image, as a full absolute URL.</li>
<li><code>og:url</code>: the canonical URL of the page.</li>
<li><code>og:type</code>: usually "website" or "article".</li>
</ul>
<p>X also reads its own <code>twitter:card</code> tags, falling back to Open Graph for many fields. Use <code>twitter:card</code> set to <code>summary_large_image</code> for a large image preview.</p>
<h2>Common problems and fixes</h2>
<h3>No image, or a random image</h3>
<p>If <code>og:image</code> is missing, platforms guess, often picking a logo or icon. Add an explicit image to every page, or at least a good default.</p>
<h3>Image the wrong size or shape</h3>
<p>A widely used size is 1200×630 pixels (about 1.91:1). Keep important text and faces away from the edges, since some platforms crop to a square. Use JPEG or PNG, keep the file reasonably small, and avoid very large files that platforms may skip.</p>
<h3>Image can't be fetched</h3>
<p>The image URL must be absolute (starting with https://), publicly accessible, not blocked by robots rules or a firewall, and not behind a login. Images on URLs that redirect can fail on some platforms.</p>
<h3>Tags added by JavaScript</h3>
<p>Platforms' preview bots usually don't run JavaScript. If your site adds meta tags in the browser, as some single-page apps do, previews come out blank. Render the tags on the server. Frameworks like Next.js do this with their metadata features; see our <a href="/blog/nextjs-seo-checklist/">Next.js SEO checklist</a>.</p>
<h3>Wrong title or description</h3>
<p>Without <code>og:title</code> and <code>og:description</code>, platforms use the page title and meta description, or pull random text. Set them per page, written for sharing.</p>
<h3>Old preview still showing</h3>
<p>Platforms cache previews. After fixing tags:</p>
<ul>
<li><strong>Facebook:</strong> use the <a href="https://developers.facebook.com/tools/debug/" rel="noopener">Sharing Debugger</a> and click "Scrape again".</li>
<li><strong>LinkedIn:</strong> use the <a href="https://www.linkedin.com/post-inspector/" rel="noopener">Post Inspector</a> to refresh.</li>
<li><strong>WhatsApp:</strong> caches previews for a while; testing with a slightly different URL, such as an added query parameter, shows the updated preview.</li>
</ul>
<h2>Platform-specific tips</h2>
<ul>
<li><strong>WhatsApp</strong> previews are strongly affected by image size and fetchability; keep images moderate in size and the URL fast to load.</li>
<li><strong>LinkedIn</strong> uses Open Graph and shows a large image when it can fetch one at a good size.</li>
<li><strong>X</strong> needs <code>twitter:card</code> for the large image layout.</li>
</ul>
<h2>Fixing it across the site</h2>
<ul>
<li><strong>WordPress:</strong> SEO plugins add Open Graph tags; set a default image and per-page images for important pages.</li>
<li><strong>Shopify:</strong> themes output Open Graph tags; set the social sharing image in theme settings and product images per product.</li>
<li><strong>Custom sites:</strong> generate tags per page from your data, and consider generated share images that include the page title, as this site does.</li>
</ul>
<p>Our <a href="/free-seo-checker/">free SEO checker</a> flags missing <code>og:title</code> and <code>og:image</code> on any page.</p>
<h2>Why it matters</h2>
<p>A clear title and a strong image make shared links get noticed and clicked, in WhatsApp groups, LinkedIn feeds and messages. A blank or broken preview makes even good content look neglected. It's also part of looking trustworthy; see <a href="/blog/website-trust-signals/">website trust signals</a>.</p>
<h2>Link preview questions</h2>
<p><strong>Why does the preview work on one platform but not another?</strong> Each platform reads tags slightly differently, caches differently and has its own image rules. Test each with its own tool.</p>
<p><strong>Can each blog post have its own image?</strong> Yes, and it should. Set a specific image per post, or generate one automatically.</p>
<p><strong>Do Open Graph tags help SEO?</strong> Not directly for rankings, but they improve how your links perform when shared, which brings visits and attention.</p>`,
  conclution: `<p>Fix the tags, then refresh each platform's cache with its own tool, or the old preview will keep appearing for a while.</p>
<p>You can check any page's Open Graph tags with our <a href="/free-seo-checker/">free SEO checker</a>.</p>`,
}
