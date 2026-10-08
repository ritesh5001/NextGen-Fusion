import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 44,
  title: "Why apps get rejected by the App Store and Google Play, and how to avoid it",
  slug: "app-store-rejection-reasons",
  excerpt: "Why apps get rejected by the App Store and Google Play: crashes, incomplete apps, privacy and login issues, misleading listings, and how to avoid each.",
  category: "Mobile Apps",
  primaryKeyword: "app store rejection reasons",
  cover_image: "/projects/ladyscootytrainer/screenshot-1.png",
  introduction: `<p>Most app store rejections come from a small set of problems: the app crashes or is incomplete, the reviewer can't log in or test key features, privacy information is missing or wrong, the app collects data or requests permissions it doesn't justify, the store listing misrepresents the app, or the app breaks payment rules. Nearly all of them can be caught before submission with a checklist and a proper test on real devices.</p>
<p>Almost all of these can be caught with a checklist and an afternoon of proper testing on real phones.</p>`,
  content: `<h2>Know the rulebooks</h2>
<p>Apple's <a href="https://developer.apple.com/app-store/review/guidelines/" rel="noopener">App Review Guidelines</a> and Google Play's <a href="https://play.google.com/about/developer-content-policy/" rel="noopener">Developer Program Policy</a> are the sources of truth. Apple reviews every submission with people involved; Google relies more on automated checks, with policy enforcement that can also hit apps already live. Both update their rules regularly, so check them before each major release.</p>
<h2>1. Crashes and bugs</h2>
<p>An app that crashes during review is rejected. Reviewers test on current devices and operating system versions, which may differ from the ones your team used.</p>
<p><strong>Avoid it:</strong> test on several real devices, including the newest OS version, with a fresh install, slow network and no network. Use a crash reporting tool during testing.</p>
<h2>2. Incomplete or placeholder content</h2>
<p>Empty screens, "coming soon" sections, lorem ipsum text, broken links or features that don't do anything yet are common reasons for rejection.</p>
<p><strong>Avoid it:</strong> submit only what's finished. Hide unfinished features completely rather than showing them disabled.</p>
<h2>3. Reviewers can't log in</h2>
<p>If the app needs an account and the reviewer can't sign in, they can't review it. Apps that require OTP to a real phone number are a common trap.</p>
<p><strong>Avoid it:</strong> provide working demo credentials in the review notes, with any test OTP or bypass clearly explained, and make sure the demo account has realistic data.</p>
<h2>4. Privacy and data handling</h2>
<ul>
<li>Missing or inaccurate privacy policy.</li>
<li>Privacy labels (Apple) or Data safety section (Google) that don't match what the app actually collects, including through third-party SDKs.</li>
<li>Collecting data without a clear reason, or without consent where required.</li>
<li>No way to delete an account created in the app. Both stores now expect account deletion to be available.</li>
</ul>
<p><strong>Avoid it:</strong> list every SDK in the app and what each collects, write the privacy policy and store declarations from that list, and add in-app account deletion.</p>
<h2>5. Permissions without justification</h2>
<p>Requesting location, contacts, camera or background access without a clear purpose gets apps rejected, or users refusing. Some permissions, like background location or SMS access on Android, need specific justification.</p>
<p><strong>Avoid it:</strong> request each permission only when the feature needs it, explain why in the prompt text, and remove permissions you don't use.</p>
<h2>6. Misleading store listing</h2>
<p>Screenshots that show features the app doesn't have, keyword-stuffed titles, or descriptions that promise more than the app does are rejected or removed.</p>
<p><strong>Avoid it:</strong> use real screenshots, an honest description and a name that matches the app.</p>
<h2>7. Payments and digital goods</h2>
<p>Selling digital content or features inside the app is subject to each store's payment rules, which have specific requirements and have changed in some countries. Physical goods and real-world services generally use your own payment provider.</p>
<p><strong>Avoid it:</strong> check the current rules for what you sell and where, before designing the payment flow.</p>
<h2>8. Minimum functionality</h2>
<p>Apple in particular rejects apps that are just a website in a wrapper, or that offer too little to justify being an app.</p>
<p><strong>Avoid it:</strong> make sure the app adds value beyond the website: native features, offline use, notifications, or a better experience. If it doesn't, a mobile website may be the better product; see <a href="/blog/app-or-website/">app or website</a>.</p>
<h2>9. Login options</h2>
<p>Apple's rules on offering Sign in with Apple when other third-party logins are present have changed over time; check the current guideline if your app offers social logins.</p>
<h2>A pre-submission checklist</h2>
<ol>
<li>Tested on real devices and the newest OS version, fresh install.</li>
<li>No placeholders, broken links or dead buttons.</li>
<li>Demo login and test instructions in the review notes.</li>
<li>Privacy policy live, store privacy declarations match the app and SDKs.</li>
<li>Account deletion available in the app.</li>
<li>Only necessary permissions, each with a clear explanation.</li>
<li>Honest screenshots and description.</li>
<li>Payment flow follows the store's rules for what you sell.</li>
</ol>
<h2>If you're rejected</h2>
<p>Read the rejection carefully: it cites the guideline. Fix the issue, reply in the resolution centre or console if something needs explaining, and resubmit. If you believe the reviewer misunderstood, explain politely with details; appeals do succeed.</p>
<h2>App review questions</h2>
<h3>How long does review take?</h3>
<p>It varies. Plan for some days around launch, and longer for first submissions or apps in sensitive categories.</p>
<h3>Can an approved app be removed later?</h3>
<p>Yes, if it breaks policy later or policies change. Keep up with policy updates and keep your declarations current.</p>
<h3>Do updates get reviewed too?</h3>
<p>Yes, every update goes through review.</p>`,
  conclution: `<p>Treat the reviewer as your first user: give them a working login, a finished app and honest store information. Most rejections we see would have been caught by doing just that.</p>
<p>Our <a href="/services/android-app-development-services/">app team</a> handles store submissions as part of every build.</p>`,
}
