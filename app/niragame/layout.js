export default function GameLayout({ children }) {
  return (
    <div style={{
      height: '100dvh',
      overflow: 'hidden',
      backgroundColor: '#0a0a0a',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      {children}
    </div>
  );
}
