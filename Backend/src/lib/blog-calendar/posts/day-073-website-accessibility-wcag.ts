import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 73,
  title: "Website accessibility (WCAG) for small businesses: what it is, the legal risk and quick fixes",
  slug: "website-accessibility-wcag",
  excerpt: "Website accessibility (WCAG) for small businesses: what it means, the legal risk in different markets, and the quick fixes that help visitors most.",
  category: "UX & Conversion",
  primaryKeyword: "website accessibility wcag small business",
  cover_image: "/projects/tatvivahtrends/screenshot-1.png",
  introduction: `<p>Website accessibility means people with disabilities, including people who are blind or have low vision, are deaf, have motor impairments or cognitive differences, can use your site. The Web Content Accessibility Guidelines (WCAG) are the standard most laws and contracts refer to. For small businesses, accessibility is partly a legal question, depending on where you sell, and mostly a practical one: the same fixes, such as readable text, good contrast, labelled forms and keyboard support, make the site easier for every visitor.</p>
<p>Accessibility is partly a legal question, depending on where you sell, and mostly a practical one: the same fixes make the site easier for everyone.</p>`,
  content: `<h2>What WCAG is</h2>
<p><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" rel="noopener">WCAG</a>, published by the W3C, organises accessibility around four principles: content must be perceivable, operable, understandable and robust. It has three levels, A, AA and AAA. Level AA is the usual target in laws and procurement.</p>
<h2>The legal picture, briefly</h2>
<p>This isn't legal advice, and rules change, but in outline:</p>
<ul>
<li><strong>United States:</strong> lawsuits over inaccessible websites under the Americans with Disabilities Act are common, including against small businesses selling online.</li>
<li><strong>European Union:</strong> the European Accessibility Act applies accessibility requirements to many consumer products and services, including e-commerce, from June 2025, with exemptions for micro-enterprises providing services.</li>
<li><strong>United Kingdom:</strong> the Equality Act requires reasonable adjustments, and public sector sites have specific accessibility regulations.</li>
<li><strong>India:</strong> accessibility standards apply to government websites, and the Rights of Persons with Disabilities Act sets broader obligations.</li>
</ul>
<p>If you sell into these markets, check the specific rules with a professional.</p>
<h2>Quick fixes that help most</h2>
<h3>1. Text alternatives for images</h3>
<p>Meaningful images need alt text describing what they show or do. Decorative images should have empty alt text so screen readers skip them.</p>
<h3>2. Colour contrast</h3>
<p>Text needs enough contrast against its background. Light grey text on white is a common failure. Contrast checkers in browser tools make this easy to test.</p>
<h3>3. Readable text</h3>
<p>Reasonable font sizes, text that can be enlarged without breaking the layout, and line spacing that's comfortable to read.</p>
<h3>4. Keyboard access</h3>
<p>Everything you can do with a mouse should work with the Tab and Enter keys: menus, buttons, forms, pop-ups. A visible focus outline must show where you are. Try navigating your own site without a mouse.</p>
<h3>5. Labelled forms</h3>
<p>Every form field needs a visible label (not only placeholder text), clear instructions and error messages that say what went wrong and how to fix it.</p>
<h3>6. Headings in order</h3>
<p>Use real headings (H1, H2, H3) in a logical structure. Screen reader users navigate by headings.</p>
<h3>7. Descriptive links and buttons</h3>
<p>"Read more" and "Click here" repeated on a page are meaningless out of context. Use "Read the returns policy" or "View the case study".</p>
<h3>8. Captions and transcripts</h3>
<p>Videos need captions; audio content needs transcripts.</p>
<h3>9. Pop-ups and motion</h3>
<p>Pop-ups must be closable with the keyboard and announced to screen readers. Avoid auto-playing motion, or let users pause it, and respect reduced-motion settings.</p>
<h2>How to check your site</h2>
<ul>
<li><strong>Automated tools</strong> such as Lighthouse's accessibility audit catch many issues quickly, but only a portion of them.</li>
<li><strong>Keyboard test:</strong> unplug the mouse and try to complete a purchase or enquiry.</li>
<li><strong>Screen reader test:</strong> try VoiceOver on a Mac or iPhone, or TalkBack on Android, on key pages.</li>
<li><strong>Zoom test:</strong> zoom to 200% and check nothing breaks or overlaps.</li>
</ul>
<h2>About accessibility overlays</h2>
<p>Widgets that promise one-line accessibility compliance generally don't fix underlying problems and are widely criticised by accessibility experts and users. Fix the site itself.</p>
<h2>Accessibility helps everyone</h2>
<p>Good contrast helps people outdoors on phones. Captions help people watching without sound. Clear forms and headings help everyone. And accessible structure overlaps heavily with good SEO and good UX; see <a href="/blog/ux-design-for-business-owners/">UX design for business owners</a> and <a href="/blog/mobile-first-design/">mobile-first design</a>.</p>
<h2>Accessibility questions</h2>
<p><strong>Do I need to meet every WCAG criterion?</strong> Aim for Level AA on your key pages and flows first, then extend. Progress matters more than perfection on day one.</p>
<p><strong>Is an accessibility statement useful?</strong> Yes. A short page saying what standard you aim for, known issues and how to contact you for help shows good faith and gives people a route to report problems.</p>
<p><strong>How much work is it?</strong> For a typical small site, the main fixes are a matter of days. Building accessibility in from the start costs much less than retrofitting.</p>`,
  conclution: `<p>Unplug your mouse and try to make an enquiry on your own site with just the keyboard. It's the quickest accessibility test there is, and it usually finds something.</p>
<p>Our <a href="/services/web-design-services/">web design team</a> can review and fix the rest.</p>`,
}
