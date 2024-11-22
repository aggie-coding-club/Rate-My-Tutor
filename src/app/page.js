'use client'
import Image from "next/image";
import styles from './client/css/home.module.css';
<<<<<<< HEAD
import RMT from './client/Assets/RMT.png'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { scrollToWithOffset } from './utils/scrollToWithOffset';
=======
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const Slider = dynamic(() => import('react-slick'), { ssr: false });3
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from 'react';
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1

// icons
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// team images
import longVo from '../app/client/Assets/teamImages/long.jpg'
<<<<<<< HEAD
import kevinChen from '../app/client/Assets/teamImages/kev.jpg'
import lichengYi from '../app/client/Assets/teamImages/licheng.jpg'
import erica from '../app/client/Assets/teamImages/erica.jpg'
import aldiyar from '../app/client/Assets/teamImages/aldiyar.jpg'
import lorenzo from '../app/client/Assets/teamImages/lorenzo.jpg'
import miguel from '../app/client/Assets/teamImages/miguel.jpg'
import reuben from '../app/client/Assets/teamImages/reuben.png'

=======
import kevinChen from '../app/client/Assets/teamImages/kev1.jpg'
import lichengYi from '../app/client/Assets/teamImages/licheng.jpg'
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1

const background = {
  background: "white",
  height: '100vh',
  width: '100vw'
}

const reviews = [
  { name: 'Kevin Chen', review: 'I love the PTs so much, especially Licheng Yi ;)', stars: '★★★★★'},
  { name: 'Licheng Yi', review: 'I\'m one of the PTs for Rate my Tutor and I got to meet up so many wonderful students like Kevin Chen :3', stars: '★★★★★'},
  { name: 'Long Vo', review: 'Why is this just a dating site?', stars: '★☆☆☆☆'},
<<<<<<< HEAD
  { name: 'Miguel', review: 'Brainrot ahh, 7/4 on the freaky scale', stars: '★★★★☆'}
=======
  { name: 'Miguel C', review: 'Brainrot ahh, 7/4 on the freaky scale', stars: '★★★★☆'},
  { name: 'Lorenzo V', review: 'Rate My Tutor is straight Baby Gronk fumbled-the-bag energy', stars: '☆☆☆☆☆☆'}
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
]

const teamMembers = [
  {
    name: "Kevin Chen",
    role: "Project Manager",
    image: kevinChen,
<<<<<<< HEAD
    github: "https://github.com/Prunuus"
=======
    linkedin: "#",
    github: "#"
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
  },
  {
    name: "Licheng Yi",
    role: "Project Manager",
    image: lichengYi,
<<<<<<< HEAD
    github: "https://github.com/Hurdamert"
=======
    linkedin: "#",
    github: "#"
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
  },
  {
    name: "Long Vo",
    role: "Project Manager",
    image: longVo,
<<<<<<< HEAD
=======
    linkedin: "#",
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
    github: "https://github.com/longv1-code"
  },
  {
    name: "Lorenzo Viray",
    role: "Member",
<<<<<<< HEAD
    image: lorenzo,
=======
    image: lichengYi,
    linkedin: "#",
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
    github: "https://github.com/CrunchyWaterIsNotIce"
  },
  {
    name: "Aldiyar Seidaliyev",
    role: "Member",
<<<<<<< HEAD
    image: aldiyar,
=======
    image: lichengYi,
    linkedin: "#",
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
    github: "https://github.com/aldiseida"
  },
  {
    name: "Reuben Daniel",
    role: "Member",
<<<<<<< HEAD
    image: reuben,
=======
    image: lichengYi,
    linkedin: "#",
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
    github: "https://github.com/reubend415"
  },
  {
    name: "Miguel Canales",
    role: "Member",
<<<<<<< HEAD
    image: miguel,
=======
    image: lichengYi,
    linkedin: "#",
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
    github: "https://github.com/MiguelCan13"
  },
  {
    name: "Erica Tong",
    role: "Member",
<<<<<<< HEAD
    image: erica,
=======
    image: lichengYi,
    linkedin: "#",
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
    github: "https://github.com/lichtrune"
  },
]

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
<<<<<<< HEAD
=======


>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
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
<<<<<<< HEAD
=======
          sessionStorage.setItem('searchText', searchText);
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
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

<<<<<<< HEAD
  // scroll to about section
  const aboutRef = useRef(null);
  const scrollToAbout = () => {
    scrollToWithOffset(aboutRef.current, 65);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get("scrollTo");

    if (scrollTo === "about" && aboutRef.current) {
      scrollToWithOffset(aboutRef.current, 65);
      const newURL = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newURL);
    }
  }, []);
=======
  const aboutRef = useRef(null);
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({behavior: 'smooth'});
  }
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1

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
<<<<<<< HEAD
              <Link href="/#about">
                <button id="about" onClick= {scrollToAbout} className={styles.buttons}>About</button>
              </Link>
              <Link href="/login" className={styles.buttons}>
                Log In
              </Link>
              <Link href="/signup" className={`${styles.buttons} ${styles.activeButton}`}>
                Sign Up
              </Link>
            </div>
          </div>
          {/* search section */}
          <div>
            <div className={styles.searchSection}>
              <h1 className={styles.helpComments} style={{color: "white"}}>Enter your Tutor's name to get started.</h1>
=======
              <button onClick= {scrollToAbout} className={styles.buttons}>
                About
              </button>
              <button className={styles.buttons} onClick={() => router.push('/login')}>
                Log In
              </button>
              <button className={styles.buttons} onClick={() => router.push('/signup')}>
                Sign Up
              </button>
            </div>
          </div>
          {/* search section */}
          {/* TODO: add the search bar */}
          <div>
            <div className={styles.searchSection}>
              <h1 className={styles.helpComments} >Enter your Tutor's name to get started.</h1>
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
              <form >
                <input className={styles.searchbar} name="searchbar" type="text" value={searchText} placeholder="Search" onKeyDown={handleEnter} onChange={handleChange}></input>
              </form>
              <div style={{display: "flex", flexDirection: "row"}}>
                <h1 style={{paddingRight: "5px"}}>Can't find your tutor?</h1>
<<<<<<< HEAD
                <Link href="/client/add_tutor" style={{textDecoration: "underline", color: "white"}}>Click here</Link>
=======
                <Link href="/add_tutor" style={{textDecoration: "underline", color: "black"}}>Click here</Link>
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        {/* about section */}
        <div ref={aboutRef} id="about" className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h2>Our Mission</h2>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Id ad pellentesque ultricies hendrerit venenatis fermentum. 
              Phasellus facilisi pharetra etiam pharetra etiam tellus sociosqu placerat. Aliquet sed tempor gravida sodales facilisis purus non. 
              Proin varius ante, nullam metus risus dolor. Arcu ultricies sed ad lorem ullamcorper; adipiscing porta.
=======

        <div ref={aboutRef} className={styles.aboutSection} id="about">
          <div className={styles.aboutContent}>
            <h2>Our Mission</h2>
            <p>
              To be able to bring the ability to search for tutors that suit your particular needs in a flash.
              Before engaging with tutors be able to see how the community feels about them! Of course,
              these ratings are subjective and should not fully influence your decisions. Happy tutor searching!
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
            </p>
          </div>
          <button className={styles.aboutImage}></button>
        </div>

<<<<<<< HEAD
        {/* review section */}
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
=======
        <div className={styles.reviewSection} style={{padding: '2rem 0', backgroundColor: '#e83c3c', textAlign: 'center'}}>
          <h2>What do people think of us?</h2>
          <Slider {...{infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1, autoplay: true, autoplaySpeed: 1750}} className={styles.reviewSliderContainer}>
            {reviews.map((review, index) => (
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
                <div key={index} style={{color: '#0B1215'}}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold'}}>{review.name}</p>
                  <p>{review.stars}</p>
                  <p>{review.review}</p>
                </div>
              ))}
<<<<<<< HEAD
            </div>  
           </div>
        </div>
        
        {/* team section */}
=======
          </Slider>

        </div>

>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
        <div className={styles.teamContainer}>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
            <div key={index} className={styles.memberCard}>
<<<<<<< HEAD
              <div className={styles.imageContainer}> {/* handles member containers */}
=======
              <div className={styles.imageContainer}>
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className={styles.profileImage}
                />
              </div>
<<<<<<< HEAD
              <h3 className={styles.memberName}>{member.name}</h3> {/* member name */}
              <p className={styles.memberRole}>{member.role}</p> {/* member role */}
              <div className={styles.socialLinks}> {/* member socials */}
              {member.linkedin && ( 
=======
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <div className={styles.socialLinks}>
              {member.linkedin && (
>>>>>>> 89a7a6a0e1a87d84cf70ae86649b85e45675dba1
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
