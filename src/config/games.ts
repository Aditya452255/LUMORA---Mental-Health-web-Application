// This module now exports a small helper that fetches the game mapping
export type GameConfig = { endpoint: string };

export async function fetchGameConfig(): Promise<Record<number, GameConfig>> {
  const base = import.meta.env.VITE_API_URL || '';
  const url = base ? `${base.replace(/\/$/, '')}/api/games` : '/api/games';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load game configuration');
  const data = await res.json();
  return data.games || {};
}

export default fetchGameConfig;
