// lib/data.js

export async function getAllManga() {
  const res = await fetch("/data/index.json", {
    cache: "no-store"
  });

  if (!res.ok) return [];
  return await res.json();
}

export async function getMangaBySlug(slug) {
  const mangas = await getAllManga();
  return mangas.find(m => m.id === slug) || null;
}
