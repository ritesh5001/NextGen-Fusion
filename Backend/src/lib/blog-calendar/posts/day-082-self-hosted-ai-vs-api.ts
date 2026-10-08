import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 82,
  title: "Self-hosted AI vs ChatGPT API: cost, privacy and performance for businesses",
  slug: "self-hosted-ai-vs-api",
  excerpt: "Self-hosted AI models vs the ChatGPT and Claude APIs: how they compare on cost, privacy, performance and effort, and which one fits your business use case.",
  category: "AI & Automation",
  primaryKeyword: "self hosted llm vs openai api",
  cover_image: "/projects/thegrafftee/screenshot-1.png",
  introduction: `<p>For most businesses, using an AI model through a provider's API (such as OpenAI, Anthropic or Google) is the better starting point: no infrastructure, access to the most capable models, and costs that scale with use. Self-hosting an open model makes sense when data can't leave your environment, usage is high and steady enough that running your own hardware is cheaper, or you need full control over the model and its versions. It brings real costs in hardware, expertise and maintenance, and smaller open models may not match the best hosted ones for complex tasks.</p>`,
  content: `<h2>The two options</h2>
<ul>
<li><strong>API:</strong> you send requests to a provider's hosted model and pay per use. The provider runs the infrastructure.</li>
<li><strong>Self-hosted:</strong> you run an open-weights model on your own servers or rented cloud GPUs, and handle everything yourself.</li>
</ul>
<p>There's also a middle option: open models hosted for you by a cloud provider in your chosen region, which gives some control without running the hardware.</p>
<h2>Comparison</h2>
<table>
<thead><tr><th></th><th>API</th><th>Self-hosted</th></tr></thead>
<tbody>
<tr><td>Setup effort</td><td>Low</td><td>High: hardware, deployment, scaling, monitoring</td></tr>
<tr><td>Model quality</td><td>Access to leading models</td><td>Open models; strong for many tasks, may trail on the hardest</td></tr>
<tr><td>Cost pattern</td><td>Per use; cheap at low volume</td><td>Fixed infrastructure; can be cheaper at high, steady volume</td></tr>
<tr><td>Data control</td><td>Data sent to provider, under their terms</td><td>Data stays in your environment</td></tr>
<tr><td>Updates</td><td>Provider improves models; versions retire</td><td>You choose when to change models</td></tr>
<tr><td>Expertise needed</td><td>Application development</td><td>Plus machine learning operations</td></tr>
</tbody>
</table>
<h2>Privacy: the real question</h2>
<p>Privacy is the usual reason businesses consider self-hosting. Before deciding, check what API providers actually offer: business terms where your data isn't used for training, data retention controls, regional processing in some cases, and security certifications. For many uses, these terms meet the requirement. Self-hosting becomes necessary when regulation, contracts or policy require that data never leaves your infrastructure.</p>
<p>Also consider what you send. Retrieval systems that send only relevant passages, with personal data removed where possible, reduce exposure either way; see <a href="/blog/ai-assistant-on-your-documents/">building an AI assistant on your documents</a>.</p>
<h2>Cost: when self-hosting pays off</h2>
<p>API costs grow with usage. Self-hosting costs are mostly fixed: GPUs (owned or rented), engineering time and maintenance. Self-hosting tends to make financial sense only when usage is high and steady, the task works well with an open model, and you have the expertise to run it. For low or unpredictable usage, APIs are almost always cheaper. For what drives AI costs generally, see <a href="/blog/cost-to-add-ai-to-website/">what it costs to add AI</a>.</p>
<h2>Performance</h2>
<ul>
<li><strong>Quality:</strong> leading hosted models are strongest for complex reasoning and writing. Open models handle many business tasks well, such as classification, extraction, summarisation and routine Q&amp;A.</li>
<li><strong>Speed:</strong> self-hosted models can be fast on good hardware, but you have to scale for peaks yourself.</li>
<li><strong>Reliability:</strong> APIs have occasional outages and rate limits; self-hosted systems are only as reliable as your operations.</li>
</ul>
<h2>Hidden costs of self-hosting</h2>
<ul>
<li><strong>Idle capacity:</strong> GPUs cost money whether or not anyone is asking questions at 3am.</li>
<li><strong>Scaling for peaks:</strong> enough capacity for your busiest hour sits unused the rest of the day.</li>
<li><strong>Evaluation:</strong> testing new open models as they're released, and re-checking quality after each change.</li>
<li><strong>Security:</strong> patching, access control and monitoring of the inference servers.</li>
<li><strong>People:</strong> someone who understands model serving, quantisation and GPU memory, which is a specialist skill.</li>
</ul>
<h2>A practical approach</h2>
<ol>
<li>Start with an API on business terms, with sensible data handling.</li>
<li>Design your application so the model can be swapped, behind your own interface.</li>
<li>Measure usage, cost and quality.</li>
<li>Consider self-hosting or a hosted open model for specific high-volume, simpler tasks, or where data rules require it.</li>
</ol>
<p>Many businesses end up mixing both: an API for complex tasks and a smaller self-hosted or hosted open model for routine high-volume work.</p>
<h2>Self-hosting questions</h2>
<h3>Can we run a model on a normal server?</h3>
<p>Small models can run on CPUs or modest GPUs; larger, more capable models need substantial GPU memory.</p>
<h3>Is open-source AI free?</h3>
<p>The model weights may be free to use under their licence, but running them isn't. Check the licence terms for commercial use too.</p>
<h3>Will hosted models change under us?</h3>
<p>Providers update and retire model versions. Pin versions where possible and test before switching.</p>`,
  conclution: `<p>Start with an API on business terms, put the model behind your own interface so you can swap it later, and measure. Self-host when the numbers or the data rules clearly say so.</p>
<p>Our <a href="/services/ai-automation-development-services/">AI automation team</a> can help you choose.</p>`,
}
