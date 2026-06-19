// Scrapes <title> + meta description from each delivered site to help classify it.
// Output: src/data/delivered-meta.json  ({ host: { title, description } })
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const urlsFile = path.join(root, "src", "data", "delivered-urls.json")
const outFile = path.join(root, "src", "data", "delivered-meta.json")

const hostFromUrl = (url) =>
  url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/.*$/, "").toLowerCase()

const pick = (html, re) => {
  const m = html.match(re)
  return m ? m[1].trim().replace(/\s+/g, " ").slice(0, 300) : ""
}

async function scrape(url) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 20000)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html",
      },
    })
    const html = await res.text()
    const title =
      pick(html, /<title[^>]*>([^<]+)<\/title>/i) ||
      pick(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
    const description =
      pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
      pick(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ||
      pick(html, /<meta[^>]+name=["']keywords["'][^>]+content=["']([^"']+)["']/i)
    return { title, description }
  } catch (e) {
    return { title: "", description: "", error: String(e?.message || e).split("\n")[0] }
  } finally {
    clearTimeout(t)
  }
}

async function main() {
  const urls = JSON.parse(await readFile(urlsFile, "utf8"))
  const out = {}
  // small concurrency
  const queue = [...urls]
  const workers = Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const url = queue.shift()
      const host = hostFromUrl(url)
      out[host] = await scrape(url)
      console.log(`${out[host].error ? "✗" : "✓"} ${host} — ${out[host].title || out[host].error || "no title"}`)
    }
  })
  await Promise.all(workers)
  await writeFile(outFile, JSON.stringify(out, null, 2) + "\n")
  const ok = Object.values(out).filter((v) => v.title).length
  console.log(`\nDONE — ${ok}/${urls.length} with title.`)
}

main().catch((e) => { console.error(e); process.exit(1) })
