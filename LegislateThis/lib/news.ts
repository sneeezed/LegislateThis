import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/contexts/firebase"  // adjust path if needed

export interface NewsArticle {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  publishedAt: Date
  featured?: boolean
  tags: string[]
  status?: string;
  isCongress: boolean;
}

/**
 * Fetch all articles for the news listing, excluding congressional overviews.
 * Only fetches articles where isCongress is false or undefined.
 */
export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  const q = query(
    collection(db, "articles"),
    orderBy("publishedAt", "desc")
  )
  const snap = await getDocs(q)

  return snap.docs
    .map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        slug: doc.id,
        title: data.title,
        summary: data.summary,
        category: data.category,
        publishedAt: data.publishedAt.toDate(),
        featured: !!data.featured,
        tags: data.tags,
        status: data.status,
        isCongress: data.isCongress || false
      }
    })
    .filter(article => !article.isCongress) // Filter out congressional articles on client side
}

/**
 * Keep your existing relative‐time util here
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  )

  if (diffInHours < 1) {
    return "Just now"
  } else if (diffInHours === 1) {
    return "1 hour ago"
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`
  }
}
