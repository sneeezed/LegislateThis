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
  const router = useRouter()

  // Generate ticker text based on screen size
  useEffect(() => {
    const generateTickerText = () => {
      // Create different lengths of text for different screen sizes
      const width = window.innerWidth

      let repetitions = 40 // Default for desktop
      if (width <= 767) {
        repetitions = 60 // More repetitions for mobile
      } else if (width <= 1000) {
        repetitions = 50 // Medium repetitions for tablet
      } else if (width <= 1279) {
        repetitions = 40 // Standard for desktop
      } else {
        repetitions = 35 // Fewer repetitions for large screens
      }

      const baseText = Array(repetitions).fill("News").join(" • ") + " • "
      return baseText + baseText // Double for seamless loop
    }

    const updateTickerText = () => {
      setTickerText(generateTickerText())
    }

    // Set initial text
    updateTickerText()

    // Update on resize
    const handleResize = () => {
      updateTickerText()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Load articles and events
  useEffect(() => {
    async function loadNewsData() {
      try {
        // Load articles
        setArticlesLoading(true)
        const fetchedArticles = await fetchNewsArticles()
        setArticles(fetchedArticles)
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setArticlesLoading(false)
      }
    }

    async function loadEventsData() {
      try {
        // Load events
        setEventsLoading(true)
        const fetchedEvents = await fetchLegislativeEvents()
        setEvents(fetchedEvents)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setEventsLoading(false)
      }
    }

    loadNewsData()
    loadEventsData()
  }, [])

  const featuredArticle = articles.find((article) => article.featured)
  const recentArticles = articles.filter((article) => !article.featured)

  const isLoading = articlesLoading || eventsLoading

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20 lg-custom:pt-20">
        {/* Seamless Scrolling News Ticker - Always visible */}
        <div className="py-8 lg-custom:py-12 xl:py-16 px-4">
          <div className="news-ticker-container">
            {tickerText && <div className="news-ticker-text">{tickerText}</div>}
          </div>
        </div>

        {/* Content with Loading State */}
        <div className="border-t border-border">
          {isLoading ? (
            <NewsPageSkeleton />
          ) : (
            <>
              <div className="grid lg-custom:grid-cols-2 xl:grid-cols-3 gap-4 lg-custom:gap-6 p-4 lg-custom:p-6">
                {/* Featured Story */}
                {featuredArticle && (
                  <div className="xl:col-span-2 space-y-4">
                    <div
                      className="border border-border p-4 lg-custom:p-6 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => router.push(`/articles/${featuredArticle.slug}`)}
                    >
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Featured</span>
                      <h2 className="text-xl lg-custom:text-2xl font-bold mt-2 mb-3 lg-custom:mb-4">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-muted-foreground mb-3 lg-custom:mb-4">{featuredArticle.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatRelativeTime(featuredArticle.publishedAt)}</span>
                        <span>•</span>
                        <span>{featuredArticle.category}</span>
                        <span>•</span>
                        <span className="text-primary hover:underline">Read Full Article →</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Updates */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Recent Updates</h3>

                  {recentArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className={`border border-border p-4 hover:bg-muted transition-colors cursor-pointer ${
                        index === 0 ? "" : ""
                      }`}
                      onClick={() => {
                        if (article.slug === "healthcare-reform-debate-begins") {
                          router.push(`/articles/${article.slug}`)
                        }
                      }}
                    >
                      <h4 className="font-semibold mb-2">{article.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{formatRelativeTime(article.publishedAt)}</span>
                        {article.slug === "healthcare-reform-debate-begins" && (
                          <span className="text-xs text-primary hover:underline">Read More →</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legislative Calendar */}
              <div className="border-t border-border p-4 lg-custom:p-6">
                <h3 className="text-lg font-bold mb-3 lg-custom:mb-4">Upcoming Legislative Events</h3>
                <div className="grid grid-cols-1 lg-custom:grid-cols-3 gap-3 lg-custom:gap-4">
                  {events.map((event) => (
                    <div key={event.id} className="border border-border p-3 lg-custom:p-4">
                      <div className="text-sm text-muted-foreground mb-1">{event.date}</div>
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
