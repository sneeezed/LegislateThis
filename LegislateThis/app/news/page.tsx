// app/news/page.tsx
import { Metadata } from "next"
import NewsClientPage from "./ClientPage"

// SEO Metadata
export const metadata: Metadata = {
  title: "Legislative News & Bill Updates | Track Congress Bills",
  description: "Stay informed with the latest legislative news, bill updates, and congressional activity. Get clear explanations of complex legislation and track how bills progress through Congress.",
  keywords: [
    "legislative news",
    "bill updates", 
    "congress bills",
    "legislation tracking",
    "congressional activity",
    "bill progress",
    "legislative updates",
    "congress news"
  ],
  openGraph: {
    title: "Legislative News & Bill Updates | Track Congress Bills",
    description: "Stay informed with the latest legislative news, bill updates, and congressional activity. Get clear explanations of complex legislation and track how bills progress through Congress.",
    url: "https://legislatethis.org/news",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legislative News & Bill Updates | Track Congress Bills",
    description: "Stay informed with the latest legislative news, bill updates, and congressional activity.",
  },
  alternates: {
    canonical: "/news",
  },
}

export default function NewsPage() {
  return <NewsClientPage />
}
