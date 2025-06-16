// app/news/page.tsx
"use client"

import { Navigation } from "@/components/navigation"
import { NewsPageSkeleton } from "@/components/news-skeleton"
import {
  fetchNewsArticles,
  formatRelativeTime,
  type NewsArticle,
} from "@/lib/news"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function News() {
  const [tickerText, setTickerText] = useState("")
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [articlesLoading, setArticlesLoading] = useState(true)
  const [featuredPage, setFeaturedPage] = useState(1)
  const [recentPage, setRecentPage] = useState(1)
  const router = useRouter()

  const ITEMS_PER_PAGE = 3

  // Status badge color helper
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "In Committee":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Passed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Failed":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  // Generate ticker text based on screen size
  useEffect(() => {
    const generateTickerText = () => {
      const width = window.innerWidth
      let repetitions = 40
      if (width <= 767) repetitions = 60
      else if (width <= 1000) repetitions = 50
      else if (width <= 1279) repetitions = 40
      else repetitions = 35
      const baseText = Array(repetitions).fill("News").join(" • ") + " • "
      return baseText + baseText
    }

    const updateTickerText = () => setTickerText(generateTickerText())
    updateTickerText()
    window.addEventListener("resize", updateTickerText)
    return () => window.removeEventListener("resize", updateTickerText)
  }, [])

  // Load articles only
  useEffect(() => {
    async function loadNewsData() {
      setArticlesLoading(true)
      try {
        setArticles(await fetchNewsArticles())
      } catch (e) {
        console.error("Error fetching articles:", e)
      } finally {
        setArticlesLoading(false)
      }
    }
    loadNewsData()
  }, [])

  // Separate featured vs recent
  const featuredArticles = articles
    .filter((a) => a.featured)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  const recentArticles = articles.filter((a) => !a.featured)
  const isLoading = articlesLoading

  // Pagination logic
  const featuredTotalPages = Math.ceil(featuredArticles.length / ITEMS_PER_PAGE)
  const recentTotalPages = Math.ceil(recentArticles.length / ITEMS_PER_PAGE)
  const paginatedFeatured = featuredArticles.slice(
    (featuredPage - 1) * ITEMS_PER_PAGE,
    featuredPage * ITEMS_PER_PAGE
  )
  const paginatedRecent = recentArticles.slice(
    (recentPage - 1) * ITEMS_PER_PAGE,
    recentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 lg-custom:pt-20">
        {/* News Ticker */}
        <div className="py-8 lg-custom:py-12 xl:py-16 px-4">
          {tickerText && (
            <div className="news-ticker-container">
              <div className="news-ticker-text">{tickerText}</div>
            </div>
          )}
        </div>

        {/* Content with Loading State */}
        <div className="border-t border-border">
          {isLoading ? (
            <NewsPageSkeleton />
          ) : (
            <>
              {/* Grid: Featured + Recent */}
              <div className="grid lg-custom:grid-cols-2 xl:grid-cols-3 gap-4 lg-custom:gap-6 p-4 lg-custom:p-6">
                {/* Featured Stories */}
                {paginatedFeatured.length > 0 && (
                  <div className="xl:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold">Featured Stories</h3>
                    {paginatedFeatured.map((article) => (
                      <div
                        key={article.id}
                        className="border border-border p-6 hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => router.push(`/articles/${article.slug}`)}
                      >
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <span className="uppercase tracking-wide font-medium">
                            Featured
                          </span>
                          {article.status && (
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-none ${getStatusColor(
                                article.status
                              )}`}
                            >
                              {article.status}
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl font-bold mt-2 mb-4">
                          {article.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {article.summary}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span>{formatRelativeTime(article.publishedAt)}</span>
                          <span>•</span>
                          <span>{article.category}</span>
                          {article.tags?.length > 0 && (
                            <>
                              <span>•</span>
                              <span className="inline-flex flex-wrap gap-1">
                                {article.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 text-xs bg-muted border border-border hover:bg-accent transition-colors cursor-pointer"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {article.tags.length > 3 && (
                                  <span className="px-2 py-1 text-xs text-muted-foreground">
                                    +{article.tags.length - 3} more
                                  </span>
                                )}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Featured Pagination */}
                    {featuredTotalPages > 1 && (
                      <div className="flex space-x-2 mt-4">
                        {Array.from({ length: featuredTotalPages }, (_, i) => i + 1).map(
                          (num) => (
                            <button
                              key={num}
                              className={`px-3 py-1 border rounded ${
                                num === featuredPage ? "bg-muted" : ""
                              }`}
                              onClick={() => setFeaturedPage(num)}
                            >
                              {num}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Recent Updates */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold">Recent Updates</h3>
                  {paginatedRecent.map((article) => (
                    <div
                      key={article.id}
                      className="border border-border p-4 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => router.push(`/articles/${article.slug}`)}
                    >
                      {article.status && (
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-none ${getStatusColor(
                              article.status
                            )}`}
                          >
                            {article.status}
                          </span>
                        </div>
                      )}
                      <h4 className="font-semibold mb-2">{article.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(article.publishedAt)}
                        </span>
                        <span className="text-xs text-primary hover:underline">
                          Read More →
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Recent Pagination */}
                  {recentTotalPages > 1 && (
                    <div className="flex space-x-2 mt-4">
                      {Array.from({ length: recentTotalPages }, (_, i) => i + 1).map(
                        (num) => (
                          <button
                            key={num}
                            className={`px-3 py-1 border rounded ${
                              num === recentPage ? "bg-muted" : ""
                            }`}
                            onClick={() => setRecentPage(num)}
                          >
                            {num}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
