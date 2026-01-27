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
      margin: 0,
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        
        {/* Header Image - Using your uploaded branding */}
        <div style={{ marginBottom: '80px' }}>
          <img 
            src="/fortune5billion N.I.R.A. Vol.1.png" 
            alt="An Auditory Experience designed by FORTUNE5BILLION"
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              filter: 'brightness(1.2)' 
            }} 
          />
        </div>

        {/* The Original Minimalist Nav */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '30px' 
        }}>
          
          {/* INTERNAL LINK: Same Tab (No target="_blank") */}
          <a 
            href="/niragame" 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              fontWeight: '300',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseOver={(e) => { e.target.style.color = '#ff0000'; e.target.style.letterSpacing = '0.6em'; e.target.style.fontStyle = 'italic'; }}
            onMouseOut={(e) => { e.target.style.color = 'white'; e.target.style.letterSpacing = '0.4em'; e.target.style.fontStyle = 'normal'; }}
          >
            Play N.I.R.A.
          </a>

          {/* EXTERNAL LINKS: New Tab (Has target="_blank") */}
          <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <a 
              href="https://ko-fi.com/yourlink" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase'
              }}
            >
              Support on Ko-fi
            </a>

            <a 
              href="mailto:business@fortune5billion.com" 
              style={{
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase'
              }}
            >
              Business Inquiries
            </a>
          </div>
        </nav>

        {/* Footer */}
        <div style={{
          marginTop: '120px',
          fontSize: '0.55rem',
          letterSpacing: '0.6em',
          textTransform: 'uppercase',
          opacity: 0.2
        }}>
          Established 2026 • Volume One
        </div>
      </div>
    </main>
  );
}
