"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type Representative } from "@/lib/congress"
import { useRouter } from "next/navigation"

export function RepresentativeCard({ representative, className }: { representative: Representative; className?: string }) {
  const router = useRouter()

  const getPartyColor = (party: string) => {
    switch (party) {
      case "Democratic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Republican":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Independent":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  // Score color: 90+ green, 70-89 yellow, 30-69 orange, <30 dark red
  const getScoreColor = (score: number) => {
    if (score >= 90) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    } else if (score >= 70) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    } else if (score >= 30) {
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    } else {
      return "bg-red-900 text-red-100 dark:bg-red-900 dark:text-red-200"
    }
  }

  const handleClick = () => {
    router.push(`/articles/${representative.id}`)
  }

  return (
    <Card
      className={cn(
        "group transition-all duration-200 cursor-pointer border border-border hover:shadow-2xl hover:scale-[1.025] hover:border-primary/40 hover:z-10 hover:ring-2 hover:ring-primary/10 active:scale-100",
        className
      )}
      onClick={handleClick}
    >
      {/* Image Container - touches borders */}
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={representative.imageUrl}
            alt={representative.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          {/* Text Content */}
          <div className="flex-1 space-y-2">
            {/* Name */}
            <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {representative.name}
            </h3>
            
            {/* Location and Party */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {representative.state} • {representative.district} District
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={cn("text-xs", getPartyColor(representative.party))}>
                  {representative.party}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {representative.chamber}
                </Badge>
              </div>
            </div>
          </div>

          {/* Score Badge - positioned to the right */}
          <div className="ml-4 flex-shrink-0">
            <div className={cn(
              "rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm shadow-lg border border-border",
              getScoreColor(representative.score)
            )}>
              {representative.score}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 