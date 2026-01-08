'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoogleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  return (
    <header className="navbar">
      <div className="container">
        
        <Link href="/" className="logo">
          ANIMANHUA
        </Link>

        <nav className="nav-menu">
          <Link href="/">Home</Link>
          <Link href="#">Popular</Link>
          <Link href="#">Bookmark</Link>
        </nav>

        <form onSubmit={handleGoogleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="Search Google..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

      </div>

      {/* CSS LANGSUNG DI SINI (Styled JSX) */}
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 70px;
          background: rgba(22, 22, 22, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #7b2cbf 0%, #4cc9f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 1px;
          text-decoration: none;
          cursor: pointer;
        }
        .nav-menu {
          display: flex;
          gap: 25px;
        }
        .nav-menu a {
          color: #ccc;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.3s;
        }
        .nav-menu a:hover {
          color: #4cc9f0;
          text-shadow: 0 0 10px rgba(76, 201, 240, 0.5);
        }
        .search-form {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 5px 15px;
        }
        .search-input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          width: 150px;
        }
        .search-btn {
          background: transparent;
          border: none;
          color: #888;
          cursor: pointer;
          font-size: 16px;
        }
        @media (max-width: 768px) {
          .nav-menu { display: none; }
          .logo { font-size: 20px; }
        }
      `}</style>
    </header>
  );
    }
