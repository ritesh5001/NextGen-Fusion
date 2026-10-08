import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 77,
  title: "OTP login via SMS or WhatsApp: building secure, low-friction sign-in",
  slug: "otp-login-sms-whatsapp",
  excerpt: "OTP login via SMS or WhatsApp: how to build secure, low-friction sign-in, the security rules to follow, delivery costs and India's SMS regulations.",
  category: "Mobile Apps",
  primaryKeyword: "whatsapp otp login",
  cover_image: "/projects/ladyscootytrainer/screenshot-1.png",
  introduction: `<p>One-time passcode (OTP) login lets users sign in with just their phone number: they enter it, receive a short code by SMS or WhatsApp, and type it in. It's familiar and low-friction, especially in India and other mobile-first markets. Done securely, it needs short-lived codes, attempt limits, rate limiting to stop abuse, protection against attackers using your OTP system to send spam, and sensible handling of lost phones and changed numbers.</p>
<p>Done badly, it's also an easy way to run up a large SMS bill for someone else's benefit.</p>`,
  content: `<h2>How OTP login works</h2>
<ol>
<li>The user enters their phone number.</li>
<li>Your server generates a random code, stores a hashed version with an expiry time, and sends the code by SMS or WhatsApp.</li>
<li>The user enters the code.</li>
<li>Your server checks it, marks it used, and signs the user in (creating an account if new).</li>
</ol>
<h2>SMS or WhatsApp?</h2>
<table>
<thead><tr><th></th><th>SMS</th><th>WhatsApp</th></tr></thead>
<tbody>
<tr><td>Reach</td><td>Any phone</td><td>Users with WhatsApp</td></tr>
<tr><td>Delivery</td><td>Can be delayed or filtered by operators</td><td>Usually fast and reliable</td></tr>
<tr><td>Setup</td><td>SMS provider; in India, DLT registration of sender IDs and templates</td><td>WhatsApp Business Platform with an approved authentication template</td></tr>
<tr><td>User experience</td><td>Auto-read of codes on many Android phones</td><td>Copy-code or one-tap buttons in supported templates</td></tr>
</tbody>
</table>
<p>Many products offer WhatsApp first with SMS as a fallback, or let users choose. Both charge per message; check current rates with your provider.</p>
<h2>Security rules</h2>
<ul>
<li><strong>Random, short-lived codes:</strong> generated securely, typically 4–6 digits, valid for a few minutes.</li>
<li><strong>Single use:</strong> a code works once.</li>
<li><strong>Limited attempts:</strong> lock the code after a few wrong guesses, so it can't be brute-forced.</li>
<li><strong>Rate limits on sending:</strong> per phone number, per IP and globally, to stop attackers triggering thousands of messages (SMS pumping fraud) at your expense.</li>
<li><strong>Bot protection</strong> on the request form, such as a CAPTCHA, for the same reason.</li>
<li><strong>Store codes hashed,</strong> never in plain text, and never log them.</li>
<li><strong>Neutral messages:</strong> don't reveal whether a number has an account.</li>
<li><strong>Secure sessions</strong> after login, with sensible expiry and the ability to log out other devices.</li>
</ul>
<h2>Know the weaknesses</h2>
<p>OTP by SMS can be intercepted through SIM-swap fraud or phone number recycling. For most consumer apps, OTP is a reasonable trade-off. For high-risk actions, such as changing payout details, large transactions or account recovery, add extra checks: a second factor, email confirmation, or a delay with notification.</p>
<h2>Handling real-world problems</h2>
<ul>
<li><strong>Codes not arriving:</strong> show a resend option after a short wait, offer the other channel, and monitor delivery rates by operator.</li>
<li><strong>Changed numbers:</strong> provide a recovery route, such as email or support verification.</li>
<li><strong>International users:</strong> handle country codes properly, and check SMS delivery and costs for each country you serve.</li>
<li><strong>Shared devices:</strong> make logout easy and sessions sensible.</li>
</ul>
<h2>Making it low-friction</h2>
<ul>
<li>Pre-fill the country code and format the number as it's typed.</li>
<li>Use the platform's code auto-fill support where available.</li>
<li>Show which number the code went to, with an easy way to correct it.</li>
<li>Keep users signed in on trusted devices so they don't need a code every time.</li>
</ul>
<p>Low-friction sign-in is one of the biggest factors in whether new users stay; see <a href="/blog/app-uninstall-onboarding/">why users uninstall apps in the first week</a>.</p>
<h2>Monitoring after launch</h2>
<ul>
<li><strong>Delivery rate:</strong> codes requested versus codes successfully entered, by channel and operator.</li>
<li><strong>Time to verify:</strong> long delays point to delivery problems.</li>
<li><strong>Request spikes:</strong> sudden surges from one country, IP range or number pattern usually mean abuse.</li>
<li><strong>Cost per verified user:</strong> watch it monthly; a rise without more sign-ups is a warning sign.</li>
</ul>
<h2>Regulations in India</h2>
<p>Businesses sending commercial SMS in India must register on a DLT platform, including their sender ID and message templates, under telecom rules. Your SMS provider will guide you through it; allow time before launch. WhatsApp authentication messages need approved templates; see <a href="/blog/whatsapp-automation-small-business/">WhatsApp automation</a> for the platform rules.</p>
<h2>OTP questions</h2>
<p><strong>Should OTP replace passwords entirely?</strong> For many consumer apps, yes. For business tools with sensitive data, combine it with other factors or offer passkeys and authenticator apps.</p>
<p><strong>Can I use a ready-made authentication service?</strong> Yes, and it's often wise: managed services handle rate limits, delivery and fraud protection for you.</p>
<p><strong>Why are OTP costs higher than expected?</strong> Often fraud: bots requesting codes to premium numbers. Rate limits and bot protection usually fix it.</p>`,
  conclution: `<p>Short-lived single-use codes, strict limits on attempts and sends, bot protection on the request form, and a recovery route for people who change numbers. Get those four right and OTP login is both safe and pleasant.</p>
<p>We build it into apps and websites through our <a href="/services/api-integration-services/">API integration work</a>.</p>`,
}
