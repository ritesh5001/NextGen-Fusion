import 'dotenv/config'
import { runHealthCheck } from './src/lib/productflow/health'

const icon = (s: string) => (s === 'ok' ? '✅' : s === 'warn' ? '⚠️ ' : '❌')

runHealthCheck(process.argv[2] === 'deep').then((r) => {
  console.log(`\nSYSTEM READY: ${r.ready ? 'YES' : 'NO'}\n`)
  for (const c of r.checks) console.log(`${icon(c.status)} ${c.label}\n     ${c.detail}`)
  console.log()
}).catch((e) => console.error('health check failed:', e))
