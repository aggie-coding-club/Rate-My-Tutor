// components/LogoutButton.jsx

'use client';

import { useRouter } from 'next/navigation';
import styles from '../client/css/home.module.css'; // Adjust the path as needed

export default function LogoutButton({ className }) {
  const router = useRouter();

  const handleLogout = async (e) => {
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
        router.push('/login');
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
}
