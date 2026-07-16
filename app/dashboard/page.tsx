'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthContext';

export default function Dashboard() {
  const { user, loading } = useAuth();   
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {         // ← only redirect if DONE loading AND no user
      router.push('/login');
    }
  }, [user, loading]);               // ← re-check when either changes

  if (loading) {
    return <p>Loading...</p>;        // ← still checking → wait
  }

  if (!user) {
    return <p>Redirecting...</p>;    // ← done, logged out → redirecting
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}! This page is only for logged-in users.</p>
    </div>
  );
}