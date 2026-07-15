'use client';

import {useState} from 'react';

export default function Login(){
    // state for the form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // function that runs when the form is submitted
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault(); // stop the page from reloading

        try {
            const res = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password}),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token); // save the token
                setMessage('Login successful!');
            } else {
                setMessage(data.error || 'Login failed');
            }
        } catch (error) {
            setMessage('Something went wrong');
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
