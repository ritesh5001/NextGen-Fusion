import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 8,
  title: "Off-the-shelf vs custom software: when building your own actually makes sense",
  slug: "off-the-shelf-vs-custom-software",
  excerpt: "Off-the-shelf or custom software? When ready-made tools are the right call, when building your own makes sense, and the hybrid most businesses miss.",
  category: "Custom Software",
  primaryKeyword: "custom software vs off the shelf",
  cover_image: "/projects/maribiz-ai/screenshot-1.png",
  introduction: `<p>Buy off-the-shelf software when your process is like most other businesses' and a popular tool already does it well. Build custom software when the process is what makes your business different, when you're paying for several tools to do one job badly, or when no existing product fits without painful workarounds. Most businesses end up with a mix: standard tools for standard jobs, and a custom layer where they're unusual.</p>`,
  content: `<h2>What off-the-shelf software does well</h2>
<p>Ready-made products such as accounting software, CRMs, project management tools and e-commerce platforms have big advantages:</p>
<ul>
<li><strong>You can start today.</strong> Sign up, configure, import your data.</li>
<li><strong>Someone else maintains it:</strong> updates, security, hosting, new features.</li>
<li><strong>They've solved common problems</strong> for thousands of customers, including edge cases you haven't thought of.</li>
<li><strong>Costs are predictable</strong>, usually a monthly fee per user or per plan.</li>
</ul>
<p>For accounting, email, payroll and standard sales pipelines, building your own is almost never sensible.</p>
<h2>Where off-the-shelf starts to hurt</h2>
<ul>
<li><strong>Workarounds become the process.</strong> Staff export to spreadsheets, re-enter data in two systems, and keep "the real numbers" somewhere else.</li>
<li><strong>Subscriptions stack up.</strong> Five tools, each doing part of the job, each charging per user, none talking to the others.</li>
<li><strong>The tool shapes the business.</strong> You change how you work to fit the software, even when your way was better.</li>
<li><strong>Your data lives in someone else's format,</strong> and getting it out is awkward.</li>
<li><strong>Prices and features change</strong> on the vendor's schedule, not yours.</li>
</ul>
<h2>When custom software makes sense</h2>
<p>Building your own is worth considering when at least one of these is true:</p>
<ul>
<li><strong>The process is your advantage.</strong> How you quote, schedule, match buyers to sellers or deliver a service is what customers pay you for.</li>
<li><strong>Nothing on the market fits</strong> without major compromises, and you've genuinely looked.</li>
<li><strong>Per-user subscription costs</strong> across a growing team have become a significant line in the budget.</li>
<li><strong>You need several systems connected</strong> in a way none of them supports on its own.</li>
<li><strong>The software is the product,</strong> as with a marketplace or a SaaS business.</li>
</ul>
<p>MariBiz.ai is a good example of the last case. It's a B2B marine procurement marketplace where shipowners send requests for quotes and compare responses from verified vendors at specific ports. No off-the-shelf marketplace did that, so we <a href="/work/maribiz-ai/">built it from scratch</a>.</p>
<h2>The real costs of each choice</h2>
<table>
<thead><tr><th></th><th>Off-the-shelf</th><th>Custom</th></tr></thead>
<tbody>
<tr><td>Upfront</td><td>Low: setup, configuration, data import</td><td>Higher: design and development</td></tr>
<tr><td>Ongoing</td><td>Subscriptions, usually per user, rising with headcount</td><td>Hosting and maintenance; changes are development time</td></tr>
<tr><td>Fit</td><td>Good for standard processes; workarounds for the rest</td><td>Built around how you work</td></tr>
<tr><td>Time to start</td><td>Days</td><td>Weeks to months</td></tr>
<tr><td>Control</td><td>Vendor decides features, pricing and data format</td><td>You own the code and data</td></tr>
<tr><td>Risk</td><td>Vendor changes or shuts down the product</td><td>Project overruns; depends on a good development partner</td></tr>
</tbody>
</table>
<p>Compare the total over three to five years, not just the first invoice. A cheap subscription for five users can become an expensive one for fifty.</p>
<h2>The hybrid approach most businesses should consider</h2>
<p>It isn't all or nothing. Common patterns that work well:</p>
<ul>
<li><strong>Keep the standard tools and connect them.</strong> A small custom integration that moves data between your CRM, accounting software and website removes double entry without replacing anything.</li>
<li><strong>Build a custom front end on a standard back end.</strong> A customer portal built for your clients, with the standard tools doing the work behind it.</li>
<li><strong>Build only the unusual part.</strong> Custom quoting or scheduling, with everything else left in tools you already pay for.</li>
</ul>
<h2>Questions to ask before deciding</h2>
<ol>
<li>Which part of our process do customers value most, and does any existing tool support it properly?</li>
<li>How many hours a week do staff spend on workarounds and re-entering data?</li>
<li>What will our subscription costs be with twice the team?</li>
<li>Who will maintain custom software after it's built, and how will changes be paid for?</li>
<li>Could we start with a small custom piece and expand later?</li>
</ol>
<h2>Questions we get about building vs buying</h2>
<p><strong>Is custom software only for large companies?</strong> No. Small businesses with an unusual process often benefit the most, especially when the alternative is a tangle of spreadsheets. We look at the signs you've outgrown spreadsheets later in this series.</p>
<p><strong>Who owns custom software?</strong> You should. Make sure the contract states that you own the code and data, and that it's stored in accounts in your company's name.</p>
<p><strong>Can custom software be built in stages?</strong> Yes, and it usually should be. Start with the smallest version that removes the biggest pain, use it, then decide what to add.</p>`,
  conclution: `<p>Most of our clients end up with a mix: ready-made tools for accounting and email, and something custom only where their process is different. That's usually the cheapest answer too.</p>
<p>If you're weighing it up, our <a href="/services/software-development-services/">software team</a> will tell you honestly when not to build.</p>`,
}
