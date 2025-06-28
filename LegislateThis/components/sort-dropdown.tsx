"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { type SortOption } from "@/lib/congress"

interface SortDropdownProps {
  value: SortOption
  onSort: (option: SortOption) => void
  className?: string
}

const sortOptions = [
  { value: "score-high", label: "Score (High to Low)" },
  { value: "score-low", label: "Score (Low to High)" },
  { value: "name", label: "Name (A-Z)" },
  { value: "state", label: "State" },
  { value: "years", label: "Years in Office" },
] as const

export function SortDropdown({ value, onSort, className }: SortDropdownProps) {
  const currentOption = sortOptions.find(option => option.value === value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-9 px-3 text-sm", className)}
        >
          Sort by: {currentOption?.label}
          <ChevronDown className="ml-2 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSort(option.value)}
            className={cn(
              "cursor-pointer",
              value === option.value && "bg-accent"
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 