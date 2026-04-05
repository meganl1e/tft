export default async function Page({
  params,
}: {
  params: Promise<{ username: string; tagline: string }>;
}) {
  const { username, tagline } = await params;

  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    return (
      <div>
        Missing <code className="font-mono">RIOT_API_KEY</code> in environment.
      </div>
    );
  }

  const res = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(username)}/${encodeURIComponent(tagline)}`,
    {
      headers: {
        "X-Riot-Token": apiKey,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div>
        Failed to fetch account data: {res.statusText}
      </div>
    );
  }

  const data = await res.json();

  return (
    <div className="text-2xl font-bold">username: {username}
      <pre className="overflow-auto rounded-md bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}