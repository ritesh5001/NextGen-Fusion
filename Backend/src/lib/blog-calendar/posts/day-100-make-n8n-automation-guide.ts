import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 100,
  title: "Connecting your website, CRM and email with Make.com or n8n: a beginner's automation guide",
  slug: "make-n8n-automation-guide",
  excerpt: "Connecting your website, CRM and email with Make.com or n8n: a beginner's guide to triggers, actions, first workflows and avoiding fragile setups.",
  category: "AI & Automation",
  primaryKeyword: "make.com n8n automation guide",
  cover_image: "/projects/maribiz-ai/screenshot-1.png",
  introduction: `<p>Make.com and n8n let you connect your website, CRM, email, spreadsheets, WhatsApp and other tools without writing much code. You build workflows from a trigger (a form submitted, an order placed, a row added) and actions (create a CRM contact, send an email, post a message to your team). Make is a hosted, visual tool that's quick to start with. n8n is also visual, can be self-hosted for more control over data and cost, and suits teams comfortable with a bit of technical setup. Both are excellent for removing repetitive copy-and-paste work between tools.</p>`,
  content: `<h2>How automation platforms work</h2>
<ul>
<li><strong>Trigger:</strong> the event that starts a workflow, such as a new form submission, a new order, a scheduled time or a webhook.</li>
<li><strong>Actions:</strong> what happens next, such as creating a record, sending a message, updating a sheet or calling an API.</li>
<li><strong>Logic:</strong> filters, conditions and branches ("only if the order is over a set value", "if the lead is from Mumbai, assign to this person").</li>
<li><strong>Data mapping:</strong> choosing which field from one app goes into which field in another.</li>
</ul>
<h2>Make.com vs n8n</h2>
<table>
<thead><tr><th></th><th>Make.com</th><th>n8n</th></tr></thead>
<tbody>
<tr><td>Hosting</td><td>Hosted by Make</td><td>Cloud version, or self-hosted on your own server</td></tr>
<tr><td>Ease of start</td><td>Very quick, highly visual</td><td>Visual, slightly more technical</td></tr>
<tr><td>Pricing model</td><td>Based on operations used</td><td>Cloud plans by usage; self-hosting costs your server and upkeep</td></tr>
<tr><td>Data control</td><td>Data passes through Make's servers</td><td>Self-hosting keeps data on your infrastructure</td></tr>
<tr><td>Custom code</td><td>Possible within limits</td><td>Strong support for custom code and APIs</td></tr>
</tbody>
</table>
<p>n8n's <a href="https://docs.n8n.io/" rel="noopener">documentation</a> covers self-hosting and its integrations in detail; Make publishes similar guides in its help centre.</p>
<h2>Good first workflows</h2>
<ol>
<li><strong>Website form to CRM and team alert:</strong> a new enquiry creates a CRM contact and notifies the right person on email, Slack or WhatsApp.</li>
<li><strong>New order to accounting:</strong> a store order creates an invoice in your accounting software.</li>
<li><strong>Lead follow-up reminders:</strong> if a lead hasn't been contacted within a set time, alert a manager; see <a href="/blog/automate-lead-follow-up/">automating lead follow-up</a>.</li>
<li><strong>Review requests:</strong> a set number of days after delivery, send a polite review request.</li>
<li><strong>Weekly summary:</strong> pull key numbers from several tools into one email or message.</li>
<li><strong>AI steps:</strong> summarise an enquiry, classify it, or draft a reply for a person to approve; see <a href="/blog/tasks-to-automate-with-ai/">tasks to automate with AI</a>.</li>
</ol>
<h2>Building your first workflow</h2>
<ol>
<li>Write the process in plain words: "When X happens, do Y, then Z, unless...".</li>
<li>Connect the apps with accounts owned by your business, not a personal login.</li>
<li>Build the trigger and test it with real sample data.</li>
<li>Add actions one at a time, testing each.</li>
<li>Add filters and error handling.</li>
<li>Turn it on, and watch the first few runs closely.</li>
</ol>
<h2>Avoiding fragile automations</h2>
<ul>
<li><strong>Handle errors:</strong> set up alerts when a workflow fails, so problems don't go unnoticed for weeks.</li>
<li><strong>Avoid duplicates:</strong> check whether a record exists before creating it, since triggers can fire twice.</li>
<li><strong>Document workflows:</strong> what each does, who owns it, which accounts it uses.</li>
<li><strong>Use business accounts and shared credentials management,</strong> so workflows don't break when someone leaves.</li>
<li><strong>Keep workflows small</strong> and focused, rather than one giant workflow doing everything.</li>
<li><strong>Review monthly:</strong> app updates and changed fields can break mappings silently.</li>
</ul>
<h2>Respect data and consent</h2>
<p>Automations move personal data between systems. Send only what's needed, follow consent rules for marketing messages, and check where each tool stores data, especially for customers in regions with strict privacy laws.</p>
<h2>When to move beyond no-code</h2>
<p>When workflows become business-critical, handle high volumes, need complex logic or must meet strict reliability requirements, a custom integration built and monitored like software may be more dependable. Many businesses keep no-code tools for simple flows and custom code for core ones.</p>
<h2>Make and n8n questions</h2>
<h3>Do I need a developer?</h3>
<p>Not for simple workflows. For self-hosting n8n, complex logic or custom API connections, a developer helps.</p>
<h3>Will automations break when apps update?</h3>
<p>Sometimes. Error alerts and monthly reviews catch it early.</p>
<h3>Which is cheaper?</h3>
<p>It depends on volume. At low volume, hosted plans are simple; at high volume, self-hosted n8n can be cheaper if you can maintain it.</p>`,
  conclution: `<p>Start with one boring, repetitive process, build it small with error alerts and business-owned accounts, and grow from there. That's how automations stay useful instead of quietly breaking.</p>
<p>If you'd like your website, CRM and email connected properly, see our <a href="/services/api-integration-services/">API integration services</a>.</p>`,
}
