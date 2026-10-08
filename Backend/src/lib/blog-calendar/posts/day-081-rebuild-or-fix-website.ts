import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 81,
  title: "Should you rebuild or fix your existing website? A decision framework",
  slug: "rebuild-or-fix-website",
  excerpt: "Should you rebuild or fix your existing website? A decision framework based on platform, code quality, content, performance and cost of change.",
  category: "Website Redesign",
  primaryKeyword: "rebuild or redesign website",
  cover_image: "/projects/kalamohini/screenshot-1.png",
  introduction: `<p>Fix your existing website when the platform is current, the problems are specific (speed, a few broken pages, unclear content, a dated look) and changes don't require fighting the code. Rebuild when the platform is outdated or abandoned, every change breaks something, the structure no longer fits the business, or fixing would cost nearly as much as starting again with something better. Most decisions become clear once you score the site honestly on a handful of factors.</p>
<p>It's the same framework we'd use if you asked us to audit your site.</p>`,
  content: `<h2>Score your site on six factors</h2>
<table>
<thead><tr><th>Factor</th><th>Points towards fixing</th><th>Points towards rebuilding</th></tr></thead>
<tbody>
<tr><td>Platform</td><td>Current, supported, widely used</td><td>Outdated, abandoned, or proprietary to one developer</td></tr>
<tr><td>Code and theme</td><td>Clean, documented, changes are straightforward</td><td>Every change breaks something; no one understands it</td></tr>
<tr><td>Performance</td><td>Slow for fixable reasons (hosting, images, plugins)</td><td>Slow at its core, even after the obvious fixes</td></tr>
<tr><td>Mobile</td><td>Responsive with some broken elements</td><td>Never built for mobile</td></tr>
<tr><td>Structure and content</td><td>Pages fit the business; content needs updating</td><td>Business has changed; the structure doesn't fit any more</td></tr>
<tr><td>Editing</td><td>Team can update it</td><td>Every change needs a developer</td></tr>
</tbody>
</table>
<p>If most answers fall in the left column, fix. If several fall in the right, a rebuild is probably cheaper in the long run.</p>
<h2>When fixing is the right call</h2>
<ul>
<li><strong>Speed:</strong> hosting, caching, images and plugin clean-up; see <a href="/blog/slow-wordpress-site/">why your WordPress site is slow</a>.</li>
<li><strong>Mobile problems</strong> limited to some pages or elements; see <a href="/blog/website-broken-on-mobile/">website broken on mobile</a>.</li>
<li><strong>Weak messaging:</strong> rewrite the homepage and key service pages.</li>
<li><strong>Dated look:</strong> new photography, typography and colours on the existing structure.</li>
<li><strong>Conversion:</strong> clearer calls to action, forms and trust signals.</li>
</ul>
<p>Fixes like these are faster, cheaper and carry less risk to your search rankings.</p>
<h2>When rebuilding is the right call</h2>
<ul>
<li>The platform is end-of-life or the theme is abandoned and can't be updated safely.</li>
<li>The site was built on a proprietary system you can't move or maintain.</li>
<li>Fixing one area keeps breaking others.</li>
<li>The business has changed so much that the structure, navigation and content all need replacing.</li>
<li>You need capabilities the current platform can't support, such as e-commerce, accounts or integrations.</li>
</ul>
<h2>The hidden cost of not deciding</h2>
<p>Patching a site that should be rebuilt is expensive in slow ways: every change takes longer, bugs reappear, and the site falls further behind. Rebuilding a site that only needed fixes wastes money and risks rankings. The framework above helps avoid both.</p>
<h2>A middle path</h2>
<p>Sometimes the answer is a staged rebuild: keep the current site running while rebuilding the highest-value sections first, such as the homepage, main service or product templates and the contact flow, then migrating the rest. It spreads cost and reduces risk.</p>
<h2>Protect what works either way</h2>
<ul>
<li>Pages that rank and bring enquiries.</li>
<li>URLs with links from other sites.</li>
<li>Reviews, case studies and other proof.</li>
<li>Tracking and analytics history.</li>
</ul>
<p>For a rebuild, follow our <a href="/blog/website-redesign-checklist/">website redesign checklist</a> and the SEO steps in <a href="/blog/migrate-website-without-losing-rankings/">migrating without losing rankings</a>.</p>
<h2>Two typical cases</h2>
<p><strong>A fix:</strong> a consultancy on a current WordPress install with a decent theme, slow because of cheap hosting and a dozen unused plugins, with outdated service descriptions. Better hosting, a plugin clean-up and rewritten service pages solve it in a fraction of a rebuild's time.</p>
<p><strong>A rebuild:</strong> a manufacturer on a years-old custom CMS nobody can update, not responsive on phones, with a developer who's no longer reachable. Every fix would be work on a foundation that has to be replaced anyway, so the money is better spent on a new site with proper redirects.</p>
<h2>Get an honest second opinion</h2>
<p>Agencies sometimes recommend rebuilds because that's the bigger project. Ask any provider to explain, in writing, why fixing wouldn't work, and what specific problems a rebuild solves. If they can't, fixing may be enough.</p>
<h2>Rebuild questions</h2>
<p><strong>Will a rebuild improve our rankings?</strong> Not automatically. It can help if it fixes speed, structure and content problems, and it can hurt if redirects and content are mishandled.</p>
<p><strong>Can we change platforms during a rebuild?</strong> Yes, if the platform is part of the problem. Plan data migration and redirects carefully.</p>
<p><strong>How long does it take to decide?</strong> An audit of a typical business site takes days, not weeks, and gives you a clear recommendation.</p>`,
  conclution: `<p>Be a little suspicious of anyone who recommends a rebuild without explaining in writing why fixing wouldn't work, ourselves included. A good audit makes the answer obvious.</p>
<p>If you'd like one, see our <a href="/services/web-design-services/">web design services</a>.</p>`,
}
