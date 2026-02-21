import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoreBySlug } from "@/lib/stores/getStoreBySlug";

export const runtime = "nodejs";

function getSiteUrl() {
  const v =
    process.env.SITE_URL ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : undefined);

  if (!v) throw new Error("SITE_URL is missing in production environment");
  return v.replace(/\/+$/, ""); // 末尾スラッシュ削除
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string; storeSlug: string }>;
}): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const { genre, storeSlug } = await params;

  const store = await getStoreBySlug(storeSlug);

  if (!store || store.genre !== genre) {
    return {
      title: "店舗が見つかりません | 久留米ナイトガイド",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${siteUrl}/kurume/${store.genre}/${store.slug}`;
  const title = `${store.name}（${store.areaLabel}） | 久留米ナイトガイド`;
  const description = [
    `${store.name}の店舗情報（久留米 / ${store.genre}）`,
    store.areaLabel ? `エリア：${store.areaLabel}` : null,
    store.hoursText ? `営業時間：${store.hoursText}` : null,
    store.priceText ? `料金目安：${store.priceText}` : null,
    store.paymentText ? `支払い：${store.paymentText}` : null,
    store.lastConfirmedAt ? `最終確認：${store.lastConfirmedAt}` : null,
    store.isPR ? "※PR掲載" : null,
  ]
    .filter(Boolean)
    .join(" / ");

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ genre: string; storeSlug: string }>;
}) {
  const { genre, storeSlug } = await params;

  if (!genre || !storeSlug) return notFound();

  const store = await getStoreBySlug(storeSlug);
  if (!store) return notFound();

  // URLのgenreとDBのgenre不一致は404（事故防止）
  if (store.genre !== genre) return notFound();

  return (
    <main className="mx-auto max-w-3xl p-4 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{store.name}</h1>
        {store.isPR && <div className="text-xs text-gray-500">PR表記</div>}
        <div className="text-sm text-gray-600">{store.areaLabel}</div>
      </header>

      <section className="rounded-lg border p-4 space-y-2">
        <div>
          <span className="font-semibold">住所：</span>
          {store.address}
        </div>
        <div>
          <span className="font-semibold">営業時間：</span>
          {store.hoursText}
        </div>
        <div>
          <span className="font-semibold">料金：</span>
          {store.priceText}
        </div>
        <div>
          <span className="font-semibold">支払い：</span>
          {store.paymentText}
        </div>
        <div className="text-xs text-gray-500">
          最終確認日：{store.lastConfirmedAt}
        </div>
      </section>
    </main>
  );
}
