import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { genre: string; storeSlug: string };
};

const GENRE_LABEL: Record<string, string> = {
  cabaret: "キャバクラ",
  snack: "スナック",
  girlsbar: "ガールズバー",
};

export function generateMetadata({ params }: Props): Metadata {
  const label = GENRE_LABEL[params.genre] ?? params.genre;
  return {
    title: `店舗情報：${params.storeSlug}｜久留米ナイトガイド`,
    description: `久留米市の${label}の店舗情報ページ。営業時間・料金目安・住所など、正確性重視で掲載します。`,
  };
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs text-slate-700 backdrop-blur">
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 sm:flex-row sm:items-start sm:gap-6">
      <div className="w-full text-xs font-semibold text-slate-600 sm:w-40">
        {label}
      </div>
      <div className="w-full text-sm leading-6 text-slate-900">{value}</div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function StoreDetailPage({ params }: Props) {
  const { genre, storeSlug } = params;
  const genreLabel = GENRE_LABEL[genre] ?? genre;

  // 今はダミー。後でFirestoreから取得して差し替える
  const store = {
    name: `店舗（${storeSlug}）`,
    areaLabel: "文化街",
    address: "福岡県久留米市〇〇",
    hoursText: "20:00-01:00",
    priceText: "目安：5,000円〜",
    paymentText: "現金 / クレジット（要確認）",
    features: ["初心者向け", "団体OK", "駅近"],
    lastConfirmedAt: "2026-02-21",
    officialLinks: {
      instagram: "",
      website: "",
    },
    googleMapsUrl: "https://www.google.com/maps",
    notes:
      "掲載情報は基本情報を中心に整理しています。最新の詳細は公式情報もあわせてご確認ください。",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        {/* Breadcrumb / back */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            <Link className="hover:underline" href="/kurume">
              久留米
            </Link>{" "}
            <span className="mx-1">/</span>
            <Link className="hover:underline" href={`/kurume/${genre}`}>
              {genreLabel}
            </Link>{" "}
            <span className="mx-1">/</span>
            <span className="text-slate-900">{store.name}</span>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/kurume/${genre}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              ← 一覧へ
            </Link>
          </div>
        </div>

        {/* Hero card */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-slate-600">久留米市の{genreLabel}</p>
              <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {store.name}
              </h1>

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>{store.areaLabel}</Pill>
                <Pill>{store.priceText}</Pill>
                <Pill>最終確認日：{store.lastConfirmedAt}</Pill>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
                住所・営業時間・料金目安などの基本情報を掲載しています。口コミ本文の転載は行わず、
                口コミはGoogleマップ等で確認する方針です。
              </p>
            </div>

            {/* CTAs */}
            <div className="flex w-full flex-col gap-3 lg:w-72">
              <a
                href={store.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Googleマップで見る
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={store.officialLinks.instagram || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!store.officialLinks.instagram}
                  className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 ${
                    !store.officialLinks.instagram
                      ? "pointer-events-none opacity-40"
                      : ""
                  }`}
                >
                  Instagram
                </a>
                <a
                  href={store.officialLinks.website || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!store.officialLinks.website}
                  className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 ${
                    !store.officialLinks.website
                      ? "pointer-events-none opacity-40"
                      : ""
                  }`}
                >
                  公式サイト
                </a>
              </div>

              <p className="text-xs leading-5 text-slate-500">
                ※リンクが未設定の場合は順次追加します。
              </p>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Left: details */}
          <div className="space-y-4 lg:col-span-2">
            <SectionCard title="基本情報">
              <div className="divide-y divide-slate-100">
                <InfoRow label="住所" value={store.address} />
                <InfoRow label="営業時間" value={store.hoursText} />
                <InfoRow label="料金目安" value={store.priceText} />
                <InfoRow label="支払い" value={store.paymentText} />
              </div>
            </SectionCard>

            <SectionCard title="特徴">
              <div className="flex flex-wrap gap-2">
                {store.features.map((f) => (
                  <Pill key={f}>{f}</Pill>
                ))}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                ※特徴は口コミではなく、店舗情報の整理として掲載しています。
              </p>
            </SectionCard>

            <SectionCard title="口コミについて">
              <p className="text-sm leading-7 text-slate-700">
                口コミ本文は転載しません。口コミはGoogleマップでご確認ください。
              </p>
              <div className="mt-4">
                <a
                  href={store.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Googleで口コミを見る →
                </a>
              </div>
            </SectionCard>
          </div>

          {/* Right: sticky-ish sidebar */}
          <div className="space-y-4">
            <SectionCard title="最終確認日">
              <p className="text-sm text-slate-700">{store.lastConfirmedAt}</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                情報の正確性を保つため、定期的に確認しています。
              </p>
            </SectionCard>

            <SectionCard title="掲載方針">
              <ul className="space-y-2 text-sm leading-7 text-slate-600">
                <li>・基本情報を中心に掲載</li>
                <li>・口コミ本文は転載しない</li>
                <li>・修正依頼導線は順次整備</li>
              </ul>
            </SectionCard>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">メモ</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {store.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/kurume/${genre}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            ← {genreLabel}一覧に戻る
          </Link>

          <Link
            href="/kurume"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            他ジャンルも探す
          </Link>
        </div>
      </section>
    </main>
  );
}
