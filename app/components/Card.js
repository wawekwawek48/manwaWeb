import Link from 'next/link';

export default function Card({ manga }) {
  return (
    <Link href={`/detail/${manga.id}`} className="block group">
      <div className="bg-[#161616] rounded-xl overflow-hidden relative transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(123,44,191,0.4)]">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={manga.banner || manga.image?.chapter_1?.[0]} /* Fallback image */ 
            alt={manga.title} 
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-yellow-400 font-bold backdrop-blur-sm">
            ⭐ {manga.rating}
          </div>
          <div className="absolute top-2 right-2 bg-cyan-400 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase">
            {manga.type}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate mb-1">{manga.title}</h3>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{Object.keys(manga.image || {}).length} Chapters</span>
            <span>{manga.status}</span>
          </div>
        </div>
      </div>
    </Link>
  );
  }
