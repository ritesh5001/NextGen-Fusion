import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 17,
  title: "My WordPress site got hacked: how to clean it and stop it happening again",
  slug: "wordpress-site-hacked",
  excerpt: "WordPress site hacked? What to do in the first hour, how to clean it properly, how to get Google's warning removed, and how to stop it happening again.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "wordpress site hacked",
  cover_image: "/projects/krushidoctor/screenshot-1.png",
  introduction: `<p>If your WordPress site has been hacked, act in this order: contain it, take a backup of the hacked state, change every password, find and remove the malicious code, update everything, and then ask Google to review the site if it was flagged. Restoring an old backup without finding how the attacker got in usually means being hacked again within days.</p>
<p>Below is the process we follow, with the signs of a hack, the common entry points, and what to do so it doesn't happen again.</p>`,
  content: `<h2>Signs your WordPress site has been hacked</h2>
<ul>
<li>Visitors are redirected to spam, gambling or fake-prize sites, sometimes only on mobile or only when arriving from Google.</li>
<li>Google shows "This site may be hacked" in results, or browsers show a red warning page.</li>
<li>Search results show pages you never created, often in other languages or for pharmaceuticals.</li>
<li>New admin users you don't recognise.</li>
<li>Your host suspends the account or warns about malware or spam emails.</li>
<li>Strange files in the hosting account, or code you didn't add at the top of theme files.</li>
</ul>
<p>Some hacks hide from logged-in admins, so check the site in a private window, on your phone and by clicking through from a Google search.</p>
<h2>The first hour</h2>
<h3>1. Don't panic-delete</h3>
<p>Deleting files at random can destroy the evidence of how the attacker got in, and break the site further.</p>
<h3>2. Take a backup of the hacked site</h3>
<p>Copy all files and the database as they are now. It sounds odd, but you'll need it to investigate, and to recover any content added since your last clean backup.</p>
<h3>3. Put the site in maintenance mode or take it offline</h3>
<p>If visitors are being redirected to harmful sites, protect them. Your host can help.</p>
<h3>4. Change every password</h3>
<p>WordPress admins, hosting control panel, FTP or SFTP, the database, email accounts linked to the site, and the domain registrar. Do it from a computer you trust, and turn on two-factor authentication while you're there.</p>
<h2>Cleaning the site</h2>
<h3>5. Find out how they got in</h3>
<p>The most common entry points:</p>
<ul>
<li>An outdated plugin or theme with a known vulnerability.</li>
<li>A "nulled" (pirated) premium plugin or theme with malware built in.</li>
<li>A weak or reused admin password.</li>
<li>Another hacked site in the same hosting account.</li>
<li>Stolen FTP or hosting credentials.</li>
</ul>
<p>Your hosting access logs, the list of recently modified files and the list of plugins with known vulnerabilities usually point to the answer.</p>
<h3>6. Replace core files, plugins and themes with clean copies</h3>
<p>Re-install WordPress core files from the official source. Delete and re-install every plugin and theme from the official repository or the vendor, not from your hacked files. Delete anything you don't need.</p>
<h3>7. Hunt for leftovers</h3>
<p>Attackers leave back doors so they can return. Look in the uploads folder for PHP files (there normally shouldn't be any), check <code>wp-config.php</code> and <code>.htaccess</code> for added code, search the database for injected scripts and spam links, and remove admin users you don't recognise. A security scanner helps, but manual checks catch what scanners miss.</p>
<h3>8. Restore from a clean backup if you have one</h3>
<p>If you have a backup from before the hack and you know how they got in, restoring it and then fixing the entry point can be faster than cleaning. Update everything immediately after restoring.</p>
<h3>9. Update, harden and monitor</h3>
<p>Update WordPress, every plugin and theme, and PHP. Then apply the basics from our <a href="/blog/website-security-checklist/">15-point website security checklist</a>: two-factor logins, limited login attempts, off-server backups and monitoring.</p>
<h2>Getting Google's warning removed</h2>
<p>If Google flagged the site, open Search Console and check <strong>Security issues</strong>. It lists what Google found and example URLs. Once the site is clean, click <strong>Request review</strong> and describe what you fixed and how you closed the entry point. Google's <a href="https://developers.google.com/search/docs/monitor-debug/security/malware" rel="noopener">guide to hacked and malware-infected sites</a> explains the process. Reviews for malware warnings are often quick; spam hacks can take longer.</p>
<p>Also remove spam pages the hack created: make sure they return a 404 or 410 so they drop out of Google over time.</p>
<h2>Stopping it happening again</h2>
<ul>
<li>Never install nulled plugins or themes.</li>
<li>Keep plugins few, maintained and updated.</li>
<li>Use unique passwords, a password manager and two-factor authentication.</li>
<li>Keep automatic backups off the server, and test a restore.</li>
<li>Separate important sites into their own hosting accounts.</li>
<li>Watch for changes: file monitoring, uptime checks and Search Console alerts.</li>
</ul>
<h2>Questions after a hack</h2>
<h3>Will my host clean it for me?</h3>
<p>Some hosts offer cleaning, often as a paid service. Others only suspend the account until you fix it. Ask what they cover.</p>
<h3>Has my customers' data been stolen?</h3>
<p>It depends on the hack. If the site stores personal data or takes payments, treat it seriously, investigate what was accessed and take advice on your legal obligations in your country.</p>
<h3>Why does the hack keep coming back?</h3>
<p>Because a back door remains, or the original entry point is still open. Cleaning without finding the cause rarely lasts.</p>`,
  conclution: `<p>The single most important step is the one people skip: finding out how they got in. Clean without closing the door and you'll be doing this again next month.</p>
<p>If you'd rather hand the clean-up to someone who does it regularly, our <a href="/services/website-maintenance-services/">maintenance team</a> can take it from here.</p>`,
}
