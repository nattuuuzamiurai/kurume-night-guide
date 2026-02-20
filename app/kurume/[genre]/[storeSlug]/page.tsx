import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { genre: string; storeSlug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  // 今はダミー。後でFirestoreの店舗名を使う
  return {
    title: `店舗情報：${params.storeSlug}｜久留米ナイトガイド`,
    description:
      "久留米市の店舗情報ページ。営業時間・料金目安・住所など、正確性重視で掲載します。",
  };
}

export default function StoreDetailPage({ params }: Props) {
  const { genre, storeSlug } = params;

  const store = {
    name: `店舗（${storeSlug}）`,
    address: "福岡県久留米市〇〇",
    hoursText: "20:00-01:00",
    priceText: "目安：5,000円〜",
    lastConfirmedAt: "2026-02-21",
    googleMapsUrl: "https://www.google.com/maps",
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>{store.name}</h1>
      <p>ジャンル：{genre}</p>

      <section style={{ marginTop: 16 }}>
        <h2>基本情報</h2>
        <ul>
          <li>住所：{store.address}</li>
          <li>営業時間：{store.hoursText}</li>
          <li>料金：{store.priceText}</li>
          <li>最終確認日：{store.lastConfirmedAt}</li>
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>口コミ（Googleで確認）</h2>
        <p>
          口コミ本文は転載せず、Googleマップで確認してもらう方針です。
          <br />
          <a href={store.googleMapsUrl} target="_blank" rel="noreferrer">
            Googleで口コミを見る
          </a>
        </p>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href={`/kurume/${genre}`}>← 一覧へ</Link>
      </p>
    </main>
  );
}
