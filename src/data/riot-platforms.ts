/**
 * **platform** — short UI label (BR, NA, …).
 * **tag** — official Riot ID tag / shard (BR1, NA1, …).
 * **host** — regional game API host (`{shard}.api.riotgames.com`).
 *
 * **accountRouting** — Riot Account API v1 (`/riot/account/v1/…`): you may use
 * `americas`, `asia`, or `europe`; any cluster can resolve a global Riot ID.
 *
 * **tftMatchRouting** — TFT Match API (`/tft/match/v1/…`): must match Riot’s
 * regional routing (AMERICAS / ASIA / EUROPE / SEA) for that player’s shard.
 */
export type RiotAccountRouting = "americas" | "europe" | "asia";

/** TFT match list / match-by-id API regional hosts (includes `sea`). */
export type RiotTftMatchRouting = "americas" | "asia" | "europe" | "sea";

export const RIOT_PLATFORMS = [
  {
    platform: "BR",
    tag: "BR1",
    host: "br1.api.riotgames.com",
    accountRouting: "americas",
    tftMatchRouting: "americas",
  },
  {
    platform: "EUNE",
    tag: "EUN1",
    host: "eun1.api.riotgames.com",
    accountRouting: "europe",
    tftMatchRouting: "europe",
  },
  {
    platform: "EUW",
    tag: "EUW1",
    host: "euw1.api.riotgames.com",
    accountRouting: "europe",
    tftMatchRouting: "europe",
  },
  {
    platform: "JP",
    tag: "JP1",
    host: "jp1.api.riotgames.com",
    accountRouting: "asia",
    tftMatchRouting: "asia",
  },
  {
    platform: "KR",
    tag: "KR",
    host: "kr.api.riotgames.com",
    accountRouting: "asia",
    tftMatchRouting: "asia",
  },
  {
    platform: "LAN",
    tag: "LA1",
    host: "la1.api.riotgames.com",
    accountRouting: "americas",
    tftMatchRouting: "americas",
  },
  {
    platform: "LAS",
    tag: "LA2",
    host: "la2.api.riotgames.com",
    accountRouting: "americas",
    tftMatchRouting: "americas",
  },
  {
    platform: "NA",
    tag: "NA1",
    host: "na1.api.riotgames.com",
    accountRouting: "americas",
    tftMatchRouting: "americas",
  },
  {
    platform: "OCE",
    tag: "OC1",
    host: "oc1.api.riotgames.com",
    accountRouting: "asia",
    tftMatchRouting: "sea",
  },
  {
    platform: "TR",
    tag: "TR1",
    host: "tr1.api.riotgames.com",
    accountRouting: "europe",
    tftMatchRouting: "europe",
  },
  {
    platform: "RU",
    tag: "RU",
    host: "ru.api.riotgames.com",
    accountRouting: "europe",
    tftMatchRouting: "europe",
  },
  {
    platform: "PH",
    tag: "PH2",
    host: "ph2.api.riotgames.com",
    accountRouting: "asia",
    tftMatchRouting: "sea",
  },
  {
    platform: "SEA",
    tag: "SG2",
    host: "sg2.api.riotgames.com",
    accountRouting: "asia",
    tftMatchRouting: "sea",
  },
  {
    platform: "TH",
    tag: "TH2",
    host: "th2.api.riotgames.com",
    accountRouting: "asia",
    tftMatchRouting: "sea",
  },
  {
    platform: "TW",
    tag: "TW2",
    host: "tw2.api.riotgames.com",
    accountRouting: "asia",
    tftMatchRouting: "sea",
  },
  {
    platform: "VN",
    tag: "VN2",
    host: "vn2.api.riotgames.com",
    accountRouting: "asia",
    tftMatchRouting: "sea",
  },
] as const;

export type RiotPlatformId = (typeof RIOT_PLATFORMS)[number]["platform"];

/** Official Riot ID tag (e.g. `NA1`, `EUW1`) — use in URLs and API calls. */
export type RiotTagId = (typeof RIOT_PLATFORMS)[number]["tag"];

/** Resolve platform row by Riot tag (case-insensitive). */
export function getPlatformByTag(
  tag: string
): (typeof RIOT_PLATFORMS)[number] | undefined {
  const key = tag.trim().toUpperCase();
  const match = RIOT_PLATFORMS.find(
    (row) => row.tag.toUpperCase() === key
  );
  return match;
}

/** TFT match API routing for a Riot tag; defaults to `americas` if unknown. */
export function getTftMatchRoutingForTag(tag: string): RiotTftMatchRouting {
  return getPlatformByTag(tag)?.tftMatchRouting ?? "americas";
}

/** Canonical tag string for API calls (matches known row casing, e.g. `na1` → `NA1`). */
export function canonicalRiotTag(tag: string): string {
  const row = getPlatformByTag(tag);
  return row?.tag ?? tag.trim();
}

