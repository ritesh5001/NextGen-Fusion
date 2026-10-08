import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 48,
  title: "My web developer disappeared: how to recover your website, domain and hosting access",
  slug: "developer-disappeared-recover-website",
  excerpt: "Web developer disappeared? How to recover your domain, hosting and website access step by step, and how to make sure it never happens again.",
  category: "Website Redesign",
  primaryKeyword: "web developer disappeared",
  cover_image: "/projects/kalamohini/screenshot-1.png",
  introduction: `<p>If your web developer has disappeared, recover control in this order: the domain first (because it controls your website and email), then the hosting, then the website's admin access, then the connected accounts like analytics and Search Console. Most of these can be recovered if the accounts are in your company's name or you can prove ownership. When they're in the developer's name, it's harder but usually still possible with the right documents and patience.</p>`,
  content: `<h2>Step 1: Don't panic, and don't change anything yet</h2>
<p>If the site is working, leave it alone while you regain access. A broken site with no access is much worse than a working site with no access. Collect what you have: invoices, emails with the developer, any logins you've ever received, and your company documents.</p>
<h2>Step 2: Find out where everything is</h2>
<ul>
<li><strong>Domain registrar:</strong> a WHOIS lookup on your domain shows the registrar (the company it's registered with), even when owner details are hidden.</li>
<li><strong>Hosting:</strong> the domain's DNS records and the website's IP address usually reveal the hosting company.</li>
<li><strong>Platform:</strong> is it WordPress, Shopify, Wix, a custom build? Viewing the page source often tells you.</li>
<li><strong>Email:</strong> who handles your email? Check the MX records in DNS.</li>
</ul>
<h2>Step 3: Recover the domain</h2>
<p>The domain is the most important asset. Contact the registrar's support:</p>
<ul>
<li>If the domain is registered to your company or your email, use the registrar's account recovery and prove your identity.</li>
<li>If it's registered to the developer, explain the situation and ask about their ownership dispute or transfer process. They'll usually want proof that the business is the rightful owner: invoices for the domain or website, company registration documents, and evidence of long use of the domain by your business.</li>
<li>Watch the expiry date. If it's close, ask the registrar how renewal works while you sort out ownership. An expired domain can be lost.</li>
</ul>
<h2>Step 4: Recover the hosting</h2>
<p>Contact the hosting company. If the account is in your name, recover it through their process. If it's under the developer's account, especially a reseller account with many clients, the host may need the developer's permission or a formal process. Ask whether they can provide a backup of your site's files and database, or move your site into an account in your name.</p>
<p>If you can't get the hosting at all, a copy of the site may still be possible from the live site itself for simple sites, or from a recent backup if one exists anywhere.</p>
<h2>Step 5: Recover website admin access</h2>
<ul>
<li><strong>WordPress:</strong> if you have hosting or database access, a new admin user or password reset can be set there. Otherwise use "Lost your password" with any admin email you control.</li>
<li><strong>Shopify:</strong> the store owner account can be recovered through Shopify support with proof of ownership. If the developer is the store owner, ask Shopify about transferring ownership.</li>
<li><strong>Custom builds:</strong> you'll need the code repository and server access. Without the code, rebuilding may be the only option.</li>
</ul>
<h2>Step 6: Recover connected accounts</h2>
<ul>
<li><strong>Google Search Console:</strong> verify ownership yourself using DNS once you control the domain; you can then remove old owners.</li>
<li><strong>Google Analytics and tag manager:</strong> if you can't get admin access, create new properties under your account and update the tags.</li>
<li><strong>Google Business Profile, ad accounts, payment gateways:</strong> recover through each service's support, using business documents.</li>
</ul>
<h2>Step 7: Secure everything</h2>
<p>Once you're in, change every password, remove the old developer's users, turn on two-factor authentication, set up backups you control, and document where everything is. Then work through our <a href="/blog/website-security-checklist/">website security checklist</a>.</p>
<h2>Never again: what to have in place</h2>
<ul>
<li>Every account in your company's name and email: domain, hosting, platform, analytics, ad accounts.</li>
<li>Developers added as users, never owners.</li>
<li>A shared document listing every account, its owner and where it's hosted.</li>
<li>Backups stored somewhere you control.</li>
<li>A contract stating you own the code and content, with handover obligations.</li>
</ul>
<p>We explain each of these in <a href="/blog/who-owns-your-website/">who should own your website's domain, code and hosting</a>.</p>
<h2>Recovery questions</h2>
<h3>Can the developer legally keep my domain?</h3>
<p>It depends on the agreement and local law. Registrars and dispute processes generally look at who has paid for and used the domain. Get legal advice if the domain is valuable and the developer refuses to cooperate.</p>
<h3>What if the site is down and I can't get access?</h3>
<p>If you control the domain, you can point it at a new site, even a simple temporary one, while you rebuild or recover the old one.</p>
<h3>Is it worth rebuilding instead?</h3>
<p>Sometimes. If access is impossible or the old site was outdated anyway, rebuilding on accounts you own can be faster. Keep the domain either way.</p>`,
  conclution: `<p>Domain first, always. Everything else can be rebuilt; a lost domain takes your website and your email with it.</p>
<p>If you're stuck mid-recovery, our <a href="/services/website-maintenance-services/">maintenance team</a> can help you work through it. Message us on WhatsApp at +91 73482 28167.</p>`,
}
