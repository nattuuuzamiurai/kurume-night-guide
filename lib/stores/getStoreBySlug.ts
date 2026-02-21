import { adminDb } from "@/lib/firebase/admin";

export async function getStoreBySlug(slug: string) {
  const snap = await adminDb
    .collection("stores")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snap.empty) return null;
  return snap.docs[0]!.data();
}
