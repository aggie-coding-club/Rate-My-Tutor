'use client'
import styles from '../css/results.module.css';
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
    // const searchParams = useSearchParams(); // Get search parameters
    const [userSearch, setUserSearch] = useState('')
    const [parsedData, setParsedData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [tutors, setTutors] = useState([])


    useEffect(() => {
        const text = sessionStorage.getItem('searchText');
        const dataString = sessionStorage.getItem('searchResult'); // Retrieve the data from sessionStorage
        setUserSearch(text)
        if (dataString) {
            try {
                setParsedData(JSON.parse(dataString));

                // addTutors(parsedData)
            } catch (error) {
                console.error('Failed to parse data:', error);
                // setParsedData(null);
            }
        }
        setLoading(false)

    }, []);

    useEffect(() => {
        if (parsedData && parsedData.document) {
            setTutors(parsedData.document); // Set tutors once parsedData is available
        }
    }, [parsedData]);

    if (loading || !parsedData) {
        return <h1>Loading...</h1>
    }
    
    // const addTutors = (parsedData) => {
    //     // setTutors(...tutors, parsedData.document[0].firstName + " " + parsedData.document[0].lastName)
    // parsedData.map((data) => setTutors(...tutors, data.document.firstName + " " + data.document.lastName))
    // }

    // const addTutors = (data) => {
    //     if (!data || !data.document || !Array.isArray(data.document)) {
    //         console.error("Invalid data format");
    //         return;
    //     }
    //     const firstNameToMatch = "John"; // Replace "John" with the searched first name
    //     const filteredTutors = data.document.filter(tutor => tutor.firstName === firstNameToMatch);
    //     setTutors(filteredTutors);
    // }


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
                    {/* Display parsed data */}
                    <div className={styles.searchResults}>
                        <div className ={styles.idkwhattonamethis}>
                            <h1 className={styles.tutorsFoundText}>
                                {/* {console.log(userSearch)}
                                {console.log('peepee')} */}
                                {tutors.length != 0 ? 
                                    (<>
                                        Tutors with the name "<span style={{ fontWeight: 'bold' }}>{userSearch}</span>" have been found
                                    </>) 
                                    : 
                                    parsedData && parsedData.document.length > 1 ? 
                                    (<>
                                        A Tutor with the name "<span style={{ fontWeight: 'bold' }}>{userSearch}</span>" has been found
                                    </>) 
                                    : 
                                    <>
                                    <h1>There were no tutors found! </h1>
                                    <h5 style={{fontSize : "20px"}}>Try double checking your spelling or try again. </h5>
                                    </>
                                    }
                            </h1>
                            <div className={styles.tutorsResults}>
                                {tutors.length > 0 ? (
                                    tutors.map((tutor, index) => (
                                        <Link className={styles.tutors} href="/" key={index}>{tutor.firstName} {tutor.lastName}</Link>
                                    ))
                                    ) : (
                                        <div style={{display: "flex", flexDirection: "column", justifyContent:'center',alignItems: 'center', backgroundColor: "rgb(247, 247, 247)", height: "125px"}}>
                                        <h1 style={{paddingRight: "5px",color:'black'}}>Can't find your tutor?</h1>
                                        <Link href="/client/add_tutor" style={{textDecoration: "underline", color: "black"}}>Click here</Link>
                                        </div>
                                )}
                            </div>
                        </div>
                    </div>
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
}