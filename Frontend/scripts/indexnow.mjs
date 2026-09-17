#!/usr/bin/env node
/**
 * Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver).
 *
 * The IndexNow key file already existed in /public and is live — what was
 * missing was anything that actually submits URLs to it. Bing, and therefore
 * Copilot, picks up an IndexNow submission in hours instead of days.
 *
 * Run after a production deploy:
 *
 *   npm run indexnow
 *
 * On Vercel, call it from a Deploy Hook or a post-deploy step. Safe to run
 * repeatedly — IndexNow ignores duplicate submissions.
 */
import { readdirSync } from "node:fs"
import { join } from "node:path"

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nextgenfusion.in"
const host = new URL(SITE).host

// The key is the filename of the key file in /public, which must also be its
// contents. Discovered rather than hard-coded so rotating the key is one
// file rename.
const publicDir = join(process.cwd(), "public")
const keyFile = readdirSync(publicDir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
if (!keyFile) {
  console.error("No IndexNow key file in /public (expected <32-hex-chars>.txt).")
  process.exit(1)
}
const key = keyFile.replace(/\.txt$/, "")

const sitemapRes = await fetch(`${SITE}/sitemap.xml`)
if (!sitemapRes.ok) {
  console.error(`Could not fetch sitemap: HTTP ${sitemapRes.status}`)
  process.exit(1)
}

const urlList = [...(await sitemapRes.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urlList.length === 0) {
  console.error("Sitemap contained no URLs — refusing to submit an empty set.")
  process.exit(1)
}

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${SITE}/${keyFile}`, urlList }),
})

// 200/202 = accepted. 422 means the key or host did not validate.
console.log(`IndexNow: submitted ${urlList.length} URLs from ${host} → HTTP ${res.status}`)
if (!res.ok) {
  console.error(await res.text().catch(() => ""))
  process.exit(1)
}
