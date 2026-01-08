'use client'; // Client Component karena ada interaksi form

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoogleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect ke Google Search di tab baru
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[70px] bg-[#161616]/90 backdrop-blur-md z-50 border-b border-white/5">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        
        <Link href="/" className="text-3xl font-bold font-['Teko'] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-400">
          ANIMANHUA
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="#" className="hover:text-cyan-400 transition">Popular</Link>
          <Link href="#" className="hover:text-cyan-400 transition">Bookmark</Link>
        </nav>

        {/* Google Search Form */}
        <form onSubmit={handleGoogleSearch} className="flex items-center bg-white/10 rounded-full px-4 py-1.5">
          <input 
            type="text" 
            placeholder="Cari di Google..." 
            className="bg-transparent border-none outline-none text-white w-32 md:w-48 placeholder-gray-400 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </form>

      </div>
    </header>
  );
          }
