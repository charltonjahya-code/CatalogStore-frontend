'use client';

import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { login as loginRequest } from '../../lib/api/authApi';

export default function Login() {
  const { login } = useAuth();   // only need login now
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = await loginRequest(email, password);   // API call → gets { token }
      login(data.token);                                   // context → saves token
      setMessage('Login successful!');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <p>{message}</p>
    </div>
  );
}