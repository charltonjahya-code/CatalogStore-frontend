// lib/api/userApi.ts
import { API_BASE } from './client';

export async function getProfile(token: string) {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  return res.json();
}