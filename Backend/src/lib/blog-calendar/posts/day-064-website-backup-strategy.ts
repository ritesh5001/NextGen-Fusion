import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 64,
  title: "Website backups: how often, where to store them, and how to test a restore",
  slug: "website-backup-strategy",
  excerpt: "Website backups done properly: how often to back up, what to include, where to store copies, how long to keep them, and how to test a restore.",
  category: "Website Maintenance",
  primaryKeyword: "website backup strategy",
  cover_image: "/projects/sidcobharat/screenshot-1.png",
  introduction: `<p>A good website backup strategy backs up files and database automatically, at least daily for sites that change often, keeps copies in more than one place including somewhere away from your hosting, keeps them long enough to recover from problems discovered late, and is tested by actually restoring a backup. A backup that's never been restored is a hope, not a plan.</p>
<p>A backup you've never restored is a hope, not a plan.</p>`,
  content: `<h2>What to back up</h2>
<ul>
<li><strong>The database:</strong> pages, posts, products, orders, customers, settings. For stores and member sites, this changes constantly.</li>
<li><strong>Files:</strong> uploads (images and documents), themes, plugins or application code, and configuration files.</li>
<li><strong>For custom applications:</strong> the code repository (already versioned), environment configuration, and any file storage such as cloud buckets.</li>
<li><strong>Your DNS and account details,</strong> documented, so you can rebuild the setup if needed.</li>
</ul>
<h2>How often</h2>
<table>
<thead><tr><th>Site type</th><th>Database</th><th>Files</th></tr></thead>
<tbody>
<tr><td>Brochure site, rarely updated</td><td>Weekly, plus before changes</td><td>Weekly</td></tr>
<tr><td>Blog or site updated weekly</td><td>Daily</td><td>Daily or weekly</td></tr>
<tr><td>Online store or booking site</td><td>Several times a day, or continuous</td><td>Daily</td></tr>
<tr><td>Web application</td><td>Continuous or point-in-time recovery</td><td>Daily, plus code in version control</td></tr>
</tbody>
</table>
<p>Ask: how much data could we afford to lose? For a store, losing a day of orders is serious; back up accordingly. Always take a backup before updates, migrations or major changes.</p>
<h2>Where to store backups: the 3-2-1 rule</h2>
<p>A widely used rule of thumb:</p>
<ul>
<li><strong>3 copies</strong> of your data (the live site plus two backups).</li>
<li><strong>2 different storage types or providers.</strong></li>
<li><strong>1 copy off-site,</strong> away from your hosting provider.</li>
</ul>
<p>Backups stored only on the same server are lost when the server fails or is hacked. Host-provided backups are useful but should be one copy, not the only copy. Cloud storage in an account your business controls is a common second location.</p>
<h2>How long to keep them</h2>
<p>Keep several generations: for example daily backups for a couple of weeks, weekly for a few months, and monthly for longer. Some problems, like a hack or a corrupted product catalogue, are discovered weeks later, and you'll need a backup from before it happened. Check any legal requirements in your industry for keeping records.</p>
<h2>Protect the backups themselves</h2>
<ul>
<li>Encrypt backups that contain customer data.</li>
<li>Limit who can access and delete them.</li>
<li>Don't leave backup files in the public website folder, where they can be downloaded.</li>
<li>Consider immutable or versioned storage, so ransomware or a compromised account can't delete every copy.</li>
</ul>
<h2>Test restores</h2>
<p>At least a few times a year, restore a backup to a staging site and check it works: pages load, images appear, logins work, recent orders are there. Note how long it takes. When something goes wrong for real, you'll know exactly what to do and how long the site will be down.</p>
<h2>Write a short recovery plan</h2>
<ul>
<li>Where backups are stored and who has access.</li>
<li>Step-by-step restore instructions.</li>
<li>Who to call: developer, host, domain registrar.</li>
<li>How to handle orders or bookings made between the last backup and the problem.</li>
</ul>
<p>When a site is hacked or broken, this plan saves hours; see <a href="/blog/wordpress-site-hacked/">WordPress site hacked</a> and <a href="/blog/wordpress-critical-error/">WordPress critical error</a> for when you'll need it. Backups are also item 11 of our <a href="/blog/website-security-checklist/">website security checklist</a>.</p>
<h2>Platform notes</h2>
<ul>
<li><strong>WordPress:</strong> a reliable backup plugin or host-level backups, sent to external storage.</li>
<li><strong>Shopify:</strong> Shopify runs the platform, but your store data (products, themes, content) can still be lost through mistakes or bad apps. Third-party backup apps or regular exports protect against that.</li>
<li><strong>Custom apps:</strong> managed database backups with point-in-time recovery, plus storage backups and infrastructure documentation.</li>
</ul>
<h2>Backup questions</h2>
<h3>My host does backups. Isn't that enough?</h3>
<p>It's a good start, but it's one copy with the same provider. Keep another copy elsewhere, and know how to restore it yourself.</p>
<h3>How do I know backups are running?</h3>
<p>Set alerts for failures and check the backup log monthly. Silent failures are common.</p>
<h3>Do backups slow the site?</h3>
<p>They can if run at busy times. Schedule them for quiet hours or use host-level backups.</p>`,
  conclution: `<p>This week, restore your latest backup to a staging site and time how long it takes. Whatever you learn will be far more useful than knowing the backups "run".</p>
<p>Our <a href="/services/website-maintenance-services/">maintenance plans</a> include backups and restore testing.</p>`,
}
