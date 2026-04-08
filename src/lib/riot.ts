import "server-only";

import type {
  RiotAccountRouting,
  RiotTftMatchRouting,
} from "@/data/riot-platforms";

const ACCOUNT_ORIGIN: Record<RiotAccountRouting, string> = {
  americas: "https://americas.api.riotgames.com",
  asia: "https://asia.api.riotgames.com",
  europe: "https://europe.api.riotgames.com",
};

const TFT_MATCH_ORIGIN: Record<RiotTftMatchRouting, string> = {
  americas: "https://americas.api.riotgames.com",
  asia: "https://asia.api.riotgames.com",
  europe: "https://europe.api.riotgames.com",
  sea: "https://sea.api.riotgames.com",
};

export type RiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

function getRiotApiKey(): string {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RIOT_API_KEY in environment.");
  }
  return apiKey;
}

/**
 * Account by Riot ID — any of `americas` / `asia` / `europe` can resolve a
 * global account; pick one (e.g. nearest to your server).
 */
export async function getAccountByPUUID(
  gameName: string,
  tagLine: string,
  accountRouting: RiotAccountRouting = "americas"
): Promise<RiotAccount> {
  const apiKey = getRiotApiKey();
  const base = ACCOUNT_ORIGIN[accountRouting];

  const res = await fetch(
    `${base}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`,
    {
      headers: {
        "X-Riot-Token": apiKey,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Riot API error: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as RiotAccount;
}

/** TFT match IDs — must use the routing region for the player’s shard. */
export async function getMatchIdByPUUID(
  puuid: string,
  tftMatchRouting: RiotTftMatchRouting
): Promise<string[]> {
  const apiKey = getRiotApiKey();
  const base = TFT_MATCH_ORIGIN[tftMatchRouting];
  const res = await fetch(
    `${base}/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=1`,
    {
      headers: {
        "X-Riot-Token": apiKey,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error(`Riot API error: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as string[];
}

export async function getMatchbyMatchId(
  matchId: string,
  tftMatchRouting: RiotTftMatchRouting
): Promise<unknown> {
  const apiKey = getRiotApiKey();
  const base = TFT_MATCH_ORIGIN[tftMatchRouting];
  const res = await fetch(`${base}/tft/match/v1/matches/${matchId}`, {
    headers: {
      "X-Riot-Token": apiKey,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Riot API error: ${res.status} ${res.statusText}`);
  }
  return (await res.json());
}
