export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#050505' }}>
        {children}
      </body>
    </html>
  );
}