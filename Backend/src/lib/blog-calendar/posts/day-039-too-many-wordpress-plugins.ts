import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 39,
  title: "Too many WordPress plugins? Which ones to keep, replace or delete",
  slug: "too-many-wordpress-plugins",
  excerpt: "Too many WordPress plugins? How to decide which to keep, replace or delete, why the number matters less than what each does, and how to remove plugins safely.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "too many wordpress plugins",
  cover_image: "/projects/saurally/screenshot-1.png",
  introduction: `<p>The number of WordPress plugins matters less than what each one does. Twenty small, well-maintained plugins that only load where they're needed can be fine; three bloated ones that load scripts on every page and haven't been updated in years can slow and endanger a site. The right approach is an audit: for each plugin, decide whether it's needed, whether it's maintained, what it costs in speed and risk, and whether something you already have does the same job.</p>`,
  content: `<h2>Why plugins become a problem</h2>
<ul>
<li><strong>Speed:</strong> many plugins add CSS, JavaScript and database queries to every page, even where they aren't used.</li>
<li><strong>Security:</strong> every plugin is code from someone else. Abandoned or outdated plugins are the most common way WordPress sites get hacked.</li>
<li><strong>Conflicts:</strong> plugins that overlap (two caching plugins, two SEO plugins) clash in unpredictable ways.</li>
<li><strong>Updates:</strong> more plugins means more updates, and more chances one breaks something.</li>
<li><strong>Cost:</strong> premium plugins renew yearly, often quietly.</li>
</ul>
<h2>Step 1: Make a list</h2>
<p>From the Plugins page, list every plugin, active or not, with: what it does, who uses it, when it was last updated, whether it's free or paid, and when the licence renews. Ask the team what each one is for. You'll often find plugins nobody remembers installing.</p>
<h2>Step 2: Sort each plugin into keep, replace or delete</h2>
<h3>Delete</h3>
<ul>
<li>Inactive plugins. Deactivated plugins still sit on the server and can still be exploited. If you don't need it, delete it.</li>
<li>Plugins for features you no longer use: old sliders, retired forms, past campaigns.</li>
<li>Plugins that duplicate another plugin or a feature now built into WordPress or your theme.</li>
</ul>
<h3>Replace</h3>
<ul>
<li>Plugins not updated for a long time, or no longer listed in the official directory.</li>
<li>Heavy plugins used for a tiny job, such as a huge page-builder add-on pack for one button style, or a whole social plugin for share links.</li>
<li>Plugins with known security issues and no fix.</li>
</ul>
<h3>Keep</h3>
<ul>
<li>Plugins that do essential jobs (security, backups, forms, SEO, caching) and are actively maintained.</li>
<li>Plugins your business depends on, such as WooCommerce and its payment and shipping extensions.</li>
</ul>
<h2>Step 3: Measure what each heavy plugin costs</h2>
<p>On a staging copy, measure a few key pages with <a href="https://pagespeed.web.dev/" rel="noopener">PageSpeed Insights</a> or Lighthouse, deactivate one suspect plugin, and measure again. A query-monitoring plugin, used temporarily, shows which plugins run the most database queries. Sliders, social feeds, chat widgets, popup builders and all-in-one toolkits are frequent culprits.</p>
<h2>Step 4: Remove plugins safely</h2>
<ol>
<li><strong>Take a full backup</strong> of files and database.</li>
<li><strong>Work on a staging copy</strong> if the site is important.</li>
<li><strong>Check what the plugin created:</strong> shortcodes in pages, widgets, custom post types, forms. Removing the plugin can leave broken shortcodes or missing content.</li>
<li><strong>Deactivate first,</strong> check the site, then delete.</li>
<li><strong>Clean up leftovers</strong> if the plugin left settings or tables in the database, carefully.</li>
<li><strong>Re-test</strong> forms, checkout and key pages.</li>
</ol>
<h2>Plugins most sites don't need</h2>
<ul>
<li>Several plugins doing small layout tweaks a few lines of CSS could handle.</li>
<li>A plugin for Google Analytics if your theme or tag manager already adds it.</li>
<li>Separate plugins for things your SEO plugin already does, such as sitemaps or redirects.</li>
<li>"Speed booster" plugins stacked on top of a caching plugin.</li>
</ul>
<h2>A worked example</h2>
<p>A typical audit on a small business site might find: two form plugins (one used for an old campaign), a slider plugin used on one page, a social feed plugin nobody looks at, three plugins that each add a little CSS, an inactive caching plugin alongside an active one, and a backup plugin that stopped running months ago. The result after the audit: one form plugin, the slider replaced with a static image, the feed and tiny CSS plugins removed, the inactive caching plugin deleted, and backups moved to the host. Fewer things to update, fewer things to break, and noticeably less code loading on every page.</p>
<h2>Prevent the build-up</h2>
<ul>
<li>Decide who's allowed to install plugins.</li>
<li>Before installing one, check its last update, active installs, support responses and whether an existing tool already does the job.</li>
<li>Review the list every few months.</li>
</ul>
<p>For the broader speed picture, see <a href="/blog/slow-wordpress-site/">why your WordPress site is slow</a>, and for security, our <a href="/blog/website-security-checklist/">website security checklist</a>.</p>
<h2>Plugin questions we get</h2>
<p><strong>How many plugins is too many?</strong> There's no magic number. Judge each plugin on its weight, maintenance and necessity, not on the total.</p>
<p><strong>Are premium plugins safer than free ones?</strong> Not automatically. Maintenance and quality matter more than price. Never use pirated "nulled" premium plugins, which often contain malware.</p>
<p><strong>Will deleting a plugin delete my content?</strong> Usually not your posts and pages, but content created by the plugin, such as its forms, sliders or shortcodes, may disappear or break. Check before deleting.</p>`,
  conclution: `<p>Delete what's inactive, replace what's abandoned, and keep what's essential and maintained. Do it on a staging copy with a backup, and do it again in six months.</p>
<p>It's also part of what our <a href="/services/website-maintenance-services/">maintenance team</a> does every month, if you'd rather not.</p>`,
}
