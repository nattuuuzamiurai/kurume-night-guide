import "server-only";
import { adminDb } from "@/lib/firebase/admin";

export type Store = {
  name: string;
  slug: string;
  genre: string;
  areaLabel: string;
  address: string;
  hoursText: string;
  priceText: string;
  paymentText: string;
  lastConfirmedAt: string;
  isPR: boolean;
  prRank: number;
};

export async function getStoresByGenre(genre: string) {
  if (!genre) return [];

  const snap = await adminDb
    .collection("stores")
    .where("genre", "==", genre)
    .get();

  return snap.docs.map((d) => d.data() as Store);
}
