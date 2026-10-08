import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 78,
  title: "Core Web Vitals in plain English: what LCP, INP and CLS mean and how to pass them",
  slug: "core-web-vitals-explained",
  excerpt: "Core Web Vitals in plain English: what LCP, INP and CLS measure, the thresholds to pass, how Google collects the data, and the usual fixes for each one.",
  category: "SEO",
  primaryKeyword: "core web vitals explained",
  cover_image: "/projects/maribiz-ai/screenshot-1.png",
  introduction: `<p>Core Web Vitals are three measurements Google uses to judge a page's user experience: Largest Contentful Paint (LCP) measures how quickly the main content appears, Interaction to Next Paint (INP) measures how quickly the page responds to taps and clicks, and Cumulative Layout Shift (CLS) measures how much the layout jumps around. Google's targets for a good experience are LCP within 2.5 seconds, INP within 200 milliseconds and CLS below 0.1, measured from real visitors' devices.</p>
<p>You don't need to be a developer to understand them, and you don't need perfect scores to pass.</p>`,
  content: `<h2>The three metrics</h2>
<table>
<thead><tr><th>Metric</th><th>Measures</th><th>Good</th><th>Poor</th></tr></thead>
<tbody>
<tr><td>LCP</td><td>Loading: when the largest image or text block appears</td><td>2.5 s or less</td><td>Over 4 s</td></tr>
<tr><td>INP</td><td>Responsiveness: delay between an interaction and the screen updating</td><td>200 ms or less</td><td>Over 500 ms</td></tr>
<tr><td>CLS</td><td>Visual stability: how much content shifts unexpectedly</td><td>0.1 or less</td><td>Over 0.25</td></tr>
</tbody>
</table>
<p>Google assesses each at the 75th percentile of real visits, so most visitors, not just those on fast phones, need a good experience. Google's <a href="https://web.dev/articles/vitals" rel="noopener">Web Vitals overview</a> has the details.</p>
<h2>Field data vs lab data</h2>
<ul>
<li><strong>Field data</strong> comes from real Chrome users and is what Google uses for search. You see it in PageSpeed Insights (when your page has enough traffic) and Search Console's Core Web Vitals report.</li>
<li><strong>Lab data</strong> comes from a simulated test, such as Lighthouse. It's useful for diagnosing problems, but it's one device on one connection.</li>
</ul>
<p>A page can score well in the lab and fail in the field, or the reverse. Fix for field data. Our comparison of <a href="/blog/website-speed-test-tools-compared/">speed test tools</a> explains the differences.</p>
<h2>LCP: loading</h2>
<p>The largest element is usually the hero image or main heading. Common causes of slow LCP:</p>
<ul>
<li>Slow server response.</li>
<li>A large, unoptimised hero image, or one that's lazy-loaded.</li>
<li>Render-blocking CSS and JavaScript.</li>
<li>Web fonts delaying text.</li>
</ul>
<p>Fixes are covered in <a href="/blog/website-load-under-2-seconds/">how to make your website load in under 2 seconds</a>.</p>
<h2>INP: responsiveness</h2>
<p>INP replaced First Input Delay in 2024. It looks at interactions throughout the visit, such as opening a menu, adding to cart or filtering, and measures how long until the screen visibly responds. Google's <a href="https://web.dev/articles/inp" rel="noopener">INP guide</a> explains it in depth. Common causes of poor INP:</p>
<ul>
<li>Heavy JavaScript running on the main thread, so the browser is busy when the user taps.</li>
<li>Third-party scripts: chat widgets, tag managers, ad and tracking scripts.</li>
<li>Large, complex pages where each update takes a long time to render.</li>
<li>Expensive work triggered by clicks, done all at once.</li>
</ul>
<p>Fixes: reduce and split JavaScript, defer or remove third-party scripts, break long tasks into smaller pieces, and show immediate visual feedback before doing heavy work.</p>
<h2>CLS: visual stability</h2>
<p>Layout shift happens when content moves after it first appears, such as text pushed down by a late-loading image, banner or ad. Google's <a href="https://web.dev/articles/cls" rel="noopener">CLS guide</a> covers the causes. Common fixes:</p>
<ul>
<li>Set width and height (or aspect ratio) on images and videos.</li>
<li>Reserve space for ads, embeds and banners.</li>
<li>Avoid inserting content above existing content, except in response to a user action.</li>
<li>Load fonts in a way that minimises text reflow.</li>
</ul>
<h2>How to check your site</h2>
<ol>
<li>Open Search Console's Core Web Vitals report to see which groups of URLs pass or fail on mobile and desktop.</li>
<li>Run representative pages through PageSpeed Insights to see field data and lab diagnostics.</li>
<li>Fix the most common failing template first (for example all product pages), since fixes apply to the whole group.</li>
<li>After deploying fixes, wait for field data to update; it reflects the last 28 days.</li>
</ol>
<h2>How much do they matter for rankings?</h2>
<p>Core Web Vitals are part of Google's page experience signals. They matter, but relevance and content quality matter more: a slow page with the best answer can outrank a fast page with a weak one. The bigger benefit is usually business: faster, more stable pages keep more visitors and convert better.</p>
<h2>Core Web Vitals questions</h2>
<h3>Why does Search Console show "not enough data"?</h3>
<p>Field data needs a minimum amount of Chrome traffic. Low-traffic pages may have none; rely on lab tests for those.</p>
<h3>Do I need to pass on desktop and mobile?</h3>
<p>They're assessed separately. Mobile is usually harder and matters more.</p>
<h3>How long until fixes show up?</h3>
<p>Field data uses a rolling 28-day window, so expect a few weeks before results fully reflect your changes.</p>`,
  conclution: `<p>Fix the template that fails for the most URLs first, then wait. Field data covers a rolling 28 days, so give any change a few weeks before you judge it.</p>
<p>Our <a href="/services/seo-services/">SEO team</a> can work through your report with you.</p>`,
}
