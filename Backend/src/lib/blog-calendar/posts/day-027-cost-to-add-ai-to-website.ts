import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 27,
  title: "How much does it cost to add AI to your website or app?",
  slug: "cost-to-add-ai-to-website",
  excerpt: "What does it cost to add AI to your website or app? The factors that drive build and running costs, from chatbots to agents, and how to keep both under control.",
  category: "AI & Automation",
  primaryKeyword: "cost to add ai to website",
  cover_image: "/projects/nextmentor/screenshot-1.png",
  introduction: `<p>Adding AI to a website or app has two kinds of cost: the one-time build (design, integration, testing) and the ongoing running cost (usage fees charged by the AI provider, hosting and maintenance). A chatbot answering from your FAQs is a modest project with usage costs that scale with conversations. An agent that reads and writes to your business systems is a bigger build, with more testing and monitoring to pay for. The cost depends far more on what the AI has to do, and how reliably, than on the AI itself.</p>
<p>As with everything on this site, there are no price lists here. What we can do is explain what drives the build and the running costs, so you can estimate the shape of your project and compare quotes sensibly.</p>`,
  content: `<h2>The common ways businesses add AI</h2>
<table>
<thead><tr><th>Feature</th><th>What it does</th><th>Relative build effort</th></tr></thead>
<tbody>
<tr><td>FAQ chatbot</td><td>Answers questions from your own information</td><td>Low to moderate</td></tr>
<tr><td>Lead qualification bot</td><td>Asks questions, captures details, passes to sales</td><td>Moderate</td></tr>
<tr><td>Search and recommendations</td><td>Understands natural-language searches across products or content</td><td>Moderate</td></tr>
<tr><td>Document assistant</td><td>Answers staff questions from internal documents</td><td>Moderate to high</td></tr>
<tr><td>Content tools</td><td>Drafts product descriptions, replies or summaries for review</td><td>Low to moderate</td></tr>
<tr><td>AI agent</td><td>Takes actions in your systems: bookings, orders, records</td><td>High</td></tr>
</tbody>
</table>
<p>If you're unsure which of these you need, our posts on <a href="/blog/does-my-business-need-an-ai-chatbot/">whether your business needs a chatbot</a> and <a href="/blog/ai-chatbot-vs-ai-agent/">chatbots vs agents</a> explain the differences.</p>
<h2>What drives the build cost</h2>
<h3>Preparing your information</h3>
<p>AI answers are only as good as the information behind them. Collecting, cleaning and structuring FAQs, product data or documents is often a large share of the work, and it's work your team has to be involved in.</p>
<h3>Integrations</h3>
<p>Connecting the AI to your website is straightforward. Connecting it to your CRM, booking system, order database or WhatsApp takes more work, and each integration needs testing and error handling.</p>
<h3>Guardrails and hand-over</h3>
<p>Making the AI say "I don't know" instead of guessing, refuse things it shouldn't do, and pass conversations to a person at the right moment takes careful design and testing.</p>
<h3>Interface</h3>
<p>A chat widget in the corner is quick. A custom interface built into your product, with history, attachments and accounts, is more work.</p>
<h3>Testing</h3>
<p>AI features need testing with many real-world questions, including awkward and adversarial ones. Skimping here is where most embarrassing failures come from.</p>
<h2>What drives the running cost</h2>
<ul>
<li><strong>Usage fees:</strong> most AI providers charge by the amount of text processed (tokens), so costs rise with the number and length of conversations.</li>
<li><strong>Model choice:</strong> more capable models cost more per use. Many tasks run well on smaller, cheaper models.</li>
<li><strong>Context size:</strong> sending large documents with every question costs more than retrieving only the relevant passages.</li>
<li><strong>Hosting and storage</strong> for the application, conversation logs and search indexes.</li>
<li><strong>Maintenance:</strong> keeping information current, reviewing conversations and adjusting prompts.</li>
</ul>
<h2>How to keep costs under control</h2>
<ul>
<li><strong>Start narrow:</strong> one use case, measured, before adding more.</li>
<li><strong>Use the smallest model that does the job well,</strong> and a larger one only where needed.</li>
<li><strong>Retrieve, don't stuff:</strong> send the AI only the relevant parts of your information.</li>
<li><strong>Cache common answers</strong> where appropriate.</li>
<li><strong>Set usage limits and alerts</strong> with the provider so a spike can't surprise you.</li>
<li><strong>Review conversations</strong> to fix gaps in your information rather than reaching for a bigger model.</li>
</ul>
<h2>Questions to ask before getting quotes</h2>
<ol>
<li>What exactly should the AI do, and what should it never do?</li>
<li>Where will the information come from, and who keeps it current?</li>
<li>Which systems does it need to connect to?</li>
<li>How many conversations or requests do you expect per month?</li>
<li>When should a person take over?</li>
<li>What data will be sent to the AI provider, and is that acceptable for your customers and your regulations?</li>
</ol>
<h2>Cost questions we get about AI</h2>
<p><strong>Is it cheaper to use an off-the-shelf chatbot tool?</strong> Often, for simple FAQ bots. Custom builds make sense when you need integrations, control over data, or a branded experience the tools can't provide.</p>
<p><strong>Will usage costs get out of hand?</strong> Not if limits and monitoring are set up. For most business chatbots, running costs are modest compared with the staff time they save.</p>
<p><strong>Do we need our own AI model?</strong> Almost never. Businesses use existing models with their own information. We compare self-hosted models and API services later in this series.</p>`,
  conclution: `<p>The model is rarely the expensive part. Preparing your information, connecting your systems and testing properly is where most of the work goes, and where cutting corners shows up later as wrong answers.</p>
<p>For a fixed quote on a specific AI feature, <a href="/contact/">tell us what you have in mind</a>.</p>`,
}
