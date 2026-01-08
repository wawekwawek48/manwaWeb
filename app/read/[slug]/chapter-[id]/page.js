import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import "../reader.css";

const dataPath = path.join(process.cwd(), "public/data/index.json");

function getAllManga() {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

function getMangaBySlug(slug) {
  return getAllManga().find((m) => m.id === slug);
}

export default function ReadPage({ params }) {
  const { slug, id } = params;
  const chapterKey = `chapter_${id}`;

  const manga = getMangaBySlug(slug);
  if (!manga) return notFound();

  const images = manga.image?.[chapterKey];
  if (!images) return notFound();

  return (
    <div className="reader">
      <header className="reader-header">
        <h1>{manga.title}</h1>
        <p>Chapter {id}</p>
      </header>

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

      <footer className="reader-footer">
        <p>End of Chapter</p>
      </footer>
    </div>
  );
}
