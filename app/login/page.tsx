'use client';

import {useState} from 'react';

export default function Login(){
    // state for the form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState('');

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

    async function fetchProfile() {
        const token = localStorage.getItem('token');   // read the saved token

        const res = await fetch('http://localhost:3001/me', {
            headers: { Authorization: `Bearer ${token}` }  // attach it
        });

        const data = await res.json();

        if (res.ok) {
            setProfile(JSON.stringify(data.user));  // show who we are
        } else {
            setProfile('Not authorized');
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setMessage('Logged out');
        setProfile('');   // clear the displayed profile too
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
      <div>
        <button onClick={fetchProfile}>Who am I?</button>
      </div>
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <p>{profile}</p>
      <p>{message}</p>
    </div>
  );
}