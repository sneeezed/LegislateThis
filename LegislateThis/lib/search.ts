// lib/articles.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/contexts/firebase";

export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  status?: string;
  publishedAt: Date;
  featured?: boolean;
  tags: string[];
}

/**
 * Fetches all docs from "articles" and filters them
 * by title, summary, category or tags (case-insensitive).
 */
export async function searchArticles(query: string): Promise<SearchResult[]> {
  const snap = await getDocs(collection(db, "articles"));
  const all: SearchResult[] = snap.docs.map((doc) => {
    const data = doc.data() as any;
    return {
      id: doc.id,
      slug: doc.id,
      title: data.title || "",
      summary: data.summary || "",
      category: data.category || "",
      status: data.status,
      publishedAt:
        data.publishedAt && typeof data.publishedAt.toDate === "function"
          ? data.publishedAt.toDate()
          : new Date(data.publishedAt),
      featured: data.featured,
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  });

  if (!query) return all;

  const q = query.toLowerCase();
  return all.filter(
    (r) =>
      (r.title && r.title.toLowerCase().includes(q)) ||
      (r.summary && r.summary.toLowerCase().includes(q)) ||
      (r.category && r.category.toLowerCase().includes(q)) ||
      (r.tags && r.tags.some((tag) => tag && tag.toLowerCase().includes(q)))
  );
}
