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
      fontFamily: '"Times New Roman", serif',
      margin: 0,
      padding: '40px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        
        {/* Visual Header - Replacing the text title */}
        <div style={{ marginBottom: '50px' }}>
          <img 
            src="/IMG_5769.png" 
            alt="Fortune 5 Billion - Nothing is real anymore"
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              filter: 'grayscale(100%) contrast(120%)',
              marginBottom: '20px'
            }} 
          />
        </div>

        {/* Navigation - Back to the original minimalist flow */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '40px',
          alignItems: 'center' 
        }}>
          
          {/* INTERNAL LINK: Same Tab (No target="_blank") */}
          <a 
            href="/niragame" 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.8rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              transition: 'all 0.5s ease',
              opacity: 0.9
            }}
            onMouseOver={(e) => { e.target.style.color = '#ff0000'; e.target.style.letterSpacing = '0.5em'; }}
            onMouseOut={(e) => { e.target.style.color = 'white'; e.target.style.letterSpacing = '0.3em'; }}
          >
            Play N.I.R.A. Game
          </a>

          {/* EXTERNAL LINKS: New Tab (Has target="_blank") */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px', 
            marginTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '40px',
            width: '100%'
          }}>
            <a 
              href="https://ko-fi.com/yourlink" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.2em',
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
                fontSize: '0.9rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              Business Inquiry
            </a>
          </div>
        </nav>

        {/* Footer - The original subtle mark */}
        <div style={{
          marginTop: '80px',
          fontSize: '0.6rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          opacity: 0.2
        }}>
          Established 2026 • Volume One
        </div>
      </div>
    </main>
  );
}
