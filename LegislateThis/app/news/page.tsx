"use client"

import { Navigation } from "@/components/navigation"
import { NewsPageSkeleton } from "@/components/news-skeleton"
import {
  fetchNewsArticles,
  fetchLegislativeEvents,
  formatRelativeTime,
  type NewsArticle,
  type LegislativeEvent,
} from "@/lib/news"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function News() {
  const [tickerText, setTickerText] = useState("")
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [events, setEvents] = useState<LegislativeEvent[]>([])
  const [articlesLoading, setArticlesLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(true)
  const [featuredPage, setFeaturedPage] = useState(1)
  const [recentPage, setRecentPage] = useState(1)
  const router = useRouter()

  const ITEMS_PER_PAGE = 3

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

  // Load articles and events
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
    async function loadEventsData() {
      setEventsLoading(true)
      try {
        setEvents(await fetchLegislativeEvents())
      } catch (e) {
        console.error("Error fetching events:", e)
      } finally {
        setEventsLoading(false)
      }
    }
    loadNewsData()
    loadEventsData()
  }, [])

  // All featured and recent
  const featuredArticles = articles
  .filter(a => a.featured)
  .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  const recentArticles = articles.filter((a) => !a.featured)
  const isLoading = articlesLoading || eventsLoading

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
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                          Featured
                        </span>
                        <h2 className="text-2xl font-bold mt-2 mb-4">
                          {article.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {article.summary}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{formatRelativeTime(article.publishedAt)}</span>
                          <span>•</span>
                          <span>{article.category}</span>
                        </div>
                      </div>
                    ))}
                    {/* Featured Pagination */}
                    {featuredTotalPages > 1 && (
                      <div className="flex space-x-2 mt-4">
                        {Array.from({ length: featuredTotalPages }, (_, i) => i + 1).map((num) => (
                          <button
                            key={num}
                            className={`px-3 py-1 border rounded ${
                              num === featuredPage ? 'bg-muted' : ''
                            }`}
                            onClick={() => setFeaturedPage(num)}
                          >
                            {num}
                          </button>
                        ))}
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
                      {Array.from({ length: recentTotalPages }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          className={`px-3 py-1 border rounded ${
                            num === recentPage ? 'bg-muted' : ''
                          }`}
                          onClick={() => setRecentPage(num)}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Legislative Calendar */}
              <div className="border-t border-border p-4 lg-custom:p-6">
                <h3 className="text-lg font-bold mb-3 lg-custom:mb-4">
                  Upcoming Legislative Events
                </h3>
                <div className="grid grid-cols-1 lg-custom:grid-cols-3 gap-3 lg-custom:gap-4">
                  {events.map((event) => (
                    <div key={event.id} className="border border-border p-3 lg-custom:p-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        {event.date}
                      </div>
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-sm">{event.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}