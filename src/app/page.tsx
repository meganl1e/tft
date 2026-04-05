"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

/** Parses Riot ID "GameName#TAG" (split on first `#`). */
function parseRiotId(raw: string): { gameName: string; tagLine: string } | null {
  const trimmed = raw.trim();
  const hash = trimmed.indexOf("#");
  if (hash <= 0) return null;
  const gameName = trimmed.slice(0, hash).trim();
  const tagLine = trimmed.slice(hash + 1).trim();
  if (!gameName || !tagLine) return null;
  return { gameName, tagLine };
}

export default function Home() {
  const router = useRouter();
  const [riotId, setRiotId] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const parsed = parseRiotId(riotId);
    if (!parsed) {
      setError('Use the format Name#TAG (example: SummonerName#NA1).');
      return;
    }
    router.push(
      `/${encodeURIComponent(parsed.gameName)}/${encodeURIComponent(parsed.tagLine)}`
    );
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-3"
      >
        <label
          htmlFor="riot-id"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Riot ID
        </label>
        <input
          id="riot-id"
          name="riotId"
          type="text"
          value={riotId}
          onChange={(e) => {
            setRiotId(e.target.value);
            setError(null);
          }}
          placeholder="SummonerName#NA1"
          autoComplete="username"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Go
        </button>
      </form>
    </div>
  );
}
