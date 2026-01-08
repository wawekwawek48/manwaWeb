import './globals.css'; // Pastikan ini ada

export const metadata = {
  title: 'AniManhua',
  description: 'Baca Manhwa Online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
