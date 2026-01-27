"use client";

import React from 'react';

export default function FortuneHub() {
  return (
    <main style={{
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'serif',
      margin: 0,
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        
        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          letterSpacing: '-0.05em',
          margin: '0 0 60px 0',
          fontWeight: 'normal',
          textTransform: 'uppercase'
        }}>
          FORTUNE 5 BILLION
        </h1>
        
        {/* Navigation Links */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '30px',
          alignItems: 'center' 
        }}>
          
          {/* INTERNAL LINK: Same Tab */}
          <a 
            href="/niragame" 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '10px 40px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.target.style.color = '#ff0000'; e.target.style.borderColor = '#ff0000'; }}
            onMouseOut={(e) => { e.target.style.color = 'white'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >
            Play N.I.R.A. Game
          </a>

          {/* EXTERNAL LINKS: New Tab */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <a 
              href="https://ko-fi.com/yourlink" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              Support on Ko-fi
            </a>

            <a 
              href="mailto:business@fortune5billion.com" 
              style={{
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              Business Inquiry
            </a>
          </div>
        </nav>

        {/* Footer */}
        <div style={{
          marginTop: '100px',
          fontSize: '0.6rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          opacity: 0.3
        }}>
          Dark Elegance • Established 2026
        </div>
      </div>
    </main>
  );
}
