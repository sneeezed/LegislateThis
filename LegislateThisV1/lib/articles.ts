// Mock article data structure
export interface Article {
  id: string
  slug: string
  title: string
  body: string
  tags: string[]
  publishedAt: Date
}

// Mock function to simulate Firestore article fetching
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock articles data - in real app this would come from Firestore
  const mockArticles: Article[] = [
    {
      id: "1",
      slug: "infrastructure-bill-passes-committee",
      title: "Infrastructure Bill Passes Committee Review",
      body: `The comprehensive infrastructure investment bill has successfully passed through committee review and is now heading to the floor for debate. This landmark legislation represents one of the most significant investments in American infrastructure in decades.

The bill includes provisions for road improvements, broadband expansion, and green energy initiatives. Key components include $150 billion for road and bridge repairs, $65 billion for broadband infrastructure, and $73 billion for clean energy grid modernization.

Committee members from both parties expressed cautious optimism about the bill's prospects. "This legislation addresses critical infrastructure needs that have been neglected for too long," said Committee Chair Representative Johnson.

The bill now moves to the House floor where it will face a full vote. If passed, it will then proceed to the Senate for consideration. Supporters are hopeful that the bipartisan nature of infrastructure investment will help the bill gain the necessary support for passage.

Economic analysts predict that the infrastructure investments could create millions of jobs over the next decade while also improving the country's competitive position in the global economy. The bill includes provisions for Buy American requirements and prevailing wage standards.

Environmental groups have praised the clean energy components of the bill, while some fiscal conservatives have raised concerns about the overall cost and funding mechanisms. The debate is expected to continue as the bill moves through the legislative process.`,
      tags: ["Infrastructure", "Policy", "Economy"],
      publishedAt: new Date("2024-01-15T10:30:00Z"),
    },
    {
      id: "2",
      slug: "healthcare-reform-debate-begins",
      title: "Healthcare Reform Debate Begins in Senate",
      body: `The Senate has begun formal discussions on proposed healthcare reforms that could significantly impact millions of Americans. The comprehensive reform package addresses prescription drug costs, insurance coverage, and healthcare accessibility.

Key provisions include allowing Medicare to negotiate prescription drug prices, expanding subsidies for health insurance premiums, and investing in community health centers. The reforms aim to reduce healthcare costs while improving access to care.

Senator Williams, the bill's primary sponsor, emphasized the urgency of healthcare reform. "Too many Americans are forced to choose between their health and their financial security. This legislation provides a path forward."

The pharmaceutical industry has expressed concerns about the drug pricing provisions, arguing that they could stifle innovation. However, patient advocacy groups have strongly supported the measures, citing the need for affordable medications.

The debate is expected to continue for several weeks as senators review the complex legislation and consider amendments. Public hearings are scheduled to allow stakeholders and citizens to provide input on the proposed reforms.

Healthcare economists suggest that the reforms could save consumers billions of dollars annually while maintaining quality of care. The Congressional Budget Office is currently analyzing the fiscal impact of the proposed changes.`,
      tags: ["Healthcare", "Reform", "Senate"],
      publishedAt: new Date("2024-01-14T14:15:00Z"),
    },
  ]

  // Find article by slug
  const article = mockArticles.find((a) => a.slug === slug)
  return article || null
}

// Utility function to format date
export function formatPublishDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
