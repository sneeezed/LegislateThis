import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioProvider } from "@/contexts/audio-context"
import { PersistentStateProvider } from "@/contexts/persistent-state-context"
import { ThemeIndicator } from "@/components/theme-indicator"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Legislate This - Understand Congress & Legislation | Bill Summaries",
    template: "%s | Legislate This"
  },
  description: "Making legislation accessible and understandable for everyone. Get clear bill summaries, track your representatives, and understand Congress without the political noise. Perfect for Gen Z and anyone wanting to understand how laws affect their lives.",
  keywords: [
    "explaining legislation",
    "understand congress", 
    "bill summaries",
    "who is my representative",
    "gen z politics",
    "legislation explained",
    "congress bills",
    "voting records",
    "civic engagement",
    "democracy tools"
  ],
  authors: [{ name: "Legislate This Team" }],
  creator: "Legislate This",
  publisher: "Legislate This",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://legislatethis.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://legislatethis.org',
    siteName: 'Legislate This',
    title: 'Legislate This - Understand Congress & Legislation | Bill Summaries',
    description: 'Making legislation accessible and understandable for everyone. Get clear bill summaries, track your representatives, and understand Congress without the political noise.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@legislatethis',
    creator: '@legislatethis',
    title: 'Legislate This - Understand Congress & Legislation',
    description: 'Making legislation accessible and understandable for everyone. Get clear bill summaries, track your representatives, and understand Congress without the political noise.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Legislate This",
              "description": "Making legislation accessible and understandable for everyone",
              "url": "https://legislatethis.org",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://legislatethis.org/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Legislate This",
                "url": "https://legislatethis.org"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AudioProvider>
            <PersistentStateProvider>
              <div className="flex flex-col min-h-screen">
                <div className="flex-grow">{children}</div>
                <Footer />
              </div>
              <ThemeIndicator />
            </PersistentStateProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
