// app/login/page.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../client/css/home.module.css'; // Reuse existing styles

export default function Login() {
  const [identifier, setIdentifier] = useState(''); // Email or Username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Basic validation
    if (!identifier || !password) {
      setError('Please enter your email/username and password.');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to dashboard upon successful login
        router.push('/dashboard');
      } else {
        // Display error message from the server
        setError(data.message);
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.navbar}>
        {/* Logo */}
        <Link href="/" className={styles.logo}></Link>
        {/* Navigation Buttons */}
        <div className={styles.buttonContainer}>
          <Link href="/login" className={`${styles.buttons} ${styles.activeButton}`}>
            Log In
          </Link>
          <Link href="/signup" className={styles.buttons}>
            Sign Up
          </Link>
        </div>
      </div>

      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Log In to Your Account</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {error && <p className={styles.errorText}>{error}</p>}
          <div className={styles.formGroup}>
            <label htmlFor="identifier" className={styles.formLabel}>
              Email or Username:
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              className={styles.formInput}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder="Enter your email or username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>

        <p className={styles.redirectText}>
          Don't have an account? <Link href="/signup" className={styles.redirectLink}>Sign Up</Link>
        </p>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        {/* Social Icons */}
        <div className={styles.socials}>
          {/* Replace the href with actual social media links */}
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <button className={styles.instagram}></button>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <button className={styles.twitter}></button>
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
            <button className={styles.tiktok}></button>
          </a>
          {/* Add more social icons as needed */}
        </div>
        <div className={styles.copyright}>
          <h1>&copy; 2024 Rate My Tutor, ACC Project</h1>
        </div>
      </div>
    </div>
  );
}
