import Link from "next/link";
import { notFound } from "next/navigation";
import { getMangaBySlug } from "@/lib/data";

export default function ReaderPage({ params }) {
  const { slug, id } = params;

  // Ambil data manga
  const manga = getMangaBySlug(slug);
  if (!manga) return notFound();

  // SESUAI JSON: chapter_1, chapter_2, dst
  const chapterKey = `chapter_${id}`;
  const images = manga.image?.[chapterKey];

  if (!images || images.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400">
        Chapter tidak ditemukan
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-[#161616] border-b border-white/10">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/detail/${manga.id}`}
            className="text-cyan-400 hover:underline"
          >
            ← Back
          </Link>

          <div className="text-sm font-semibold truncate text-center px-4">
            {manga.title}
            <span className="text-purple-400"> • Chapter {id}</span>
          </div>

          <div className="w-12" />
        </div>
      </div>

      {/* IMAGE READER (VERTIKAL / MANHWA STYLE) */}
      <div className="max-w-[900px] mx-auto flex flex-col">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Page ${index + 1}`}
            className="w-full h-auto block"
            loading="lazy"
          />
        ))}
      </div>

      {/* NAVIGASI CHAPTER */}
      <div className="max-w-[900px] mx-auto py-10 text-center text-gray-400">
        <p className="mb-4">End of Chapter</p>

        <div className="flex justify-center gap-4">
          {Number(id) > 1 && (
            <Link
              href={`/read/${slug}/chapter-${Number(id) - 1}`}
              className="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              ← Prev
            </Link>
          )}

          {manga.image[`chapter_${Number(id) + 1}`] && (
            <Link
              href={`/read/${slug}/chapter-${Number(id) + 1}`}
              className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 transition"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
        }
