// app/dashboard/page.jsx

import styles from '../client/css/home.module.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function Dashboard() {
  // Access cookies from the request
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  // If no token, redirect to login
  if (!token) {
    redirect('/login');
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user data from the database
    const client = await (await import('../server/server')).default;
    const db = client.db();

    const user = await db.collection('users').findOne(
      { _id: new ObjectId(decoded.userId) },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      // If user not found, redirect to login
      redirect('/login');
    }

    return (
      <div className={styles.hero}>
        {/* Navbar */}
        <div className={styles.navbar}>
          {/* Logo */}
          <Link href="/" className={styles.navbarLogo} aria-label="Rate My Tutor Home"></Link>
          {/* Navigation Buttons */}
          <div className={styles.buttonContainer}>
            <Link href="/about" className={styles.buttons}>
              About
            </Link>
            <Link href="/login" className={styles.buttons}>
              Log In
            </Link>
            <Link href="/signup" className={styles.buttons}>
              Sign Up
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className={styles.dashboardContainer}>
          <h1 className={styles.dashboardHeading}>Welcome, {user.first_name}!</h1>
          <div className={styles.userInfo}>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {/* Footer Logo */}
          <div className={styles.footerLogo}></div>
          {/* Social Icons */}
          <div className={styles.socials}>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <button className={styles.instagram}></button>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <button className={styles.twitter}></button>
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
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
  } catch (error) {
    console.error('Dashboard error:', error);
    // If token is invalid, redirect to login
    redirect('/login');
  }
}

// Handle Logout Function
async function handleLogout(e) {
  e.preventDefault();

  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Redirect to login page after successful logout
      window.location.href = '/login';
    } else {
      console.error('Logout failed.');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
