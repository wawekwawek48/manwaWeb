export const runtime = "nodejs";

import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Link from 'next/link';
import { getMangaBySlug, getAllManga } from '@/lib/data';

export default async function Detail({ params }) {
  const manga = await getMangaBySlug(params.slug);
  const allManga = await getAllManga();

  if (!manga) {
    return (
      <>
        <Navbar />
        <div className="text-white pt-32 text-center">
          Manga Not Found
        </div>
      </>
    );
  }

  // Ambil chapter dari key object image
  const chapters = Object.keys(manga.image || {})
    .sort((a, b) => {
      const na = Number(a.replace("chapter_", ""));
      const nb = Number(b.replace("chapter_", ""));
      return nb - na;
    });

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 pt-[100px] min-h-screen pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-10 mb-12">
          <div className="w-full md:w-[300px] mx-auto md:mx-0">
            <img
              src={manga.banner}
              alt={manga.title}
              className="w-full rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl uppercase mb-4">
              {manga.title}
            </h1>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {manga.genres?.map((g, i) => (
                <span
                  key={i}
                  className="bg-white/10 border border-cyan-400/30 text-cyan-400 px-3 py-1 rounded-full text-sm"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-gray-400 max-w-2xl mb-8">
              {manga.desc}
            </p>

            {chapters.length > 0 && (
              <Link
                href={`/read/${manga.id}/chapter-${chapters[chapters.length - 1].replace("chapter_", "")}`}
                className="bg-gradient-to-r from-purple-600 to-cyan-400 px-8 py-3 rounded-full font-bold inline-block"
              >
                READ FIRST CHAPTER
              </Link>
            )}
          </div>
        </div>

        {/* Chapter List */}
        <h3 className="text-2xl font-bold mb-4">Chapters</h3>

        <div className="bg-[#161616] rounded-xl p-4">
          {chapters.map(ch => {
            const chNum = ch.replace("chapter_", "");
            return (
              <Link
                key={ch}
                href={`/read/${manga.id}/chapter-${chNum}`}
                className="flex justify-between items-center p-4 hover:bg-purple-900/20 border-b border-gray-800 last:border-0"
              >
                <span>{`Chapter ${chNum}`}</span>
                <span className="text-xs text-gray-500">Read</span>
              </Link>
            );
          })}
        </div>

        {/* Recommendations */}
        <h3 className="text-2xl font-bold mt-12 mb-4">
          You May Like
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {allManga
            .filter(m => m.id !== manga.id)
            .map(rec => (
              <Card key={rec.id} manga={rec} />
            ))}
        </div>
      </div>
    </>
  );
      }
