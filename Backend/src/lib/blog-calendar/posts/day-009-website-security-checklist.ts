import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 9,
  title: "Is my website secure? A 15-point security checklist for business websites",
  slug: "website-security-checklist",
  excerpt: "Is your website secure? A 15-point checklist for business websites: logins, updates, backups, hosting, forms and what to do if something goes wrong.",
  category: "Website Maintenance",
  primaryKeyword: "website security checklist",
  cover_image: "/projects/hcbengineering/screenshot-1.png",
  introduction: `<p>A business website is reasonably secure when the software is up to date, logins are protected, backups exist and have been tested, and someone is watching for problems. Most hacked small business sites we're asked to clean up were not targeted. They were found by automated scans looking for an old plugin, a weak password or an exposed admin page, and broken into because one of those basics was missing.</p>
<p>Treat the fifteen checks below as an audit. None of them needs special tools, and most take a few minutes each.</p>`,
  content: `<h2>Accounts and logins</h2>
<h3>1. Every admin account belongs to a current person</h3>
<p>List every user with admin access to the website, hosting, domain registrar and any connected service. Remove former staff, old agencies and "test" accounts. Each person should have their own login, never a shared one.</p>
<h3>2. Strong, unique passwords and a password manager</h3>
<p>Reused passwords are how many sites get into trouble: a password leaked from another service is tried on your admin page. Use a password manager and a long, unique password for every account.</p>
<h3>3. Two-factor authentication everywhere it's offered</h3>
<p>Turn on two-factor authentication for the website admin, hosting control panel, domain registrar, email and any payment accounts. If someone steals a password, the second factor stops them.</p>
<h3>4. Login attempts are limited</h3>
<p>Automated tools try thousands of passwords against login pages. Limit failed attempts, and consider adding a CAPTCHA or moving the login behind extra protection. Many hosts and security plugins handle this.</p>
<h2>Software and updates</h2>
<h3>5. The core software is current</h3>
<p>Whether it's WordPress, another CMS or a framework, check the version against the latest release. Old versions with known vulnerabilities are exactly what automated scanners look for.</p>
<h3>6. Plugins, themes and libraries are updated and trimmed</h3>
<p>Every plugin or package is code someone else wrote. Update them regularly, remove anything you don't use (deactivated isn't enough; delete it), and avoid ones that haven't been updated in a long time. We'll cover a safe update routine later in this series.</p>
<h3>7. The server software is supported</h3>
<p>Ask your host which PHP or Node.js version your site runs on. Versions past their end of life no longer receive security fixes.</p>
<h2>Connection and hosting</h2>
<h3>8. HTTPS is on everywhere</h3>
<p>Every page should load over HTTPS, and http:// addresses should redirect to https://. Certificates from services like <a href="https://letsencrypt.org/" rel="noopener">Let's Encrypt</a> are free and renew automatically on most hosts.</p>
<h3>9. Hosting accounts are separated</h3>
<p>If several sites share one hosting account, one hacked site can infect the others. Separate important sites, or at least make sure each runs under its own user.</p>
<h3>10. File permissions and exposed files are checked</h3>
<p>Configuration files, backups and logs shouldn't be downloadable from the web. Old backup files such as <code>site-backup.zip</code> left in the public folder are a common leak.</p>
<h2>Data and recovery</h2>
<h3>11. Automatic backups, stored off the server</h3>
<p>Backups should run automatically, include both files and database, and be stored somewhere other than the server they protect. If the server is compromised or the host has a problem, backups kept on it go too.</p>
<h3>12. A restore has actually been tested</h3>
<p>A backup you've never restored is a hope, not a plan. Restore to a staging site at least once to prove it works and to know how long it takes.</p>
<h3>13. Forms are protected and collect only what's needed</h3>
<p>Contact and signup forms should have spam protection, validate what's entered, and collect only the data you need. Every extra piece of personal data you store is something you have to protect.</p>
<h2>Monitoring and response</h2>
<h3>14. Someone is told when something changes</h3>
<p>Uptime monitoring tells you when the site goes down. Google Search Console emails you if Google detects malware or hacked content. A security plugin or host-level scanning can flag changed files. Make sure these alerts go to a person who reads them.</p>
<h3>15. You know what to do if it happens</h3>
<p>Write down, in one place: who to call, where backups are, how to reach the host, and who has access to the domain. When a site is hacked, the first hour goes much better with that list ready.</p>
<h2>How often to run this checklist</h2>
<p>Updates and backup checks should happen at least monthly. Review user accounts whenever someone leaves or a contractor finishes. Run the full fifteen points a couple of times a year, or after any major change such as a redesign or hosting move.</p>
<h2>Security questions owners ask</h2>
<h3>My site is small. Would anyone bother hacking it?</h3>
<p>Most attacks are automated and don't care how big you are. Small sites are often used to send spam, host phishing pages or redirect visitors elsewhere.</p>
<h3>Is a security plugin enough?</h3>
<p>It helps, especially with login protection and file scanning, but it can't replace updates, good passwords and backups.</p>
<h3>What does the padlock in the browser actually mean?</h3>
<p>Only that the connection between the visitor and your server is encrypted. It doesn't mean the site itself is safe from hacking.</p>`,
  conclution: `<p>Put the monthly items in a calendar: updates, a backup check, a quick look at who has admin access. Security is mostly habit.</p>
<p>And if you'd prefer someone else to own the habit, that's what our <a href="/services/website-maintenance-services/">maintenance plans</a> are for.</p>`,
}
