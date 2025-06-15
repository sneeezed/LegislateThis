export function SearchResultsSkeleton() {
    return (
      <div className="space-y-6">
        {/* Search Results Skeleton */}
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="animate-pulse border border-border p-6">
            {/* Header Skeleton */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Icon skeleton */}
                <div className="w-8 h-8 bg-muted rounded"></div>
  
                <div>
                  {/* Type badge and status skeleton */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-5 bg-muted rounded w-16"></div>
                    <div className="h-5 bg-muted rounded w-20"></div>
                  </div>
  
                  {/* Title skeleton */}
                  <div className="space-y-1">
                    <div className="h-6 bg-muted rounded w-80"></div>
                    <div className="h-6 bg-muted rounded w-64"></div>
                  </div>
                </div>
              </div>
  
              {/* Relevance score skeleton */}
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
  
            {/* Summary skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
  
            {/* Meta information skeleton */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Date skeleton */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-24"></div>
              </div>
  
              {/* Tags skeleton */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="flex gap-1">
                  <div className="h-6 bg-muted rounded w-16"></div>
                  <div className="h-6 bg-muted rounded w-20"></div>
                  <div className="h-6 bg-muted rounded w-18"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
  
        {/* Load more button skeleton */}
        <div className="text-center py-8">
          <div className="h-10 bg-muted rounded w-32 mx-auto"></div>
          <div className="h-3 bg-muted rounded w-48 mx-auto mt-2"></div>
        </div>
      </div>
    )
  }
  
  // Individual result skeleton component for reuse
  export function SearchResultSkeleton() {
    return (
      <div className="animate-pulse border border-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded"></div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 bg-muted rounded w-16"></div>
                <div className="h-5 bg-muted rounded w-20"></div>
              </div>
              <div className="h-6 bg-muted rounded w-80"></div>
            </div>
          </div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
  
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
  
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-24"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <div className="flex gap-1">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-18"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  