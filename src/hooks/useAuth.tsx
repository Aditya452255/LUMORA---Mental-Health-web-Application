import { createContext, useContext, useEffect, useState } from 'react';
import apiFetch from '../lib/api';

type User = { id: string; name: string; email: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const data = await apiFetch('/api/auth/me');
      setUser(data.user || null);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userName', data.user.name || '');
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchMe();
    } else {
      setLoading(false);
    }

    const onLogout = () => {
      setUser(null);
      localStorage.removeItem('token');
    };

    window.addEventListener('auth:logout', onLogout as EventListener);
    return () => window.removeEventListener('auth:logout', onLogout as EventListener);
  }, []);

  const login = async (email: string, password: string) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    localStorage.setItem('token', data.token);
    setUser(data.user || null);
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userName', data.user.name || '');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    localStorage.setItem('token', data.token);
    setUser(data.user || null);
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userName', data.user.name || '');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
