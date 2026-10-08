import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 62,
  title: "Mobile-first design: why a desktop-first website is losing you customers",
  slug: "mobile-first-design",
  excerpt: "Mobile-first design explained: why a desktop-first website is losing you customers, what designing for phones first changes, and how to apply it to your site.",
  category: "UX & Conversion",
  primaryKeyword: "mobile first design",
  cover_image: "/projects/nextmentor/screenshot-1.png",
  introduction: `<p>Mobile-first design means designing for the phone screen first and then expanding the layout for tablets and desktops, instead of designing for a laptop and squeezing it down. Because most visitors to most business websites arrive on phones, and Google uses the mobile version of pages for indexing and ranking, a site designed desktop-first usually serves the majority of its visitors worst. Designing for phones first forces clearer priorities, simpler pages and faster loading, which also tends to improve the desktop version.</p>
<p>Most visitors to most business websites are on phones, yet most websites are still approved on a laptop. That mismatch is what this post is about.</p>`,
  content: `<h2>Why desktop-first loses customers</h2>
<ul>
<li>Layouts approved on large monitors are later crammed into a phone, with tiny text and crowded buttons.</li>
<li>Important actions end up far down the page on mobile, below images and banners.</li>
<li>Heavy images and effects designed for desktop slow phones down on mobile data.</li>
<li>Hover menus and interactions don't translate to touch.</li>
<li>Nobody checks the mobile version carefully before launch.</li>
</ul>
<p>Visitors don't complain. They leave, and your analytics show high mobile bounce rates and low mobile conversion.</p>
<h2>What mobile-first changes</h2>
<h3>Priorities</h3>
<p>A phone screen fits one thing at a time. You have to decide what matters most on each page and put it first. That clarity helps every visitor, including desktop users.</p>
<h3>Content</h3>
<p>Shorter paragraphs, clear headings, and the key information early. Long blocks of text and side columns don't work on phones.</p>
<h3>Actions</h3>
<p>Big, easy-to-tap buttons, click-to-call and WhatsApp links, short forms, and sticky actions like "Add to cart" or "Book" within thumb reach.</p>
<h3>Navigation</h3>
<p>A simple menu with the most important links, and key actions visible outside the menu. See <a href="/blog/website-navigation-mistakes/">website navigation mistakes</a>.</p>
<h3>Performance</h3>
<p>Smaller images, fewer scripts, no autoplay videos. Designing for slower phones and connections first keeps the site fast everywhere.</p>
<h2>Mobile-first in practice</h2>
<ol>
<li><strong>Start wireframes at phone width.</strong> Decide the order of content on each page as a single column.</li>
<li><strong>Design the phone version of key pages first</strong> (home, service or product, contact, checkout) and get them approved on an actual phone.</li>
<li><strong>Expand for larger screens,</strong> adding columns and space where it helps, not just stretching.</li>
<li><strong>Build with responsive CSS</strong> that starts from mobile styles and adds rules for larger screens.</li>
<li><strong>Test on real devices,</strong> including older and smaller phones, and on mobile data.</li>
</ol>
<h2>Common mobile details that matter</h2>
<ul>
<li>Body text at a readable size, around 16px or more.</li>
<li>Tap targets large enough and spaced apart.</li>
<li>Forms with the right keyboard types (number pads for phone numbers, email keyboards for email).</li>
<li>Autofill support on forms and checkout.</li>
<li>Pop-ups that don't cover the screen and close easily.</li>
<li>Images sized for phones, not desktop images scaled down.</li>
</ul>
<h2>Mobile-first and SEO</h2>
<p>Google indexes and ranks the mobile version of your pages. If content, headings, structured data or internal links are missing on mobile (for example hidden to save space), Google may not see them. Make sure the mobile version contains the same important content as desktop, even if it's arranged differently.</p>
<h2>Measuring the difference</h2>
<p>Compare mobile and desktop in analytics: conversion rate, bounce rate and time on key pages. A large gap usually signals a mobile problem worth fixing. If parts of your site look broken on phones today, start with <a href="/blog/website-broken-on-mobile/">why your website looks broken on mobile</a>, and check the top of the page with <a href="/blog/hero-section-first-5-seconds/">your hero section has five seconds</a>.</p>
<h2>Mobile-first questions</h2>
<h3>Does mobile-first mean the desktop site looks worse?</h3>
<p>No. It means the desktop version is built up from a clear core, which often makes it cleaner.</p>
<h3>Is responsive design the same as mobile-first?</h3>
<p>Responsive means the layout adapts to screen size. Mobile-first is the approach of designing for the smallest screen first. Most good responsive sites today are built mobile-first.</p>
<h3>Our customers are businesses on desktops. Does this apply?</h3>
<p>Check your analytics. B2B audiences often research on phones too, even if they buy on desktop.</p>`,
  conclution: `<p>Next time you review a design, look at it on your phone first. If it doesn't work there, it doesn't work.</p>
<p>Our <a href="/services/web-design-services/">web design team</a> designs for phones first by default.</p>`,
}
