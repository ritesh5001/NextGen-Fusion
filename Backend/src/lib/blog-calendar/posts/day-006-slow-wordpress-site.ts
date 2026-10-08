import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 6,
  title: "Why is my WordPress site so slow? A step-by-step speed fix guide",
  slug: "slow-wordpress-site",
  excerpt: "Why is your WordPress site slow? Measure first, then fix hosting, caching, images, plugins and the theme in the order that makes the biggest difference.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "wordpress site slow",
  cover_image: "/projects/deetoo/screenshot-1.png",
  introduction: `<p>A slow WordPress site is almost always slow for one of five reasons: hosting that takes too long to respond, no page caching, oversized images, too many plugins, or a heavy theme or page builder. Most sites have two or three of these at once. Fixing them in the right order, starting with whatever the measurements point to, usually makes a bigger difference than any single "speed plugin".</p>
<p>This guide is for brochure sites, blogs and service businesses on WordPress. If you run a WooCommerce store, the same ideas apply, but caching works differently around the cart and checkout; our <a href="/blog/woocommerce-speed-optimisation/">WooCommerce speed guide</a> covers that.</p>`,
  content: `<h2>Step 1: Measure before you touch anything</h2>
<p>Run your homepage and one or two inner pages through <a href="https://pagespeed.web.dev/" rel="noopener">PageSpeed Insights</a>. Look at the mobile results first, because that's what Google ranks on and what most visitors use. Write down three numbers for each page: the performance score, Largest Contentful Paint (how long the main content takes to appear) and Time to First Byte, which is in the diagnostics.</p>
<p>Those numbers tell you where to start:</p>
<ul>
<li><strong>Time to First Byte is high</strong> (the server takes a long time before sending anything): hosting and caching are your problem.</li>
<li><strong>The server is quick but the page appears slowly:</strong> images, fonts, scripts and the theme are the problem.</li>
<li><strong>Everything is slow:</strong> start with hosting and caching anyway, because nothing else helps much until the server is quick.</li>
</ul>
<p>Test while logged out, or in a private window. Logged-in admins skip the cache and see a slower site than visitors do.</p>
<h2>Step 2: Hosting</h2>
<p>Cheap shared hosting puts your site on a server with hundreds of others. When a neighbour gets busy, your site slows down, and there's nothing you can do about it from inside WordPress. Signs your host is the bottleneck: a slow first byte even on a simple page, the admin area feeling sluggish, and speed that varies a lot by time of day.</p>
<p>Moving to better hosting is the single biggest improvement on many sites. Look for a current PHP version, server-level caching, and a data centre close to your visitors. Your host's own support can often tell you whether you've outgrown your plan.</p>
<h2>Step 3: Page caching</h2>
<p>Without caching, WordPress rebuilds every page from the database for every visitor. A cache stores the finished page and serves that copy instead. Many hosts offer caching at the server level; otherwise a plugin such as WP Super Cache, W3 Total Cache or WP Rocket does the job. Use one caching solution, not three. Layered caching plugins conflict with each other and cause odd bugs.</p>
<p>After switching it on, clear the cache, load the site in a private window a couple of times, and measure again. On a site that had no caching before, the first-byte time often drops dramatically.</p>
<h2>Step 4: Images</h2>
<p>Images are the heaviest thing on most pages. Common problems:</p>
<ul>
<li><strong>Photos uploaded straight from a camera or phone,</strong> several megabytes each, then displayed small.</li>
<li><strong>Old formats.</strong> WebP and AVIF are much smaller than JPEG or PNG at the same quality, and current WordPress versions support them.</li>
<li><strong>Everything loading at once.</strong> Images further down the page should load lazily, when the visitor scrolls near them. WordPress does this by default for most images, but page builders and sliders sometimes override it.</li>
<li><strong>The hero image lazy-loading.</strong> The opposite mistake: the big image at the top should load immediately, because it's usually the Largest Contentful Paint.</li>
</ul>
<p>An image optimisation plugin can compress and convert your existing library. For new uploads, resize photos to the largest size they'll actually be shown at before uploading.</p>
<h2>Step 5: Plugins</h2>
<p>The number of plugins matters less than what they do. One badly written plugin can slow a site more than twenty light ones. Go to the Plugins page and, for each one, ask: is it still used, and does it load something on every page? Sliders, social feeds, chat widgets, popup builders and "all-in-one" toolkits are common culprits because they add scripts and styles everywhere, even on pages that don't use them.</p>
<p>Deactivate one suspect at a time on a staging copy, measure, and keep notes. We'll come back to deciding which plugins to keep, replace or delete in a later post.</p>
<h2>Step 6: The theme and page builder</h2>
<p>Multipurpose themes that promise "hundreds of demos" ship code for every one of those demos. Page builders add their own layers of markup, styles and scripts. Neither is wrong, but both make it harder to get a fast site. If the measurements still point to heavy scripts and styles after the steps above, the theme is likely the limit. A lighter theme, or a rebuild of key templates, is sometimes the only way to get further.</p>
<h2>Step 7: Fonts and third-party scripts</h2>
<p>Each web font, analytics tag, chat widget, embedded video and tracking pixel is another request, often to another company's server. Use two font families at most, load only the weights you use, and audit your tags. Embedded YouTube videos are much lighter if you show a thumbnail that loads the player only when clicked.</p>
<h2>Step 8: Database clean-up</h2>
<p>Older sites collect thousands of post revisions, spam comments, expired transients and leftover tables from deleted plugins. Cleaning these up rarely transforms speed on its own, but on large, old sites it helps the admin area and the uncached pages. Take a full backup first.</p>
<h2>What to expect</h2>
<p>On a typical small business site with poor hosting and no caching, fixing those two often brings the biggest jump. Images come next. Plugin and theme work gives smaller, steadier gains. Measure after each change so you know what actually helped. If you want to understand why different speed tools give you different scores, we compared them in <a href="/blog/website-speed-test-tools-compared/">website speed test tools compared</a>.</p>
<h2>Common WordPress speed questions</h2>
<p><strong>Will a speed plugin fix everything?</strong> No. Caching and optimisation plugins help, but they can't fix slow hosting, enormous images or a heavy theme. They also break things if misconfigured, so change one setting at a time.</p>
<p><strong>Is WordPress just slow?</strong> No. A well-built WordPress site on good hosting can be very fast. Slow WordPress sites are usually slow because of what's been added to them over the years.</p>
<p><strong>Should I use a CDN?</strong> If your visitors are spread across countries, yes. A CDN serves files from servers near each visitor. For a local business with local customers, good hosting nearby matters more.</p>`,
  conclution: `<p>Hosting and caching first, images second, plugins and theme third. Measure after every change, or you'll never know which one actually helped.</p>
<p>If you'd rather not do it yourself, speed work is part of what our <a href="/services/website-maintenance-services/">maintenance plans</a> cover. Send us your address on WhatsApp (+91 73482 28167) and we'll tell you what's slowing it down.</p>`,
}
