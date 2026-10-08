import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 70,
  title: "Website down? What to do in the first hour, and how to stop it happening again",
  slug: "website-down-what-to-do",
  excerpt: "Website down? What to do in the first hour: confirm it, find the cause (domain, DNS, hosting, SSL or code), get it back, and stop it happening again.",
  category: "Website Redesign",
  primaryKeyword: "website down what to do",
  cover_image: "/projects/newsaraswatisareecentre/screenshot-1.png",
  introduction: `<p>When your website is down, work through the causes in order: confirm it's actually down for everyone, then check the domain hasn't expired, check DNS, check the hosting account and server status, check the SSL certificate, and then look at recent changes to the site itself. Most outages are caused by one of these, and the first hour goes much faster with a checklist than with guesswork.</p>
<p>Write the checklist down somewhere you can reach when the site is down, because that's exactly when you won't be able to look it up on your website.</p>`,
  content: `<h2>Minute 1–5: Is it really down?</h2>
<ul>
<li>Try the site on your phone using mobile data, not office Wi-Fi.</li>
<li>Try it in a private browser window.</li>
<li>Use an online "is it down" checker to test from other locations.</li>
<li>Note the exact error: a browser message ("This site can't be reached"), an error code (500, 502, 503, 504), a certificate warning, a blank page, or a hosting company's suspension page.</li>
</ul>
<p>The error type points to the cause.</p>
<h2>Check 1: Has the domain expired?</h2>
<p>An expired domain stops the website and email at once. Log in to your registrar and check the expiry date. If it lapsed, renew immediately; there's usually a grace period. If you can't access the registrar account, see <a href="/blog/developer-disappeared-recover-website/">recovering your website when a developer disappears</a>.</p>
<h2>Check 2: DNS</h2>
<p>If DNS records were changed or the nameservers moved, the domain may point nowhere or to the wrong server. "This site can't be reached" or "DNS address could not be found" suggests DNS. Check recent changes with whoever manages your DNS (registrar, Cloudflare or host).</p>
<h2>Check 3: The hosting account and server</h2>
<ul>
<li>Check your host's status page and your email for outage or suspension notices.</li>
<li>Suspensions happen for unpaid bills, exceeded resource limits, or malware.</li>
<li>Errors like 502, 503 and 504 often mean the server is overloaded, down or misconfigured.</li>
</ul>
<p>Contact your host's support with the exact error and time; they can see server logs you can't.</p>
<h2>Check 4: SSL certificate</h2>
<p>A full-page browser warning about the connection usually means the certificate expired or doesn't match the domain. See <a href="/blog/website-not-secure-ssl/">fixing "Not Secure" and SSL errors</a>.</p>
<h2>Check 5: The site itself</h2>
<p>If the server is fine but the site shows an error, something in the site changed: an update, a new plugin, a code deployment, a database problem. On WordPress, a "critical error" message has its own recovery process; see <a href="/blog/wordpress-critical-error/">WordPress critical error</a>. For custom sites, roll back the last deployment.</p>
<h2>Check 6: Hacking or attack</h2>
<p>Sudden redirects, defaced pages, a malware suspension or a flood of traffic can indicate a hack or attack. Contain it, contact the host, and follow the steps in <a href="/blog/wordpress-site-hacked/">what to do when your site is hacked</a>.</p>
<h2>While it's down</h2>
<ul>
<li>Tell customers where to reach you: social media, WhatsApp, phone.</li>
<li>If you take orders, keep a manual process ready.</li>
<li>Note the times and what you tried, for the host and your developer.</li>
</ul>
<h2>Getting back up</h2>
<p>Fix the cause if you can. If not, restore from a recent backup, which is why tested backups matter; see <a href="/blog/website-backup-strategy/">website backup strategy</a>. Then check forms, payments and key pages before announcing it's back.</p>
<h2>Preventing the next outage</h2>
<ul>
<li><strong>Uptime monitoring</strong> that alerts you within minutes, so you hear before customers do.</li>
<li><strong>Auto-renewal</strong> on the domain, with a current payment card and a reminder.</li>
<li><strong>Certificate monitoring</strong> for expiry.</li>
<li><strong>Updates tested on staging</strong> before going live.</li>
<li><strong>Hosting sized for your traffic,</strong> with headroom for busy periods.</li>
<li><strong>A written recovery plan:</strong> logins, contacts and steps, kept somewhere you can reach when the site is down.</li>
</ul>
<h2>Outage questions</h2>
<h3>Will a short outage hurt my Google rankings?</h3>
<p>Short outages rarely have lasting effects. Long or repeated outages can, as Google may slow crawling or drop pages it can't reach.</p>
<h3>Why is my site down only for some people?</h3>
<p>Often DNS changes spreading, a regional network problem, or a firewall or CDN blocking certain visitors.</p>
<h3>Should my email go down when my website does?</h3>
<p>Not if email is hosted separately, which is one good reason to host it separately.</p>`,
  conclution: `<p>Afterwards, set up uptime monitoring and auto-renewal on the domain. The next outage will be shorter, or it won't happen at all.</p>
<p>Our <a href="/services/website-maintenance-services/">maintenance team</a> monitors sites around the clock.</p>`,
}
