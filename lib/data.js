// lib/data.js

export async function getAllManga() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/data/index.json`, {
    cache: "no-store"
  });

  if (!res.ok) return [];
  return res.json();
}

export async function getMangaBySlug(slug) {
  const mangas = await getAllManga();
  return mangas.find(m => m.id === slug) || null;
}
