// Captures a screenshot of every delivered project site into public/delivered/<slug>.jpg
// Usage: node scripts/capture-delivered.mjs   (re-run is safe; existing files are skipped)
import { chromium } from "playwright"
import { readFile, writeFile, readdir, mkdir, access } from "node:fs/promises"
import { constants } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const outDir = path.join(root, "public", "delivered")
const urlsFile = path.join(root, "src", "data", "delivered-urls.json")

const hostFromUrl = (url) =>
  url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/.*$/, "").toLowerCase()
const slugFor = (url) => hostFromUrl(url).replace(/[^a-z0-9]+/g, "-")

const exists = async (p) => {
  try { await access(p, constants.F_OK); return true } catch { return false }
}

async function main() {
  const urls = JSON.parse(await readFile(urlsFile, "utf8"))
  await mkdir(outDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  })

  let ok = 0
  const failed = []

  for (const url of urls) {
    const slug = slugFor(url)
    const dest = path.join(outDir, `${slug}.jpg`)
    if (await exists(dest)) { ok++; continue }

    const page = await context.newPage()
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 })
      await page.waitForTimeout(2500) // let hero images / fonts settle
      await page.screenshot({ path: dest, type: "jpeg", quality: 72, clip: { x: 0, y: 0, width: 1280, height: 800 } })
      ok++
      console.log(`✓ ${slug}`)
    } catch (err) {
      // Retry once with a looser load condition before giving up.
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 })
        await page.waitForTimeout(3000)
        await page.screenshot({ path: dest, type: "jpeg", quality: 72, clip: { x: 0, y: 0, width: 1280, height: 800 } })
        ok++
        console.log(`✓ ${slug} (retry)`)
      } catch (err2) {
        failed.push(slug)
        console.log(`✗ ${slug} — ${err2?.message?.split("\n")[0] || "failed"}`)
      }
    } finally {
      await page.close()
    }
  }

  await browser.close()

  // Refresh the manifest of slugs that actually have a screenshot on disk, so the
  // UI can prefer real screenshots over fallback cards.
  const captured = (await readdir(outDir))
    .filter((f) => f.endsWith(".jpg"))
    .map((f) => f.replace(/\.jpg$/, ""))
    .sort()
  await writeFile(
    path.join(root, "src", "data", "delivered-captured.json"),
    JSON.stringify(captured, null, 2) + "\n",
  )

  console.log(`\nDONE — captured ${ok}/${urls.length}. Failed: ${failed.length ? failed.join(", ") : "none"}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
