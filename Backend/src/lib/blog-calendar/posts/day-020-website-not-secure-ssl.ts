import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 20,
  title: "Why your website shows 'Not Secure', and how to fix SSL errors",
  slug: "website-not-secure-ssl",
  excerpt: "Why your website shows \"Not Secure\", and how to fix SSL errors: missing or expired certificates, mixed content, wrong domains and redirect problems.",
  category: "Website Maintenance",
  primaryKeyword: "website not secure ssl fix",
  cover_image: "/projects/ladyscootytrainer/screenshot-1.png",
  introduction: `<p>A browser shows "Not Secure" when a page loads over plain HTTP instead of HTTPS, or when the HTTPS connection has a problem: the SSL certificate is missing, expired or for a different domain, or the page loads some content insecurely. The fix is usually straightforward: install or renew a certificate, redirect HTTP to HTTPS, and update any links that still point to http://.</p>`,
  content: `<h2>Why it matters</h2>
<p>Visitors see "Not Secure" next to your address and hesitate, especially before filling in a form or paying. Browsers may show a full-screen warning for certificate errors, which most people won't click past. Google uses HTTPS as a ranking signal, and many modern browser features only work over HTTPS.</p>
<h2>Step 1: Find out which problem you have</h2>
<p>Click the icon to the left of your address in the browser. It will usually say one of these:</p>
<ul>
<li><strong>Not secure / connection is not secure:</strong> the page loaded over HTTP.</li>
<li><strong>Certificate is not valid / expired:</strong> HTTPS is set up, but the certificate has a problem.</li>
<li><strong>Parts of this page are not secure:</strong> mixed content, meaning the page is HTTPS but some images, scripts or styles load over HTTP.</li>
</ul>
<h2>Problem 1: No SSL certificate</h2>
<p>You need a certificate before HTTPS works. Most hosts now include free certificates from <a href="https://letsencrypt.org/" rel="noopener">Let's Encrypt</a>, which renew automatically. Look for "SSL", "TLS" or "HTTPS" in your hosting control panel and switch it on for your domain. If you use Cloudflare or another CDN in front of your site, set up SSL there too, and use the setting that encrypts the connection all the way to your server, not just to the CDN.</p>
<h2>Problem 2: The site doesn't redirect to HTTPS</h2>
<p>A certificate alone doesn't move visitors to HTTPS. Anyone typing your address or following an old link may still land on http://.</p>
<ul>
<li>Set a permanent (301) redirect from every http:// address to the https:// version. Many hosts have a "Force HTTPS" switch.</li>
<li>In WordPress, make sure both addresses in <strong>Settings › General</strong> start with https://.</li>
<li>Pick one version, with or without www, and redirect the other to it, so there's one address for every page.</li>
</ul>
<h2>Problem 3: Expired certificate</h2>
<p>Free certificates last around three months and renew automatically, until something breaks the renewal: a DNS change, a moved site, or a domain pointing to a different server. Paid certificates often last a year and need manual renewal. Check the expiry date in the browser's certificate details, renew, and set up a monitor or calendar reminder.</p>
<h2>Problem 4: Certificate for the wrong name</h2>
<p>A certificate covers specific domain names. If it was issued for <code>example.com</code> but visitors use <code>www.example.com</code>, or a subdomain, browsers show an error. Reissue the certificate to cover every name you use, or redirect the uncovered names to a covered one.</p>
<h2>Problem 5: Mixed content</h2>
<p>The page loads over HTTPS, but some resources inside it load over HTTP: an image inserted years ago with a full http:// link, a script from an old service, a font or a stylesheet. Browsers block some of these and warn about others.</p>
<p>To find them, open the browser's developer tools (right-click, Inspect, then the Console tab) and look for "mixed content" messages. To fix them:</p>
<ul>
<li>Update hard-coded http:// links in pages, theme files and settings to https://.</li>
<li>In WordPress, a careful search-and-replace on the database can update old links. Back up first.</li>
<li>Replace or remove third-party embeds that don't support HTTPS.</li>
</ul>
<h2>After fixing it</h2>
<ul>
<li>Check several pages, including forms and checkout, in a private window.</li>
<li>Update your website address in Google Search Console, analytics and ad accounts to the https:// version.</li>
<li>Update links on your social profiles and business listings.</li>
<li>Make sure your sitemap lists https:// URLs.</li>
</ul>
<p>HTTPS is one item on a longer list; our <a href="/blog/website-security-checklist/">website security checklist</a> covers the rest.</p>
<h2>SSL questions</h2>
<p><strong>Is a free certificate as good as a paid one?</strong> For encryption, yes. Paid certificates can include extra validation or warranties that some organisations want, but browsers treat a free certificate's padlock the same way.</p>
<p><strong>Does the padlock mean my site is safe?</strong> It means the connection is encrypted. It doesn't protect the site from hacking or guarantee the business is trustworthy.</p>
<p><strong>Will moving to HTTPS hurt my rankings?</strong> Not if redirects are set up correctly. Google treats it as a site move and transfers signals to the HTTPS URLs.</p>`,
  conclution: `<p>Install, redirect, fix mixed content, then set a reminder for renewals. Most "Not Secure" warnings disappear within an hour once you know which of the five problems you have.</p>`,
}
