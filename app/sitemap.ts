import type { MetadataRoute } from "next";

const BASE_URL = "kurume-night-guide--kurume-night-guide.us-east4.hosted.app";

const GENRES = ["cabaret", "snack", "girlsbar"] as const;

// ダミー：後でFirestoreから生成
const DUMMY_STORES = [
  { genre: "cabaret", slug: "store-a" },
  { genre: "cabaret", slug: "store-b" },
  { genre: "snack", slug: "store-c" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/kurume`, lastModified: now },
    { url: `${BASE_URL}/guide`, lastModified: now },
  ];

  const genrePages: MetadataRoute.Sitemap = GENRES.map((g) => ({
    url: `${BASE_URL}/kurume/${g}`,
    lastModified: now,
  }));

  const storePages: MetadataRoute.Sitemap = DUMMY_STORES.map((s) => ({
    url: `${BASE_URL}/kurume/${s.genre}/${s.slug}`,
    lastModified: now,
  }));

  return [...staticPages, ...genrePages, ...storePages];
}
