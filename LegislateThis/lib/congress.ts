import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/contexts/firebase"

export interface Representative {
  id: string
  name: string
  party: "Democratic" | "Republican" | "Independent"
  state: string
  district: string
  chamber: "House" | "Senate"
  score: number
  imageUrl: string
}

export type SortOption = "score-high" | "score-low" | "name" | "state" | "years"

/**
 * Fetch all congressional overviews from the articles collection where isCongress is true.
 * Transforms the data to match the Representative interface for the congress page.
 */
export async function fetchCongressMembers(): Promise<Representative[]> {
  const q = query(
    collection(db, "articles"),
    where("isCongress", "==", true)
  )
  const snap = await getDocs(q)

  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.title || data.name || "",
      party: data.party || "Unknown",
      state: data.state || "",
      district: data.district || "",
      chamber: data.chamber || "House",
      score: data.score || 0,
      imageUrl: data.imageUrl || data.coverImage || "/api/placeholder/200/200"
    }
  })
}

/**
 * Fetch a single congressional overview by slug for the article page.
 */
export async function fetchCongressMemberBySlug(slug: string): Promise<any | null> {
  const { fetchArticleBySlug } = await import("./articles")
  return fetchArticleBySlug(slug)
} 