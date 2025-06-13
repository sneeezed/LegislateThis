export function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title Skeleton */}
      <div className="mb-6">
        <div className="h-12 bg-muted rounded mb-4"></div>
        <div className="h-6 bg-muted rounded w-3/4"></div>
      </div>

      {/* Meta Information Skeleton */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
        <div className="h-4 bg-muted rounded w-24"></div>
        <div className="h-4 bg-muted rounded w-1"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-6 bg-muted rounded w-18"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded"></div>
      </div>
    </div>
  )
}
