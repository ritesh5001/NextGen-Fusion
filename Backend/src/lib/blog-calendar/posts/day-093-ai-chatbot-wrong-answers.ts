import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 93,
  title: "Why AI chatbots give wrong answers, and how to make yours reliable",
  slug: "ai-chatbot-wrong-answers",
  excerpt: "Why AI chatbots give wrong answers, from missing information to poor retrieval and loose instructions, and the practical steps that make your chatbot reliable.",
  category: "AI & Automation",
  primaryKeyword: "ai chatbot wrong answers hallucination",
  cover_image: "/projects/nextmentor/screenshot-1.png",
  introduction: `<p>AI chatbots give wrong answers for a few main reasons: the information they need isn't in their sources, the retrieval step finds the wrong passage, the instructions let the model guess instead of saying "I don't know", the sources themselves are outdated or contradictory, or the question needs live data the bot isn't connected to. When a language model doesn't have the right information, it can produce a confident, plausible answer anyway, which is what people call hallucination. Most of these causes are fixable with better sources, better retrieval, stricter instructions, testing and monitoring.</p>
<p>The reassuring part is that most of the causes are fixable, and none of them needs a bigger model.</p>`,
  content: `<h2>Why language models make things up</h2>
<p>A language model generates the most likely next words based on patterns. It doesn't check facts against a database unless you give it the facts. Asked about your refund policy without being given the policy, it may produce a reasonable-sounding policy that isn't yours. Reliable business chatbots therefore answer from retrieved sources, not from the model's general knowledge; see <a href="/blog/ai-assistant-on-your-documents/">building an AI assistant on your documents</a>.</p>
<h2>Cause 1: The answer isn't in the sources</h2>
<p>If nobody wrote down your delivery times for a region, the bot can't know them. <strong>Fix:</strong> review unanswered and wrong-answer conversations, and add the missing information to the source documents.</p>
<h2>Cause 2: Retrieval finds the wrong passage</h2>
<p>The search step picks text that looks relevant but isn't: an old policy, a different product, a passage cut off mid-sentence. <strong>Fix:</strong> improve how documents are split, combine semantic and keyword search, add titles and metadata to passages, and test retrieval separately from the answers.</p>
<h2>Cause 3: Instructions allow guessing</h2>
<p>Without clear instructions, models fill gaps. <strong>Fix:</strong> instruct the bot to answer only from the provided sources, say plainly when it doesn't know, and offer a hand-over to a person. Then test that it actually follows these instructions, with questions it shouldn't be able to answer.</p>
<h2>Cause 4: Outdated or contradictory sources</h2>
<p>Two versions of a price list, or an old FAQ that contradicts the new terms. <strong>Fix:</strong> remove outdated documents, name one source of truth for each topic, and assign someone to keep it current.</p>
<h2>Cause 5: Questions needing live data</h2>
<p>"Where's my order?" or "Is this in stock?" can't be answered from documents. <strong>Fix:</strong> connect the bot to the relevant systems through safe, read-only lookups, or have it hand over. See <a href="/blog/ai-chatbot-vs-ai-agent/">chatbot vs agent</a>.</p>
<h2>Cause 6: Ambiguous questions</h2>
<p>"How much is it?" without saying which product. <strong>Fix:</strong> instruct the bot to ask a clarifying question rather than assume.</p>
<h2>Cause 7: Manipulation</h2>
<p>Users may try to make the bot promise discounts or say embarrassing things. <strong>Fix:</strong> firm instructions on what it can never do, rules enforced in code for anything with consequences, and monitoring.</p>
<h2>Building a reliability routine</h2>
<ol>
<li><strong>Create a test set:</strong> real questions with known correct answers, including tricky and out-of-scope ones.</li>
<li><strong>Run it after every change</strong> to sources, prompts or models.</li>
<li><strong>Show sources</strong> in answers where appropriate, so users and staff can check.</li>
<li><strong>Review conversations weekly,</strong> especially those rated unhelpful or handed over.</li>
<li><strong>Track metrics:</strong> resolution rate, hand-over rate, wrong-answer reports.</li>
<li><strong>Fix the source, not just the symptom.</strong> Most wrong answers point to a missing or unclear document.</li>
</ol>
<h2>Set expectations with users</h2>
<p>Tell users they're talking to an AI assistant, make it easy to reach a person, and avoid letting the bot handle situations where a wrong answer causes harm: legal, medical, financial or safety matters.</p>
<h2>Accuracy questions</h2>
<p><strong>Will a better model fix wrong answers?</strong> Sometimes a little. Usually better sources, retrieval and instructions help far more.</p>
<p><strong>Can a chatbot ever be 100% accurate?</strong> No system is perfect. The aim is high accuracy on common questions, honest "I don't know" answers otherwise, and quick hand-over.</p>
<p><strong>Who's responsible if the bot gives wrong information?</strong> Generally the business that runs it. That's why limits, testing and monitoring matter.</p>`,
  conclution: `<p>Every wrong answer is a clue. Look at the conversation, find the missing or outdated document behind it, and fix that. Do it weekly for a month and the bot gets noticeably better.</p>
<p>If yours keeps getting things wrong, our <a href="/services/ai-automation-development-services/">AI automation team</a> can help.</p>`,
}
