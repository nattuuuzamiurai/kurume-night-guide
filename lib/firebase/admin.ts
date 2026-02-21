import "server-only";

import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = "kurume-night-guide"; // ←まずは直書きでOK（あとでenvに戻せる）

const app = getApps().length
  ? getApps()[0]!
  : initializeApp({
      projectId,
      credential: applicationDefault(),
    });

export const adminDb = getFirestore(app);
