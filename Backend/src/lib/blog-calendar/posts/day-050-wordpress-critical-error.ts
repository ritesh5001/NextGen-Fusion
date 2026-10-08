import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 50,
  title: "WordPress 'critical error' and white screen of death: causes and how to recover",
  slug: "wordpress-critical-error",
  excerpt: "WordPress \"There has been a critical error\" or a white screen? The common causes, how to find the real error, how to recover, and how to prevent it.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "wordpress critical error fix",
  cover_image: "/projects/deetoo/screenshot-1.png",
  introduction: `<p>"There has been a critical error on this website" and the blank white screen both mean a PHP error stopped WordPress from loading the page. The usual causes are a plugin or theme update that conflicts with something, a PHP version change on the server, running out of memory, or a broken file. The fix is to find the actual error message (WordPress usually emails it to the admin), then disable or roll back whatever caused it.</p>
<p>Most critical errors look scarier than they are. The site's content is safe; something just stopped PHP from finishing the page.</p>`,
  content: `<h2>Step 1: Check the admin email</h2>
<p>Since WordPress 5.2, when a fatal error happens, WordPress tries to email the site's admin address with details of the error and a special <strong>recovery mode</strong> link. The email usually names the plugin or theme that caused it. Recovery mode lets you log in with the problem plugin paused, so you can deactivate or update it.</p>
<p>Check spam folders, and remember the email goes to the admin email in WordPress settings, which may be an old address.</p>
<h2>Step 2: Think about what just changed</h2>
<p>Most critical errors follow a change:</p>
<ul>
<li>A plugin or theme was updated or installed.</li>
<li>WordPress itself was updated.</li>
<li>The host changed the PHP version.</li>
<li>Someone edited a theme file or <code>functions.php</code>.</li>
<li>Traffic or a heavy task pushed the site past its memory limit.</li>
</ul>
<p>If you know what changed, you probably know what to undo.</p>
<h2>Step 3: Find the real error</h2>
<p>If there's no email, turn on WordPress debugging to log the error. In <code>wp-config.php</code> (via your host's file manager or SFTP), set debugging to log errors to a file rather than show them to visitors, as described in WordPress's <a href="https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/" rel="noopener">debugging documentation</a>. Reload the page, then read the log file in <code>wp-content</code>. The error names a file path, which tells you whether it's a plugin, a theme or core.</p>
<p>Your host's error logs often show the same information without changing anything.</p>
<h2>Step 4: Disable the cause</h2>
<h3>If it's a plugin</h3>
<p>Without dashboard access, rename the plugin's folder in <code>wp-content/plugins</code> (for example, add <code>-off</code> to the end). WordPress deactivates it. If you don't know which plugin, rename the whole <code>plugins</code> folder to deactivate all of them, check the site loads, then rename it back and reactivate plugins one at a time.</p>
<h3>If it's the theme</h3>
<p>Rename the active theme's folder in <code>wp-content/themes</code>. WordPress falls back to a default theme if one is installed. Then fix or roll back the theme.</p>
<h3>If it's memory</h3>
<p>An error mentioning "allowed memory size exhausted" means PHP ran out of memory. Your host can raise the limit, but also find out what's using so much: often a heavy plugin or a large import.</p>
<h3>If it's the PHP version</h3>
<p>Errors about deprecated or removed functions after a host upgrade mean some plugin or theme code is too old for the new PHP version. Update it, replace it, or temporarily switch PHP back while you do.</p>
<h2>Step 5: Restore from backup if needed</h2>
<p>If you can't find or fix the cause quickly and the site is important, restore the most recent working backup, then investigate on a staging copy. Make sure you don't lose orders or content added since that backup.</p>
<h2>Step 6: Turn debugging display off</h2>
<p>Once fixed, make sure errors aren't displayed to visitors and remove any debug logging you don't need. Public error messages can reveal file paths and other details attackers find useful.</p>
<h2>How to stop it happening again</h2>
<ul>
<li>Update plugins and themes on a staging site first for important sites.</li>
<li>Update one thing at a time, so you know what caused a problem.</li>
<li>Keep automatic backups, and know how to restore one.</li>
<li>Keep plugins few and maintained; see <a href="/blog/too-many-wordpress-plugins/">too many WordPress plugins?</a></li>
<li>Make sure the admin email is one somebody reads.</li>
<li>Ask your host before PHP upgrades, and test compatibility first.</li>
</ul>
<h2>Questions about critical errors</h2>
<h3>Has my site been hacked?</h3>
<p>Usually not. Critical errors are almost always caused by updates and conflicts. If you see unfamiliar files or code, though, check for a hack; see <a href="/blog/wordpress-site-hacked/">WordPress site hacked</a>.</p>
<h3>Why does only one page show the error?</h3>
<p>The faulty code may run only on certain pages, such as product pages for a WooCommerce extension or pages using a particular block.</p>
<h3>Will I lose my content?</h3>
<p>No. Posts, pages and settings are in the database and aren't affected by disabling a plugin or theme.</p>`,
  conclution: `<p>Check the admin inbox for the recovery email, read the real error in the logs, and disable whatever caused it. Then start testing updates on a staging copy so the next one happens there instead.</p>
<p>Our <a href="/services/website-maintenance-services/">maintenance team</a> can recover the site now and keep it updated safely afterwards.</p>`,
}
