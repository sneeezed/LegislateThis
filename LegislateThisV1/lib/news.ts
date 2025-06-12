// Mock news data structure
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

// Mock function to simulate Firestore news fetching
export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock news articles data - in real app this would come from Firestore
  const mockArticles: NewsArticle[] = [
    {
      id: "1",
      slug: "infrastructure-bill-passes-committee",
      title: "Infrastructure Bill Passes Committee Review",
      summary:
        "The comprehensive infrastructure investment bill has successfully passed through committee review and is now heading to the floor for debate. The bill includes provisions for road improvements, broadband expansion, and green energy initiatives.",
      category: "Policy Update",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      featured: true,
    },
    {
      id: "2",
      slug: "healthcare-reform-debate-begins",
      title: "Healthcare Reform Debate",
      summary: "Senate begins discussions on proposed healthcare reforms.",
      category: "Healthcare",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
    {
      id: "3",
      slug: "education-funding-bill",
      title: "Education Funding Bill",
      summary: "New education funding proposal aims to increase teacher salaries.",
      category: "Education",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    },
    {
      id: "4",
      slug: "environmental-protection-act",
      title: "Environmental Protection Act",
      summary: "Stricter environmental regulations proposed for industrial sectors.",
      category: "Environment",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    },
  ]

  return mockArticles
}

// Mock function to simulate legislative events fetching
export async function fetchLegislativeEvents(): Promise<LegislativeEvent[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const mockEvents: LegislativeEvent[] = [
    {
      id: "1",
      title: "Senate Floor Debate",
      description: "Infrastructure Investment Bill",
      date: "Tomorrow",
      type: "debate",
    },
    {
      id: "2",
      title: "Committee Hearing",
      description: "Healthcare Reform Proposals",
      date: "This Week",
      type: "hearing",
    },
    {
      id: "3",
      title: "Public Forum",
      description: "Education Policy Discussion",
      date: "Next Week",
      type: "forum",
    },
  ]

  return mockEvents
}

// Utility function to format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

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
