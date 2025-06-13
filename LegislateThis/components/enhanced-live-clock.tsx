"use client"

import { useState, useEffect } from "react"

interface EnhancedLiveClockProps {
  timezone: string
  city: string
  emoji: string
  abbreviation: string
  showSeconds?: boolean
  format24Hour?: boolean
  className?: string
}

export function EnhancedLiveClock({
  timezone,
  city,
  emoji,
  abbreviation,
  showSeconds = false,
  format24Hour = false,
  className = "",
}: EnhancedLiveClockProps) {
  const [currentTime, setCurrentTime] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const updateTime = () => {
      const now = new Date()
      const timeInZone = new Date(now.toLocaleString("en-US", { timeZone: timezone }))

      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: !format24Hour,
      }

      if (showSeconds) {
        options.second = "2-digit"
      }

      const timeString = timeInZone.toLocaleTimeString("en-US", options)
      setCurrentTime(timeString)
    }

    // Update immediately
    updateTime()

    // Update every second for live timing
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [timezone, showSeconds, format24Hour, isClient])

  // Prevent hydration mismatch by showing placeholder until client-side
  if (!isClient) {
    return (
      <p className={`mb-2 ${className}`}>
        <span className="mr-2">{city}</span>
        <span className="mr-2">{emoji}</span>
        <span className="font-mono tabular-nums">--:--</span>
        <span className="ml-1 text-muted-foreground">({abbreviation})</span>
      </p>
    )
  }

  return (
    <p className={`mb-2 ${className}`}>
      <span className="mr-2">{city}</span>
      <span className="mr-2">{emoji}</span>
      <span className="font-mono tabular-nums font-semibold">{currentTime}</span>
      <span className="ml-1 text-muted-foreground">({abbreviation})</span>
    </p>
  )
}
