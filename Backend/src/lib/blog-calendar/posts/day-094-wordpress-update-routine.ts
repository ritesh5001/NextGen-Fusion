import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 94,
  title: "Should you auto-update WordPress plugins? A safe update routine for business sites",
  slug: "wordpress-update-routine",
  excerpt: "Should you auto-update WordPress plugins? A safe update routine for business sites: what to automate, what to test first, and how to roll back.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "update wordpress plugins safely",
  cover_image: "/projects/deetoo/screenshot-1.png",
  introduction: `<p>For most business sites, the safest approach is a mix: let WordPress apply minor core security releases automatically (it does by default), auto-update low-risk, well-maintained plugins, and update critical plugins, such as WooCommerce, payment gateways, page builders and anything custom, on a schedule after testing on a staging copy, with a fresh backup and a way to roll back. Never updating is the riskiest choice of all, because outdated plugins are the most common way WordPress sites get hacked.</p>`,
  content: `<h2>Why updates matter</h2>
<p>Updates fix security holes, bugs and compatibility issues. Once a vulnerability is published, automated attacks look for sites that haven't updated. At the same time, updates occasionally break things, especially on sites with many plugins or custom code. The routine balances those two risks.</p>
<h2>What WordPress does automatically</h2>
<ul>
<li><strong>Minor core releases</strong> (security and maintenance) update automatically by default.</li>
<li><strong>Major core releases,</strong> plugins and themes can be set to auto-update individually from the dashboard.</li>
</ul>
<h2>Sort your plugins by risk</h2>
<table>
<thead><tr><th>Risk</th><th>Examples</th><th>Approach</th></tr></thead>
<tbody>
<tr><td>Low</td><td>Small utility plugins, well maintained, not touching checkout or layout</td><td>Auto-update</td></tr>
<tr><td>Medium</td><td>SEO plugins, forms, caching, security plugins</td><td>Update weekly or fortnightly, check key pages after</td></tr>
<tr><td>High</td><td>WooCommerce and extensions, payment gateways, page builders, membership plugins, custom code</td><td>Test on staging first, then update live with a backup</td></tr>
</tbody>
</table>
<h2>A safe routine</h2>
<h3>Weekly</h3>
<ul>
<li>Check for security updates and apply them quickly.</li>
<li>Let low-risk auto-updates run; glance at the site afterwards.</li>
</ul>
<h3>Monthly (or fortnightly for stores)</h3>
<ol>
<li><strong>Take a full backup</strong> of files and database.</li>
<li><strong>Update on staging first:</strong> core, themes and high-risk plugins.</li>
<li><strong>Test the important paths:</strong> homepage, key templates, forms, search, cart and checkout with a test order, account pages.</li>
<li><strong>Update live</strong> at a quiet time.</li>
<li><strong>Test again</strong> on live, and clear caches.</li>
<li><strong>Note what was updated</strong> in a simple log.</li>
</ol>
<h3>When something breaks</h3>
<ul>
<li>Roll back the specific plugin to its previous version, or restore the backup.</li>
<li>Check the plugin's changelog and support forum; others may have reported it.</li>
<li>Retry after the plugin author releases a fix.</li>
</ul>
<p>If the site shows a critical error, see <a href="/blog/wordpress-critical-error/">WordPress critical error</a>.</p>
<h2>Reduce the risk over time</h2>
<ul>
<li>Fewer plugins means fewer updates and conflicts; see <a href="/blog/too-many-wordpress-plugins/">too many WordPress plugins</a>.</li>
<li>Replace abandoned plugins rather than keeping them for years without updates.</li>
<li>Keep PHP on a supported version, upgraded deliberately after testing.</li>
<li>Avoid editing plugin or theme files directly; use child themes and custom plugins so updates don't overwrite changes.</li>
<li>Keep backups off-server; see <a href="/blog/website-backup-strategy/">website backup strategy</a>.</li>
</ul>
<h2>What to check after every update round</h2>
<ul>
<li>The homepage and two or three key templates load and look right on a phone.</li>
<li>Every form sends and the email arrives.</li>
<li>For stores: add to cart, apply a coupon, complete a test order with your main payment method.</li>
<li>Logins work for customers or members.</li>
<li>No new errors in the site health screen or error logs.</li>
<li>Caches are cleared, so visitors see the updated site.</li>
</ul>
<p>Ten minutes of checking catches most problems before customers do.</p>
<h2>Keep a simple update log</h2>
<p>Note the date, what was updated, from which version to which, and anything that broke. When a problem appears days later, the log tells you where to look first, and it shows clearly whether maintenance is actually happening.</p>
<h2>Do you need staging?</h2>
<p>For a small brochure site, a backup and careful testing after updates may be enough. For stores, membership sites and anything with custom code, a staging copy is essential. Many hosts offer one-click staging.</p>
<h2>Update questions</h2>
<h3>Is it safe to turn on auto-updates for everything?</h3>
<p>For a simple site with few, reputable plugins, it's often fine with good backups. For stores and complex sites, test critical updates first.</p>
<h3>How quickly should security updates be applied?</h3>
<p>As soon as reasonably possible, especially for vulnerabilities being actively exploited.</p>
<h3>What about premium plugins?</h3>
<p>Keep their licences active so you receive updates; expired licences mean missed security fixes.</p>`,
  conclution: `<p>The riskiest update routine is the one where nothing gets updated for months. Automate the low-risk updates, test the important ones on staging, and keep a simple log.</p>
<p>Our <a href="/services/website-maintenance-services/">maintenance team</a> does this every month for the sites we look after.</p>`,
}
