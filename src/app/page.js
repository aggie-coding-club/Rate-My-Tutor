'use client'
import Image from "next/image";
import styles from './css/home.module.css';
import RMT from './assets/RMT.png'
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const background = {
  background: "white",
  height: '100vh',
  width: '100vw'
}



export default function Home() {
  const [searchText, setSearchText] = useState('')
  const router = useRouter();

  const handleEnter = async (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      try {
        await axios.post('/api/search', { query: searchText });
        router.push(`/search?query=${encodeURIComponent(searchText)}`);
      } catch (error) {
        console.error('Error posting search term:', error);
      }
    }
    }
  const handleChange  = (e) => {
    setSearchText(e.target.value)
  }



  return (
    <div style={background}>
      {/* Landing page for once the user loads into the website */}
      <div style={{height: "100vh", width: "100vw", backgroundColor: "black"}}>
        {/* Hero section */}
        <div className={styles.hero}>
          {/* navbar */}
          <div className={styles.navbar}>
            {/* image */}
            <div className= {styles.logo}>
              Image goes here
            </div>
            {/* for buttons */}
            <div className={styles.buttonContainer}>
              <button className={styles.buttons}>
                About
              </button>
              <button className={styles.buttons}>
                Log In
              </button>
              <button className={styles.buttons}>
                Sign Up
              </button>
            </div>
          </div>
          {/* search section */}
          {/* TODO: add the search bar */}
          <div>
            <div className={styles.searchSection}>
              <h1 className={styles.helpComments} >Enter your Tutor's name to get started.</h1>
              <form>
                <input className={styles.searchbar} name="searchbar" type="text" placeholder="Search" onChange={handleChange}></input>
              </form>
              <div style={{display: "flex", flexDirection: "row"}}>
                <h1 style={{paddingRight: "5px"}}>Can't find your tutor?</h1>
                <Link href="/search" style={{textDecoration: "underline", color: "black"}}>Click here</Link>
              </div>
            </div>
          </div>
        </div>
        


      </div>
    </div>
  )
}
