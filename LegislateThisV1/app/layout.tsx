import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PersistentStateProvider } from "@/contexts/persistent-state-context"
import { ThemeIndicator } from "@/components/theme-indicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Legislate This",
  description: "Making legislation accessible, understandable, and actionable for everyone.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <PersistentStateProvider>
            {children}
            <ThemeIndicator />
          </PersistentStateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
