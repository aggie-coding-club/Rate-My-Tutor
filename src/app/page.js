import Image from "next/image";
import { text } from "stream/consumers";
import styles from './css/home.module.css';
import RMT from './assets/RMT.png'

const background = {
  background: "white",
  height: '100vh',
  width: '100vw'
}



export default function Home() {
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
            <h1>Enter your Tutor's name to get started.</h1>
            <h1>Can't find your tutor? Click here</h1>
          </div>
        </div>
        


      </div>
    </div>
  )
}
