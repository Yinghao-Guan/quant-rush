/**
 * Date-based status for schedule items. Shared by server rendering (build time)
 * and the small client scripts that re-apply it with the visitor's clock.
 */
export type Status = { past: boolean; current: boolean; today: boolean };

export function localDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Each item ends at the close of its day, Pacific time. */
export function endOfDay(dateISO: string): Date {
  return new Date(`${dateISO}T23:59:59-08:00`);
}

export function computeStatus(dates: string[], now: Date = new Date()): Status[] {
  const today = localDate(now);
  let currentSet = false;
  return dates.map((d) => {
    const past = endOfDay(d) < now;
    const current = !past && !currentSet;
    if (current) currentSet = true;
    return { past, current, today: d === today };
  });
}

export function badgeHTML(s: Status, kind: string): string {
  if (s.today) return '<span class="badge badge--today">Today</span>';
  if (s.past) return '<span class="badge badge--done">✓ Done</span>';
  if (kind === 'deadline') return '<span class="badge badge--tbd">Deadline</span>';
  if (s.current) return '<span class="badge badge--upcoming">Next up</span>';
  return '';
}

export function workshopBadgeHTML(s: Status, kind: string): string {
  if (s.today) return '<span class="badge badge--today" style="--tilt:1deg">Today</span>';
  if (s.past) return '<span class="badge badge--done" style="--tilt:1deg">✓ Done</span>';
  if (kind === 'deadline') return '<span class="badge badge--tbd" style="--tilt:-2deg">Deadline</span>';
  return '<span class="badge badge--upcoming" style="--tilt:-2deg">Upcoming</span>';
}
