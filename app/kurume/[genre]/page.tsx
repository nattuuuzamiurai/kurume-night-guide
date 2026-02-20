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

type Store = {
  name: string;
  slug: string;
  areaLabel?: string;
  priceText?: string;
  lastConfirmedAt?: string;
  isPR: boolean;
};

const DUMMY_STORES: Store[] = [
  {
    name: "店A",
    slug: "store-a",
    areaLabel: "文化街",
    priceText: "目安 5,000円〜",
    lastConfirmedAt: "2026-02-21",
    isPR: true,
  },
  {
    name: "店B",
    slug: "store-b",
    areaLabel: "西鉄久留米周辺",
    priceText: "目安 4,000円〜",
    lastConfirmedAt: "2026-02-21",
    isPR: false,
  },
  {
    name: "店C",
    slug: "store-c",
    areaLabel: "その他",
    priceText: "目安 3,000円〜",
    lastConfirmedAt: "2026-02-21",
    isPR: false,
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs text-slate-700 backdrop-blur">
      {children}
    </span>
  );
}

function PRBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
      PR
    </span>
  );
}

function StoreCard({ genre, store }: { genre: string; store: Store }) {
  return (
    <Link
      href={`/kurume/${genre}/${store.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900 group-hover:text-slate-950">
              {store.name}
            </h3>
            {store.isPR ? <PRBadge /> : null}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {store.areaLabel ? <Pill>{store.areaLabel}</Pill> : null}
            {store.priceText ? <Pill>{store.priceText}</Pill> : null}
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600">
          詳細
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>最終確認日：{store.lastConfirmedAt ?? "—"}</span>
        <span className="font-medium text-slate-900">
          みる{" "}
          <span className="ml-1 inline-block transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function GenreListPage({ params }: Props) {
  const { genre } = params;
  const label = GENRE_LABEL[genre] ?? genre;

  const pr = DUMMY_STORES.filter((s) => s.isPR);
  const normal = DUMMY_STORES.filter((s) => !s.isPR);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-5xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-600">久留米市の夜のお店</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {label} 一覧
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
              {label}
              を一覧で掲載しています。店舗情報は正確性重視で更新し、最終確認日を表示します。
              PR枠がある場合は明確にPR表記します。
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/kurume"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              トップへ
            </Link>
          </div>
        </div>

        {/* PR section */}
        {pr.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">PR</h2>
              <p className="text-xs text-slate-500">※PR枠はPR表記を行います</p>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pr.map((s) => (
                <StoreCard key={s.slug} genre={genre} store={s} />
              ))}
            </div>
          </section>
        )}

        {/* Normal list */}
        <section className="mt-10">
          <h2 className="text-base font-semibold text-slate-900">店舗一覧</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {normal.map((s) => (
              <StoreCard key={s.slug} genre={genre} store={s} />
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
          <p className="font-semibold text-slate-900">次にできること</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              エリア別ページ（/kurume/area/…）を追加して絞り込み導線を作る
            </li>
            <li>Firestore接続でダミー店舗を実データに置き換える</li>
            <li>管理画面から「最終確認日」を更新できるようにする</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
