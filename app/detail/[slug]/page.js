import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Link from 'next/link';
import { getMangaBySlug, getAllManga } from '@/lib/data';

export default function Detail({ params }) {
  const manga = getMangaBySlug(params.slug);
  const allManga = getAllManga();

  if (!manga) return <div className="text-white pt-20 text-center">Manga Not Found</div>;

  // Generate Chapter List dari keys object 'image'
  const chapters = Object.keys(manga.image || {}).reverse(); 

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-[100px] min-h-screen pb-20">
        
        {/* Header Info */}
        <div className="flex flex-col md:flex-row gap-10 mb-12">
          <div className="w-full md:w-[300px] flex-shrink-0 mx-auto md:mx-0">
            <img 
              src={manga.banner} 
              className="w-full rounded-xl shadow-2xl shadow-purple-900/20 border-2 border-white/10" 
              alt={manga.title}
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-['Teko'] uppercase mb-4 leading-none">{manga.title}</h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
              {manga.genres.map((genre, idx) => (
                <span key={idx} className="bg-white/10 border border-cyan-400/30 text-cyan-400 px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-gray-400 mb-8 max-w-2xl">{manga.desc}</p>
            
            <div className="flex justify-center md:justify-start gap-4">
               {chapters.length > 0 && (
                 <Link href={`/read/${manga.id}/chapter-${chapters[0]}`} className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition">
                  READ FIRST CHAPTER
                </Link>
               )}
            </div>
          </div>
        </div>

        {/* Chapter List */}
        <h3 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Chapters</h3>
        <div className="bg-[#161616] rounded-xl p-4">
          {chapters.map((chapterKey) => (
            <Link 
              key={chapterKey} 
              href={`/read/${manga.id}/${chapterKey}`}
              className="flex justify-between items-center p-4 hover:bg-purple-900/20 rounded-lg transition border-b border-gray-800 last:border-0 group"
            >
              <span className="font-medium group-hover:text-cyan-400 transition">{chapterKey.replace('_', ' ')}</span>
              <span className="text-xs text-gray-500">Today</span>
            </Link>
          ))}
        </div>

        {/* Recommendations */}
        <h3 className="text-2xl font-bold mt-12 mb-4 border-l-4 border-purple-600 pl-4">You May Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {allManga.filter(m => m.id !== manga.id).map(rec => (
            <Card key={rec.id} manga={rec} />
          ))}
        </div>

      </div>
    </>
  );
              }
