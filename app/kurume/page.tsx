import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "久留米市の夜のお店ガイド｜キャバクラ・スナック・ガールズバー一覧",
  description:
    "久留米市の夜のお店をジャンル・エリア別に紹介。キャバクラ、スナック、ガールズバーなどの店舗情報を正確性重視で掲載しています。",
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs text-slate-700 backdrop-blur">
      {children}
    </span>
  );
}

function Card({
  title,
  desc,
  href,
  badge,
}: {
  title: string;
  desc: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-950">
            {title}
          </h3>
          {badge ? (
            <div className="mt-2">
              <Pill>{badge}</Pill>
            </div>
          ) : null}
        </div>
        <span className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600">
          一覧へ
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
      <div className="mt-4 text-sm font-medium text-slate-900">
        みる{" "}
        <span className="ml-1 inline-block transition group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  );
}

export default function KurumeTopPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>久留米市 全域</Pill>
            <Pill>正確性重視</Pill>
            <Pill>ジャンル・エリアで検索</Pill>
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            久留米市の夜のお店ガイド
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            久留米市のキャバクラ・スナック・ガールズバーなどを、ジャンルやエリア別に探せる地域特化型ガイドです。
            口コミの転載は行わず、営業時間・料金目安・住所などの基本情報を中心に掲載し、随時更新します。
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/kurume/cabaret"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              ジャンル一覧へ
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              初心者ガイドを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Genre cards */}
      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            ジャンルから探す
          </h2>
          <p className="hidden text-sm text-slate-600 sm:block">
            まずはジャンルを選ぶのが最短です
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title="キャバクラ一覧"
            badge="接待・会食にも"
            desc="久留米市内のキャバクラを一覧で掲載。料金目安や営業時間などの基本情報を確認できます。"
            href="/kurume/cabaret"
          />
          <Card
            title="スナック一覧"
            badge="落ち着いて飲みたい"
            desc="スナックを一覧で紹介。雰囲気や利用しやすさの目安になる情報を整理しています。"
            href="/kurume/snack"
          />
          <Card
            title="ガールズバー一覧"
            badge="カジュアルに"
            desc="ガールズバーを一覧で掲載。エリアごとに探しやすいよう、情報を整備していきます。"
            href="/kurume/girlsbar"
          />
        </div>
      </section>

      {/* Area guide */}
      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          久留米市の主な夜エリア
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              西鉄久留米駅周辺
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              駅周辺は飲食店も多く、仕事帰りや二次会利用にも便利なエリアです。まずはジャンル一覧から探すのがおすすめです。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>アクセス重視</Pill>
              <Pill>二次会</Pill>
              <Pill>待ち合わせ</Pill>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              文化街エリア
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              久留米市内でも夜のお店が集まりやすいエリアの一つ。複数ジャンルの店舗があるため、目的に合わせた探し方が有効です。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>店舗密度</Pill>
              <Pill>比較しやすい</Pill>
              <Pill>ジャンル多様</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* Use-cases */}
      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          利用シーン別の探し方
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "接待・会食", d: "静かな雰囲気・料金の明確さを重視" },
            { t: "落ち着いて飲む", d: "スナック・小規模店から検討" },
            { t: "団体利用", d: "席数・時間帯・予約可否を確認" },
            { t: "初心者", d: "駅近・料金目安がある店舗から" },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Policy */}
      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            当サイトについて（運営方針）
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            <li>
              ・口コミ本文の転載は行いません（Googleマップ等へリンクします）。
            </li>
            <li>
              ・営業時間・料金目安・住所などの基本情報を中心に、正確性を重視して掲載します。
            </li>
            <li>・PR枠を設ける場合は、PR表記を明確にします。</li>
          </ul>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kurume/cabaret"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              探し始める
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              ガイドを見る
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            ※掲載情報の修正依頼導線は、管理画面・運営ページ実装のタイミングで追加します。
          </p>
        </div>
      </section>
    </main>
  );
}
