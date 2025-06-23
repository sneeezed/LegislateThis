import admin from 'firebase-admin';

// Avoid re-initializing
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // or, if you prefer explicit JSON:
    // credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export const adminDb = admin.firestore();
