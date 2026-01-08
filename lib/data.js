import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export function getAllManga() {
  // Baca semua nama file di folder data
  const fileNames = fs.readdirSync(dataDirectory);
  const allMangaData = fileNames.map(fileName => {
    // Baca isi file JSON
    const fullPath = path.join(dataDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  });
  
  return allMangaData;
}

export function getMangaBySlug(slug) {
  // Mencari file yang sesuai dengan slug (nama file json harus unik atau kita cocokan ID)
  // Untuk simplifikasi, kita loop dan cocokan ID
  const allManga = getAllManga();
  return allManga.find(manga => manga.id === slug);
}
