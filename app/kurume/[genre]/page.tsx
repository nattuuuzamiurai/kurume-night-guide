import { notFound } from "next/navigation";
import Link from "next/link";
import { getStoresByGenre } from "@/lib/stores/getStoresByGenre";
import type { Metadata } from "next";

export const runtime = "nodejs";

function getSiteUrl() {
  const v =
    process.env.SITE_URL ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : undefined);
  if (!v) throw new Error("SITE_URL is missing in production environment");
  return v.replace(/\/+$/, "");
}

const GENRE_LABEL: Record<string, string> = {
  cabaret: "キャバクラ",
  snack: "スナック",
  girlsbar: "ガールズバー",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string }>;
}): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const { genre } = await params;
  if (!genre) return { robots: { index: false, follow: false } };

  const label = GENRE_LABEL[genre] ?? genre;

  const title = `久留米の${label}一覧 | 久留米ナイトガイド`;
  const description = `久留米の${label}の店舗情報一覧。営業時間・料金目安・支払い方法など、確認済みの基本情報を掲載。`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/kurume/${genre}`,
    },
  };
}

export default async function GenrePage({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  if (!genre) return notFound();

  const stores = await getStoresByGenre(genre);

  return (
    <main className="mx-auto max-w-3xl p-4 space-y-4">
      <h1 className="text-2xl font-bold">{genre}</h1>

      <ul className="space-y-2">
        {stores.map((s) => (
          <li key={s.slug} className="border rounded p-3">
            <Link
              href={`/kurume/${s.genre}/${s.slug}`}
              className="font-semibold underline"
            >
              {s.name}
            </Link>
            <div className="text-sm text-gray-600">{s.areaLabel}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
