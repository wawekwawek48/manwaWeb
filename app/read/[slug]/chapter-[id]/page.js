import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { getMangaBySlug } from '@/lib/data';

export default function Reader({ params }) {
  const manga = getMangaBySlug(params.slug);
  const chapterId = `chapter-${params.id}`; // Format key di JSON adalah 'chapter_1', url adalah 'chapter-1'
  // Perlu penyesuaian sedikit jika URL pakai dash tapi JSON pakai underscore
  const safeChapterKey = chapterId.replace('-', '_'); 

  // Ambil array gambar dari JSON
  const images = manga?.image?.[safeChapterKey] || [];

  return (
    <>
      {/* Navbar Hidden by default logic using CSS/JS can be added, here keeping it fixed or hidden via class */}
      {/* <Navbar />  */} 
      
      <div className="max-w-[800px] mx-auto bg-black min-h-screen pb-20">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#161616] p-4 text-center z-40 border-b border-white/10 shadow-lg flex justify-between items-center">
          <Link href={`/detail/${manga.id}`} className="text-cyan-400 hover:underline">
            &larr; Back
          </Link>
          <div className="font-bold truncate px-4">
            {manga?.title} - <span className="text-purple-400">{safeChapterKey.replace('_', ' ')}</span>
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>

        {/* Vertical Images */}
        <div className="flex flex-col w-full">
          {images.map((imgSrc, idx) => (
            <img 
              key={idx} 
              src={imgSrc} 
              alt={`Page ${idx+1}`} 
              className="w-full h-auto block"
              loading="lazy"
            />
          ))}
        </div>

        {/* Auto Load Button (Simulation) */}
        <div className="py-10 text-center text-gray-500 bg-[#111] mt-4">
          <p className="mb-4">End of Chapter</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-500 transition">
            Load Next Chapter
          </button>
        </div>

      </div>
    </>
  );
  }
