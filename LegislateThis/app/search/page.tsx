// app/search/page.tsx
"use client";

import { Navigation } from "@/components/navigation";
import { SearchResultsSkeleton } from "@/components/search-results-skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { searchArticles, SearchResult } from "@/lib/search";
import { getStatusColor } from "@/components/status-badge";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTime, setSearchTime] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;
  const totalPages = Math.ceil(results.length / pageSize);
  const pagedResults = results.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      const start = performance.now();
      const filtered = await searchArticles(query);
      setResults(filtered);
      setCurrentPage(1);
      setSearchTime(Math.round(performance.now() - start));
      setLoading(false);
    };

    if (query) {
      performSearch();
    } else {
      setLoading(false);
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (r: SearchResult) => {
    router.push(`/articles/${r.slug}`);
  };

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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Search Results
                </h1>
                {query && (
                  <p className="text-muted-foreground mt-2">
                    Results for "{query}"
                  </p>
                )}
              </div>
            </div>
            {!loading && results.length > 0 && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{results.length} results found</span>
                <span>•</span>
                <span>Search completed in {searchTime} ms</span>
                <span>•</span>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
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
              <div className="space-y-6">
                {pagedResults.map((result) => (
                  <div
                    key={result.id}
                    className="border border-border p-6 hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    {/* Result Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {result.status && (
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-none ${getStatusColor(
                                  result.status
                                )}`}
                              >
                                {result.status}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold hover:underline">
                            {result.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/* Result Content */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {result.summary}
                    </p>
                    {/* Result Meta */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {result.publishedAt.toLocaleDateString()}
                        </span>
                      </div>
                      <span>•</span>
                        <div className="flex items-center gap-2">
                        <span>{result.category}</span>
                        <div className="flex items-center gap-2">
                          <span>•</span>
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
                  </div>
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 py-6">
                    <Button
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                      variant="outline"
                      className="border border-black rounded-none hover:bg-black hover:text-white"
                    >
                      Prev
                    </Button>
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          variant={
                            pageNum === currentPage ? "default" : "outline"
                          }
                          className="border border-black rounded-none hover:bg-black hover:text-white"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    <Button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      variant="outline"
                      className="border border-black rounded-none hover:bg-black hover:text-white"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
