"use client";

import React, { useState, useEffect } from 'react';

export default function FortuneHub() {
  // --- CAROUSEL LOGIC ---
  const [currentImage, setCurrentImage] = useState(0);
  // Fixed file extensions to match your exact GitHub naming
  const carouselImages = [
    '/IMG_5769.png', 
    '/6C9A61AB-A0B2-407E-95CF-7B1F5CEBE4FF.PNG'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const protocolFont = '"Courier New", Courier, monospace';

  const buttonBase = {
    display: 'block',
    width: '100%',
    padding: '20px 0',
    border: '1px solid #333',
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    textAlign: 'center',
    fontSize: '1rem',
    fontFamily: protocolFont,
    transition: 'all 0.1s steps(2)',
    background: 'black'
  };

  return (
    <main style={{
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
      fontFamily: protocolFont
    }}>
      <style>
        {`
          @keyframes black-mirror-glitch {
            0% { opacity: 1; transform: skew(0deg); }
            2% { opacity: 0.8; transform: skew(5deg); color: #ff0000; }
            4% { opacity: 1; transform: skew(0deg); color: white; }
            98% { opacity: 1; }
            99% { opacity: 0.2; border-color: #ff0000; }
          }
          .blink-btn {
            animation: black-mirror-glitch 2.5s infinite;
            border: 1px solid white !important;
            font-weight: bold;
          }
          .blink-btn:hover {
            animation: none;
            background: #ff0000 !important;
            color: black !important;
            border-color: #ff0000 !important;
          }
          .standard-btn:hover {
            background: white;
            color: black;
          }
          .stack-item {
            width: 100%;
            max-width: 500px;
          }
        `}
      </style>

      {/* 1. TOP: CAROUSEL (Above the stack as per drawing) */}
      <div className="stack-item" style={{
        aspectRatio: '1 / 1',
        position: 'relative',
        backgroundColor: '#050505',
        marginBottom: '0' // Tight fit
      }}>
        {carouselImages.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt="Carousel"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: currentImage === idx ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }}
          />
        ))}
      </div>

      {/* 2. MIDDLE: THE BUTTON STACK (Tightly packed) */}
      <nav className="stack-item" style={{ display: 'flex', flexDirection: 'column' }}>
        <a href="/niragame" className="blink-btn" style={buttonBase}>PLAY NIRA GAME NOW!</a>
        <a href="https://apple.com" target="_blank" rel="noopener noreferrer" className="standard-btn" style={buttonBase}>PRE SAVE VOL.1 NOW</a>
        <a href="https://ko-fi.com/yourlink" target="_blank" rel="noopener noreferrer" className="standard-btn" style={buttonBase}>BUY HQ ALBUM / SUPPORT</a>
        <a href="mailto:info@fortune5billion.com" className="standard-btn" style={buttonBase}>LICENSING & SYNC</a>
        <a href="https://instagram.com/fortune5billion" target="_blank" rel="noopener noreferrer" className="standard-btn" style={buttonBase}>FOLLOW @FORTUNE5BILLION</a>
        
        {/* 3. BRANDING LOGO (No space, attached to stack) */}
        <img 
          src="/fortune5billion N.I.R.A. Vol.1.png" 
          alt="Branding"
          style={{ width: '100%', display: 'block' }} 
        />
      </nav>

      {/* 4. FOOTER (Exact copy from game screen) */}
      <footer style={{
        marginTop: 'auto',
        padding: '40px 0',
        textAlign: 'center',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: '#333'
      }}>
        © 2026 FORTUNE5BILLION INC. All Rights Reserved.
      </footer>
    </main>
  );
}
