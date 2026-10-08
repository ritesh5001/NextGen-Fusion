import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 75,
  title: "Your emails land in spam: setting up SPF, DKIM and DMARC for your domain",
  slug: "spf-dkim-dmarc-setup",
  excerpt: "Your emails land in spam? How to set up SPF, DKIM and DMARC for your domain, what each one does, how to check them, and the mistakes that break email delivery.",
  category: "Website Maintenance",
  primaryKeyword: "emails going to spam spf dkim dmarc",
  cover_image: "/projects/hcbengineering/screenshot-1.png",
  introduction: `<p>If emails from your domain land in spam, missing or broken SPF, DKIM and DMARC records are a common cause. SPF lists the servers allowed to send email for your domain, DKIM adds a digital signature proving messages weren't altered, and DMARC tells receiving servers what to do with mail that fails those checks and sends you reports. Gmail and Yahoo now require authentication for bulk senders, and every major provider uses these checks to decide what reaches the inbox.</p>
<p>If you've ever had a client say your email went to spam, this is usually why.</p>`,
  content: `<h2>Why authentication matters</h2>
<p>Anyone can put your address in the "from" field of an email. Authentication lets receiving servers check whether a message really came from a server you authorised. Without it, your real emails look the same as forgeries and are more likely to be filtered, and criminals can more easily send phishing emails pretending to be you. Google's <a href="https://support.google.com/a/answer/81126" rel="noopener">email sender guidelines</a> set out what Gmail expects.</p>
<h2>SPF: who's allowed to send</h2>
<p>SPF is a DNS TXT record listing the services that send email for your domain: your email provider, your website's email service, your newsletter tool, your CRM.</p>
<ul>
<li>There must be only <strong>one</strong> SPF record per domain. Two records break SPF entirely; combine them.</li>
<li>Include every service that sends as your domain.</li>
<li>SPF has a limit on the number of DNS lookups it can trigger; too many includes cause failures.</li>
<li>End with a policy: <code>~all</code> (soft fail) or <code>-all</code> (fail) for mail from unlisted servers.</li>
</ul>
<h2>DKIM: a signature on every message</h2>
<p>DKIM adds a cryptographic signature to each email, checked against a public key published in your DNS. Each sending service (Google Workspace, Microsoft 365, your email marketing tool, your transactional email service) gives you its own DKIM record to add. Turn on DKIM signing in each service after adding the record.</p>
<h2>DMARC: the policy and the reports</h2>
<p>DMARC is a DNS TXT record at <code>_dmarc.yourdomain.com</code>. It says what receivers should do when a message fails authentication and alignment, and where to send reports. See <a href="https://dmarc.org/" rel="noopener">dmarc.org</a> for the specification.</p>
<ul>
<li>Start with <code>p=none</code> to monitor without affecting delivery, and a reporting address.</li>
<li>Read the reports (a DMARC reporting service makes them readable) to find every legitimate service sending as your domain.</li>
<li>Fix SPF and DKIM for each one.</li>
<li>Move to <code>p=quarantine</code>, then <code>p=reject</code>, once legitimate mail passes, so forgeries are blocked.</li>
</ul>
<h2>Alignment: the part people miss</h2>
<p>DMARC requires the domain in the visible "from" address to match (align with) the domain authenticated by SPF or DKIM. A newsletter tool that signs with its own domain may pass DKIM but fail DMARC alignment. Set up custom DKIM for your domain in each service so they align.</p>
<h2>Setting it up, step by step</h2>
<ol>
<li><strong>List every service that sends email as your domain:</strong> mailboxes, website forms, store notifications, CRM, newsletters, invoicing, support desk.</li>
<li><strong>Build one SPF record</strong> including all of them.</li>
<li><strong>Add DKIM records</strong> for each service and enable signing.</li>
<li><strong>Add a DMARC record</strong> with <code>p=none</code> and a reporting address.</li>
<li><strong>Send test emails</strong> to Gmail and Outlook and check the message headers for SPF, DKIM and DMARC "pass".</li>
<li><strong>Watch DMARC reports</strong> for a few weeks, fix stragglers, then tighten the policy.</li>
</ol>
<h2>Common mistakes</h2>
<ul>
<li>Two SPF records after adding a new service.</li>
<li>Forgetting the website's form emails, which then fail; see <a href="/blog/contact-form-not-sending-emails/">contact form not sending emails</a>.</li>
<li>Jumping straight to <code>p=reject</code> and blocking your own legitimate mail.</li>
<li>DNS changes made at the wrong provider when nameservers point elsewhere.</li>
<li>Website forms sending "from" visitors' addresses, which can never pass.</li>
</ul>
<h2>Beyond authentication</h2>
<p>Authentication gets you considered for the inbox; behaviour keeps you there. Send only to people who expect your email, make unsubscribing easy, keep complaint rates low, and avoid sudden huge volumes from a new domain.</p>
<h2>Email authentication questions</h2>
<p><strong>Do I need all three?</strong> Yes, for reliable delivery today, especially if you send any volume.</p>
<p><strong>Will DMARC stop my emails being spoofed?</strong> At <code>p=reject</code>, receivers that honour DMARC will reject forged mail using your exact domain.</p>
<p><strong>How long do DNS changes take?</strong> Often minutes to a few hours, depending on the record's time-to-live settings.</p>`,
  conclution: `<p>Start DMARC in monitoring mode and let the reports tell you which services send as your domain. You'll almost certainly find one you'd forgotten about.</p>
<p>We set this up as part of our <a href="/services/website-maintenance-services/">maintenance work</a>; message us on WhatsApp at +91 73482 28167 if your emails are landing in spam.</p>`,
}
