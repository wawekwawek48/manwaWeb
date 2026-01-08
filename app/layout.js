import './globals.css';

// Konfigurasi Font (Opsional, menggunakan default sans-serif jika tidak ada)
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AniManhua - Read Manhwa Online',
  description: 'Platform baca manhwa dan anime modern dengan desain neon.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
