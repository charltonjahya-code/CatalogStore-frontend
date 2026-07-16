'use client';

import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '15px' }}>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>

      {user ? (
        <>
          <span>Logged in as {user.name}</span>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <span>Not logged in</span>
      )}
    </nav>
  );
}