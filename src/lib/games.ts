const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchGameEndpoints() {
  const res = await fetch(`${API_URL}/api/games`);
  if (!res.ok) throw new Error('Failed to load game endpoints');
  const data = await res.json();
  return data.games || {};
}

export default fetchGameEndpoints;
