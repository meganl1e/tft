import {
  canonicalRiotTag,
  getTftMatchRoutingForTag,
} from "@/data/riot-platforms";
import { getAccountByPUUID, getMatchIdByPUUID, getMatchbyMatchId } from "@/lib/riot";
import { normalizeRiotGameName } from "@/lib/riot-id";
import { decodePathSegment } from "@/lib/route-params";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string; tagline: string }>;
}) {
  const { username, tagline } = await params;
  const gameName = normalizeRiotGameName(decodePathSegment(username));
  const tag = canonicalRiotTag(decodePathSegment(tagline));
  const tftMatchRouting = getTftMatchRoutingForTag(tag);

  try {
    const account = await getAccountByPUUID(gameName, tag);
    const matchIds = await getMatchIdByPUUID(account.puuid, tftMatchRouting);
    const latestMatchId = matchIds[0] ?? null;
    const matchData = latestMatchId
      ? await getMatchbyMatchId(latestMatchId, tftMatchRouting)
      : null;

    return (
      <div className="space-y-2 p-6">
        <p className="text-2xl font-bold">
          Riot ID: {account.gameName}#{account.tagLine}
        </p>
        <pre className="overflow-auto rounded-md bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
          {JSON.stringify(account, null, 2)}
        </pre>
        <pre className="overflow-auto rounded-md bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
          {JSON.stringify({ matchIds, latestMatchId }, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6">
        Failed to fetch account data:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
}