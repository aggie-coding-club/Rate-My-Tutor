'use client'
import styles from '../css/home.module.css';
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { parse } from 'path';
import { useSearchParams } from 'next/navigation';

const background = {
  background: "white",
  height: '100vh',
  width: '100vw'
}



export default function Results() {
    const searchParams = useSearchParams(); // Get search parameters
    const [parsedData, setParsedData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const dataString = sessionStorage.getItem('searchResult'); // Retrieve the data from sessionStorage
        if (dataString) {
            try {
                setParsedData(JSON.parse(dataString));
            } catch (error) {
                console.error('Failed to parse data:', error);
                setParsedData(null);
            }
        }
        setLoading(false)

    }, []);
    

    console.log(parsedData)

    return (
        loading ? (
            <h1>Loading...</h1>
        ) : (
            <div style={background}>
                <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
                    {/* Hero section */}
                    <div className={styles.hero}>
                        {/* Navbar */}
                        <div className={styles.navbar}>
                            <Link href="/" className={styles.logo}></Link>
                            <div className={styles.buttonContainer}>
                                <button className={styles.buttons}>About</button>
                                <button className={styles.buttons}>Log In</button>
                                <button className={styles.buttons}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Display parsed data */}
                    <div>
                        <h1>
                            {/* {console.log(parsedData.document)} */}
                            {parsedData
                                ? `Tutor with the name ${parsedData.document.username} has been found`
                                : parsedData && parsedData.document.length > 1 
                                ? `Tutors with the name ${parsedData.document.username} have been found`
                                : `No tutors found. ${parsedData.document.username}`}
                        </h1>
                    </div>

                    {/* Footer */}
                    <div className={styles.footer}>
                        <div className={styles.logo}></div>
                        <div className={styles.socials}>
                            <a href="https://www.youtube.com/watch?v=At8v_Yc044Y" target="_blank" rel="noreferrer">
                                <button className={styles.instagram}></button>
                            </a>
                            <a href="https://www.youtube.com/watch?v=At8v_Yc044Y" target="_blank" rel="noreferrer">
                                <button className={styles.tiktok}></button>
                            </a>
                        </div>
                        <div className={styles.copyright}>
                            <h1>&copy; 2024 Rate My Tutor, ACC Project</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}