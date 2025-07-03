import { Navigation } from "@/components/navigation"
import { Metadata } from "next"

// SEO Metadata
export const metadata: Metadata = {
  title: "Legislative Process Guide | How Bills Become Laws",
  description: "Learn how bills become laws with our comprehensive legislative process guide. Understand the journey from proposal to implementation and find resources for civic engagement.",
  keywords: [
    "legislative process",
    "how bills become laws",
    "congressional process",
    "bill to law",
    "civic engagement",
    "legislative resources",
    "congressional procedure"
  ],
  openGraph: {
    title: "Legislative Process Guide | How Bills Become Laws",
    description: "Learn how bills become laws with our comprehensive legislative process guide. Understand the journey from proposal to implementation and find resources for civic engagement.",
    url: "https://legislatethis.org/information",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legislative Process Guide | How Bills Become Laws",
    description: "Learn how bills become laws with our comprehensive legislative process guide. Understand the journey from proposal to implementation and find resources for civic engagement.",
  },
  alternates: {
    canonical: "/information",
  },
}

export default function Information() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">Information</h1>
        </div>

        {/* Content */}
        <div className="border-t border-border">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {/* Legislative Process */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Legislative Process</h2>
              <p className="text-muted-foreground">
                Understanding how bills become laws and the journey from proposal to implementation.
              </p>
              <ul className="space-y-2 text-sm">
    <li>
      <a 
        href="https://www.congress.gov/legislative-process/introduction-and-referral-of-bills"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Bill Introduction
      </a>
    </li>
    <li>
      <a 
        href="https://www.congress.gov/legislative-process/committee-consideration"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Committee Review
      </a>
    </li>
    <li>
      <a 
        href="https://www.congress.gov/legislative-process/house-floor"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Floor Debate
      </a>
    </li>
    <li>
      <a 
        href="https://www.congress.gov/legislative-process/resolving-differences"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Voting Process
      </a>
    </li>
    <li>
      <a 
        href="https://www.congress.gov/legislative-process/presidential-action"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Presidential Action
      </a>
    </li>
  </ul>
            </div>

            {/* Current Legislation */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">How We Get Our Information</h2>
              <p className="text-muted-foreground">
              We do the research so you don't have to. Every article we publish is based on real legislation, official government sources, and trusted news outlets.
              </p>
              <p className="text-muted-foreground">
              We usually use Congress.gov for bill texts and summaries, GovTrack.us for tracking progress, the Congressional Research Service (CRS) for nonpartisan reports, and the Congressional Budget Office (CBO) for cost and budget analysis. We also reference trusted journalism outlets to provide context and real-world impact. 
            </p>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Resources</h2>
              <p className="text-muted-foreground">
                Tools and guides to help you engage with the legislative process effectively.
              </p>
              <ul className="space-y-2 text-sm">
    <li>
      <a 
        href="https://www.commoncause.org/find-your-representative/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Contact Your Representatives
      </a>
    </li>
    <li>
      <a 
        href="https://www.govtrack.us"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Bill Tracking Tools
      </a>
    </li>
    <li>
      <a 
        href="https://www.vote.org/voting-guides/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Voting Guides
      </a>
    </li>
    <li>
      <a 
        href="https://www.usa.gov/how-to-vote"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Civic Engagement Tips
      </a>
    </li>
    <li>
      <a 
        href="https://www.congress.gov/legislative-activity"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        • Legislative Calendar
      </a>
    </li>
  </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold mb-4">How to Use This Information</h2>
              <p className="text-muted-foreground">
                Our information section is designed to empower citizens with the knowledge they need to participate
                meaningfully in democracy. Whether you're tracking a specific bill, learning about the legislative
                process, or looking for ways to make your voice heard, we provide clear, accessible information to help
                you navigate the complex world of legislation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
