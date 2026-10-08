import type { CalendarPost } from './types'

/** Day 1's date in India. Override with BLOG_CALENDAR_START (YYYY-MM-DD) if the start slips. */
const DEFAULT_START = '2026-10-09'

// Posts go out at a different time each day, between 08:00 and 21:00 IST.
const WINDOW_START_MINUTES = 8 * 60
const WINDOW_LENGTH_MINUTES = 13 * 60
const IST_OFFSET_MINUTES = 330

/** FNV-1a: the same slug always gets the same minute, so restarts never reshuffle the day. */
function hash(text: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export function calendarStart(): string {
  const value = process.env.BLOG_CALENDAR_START?.trim()
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : DEFAULT_START
}

/** When a post is due: its day's date in India, at a minute picked from its slug. */
export function scheduledAt(post: CalendarPost, start = calendarStart()): Date {
  const [year, month, day] = start.split('-').map(Number)
  const minuteOfDay = WINDOW_START_MINUTES + (hash(post.slug) % WINDOW_LENGTH_MINUTES)
  const utcMinutes = minuteOfDay - IST_OFFSET_MINUTES
  return new Date(Date.UTC(year, month - 1, day + post.day - 1, 0, utcMinutes))
}

/** The calendar date in India for a moment, as YYYY-MM-DD. */
export function istDate(moment: Date): string {
  return new Date(moment.getTime() + IST_OFFSET_MINUTES * 60_000).toISOString().slice(0, 10)
}
