/**
 * Dates as the type system sees them.
 *
 * `YearMonth` is a template-literal type, so `'2015-06'` compiles and `'2015-13'` or
 * `'June 2015'` don't. Durations are counted the way LinkedIn counts them: both ends
 * inclusive, so May–Nov is 7 months.
 */
type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
export type YearMonth = `${19 | 20}${number}-${Month}`
export type Span = { start: YearMonth; end: YearMonth | 'present' }

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

const parse = (ym: YearMonth) => {
  const [y, m] = ym.split('-').map(Number)
  return { y, m }
}

const toIndex = (ym: YearMonth | 'present', now: Date) =>
  ym === 'present' ? now.getFullYear() * 12 + now.getMonth() : parse(ym).y * 12 + parse(ym).m - 1

export function monthsIn({ start, end }: Span, now = new Date()): number {
  return toIndex(end, now) - toIndex(start, now) + 1
}

export function formatMonth(ym: YearMonth | 'present'): string {
  if (ym === 'present') return 'Present'
  const { y, m } = parse(ym)
  return `${MONTHS[m - 1]} ${y}`
}

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`

export function formatDuration(months: number): string {
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y && plural(y, 'yr'), m && plural(m, 'mo')].filter(Boolean).join(' ')
}

export function formatSpan(span: Span, now = new Date()): string {
  return `${formatMonth(span.start)} – ${formatMonth(span.end)} · ${formatDuration(monthsIn(span, now))}`
}

/** Whole years since a month, for "11+ years" style copy that never goes stale. */
export function yearsSince(start: YearMonth, now = new Date()): number {
  return Math.floor((toIndex('present', now) - toIndex(start, now)) / 12)
}
