import 'dotenv/config'
import { getSupabaseAdmin } from '../lib/supabase'
import { blogSeedPosts } from '../lib/blog-seed'

/**
 * Publishes the launch set of blog posts.
 *
 * Idempotent: matches on slug, so re-running updates existing posts rather than
 * creating duplicates. Safe to run after editing the copy in blog-seed.ts.
 *
 *   npm run seed:blog
 */

function estimateReadMinutes(...htmlParts: (string | null | undefined)[]): number {
  const text = htmlParts.filter(Boolean).join(' ').replace(/<[^>]+>/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

async function main() {
  const sb = getSupabaseAdmin()

  const { error: probeError } = await sb.from('blog_posts').select('id').limit(1)
  if (probeError) {
    if (probeError.code === '42P01' || /schema cache|could not find the table/i.test(probeError.message || '')) {
      console.error(
        '\nThe blog_posts table does not exist yet.\n' +
          'Run Frontend/supabase/blog_posts_migration.sql in the Supabase SQL editor first.\n',
      )
      process.exit(1)
    }
    console.error('Could not reach blog_posts:', probeError.message)
    process.exit(1)
  }

  let created = 0
  let updated = 0

  for (const post of blogSeedPosts) {
    const row = {
      ...post,
      read_duration: estimateReadMinutes(post.introduction, post.content, post.conclution),
      is_active: true,
      updated_at: new Date().toISOString(),
    }

    const { data: existing } = await sb
      .from('blog_posts')
      .select('id')
      .eq('slug', post.slug)
      .maybeSingle()

    if (existing) {
      const { error } = await sb.from('blog_posts').update(row).eq('id', existing.id)
      if (error) {
        console.error(`  ✗ ${post.slug}: ${error.message}`)
        continue
      }
      updated += 1
      console.log(`  ↻ updated  ${post.slug}  (${row.read_duration} min)`)
    } else {
      const { error } = await sb.from('blog_posts').insert(row)
      if (error) {
        console.error(`  ✗ ${post.slug}: ${error.message}`)
        continue
      }
      created += 1
      console.log(`  + created  ${post.slug}  (${row.read_duration} min)`)
    }
  }

  const { count } = await sb
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  console.log(`\n${created} created, ${updated} updated. ${count} published posts live.\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
