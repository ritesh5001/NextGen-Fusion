/**
 * One post in the 100-day blog calendar (NextGen-Fusion-100-Blog-Topics.xlsx).
 * The copy lives in posts/; schedule.ts decides when each one goes live and
 * publisher.ts inserts it into blog_posts at that moment.
 */
export type CalendarPost = {
  /** Position in the calendar, 1–100. Day 1 publishes on BLOG_CALENDAR_START. */
  day: number
  title: string
  slug: string
  /** Meta description and card text: 120–160 characters. */
  excerpt: string
  category: string
  /** The search phrase the post is written for. Not published; kept for audits. */
  primaryKeyword: string
  cover_image: string
  introduction: string
  content: string
  conclution: string
}
