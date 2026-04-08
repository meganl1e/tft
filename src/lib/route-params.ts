/**
 * Decode a dynamic route path segment for use with APIs.
 * Next usually decodes `[param]` values, but segments can still be
 * percent-encoded or double-encoded; Riot needs the real string (e.g. spaces),
 * not a literal `"%20"` in the summoner name.
 */
export function decodePathSegment(segment: string): string {
  let s = segment;
  for (let i = 0; i < 3; i++) {
    if (!s.includes("%")) break;
    try {
      const next = decodeURIComponent(s);
      if (next === s) break;
      s = next;
    } catch {
      break;
    }
  }
  return s;
}
