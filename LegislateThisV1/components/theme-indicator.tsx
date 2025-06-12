"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeIndicator() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && theme) {
      setShowIndicator(true)
      const timer = setTimeout(() => setShowIndicator(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [theme, mounted])

  if (!mounted || !showIndicator) return null

  const getThemeInfo = () => {
    switch (theme) {
      case "light":
        return { name: "Light", emoji: "☀️", description: "Clean & bright" }
      case "dark":
        return { name: "Dark", emoji: "🌙", description: "Easy on the eyes" }
      case "blue":
        return { name: "Blue", emoji: "🎨", description: "Professional blue" }
      case "autumn":
        return { name: "Autumn", emoji: "🍂", description: "Warm & cozy" }
      case "sage":
        return { name: "Sage", emoji: "🌿", description: "Natural & calm" }
      case "lavender":
        return { name: "Lavender", emoji: "💜", description: "Soft & soothing" }
      default:
        return { name: "Light", emoji: "☀️", description: "Clean & bright" }
    }
  }

  const themeInfo = getThemeInfo()

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden lg-custom:block bg-background border border-border px-4 py-3 shadow-lg animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{themeInfo.emoji}</span>
        <div>
          <div className="font-semibold text-sm">{themeInfo.name} Theme</div>
          <div className="text-xs text-muted-foreground">{themeInfo.description}</div>
        </div>
      </div>
    </div>
  )
}
