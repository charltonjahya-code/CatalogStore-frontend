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

  // login: save token, set user
  function login(token: string) {
    localStorage.setItem('token', token);
    // (we'll decode the token to get the user shortly — for now, mark logged in)
    setUser({ loggedIn: true });
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