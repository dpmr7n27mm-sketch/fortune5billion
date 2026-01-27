"use client";

import { useState, useEffect } from 'react';

export default function FortuneHub() {
  // --- CAROUSEL LOGIC ---
  const [currentImage, setCurrentImage] = useState(0);
  const carouselImages = [
    '/IMG_5769.PNG',
    '/6C9A61AB-A0B2-407E-95CF-7B1F5CEBE4FF.PNG'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // --- GLITCH TEXT EFFECT (exact from game) ---
  const [glitchText, setGlitchText] = useState('NOTHING IS REAL ANYMORE');

  useEffect(() => {
    const glitch = setInterval(() => {
      if (Math.random() > 0.7) {
        const chars = '░▒▓█▄▀ΞΩΨΔ';
        setGlitchText('NOTHING IS REAL ANYMORE'.split('').map(c => 
          Math.random() > 0.85 ? chars[Math.floor(Math.random() * chars.length)] : c
        ).join(''));
        setTimeout(() => setGlitchText('NOTHING IS REAL ANYMORE'), 100);
      }
    }, 250);
    return () => clearInterval(glitch);
  }, []);

  // --- HOVER STATE ---
  const [hoveredButton, setHoveredButton] = useState(null);

  const buttons = [
    { id: 'game', label: '▶ PLAY N.I.R.A. GAME NOW', href: '/niragame', external: false },
    { id: 'presave', label: 'PRE-SAVE VOL 1 NOW', href: '#', external: false },
    { id: 'support', label: 'BUY HQ ALBUM / SUPPORT', href: 'https://ko-fi.com/fortune5billion', external: true },
    { id: 'licensing', label: 'LICENSING & SYNC', href: 'mailto:info@fortune5billion.com', external: false },
    { id: 'instagram', label: 'FOLLOW @FORTUNE5BILLION', href: 'https://instagram.com/fortune5billion', external: true },
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #151515 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
      color: '#fff',
      padding: '40px 20px',
    }}>
      {/* Header - exact styling from game */}
      <div style={{ 
        fontSize: 11, 
        color: '#555', 
        letterSpacing: 3, 
        marginBottom: 25,
        textAlign: 'center',
      }}>
        FORTUNE5BILLION PRESENTS
      </div>

      {/* Album Art Carousel */}
      <div style={{
        width: 320,
        height: 320,
        position: 'relative',
        marginBottom: 25,
        boxShadow: '0 0 60px rgba(0,0,0,0.8)',
      }}>
        {carouselImages.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`N.I.R.A. Vol 1`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: currentImage === idx ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Glitch Text - exact styling from game */}
      <div style={{ 
        fontSize: 13, 
        color: '#666', 
        letterSpacing: 2, 
        marginBottom: 35,
        textAlign: 'center',
      }}>
        {glitchText}
      </div>

      {/* Button Stack */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 12,
        marginBottom: 50,
      }}>
        {buttons.map((btn) => (
          <a
            key={btn.id}
            href={btn.href}
            target={btn.external ? '_blank' : undefined}
            rel={btn.external ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => setHoveredButton(btn.id)}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: '14px 45px',
              fontSize: 13,
              fontFamily: 'monospace',
              background: hoveredButton === btn.id ? '#fff' : 'transparent',
              border: '2px solid #fff',
              color: hoveredButton === btn.id ? '#000' : '#fff',
              textDecoration: 'none',
              letterSpacing: 4,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {btn.label}
          </a>
        ))}
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center',
        marginTop: 'auto',
        paddingTop: 30,
        paddingBottom: 20,
      }}>
        <div style={{
          fontSize: 12,
          color: '#555',
          letterSpacing: 1,
          fontStyle: 'italic',
          marginBottom: 15,
        }}>
          An Auditory Experience designed by
        </div>
        
        <img
          src="/fortune5billion-logo.svg"
          alt="fortune5billion"
          style={{
            width: 240,
            height: 40,
            display: 'block',
            margin: '0 auto 20px auto',
          }}
        />

        <div style={{ 
          fontSize: 8, 
          color: '#333', 
          marginTop: 8, 
          letterSpacing: 1,
        }}>
          © 2026 FORTUNE5BILLION INC. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
