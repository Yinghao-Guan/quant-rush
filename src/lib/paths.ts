const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a site-relative path with the configured base (GitHub Pages project sites live under /repo-name/). */
export function withBase(path: string): string {
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Strip the base from a pathname so pages can compare routes. */
export function routeOf(pathname: string): string {
  const stripped = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const clean = stripped.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}
