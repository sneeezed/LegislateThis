"use client"

import { Navigation } from "@/components/navigation"
import { ArticleSkeleton } from "@/components/article-skeleton"
import { ArticleNotFound } from "@/components/article-not-found"
import { fetchArticleBySlug, formatPublishDate, type Article } from "@/lib/articles"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Bookmark } from "lucide-react"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true)
        setError(false)
        const fetchedArticle = await fetchArticleBySlug(slug)
        setArticle(fetchedArticle)
        if (!fetchedArticle) {
          setError(true)
        }
      } catch (err) {
        console.error("Error fetching article:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadArticle()
    }
  }, [slug])

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20">
          <div className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
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
            {/* Back Button */}
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="mb-6 border border-black rounded-none hover:bg-black hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">{article.title}</h1>

            {/* Article Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{formatPublishDate(article.publishedAt)}</span>
                <span>•</span>
                <span>{Math.ceil(article.body.split(" ").length / 200)} min read</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs border border-border bg-muted rounded-none">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:ml-auto">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="border border-black rounded-none hover:bg-black hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-black rounded-none hover:bg-black hover:text-white"
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {article.body.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Tags:</span>
                  {article.tags.map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 text-xs border border-border hover:bg-muted rounded-none transition-colors"
                      onClick={() => router.push(`/news?tag=${encodeURIComponent(tag)}`)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="border border-black rounded-none hover:bg-black hover:text-white"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Article
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Articles Section */}
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-xl font-bold mb-6">Continue Reading</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-border p-4 hover:bg-muted transition-colors cursor-pointer">
                  <h4 className="font-semibold mb-2">Healthcare Reform Debate Begins</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Senate begins discussions on proposed healthcare reforms that could impact millions.
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-muted border border-border">Healthcare</span>
                    <span className="px-2 py-1 bg-muted border border-border">Reform</span>
                  </div>
                </div>

                <div className="border border-border p-4 hover:bg-muted transition-colors cursor-pointer">
                  <h4 className="font-semibold mb-2">Education Funding Proposal</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    New education funding proposal aims to increase teacher salaries nationwide.
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-muted border border-border">Education</span>
                    <span className="px-2 py-1 bg-muted border border-border">Funding</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
