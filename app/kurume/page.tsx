import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "久留米ナイトガイド｜久留米市の夜のお店をジャンル・エリアで探す",
  description:
    "久留米市の夜のお店を、ジャンル・エリア別に探せる地域特化ガイド。店舗情報は正確性重視で更新します。",
};

export default function KurumeTopPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>久留米ナイトガイド</h1>
      <p>久留米市の夜のお店を、ジャンル・エリアで探せるガイド（ダミー表示）</p>

      <section style={{ marginTop: 24 }}>
        <h2>ジャンルから探す</h2>
        <ul>
          <li>
            <Link href="/kurume/cabaret">キャバクラ</Link>
          </li>
          <li>
            <Link href="/kurume/snack">スナック</Link>
          </li>
          <li>
            <Link href="/kurume/girlsbar">ガールズバー</Link>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>エリアから探す（後で追加）</h2>
        <p>例：西鉄久留米 / 文化街 など</p>
      </section>
    </main>
  );
}
