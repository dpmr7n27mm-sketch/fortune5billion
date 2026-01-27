"use client";

import { useState, useEffect } from 'react';

export default function FortuneHub() {
  // --- CAROUSEL LOGIC ---
  const [currentImage, setCurrentImage] = useState(0);
  const carouselImages = [
    '/IMG_5769.PNG',  // Exact case match
    '/6C9A61AB-A0B2-407E-95CF-7B1F5CEBE4FF.PNG'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // --- GLITCH TEXT EFFECT ---
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
    <main style={{
      background: 'linear-gradient(180deg, #0a0a0a 0%, #151515 100%)',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'monospace',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* CRT Scanline Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        pointerEvents: 'none',
        zIndex: 100,
      }} />
      
      {/* Vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        pointerEvents: 'none',
        zIndex: 99,
      }} />

      {/* Content Container */}
      <div style={{
        width: '100%',
        maxWidth: 500,
        padding: '40px 20px 100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Header */}
        <div style={{
          fontSize: 10,
          color: '#444',
          letterSpacing: 3,
          marginBottom: 25,
          textAlign: 'center',
          width: '100%',
        }}>
          FORTUNE5BILLION PRESENTS
        </div>

        {/* Carousel */}
        <div style={{
          width: '100%',
          maxWidth: 380,
          aspectRatio: '1 / 1',
          position: 'relative',
          marginBottom: 20,
          border: '2px solid #2a2a2a',
          boxShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}>
          {carouselImages.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`N.I.R.A. Vol 1 - Image ${idx + 1}`}
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

        {/* Glitch Text */}
        <div style={{
          fontSize: 11,
          color: '#555',
          letterSpacing: 2,
          marginBottom: 30,
          textAlign: 'center',
          width: '100%',
        }}>
          {glitchText}
        </div>

        {/* Button Stack */}
        <nav style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {buttons.map((btn) => (
            <a
              key={btn.id}
              href={btn.href}
              target={btn.external ? '_blank' : undefined}
              rel={btn.external ? 'noopener noreferrer' : undefined}
              onMouseEnter={() => setHoveredButton(btn.id)}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                display: 'block',
                width: '100%',
                padding: '16px 24px',
                fontSize: 13,
                fontFamily: 'monospace',
                background: hoveredButton === btn.id ? '#fff' : 'transparent',
                border: '2px solid #333',
                borderColor: hoveredButton === btn.id ? '#fff' : '#333',
                color: hoveredButton === btn.id ? '#000' : '#fff',
                textDecoration: 'none',
                letterSpacing: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {btn.label}
            </a>
          ))}
        </nav>

        {/* Footer Branding */}
        <footer style={{
          marginTop: 50,
          textAlign: 'center',
          width: '100%',
        }}>
          <div style={{
            fontSize: 12,
            color: '#666',
            letterSpacing: 1,
            fontStyle: 'italic',
            marginBottom: 12,
          }}>
            An Auditory Experience designed by
          </div>
          
          {/* Logo */}
          <div style={{
            marginBottom: 25,
            display: 'flex',
            justifyContent: 'center',
          }}>
            <img
              src="/fortune5billion-logo.svg"
              alt="fortune5billion"
              style={{
                width: 280,
                height: 'auto',
                filter: 'drop-shadow(0 0 8px rgba(137, 218, 89, 0.3))',
              }}
            />
          </div>

          {/* Copyright - exact match from game */}
          <div style={{
            fontSize: 8,
            color: '#333',
            marginTop: 8,
            letterSpacing: 1,
          }}>
            © 2026 FORTUNE5BILLION INC. All Rights Reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}
