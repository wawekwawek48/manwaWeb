"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMangaBySlug } from "@/lib/data";

export default function ManhwaReader({ params }) {
  const { slug, id } = params;
  const router = useRouter();
  const manga = getMangaBySlug(slug);

  const chapterKey = `chapter_${id}`;
  const images = manga?.image?.[chapterKey] || [];

  const [showHeader, setShowHeader] = useState(true);
  const lastScroll = useRef(0);

  /* 🔥 AUTO HIDE HEADER */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setShowHeader(current < lastScroll.current || current < 50);
      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 🚀 PRELOAD NEXT CHAPTER */
  useEffect(() => {
    const next = `/read/${slug}/chapter-${Number(id) + 1}`;
    router.prefetch(next);
  }, [slug, id, router]);

  if (!manga || images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Chapter not found
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">

      {/* HEADER */}
      <div
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-[#111] border-b border-white/10 p-4 flex justify-between items-center">
          <Link href={`/detail/${slug}`} className="text-cyan-400">
            ← Back
          </Link>

          <div className="text-sm font-semibold truncate">
            {manga.title} — Chapter {id}
          </div>

          <Link
            href={`/read/${slug}/chapter-${Number(id) + 1}`}
            className="text-purple-400"
          >
            Next →
          </Link>
        </div>
      </div>

      {/* IMAGE STRIP */}
      <div className="pt-16 flex flex-col">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Page ${i + 1}`}
            className="w-full h-auto select-none"
            loading="lazy"
            draggable={false}
            onDoubleClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
          />
        ))}
      </div>

      {/* FOOTER */}
      <div className="py-10 text-center bg-[#0b0b0b] text-gray-400">
        <p className="mb-4">End of Chapter</p>

        <Link
          href={`/read/${slug}/chapter-${Number(id) + 1}`}
          className="inline-block bg-purple-600 px-6 py-3 rounded-full text-white hover:bg-purple-500 transition"
        >
          Read Next Chapter
        </Link>
      </div>
    </div>
  );
        }
