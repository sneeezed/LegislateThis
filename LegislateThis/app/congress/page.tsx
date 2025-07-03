import { Metadata } from "next"
import CongressClientPage from "./ClientPage"

// SEO Metadata
export const metadata: Metadata = {
  title: "Find Your Representatives | Congress Members Directory",
  description: "Search and explore all members of Congress. Find your representatives, view their voting records, and understand their legislative priorities. Get to know who represents you in Washington.",
  keywords: [
    "find your representatives",
    "congress members",
    "who is my representative",
    "congressional directory",
    "voting records",
    "legislative priorities",
    "congress search",
    "representative lookup",
    "financial integrity",
  ],
  openGraph: {
    title: "Find Your Representatives | Congress Members Directory",
    description: "Search and explore all members of Congress. Find your representatives, view their voting records, and understand their legislative priorities.",
    url: "https://legislatethis.org/congress",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Representatives | Congress Members Directory",
    description: "Search and explore all members of Congress. Find your representatives, view their voting records, and understand their legislative priorities.",
  },
  alternates: {
    canonical: "/congress",
  },
}

export default function CongressPage() {
  return <CongressClientPage />
} 