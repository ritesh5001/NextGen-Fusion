# WooCommerce or Shopify? We've built nine of one and none of the other

This is the question we field more than any other on ecommerce calls, usually from someone who has
already been told by two different people that the answer is obvious. It isn't, and the honest answer
takes about twenty minutes.

So here it is written down, including the parts that don't flatter us.

## Start with what biases me

We have built nine WooCommerce stores. [Samaraha](/work/samaraha/), [New Saraswati Saree Centre](/work/newsaraswatisareecentre/), [Sitara Vastram](/work/sitaravastram/), [Kalamohini by Aditya](/work/kalamohini/), [Mahhika](/work/mahhika/), [Krushi Doctor](/work/krushidoctor/), [ClickNGreet](/work/clickngreet/), [TerrestrialYT](/work/terrestrialyt/), [Saurally Solar](/work/saurally/). You can click any of those and read what we actually built.

We have built zero Shopify stores.

So read everything below as a WooCommerce builder's opinion, because that is what it is. I can tell
you exactly how a WooCommerce store behaves in month fourteen when the catalogue has tripled and
somebody installed a review plugin without asking. I cannot tell you from experience how Shopify's
checkout holds up at ten thousand orders a month, and anyone who claims to answer both sides equally
well is usually selling one of them.

That disclosure matters more than it looks, because most "WooCommerce vs Shopify" comparisons are
written by people with an affiliate link, and they all reach the same conclusion by coincidence.

## The comparison that everyone writes is the wrong one

Feature tables are useless here. Both platforms do product variants. Both take UPI. Both do
wishlists, discount codes, abandoned cart emails, and multi-currency. If you pick on features you
will find them equivalent and then pick on vibes.

The three questions that actually decide it:

**Who edits the site on a Tuesday afternoon?** If that person is you, and you are not technical, and
you want to add a product between customer calls — that pushes toward Shopify. If it is a marketing
person who already lives in WordPress, WooCommerce costs you nothing new to learn.

**How strange is your catalogue?** Not how big. Strange. Twelve thousand simple SKUs is easy.
Forty products where each one has a fabric, a weave, a blouse option, and a made-to-order lead time
is hard, and it is where template platforms start charging you an app subscription per problem.

**Who fixes it at 11pm during a Diwali sale?** This is the question nobody asks until the night it
matters. It has a different answer on each platform and the difference is the whole argument.

## The money, with actual numbers

Most agencies won't publish this. We do, on our [pricing page](/pricing/), and here is the short
version.

A WooCommerce store from us is quoted in the ₹4,000–₹7,000 band. That is the build. It buys catalogue
setup, the storefront, payment gateway integration and Shiprocket integration — those two are in
every ecommerce build we do rather than being quoted as extras.

A custom-coded store starts at ₹50,000 and runs to about ₹1,15,000 depending on the package, because
it is a genuinely different product and not a better version of the same one.

Integrations are where the platform choice shows up in the invoice most clearly. On WooCommerce we
quote roughly ₹2,500 per integration. On a custom build the same integration is ₹10,000, because on
WooCommerce a large part of the work is configuration and on a custom build all of it is
engineering. Individual features follow the same pattern — a feature that costs a certain amount to
build custom runs at about a quarter of that on WooCommerce.

Terms are the same on every project we take: 50% advance to start, 50% at payment-gateway
integration. For a store that means the balance falls due at the point the thing can actually take
money, which we think is the only defensible place to put it.

Shopify's side of this is a monthly plan fee plus transaction charges if you use a gateway other than
Shopify Payments. Check their current India plan pricing yourself rather than trusting a number in a
blog post — ours included. It changes.

Your payment gateway takes roughly 2% of every transaction regardless of platform. That one is not a
differentiator, but it belongs in your spreadsheet, and it is the number most first-time sellers
forget entirely.

## The honest problem with what I'm about to recommend

Here is the part I would want to hear if I were the one buying.

WooCommerce is cheap to build and expensive to own. That is not a slogan, it is the actual shape of
the cost. Plugins conflict with each other. A WordPress core update breaks a page builder. The
review plugin somebody installed loads its own JavaScript on every product page and nobody notices
until the site feels slow. None of this is hypothetical — it is most of what our
support work consists of.

We charge ₹15,000 a year for the WooCommerce plan that covers ongoing changes, and ₹2,000 a year for
the basic one that covers uptime monitoring and fixes but not content changes. On a custom build the
equivalent plan is ₹5,000 a month, which is considerably more, and honestly reflects that there is
more that only we can fix.

I would not describe the ₹15,000 as optional. If your plan is to buy a WooCommerce store and then
touch nothing for two years, you are not saving money, you are deferring it and adding risk. Stores
we inherit from that pattern usually need more work than a fresh build.

Shopify's monthly fee is, in large part, you paying somebody else to make that entire category of
problem disappear. That is worth real money and I am not going to pretend otherwise to win the
project.

## When I'd tell you to go to Shopify

Three situations where the honest recommendation costs us the project.

If you are one person, non-technical, launching your first thirty products, and the honest constraint
on your business is your own time — go to Shopify. You will spend less of your life on the store and
more of it on the product, and that is the correct trade at that stage.

If you are selling internationally from day one across several currencies and tax regimes, go to
Shopify. Their tooling for that is mature and rebuilding it on WooCommerce is not a good use of your
budget.

If nobody in your business has ever maintained a website and nobody wants to start — go to Shopify.
The maintenance burden I described above does not disappear because you ignore it; it just arrives
later and angrier.

## Where WooCommerce actually earned it

The pattern in our nine builds is consistent, and it is not "we like WordPress."

**Krushi Doctor** is the clearest case. It sells over a hundred agricultural products — insecticides,
fertilisers, sticky traps — to Indian farmers, and the thing that makes it work is that downloadable
crop PDF guides are linked directly to the relevant product pages. A farmer reading about aphid
management can buy the right insecticide from inside the guide. That is content and commerce in one
system, and WordPress is very good at exactly that. It also had to be fast on entry-level Android
phones over 4G, which shaped every decision on the build.

**Sitara Vastram** put short-form fashion video into the shopping flow rather than in a separate
"videos" tab, so buyers see outfits in motion before they reach the product page. **New Saraswati
Saree Centre** has dedicated collection pages for Diwali, Navratri and Durga Puja — built as real
landing pages you can rank and advertise, not filter URLs. **TerrestrialYT** is a creator merch store
wired into Discord, Twitch, YouTube and Instagram so fans move between the community and the store
without it feeling like two websites.

**Samaraha** sells silk sarees in the ₹5,000–₹25,000 range, which is a high-consideration purchase,
so it needed multi-attribute filtering by silk type and weave, side-by-side comparison of up to three
sarees, and a member pricing tier. **ClickNGreet** organises the entire journey around "what's the
occasion?" and treats bulk corporate gifting as a first-class flow, not an afterthought form.

Read those back and the common thread is not a feature. It is that each one needed the store bent
into an unusual shape — around a crop cycle, a festival calendar, a Discord server, an occasion. On a
template platform each of those bends is an app subscription, a workaround, or a no. Details of what
a store build includes are on our [ecommerce development page](/services/ecommerce-web-development-services/).

## When neither answer is right

TatVivah Trends is the one we did not build on WooCommerce. It is a multi-vendor wedding ethnic wear
marketplace with over three thousand products, where independent sellers list and manage their own
inventory, and where the primary way of browsing is by occasion — haldi, mehendi, sangeet — because
that is how wedding shoppers actually think. Razorpay handles UPI, cards, net banking and EMI. There
is a ten-day returns policy and verified seller badges doing the trust work. Over 80% of that audience
shops on a phone, so mobile was not a checkbox at the end.

Multi-vendor with independent seller dashboards is where template platforms stop being cheaper. So
that one is Next.js and it is priced accordingly.

But I want to be careful here, because this is the section where agencies talk you into the expensive
option. I would talk most people out of a custom build. If you are selling your own products from your
own inventory, you almost certainly do not need one, and the honest test is whether the template
version is *provably* the constraint — not whether you can imagine it becoming one.

## The thing that will actually delay your launch

It is not the platform. It has never once been the platform.

It is the catalogue. Product names, real descriptions, prices, and photography that is consistent
enough to sit in a grid without looking like six different shops. We ask for that list in week one
specifically so the delay surfaces early and visibly instead of in week six when everything else is
finished and waiting.

A store build from us runs six to ten weeks from content sign-off. Note the phrase — from content
sign-off, not from the contract date. Those are frequently very different dates and the gap between
them is almost always the catalogue.

## If you're deciding this week

Write down three things before you talk to anyone, us included: how many products you're launching
with, who is going to add the next one, and what your realistic monthly budget is for the store
existing at all — not the build, the running.

If the answer to the second question is "me, and I'd rather not," that is a Shopify answer and you
can stop reading comparison articles.

If your catalogue needs to bend around something — a season, a crop, a community, an occasion — send
us the brief and we'll tell you which of the two we'd build it on, including when that answer is
"neither, and here's why." We work with businesses across Uttar Pradesh from our
[Lucknow office](/ecommerce-development-company-in-lucknow/), and you'll get a written scope and a
number back within one working day rather than an invitation to a discovery call.

## Questions clients actually ask

**"If I start on Shopify, can I move to WooCommerce later?"**
Yes, and people do it in both directions. Products, customers and orders migrate fine. The part that
gets skipped is URL redirects, and skipping them throws away whatever search visibility the old store
had earned. Budget for the migration properly or don't do it.

**"Will my WooCommerce store be slow?"**
It will be if nobody looks after it. That is the honest answer. WordPress is not inherently slow —
plugin sprawl is. We check Core Web Vitals on a throttled mobile connection before launch, because
that is the condition your customers are actually in, but staying fast is a maintenance job, not a
launch-day one.

**"Do I really need the support plan?"**
On WooCommerce, in practice, yes. You can decline it and some clients do. What happens is that
nothing goes wrong for eight months and then several things go wrong at once, and the catch-up work
costs more than the plan would have.

**"Can I add products myself?"**
Yes, on either platform, and we set you up and show you how. WooCommerce's admin has more in it,
which means slightly more to learn and considerably more you can do without calling us.

**"Who owns everything if I stop working with you?"**
You do, from day one — domain, hosting, the WordPress install, the payment gateway account, analytics.
All registered in your name and we work inside your accounts. The gateway especially, because it is
tied to your GST and bank details and should never sit with a developer. If you leave, nothing needs
handing over, because none of it was ever ours.

**"You've never built a Shopify store — should that worry me?"**
It should inform you. If you have decided on Shopify, hire somebody who builds them every week; we'd
be learning on your money. If you are still deciding, the fact that nine clients in a row were better
served by WooCommerce is itself a data point — but it is a data point about the kind of client who
finds us, not proof of anything universal.
