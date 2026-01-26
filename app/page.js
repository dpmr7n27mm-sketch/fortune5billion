import Link from 'next/link';

export default function Hub() {
  return (
    <main style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ letterSpacing: '8px' }}>FORTUNE5BILLION.COM</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        <Link href="/niragame" style={{ padding: '15px', border: '1px solid #fff', color: '#fff', textDecoration: 'none', textTransform: 'uppercase' }}>PLAY NIRA GAME NOW</Link>
        <button style={{ padding: '15px', border: '1px solid #222', color: '#444', background: 'none', textTransform: 'uppercase' }}>STREAM VOL 1 (COMING SOON)</button>
        <a href="https://ko-fi.com/fortune5billion" target="_blank" style={{ padding: '15px', border: '1px solid #444', color: '#888', textDecoration: 'none', textTransform: 'uppercase' }}>BUY HQ ALBUM / SUPPORT</a>
        <a href="mailto:biz@fortune5billion.com" style={{ padding: '15px', border: '1px solid #444', color: '#888', textDecoration: 'none', textTransform: 'uppercase' }}>LICENSING & SYNC</a>
      </nav>
      <footer style={{ marginTop: '40px', fontSize: '10px', color: '#333' }}>© 2026 FORTUNE5BILLION INC. ALL RIGHTS RESERVED</footer>
    </main>
  );
}