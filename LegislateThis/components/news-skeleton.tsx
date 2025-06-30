export function NewsPageSkeleton() {
  return (
    <div className="animate-pulse min-h-[700px]">
      <div className="grid lg-custom:grid-cols-2 xl:grid-cols-3 gap-4 lg-custom:gap-6 p-4 lg-custom:p-6">
        {/* Featured Story Skeleton */}
        <div className="xl:col-span-2 space-y-4">
          <div className="border border-border p-4 lg-custom:p-6">
            {/* Featured label skeleton */}
            <div className="h-3 bg-muted rounded w-16 mb-3"></div>

            {/* Title skeleton - responsive heights */}
            <div className="space-y-2 mb-3 lg-custom:mb-4">
              <div className="h-5 sm:h-6 lg-custom:h-7 xl:h-8 bg-muted rounded"></div>
              <div className="h-5 sm:h-6 lg-custom:h-7 xl:h-8 bg-muted rounded w-3/4"></div>
            </div>

            {/* Summary skeleton - multiple lines */}
            <div className="space-y-2 mb-3 lg-custom:mb-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/5 hidden sm:block"></div>
            </div>

            {/* Meta information skeleton */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="h-3 bg-muted rounded w-16"></div>
              <div className="h-3 bg-muted rounded w-1"></div>
              <div className="h-3 bg-muted rounded w-20"></div>
              <div className="h-3 bg-muted rounded w-1"></div>
              <div className="h-3 bg-muted rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Recent Updates Skeleton */}
        <div className="space-y-4">
          {/* Section title skeleton */}
          <div className="h-5 sm:h-6 bg-muted rounded w-32"></div>

          {/* Recent update cards skeleton */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="border border-border p-4">
              {/* Card title skeleton */}
              <div className="h-4 sm:h-5 bg-muted rounded w-4/5 mb-2"></div>

              {/* Card summary skeleton */}
              <div className="space-y-1 mb-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-2/3 hidden sm:block"></div>
              </div>

              {/* Timestamp and read more skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-3 bg-muted rounded w-16"></div>
                {index === 0 && <div className="h-3 bg-muted rounded w-20"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legislative Calendar Skeleton */}
      <div className="border-t border-border p-4 lg-custom:p-6">
        {/* Section title skeleton */}
        <div className="h-5 sm:h-6 bg-muted rounded w-48 mb-3 lg-custom:mb-4"></div>

        {/* Calendar cards skeleton */}
        <div className="grid grid-cols-1 lg-custom:grid-cols-3 gap-3 lg-custom:gap-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border border-border p-3 lg-custom:p-4">
              {/* Date skeleton */}
              <div className="h-3 bg-muted rounded w-16 mb-1"></div>

              {/* Event title skeleton */}
              <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>

              {/* Event description skeleton */}
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Additional skeleton component for individual news cards
export function NewsCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`animate-pulse border border-border p-4 ${featured ? "lg-custom:p-6" : ""}`}>
      {featured && <div className="h-3 bg-muted rounded w-16 mb-3"></div>}

      <div className="space-y-2 mb-3">
        <div className={`bg-muted rounded ${featured ? "h-6 lg-custom:h-8" : "h-5"}`}></div>
        {featured && <div className="h-6 lg-custom:h-8 bg-muted rounded w-3/4"></div>}
      </div>

      <div className="space-y-1 mb-3">
        <div className="h-3 bg-muted rounded"></div>
        <div className="h-3 bg-muted rounded w-4/5"></div>
        {featured && (
          <>
            <div className="h-3 bg-muted rounded w-5/6"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-3 bg-muted rounded w-16"></div>
        <div className="h-3 bg-muted rounded w-1"></div>
        <div className="h-3 bg-muted rounded w-20"></div>
        {featured && (
          <>
            <div className="h-3 bg-muted rounded w-1"></div>
            <div className="h-3 bg-muted rounded w-24"></div>
          </>
        )}
      </div>
    </div>
  )
}
