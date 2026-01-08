import './globals.css';

export const metadata = {
  title: 'AniManhua - Read Manhwa Online',
  description: 'Platform baca manhwa dan anime modern.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Style inline langsung di body agar background hitam pasti muncul */}
      <body style={{ backgroundColor: '#0a0a0a', color: '#ffffff', margin: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
