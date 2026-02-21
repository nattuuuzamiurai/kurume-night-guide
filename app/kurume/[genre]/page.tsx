import { notFound } from "next/navigation";
import Link from "next/link";
import { getStoresByGenre } from "@/lib/stores/getStoresByGenre";

export const runtime = "nodejs";

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
