// app/search/page.tsx
import { Metadata } from "next";
import SearchClientPage from "./ClientPage";

// SEO Metadata
export const metadata: Metadata = {
  title: "Search Bills & Legislation | Find Congressional Information",
  description: "Search through bills, legislation, articles, and congressional information. Find specific bills, track legislative progress, and discover how laws affect your life.",
  keywords: [
    "search bills",
    "legislation search",
    "congressional information",
    "bill finder",
    "legislative search",
    "congress bills search",
    "find legislation"
  ],
  openGraph: {
    title: "Search Bills & Legislation | Find Congressional Information",
    description: "Search through bills, legislation, articles, and congressional information. Find specific bills, track legislative progress, and discover how laws affect your life.",
    url: "https://legislatethis.org/search",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Bills & Legislation | Find Congressional Information",
    description: "Search through bills, legislation, articles, and congressional information. Find specific bills, track legislative progress, and discover how laws affect your life.",
  },
  alternates: {
    canonical: "/search",
  },
}

export default function SearchPage() {
  return <SearchClientPage />;
}
