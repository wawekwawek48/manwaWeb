'use client';

import Navbar from './components/Navbar';
import Card from './components/Card';
import { getAllManga } from '../lib/data'; // Pastikan path import benar '../lib/data'

export default function Home() {
  const mangas = getAllManga();

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        {mangas.length > 0 && (
          <img 
            src={mangas[0].banner} 
            alt="Hero Banner" 
            className="hero-bg"
          />
        )}
        <div className="hero-content">
          <span className="hero-badge">TRENDING #1</span>
          <h1 className="hero-title">
            {mangas.length > 0 ? mangas[0].title : "Loading..."}
          </h1>
          <p className="hero-desc">
            {mangas.length > 0 ? mangas[0].desc : ""}
          </p>
          <a href={`/detail/${mangas.length > 0 ? mangas[0].id : '#'}`} className="hero-btn">
            BACA SEKARANG
          </a>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="container content-section">
        <h2 className="section-title">
          LATEST UPDATES <span>✨</span>
        </h2>
        
        <div className="grid-container">
          {mangas.map((manga) => (
            <Card key={manga.id} manga={manga} />
          ))}
        </div>
      </section>

      {/* CSS HALAMAN UTAMA */}
      <style jsx>{`
        .hero-section {
          height: 80vh;
          position: relative;
          margin-top: 70px; /* Navbar height */
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.5);
          z-index: 1;
        }
        .hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to top, #0a0a0a, transparent);
          z-index: 2;
        }
        .hero-content {
          position: relative;
          z-index: 3;
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-badge {
          background: #7b2cbf;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 15px;
          box-shadow: 0 0 10px rgba(123, 44, 191, 0.5);
        }
        .hero-title {
          font-size: 3.5rem;
          line-height: 1;
          margin: 0 0 15px 0;
          font-weight: 800;
          text-transform: uppercase;
          text-shadow: 0 5px 15px rgba(0,0,0,0.8);
        }
        .hero-desc {
          color: #ddd;
          font-size: 1.1rem;
          margin-bottom: 25px;
          max-width: 600px;
        }
        .hero-btn {
          display: inline-block;
          background: linear-gradient(135deg, #7b2cbf 0%, #4cc9f0 100%);
          color: white;
          padding: 12px 30px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(123, 44, 191, 0.4);
          transition: transform 0.2s;
        }
        .hero-btn:hover {
          transform: scale(1.05);
        }

        /* Content Section */
        .content-section {
          padding: 60px 20px;
        }
        .section-title {
          font-size: 2rem;
          margin-bottom: 30px;
          border-left: 5px solid #4cc9f0;
          padding-left: 15px;
          text-transform: uppercase;
          color: white;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 25px;
        }
      `}</style>
    </>
  );
}
