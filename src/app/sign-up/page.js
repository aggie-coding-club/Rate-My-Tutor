'use client'
import styles from '../client/css/home.module.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';

const background = {
  background: "white",
  height: '100vh',
  width: '100vw'
}



export default function Home() {
  const [usernameText, setUsernameText] = useState("");
  const [firstNameText, setfirstNameText] = useState("");
  const [lastNameText, setlastNameText] = useState("");
  const [emailText, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [passwordText, setPassword] = useState("");
  const router = useRouter();

  const userHandleChange = (e) => {
    setUsernameText(e.target.value);
  }

  const fNameHandleChange = (e) => {
    setfirstNameText(e.target.value);
  }

  const lNameHandleChange = (e) => {
    setlastNameText(e.target.value);
  }

  const emailHandleChange = (e) => {
    setEmail(e.target.value);
  }

  const passHandleChange  = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username: usernameText,
                              first_name: firstNameText,
                              last_name: lastNameText,
                              email: emailText, 
                              password: passwordText
                            }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info or token
        router.push("/dashboard"); // Redirect to the dashboard
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.error);
        setIsEmailValid(false); // Update UI for invalid login
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsEmailValid(false);
    }
  };
  
  return (
    <div style={background}>
      {/* Landing page for once the user loads into the website */}
      <div style={{height: "100vh", width: "100vw", backgroundColor: "black"}}>
        {/* Hero section */}
        <div className={styles.hero}>
          {/* navbar */}
          <div className={styles.navbar}>
            {/* image */}
            <div className= {styles.logo}></div>
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

          {/* Sign Up Page section */}
          <div>
            <form onSubmit={handleSubmit} className={styles.signupSection}>
                <h1 style={{fontSize:"40px"}}>Enter you information to sign up</h1>
                {/* {!isEmailValid && <strong style={{color: "#4f002d"}}>Invalid Email and/or Password!</strong>} */}
                <input className={styles.signupBar} name="username" type="text" placeholder="Username" value={usernameText} onChange={userHandleChange} required></input>
                <input className={styles.signupBar} name="firstName" type="text" placeholder="First Name" value={firstNameText} onChange={fNameHandleChange} required></input>
                <input className={styles.signupBar} name="lastName" type="text" placeholder="Last Name" value={lastNameText} onChange={lNameHandleChange} required></input>
                <input className={styles.signupBar} name="email" type="text" placeholder="Email" value={emailText} onChange={emailHandleChange} required></input>
                <input className={styles.signupBar} name="password" type="text" placeholder="Password" value={passwordText} onChange={passHandleChange} required></input>
                <input className={styles.submitInfoButton} name="submit" type="submit" value="Continue"></input>
            </form>
          </div>

        </div>
        {/* Bottom page/footer for once the user scrolls all the way down */}
        <div className={styles.footer}>
          {/* image logo */}
          <div className={styles.logo}></div>
          {/* for social icons */}
          <div className={styles.socials}>
            
            {/* instagram */}
            <a href="https://www.youtube.com/watch?v=At8v_Yc044Y" target="_blank" rel="noreferrer">
              <button className={styles.instagram}></button>
            </a>
            {/* X or twitter */}
            <a href="https://www.youtube.com/watch?v=At8v_Yc044Y" target="_blank" rel="noreferrer">
              <button className={styles.tiktok}></button>
            </a>
            {/* test */}
            <a href="https://www.youtube.com/watch?v=At8v_Yc044Y" target="_blank" rel="noreferrer">
              <button className={styles.tiktok}></button>
            </a>
            {/* test */}
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
