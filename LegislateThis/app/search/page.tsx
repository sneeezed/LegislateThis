"use client"

import { Navigation } from "@/components/navigation"
import { SearchResultsSkeleton } from "@/components/search-results-skeleton"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react"

// Mock search result types
interface SearchResult {
  id: string
  title: string
  summary: string
  status?: string
  date: string
  tags: string[]
  url?: string
}

// Mock search results data
const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Infrastructure Investment and Jobs Act",
    summary:
      "A comprehensive bill to invest in American infrastructure, create jobs, and strengthen the economy through improvements to roads, bridges, broadband, and clean energy systems.",
    status: "Passed",
    date: "2024-01-15",
    tags: ["Infrastructure", "Jobs", "Economy", "Transportation"],
    url: "/bills/infrastructure-investment-jobs-act",
  },
  {
    id: "2",
    title: "Healthcare Reform Debate Continues in Senate",
    summary:
      "Senate committees are reviewing proposed healthcare reforms that could impact prescription drug pricing and insurance coverage for millions of Americans.",
    status: "Failed",
    date: "2024-01-14",
    tags: ["Healthcare", "Reform", "Senate", "Insurance"],
    url: "/articles/healthcare-reform-debate-begins",
  },
  {
    id: "3",
    title: "Clean Energy Transition Act",
    summary:
      "Legislation aimed at accelerating the transition to renewable energy sources while supporting workers in traditional energy sectors.",
    status: "In Committee",
    date: "2024-01-12",
    tags: ["Clean Energy", "Environment", "Jobs", "Renewable"],
  },
  {
    id: "4",
    title: "Senator Elizabeth Warren",
    summary:
      "Senior Senator from Massachusetts, serving on the Banking, Housing, and Urban Affairs Committee. Known for consumer protection advocacy.",
    date: "Profile Updated: 2024-01-10",
    tags: ["Banking", "Consumer Protection", "Massachusetts", "Senate"],
  },
  {
    id: "5",
    title: "House Committee on Energy and Commerce",
    summary:
      "Congressional committee with jurisdiction over energy policy, environmental protection, consumer protection, and interstate commerce.",
    date: "Last Meeting: 2024-01-08",
    tags: ["Energy", "Commerce", "Environment", "Consumer Protection"],
  },
  {
    id: "6",
    title: "Education Funding Bill Advances",
    summary:
      "New education funding proposal aims to increase teacher salaries and improve school infrastructure across the nation.",
    date: "2024-01-07",
    tags: ["Education", "Funding", "Teachers", "Schools"],
  },
]

export default function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""

  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTime, setSearchTime] = useState(0)

  // Simulate search API call with loading delay
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true)
      const startTime = Date.now()

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Filter results based on query (simple mock filtering)
      const filteredResults = query
        ? mockSearchResults
            .filter(
              (result) =>
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.summary.toLowerCase().includes(query.toLowerCase()) ||
                result.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
            )
        : mockSearchResults

      setResults(filteredResults)
      setSearchTime(Date.now() - startTime)
      setLoading(false)
    }

    if (query) {
      performSearch()
    } else {
      setLoading(false)
      setResults([])
    }
  }, [query])

  const getStatusColor = (status: string) => {
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

  const handleResultClick = (result: SearchResult) => {
    if (result.url) {
      router.push(result.url)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-20">
        {/* Search Header */}
        <div className="py-8 lg-custom:py-12 px-4 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="border border-black rounded-none hover:bg-black hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Search Results</h1>
                {query && <p className="text-muted-foreground mt-2">Results for "{query}"</p>}
              </div>
            </div>

            {!loading && results.length > 0 && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{results.length} results found</span>
                <span>•</span>
                <span>Search completed in {searchTime}ms</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Results Content */}
        <div className="px-4 py-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <SearchResultsSkeleton />
            ) : results.length === 0 ? (
              // No Results State
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {query
                    ? `We couldn't find any results for "${query}". Try adjusting your search terms or browse our categories.`
                    : "Enter a search term to find bills, articles, representatives, and committees."}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => router.push("/news")}
                    className="border border-black rounded-none hover:bg-black hover:text-white"
                    variant="outline"
                  >
                    Browse News
                  </Button>
                  <Button
                    onClick={() => router.push("/information")}
                    className="border border-black rounded-none hover:bg-black hover:text-white"
                    variant="outline"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ) : (
              // Results List
              <div className="space-y-6">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`border border-border p-6 hover:bg-muted transition-colors ${
                      result.url ? "cursor-pointer" : ""
                    }`}
                    onClick={() => handleResultClick(result)}
                  >
                    {/* Result Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3"><div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-none ${getStatusColor(result.status || "")}`}>
                              {result.status}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold hover:underline">{result.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {result.url && <ExternalLink className="h-4 w-4" />}
                      </div>
                    </div>

                    {/* Result Content */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">{result.summary}</p>

                    {/* Result Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(result.date).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <div className="flex flex-wrap gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-muted border border-border hover:bg-accent transition-colors cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                          {result.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs text-muted-foreground">
                              +{result.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More / Pagination Placeholder */}
                <div className="text-center py-8">
                  <Button
                    variant="outline"
                    className="border border-black rounded-none hover:bg-black hover:text-white"
                    disabled
                  >
                    Load More Results
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Showing {results.length} of {results.length} results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
