"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { CongressMembersSkeleton } from "@/components/congress-members-skeleton"
import { RepresentativeCard } from "@/components/representative-card"
import { SearchBar } from "@/components/search-bar"
import { SortDropdown } from "@/components/sort-dropdown"
import { Pagination } from "@/components/pagination"
import { type Representative, type SortOption, fetchCongressMembers } from "@/lib/congress"

export default function CongressMembers() {
  const [representatives, setRepresentatives] = useState<Representative[]>([])
  const [filteredRepresentatives, setFilteredRepresentatives] = useState<Representative[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>("score-high")
  const [itemsPerPage] = useState(12)

  // Load data from Firestore
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const data = await fetchCongressMembers()
        setRepresentatives(data)
        setFilteredRepresentatives(data)
      } catch (error) {
        console.error("Error fetching congress members:", error)
        setRepresentatives([])
        setFilteredRepresentatives([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter and sort representatives
  useEffect(() => {
    let filtered = representatives

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = representatives.filter(rep => 
        rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.party.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "score-high":
          return b.score - a.score
        case "score-low":
          return a.score - b.score
        case "name":
          return a.name.localeCompare(b.name)
        case "state":
          return a.state.localeCompare(b.state)
        case "years":
          // Note: years field is not available in the simplified Representative interface
          // This will sort by name as fallback
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredRepresentatives(filtered)
    setCurrentPage(1) // Reset to first page when filtering/sorting
  }, [searchQuery, representatives, sortBy])

  // Pagination logic
  const totalPages = Math.ceil(filteredRepresentatives.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRepresentatives = filteredRepresentatives.slice(startIndex, endIndex)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSort = (option: SortOption) => {
    setSortBy(option)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 lg-custom:pt-20">
        {/* Header Section */}
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-8 lg-custom:py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl lg-custom:text-4xl xl:text-5xl font-bold mb-4">
                Members of Congress
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Explore representatives and senators, their voting records, and legislative priorities
              </p>
              
              {/* Search Bar */}
              <SearchBar onSearch={handleSearch} placeholder="Search by name, state, or party..." />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-8 lg-custom:py-12">
          {loading ? (
            <CongressMembersSkeleton />
          ) : (
            <>
              {/* Sort and Results Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <SortDropdown value={sortBy} onSort={handleSort} />
                  <span className="text-sm text-muted-foreground">
                    {filteredRepresentatives.length}
                    {' '}
                    <span className="inline min-[411px]:inline-block max-[410px]:hidden">representatives</span>
                    <span className="inline max-[410px]:inline-block min-[411px]:hidden">reps</span>
                    {searchQuery && ` for "${searchQuery}"`}
                  </span>
                </div>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>

              {/* Representatives Grid */}
              {paginatedRepresentatives.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg-custom:grid-cols-4 xl:grid-cols-5 gap-6">
                  {paginatedRepresentatives.map((representative) => (
                    <RepresentativeCard
                      key={representative.id}
                      representative={representative}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-muted-foreground text-lg mb-2">
                    No representatives found
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search terms or browse all representatives
                  </p>
                </div>
              )}

              {/* Bottom Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
} 