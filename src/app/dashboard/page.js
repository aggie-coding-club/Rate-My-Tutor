'use client'
import Image from "next/image";
import styles from '../client/css/home.module.css';
import RMT from '../client/Assets/RMT.png'
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useRef } from 'react';

// icons
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// team images
import longVo from '../client/Assets/teamImages/long.jpg'
import kevinChen from '../client/Assets/teamImages/kev1.jpg'
import lichengYi from '../client/Assets/teamImages/licheng.jpg'

const background = {
  background: "white",
  height: '100vh',
  width: '100vw'
}

const reviews = [
  { name: 'Kevin Chen', review: 'I love the PTs so much, especially Licheng Yi ;)', stars: '★★★★★'},
  { name: 'Licheng Yi', review: 'I\'m one of the PTs for Rate my Tutor and I got to meet up so many wonderful students like Kevin Chen :3', stars: '★★★★★'},
  { name: 'Long Vo', review: 'Why is this just a dating site?', stars: '★☆☆☆☆'},
  { name: 'Miguel', review: 'Brainrot ahh, 7/4 on the freaky scale', stars: '★★★★☆'}
]

const teamMembers = [
  {
    name: "Kevin Chen",
    role: "Project Manager",
    image: kevinChen,
    linkedin: "#",
    github: "#"
  },
  {
    name: "Licheng Yi",
    role: "Project Manager",
    image: lichengYi,
    linkedin: "#",
    github: "#"
  },
  {
    name: "Long Vo",
    role: "Project Manager",
    image: longVo,
    linkedin: "#",
    github: "https://github.com/longv1-code"
  },
  {
    name: "Lorenzo Viray",
    role: "Member",
    image: lichengYi,
    linkedin: "#",
    github: "https://github.com/CrunchyWaterIsNotIce"
  },
  {
    name: "Aldiyar Seidaliyev",
    role: "Member",
    image: lichengYi,
    linkedin: "#",
    github: "https://github.com/aldiseida"
  },
  {
    name: "Reuben Daniel",
    role: "Member",
    image: lichengYi,
    linkedin: "#",
    github: "https://github.com/reubend415"
  },
  {
    name: "Miguel Canales",
    role: "Member",
    image: lichengYi,
    linkedin: "#",
    github: "https://github.com/MiguelCan13"
  },
  {
    name: "Erica Tong",
    role: "Member",
    image: lichengYi,
    linkedin: "#",
    github: "https://github.com/lichtrune"
  },
]

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();




  

  const handleEnter = async (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      e.preventDefault(); // Prevents form submission refresh
      // console.log(JSON.stringify({ searchText }));

      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          body: JSON.stringify({ searchText }), // Only send the necessary data
        });

        if (response.ok) {
          const data = await response.json();
          // Store data in sessionStorage instead off passing it via URL
          sessionStorage.setItem('searchResult', JSON.stringify(data));   // I dont think this is needed???????????
          router.push('/client/results'); // Navigate to results without passing data in the URL
        } else {
          console.error('Failed to post search term:', response.statusText);
        }
      } catch (error) {
        console.error('Error posting search term:', error);
      }
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const aboutRef = useRef(null);
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div style={background}>
      {/* Landing page for once the user loads into the website */}
      <div style={{height: "100vh", width: "100vw", backgroundColor: "black"}}>
        {/* Hero section */}
        <div className={styles.hero}>
          {/* navbar */}
          <div className={styles.navbar} style={{zIndex: '1000'}}>
            {/* image */}
            <Link href="/" className={styles.logo}></Link>
            {/* for buttons */}
            <div className={styles.buttonContainer}>
              <button onClick= {scrollToAbout} className={styles.buttons}>
                About
              </button>
              <button className={styles.buttons} onClick={() => router.push('/dashboard')}>
                Tutors
              </button>
              <button className={styles.buttons} onClick={() => router.push('/dashboard')}>
                Sign out
              </button>
            </div>
          </div>
          {/* search section */}
          {/* TODO: add the search bar */}
          <div>
            <div className={styles.searchSection}>
              <h1 className={styles.helpComments} >Enter your Tutor's name to get started.</h1>
              <form >
                <input className={styles.searchbar} name="searchbar" type="text" value={searchText} placeholder="Search" onKeyDown={handleEnter} onChange={handleChange}></input>
              </form>
              <div style={{display: "flex", flexDirection: "row"}}>
                <h1 style={{paddingRight: "5px"}}>Can't find your tutor?</h1>
                <Link href="add_tutor" style={{textDecoration: "underline", color: "black"}}>Click here</Link>
              </div>
            </div>
          </div>
        </div>

        <div ref={aboutRef} className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h2>Our Mission</h2>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Id ad pellentesque ultricies hendrerit venenatis fermentum. 
              Phasellus facilisi pharetra etiam pharetra etiam tellus sociosqu placerat. Aliquet sed tempor gravida sodales facilisis purus non. 
              Proin varius ante, nullam metus risus dolor. Arcu ultricies sed ad lorem ullamcorper; adipiscing porta.
            </p>
          </div>
          <button className={styles.aboutImage}></button>
        </div>

        <div className={styles.reviewSection} style={{padding: '2rem 0', backgroundColor: '#e83c3c', textAlign: 'center'}}>
          <h2>What do people think of us?</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '2rem',
            padding: '2rem',
          }}>
            {/* add feature for carousel effect for reviews*/}
            <div className={styles.reviewTrack}>
              {reviews.map((review, index) => (
                <div key={index} style={{color: '#0B1215'}}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold'}}>{review.name}</p>
                  <p>{review.stars}</p>
                  <p>{review.review}</p>
                </div>
              ))}
            </div>  
           </div>
        </div>

        <div className={styles.teamContainer}>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
            <div key={index} className={styles.memberCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className={styles.profileImage}
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <div className={styles.socialLinks}>
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              )}
            </div>
            </div>
          ))}
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
