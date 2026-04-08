"use client";

import { useRouter } from "next/navigation";
import { useState, type ComponentProps } from "react";

import {
  RIOT_PLATFORMS,
  type RiotTagId,
} from "@/data/riot-platforms";
import { normalizeRiotGameName, parseRiotId } from "@/lib/riot-id";

export default function Home() {
  const router = useRouter();
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState<RiotTagId>("NA1");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (e) => {
    e.preventDefault();
    setError(null);
    const raw = gameName.trim();
    if (!raw) {
      setError("Enter your Riot game name or full Riot ID (Name#TAG).");
      return;
    }
    const parsed = parseRiotId(raw);
    const name = parsed
      ? parsed.gameName
      : normalizeRiotGameName(raw);
    const tag = parsed ? parsed.tagLine : tagLine;
    if (!parsed) {
      setGameName(`${name}#${tag}`);
    }
    router.push(`/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-3"
      >
        <span
          id="riot-id-label"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Riot ID
        </span>
        <div
          className="flex gap-2"
          role="group"
          aria-labelledby="riot-id-label"
        >
          <select
            id="riot-tag"
            name="tagLine"
            value={tagLine}
            onChange={(e) => {
              setTagLine(e.target.value as RiotTagId);
              setError(null);
            }}
            aria-label="Platform"
            className="w-22 shrink-0 rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          >
            {RIOT_PLATFORMS.map((opt) => (
              <option
                key={opt.platform}
                value={opt.tag}
                title={`${opt.tag} · ${opt.host}`}
              >
                {opt.platform}
              </option>
            ))}
          </select>
          <input
            id="riot-game-name"
            name="gameName"
            type="text"
            value={gameName}
            onChange={(e) => {
              setGameName(e.target.value);
              setError(null);
            }}
            placeholder="SummonerName#TAG"
            autoComplete="username"
            aria-label="Game name"
            className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>
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
