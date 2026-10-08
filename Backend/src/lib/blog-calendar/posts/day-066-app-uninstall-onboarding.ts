import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 66,
  title: "Why users uninstall apps in the first week, and the onboarding fixes that keep them",
  slug: "app-uninstall-onboarding",
  excerpt: "Why users uninstall apps in the first week, and the onboarding fixes that keep them: faster first value, easier sign-up, smarter permission requests.",
  category: "Mobile Apps",
  primaryKeyword: "why users uninstall apps",
  cover_image: "/projects/terrestrialyt/screenshot-1.png",
  introduction: `<p>Most apps lose a large share of new users within days of installation, and the reasons are usually in the first few minutes: the app asks for too much before giving anything back, sign-up is long, permissions and notifications are requested before users understand why, the app is slow or buggy, or it simply isn't clear what to do first. Good onboarding gets new users to a first useful result quickly, then asks for more only when it's earned.</p>`,
  content: `<h2>Why users uninstall early</h2>
<ul>
<li><strong>No quick value:</strong> they can't see what the app does for them in the first session.</li>
<li><strong>Sign-up walls:</strong> a long registration before seeing anything.</li>
<li><strong>Permission overload:</strong> location, contacts, notifications and camera requested on launch.</li>
<li><strong>Too many notifications</strong> in the first days, often promotional.</li>
<li><strong>Performance:</strong> slow loading, crashes, large download size, battery drain.</li>
<li><strong>Confusion:</strong> busy screens and unclear next steps.</li>
<li><strong>Mismatch with the store listing:</strong> the app isn't what the screenshots suggested.</li>
</ul>
<h2>Fix 1: Get to first value fast</h2>
<p>Identify the moment a new user first gets something useful (browsing products, seeing their first lesson, booking a slot, viewing their order) and remove everything that stands between installation and that moment. Measure how long it takes and keep shortening it.</p>
<h2>Fix 2: Delay or simplify sign-up</h2>
<ul>
<li>Let people browse before creating an account where possible.</li>
<li>Ask for the minimum: a phone number with OTP, or a social login, rather than a long form.</li>
<li>Collect profile details later, when they're needed.</li>
</ul>
<p>OTP sign-in is particularly common in India; we cover building it securely later in this series.</p>
<h2>Fix 3: Ask for permissions in context</h2>
<p>Request location when the user taps "find nearest store", camera when they tap "scan", notifications after they've done something worth being notified about. Explain why in a sentence before the system prompt appears. Users grant permissions far more often when the reason is obvious, and refuse them on launch.</p>
<h2>Fix 4: Make notifications earn their place</h2>
<ul>
<li>Start with notifications users clearly want: order updates, reminders they set, messages.</li>
<li>Hold back marketing pushes until users are engaged, and keep them infrequent.</li>
<li>Let users choose notification types in settings.</li>
</ul>
<h2>Fix 5: Short, optional guidance</h2>
<p>Long tutorial carousels are usually skipped. Contextual tips, shown once at the moment a feature is useful, work better. Empty states (screens with no data yet) should explain what to do next, not just say "nothing here".</p>
<h2>Fix 6: Performance and size</h2>
<ul>
<li>Keep the download size reasonable, especially for markets where many users have limited storage and data.</li>
<li>Make the first screen load quickly, even on mid-range phones.</li>
<li>Track crashes and fix them fast, prioritising the ones in onboarding.</li>
</ul>
<h2>Fix 7: Bring users back thoughtfully</h2>
<p>A helpful email or notification after a day or two ("Your first lesson is waiting", "Your saved items are still in stock") can bring back users who got distracted, as long as it's relevant and not frequent.</p>
<h2>Measure the funnel</h2>
<p>Track each step of onboarding as an event: app opened, sign-up started, sign-up completed, first key action, returned next day, returned after a week. The step with the biggest drop is where to work first. Watch day-1, day-7 and day-30 retention by install source, since users from different campaigns behave differently.</p>
<h2>Sometimes the answer is fewer installs</h2>
<p>If your customers use your service only occasionally, many will uninstall no matter how good the onboarding is. A fast mobile website or a progressive web app may serve them better; see <a href="/blog/app-or-website/">app or website</a> and <a href="/blog/progressive-web-apps/">progressive web apps</a>.</p>
<h2>Retention questions</h2>
<h3>What retention is normal?</h3>
<p>It varies hugely by category. Compare your app with itself over time, and focus on improving the first week.</p>
<h3>Should onboarding be skippable?</h3>
<p>Usually yes. Let experienced users go straight in, and provide help when it's needed.</p>
<h3>Do uninstall surveys help?</h3>
<p>Some platforms and tools let you ask why users leave, or you can ask churned users by email. The answers are often blunt and useful.</p>`,
  conclution: `<p>Measure each onboarding step as its own event, find the biggest drop and fix that first. It's usually earlier in the flow than people expect: a sign-up form, a permission prompt, a slow first screen.</p>`,
}
