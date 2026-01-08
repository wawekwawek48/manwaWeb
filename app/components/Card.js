'use client';

import Link from 'next/link';

export default function Card({ manga }) {
  return (
    <Link href={`/detail/${manga.id}`} className="card-link">
      <div className="card">
        <div className="card-cover">
          <img 
            src={manga.banner || manga.image?.chapter_1?.[0]} 
            alt={manga.title} 
            className="card-img"
          />
          <div className="badge rating">⭐ {manga.rating}</div>
          <div className="badge type">{manga.type}</div>
        </div>
        <div className="card-info">
          <h3 className="card-title">{manga.title}</h3>
          <div className="card-meta">
            <span>{Object.keys(manga.image || {}).length} Ch</span>
            <span>{manga.status}</span>
          </div>
        </div>
      </div>

      {/* CSS LANGSUNG DI SINI */}
      <style jsx>{`
        .card-link { text-decoration: none; display: block; }
        .card {
          background: #161616;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          cursor: pointer;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 15px rgba(123, 44, 191, 0.4);
          border: 1px solid rgba(76, 201, 240, 0.3);
        }
        .card-cover {
          position: relative;
          aspect-ratio: 2/3;
          overflow: hidden;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .card:hover .card-img {
          transform: scale(1.1);
        }
        .badge {
          position: absolute;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: bold;
          backdrop-filter: blur(4px);
        }
        .rating {
          top: 10px;
          left: 10px;
          background: rgba(0,0,0,0.8);
          color: #ffc107;
        }
        .type {
          top: 10px;
          right: 10px;
          background: #4cc9f0;
          color: black;
        }
        .card-info {
          padding: 15px;
        }
        .card-title {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin: 0 0 5px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #a0a0a0;
        }
      `}</style>
    </Link>
  );
        }
