'use client'
import styles from '../../css/tutor.module.css';
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { parse } from 'path';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'react-router-dom';


const background = {
  background: "white",
  height: '100vh',
  width: '100vw'
}



export default function Tutor() {
    // const searchParams = useSearchParams(); // Get search parameters
    // const { id } = useParams();
    const [tutor, setTutor] = useState();

    // useEffect(() => {
    //     fetch(`/api/search${id}`)
    //     .then(response.json()) //idea here is to fetch the id from backend 
    // })

    useEffect(() => {
        setTutor(sessionStorage.getItem('tutor'))
    }, []);

    if (!tutor) {
        return <h1>Loading...</h1>
    }

    return (
        <div style={background}>
            <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
                {/* page section */}
                <div className={styles.page}>
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

                {/* Starts here */}

                {/* Name and rating section */}
                <section>
                    <h1>
                        {tutor.firstName} {tutor.lastName}
                    </h1>
                    <h1>
                        {tutor.rating} / 5
                    </h1>
                </section>

                {/* tag section */}
                <section>
                    subjects: subjects goes here
                </section>

                {/* rating distribution */}
                <section>
                    <div>

                    </div>
                </section>

                {/* other misc */}
                <section>
                    <h1>69% would take again</h1>
                    <h1>top tags</h1> 
                </section>

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
}