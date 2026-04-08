/** Collapse repeated spaces — Riot names use normal single spaces. */
export function normalizeRiotGameName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

/**
 * Parses Riot ID "GameName#TAG" (split on first `#`).
 * Returns null if there is no `#` or either side is empty.
 */
export function parseRiotId(raw: string): { gameName: string; tagLine: string } | null {
  const trimmed = raw.trim();
  const hash = trimmed.indexOf("#");
  if (hash <= 0) return null;
  const gameName = normalizeRiotGameName(trimmed.slice(0, hash));
  const tagLine = trimmed.slice(hash + 1).trim();
  if (!gameName || !tagLine) return null;
  return { gameName, tagLine };
}
