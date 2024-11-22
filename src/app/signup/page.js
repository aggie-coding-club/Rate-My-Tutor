'use client';

import styles from '../client/css/home.module.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const background = {
  background: "white",
  height: '100vh',
  width: '100vw'
};

export default function Signup() { // Renamed from Home to Signup
  const [usernameText, setUsernameText] = useState("");
  const [firstNameText, setFirstNameText] = useState("");
  const [lastNameText, setLastNameText] = useState("");
  const [emailText, setEmail] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous messages
    setError("");
    setSuccess("");

    // Basic client-side validation
    if (!usernameText || !firstNameText || !lastNameText || !emailText || !passwordText) {
      setError("All fields are required.");
      return;
    }

    // Optional: Add more robust validation here (e.g., email format, password strength)

    try {
      const response = await fetch("/api/auth/signup", { // Updated endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameText,
          first_name: firstNameText,
          last_name: lastNameText,
          email: emailText,
          password: passwordText
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        setSuccess("Account created successfully!");
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData.error);
        setError(errorData.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div style={background}>
      {/* Landing page for once the user loads into the website */}
      <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
        {/* Hero section */}
        <div className={styles.hero}>
          {/* Navbar */}
          <div className={styles.navbar}>
            {/* Logo */}
            <Link href="/" className={styles.logo} aria-label="Rate My Tutor Home"></Link>
            {/* Navigation Buttons */}
            <div className={styles.buttonContainer}>
              <Link href="/?scrollTo=about">
                <button className={styles.buttons}>About</button>
              </Link>
              <Link href="/login" className={styles.buttons}>
                Log In
              </Link>
              <Link href="/signup" className={`${styles.buttons} ${styles.activeButton}`}>
                Sign Up
              </Link>
            </div>
          </div>

          {/* Sign Up Page section */}
          <div className={styles.signupContainer}>
            <form onSubmit={handleSubmit} className={styles.signupSection} aria-label="Sign Up Form">
              <h1 style={{ fontSize: "40px", color: "#fff" }}>Enter your information to sign up</h1>
              
              {/* Display Success Message */}
              {success && <strong style={{ color: "#28a745", marginBottom: "1rem" }}>{success}</strong>}
              
              {/* Display Error Message */}
              {error && <strong style={{ color: "#dc3545", marginBottom: "1rem" }}>{error}</strong>}
              
              <input
                className={styles.signupBar}
                name="username"
                type="text"
                placeholder="Username"
                value={usernameText}
                onChange={(e) => setUsernameText(e.target.value)}
                required
                aria-label="Username"
              />
              <input
                className={styles.signupBar}
                name="firstName"
                type="text"
                placeholder="First Name"
                value={firstNameText}
                onChange={(e) => setFirstNameText(e.target.value)}
                required
                aria-label="First Name"
              />
              <input
                className={styles.signupBar}
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={lastNameText}
                onChange={(e) => setLastNameText(e.target.value)}
                required
                aria-label="Last Name"
              />
              <input
                className={styles.signupBar}
                name="email"
                type="email" // Changed to type="email"
                placeholder="Email"
                value={emailText}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
              <input
                className={styles.signupBar}
                name="password"
                type="password" // Changed to type="password"
                placeholder="Password"
                value={passwordText}
                onChange={(e) => setPasswordText(e.target.value)}
                required
                aria-label="Password"
              />
              <button type="submit" className={styles.submitInfoButton}>
                Continue
              </button>
            </form>
          </div>
        </div>

        {/* Bottom page/footer for once the user scrolls all the way down */}
        <div className={styles.footer}>
          {/* Image logo */}
          <div className={styles.logo}></div>
          {/* For social icons */}
          <div className={styles.socials}>
            {/* Instagram */}
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <button className={styles.instagram}></button>
            </a>
            {/* Twitter */}
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <button className={styles.twitter}></button>
            </a>
            {/* TikTok */}
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
    </div>
  );
}
