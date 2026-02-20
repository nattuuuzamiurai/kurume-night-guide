import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "久留米ナイトガイド",
  description: "久留米市の夜のお店をジャンル・エリア別に探せる地域特化ガイド",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 antialiased`}
      >
        {/* ===== Header ===== */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link
              href="/kurume"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              久留米ナイトガイド
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
              <Link href="/kurume/cabaret" className="hover:text-slate-900">
                キャバクラ
              </Link>
              <Link href="/kurume/snack" className="hover:text-slate-900">
                スナック
              </Link>
              <Link href="/kurume/girlsbar" className="hover:text-slate-900">
                ガールズバー
              </Link>
              <Link href="/guide" className="hover:text-slate-900">
                ガイド
              </Link>
            </nav>
          </div>

          {/* Mobile Nav (横スクロール) */}
          <div className="border-t border-slate-100 bg-white md:hidden">
            <div className="flex gap-6 overflow-x-auto px-4 py-3 text-sm font-medium text-slate-700">
              <Link href="/kurume/cabaret">キャバクラ</Link>
              <Link href="/kurume/snack">スナック</Link>
              <Link href="/kurume/girlsbar">ガールズバー</Link>
              <Link href="/guide">ガイド</Link>
            </div>
          </div>
        </header>

        {/* ===== Main ===== */}
        <div className="min-h-screen">{children}</div>

        {/* ===== Footer ===== */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-500 sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} 久留米ナイトガイド</p>
            <p className="mt-2">
              当サイトは久留米市の夜のお店情報を整理・掲載する地域特化型ガイドです。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
