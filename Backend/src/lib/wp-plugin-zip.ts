import JSZip from 'jszip'
import type { PluginFile } from './wp-plugin-generator'

/**
 * Build a .zip Buffer from a list of files. Each file's `path` is the full path
 * inside the archive (including the top-level plugin folder, e.g.
 * "nextgen-fusion-pages/nextgen-fusion-pages.php") so the produced zip installs
 * directly via WordPress → Plugins → Add New → Upload.
 */
export async function buildZip(files: PluginFile[]): Promise<Buffer> {
  const zip = new JSZip()
  for (const file of files) {
    zip.file(file.path, file.content)
  }
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
}
