import { processOnce } from '../routes/cron'

let timer: NodeJS.Timeout | null = null
let running = false

async function tick() {
  if (running) return
  running = true
  try {
    await processOnce()
  } catch (err) {
    console.error(
      '[campaign-processor] queue processing failed:',
      err instanceof Error ? err.message : err,
    )
  } finally {
    running = false
  }
}

export function startCampaignProcessor() {
  const enabled = process.env.CAMPAIGN_PROCESSOR_ENABLED !== 'false'
  if (!enabled) return
  if (timer) return

  const intervalMs = Math.max(
    5_000,
    Number(process.env.CAMPAIGN_PROCESSOR_INTERVAL_MS || 30_000),
  )

  timer = setInterval(() => {
    void tick()
  }, intervalMs)

  // Kick once on boot so already-due recipients do not wait for the first interval.
  void tick()

  console.log(`[campaign-processor] running every ${intervalMs}ms`)
}
