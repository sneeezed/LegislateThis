import { Skeleton } from "@/components/ui/skeleton"

export function CongressMembersSkeleton() {
  return (
    <div className="space-y-8">
      {/* Sort and Results Summary Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-64" />
      </div>

      {/* Representatives Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg-custom:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            {/* Image Container - touches borders */}
            <div className="relative">
              <Skeleton className="aspect-square w-full" />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                {/* Text Content */}
                <div className="flex-1 space-y-2">
                  {/* Name */}
                  <Skeleton className="h-4 w-3/4" />
                  
                  {/* Location */}
                  <Skeleton className="h-3 w-2/3" />
                  
                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                </div>

                {/* Score Badge Skeleton - positioned to the right */}
                <div className="ml-4 flex-shrink-0">
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Individual card skeleton for reuse
export function RepresentativeCardSkeleton() {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Image Container - touches borders */}
      <div className="relative">
        <Skeleton className="aspect-square w-full" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          {/* Text Content */}
          <div className="flex-1 space-y-2">
            {/* Name */}
            <Skeleton className="h-4 w-3/4" />
            
            {/* Location */}
            <Skeleton className="h-3 w-2/3" />
            
            {/* Badges */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>

          {/* Score Badge Skeleton - positioned to the right */}
          <div className="ml-4 flex-shrink-0">
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
} 