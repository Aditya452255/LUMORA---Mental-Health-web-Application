const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (res.status === 401) {
    // broadcast logout event so app can react
    try {
      localStorage.removeItem('token');
      window.dispatchEvent(new CustomEvent('auth:logout'));
    } catch (e) {
      // ignore
    }
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res;
}

export default apiFetch;
