const timezone = 'Europe/Bucharest'
export const timeSlots = ['09:00', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00']

export function todayInBucharest(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

export function parseDate(date: string): Date {
  return new Date(`${date}T12:00:00`)
}

export function getBookingDates(now = new Date()): string[] {
  const start = parseDate(todayInBucharest(now))
  return Array.from({ length: 21 }, (_, index) => {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
  })
}

export function formatDate(date: string, short = false): string {
  return new Intl.DateTimeFormat('ro-RO', short
    ? { day: 'numeric', month: 'short' }
    : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(parseDate(date))
}

export function isClosed(date: string): boolean { return parseDate(date).getDay() === 0 }

export function slotUnavailable(date: string, time: string, duration: number, now = new Date()): boolean {
  if (!date || isClosed(date) || date < todayInBucharest(now)) return true
  const [hour = 0, minute = 0] = time.split(':').map(Number)
  const startsAt = hour * 60 + minute
  const closing = parseDate(date).getDay() === 6 ? 18 * 60 : 20 * 60
  if (startsAt + duration > closing) return true
  // Deterministic demonstration of unavailable appointments, without an API.
  if (time === '10:00' || time === '14:30') return true
  if (date === todayInBucharest(now)) {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now)
    const currentHour = Number(parts.find(part => part.type === 'hour')?.value ?? 0)
    const currentMinute = Number(parts.find(part => part.type === 'minute')?.value ?? 0)
    return startsAt <= currentHour * 60 + currentMinute
  }
  return false
}

export function dayUnavailable(date: string, duration: number, now = new Date()): boolean {
  return timeSlots.every(time => slotUnavailable(date, time, duration, now))
}
