import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 76,
  title: "Why software projects go over budget and deadline, and how to prevent it",
  slug: "why-software-projects-go-over-budget",
  excerpt: "Why software projects go over budget and miss deadlines, from vague scope and late decisions to hidden integrations, and the habits that keep projects on track.",
  category: "Hiring a Developer",
  primaryKeyword: "software project over budget",
  cover_image: "/projects/cleanship/screenshot-1.png",
  introduction: `<p>Software projects go over budget and deadline for predictable reasons: the scope was vague so it grew, decisions and feedback came late, integrations and data turned out harder than expected, nobody tested with real users until the end, and too much was attempted in the first release. Very few overruns come from developers simply being slow. Most are decided in the first weeks, and most can be prevented with a tighter scope, faster decisions and building in small, visible steps.</p>`,
  content: `<h2>1. Vague scope</h2>
<p>"A portal for our dealers" can mean a login and a price list, or ordering, credit limits, approvals, invoices and reports. When scope is vague, everyone fills the gaps with their own assumptions, and the gaps become extra work later.</p>
<p><strong>Prevent it:</strong> write down user types, the main workflows step by step, integrations and what's explicitly out of scope. See <a href="/blog/website-proposal-checklist/">what a proposal should include</a>.</p>
<h2>2. Scope creep</h2>
<p>Every "while we're at it" adds time. Individually reasonable, together they double a project.</p>
<p><strong>Prevent it:</strong> keep a phase-two list. New ideas go there by default unless they replace something in phase one.</p>
<h2>3. Late or slow decisions</h2>
<p>Developers waiting a week for feedback, or for someone to decide between two options, sit idle or guess. Guesses get redone.</p>
<p><strong>Prevent it:</strong> name one decision-maker, agree a feedback turnaround, and batch feedback into one list per review.</p>
<h2>4. Integrations and data</h2>
<p>Connecting to accounting software, payment gateways, ERPs or old databases is often harder than it looks: poor documentation, missing API features, messy data. Migrating data from spreadsheets usually needs cleaning first.</p>
<p><strong>Prevent it:</strong> investigate integrations and sample the data early, before the plan is fixed. Treat unknown integrations as a risk with its own budget.</p>
<h2>5. Too much in the first release</h2>
<p>Trying to launch everything at once multiplies risk and delays feedback from real users.</p>
<p><strong>Prevent it:</strong> define the smallest release that delivers real value, launch it, and learn. See <a href="/blog/saas-mvp-cost-2026/">what a SaaS MVP should leave out</a>.</p>
<h2>6. No visible progress until the end</h2>
<p>Projects reviewed only at the end discover misunderstandings when they're most expensive to fix.</p>
<p><strong>Prevent it:</strong> demos of working software every week or two, on a staging environment you can use.</p>
<h2>7. Underestimating the unglamorous parts</h2>
<p>Permissions, error handling, edge cases, testing, deployment, documentation and training all take time and are easy to leave out of estimates.</p>
<p><strong>Prevent it:</strong> ask what the estimate includes for testing, deployment and handover. Be wary of estimates that only list features.</p>
<h2>8. Changing people</h2>
<p>When developers rotate in and out, or your own project lead changes, knowledge is lost and work slows.</p>
<p><strong>Prevent it:</strong> keep a stable core team, and document decisions as you go.</p>
<h2>9. Choosing on price alone</h2>
<p>The lowest quote often reflects the narrowest reading of the scope, with the rest arriving as change requests.</p>
<p><strong>Prevent it:</strong> compare scopes line by line, not totals; see <a href="/blog/why-website-quotes-differ/">why quotes differ</a>.</p>
<h2>10. The wrong pricing model for the work</h2>
<p>A fixed price on a vague, evolving product creates conflict; open-ended hourly billing on a well-defined website removes the incentive to finish. See <a href="/blog/fixed-price-vs-hourly-development/">fixed price vs hourly vs retainer</a>.</p>
<h2>Habits of projects that finish on time</h2>
<ul>
<li>A one-page scope everyone can quote back.</li>
<li>One decision-maker and fast feedback.</li>
<li>Early investigation of integrations and data.</li>
<li>Small, frequent releases to staging, with demos.</li>
<li>A phase-two list that absorbs new ideas.</li>
<li>Honest, early conversations when something turns out harder than expected.</li>
</ul>
<h2>When a project is already over</h2>
<ol>
<li>Stop adding scope.</li>
<li>List what's left, and separate must-have-for-launch from nice-to-have.</li>
<li>Re-estimate the must-haves honestly.</li>
<li>Launch the essential version, then continue.</li>
</ol>
<h2>Overrun questions</h2>
<h3>Is some overrun normal?</h3>
<p>Some uncertainty is normal in software, especially new products, which is why contingency and phased releases help. Large overruns usually trace back to scope and decisions.</p>
<h3>Who pays for overruns on a fixed-price project?</h3>
<p>The developer, for underestimating agreed scope; you, for approved changes. A clear contract makes the line obvious.</p>
<h3>How do we know an estimate is realistic?</h3>
<p>Ask how it was built, what's included, and how similar past projects went.</p>`,
  conclution: `<p>If a project is already running over, stop adding scope before anything else. Then separate what must exist at launch from what would be nice, and launch the first list.</p>
<p>If you'd like a team that works this way from the start, <a href="/contact/">get in touch</a>.</p>`,
}
