import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 84,
  title: "SaaS dashboard UI design: making complex data easy to read and act on",
  slug: "saas-dashboard-ui-design",
  excerpt: "SaaS dashboard UI design: how to make complex data easy to read and act on, with clear priorities, sensible charts, good empty states and fast performance.",
  category: "UX & Conversion",
  primaryKeyword: "saas dashboard ui design",
  cover_image: "/projects/sitaravastram/screenshot-1.png",
  introduction: `<p>A good SaaS dashboard answers the questions its users come with, in order of importance, and makes the next action obvious. That means deciding what each type of user needs to know first, showing a few key numbers clearly instead of every metric available, choosing charts that match the question, handling empty and loading states well, and keeping the interface fast. Most cluttered dashboards come from adding every possible metric because it was easy to add.</p>`,
  content: `<h2>Start with the user's questions</h2>
<p>For each type of user, list the questions they open the dashboard to answer. A sales manager: "Are we on target this month? Which deals need attention?" An operations lead: "What's late? What's stuck?" A customer of your product: "Is my account healthy? What should I do next?" Design for those questions, not for the data you happen to have.</p>
<h2>Establish a hierarchy</h2>
<ul>
<li><strong>Top:</strong> the two to four numbers that matter most, with context: compared with last period, target or expected range.</li>
<li><strong>Middle:</strong> trends and breakdowns that explain those numbers.</li>
<li><strong>Bottom or linked:</strong> detailed tables and lists for digging deeper.</li>
</ul>
<p>Not everything belongs on the main dashboard. Detail can live one click away.</p>
<h2>Numbers need context</h2>
<p>"1,240 orders" means little alone. "1,240 orders, up 8% on last month, 92% of target" tells a story. Show comparisons, targets and direction, and use colour sparingly to signal status: green for on track, amber for attention, red for problems. Never rely on colour alone; add text or icons for colour-blind users.</p>
<h2>Choose the right chart</h2>
<table>
<thead><tr><th>Question</th><th>Good chart</th></tr></thead>
<tbody>
<tr><td>How is this changing over time?</td><td>Line chart</td></tr>
<tr><td>How do categories compare?</td><td>Bar chart, sorted</td></tr>
<tr><td>What's the share of a whole?</td><td>Stacked bar, or a pie only for a few categories</td></tr>
<tr><td>Where are we against a target?</td><td>Progress bar or bullet chart</td></tr>
<tr><td>What exactly are the values?</td><td>A table</td></tr>
</tbody>
</table>
<p>Avoid 3D charts, too many colours and decorative chart types that are hard to read.</p>
<h2>Make it actionable</h2>
<ul>
<li>Link numbers to the underlying records ("12 overdue invoices" opens that list).</li>
<li>Surface items needing attention: alerts, overdue tasks, anomalies.</li>
<li>Offer the next step directly: follow up, approve, assign.</li>
</ul>
<h2>Filters and time ranges</h2>
<p>Provide sensible defaults (this month, my team) and simple filters for date range and key dimensions. Remember users' last choices. Too many filters shown at once overwhelm; put advanced ones behind a toggle.</p>
<h2>Empty, loading and error states</h2>
<ul>
<li><strong>Empty states</strong> for new users should explain what will appear and how to get started, not show blank charts.</li>
<li><strong>Loading states</strong> should keep the layout stable (skeletons rather than jumping content).</li>
<li><strong>Errors</strong> should say what failed and what to do, without breaking the whole dashboard.</li>
</ul>
<h2>Performance</h2>
<p>Dashboards often query a lot of data. Slow dashboards don't get used. Pre-calculate expensive totals, load sections independently, paginate large tables and cache where data allows. If the app is slowing as data grows, see <a href="/blog/web-app-slow-scaling/">why web apps slow down as users grow</a>.</p>
<h2>Roles and multi-tenancy</h2>
<p>Different roles need different dashboards, or different defaults. In SaaS products, every number must be scoped to the user's organisation and permissions; see <a href="/blog/multi-tenant-saas-explained/">multi-tenant SaaS explained</a>.</p>
<h2>Exports and sharing</h2>
<p>People take dashboard numbers into meetings, reports and spreadsheets. Make it easy: export tables to CSV or Excel, download charts, and share a link to a filtered view. Scheduled email summaries of the key numbers often get more attention than the dashboard itself, because they arrive where people already are.</p>
<h2>Test with real users</h2>
<p>Give users their real questions as tasks ("find which client is most overdue") and watch them. Where they hesitate, the design needs work. Track which widgets are used; remove the ones nobody looks at. For broader principles, see <a href="/blog/ux-design-for-business-owners/">UX design explained</a>.</p>
<h2>Dashboard questions</h2>
<h3>Should users be able to customise dashboards?</h3>
<p>Some customisation helps power users, but good defaults matter more. Most users never customise.</p>
<h3>How many metrics should be on the main screen?</h3>
<p>As few as answer the main questions, usually a handful, with detail one click away.</p>
<h3>Mobile dashboards?</h3>
<p>Prioritise the top numbers and alerts for mobile; full analysis usually happens on larger screens.</p>`,
  conclution: `<p>Every number on a dashboard should answer a question somebody actually asks. If nobody can name the question, the number can probably go.</p>
<p>We design and build dashboards as part of our <a href="/services/software-development-services/">software development work</a>.</p>`,
}
