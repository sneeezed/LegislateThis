import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import ClientPage from "./ClientPage"     // ← the real page lives here
import { Metadata } from "next"

// SEO Metadata
export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Legislate This",
  description: "Have questions about legislation or want to get involved? Contact the Legislate This team. We're here to help you understand Congress and make your voice heard.",
  keywords: [
    "contact legislate this",
    "get in touch",
    "legislation questions",
    "congress help",
    "civic engagement support",
    "democracy questions"
  ],
  openGraph: {
    title: "Contact Us | Get in Touch with Legislate This",
    description: "Have questions about legislation or want to get involved? Contact the Legislate This team. We're here to help you understand Congress and make your voice heard.",
    url: "https://legislatethis.org/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Get in Touch with Legislate This",
    description: "Have questions about legislation or want to get involved? Contact the Legislate This team. We're here to help you understand Congress and make your voice heard.",
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <ClientPage />
    </Suspense>
  )
}

function Fallback() {
  // Ultra-simple markup that can be prerendered statically
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20" />
    </div>
  )
}
