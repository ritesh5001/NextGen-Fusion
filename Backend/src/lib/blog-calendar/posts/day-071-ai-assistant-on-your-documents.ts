import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 71,
  title: "Building an AI assistant trained on your own documents (RAG) without leaking your data",
  slug: "ai-assistant-on-your-documents",
  excerpt: "Building an AI assistant trained on your own documents with RAG: how it works, how to keep company data private, and what makes the answers reliable.",
  category: "AI & Automation",
  primaryKeyword: "ai assistant trained on company documents",
  cover_image: "/projects/maribiz-ai/screenshot-1.png",
  introduction: `<p>An AI assistant that answers from your company's documents usually isn't "trained" on them at all. It uses retrieval-augmented generation (RAG): when someone asks a question, the system searches your documents for the most relevant passages and gives only those to the AI model, which writes an answer based on them, ideally with references. Done well, it answers accurately from your own policies, manuals and knowledge base, respects who's allowed to see what, and doesn't send your data anywhere you haven't approved.</p>`,
  content: `<h2>How RAG works, step by step</h2>
<ol>
<li><strong>Collect documents:</strong> policies, manuals, product sheets, FAQs, past support answers, contracts, wiki pages.</li>
<li><strong>Split them into passages</strong> of a sensible size, keeping headings and context.</li>
<li><strong>Index them for search,</strong> usually with embeddings (a numeric representation of meaning) stored in a vector database, often combined with keyword search.</li>
<li><strong>At question time,</strong> search for the passages most relevant to the question.</li>
<li><strong>Send those passages and the question</strong> to an AI model with instructions to answer only from them and cite sources.</li>
<li><strong>Show the answer with links</strong> to the source documents, so people can check.</li>
</ol>
<h2>Why not just "train" a model on your documents?</h2>
<p>Fine-tuning a model on your documents is expensive, slow to update, and doesn't reliably make the model quote facts correctly. RAG uses current documents at the moment of the question: update a policy and the assistant uses the new version immediately. It can also show sources, which fine-tuning can't.</p>
<h2>Keeping your data private</h2>
<ul>
<li><strong>Choose the AI provider carefully.</strong> Use business or API terms where your data isn't used to train the provider's models, and check where data is processed and stored.</li>
<li><strong>Send only what's needed:</strong> the relevant passages for each question, not whole document libraries.</li>
<li><strong>Respect permissions.</strong> If HR documents are only for HR, the search must only return them to HR users. Permissions should be enforced in the retrieval step, not left to the AI's discretion.</li>
<li><strong>Log access</strong> and keep conversation logs secure.</li>
<li><strong>Consider self-hosted models</strong> for highly sensitive data; we compare self-hosted and API models later in this series.</li>
<li><strong>Remove what shouldn't be there:</strong> personal data, credentials and confidential documents that don't belong in an assistant.</li>
</ul>
<h2>What makes answers reliable</h2>
<h3>Clean, current documents</h3>
<p>Outdated, duplicate or contradictory documents produce outdated, contradictory answers. Tidy the source library first and decide who keeps it current.</p>
<h3>Good retrieval</h3>
<p>Most wrong answers come from the search step finding the wrong passages. Combining semantic and keyword search, good chunking and testing with real questions improve this more than a bigger model does.</p>
<h3>Strict instructions</h3>
<p>Tell the model to answer only from the provided passages, say when it doesn't know, and cite sources. Then test that it does.</p>
<h3>Testing with real questions</h3>
<p>Collect a set of real questions with known correct answers, run them regularly, and check results after any change to documents, prompts or models.</p>
<h3>Feedback</h3>
<p>Let users flag wrong or unhelpful answers. Each one usually points to a missing or unclear document.</p>
<h2>Good uses for a document assistant</h2>
<ul>
<li>Staff questions about HR policies, procedures and internal systems.</li>
<li>Support teams finding answers in product documentation.</li>
<li>Sales teams checking specifications and terms.</li>
<li>Customers searching help centres in natural language.</li>
<li>New hires getting up to speed.</li>
</ul>
<h2>Where to be careful</h2>
<ul>
<li>Legal, medical and financial advice, where errors matter: keep a person reviewing.</li>
<li>Documents that conflict: decide which source wins.</li>
<li>Customer-facing use: start internally, prove accuracy, then expose to customers.</li>
</ul>
<h2>What it involves to build</h2>
<p>Document collection and clean-up, the indexing pipeline, the retrieval and answering service, permissions, an interface (a chat window, a Slack or Teams bot, or inside your existing system), testing and monitoring. For what drives the cost, see <a href="/blog/cost-to-add-ai-to-website/">what it costs to add AI</a>, and for other quick automation wins, <a href="/blog/tasks-to-automate-with-ai/">ten tasks to automate with AI</a>.</p>
<h2>Document assistant questions</h2>
<p><strong>Can it read PDFs, spreadsheets and scanned documents?</strong> PDFs and spreadsheets, yes, with appropriate processing. Scanned documents need text recognition first, and quality varies.</p>
<p><strong>Will it ever make things up?</strong> It can, especially when retrieval misses the right passage. Strict instructions, citations and testing reduce this a lot. We cover making chatbots reliable later in this series.</p>
<p><strong>How is it kept up to date?</strong> The index is refreshed when documents change, automatically from the source system where possible.</p>`,
  conclution: `<p>Clean documents and good search matter more than the choice of model. Get those right, make the assistant cite its sources, and test it with real questions before anyone relies on it.</p>
<p>We build these for teams; see our <a href="/services/ai-automation-development-services/">AI automation services</a>.</p>`,
}
