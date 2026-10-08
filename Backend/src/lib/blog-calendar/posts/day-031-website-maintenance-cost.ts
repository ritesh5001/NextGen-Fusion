import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 31,
  title: "Website maintenance: what it includes and what it should cost each month",
  slug: "website-maintenance-cost",
  excerpt: "What website maintenance includes, what decides its monthly cost, which tasks you can do yourself, and how to compare maintenance plans properly.",
  category: "Website Maintenance",
  primaryKeyword: "website maintenance cost",
  cover_image: "/projects/sidcobharat/screenshot-1.png",
  introduction: `<p>Website maintenance covers the work that keeps a site secure, working and current after launch: software updates, backups, security monitoring, uptime checks, small content changes and fixing things that break. What it costs each month depends on the platform, how many plugins or integrations the site has, whether it takes payments or stores customer data, how quickly you need problems fixed, and how many changes you want included.</p>
<p>This post doesn't list prices either. What it does is set out what a maintenance plan should actually include, what pushes the cost up or down, and how to spot a monthly fee for very little.</p>`,
  content: `<h2>What website maintenance should include</h2>
<h3>Updates</h3>
<p>Core software, plugins, themes and server software, updated regularly and tested afterwards. On WordPress this is the single most important task, because outdated plugins are the most common way sites get hacked.</p>
<h3>Backups</h3>
<p>Automatic backups of files and database, stored away from the server, kept for a sensible period, with a restore tested periodically.</p>
<h3>Security monitoring</h3>
<p>Scanning for malware and changed files, watching login attempts, keeping firewall rules current and acting on alerts. See our <a href="/blog/website-security-checklist/">website security checklist</a> for what good security looks like.</p>
<h3>Uptime and performance monitoring</h3>
<p>Alerts when the site goes down or slows down, and someone who responds to them.</p>
<h3>Small changes</h3>
<p>Text edits, new team photos, updated prices, a new page from an existing template. Plans usually include a set amount of time each month.</p>
<h3>Fixes</h3>
<p>Broken forms, layout problems after an update, expired certificates, errors in Search Console.</p>
<h3>Reporting</h3>
<p>A short monthly note of what was updated, any issues found and fixed, and anything you should know.</p>
<h2>What decides the monthly cost</h2>
<table>
<thead><tr><th>Factor</th><th>Lower maintenance effort</th><th>Higher maintenance effort</th></tr></thead>
<tbody>
<tr><td>Platform</td><td>Hosted platforms such as Shopify, or a simple static or custom site</td><td>Self-hosted WordPress with many plugins</td></tr>
<tr><td>Size and complexity</td><td>A few pages, few plugins</td><td>Large sites, many integrations, custom code</td></tr>
<tr><td>Payments and data</td><td>Brochure site with a contact form</td><td>Store, member area, bookings, personal data</td></tr>
<tr><td>Response time</td><td>Next working day</td><td>Within hours, including weekends</td></tr>
<tr><td>Changes included</td><td>Updates and monitoring only</td><td>Several hours of changes every month</td></tr>
<tr><td>Hosting</td><td>You pay the host separately</td><td>Managed hosting bundled into the plan</td></tr>
</tbody>
</table>
<p>Two plans with the same name can be very different. Compare what's actually done each month, not the label.</p>
<h2>Costs that sit outside maintenance</h2>
<ul>
<li><strong>Domain renewal</strong>, paid to the registrar.</li>
<li><strong>Hosting</strong>, unless bundled.</li>
<li><strong>Premium plugin, theme or app licences</strong>, renewed yearly.</li>
<li><strong>Platform subscriptions</strong>, such as a Shopify plan.</li>
<li><strong>New features or redesigns</strong>, which are projects rather than maintenance.</li>
</ul>
<p>We cover the yearly costs nobody mentions in a later post in this series.</p>
<h2>What you can do yourself</h2>
<p>If you're comfortable with your site's admin area, you can handle content edits, simple updates on a small site with few plugins, and checking that forms still work. What's harder to do well without experience: testing updates safely on a staging copy, cleaning up after a hack, diagnosing slowdowns, and restoring backups under pressure.</p>
<p>A sensible middle ground for small sites: do your own content changes, and pay for updates, backups and security monitoring.</p>
<h2>Warning signs in a maintenance plan</h2>
<ul>
<li>No clear list of what's done each month.</li>
<li>"Unlimited changes" with no definition of a change.</li>
<li>Backups stored only on the same server.</li>
<li>Updates applied automatically to everything with no testing.</li>
<li>No reports, so you never know whether anything was done.</li>
<li>Your logins held by the provider and not shared with you.</li>
</ul>
<h2>What happens without maintenance</h2>
<p>A site left alone doesn't stay the same. Plugins fall behind and develop known vulnerabilities, certificates or renewals lapse, forms quietly stop sending, and speed degrades as content piles up. The usual result, a year or two later, is a hack, a broken site or a forced rebuild, and fixing any of those costs more than the maintenance would have.</p>
<h2>Maintenance questions</h2>
<p><strong>Does a Shopify store need maintenance?</strong> Less than WordPress, because Shopify handles hosting and core updates. It still needs app reviews, theme updates, content changes and checks that integrations work.</p>
<p><strong>How often should a WordPress site be updated?</strong> Security updates as soon as practical, and routine updates at least monthly, tested on a staging copy for important sites.</p>
<p><strong>Can I cancel maintenance any time?</strong> Check the terms. A fair plan lets you leave with full access to your site, backups and accounts.</p>`,
  conclution: `<p>Ask any provider for a list of what they actually do each month, and a copy of last month's report for an existing client. The answer tells you most of what you need to know.</p>
<p>Our own <a href="/services/website-maintenance-services/">maintenance plans</a> are sized to the site; message us on WhatsApp at +91 73482 28167 for a written quote.</p>`,
}
