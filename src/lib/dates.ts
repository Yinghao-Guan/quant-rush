const PT = 'America/Los_Angeles';

/** "OCT 13" — short month and day in Pacific time, upper-cased for stamps. */
export function stamp(iso: string): string {
  return new Date(iso)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: PT })
    .toUpperCase();
}

/** "Sunday, Nov 22" */
export function longDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: PT });
}

/** Pieces for the tear-off date block: { month: "OCT", day: "13", dow: "TUE" } */
export function dateBlock(dateISO: string): { month: string; day: string; dow: string } {
  const d = new Date(`${dateISO}T12:00:00-08:00`);
  const f = (opts: Intl.DateTimeFormatOptions) => d.toLocaleDateString('en-US', { ...opts, timeZone: PT });
  return {
    month: f({ month: 'short' }).toUpperCase(),
    day: f({ day: 'numeric' }),
    dow: f({ weekday: 'short' }).toUpperCase(),
  };
}
