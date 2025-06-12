"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function ArticleNotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-20">
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              The article you're looking for doesn't exist or may have been moved. Let's get you back to reading the
              latest news.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => router.push("/news")}
                className="border border-black rounded-none hover:bg-black hover:text-white"
                variant="outline"
              >
                Back to News
              </Button>
              <Button
                onClick={() => router.back()}
                className="border border-black rounded-none hover:bg-black hover:text-white"
                variant="outline"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
