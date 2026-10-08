import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 74,
  title: "Building a custom CRM or ERP for your business: features, cost and timeline",
  slug: "custom-crm-erp-development",
  excerpt: "Building a custom CRM or ERP for your business: when it makes sense, the features to start with, what drives cost and timeline, and how to roll it out.",
  category: "Custom Software",
  primaryKeyword: "custom crm development cost",
  cover_image: "/projects/maribiz-ai/screenshot-1.png",
  introduction: `<p>A custom CRM or ERP makes sense when your sales or operations process is different from what standard software supports, when you're paying for several tools stitched together with spreadsheets, or when per-user subscription costs have become large and the system is central to how you work. The successful projects start small: one core workflow built properly, used daily, then extended. The failed ones try to replace everything at once.</p>
<p>Price lists aren't something we publish, because they depend entirely on scope. This post covers when to build, what to start with, what drives the cost and timeline, and how to roll it out.</p>`,
  content: `<h2>CRM vs ERP in plain terms</h2>
<ul>
<li><strong>CRM (customer relationship management):</strong> leads, contacts, deals, follow-ups, quotes, customer history.</li>
<li><strong>ERP (enterprise resource planning):</strong> operations: inventory, purchasing, production, orders, invoicing, sometimes HR and accounting.</li>
</ul>
<p>Many small businesses need a bit of both in one system, built around their own process.</p>
<h2>When custom is the right call</h2>
<ul>
<li>Your quoting, production or service process doesn't fit standard tools without heavy workarounds.</li>
<li>Staff re-type data between several systems and spreadsheets.</li>
<li>You need a portal where clients, dealers or field staff interact with the same data.</li>
<li>Standard tools charge per user and your team is large or growing.</li>
<li>Your process is a competitive advantage you don't want to bend to someone else's software.</li>
</ul>
<p>If those don't apply, a standard CRM or ERP, perhaps with a custom integration, is usually the better choice. We explain the trade-off in <a href="/blog/off-the-shelf-vs-custom-software/">off-the-shelf vs custom software</a>, and the warning signs in <a href="/blog/outgrown-excel-spreadsheets/">outgrown Excel</a>.</p>
<h2>What to build first</h2>
<p>Pick the workflow that causes the most pain or carries the most revenue, and build only that, properly:</p>
<ul>
<li><strong>Sales-led businesses:</strong> lead capture from all channels, pipeline stages, follow-up reminders, quote generation.</li>
<li><strong>Product businesses:</strong> orders from all channels, stock levels, dispatch and invoicing.</li>
<li><strong>Service businesses:</strong> job intake, scheduling, field staff updates, completion and billing.</li>
</ul>
<p>Plus the foundations every system needs: user roles and permissions, an audit trail of changes, search, exports and a few key reports.</p>
<h2>What drives cost and timeline</h2>
<ul>
<li><strong>Number of workflows and screens.</strong></li>
<li><strong>User roles</strong> and how differently each sees the system.</li>
<li><strong>Integrations:</strong> accounting software, payment gateways, WhatsApp, email, e-commerce platforms, government e-invoicing or GST systems where relevant.</li>
<li><strong>Data migration</strong> from spreadsheets and old systems, including clean-up.</li>
<li><strong>Reporting</strong> requirements.</li>
<li><strong>Mobile access</strong> for field staff: responsive web app, PWA or native app.</li>
<li><strong>Offline needs</strong> for staff in areas with poor connectivity.</li>
</ul>
<p>A focused first version is typically weeks to a few months; larger systems grow over phases.</p>
<h2>How to roll it out</h2>
<ol>
<li><strong>Map the current process</strong> with the people who do it, including the exceptions.</li>
<li><strong>Agree the first workflow</strong> and what success looks like (time saved, errors reduced).</li>
<li><strong>Clean and migrate the data</strong> for that workflow.</li>
<li><strong>Pilot with a small group,</strong> fix what they find, then roll out to everyone.</li>
<li><strong>Switch off the old spreadsheet</strong> so there's one source of truth.</li>
<li><strong>Add the next workflow</strong> once the first is used daily.</li>
</ol>
<h2>Common mistakes</h2>
<ul>
<li>Trying to replicate every spreadsheet column instead of rethinking the process.</li>
<li>Designing without the people who'll use it daily.</li>
<li>Building everything before anyone uses anything.</li>
<li>Skipping training and documentation.</li>
<li>No owner inside the business for decisions and priorities.</li>
</ul>
<h2>Ownership and the long term</h2>
<p>Make sure you own the code and data, hosted in accounts in your company's name, with documentation. Plan for ongoing development: a good CRM or ERP evolves with the business. See <a href="/blog/fixed-price-vs-hourly-development/">fixed price vs hourly vs retainer</a> for how to structure that.</p>
<h2>CRM and ERP questions</h2>
<h3>Can it connect to our accounting software?</h3>
<p>Usually, through the accounting software's API. Check which system will be the source of truth for invoices and payments.</p>
<h3>Will staff actually use it?</h3>
<p>If it's built around their real work, saves them effort from day one and replaces the old tools completely, yes.</p>
<h3>Is it secure?</h3>
<p>It should have role-based access, audit logs, backups and secure hosting from the start. Ask how each is handled.</p>`,
  conclution: `<p>Build one workflow properly, get people using it every day, and switch off the spreadsheet it replaces. Then build the next one. Systems built that way get used; systems built all at once often don't.</p>
<p>If you'd like help scoping a first version, see our <a href="/services/software-development-services/">custom software development services</a>.</p>`,
}
