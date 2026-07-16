'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. define the shape of what the context holds
type AuthContextType = {
  user: any;
  login: (token: string) => void;
  logout: () => void;
};

// 2. create the context
const AuthContext = createContext<AuthContextType | null>(null);

// 3. the Provider component — holds the state, broadcasts it
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // helper: fetch the real user from /profile using a token
  async function fetchUser(token: string) {
    try {
      const res = await fetch('http://localhost:3001/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);          // store the REAL user
      } else {
        setUser(null);          // token invalid → not logged in
      }
    } catch (error) {
      setUser(null);
    }
  }

  // on load: if there's a token, fetch the real user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
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
    <AuthContext.Provider value={{ user, login, logout }}>
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