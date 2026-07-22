'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProfile } from '../lib/api/userApi';
import { User } from '../types/user';

// 1. define the shape of what the context holds
type AuthContextType = {
  user: User | null;
  loading: boolean; 
  login: (token: string) => void;
  logout: () => void;
};

// 2. create the context
const AuthContext = createContext<AuthContextType | null>(null);

// 3. the Provider component — holds the state, broadcasts it
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // helper: fetch the real user from /profile using a token
  async function fetchUser(token: string) {
    try {
      const data = await getProfile(token);
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
        setLoading(false); // <- done checking, whatever the outcome
    }
  }

  // on load: if there's a token, fetch the real user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
        setLoading(false);
    }
  }, []);

  // login: save token, then fetch the real user
  function login(token: string) {
    localStorage.setItem('token', token);
    fetchUser(token);
  }

  // logout: clear token, clear user
  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. a custom hook so components can easily "tune in"
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}