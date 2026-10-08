import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 41,
  title: "What is multi-tenant SaaS architecture? Explained for non-technical founders",
  slug: "multi-tenant-saas-explained",
  excerpt: "What is multi-tenant SaaS architecture? A plain-English guide for non-technical founders: how customers share one system safely, and the key choices.",
  category: "Custom Software",
  primaryKeyword: "multi tenant saas architecture",
  cover_image: "/projects/maribiz-ai/screenshot-1.png",
  introduction: `<p>Multi-tenant architecture means one copy of your software serves many customer organisations (tenants) at once, with each one's data kept separate and private. It's how most SaaS products work: every customer logs into the same application, running on the same servers, but sees only their own company's data and settings. It's cheaper to run and easier to update than giving every customer their own copy, but it has to be designed carefully from the start, because a mistake in data separation means one customer seeing another's data.</p>`,
  content: `<h2>An everyday analogy</h2>
<p>Think of an office building. Single-tenant is giving every company its own building: private, but expensive to build and maintain, and every building needs its own repairs. Multi-tenant is one building with many offices: shared lifts, wiring and security, cheaper for everyone, and one maintenance team improves the whole building at once. The locks on each office door are what keep it working, and in software, those locks are the data separation.</p>
<h2>Why most SaaS products are multi-tenant</h2>
<ul>
<li><strong>Lower running costs:</strong> one set of servers and one database system serve everyone.</li>
<li><strong>One update for everyone:</strong> fix a bug or release a feature once.</li>
<li><strong>Easy onboarding:</strong> a new customer is a new tenant record, not a new installation.</li>
<li><strong>Simpler operations:</strong> one system to monitor, back up and secure.</li>
</ul>
<h2>The three main ways to separate tenant data</h2>
<table>
<thead><tr><th>Approach</th><th>How it works</th><th>Trade-offs</th></tr></thead>
<tbody>
<tr><td>Shared database, shared tables</td><td>Every row of data carries a tenant ID; every query filters by it</td><td>Cheapest and simplest to scale; separation depends on getting every query right</td></tr>
<tr><td>Shared database, separate schemas</td><td>Each tenant gets its own set of tables inside one database</td><td>Stronger separation; more complex migrations as tenants grow</td></tr>
<tr><td>Separate database per tenant</td><td>Each tenant has its own database</td><td>Strongest isolation, easier per-customer backups; most expensive and complex to operate</td></tr>
</tbody>
</table>
<p>Many products use the first approach for most customers and offer separate databases to large or regulated customers who require it.</p>
<h2>How separation is enforced</h2>
<p>In the shared-table approach, the risk is a query that forgets to filter by tenant. Good systems don't rely on every developer remembering every time. They enforce it centrally: in the data access layer, or in the database itself with features such as row-level security, so a query physically can't return another tenant's rows. Ask your developers which they use.</p>
<h2>Other things multi-tenancy affects</h2>
<ul>
<li><strong>Logins and roles:</strong> users belong to a tenant and have roles within it (owner, admin, staff).</li>
<li><strong>Settings and branding:</strong> per-tenant logos, colours, custom domains and feature switches.</li>
<li><strong>Billing:</strong> plans and limits per tenant, such as users, projects or storage.</li>
<li><strong>Noisy neighbours:</strong> one very busy tenant shouldn't slow everyone else. Rate limits and sensible database design help.</li>
<li><strong>Data export and deletion:</strong> you'll need to export or delete one tenant's data cleanly, for customers leaving and for privacy laws.</li>
<li><strong>Backups and restores:</strong> restoring one tenant's data without affecting others is harder in shared tables. Plan for it.</li>
</ul>
<h2>Why it matters to design it early</h2>
<p>Adding multi-tenancy to a product built for one customer is one of the more painful rebuilds in software: every table, query, permission and report has to change. If you plan to sell to many organisations, design for it from the first version, even if the first version only has a handful of customers. It's part of what we scope in an MVP; see <a href="/blog/saas-mvp-cost-2026/">what a SaaS MVP costs in 2026</a>.</p>
<h2>Questions to ask your developers</h2>
<ol>
<li>Which tenancy model are you using, and why for our product?</li>
<li>How is tenant separation enforced: in every query, centrally, or in the database?</li>
<li>How do we test that one tenant can never see another's data?</li>
<li>How would we offer a dedicated database to a large customer later?</li>
<li>How do we export or delete one tenant's data?</li>
<li>How do we stop one heavy tenant from slowing the others?</li>
</ol>
<h2>Founder questions about multi-tenancy</h2>
<p><strong>Is multi-tenant less secure than single-tenant?</strong> Not if it's designed well. The risks are different: shared systems need strong separation and testing, while separate installations need every copy kept patched.</p>
<p><strong>Can a multi-tenant product support custom features for one customer?</strong> Yes, through feature switches and configuration. Avoid building one-off code branches for individual customers; they make every future update harder.</p>
<p><strong>Do customers care how it's built?</strong> Larger ones do. Enterprise buyers often ask about data isolation in security questionnaires, so it helps to have clear answers.</p>`,
  conclution: `<p>Multi-tenancy is one of those decisions that's cheap to get right at the start and painful to add later. If you're building for more than one organisation, design for it from the first version.</p>
<p>Our <a href="/services/software-development-services/">software team</a> builds SaaS products this way.</p>`,
}
