import { buildZip } from './src/lib/wp-plugin-zip'
import fs from 'fs'
const buf = await buildZip([
  { path: 'demo-pages/demo-pages.php', content: '<?php echo "hi";' },
  { path: 'demo-pages/assets/css/dm-pages.css', content: ':root{}' },
])
fs.writeFileSync('demo.zip', buf)
console.log('zip bytes:', buf.length)
