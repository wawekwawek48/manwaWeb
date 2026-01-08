import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";

const dataPath = path.join(process.cwd(), "public/data/index.json");

// ===== helper =====
function getAllManga() {
  const raw = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(raw);
}

function getMangaBySlug(slug) {
  const all = getAllManga();
  return all.find((m) => m.id === slug);
}

// ===== page =====
export default function ReadPage({ params }) {
  const { slug, id } = params;
  const chapterKey = `chapter_${id}`;

  const manga = getMangaBySlug(slug);
  if (!manga) return notFound();

  const images = manga.image?.[chapterKey];
  if (!images) return notFound();

  return (
    <div className="reader">
      {/* HEADER */}
      <header className="reader-header">
        <h1>{manga.title}</h1>
        <p>Chapter {id}</p>
      </header>

      {/* IMAGE LIST (MANHWA STYLE) */}
      <main className="reader-content">
        {images.map((src, i) => (
          <div key={i} className="page">
            <Image
              src={src}
              alt={`${manga.title} chapter ${id} page ${i + 1}`}
              width={900}
              height={1600}
              priority={i < 2}
              className="page-img"
            />
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="reader-footer">
        <p>End of Chapter</p>
      </footer>

      {/* STYLE */}
      <style jsx>{`
        .reader {
          background: #000;
          color: #fff;
          min-height: 100vh;
        }

        .reader-header {
          text-align: center;
          padding: 16px;
          border-bottom: 1px solid #222;
        }

        .reader-header h1 {
          font-size: 20px;
          text-transform: capitalize;
        }

        .reader-header p {
          color: #aaa;
          font-size: 14px;
        }

        .reader-content {
          max-width: 900px;
          margin: auto;
        }

        .page {
          margin-bottom: 0;
        }

        .page-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .reader-footer {
          text-align: center;
          padding: 24px;
          color: #888;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
    }
