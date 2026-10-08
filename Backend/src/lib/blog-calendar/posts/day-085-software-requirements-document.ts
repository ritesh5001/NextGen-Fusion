import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 85,
  title: "How to write a software requirements document developers can actually quote on",
  slug: "software-requirements-document",
  excerpt: "How to write a software requirements document developers can actually quote on: the sections to include, how detailed to be, and a template you can follow.",
  category: "Custom Software",
  primaryKeyword: "software requirements document template",
  cover_image: "/projects/nextmentor/screenshot-1.png",
  introduction: `<p>A requirements document developers can quote on explains the problem, the users, what each user needs to do step by step, the data involved, the integrations, the rules and limits, and what's out of scope. It doesn't need technical language or hundreds of pages. A clear ten-page document written in plain English produces more accurate, more comparable quotes than a vague one-pager or a hundred-page specification nobody reads.</p>
<p>You don't need technical language or hundreds of pages. A clear ten-page document in plain English gets better quotes than either a vague one-pager or a huge specification nobody reads.</p>`,
  content: `<h2>Why it matters</h2>
<p>Developers estimate what they understand. Gaps become either padding (to cover risk) or change requests (when the gap is discovered). A good requirements document reduces both, and makes quotes from different teams comparable. It's the best defence against the overruns described in <a href="/blog/why-software-projects-go-over-budget/">why software projects go over budget</a>.</p>
<h2>A structure you can follow</h2>
<h3>1. Background and goals</h3>
<p>What the business does, what problem the software solves, and how you'll measure success (time saved, errors reduced, revenue enabled).</p>
<h3>2. Users and roles</h3>
<p>Every type of user: who they are, how many, what they're allowed to see and do. For example: customers, staff, managers, admins.</p>
<h3>3. User journeys</h3>
<p>The most important section. For each main task, write the steps in order: "A customer logs in, sees their open orders, selects one, uploads a document, and receives a confirmation email." Include what happens when things go wrong or need approval.</p>
<h3>4. Features list</h3>
<p>A list of features grouped by area, each marked as must-have for launch, should-have, or later. This prioritisation is what lets developers propose a sensible first version.</p>
<h3>5. Data</h3>
<p>The main things the system stores (customers, orders, products, documents) and their key fields. Where existing data will come from, and its condition.</p>
<h3>6. Integrations</h3>
<p>Every external system: accounting, payments, email, WhatsApp, CRM, ERP, government portals. For each, what data flows which way, and whether it has an API you know of.</p>
<h3>7. Business rules</h3>
<p>Calculations, approvals, limits, statuses and exceptions: "Orders over a set amount need manager approval", "Invoices are numbered per financial year".</p>
<h3>8. Non-functional requirements</h3>
<p>Expected number of users, devices (desktop, mobile, offline), languages, performance expectations, security and compliance needs, data retention.</p>
<h3>9. Reports</h3>
<p>The reports and dashboards needed, and who uses them.</p>
<h3>10. Out of scope</h3>
<p>What the project will not include. Often as valuable as the rest.</p>
<h3>11. Constraints</h3>
<p>Deadlines, budget range if you're willing to share it, preferred technologies, hosting requirements.</p>
<h3>12. Examples and attachments</h3>
<p>Screenshots of current spreadsheets or tools, sample documents, sketches of key screens, links to products you like and why.</p>
<h2>How detailed to be</h2>
<ul>
<li>Detailed on journeys, rules and priorities: these drive effort.</li>
<li>Light on visual design: show examples you like rather than specifying every colour.</li>
<li>Silent on technology unless you have a real constraint; let developers propose.</li>
</ul>
<h2>Tips for writing it</h2>
<ul>
<li>Involve the people who'll use the system; they know the exceptions.</li>
<li>Use plain language and consistent names for things.</li>
<li>Number requirements so they can be referenced in quotes and discussions.</li>
<li>Mark assumptions clearly.</li>
<li>Keep it to what the first version needs, plus a list of later ideas.</li>
</ul>
<h2>Using it to get quotes</h2>
<p>Send the same document to each developer, ask for questions before quotes, share the answers with everyone, and ask for a quote broken down by feature group with a timeline. Questions developers ask are a good sign of how carefully they read it. For build-or-buy decisions first, see <a href="/blog/off-the-shelf-vs-custom-software/">off-the-shelf vs custom software</a>; for MVP scoping, <a href="/blog/saas-mvp-cost-2026/">SaaS MVP cost</a>.</p>
<h2>Requirements questions</h2>
<p><strong>Can the developer write it for us?</strong> Many offer a paid discovery phase to do exactly this with you. It's often worth it for complex projects, and the document is yours to take to any developer.</p>
<p><strong>Will requirements change during the project?</strong> Some will. The document makes changes visible and manageable instead of invisible and expensive.</p>
<p><strong>How long should it be?</strong> Long enough to cover journeys, rules, data and integrations clearly. For most small to medium projects, a few to a couple of dozen pages.</p>`,
  conclution: `<p>The user journeys section is the one worth spending the most time on. Write each main task step by step, including what happens when it goes wrong, and most of the estimate follows from it.</p>
<p>If you'd like help writing yours, or a quote on one you already have, <a href="/contact/">send it over</a>.</p>`,
}
