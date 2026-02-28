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
  const [glitchText, setGlitchText] = useState('NOTHING IS REAL ANYMORE.');

  useEffect(() => {
    const glitch = setInterval(() => {
      if (Math.random() > 0.7) {
        const chars = '░▒▓█▄▀ΞΩΨΔ';
        setGlitchText('NOTHING IS REAL ANYMORE.'.split('').map(c =>
          Math.random() > 0.85 ? chars[Math.floor(Math.random() * chars.length)] : c
        ).join(''));
        setTimeout(() => setGlitchText('NOTHING IS REAL ANYMORE.'), 100);
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
    { id: 'licensing', label: 'LICENSING & SYNC', href: 'https://dealdesk.fortune5billion.com', external: true },
    { id: 'instagram', label: 'FOLLOW @FORTUNE5BILLION', href: 'https://instagram.com/fortune5billion', external: true },
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 40% 30% at 50% 14%, rgba(20,220,110,0.06) 0%, transparent 60%), radial-gradient(ellipse 72% 55% at 50% 22%, rgba(0,85,65,0.18) 0%, transparent 65%), linear-gradient(180deg, #0a0a0a 0%, #151515 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'monospace',
      color: '#fff',
      padding: '40px 20px 80px 20px',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Header - exact styling from game */}
      <div style={{
        fontSize: 9,
        color: '#555',
        letterSpacing: 6,
        marginBottom: 25,
        textAlign: 'center',
        opacity: 0.55,
      }}>
        FORTUNE5BILLION PRESENTS
      </div>

      {/* Album Art Carousel */}
      <div style={{
        width: '100%',
        maxWidth: 320,
        aspectRatio: '1 / 1',
        position: 'relative',
        marginBottom: 25,
        animation: 'float 5s ease-in-out infinite',
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
        fontSize: 'clamp(12px, 3.5vw, 17px)',
        color: '#fff',
        letterSpacing: 5,
        marginTop: 12,
        marginBottom: 8,
        textAlign: 'center',
        textShadow: '0 0 10px rgba(255,255,255,0.65), 0 0 28px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.8)',
      }}>
        {glitchText}
      </div>

      <div style={{
        fontSize: 9,
        color: '#555',
        letterSpacing: 6,
        marginBottom: 40,
        textAlign: 'center',
        opacity: 0.55,
      }}>
        VOLUME ONE
      </div>

      {/* Button Stack */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 12,
        width: '100%',
        maxWidth: 400,
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
              padding: '14px 20px',
              fontSize: 12,
              fontFamily: 'monospace',
              background: hoveredButton === btn.id ? '#fff' : 'transparent',
              border: '2px solid #fff',
              color: hoveredButton === btn.id ? '#000' : '#fff',
              textDecoration: 'none',
              letterSpacing: 3,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {btn.label}
          </a>
        ))}
      </div>

      {/* Grain texture overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        opacity: 0.035,
        pointerEvents: 'none',
        zIndex: 10,
      }} />

      {/* Footer - exact placement from game screens */}
      <div style={{ 
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
      }}>
        <div style={{ 
          fontSize: 8, 
          color: '#333', 
          letterSpacing: 1 
        }}>
          © 2026 FORTUNE5BILLION INC. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
