"use client";

import React, { useState, useEffect } from 'react';

export default function FortuneHub() {
  // --- CAROUSEL LOGIC ---
  // We'll cycle between your main branding images.
  // Make sure 'IMG_5769.png' and 'fortune5billion N.I.R.A. Vol.1.png' are in your 'public' folder.
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/IMG_5769.png', // The Broken Cookie
    '/fortune5billion N.I.R.A. Vol.1.png' // The Text Branding
  ];

  useEffect(() => {
    // Change image every 4 seconds for a slow, hypnotic pace
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  // --- STYLES ---
  const commonButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '20px 0',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    textAlign: 'center',
    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    background: 'rgba(0,0,0,0.5)'
  };

  const hoverStyle = (e) => {
    e.target.style.background = 'white';
    e.target.style.color = 'black';
    e.target.style.borderColor = 'white';
  };

  const resetStyle = (e) => {
    e.target.style.background = 'rgba(0,0,0,0.5)';
    e.target.style.color = 'white';
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)';
  };

  return (
    <main style={{
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Courier New", Courier, monospace', // A more tech/terminal font
      padding: '40px'
    }}>
      {/* CSS Animation for the "Black Mirror" blink effect */}
      <style>
        {`
          @keyframes glitch-blink {
            0%, 100% { opacity: 1; text-shadow: 0 0 0 transparent; }
            50% { opacity: 0.7; text-shadow: 2px 0 0 red, -2px 0 0 cyan; }
            52% { opacity: 0.2; }
            54% { opacity: 0.7; }
            90% { text-shadow: none; }
            92% { text-shadow: 2px 0 0 red, -2px 0 0 cyan; }
            94% { text-shadow: none; }
          }
          .nira-button {
            animation: glitch-blink 2s infinite;
            border-color: white !important;
          }
          .nira-button:hover {
            animation: none; /* Stop blinking on hover */
            background-color: #ff0000 !important; /* Blood red background */
            color: black !important;
            border-color: #ff0000 !important;
            box-shadow: 0 0 20px #ff0000; /* Red glow */
          }
        `}
      </style>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        alignItems: 'center'
      }}>
        
        {/* --- LEFT COLUMN: CAROUSEL --- */}
        <div style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          maxHeight: '600px',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '20px',
          backgroundColor: '#0a0a0a'
        }}>
          <img 
            src={images[currentImage]} 
            alt="Fortune 5 Billion Visuals"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              filter: 'contrast(1.2) grayscale(0.2)', // Slight tech-noir filter
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
        </div>

        {/* --- RIGHT COLUMN: BUTTON STACK --- */}
        <nav style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center'
        }}>
          
          {/* 1. PLAY NIRA GAME NOW! (Internal Link, Same Tab, Blinking) */}
          <a 
            href="/niragame"
            className="nira-button"
            style={{
              ...commonButtonStyle,
              fontSize: '1.2rem', // Slightly larger
              letterSpacing: '0.3em',
              borderWidth: '3px'
            }}
          >
            PLAY NIRA GAME NOW!
          </a>

          {/* 2. PRE-SAVE VOL.1 NOW (External Link, New Tab) */}
          <a 
            href="YOUR_TUNECORE_LINK_HERE" // <--- Replace with your actual link
            target="_blank"
            rel="noopener noreferrer"
            style={commonButtonStyle}
            onMouseOver={hoverStyle}
            onMouseOut={resetStyle}
          >
            PRE-SAVE VOL.1 NOW
          </a>

          {/* 3. BUY HQ ALBUM / SUPPORT (External Link, New Tab) */}
          <a 
            href="https://ko-fi.com/yourlink" // <--- Replace with your Ko-fi link
            target="_blank"
            rel="noopener noreferrer"
            style={commonButtonStyle}
            onMouseOver={hoverStyle}
            onMouseOut={resetStyle}
          >
            BUY HQ ALBUM / SUPPORT
          </a>

          {/* 4. LICENSING & SYNC (External Link, New Tab - Email) */}
          <a 
            href="mailto:info@fortune5billion.com"
            style={commonButtonStyle}
            onMouseOver={hoverStyle}
            onMouseOut={resetStyle}
          >
            LICENSING & SYNC
          </a>

          {/* 5. FOLLOW @FORTUNE5BILLION (External Link, New Tab) */}
          <a 
            href="https://instagram.com/fortune5billion" // <--- Replace with your IG link
            target="_blank"
            rel="noopener noreferrer"
            style={commonButtonStyle}
            onMouseOver={hoverStyle}
            onMouseOut={resetStyle}
          >
            FOLLOW @FORTUNE5BILLION
          </a>

        </nav>
      </div>

      {/* --- FOOTER --- */}
      <footer style={{
        marginTop: 'auto',
        paddingTop: '40px',
        textAlign: 'center',
        fontSize: '0.6rem',
        letterSpacing: '0.4em',
        opacity: 0.4,
        textTransform: 'uppercase'
      }}>
        © 2026 FORTUNE5BILLION INC. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
