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
}

export interface LegislativeEvent {
  id: string
  title: string
  description: string
  date: string
  type: string
}

/**
 * Fetch all articles for the news listing, ordered newest first.
 */
export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  const q = query(
    collection(db, "articles"),
    orderBy("publishedAt", "desc")
  )
  const snap = await getDocs(q)

  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      slug: doc.id,
      title: data.title,
      summary: data.summary,
      category: data.category,
      publishedAt: data.publishedAt.toDate(),
      featured: !!data.featured,
    }
  })
}

/**
 * Fetch upcoming legislative events for the calendar.
 * Assumes a separate `legislativeEvents` collection in Firestore.
 */
export async function fetchLegislativeEvents(): Promise<LegislativeEvent[]> {
  const q = query(
    collection(db, "legislativeEvents"),
    orderBy("date", "asc")
  )
  const snap = await getDocs(q)

  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      date: data.date,
      type: data.type,
    }
  })
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
