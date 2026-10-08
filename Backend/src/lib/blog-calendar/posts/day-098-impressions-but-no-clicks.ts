import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 98,
  title: "Why your blog gets impressions but no clicks, and how to write for AI-era search",
  slug: "impressions-but-no-clicks",
  excerpt: "Blog getting impressions but no clicks? How to read Search Console's numbers, why clicks fall in the AI-search era, and how to write pages people click.",
  category: "SEO",
  primaryKeyword: "impressions but no clicks search console",
  cover_image: "/projects/cleanship/screenshot-1.png",
  introduction: `<p>When a blog gets plenty of impressions in Google Search Console but few clicks, it's usually one of four things: the pages rank too low for anyone to see them (impressions on page two or three still count), the titles and descriptions don't persuade, Google's AI Overviews or other features answer the question before anyone clicks, or the pages rank for searches that don't match what they offer. Search Console's data shows which, and each has a different fix.</p>`,
  content: `<h2>Read the numbers properly</h2>
<p>In Search Console's Performance report, turn on clicks, impressions, CTR and average position, then look at the <strong>Queries</strong> and <strong>Pages</strong> tabs. An impression counts whenever your result appeared in a results page a user loaded, even far down. So high impressions with an average position of 30 just means you're on page three: that's a ranking problem, not a click problem.</p>
<h2>Case 1: Ranking too low</h2>
<p>If average position for a query is beyond the first page, few people will ever see the result. Focus on improving the page: depth, accuracy, examples, internal links and authority. Pages sitting at positions 8 to 20 are often the quickest wins, since a modest improvement brings them into view.</p>
<h2>Case 2: Good position, weak title and description</h2>
<p>If you're in the top positions with low CTR, the listing isn't persuading. Improve it:</p>
<ul>
<li><strong>Lead with what the searcher wants,</strong> using their words.</li>
<li><strong>Promise something specific:</strong> a checklist, a comparison table, steps, examples, a timeline.</li>
<li><strong>Add freshness where it's genuine,</strong> such as the year for things that change.</li>
<li><strong>Keep titles to around 60 characters</strong> so they aren't cut off.</li>
<li><strong>Write a description that adds to the title,</strong> not repeats it.</li>
</ul>
<p>Google sometimes rewrites titles it thinks don't match the page; clear, accurate titles are rewritten less often.</p>
<h2>Case 3: AI Overviews and other features take the click</h2>
<p>For questions with short answers, Google's AI Overviews, featured snippets and "People also ask" boxes can satisfy searchers on the results page. The pattern is steady impressions and position, falling CTR on question-style queries. We covered this in <a href="/blog/ai-overviews-traffic-drop/">Google traffic dropped but rankings didn't</a>. The response is to give people a reason to click beyond the summary (depth, tools, examples, comparisons) and to be a cited source; see <a href="/blog/get-cited-in-ai-answers/">getting cited in AI answers</a>.</p>
<h2>Case 4: Ranking for the wrong searches</h2>
<p>Sometimes a post ranks for loosely related queries, such as a definition when the post is a buying guide, and searchers skip it because it isn't what they want. Check the queries for each page. Either adjust the page to serve that intent better, or accept that those impressions won't convert, and target the right searches more clearly.</p>
<h2>Writing for the AI-search era</h2>
<ul>
<li><strong>Answer first.</strong> State the direct answer at the top, so you're a good source, then go deeper.</li>
<li><strong>Offer what summaries can't:</strong> worked examples, real experience, screenshots, checklists, decision tables, tools.</li>
<li><strong>Be specific:</strong> named examples, steps, numbers, timelines.</li>
<li><strong>Structure clearly:</strong> question-style headings, short paragraphs, lists and tables.</li>
<li><strong>Connect to action:</strong> link to the service or product the reader may need next.</li>
<li><strong>Keep posts current</strong> and update them when facts change.</li>
</ul>
<h2>Measure what matters</h2>
<p>Clicks are a means, not the goal. Track whether blog visitors go on to service pages, enquiries or purchases. A post with fewer clicks that brings qualified enquiries is worth more than a viral post that brings none. For realistic expectations of how SEO builds, see <a href="/blog/how-long-does-seo-take/">how long SEO takes</a>.</p>
<h2>Questions about impressions and clicks</h2>
<h3>What's a good CTR?</h3>
<p>It varies hugely by position, query type and search features. Compare a page with itself over time, and with your other pages at similar positions.</p>
<h3>Should I change titles on every post?</h3>
<p>Start with posts that rank well but have low CTR. Change one at a time and give each a few weeks.</p>
<h3>Do impressions without clicks have any value?</h3>
<p>Some brand visibility, and they show Google associates your page with the topic. But they're mainly a sign of potential.</p>`,
  conclution: `<p>Look at average position before anything else. Low positions need better pages; good positions with low clicks need better titles and a reason to click past any summary.</p>
<p>Our <a href="/services/seo-services/">SEO team</a> can go through your Search Console data with you.</p>`,
}
