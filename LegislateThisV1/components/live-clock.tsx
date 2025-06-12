"use client"

import { useState, useEffect } from "react"

interface LiveClockProps {
  timezone: string
  city: string
  emoji: string
  abbreviation: string
}

export function LiveClock({ timezone, city, emoji, abbreviation }: LiveClockProps) {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeInZone = new Date(now.toLocaleString("en-US", { timeZone: timezone }))
      const timeString = timeInZone.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      setCurrentTime(timeString)
    }

    // Update immediately
    updateTime()

    // Update every second for live timing
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [timezone])

  return (
    <p className="mb-2">
      <span className="mr-2">{city}</span>
      <span className="mr-2">{emoji}</span>
      <span className="font-mono tabular-nums">{currentTime}</span>
      <span className="ml-1 text-muted-foreground">({abbreviation})</span>
    </p>
  )
}
