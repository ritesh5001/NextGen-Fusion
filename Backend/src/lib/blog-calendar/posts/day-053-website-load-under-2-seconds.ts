import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 53,
  title: "How to make your website load in under 2 seconds",
  slug: "website-load-under-2-seconds",
  excerpt: "How to make your website load in under 2 seconds: what \"load\" really means, the metrics that matter, and the fixes that make the biggest difference on phones.",
  category: "Website Maintenance",
  primaryKeyword: "make website load faster",
  cover_image: "/projects/ladyscootytrainer/screenshot-1.png",
  introduction: `<p>To get a website feeling loaded in under two seconds on a phone, the main content has to appear quickly (Largest Contentful Paint), which depends on a fast server response, a small, well-prioritised hero image, minimal render-blocking code and few third-party scripts. "Load time" as a single number is less useful than these specific measurements, and the fixes follow directly from which one is slow.</p>`,
  content: `<h2>What "load" actually means</h2>
<p>A page doesn't load in one moment. What visitors feel is:</p>
<ul>
<li><strong>Time to First Byte (TTFB):</strong> how long until the server starts sending the page.</li>
<li><strong>First Contentful Paint:</strong> when anything first appears.</li>
<li><strong>Largest Contentful Paint (LCP):</strong> when the main content, usually the hero image or headline, appears. Google's <a href="https://web.dev/articles/lcp" rel="noopener">guidance on LCP</a> treats 2.5 seconds or less as good.</li>
<li><strong>Interaction to Next Paint (INP):</strong> how quickly the page responds when someone taps or clicks.</li>
<li><strong>Cumulative Layout Shift (CLS):</strong> whether things jump around as the page loads.</li>
</ul>
<p>"Under two seconds" is a good target for LCP on a typical phone connection. We explain the Core Web Vitals properly in a later post.</p>
<h2>Measure first</h2>
<p>Run your key pages through <a href="https://pagespeed.web.dev/" rel="noopener">PageSpeed Insights</a>. Look at the mobile tab. If the page has enough traffic, the top section shows real-user data from Chrome users, which is what matters most. The lab data below helps diagnose causes. Our guide to <a href="/blog/website-speed-test-tools-compared/">speed test tools compared</a> explains why tools disagree.</p>
<h2>Fix 1: Make the server respond quickly</h2>
<p>Nothing else can start until the server responds. If TTFB is slow:</p>
<ul>
<li>Turn on page caching, so pages are served ready-made.</li>
<li>Use better hosting, close to your visitors, or a CDN.</li>
<li>Reduce slow database queries, often caused by heavy plugins.</li>
</ul>
<h2>Fix 2: Make the hero image small and early</h2>
<p>The LCP element is usually an image. To make it fast:</p>
<ul>
<li>Serve it in a modern format (WebP or AVIF), compressed.</li>
<li>Serve a size suited to phones, not a desktop-sized image scaled down.</li>
<li>Don't lazy-load it. Load it immediately, and consider marking it as high priority.</li>
<li>Avoid hero sliders and background videos, which delay the main content.</li>
</ul>
<h2>Fix 3: Remove render-blocking code</h2>
<p>CSS and JavaScript in the page head can stop the browser from showing anything until they've downloaded. Load only the CSS needed for the first screen early, defer non-essential JavaScript, and remove unused code from themes and plugins.</p>
<h2>Fix 4: Limit fonts</h2>
<p>Each font file is a download. Use one or two families, only the weights you use, modern formats, and font-display settings that show text immediately in a fallback font.</p>
<h2>Fix 5: Cut third-party scripts</h2>
<p>Chat widgets, analytics tags, ad pixels, heatmaps, embedded videos and social feeds each add requests and work for the browser. Audit them: remove what you don't use, load the rest after the main content, and replace embedded videos with a lightweight preview that loads the player on click.</p>
<h2>Fix 6: Lazy-load below-the-fold content</h2>
<p>Images, videos and iframes further down the page should load as the visitor scrolls, so they don't compete with the first screen.</p>
<h2>Fix 7: Reserve space to prevent layout shift</h2>
<p>Set width and height on images and embeds, and reserve space for banners and ads, so content doesn't jump as things load. Shifting layouts make a page feel slower and cause mis-taps.</p>
<h2>Platform-specific notes</h2>
<ul>
<li><strong>WordPress:</strong> hosting, caching and plugins matter most; see <a href="/blog/slow-wordpress-site/">why your WordPress site is slow</a>.</li>
<li><strong>Shopify:</strong> apps and theme weight; see <a href="/blog/shopify-speed-optimisation/">Shopify speed optimisation</a>.</li>
<li><strong>Custom sites:</strong> server-side rendering and static generation help a lot; frameworks such as Next.js do this well.</li>
</ul>
<h2>Keep it fast</h2>
<p>Speed decays as content, plugins and scripts are added. Check key pages monthly, set a performance budget (for example, a maximum page weight or LCP target), and test before adding new widgets.</p>
<h2>Speed questions</h2>
<p><strong>Is a 100 PageSpeed score necessary?</strong> No. Real-user metrics in the good range matter far more than a perfect lab score.</p>
<p><strong>Why is my site fast on Wi-Fi but slow on mobile data?</strong> Mobile connections have more latency and less bandwidth, and phones have slower processors. Always test on mobile.</p>
<p><strong>Will a faster site rank higher?</strong> Page experience is one of many signals; content relevance matters more. But faster sites keep more visitors, which helps everything else.</p>`,
  conclution: `<p>Fix the server first, then the hero image, then everything that blocks the first screen. Check real-user data on mobile, not just a lab score on your office Wi-Fi, and check it again next month, because speed slips as sites grow.</p>
<p>Speed work is part of our <a href="/services/website-maintenance-services/">maintenance plans</a>.</p>`,
}
