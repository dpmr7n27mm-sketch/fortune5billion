"use client";

import React, { useState, useEffect } from 'react';

export default function FortuneHub() {
  // --- CAROUSEL LOGIC ---
  // Only the two specific images requested
  const [currentImage, setCurrentImage] = useState(0);
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

  // --- STYLES ---
  const protocolFont = '"Courier New", Courier, monospace';

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '18px 0',
    border: '1px solid #333',
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontFamily: protocolFont,
    transition: 'all 0.2s steps(4)', // "Glitchy" transition feel
    background: 'black',
    marginBottom: '15px'
  };

  return (
    <main style={{
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px',
      fontFamily: protocolFont
    }}>
      {/* Black Mirror Glitch Animation */}
      <style>
        {`
          @keyframes protocol-blink {
            0%, 100% { opacity: 1; color: white; border-color: #444; }
            50% { opacity: 0.4; color: #ff0000; border-color: #ff0000; }
            52% { opacity: 1; }
          }
          .blink-btn {
            animation: protocol-blink 1.5s infinite;
            border: 1px solid white !important;
          }
          .blink-btn:hover {
            animation: none;
            background: #ff0000 !important;
            color: black !important;
            border-color: #ff0000 !important;
            box-shadow: 0 0 15px #ff0000;
          }
          .standard-btn:hover {
            background: white;
            color: black;
          }
        `}
      </style>

      <div style={{
        display: 'flex',
        flex: 1,
        gap: '60px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        
        {/* LEFT COLUMN: ART CAROUSEL */}
        <div style={{
          flex: '1.2',
          minWidth: '350px',
          aspectRatio: '1 / 1',
          border: '1px solid #222',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#050505'
        }}>
          {carouselImages.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt="Volume One Visual"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: currentImage === idx ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                padding: '20px'
              }}
            />
          ))}
        </div>

        {/* RIGHT COLUMN: PROTOCOL NAVIGATION */}
        <nav style={{ flex: '1', minWidth: '350px' }}>
          
          <a href="/niragame" className="blink-btn" style={buttonStyle}>
            PLAY NIRA GAME NOW!
          </a>

          <a href="https://apple.com" target="_blank" rel="noopener noreferrer" className="standard-btn" style={buttonStyle}>
            PRE SAVE VOL.1 NOW
          </a>

          <a href="https://ko-fi.com/yourlink" target="_blank" rel="noopener noreferrer" className="standard-btn" style={buttonStyle}>
            BUY HQ ALBUM / SUPPORT
          </a>

          <a href="mailto:info@fortune5billion.com" className="standard-btn" style={buttonStyle}>
            LICENSING & SYNC
          </a>

          <a href="https://instagram.com/fortune5billion" target="_blank" rel="noopener noreferrer" className="standard-btn" style={buttonStyle}>
            FOLLOW @FORTUNE5BILLION
          </a>

          {/* Branding image at bottom of stack as per mockup */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <img 
              src="/fortune5billion N.I.R.A. Vol.1.png" 
              alt="Branding"
              style={{ width: '100%', maxWidth: '400px', opacity: 0.8 }} 
            />
          </div>
        </nav>
      </div>

      {/* COPYRIGHT FOOTER: Game-Screen Style */}
      <footer style={{
        marginTop: '60px',
        textAlign: 'center',
        fontSize: '0.65rem',
        letterSpacing: '0.3em',
        borderTop: '1px solid #111',
        paddingTop: '20px',
        color: '#444'
      }}>
        © 2026 FORTUNE5BILLION INC. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
