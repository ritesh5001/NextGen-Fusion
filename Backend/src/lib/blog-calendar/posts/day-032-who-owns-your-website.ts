import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 32,
  title: "Who should own your website's domain, code and hosting? Avoiding vendor lock-in",
  slug: "who-owns-your-website",
  excerpt: "Who should own your website's domain, code and hosting? How vendor lock-in happens, what to put in your contract, and how to check what you own today.",
  category: "Hiring a Developer",
  primaryKeyword: "who owns my website code",
  cover_image: "/projects/clickngreet/screenshot-1.png",
  introduction: `<p>Your business should own everything that makes up its website: the domain name, the hosting account, the code and designs, the content, and every connected account such as analytics, Search Console, email, payment gateways and ad accounts. Your developer should have access, not ownership. When the developer owns the accounts, you're locked in: changing provider, or recovering from a provider who disappears, becomes difficult, slow and sometimes impossible.</p>
<p>Lock-in rarely starts with bad intentions. It usually starts with an account set up “for convenience” and never moved.</p>`,
  content: `<h2>What "owning your website" actually means</h2>
<table>
<thead><tr><th>Asset</th><th>Who should own it</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Domain name</td><td>Your company, in its own registrar account</td><td>Whoever controls the domain controls your website and email</td></tr>
<tr><td>Hosting</td><td>Your company's account, with developer access</td><td>Without it you can't move the site or get backups</td></tr>
<tr><td>Code and design</td><td>Your company, by written agreement</td><td>You need the right to change, move and reuse it</td></tr>
<tr><td>Content and images</td><td>Your company, with licences for stock material</td><td>Text and photos are your marketing assets</td></tr>
<tr><td>Code repository</td><td>Your company's account, if the site is custom-built</td><td>The source code and its history</td></tr>
<tr><td>Analytics, Search Console, tag manager</td><td>Your company, developer added as a user</td><td>Years of data about your customers and traffic</td></tr>
<tr><td>Payment gateway, ad accounts, email services</td><td>Your company</td><td>Money and customer data flow through them</td></tr>
</tbody>
</table>
<h2>How lock-in happens</h2>
<p>Usually not through bad intent. It happens through convenience:</p>
<ul>
<li>"We'll register the domain for you" puts it in the agency's account.</li>
<li>The site goes on the agency's shared hosting account alongside other clients.</li>
<li>Analytics is set up under the developer's Google account.</li>
<li>The site is built on a proprietary platform only that agency uses.</li>
<li>Premium plugins run on the agency's licence, which stops updating when you leave.</li>
<li>The contract is silent on who owns the code.</li>
</ul>
<p>Each one is harmless while the relationship is good. When it ends, they all become problems at once.</p>
<h2>What to put in writing</h2>
<ul>
<li>On payment, all rights in the website, code, designs and content transfer to your company.</li>
<li>Domain, hosting and all accounts are registered to your company, using your company's email.</li>
<li>Licensed components (themes, plugins, fonts, stock images) are listed, with whose licence they're under.</li>
<li>At the end of the engagement, the developer hands over all credentials, files, database exports and documentation.</li>
<li>Any proprietary tools the developer keeps are named, with what happens if you leave.</li>
</ul>
<p>These belong in the proposal; see our <a href="/blog/website-proposal-checklist/">website proposal checklist</a> for the other items to check.</p>
<h2>How to check what you own today</h2>
<ol>
<li><strong>Domain:</strong> look up your domain's registrar, then log in to that registrar yourself. If you can't, find out whose account it's in.</li>
<li><strong>Hosting:</strong> do you have your own login to the hosting control panel and billing?</li>
<li><strong>Website admin:</strong> do you have an administrator account, not just an editor account?</li>
<li><strong>Analytics and Search Console:</strong> are you an owner or administrator, not just a viewer?</li>
<li><strong>Code:</strong> for custom sites, do you have access to the repository?</li>
<li><strong>Email:</strong> who controls the DNS records that make your email work?</li>
</ol>
<p>Fix gaps while the relationship is good. Asking a current developer to transfer accounts is easy; asking a former one can be much harder. We'll cover recovering access when a developer disappears later in this series.</p>
<h2>What's reasonable for a developer to keep</h2>
<ul>
<li>Their own internal tools, starter frameworks or reusable code libraries, as long as you have a licence to use what's in your site.</li>
<li>The right to show your project in their portfolio, if you agree.</li>
<li>Access only for as long as they're working for you.</li>
</ul>
<h2>Ownership questions</h2>
<h3>Is it unusual for an agency to register the domain in its name?</h3>
<p>It happens a lot, often for convenience. It's still worth correcting: a domain is one of your most important business assets.</p>
<h3>Does using Shopify or Wix mean I don't own my site?</h3>
<p>You own your content, data and domain; the platform owns the software it runs on. Moving off means rebuilding the design, but your data can be exported.</p>
<h3>Do I own the code if I paid for it?</h3>
<p>Not automatically everywhere. Ownership of code depends on your contract and local law, so make sure the agreement states it clearly.</p>`,
  conclution: `<p>Spend ten minutes today checking who owns your domain and hosting accounts. If it isn't your company, fix it while everyone is still on good terms. With us, everything is set up in your company's name from the first day; <a href="/contact/">get in touch</a> if you'd like to talk about a project.</p>`,
}
