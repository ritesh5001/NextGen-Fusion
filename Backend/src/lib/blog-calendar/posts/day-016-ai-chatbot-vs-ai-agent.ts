import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 16,
  title: "AI chatbot vs AI agent: what's the difference and which one should you build?",
  slug: "ai-chatbot-vs-ai-agent",
  excerpt: "AI chatbot vs AI agent: a chatbot answers questions, an agent takes actions. What each can do, the risks of agents, and which one your business should build.",
  category: "AI & Automation",
  primaryKeyword: "ai chatbot vs ai agent",
  cover_image: "/projects/thegrafftee/screenshot-1.png",
  introduction: `<p>An AI chatbot answers questions. An AI agent takes actions. A chatbot on your website can tell a customer your delivery times; an agent could look up their order, change the delivery address, issue a refund within your rules and email the confirmation. Agents can save far more time, but because they act on real systems, they need tighter limits, more testing and a clear point where a person takes over.</p>
<p>The distinction matters more than it sounds, because an agent that gets something wrong doesn't just give a bad answer. It does the wrong thing.</p>`,
  content: `<h2>What an AI chatbot does</h2>
<p>A chatbot holds a conversation. Modern ones are built on large language models, so they understand questions however they're phrased, and good ones answer from your own information: FAQs, policies, product details, help articles. Their job ends at the answer. If the customer needs something done, the chatbot hands them a link, a form or a person.</p>
<p>Typical uses: answering common questions, explaining products, qualifying leads, collecting details for a callback. We covered when a chatbot is worth it in <a href="/blog/does-my-business-need-an-ai-chatbot/">does your business need an AI chatbot?</a></p>
<h2>What an AI agent does</h2>
<p>An agent is given goals and tools. The tools are connections to your systems: the order database, the calendar, the CRM, email, a payment provider. Given a request, the agent decides which steps to take, uses the tools, checks the results and continues until the task is done or it needs help.</p>
<p>Typical uses:</p>
<ul>
<li>Checking order status and arranging returns within policy.</li>
<li>Booking, moving or cancelling appointments in a real calendar.</li>
<li>Creating and updating CRM records from incoming enquiries.</li>
<li>Pulling figures from several systems and drafting a weekly report.</li>
<li>Triaging support tickets and drafting replies for a person to approve.</li>
</ul>
<h2>The difference in one table</h2>
<table>
<thead><tr><th></th><th>AI chatbot</th><th>AI agent</th></tr></thead>
<tbody>
<tr><td>Main job</td><td>Answer and guide</td><td>Complete tasks</td></tr>
<tr><td>Access to your systems</td><td>Read-only knowledge, usually</td><td>Reads and writes through connected tools</td></tr>
<tr><td>Risk if it gets something wrong</td><td>A wrong answer</td><td>A wrong action: a bad booking, refund or record</td></tr>
<tr><td>Build effort</td><td>Lower: knowledge, prompts, hand-over</td><td>Higher: integrations, permissions, testing, logging</td></tr>
<tr><td>Time saved</td><td>Fewer repetitive questions</td><td>Whole tasks taken off staff</td></tr>
</tbody>
</table>
<h2>The risks that come with agents</h2>
<p>Because agents act, mistakes cost more. The main risks:</p>
<ul>
<li><strong>Acting on a misunderstanding:</strong> cancelling the wrong booking because the request was ambiguous.</li>
<li><strong>Going beyond policy:</strong> approving a refund it shouldn't, if the rules weren't encoded as hard limits.</li>
<li><strong>Manipulation:</strong> users or content trying to trick it into doing something it shouldn't.</li>
<li><strong>Too much access:</strong> an agent connected with admin rights it doesn't need.</li>
</ul>
<p>Good agent design handles these with narrow permissions (only the actions it needs), hard rules enforced in code rather than in instructions, confirmation steps for anything irreversible, full logs of every action, and a person in the loop for exceptions.</p>
<h2>Which one should you build?</h2>
<h3>Start with a chatbot if</h3>
<ul>
<li>Most of your volume is questions with known answers.</li>
<li>Your systems aren't easily connected, or don't have APIs.</li>
<li>You want to learn how customers use AI before handing it actions.</li>
</ul>
<h3>Consider an agent if</h3>
<ul>
<li>Staff spend hours on repetitive tasks that follow clear rules.</li>
<li>Those tasks live in systems with reliable APIs.</li>
<li>You can define exactly what the agent may and may not do.</li>
<li>Someone can review its work, at least at first.</li>
</ul>
<h2>A sensible path for most businesses</h2>
<ol>
<li><strong>Chatbot that answers questions</strong> from your own information, with hand-over to a person.</li>
<li><strong>Add read-only lookups:</strong> order status, appointment times, account details.</li>
<li><strong>Add low-risk actions with confirmation:</strong> booking a slot, creating a ticket, sending a document.</li>
<li><strong>Add higher-risk actions</strong> only with hard limits, logging and human approval where needed.</li>
</ol>
<p>Each step proves itself before the next. Many businesses find steps one to three cover most of the benefit.</p>
<h2>Internal agents are often the better first project</h2>
<p>Agents used by your own staff, rather than customers, are easier to start with. Staff can check results, and mistakes stay inside the business. Drafting replies, summarising long email threads, filling CRM fields from enquiries and preparing reports are good candidates.</p>
<h2>What people ask about agents</h2>
<p><strong>Is an AI agent just a chatbot with extra features?</strong> Technically they share a lot: both use language models. The difference is responsibility. An agent is trusted to change things, so it has to be built and tested like any other system that changes your data.</p>
<p><strong>Can an agent work without a chat window?</strong> Yes. Many agents run in the background, triggered by an email, a form submission or a schedule, and nobody chats with them at all.</p>
<p><strong>How do we know it's doing the right thing?</strong> Logs of every step, regular review of samples, alerts for unusual actions, and limits that make the worst case small.</p>`,
  conclution: `<p>Start with a chatbot, add read-only lookups, then add actions one at a time with limits and logging. Most businesses get most of the benefit by step three.</p>
<p>If you're working out which tasks are worth automating, our <a href="/services/ai-automation-development-services/">AI automation team</a> can help.</p>`,
}
