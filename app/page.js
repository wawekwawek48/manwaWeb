import Link from 'next/link';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { getAllManga } from '@/lib/data'; // Pastikan konfigurasi path alias '@' di next.config.js atau pakai relative path '../lib/data'

export default function Home() {
  const mangas = getAllManga();

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[80vh] relative mt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
        {mangas.length > 0 && (
          <img 
            src={mangas[0].banner} 
            alt="Hero Banner" 
            className="w-full h-full object-cover brightness-50"
          />
        )}
        <div className="absolute bottom-10 left-5 md:left-20 z-20 max-w-xl">
          <span className="bg-purple-700 px-3 py-1 rounded text-sm font-bold mb-2 inline-block">TRENDING #1</span>
          <h1 className="text-5xl md:text-7xl font-['Teko'] leading-none mb-4 uppercase">
            {mangas.length > 0 ? mangas[0].title : "Loading..."}
          </h1>
          <p className="text-gray-300 mb-6 line-clamp-2">
            {mangas.length > 0 ? mangas[0].desc : ""}
          </p>
          <Link href={`/detail/${mangas.length > 0 ? mangas[0].id : '#'}`} className="bg-gradient-to-r from-purple-600 to-cyan-400 px-8 py-3 rounded-full font-bold hover:scale-105 transition inline-block shadow-lg shadow-purple-900/50">
            BACA SEKARANG
          </Link>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-['Teko'] border-l-4 border-cyan-400 pl-4 mb-8 flex justify-between items-end">
          <span>LATEST UPDATES <span className="text-cyan-400 text-xl">✨</span></span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {mangas.map((manga) => (
            <Card key={manga.id} manga={manga} />
          ))}
        </div>
      </section>
    </>
  );
}
