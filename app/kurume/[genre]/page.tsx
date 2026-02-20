import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { genre: string };
};

const GENRE_LABEL: Record<string, string> = {
  cabaret: "キャバクラ",
  snack: "スナック",
  girlsbar: "ガールズバー",
};

export function generateMetadata({ params }: Props): Metadata {
  const label = GENRE_LABEL[params.genre] ?? params.genre;
  return {
    title: `久留米市の${label}一覧｜久留米ナイトガイド`,
    description: `久留米市の${label}を一覧で紹介。店舗情報は正確性重視で更新します。`,
  };
}

const DUMMY_STORES = [
  { name: "店A", slug: "store-a", isPR: true },
  { name: "店B", slug: "store-b", isPR: false },
  { name: "店C", slug: "store-c", isPR: false },
];

export default function GenreListPage({ params }: Props) {
  const { genre } = params;

  const pr = DUMMY_STORES.filter((s) => s.isPR);
  const normal = DUMMY_STORES.filter((s) => !s.isPR);

  return (
    <main style={{ padding: 24 }}>
      <h1>ジャンル：{genre}</h1>
      <p>（ダミー）PR枠は先頭に表示し、[PR] 表記します。</p>

      {pr.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h2>PR</h2>
          <ul>
            {pr.map((s) => (
              <li key={s.slug}>
                <strong>[PR]</strong>{" "}
                <Link href={`/kurume/${genre}/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section style={{ marginTop: 24 }}>
        <h2>店舗一覧</h2>
        <ul>
          {normal.map((s) => (
            <li key={s.slug}>
              <Link href={`/kurume/${genre}/${s.slug}`}>{s.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/kurume">← トップへ</Link>
      </p>
    </main>
  );
}
