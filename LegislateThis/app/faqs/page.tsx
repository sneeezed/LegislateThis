import { Metadata } from "next"
import FAQsClientPage from "./ClientPage"

// SEO Metadata
export const metadata: Metadata = {
  title: "Frequently Asked Questions | Legislate This Help",
  description: "Find answers to common questions about Legislate This, how to track bills, understand legislation, and engage with your representatives. Get help with our platform.",
  keywords: [
    "frequently asked questions",
    "legislate this help",
    "bill tracking help",
    "legislation questions",
    "congress help",
    "platform support"
  ],
  openGraph: {
    title: "Frequently Asked Questions | Legislate This Help",
    description: "Find answers to common questions about Legislate This, how to track bills, understand legislation, and engage with your representatives. Get help with our platform.",
    url: "https://legislatethis.org/faqs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Legislate This Help",
    description: "Find answers to common questions about Legislate This, how to track bills, understand legislation, and engage with your representatives. Get help with our platform.",
  },
  alternates: {
    canonical: "/faqs",
  },
}

export default function FAQsPage() {
  return <FAQsClientPage />
}
