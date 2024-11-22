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

export default function Login() { // Renamed to Login
    const [identifierText, setIdentifierText] = useState("");
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
        if (!identifierText || !passwordText) {
            setError("Both identifier and password are required.");
            return;
        }

        try {
            const response = await fetch("/api/auth/login", { // Correct endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identifier: identifierText,
                    password: passwordText
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                setSuccess("Login successful! Redirecting to dashboard...");
                // Optionally, redirect to dashboard after a short delay
                setTimeout(() => {
                    router.push("/dashboard");
                }, 3000); // Redirects after 3 seconds
            } else {
                const errorData = await response.json();
                console.error("Login failed:", errorData.message);
                setError(errorData.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div style={background}>
            {/* Landing page background */}
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

                    {/* Login Page section */}
                    <div className={styles.loginSection}>
                        <form onSubmit={handleSubmit} className={styles.loginSection} aria-label="Login Form">
                            <h1 style={{ fontSize: "40px", color: "#fff" }}>Log In to Your Account</h1>

                            {/* Display Success Message */}
                            {success && <strong className={styles.loginSuccess}>{success}</strong>}

                            {/* Display Error Message */}
                            {error && <strong className={styles.loginError}>{error}</strong>}

                            <input
                                className={styles.loginBar}
                                name="identifier"
                                type="text"
                                placeholder="Email or Username"
                                value={identifierText}
                                onChange={(e) => setIdentifierText(e.target.value)}
                                required
                                aria-label="Email or Username"
                            />
                            <input
                                className={styles.loginBar}
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={passwordText}
                                onChange={(e) => setPasswordText(e.target.value)}
                                required
                                aria-label="Password"
                            />
                            <button type="submit" className={styles.loginSubmitButton}>
                                Log In
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    {/* Image logo */}
                    <div className={styles.logo}></div>
                    {/* Social icons */}
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
