import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 12,
  title: "Google traffic dropped but rankings didn't: how AI Overviews are changing clicks in 2026",
  slug: "ai-overviews-traffic-drop",
  excerpt: "Google traffic dropped but rankings held? How AI Overviews are changing clicks in 2026, how to confirm it in Search Console, and what to do about it.",
  category: "SEO",
  primaryKeyword: "google traffic dropped ai overviews",
  cover_image: "/projects/maribiz-ai/screenshot-1.png",
  introduction: `<p>If your Google traffic has dropped while your average position in Search Console looks steady, AI Overviews are a likely cause. When Google shows an AI-generated summary at the top of the results, some searchers get their answer there and never click. Your page can still rank, still be shown, and even be cited in the overview, yet receive fewer visits than before. It hits informational searches hardest: definitions, how-tos and quick questions.</p>
<p>The pattern is easy to spot once you know where to look in Search Console, and there are sensible ways to respond that don't involve rewriting your whole site.</p>`,
  content: `<h2>What AI Overviews are</h2>
<p>AI Overviews are summaries Google generates for some searches and shows above the normal results, with links to the pages they draw from. Google's own page on <a href="https://developers.google.com/search/docs/appearance/ai-features" rel="noopener">AI features and your website</a> explains that the same SEO fundamentals apply: pages must be indexed and eligible to show a snippet to be used as a source, and there's no special markup required.</p>
<p>The effect on traffic comes from searcher behaviour. If the summary answers "how long does a passport renewal take" well enough, many people stop there.</p>
<h2>How to tell if AI Overviews are behind your drop</h2>
<p>Open Google Search Console and go to <strong>Performance › Search results</strong>. Compare the last three months with the same period a year earlier, and look at four numbers together:</p>
<ul>
<li><strong>Impressions:</strong> how often your pages were shown.</li>
<li><strong>Clicks:</strong> how often people clicked.</li>
<li><strong>Click-through rate (CTR):</strong> clicks divided by impressions.</li>
<li><strong>Average position.</strong></li>
</ul>
<p>The pattern that points to AI Overviews is <strong>impressions steady or rising, position steady, CTR and clicks falling</strong>. If impressions and positions fell too, you have a ranking problem instead, and the causes are different: a core update, lost links, technical issues or competitors.</p>
<p>Then click into <strong>Queries</strong>. Sort by impressions and look at the queries where CTR has fallen most. If they're mostly questions ("what is", "how to", "why does"), that fits. If commercial searches such as "plumber near me" or "buy running shoes" are falling too, look for other causes as well.</p>
<h2>Which pages are hit hardest</h2>
<ul>
<li><strong>Short answer pages:</strong> definitions, conversions, simple facts.</li>
<li><strong>Generic how-to articles</strong> that say what every other article says.</li>
<li><strong>Listicles</strong> that summarise other sources without adding anything.</li>
</ul>
<p>Pages that hold up better tend to offer something a summary can't replace: original data, real examples, tools, detailed comparisons, local knowledge, or the product or service itself.</p>
<h2>What to do about it</h2>
<h3>1. Accept that some informational traffic was never going to convert</h3>
<p>Many of the lost clicks were people who wanted a quick fact and would have left immediately. Check conversions, not just sessions. Some sites lose a lot of traffic and very few enquiries.</p>
<h3>2. Make your pages worth clicking through to</h3>
<p>Give the direct answer early, so you're a good source for the summary, then go further than the summary can: worked examples, step-by-step detail, screenshots, a checklist, a calculator, your own experience. The reader who wants more has a reason to click.</p>
<h3>3. Shift effort towards searches with intent</h3>
<p>Service pages, product pages, comparison pages and local pages are less affected because people searching those terms want to choose and act. Make sure those pages are strong before writing more general articles.</p>
<h3>4. Be a source AI tools want to cite</h3>
<p>Clear structure, specific facts, named examples and up-to-date information make a page easier to quote. We cover getting your business mentioned in AI answers in a separate post later in this series.</p>
<h3>5. Rewrite titles and descriptions for the click</h3>
<p>If the summary answers the basic question, your title should promise what it doesn't: the full checklist, the comparison table, the cost breakdown, the examples.</p>
<h3>6. Build channels you control</h3>
<p>Email lists, WhatsApp broadcast lists, returning customers and referrals don't depend on Google's layout. The more of your business comes through them, the less any change in search hurts.</p>
<h2>What not to do</h2>
<ul>
<li>Don't block Google from your content to "protect" it. You'll lose the rankings along with the overview citations.</li>
<li>Don't rewrite everything at once. Pick the pages where CTR fell most and that matter to your business, change them, and measure for a month.</li>
<li>Don't chase volume with thin AI-written articles. That's the content summaries replace most easily.</li>
</ul>
<h2>What people ask about AI Overviews</h2>
<p><strong>Can I opt out of AI Overviews?</strong> Google offers controls such as <code>nosnippet</code> that limit how your content is shown, but they also limit normal snippets, which usually costs more traffic than it saves.</p>
<p><strong>Does being cited in an AI Overview bring traffic?</strong> Some. Cited links do get clicks, though usually fewer than a top organic result used to. It also builds visibility for your brand.</p>
<p><strong>Will this get worse?</strong> Search is changing quickly, and nobody outside Google knows exactly how. Building pages with real depth and channels you control is the safe bet either way.</p>`,
  conclution: `<p>Some of the traffic you've lost was never going to become a customer anyway. Check enquiries before you panic, then put your effort into pages where people are ready to choose.</p>
<p>If the numbers don't add up, our <a href="/services/seo-services/">SEO team</a> can go through your Search Console data with you.</p>`,
}
