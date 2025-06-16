// lib/articles.ts
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/contexts/firebase"  // adjust path if you placed firebase.js elsewhere

export interface Article {
  id: string
  slug: string
  title: string
  body: string
  tags: string[]
  publishedAt: Date
  status?: string;

}

/**
 * Fetch a single article by its slug (document ID) from Firestore.
 */
export async function fetchArticleBySlug(
  slug: string
): Promise<Article | null> {
  const ref = doc(db, "articles", slug)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null

  const data = snap.data()
  return {
    id: snap.id,
    slug: snap.id,
    title: data.title,
    body: data.body,
    tags: data.tags || [],
    publishedAt: data.publishedAt.toDate(),
    status: data.status

  }
}

/**
 * Keep your existing date‐formatting util here
 */
export function formatPublishDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}