import './home.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { getAllManga } from '../lib/data';

export default async function Home() {
  const mangas = await getAllManga();

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
            {mangas[0]?.title ?? "Loading..."}
          </h1>

          <p className="hero-desc">
            {mangas[0]?.desc ?? ""}
          </p>

          {mangas[0] && (
            <a
              href={`/detail/${mangas[0].id}`}
              className="hero-btn"
            >
              BACA SEKARANG
            </a>
          )}
        </div>
      </section>

      {/* Latest Updates */}
      <section className="container content-section">
        <h2 className="section-title">
          LATEST UPDATES <span>✨</span>
        </h2>

        <div className="grid-container">
          {mangas.map(manga => (
            <Card key={manga.id} manga={manga} />
          ))}
        </div>
      </section>
    </>
  );
                }
