import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 59,
  title: "Why is my contact form not sending emails? Fixing lost leads on WordPress and custom sites",
  slug: "contact-form-not-sending-emails",
  excerpt: "Contact form not sending emails? Why WordPress and custom site forms lose enquiries, how to test them, and the fixes that make form emails arrive reliably.",
  category: "Website Redesign",
  primaryKeyword: "contact form not sending emails",
  cover_image: "/projects/saurally/screenshot-1.png",
  introduction: `<p>Contact forms stop sending emails mostly because the website sends mail in a way receiving servers don't trust: straight from the web server, from an address the server isn't authorised to send for. Those emails land in spam or are rejected silently. Other causes are a changed or mistyped recipient address, a plugin or hosting change, a full mailbox, or spam protection blocking real submissions. The reliable fix is to send form emails through a proper email service with authentication, store submissions in the website as a backup, and test regularly.</p>`,
  content: `<h2>First: confirm the problem</h2>
<p>Submit a test enquiry from your site, on your phone, with a real email address. Then check:</p>
<ul>
<li>Did the form show a success message?</li>
<li>Did the email arrive in the inbox? In spam? Not at all?</li>
<li>Does the form plugin store submissions in the website's admin? If so, is your test there?</li>
</ul>
<p>If the submission is stored but the email didn't arrive, the problem is email delivery. If nothing was stored and there was an error, the form itself is broken.</p>
<h2>Why form emails go missing</h2>
<h3>1. The server sends mail without authentication</h3>
<p>By default, WordPress uses PHP's mail function to send through the web server. Email providers check whether the sending server is authorised for the domain in the "from" address. Shared hosting servers usually aren't, so messages are marked as spam or dropped. This is the most common cause.</p>
<h3>2. The "from" address is the visitor's email</h3>
<p>Some forms send "from" the visitor's address. Your web server isn't authorised to send for gmail.com or anyone else's domain, so the email fails checks. The from address should be your own domain; put the visitor's address in "reply-to".</p>
<h3>3. The recipient address is wrong or old</h3>
<p>Forms often send to an address set at build time: a former employee, the developer, or a typo.</p>
<h3>4. Something changed</h3>
<p>A hosting move, a plugin update, a new security plugin or a change to your domain's email settings can break sending without anyone noticing.</p>
<h3>5. Spam protection blocks real people</h3>
<p>Overly strict CAPTCHA or anti-spam rules can reject genuine submissions, especially on mobile.</p>
<h3>6. Your domain's email records are missing</h3>
<p>Without SPF, DKIM and DMARC records, mail claiming to come from your domain is treated with suspicion. We cover setting these up later in this series.</p>
<h2>The reliable fix</h2>
<ol>
<li><strong>Send through a transactional email service</strong> or your business email provider using SMTP or an API, instead of the web server's mail function. On WordPress, an SMTP plugin makes this straightforward.</li>
<li><strong>Authenticate your domain</strong> with the email service, adding the DNS records it gives you.</li>
<li><strong>Set the from address</strong> to an address on your domain, and reply-to to the visitor.</li>
<li><strong>Store every submission</strong> in the website's database or a CRM as a backup, so nothing is lost even if an email fails.</li>
<li><strong>Send to a shared inbox</strong> or more than one person, so enquiries don't depend on one mailbox.</li>
<li><strong>Test again</strong> to Gmail, Outlook and your own domain.</li>
</ol>
<h2>Keep it working</h2>
<ul>
<li>Test every form after updates, hosting changes and once a month.</li>
<li>Set up an automatic weekly test submission if you can.</li>
<li>Watch for a sudden drop in enquiries; it's often the first sign of a broken form.</li>
<li>Consider an auto-reply to the visitor confirming you received their message; if they don't get it, they'll often tell you.</li>
</ul>
<h2>Alternatives that reduce the risk</h2>
<p>Offer more than one way to reach you: a click-to-call number, WhatsApp and email address alongside the form. Many visitors prefer them anyway, and you won't lose every enquiry if one channel fails. For the other reasons enquiries dry up, see <a href="/blog/traffic-but-no-leads/">traffic but no leads</a>.</p>
<h2>Form email questions</h2>
<p><strong>How do I know how many enquiries I've lost?</strong> If submissions were stored on the site, compare them with what arrived in email. If not, look at form completion events in analytics, if tracked.</p>
<p><strong>Is a form plugin the problem?</strong> Rarely on its own. Most popular form plugins work; the delivery method is usually the issue.</p>
<p><strong>Should I stop using a contact form?</strong> No. Forms are useful, especially for detailed requests. Just make delivery reliable and offer alternatives.</p>`,
  conclution: `<p>Send yourself a test enquiry right now. If it doesn't arrive in your inbox within a minute, start with the fix above: send through an authenticated email service and store every submission on the site as a backup.</p>
<p>Our <a href="/services/website-maintenance-services/">maintenance team</a> can sort it if you'd rather not.</p>`,
}
