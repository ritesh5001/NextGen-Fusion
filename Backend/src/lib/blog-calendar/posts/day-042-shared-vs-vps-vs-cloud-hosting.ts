import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 42,
  title: "Shared vs VPS vs cloud hosting, explained for business owners",
  slug: "shared-vs-vps-vs-cloud-hosting",
  excerpt: "Shared vs VPS vs cloud hosting, explained for business owners: what each means, how they compare on speed, cost, control and effort, and which fits your site.",
  category: "Website Maintenance",
  primaryKeyword: "shared vs vps hosting",
  cover_image: "/projects/hcbengineering/screenshot-1.png",
  introduction: `<p>Shared hosting puts your website on a server alongside many others: cheap and easy, but your site's speed depends on its neighbours. A VPS (virtual private server) gives you a guaranteed slice of a server with your own resources and more control, but someone has to manage it. Cloud hosting runs your site on large providers' infrastructure that can scale up and down, from fully managed platforms to raw servers you configure yourself. For most small business websites, good managed hosting matters more than the label.</p>
<p>The labels matter less than people think. What decides whether your site is fast and reliable is how the hosting is set up, so we'll cover that too.</p>`,
  content: `<h2>Shared hosting</h2>
<p>Your site shares a server's processor, memory and disk with many other sites. The host manages everything; you get a control panel to manage files, email and databases.</p>
<ul>
<li><strong>Good for:</strong> small brochure sites, new sites, low traffic.</li>
<li><strong>Pros:</strong> cheapest, no technical management, usually includes email and free SSL.</li>
<li><strong>Cons:</strong> performance varies with neighbours' traffic; limited resources; little control over server settings; one bad neighbour can affect security or email reputation.</li>
</ul>
<h2>VPS hosting</h2>
<p>A physical server is divided into virtual servers, each with dedicated resources. Your VPS behaves like your own server.</p>
<ul>
<li><strong>Good for:</strong> growing sites, online stores, several sites, custom software.</li>
<li><strong>Pros:</strong> predictable performance, full control over software and settings, scales to bigger plans.</li>
<li><strong>Cons:</strong> unmanaged VPS plans need someone to handle updates, security, backups and monitoring. Managed VPS plans include this, at a higher price.</li>
</ul>
<h2>Cloud hosting</h2>
<p>"Cloud" covers a wide range:</p>
<ul>
<li><strong>Infrastructure clouds</strong> such as AWS, Google Cloud and Azure, where you rent servers, databases and storage by usage. Very flexible and scalable, but complex to set up and manage well.</li>
<li><strong>Managed platforms</strong> built on those clouds, such as hosts specialising in WordPress, or platforms such as Vercel for Next.js sites. They handle servers, scaling and much of the security for you.</li>
<li><strong>Hosted website platforms</strong> such as Shopify, where hosting is part of the product.</li>
</ul>
<p>Cloud hosting is good for sites with variable or high traffic, applications that need to scale, and teams who want modern deployment workflows.</p>
<h2>Side by side</h2>
<table>
<thead><tr><th></th><th>Shared</th><th>VPS</th><th>Cloud (managed)</th></tr></thead>
<tbody>
<tr><td>Cost</td><td>Lowest</td><td>Moderate</td><td>Varies with usage and plan</td></tr>
<tr><td>Performance</td><td>Variable</td><td>Consistent</td><td>Consistent, can scale automatically</td></tr>
<tr><td>Control</td><td>Low</td><td>High</td><td>Medium to high</td></tr>
<tr><td>Technical effort</td><td>Low</td><td>High unless managed</td><td>Low to medium</td></tr>
<tr><td>Best for</td><td>Small sites</td><td>Growing sites and custom apps</td><td>Variable traffic, modern stacks, apps</td></tr>
</tbody>
</table>
<h2>What matters more than the type</h2>
<ul>
<li><strong>Server location:</strong> close to your visitors, or a CDN that serves them from nearby.</li>
<li><strong>Current software:</strong> supported PHP or Node.js versions, modern web server, HTTP/2 or HTTP/3.</li>
<li><strong>Caching:</strong> server-level page caching for WordPress makes a big difference.</li>
<li><strong>Backups:</strong> automatic, off-server, with easy restores.</li>
<li><strong>Support:</strong> people who answer quickly and know what they're doing.</li>
<li><strong>Staging:</strong> a copy of your site for testing changes.</li>
</ul>
<h2>Signs you've outgrown your hosting</h2>
<ul>
<li>A slow server response even on simple pages.</li>
<li>Speed that changes a lot by time of day.</li>
<li>The host warning about resource limits or suspending the site during busy periods.</li>
<li>A sluggish admin area.</li>
<li>Email from your domain landing in spam because of shared server reputation.</li>
</ul>
<p>Slow hosting is often the first thing to fix on a slow site; see <a href="/blog/slow-wordpress-site/">why your WordPress site is slow</a>.</p>
<h2>Moving hosts without downtime</h2>
<ol>
<li>Set up the new hosting and copy the site and database across.</li>
<li>Test the copy using a temporary address or by pointing your own computer at the new server.</li>
<li>Lower the DNS "time to live" a day before the move so the change spreads quickly.</li>
<li>Freeze changes on the old site, copy any last updates, then switch DNS.</li>
<li>Check SSL, forms, email and caching on the new host, and keep the old hosting for a week as a fallback.</li>
</ol>
<p>Email is the part people forget. If your email runs on the old host, plan its move separately, or move it to a dedicated email service first.</p>
<h2>How to choose</h2>
<ul>
<li><strong>Small business site, low traffic:</strong> quality shared or managed WordPress hosting.</li>
<li><strong>Online store or busy site:</strong> managed VPS or managed cloud hosting with caching that understands e-commerce.</li>
<li><strong>Custom web application:</strong> cloud or VPS, with a clear plan for who manages it.</li>
<li><strong>Next.js or modern JavaScript site:</strong> a platform built for it, or a properly configured server.</li>
</ul>
<h2>Hosting questions</h2>
<h3>Is cheap hosting really a problem?</h3>
<p>Not always, but a slow server holds back every other speed improvement, and slow sites lose visitors and rankings.</p>
<h3>Should my email be on the same hosting?</h3>
<p>It's often better on a dedicated email service. Website problems then don't take your email down too.</p>
<h3>Who should own the hosting account?</h3>
<p>Your business. Give your developer access, not ownership. See <a href="/blog/who-owns-your-website/">who should own your website</a>.</p>`,
  conclution: `<p>Whatever you choose, look for a nearby server, proper caching, off-server backups and support that actually answers. If you need help choosing or moving, see our <a href="/services/cloud-solutions/">cloud solutions</a>.</p>`,
}
