import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 23,
  title: "How to get your business mentioned in ChatGPT, Perplexity and Google AI answers",
  slug: "get-cited-in-ai-answers",
  excerpt: "How to get your business mentioned in ChatGPT, Perplexity and Google AI answers: be easy to find, easy to understand, easy to quote and mentioned by others.",
  category: "SEO",
  primaryKeyword: "get business mentioned in chatgpt",
  cover_image: "/projects/nextmentor/screenshot-1.png",
  introduction: `<p>AI assistants such as ChatGPT, Perplexity, Gemini and Google's AI Overviews mention businesses they can find, understand and verify. In practice that means four things: your site is open to their crawlers and indexed by search engines, your pages state clearly what you do, where and for whom, your content contains specific facts worth quoting, and other trusted sites mention you too. None of it is a trick. It's the same work that makes a business easy to recommend for a person.</p>
<p>None of this is a trick. It's the same work that makes a business easy for a person to recommend.</p>`,
  content: `<h2>How AI assistants find businesses to mention</h2>
<p>When someone asks an AI assistant for, say, "a Shopify developer who works with UK brands", the assistant usually draws on two sources: what it learned during training, and what it finds by searching the web at the moment of the question. Assistants that search, such as Perplexity, ChatGPT with search and Google's AI features, lean heavily on pages that rank in normal search and on sources they consider trustworthy. Google says pages need to be indexed and eligible to show a snippet to appear as sources in its <a href="https://developers.google.com/search/docs/appearance/ai-features" rel="noopener">AI features</a>.</p>
<p>So the foundation is ordinary: be findable in search. If your site isn't indexed, start with <a href="/blog/website-not-showing-on-google/">why your website isn't showing on Google</a>.</p>
<h2>1. Let AI crawlers in</h2>
<p>Check your <code>robots.txt</code>. Some sites block AI crawlers by accident, through a security plugin, a CDN setting or a copied rule. Bots to look for include Googlebot, Bingbot, OAI-SearchBot and GPTBot (OpenAI), PerplexityBot, and ClaudeBot. Blocking training crawlers is a reasonable choice for some publishers, but if you want to be recommended by assistants, don't block the crawlers they use for search.</p>
<p>Also make sure your important content is in the HTML the server sends, not only drawn in by JavaScript. Many AI crawlers don't run scripts.</p>
<h2>2. Say clearly what you are</h2>
<p>AI systems summarise. If your homepage says "We craft digital excellence", there's nothing to summarise. If it says "A web development company in Lucknow and Mumbai building Shopify stores and Next.js websites for brands in India, the UK and the UAE", an assistant can repeat that accurately.</p>
<ul>
<li>State what you do, where you're based, where you serve and who your customers are, on the homepage and About page.</li>
<li>Give each service its own page with a clear, specific description.</li>
<li>Use the same business name, address and description everywhere: website, Google Business Profile, LinkedIn, directories.</li>
</ul>
<h2>3. Add structured data</h2>
<p>Schema markup in JSON-LD tells machines who you are without guessing: Organization or LocalBusiness with your name, address, phone, logo and social profiles; Service for each service; FAQPage, Article and Product where they fit. We explain which schema matters for businesses later in this series.</p>
<h2>4. Write content that's easy to quote</h2>
<p>AI answers favour passages that answer a question directly and specifically.</p>
<ul>
<li><strong>Answer first.</strong> Put the direct answer in the first sentence or two under each heading, then explain.</li>
<li><strong>Use questions people actually ask</strong> as headings.</li>
<li><strong>Be specific:</strong> numbers, timelines, named examples, steps.</li>
<li><strong>Show where facts come from</strong> and link to primary sources.</li>
<li><strong>Keep it current.</strong> Outdated pages get passed over.</li>
</ul>
<h2>5. Get mentioned by others</h2>
<p>AI systems trust what multiple independent sources agree on. Being mentioned on other reputable sites matters as much here as it does for SEO:</p>
<ul>
<li>Reviews on Google and industry review platforms.</li>
<li>Listings in respected directories for your industry and country.</li>
<li>Client websites crediting your work, where appropriate.</li>
<li>Articles, interviews, podcasts and talks that mention you.</li>
<li>Genuine participation in communities where your customers ask questions.</li>
<li>A complete, active LinkedIn company page.</li>
</ul>
<h2>6. Consider an llms.txt file</h2>
<p>llms.txt is a proposed standard: a plain text file at your site's root that summarises your business and links to your key pages for AI tools. Support is still limited, so treat it as a small extra, not a priority. We keep one at <code>/llms.txt</code> on this site.</p>
<h2>How to check whether it's working</h2>
<ul>
<li>Ask several assistants the questions your customers ask, such as "best [service] in [city]" or "who can build [thing]", and note who gets mentioned.</li>
<li>Check whether descriptions of your business are accurate. Errors usually point to unclear or inconsistent information somewhere online.</li>
<li>Watch referral traffic from AI tools in your analytics; many now pass a referrer.</li>
</ul>
<h2>AI visibility questions</h2>
<p><strong>Can I pay to be recommended by ChatGPT?</strong> Not in the normal answers. Be wary of anyone selling guaranteed AI placement.</p>
<p><strong>Is this different from SEO?</strong> It builds on SEO: indexing, clear content, structured data and reputation. The emphasis shifts slightly towards clear facts and mentions across the web.</p>
<p><strong>How long does it take?</strong> Fixing access and clarity is quick. Building mentions and authority takes months, as it does for search.</p>`,
  conclution: `<p>Ask ChatGPT and Perplexity the questions your customers ask, and see who gets named. If it isn't you, start with clarity and consistency, then work on mentions.</p>
<p>You can check the basics on any page with our <a href="/free-seo-checker/">free SEO checker</a>, or ask our <a href="/services/seo-services/">SEO team</a> to look at the whole picture.</p>`,
}
