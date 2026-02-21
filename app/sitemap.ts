import "server-only";

import type { MetadataRoute } from "next";
import { adminDb } from "@/lib/firebase/admin";

type StoreForSitemap = {
  slug: string;
  genre: string;
  lastConfirmedAt?: string; // "2026-02-21" など
  isPublished?: boolean;
  isPR?: boolean;
};

function toDateOrUndefined(v?: string) {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawSiteUrl = process.env.SITE_URL;
  if (!rawSiteUrl) {
    throw new Error(
      "SITE_URL is missing (set it in .env.local / apphosting.yaml)",
    );
  }
  const siteUrl = rawSiteUrl.replace(/\/+$/, "");

  const ref = adminDb.collection("stores");

  // ✅ 公開中だけ sitemap に含める
  // ※ まだ isPublished を入れてない場合は、ここを外すか、全件取得に戻してください
  const snap = await ref.where("isPublished", "==", true).get();

  const stores = snap.docs
    .map((d) => d.data() as Partial<StoreForSitemap>)
    .filter((s): s is StoreForSitemap => !!s.slug && !!s.genre);

  // ✅ ジャンル一覧（公開中の店から抽出）
  const genres = Array.from(new Set(stores.map((s) => s.genre)));

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/kurume` },
    { url: `${siteUrl}/guide` },
  ];

  const genreUrls: MetadataRoute.Sitemap = genres.map((g) => ({
    url: `${siteUrl}/kurume/${g}`,
  }));

  // ✅ PR を sitemap に含めたくないなら true にする（通常は含めてOK）
  const EXCLUDE_PR_FROM_SITEMAP = false;

  const storeUrls: MetadataRoute.Sitemap = stores
    .filter((s) => (EXCLUDE_PR_FROM_SITEMAP ? s.isPR !== true : true))
    .map((s) => {
      const lastModified = toDateOrUndefined(s.lastConfirmedAt);
      return {
        url: `${siteUrl}/kurume/${s.genre}/${s.slug}`,
        ...(lastModified ? { lastModified } : {}), // ✅ lastConfirmedAt が無い/壊れてる時は出さない
      };
    });

  return [...staticUrls, ...genreUrls, ...storeUrls];
}
