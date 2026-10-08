import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 63,
  title: "Why your web app slows down as users grow, and how to scale it",
  slug: "web-app-slow-scaling",
  excerpt: "Why your web app slows down as users grow, and how to scale it: database queries, caching, background jobs, front-end weight and infrastructure, in that order.",
  category: "Custom Software",
  primaryKeyword: "web app slow scaling",
  cover_image: "/projects/tatvivahtrends/screenshot-1.png",
  introduction: `<p>Most web apps that slow down as users grow are held back by the database first: queries without the right indexes, too many queries per page, and reports run against live tables. After that come missing caching, slow work done during requests instead of in the background, heavy front-end code, and finally infrastructure. Throwing bigger servers at the problem helps briefly; finding and fixing the slow parts lasts.</p>`,
  content: `<h2>Step 1: Measure where the time goes</h2>
<p>Guessing wastes weeks. Add monitoring before changing anything:</p>
<ul>
<li><strong>Application performance monitoring (APM)</strong> shows which requests are slow and where the time is spent: database, external APIs, application code.</li>
<li><strong>Database slow query logs</strong> list the queries taking longest.</li>
<li><strong>Front-end metrics</strong> from real users show whether the browser side is slow too.</li>
<li><strong>Error and timeout rates</strong> show where users are actually affected.</li>
</ul>
<h2>Step 2: Fix the database</h2>
<h3>Missing indexes</h3>
<p>A query that filters or sorts by a column without an index scans the whole table. Fine with a thousand rows, painful with a million. Adding the right indexes is often the single biggest win.</p>
<h3>The N+1 problem</h3>
<p>Loading a list of 50 items and then running a separate query for each one's related data means 51 queries instead of one or two. ORMs make this easy to do by accident. Load related data in one go.</p>
<h3>Fetching too much</h3>
<p>Selecting every column, or every row, when the page shows 20 items. Paginate, and select only what's needed.</p>
<h3>Reports on live tables</h3>
<p>Heavy analytics queries competing with everyday use. Move reporting to a read replica, summary tables or a separate analytics store.</p>
<h2>Step 3: Add caching</h2>
<ul>
<li>Cache results that are expensive to compute and change rarely: settings, catalogues, dashboard totals.</li>
<li>Cache whole pages or API responses where data isn't user-specific.</li>
<li>Use a CDN for static files and public pages.</li>
<li>Plan how caches are cleared when data changes, or users will see stale information.</li>
</ul>
<h2>Step 4: Move slow work to the background</h2>
<p>Sending emails, generating PDFs, resizing images, calling slow third-party APIs and processing imports shouldn't happen while the user waits. Put them in a queue processed by background workers, and tell the user when the work is done.</p>
<h2>Step 5: Slim the front end</h2>
<p>As apps grow, so does their JavaScript. Large bundles make every page slower to load and respond, especially on phones. Split code by route, remove unused libraries, render on the server where possible, and avoid loading huge data sets into the browser at once.</p>
<h2>Step 6: Check external dependencies</h2>
<p>Slow payment, email, AI or mapping APIs can make your app look slow. Set timeouts, retry sensibly, cache responses where allowed, and avoid calling external services in the middle of page loads.</p>
<h2>Step 7: Then scale the infrastructure</h2>
<p>Once the code is efficient:</p>
<ul>
<li>Scale the application horizontally (more instances behind a load balancer), which works best when the app keeps no session state on individual servers.</li>
<li>Give the database enough memory and use read replicas for heavy read traffic.</li>
<li>Use connection pooling so many app instances don't overwhelm the database.</li>
<li>Set up autoscaling for predictable peaks.</li>
</ul>
<h2>Watch for multi-tenant hotspots</h2>
<p>In SaaS products, one very large customer can slow everyone. Per-tenant rate limits, query limits and sometimes separate resources for the largest tenants help. See <a href="/blog/multi-tenant-saas-explained/">multi-tenant SaaS explained</a>.</p>
<h2>Prevent the next slowdown</h2>
<ul>
<li>Keep monitoring and alerts on response times and database load.</li>
<li>Review new queries for indexes before release.</li>
<li>Load-test before big launches or marketing pushes.</li>
<li>Keep the architecture simple until there's a measured reason to split it up; see <a href="/blog/choosing-a-startup-tech-stack/">choosing a startup tech stack</a>.</li>
</ul>
<h2>Scaling questions</h2>
<p><strong>Do we need to rewrite the app?</strong> Rarely. Most slow apps are fixed by database work, caching and background jobs. Rewrites are expensive and introduce new problems.</p>
<p><strong>Should we move to microservices?</strong> Not to fix slowness. Microservices solve team and deployment problems at scale; they usually add latency and complexity for smaller products.</p>
<p><strong>Why is it slow only at certain times?</strong> Peak load, scheduled jobs, backups or reports running at the same time. Monitoring by time of day reveals the pattern.</p>`,
  conclution: `<p>Before anyone suggests a rewrite or microservices, look at the slow query log. It's very often a missing index.</p>
<p>If your app is slowing down, our <a href="/services/software-development-services/">software team</a> can diagnose it.</p>`,
}
