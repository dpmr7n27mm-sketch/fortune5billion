export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0a0a0a" />
        <title>N.I.R.A. | FORTUNE5BILLION</title>
        <style>{`
          *, *::before, *::after {
            box-sizing: border-box;
          }
          div {
            transform-origin: center center;
          }
          html, body {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          html::-webkit-scrollbar,
          body::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0,
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
      }}>
        {children}
      </body>
    </html>
  );
}
