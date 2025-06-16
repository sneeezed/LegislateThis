// app/articles/[slug]/page.tsx
"use client"

import { Navigation } from "@/components/navigation"
import { ArticleSkeleton } from "@/components/article-skeleton"
import { ArticleNotFound } from "@/components/article-not-found"
import { fetchArticleBySlug, formatPublishDate, type Article } from "@/lib/articles"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2 } from "lucide-react"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/contexts/firebase"

// Type for the related-articles preview
interface RelatedArticle {
  slug: string
  title: string
  summary: string
  tags: string[]
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  // Allow status on Article type
  const [article, setArticle] = useState<(Article & { status?: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([])

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

  // Load the main article
  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true)
        setError(false)
        const fetched = await fetchArticleBySlug(slug)
        setArticle(fetched)
        if (!fetched) setError(true)
      } catch (err) {
        console.error("Error fetching article:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (slug) loadArticle()
  }, [slug])

  // Load the two newest related articles (excluding current)
  useEffect(() => {
    async function loadRelated() {
      const q = query(collection(db, "articles"), orderBy("publishedAt", "desc"))
      const snap = await getDocs(q)
      const previews = snap.docs
        .map(doc => {
          const data = doc.data() as any
          return {
            slug: doc.id,
            title: data.title,
            summary: data.summary,
            tags: data.tags || [],
          }
        })
        .filter(item => item.slug !== slug)
        .slice(0, 2)
      setRelatedArticles(previews)
    }
    if (slug) loadRelated()
  }, [slug])

  // Share handler
  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share && article) {
      try {
        await navigator.share({ title: article.title, url })
        return
      } catch {}
    }
    navigator.clipboard.writeText(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20">
          <div className="py-16 px-4">
            <div className="max-w-4xl mx-auto animate-pulse">
              <ArticleSkeleton />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !article) {
    return <ArticleNotFound />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20">

        {/* Article Header */}
        <div className="py-8 lg-custom:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="mb-6 border border-black rounded-none hover:bg-black hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              {article.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{formatPublishDate(article.publishedAt)}</span>
                <span>•</span>
                <span>{Math.ceil(article.body.split(" ").length / 200)} min read</span>
                <span>•</span>

              </div>

              {/* Tags + Status */}
              <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
                {article.status && (
                  <>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-none ${getStatusColor(
                        article.status
                      )}`}
                    >
                      {article.status}
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-2 sm:ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="border border-black rounded-none hover:bg-black hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content & Sidebar */}
        <div className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12">
              {article.body.split("\n\n").map((para, idx) => (
                <p key={idx} className="mb-6 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Footer (Tags & Share) */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>Tags:</span>
                  {article.tags.map(tag => (
                    <button
                      key={tag}
                      className="px-3 py-1 text-xs border border-border hover:bg-muted rounded-none transition-colors"
                      onClick={() => router.push(`/search?q=${encodeURIComponent(tag)}`)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="border border-black rounded-none hover:bg-black hover:text-white"
                >
                  <Share2 className="h-4 w-4 mr-2" /> Share Article
                </Button>
              </div>
            </div>

            {/* Continue Reading Section */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold mb-6">Continue Reading</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedArticles.map(({ slug: rSlug, title, summary, tags }) => (
                    <div
                      key={rSlug}
                      className="border border-border p-4 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => router.push(`/articles/${rSlug}`)}
                    >
                      <h4 className="font-semibold mb-2">{title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{summary}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-muted border border-border rounded-none"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
