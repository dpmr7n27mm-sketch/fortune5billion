{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import Link from 'next/link';\
\
export default function Hub() \{\
  return (\
    <main style=\{styles.container\}>\
      <div style=\{styles.overlay\} />\
      \
      <header style=\{styles.header\}>\
        <p style=\{styles.subTitle\}>FORTUNE5BILLION INC. PRESENTS</p>\
        <h1 style=\{styles.title\}>N.I.R.A. VOL 1</h1>\
        <p style=\{styles.status\}>[ MIXING & MASTERING IN PROGRESS ]</p>\
      </header>\
\
      <nav style=\{styles.nav\}>\
        <Link href="/niragame" style=\{styles.primaryBtn\}>\
          PLAY NIRA GAME NOW\
        </Link>\
        \
        \{/* Placeholder for when you get your TuneCore link */\}\
        <button style=\{styles.btnDisabled\}>\
          STREAM VOL 1 (COMING SOON)\
        </button>\
\
        <a href="https://ko-fi.com/fortune5billion" target="_blank" style=\{styles.btn\}>\
          BUY HQ ALBUM / SUPPORT\
        </a>\
\
        <a href="mailto:biz@fortune5billion.com" style=\{styles.btn\}>\
          LICENSING & SYNC\
        </a>\
\
        <a href="https://instagram.com/fortune5billion" target="_blank" style=\{styles.btn\}>\
          FOLLOW @FORTUNE5BILLION\
        </a>\
      </nav>\
\
      <footer style=\{styles.footer\}>\
        \'a9 2026 FORTUNE5BILLION INC. ALL RIGHTS RESERVED\
      </footer>\
    </main>\
  );\
\}\
\
const styles = \{\
  container: \{\
    backgroundColor: '#050505',\
    color: '#fff',\
    minHeight: '100vh',\
    display: 'flex',\
    flexDirection: 'column',\
    alignItems: 'center',\
    justifyContent: 'center',\
    fontFamily: 'monospace',\
    padding: '20px',\
    position: 'relative',\
    overflow: 'hidden'\
  \},\
  overlay: \{\
    position: 'absolute',\
    inset: 0,\
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)',\
    pointerEvents: 'none'\
  \},\
  header: \{ textAlign: 'center', marginBottom: '40px', zIndex: 1 \},\
  subTitle: \{ fontSize: '10px', letterSpacing: '4px', color: '#666' \},\
  title: \{ fontSize: '2.5rem', letterSpacing: '10px', margin: '10px 0', fontWeight: 'bold' \},\
  status: \{ fontSize: '9px', color: '#444', letterSpacing: '2px' \},\
  nav: \{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px', zIndex: 1 \},\
  btn: \{\
    padding: '16px',\
    border: '1px solid #222',\
    color: '#aaa',\
    textDecoration: 'none',\
    textAlign: 'center',\
    fontSize: '11px',\
    letterSpacing: '2px',\
    transition: 'all 0.3s ease',\
    textTransform: 'uppercase'\
  \},\
  primaryBtn: \{\
    padding: '16px',\
    border: '1px solid #fff',\
    color: '#fff',\
    textDecoration: 'none',\
    textAlign: 'center',\
    fontSize: '12px',\
    letterSpacing: '3px',\
    fontWeight: 'bold',\
    backgroundColor: 'rgba(255,255,255,0.05)'\
  \},\
  btnDisabled: \{\
    padding: '16px',\
    border: '1px solid #111',\
    color: '#333',\
    backgroundColor: 'transparent',\
    cursor: 'not-allowed',\
    fontSize: '11px',\
    letterSpacing: '2px'\
  \},\
  footer: \{ marginTop: '50px', fontSize: '8px', color: '#333', letterSpacing: '1px' \}\
\};}