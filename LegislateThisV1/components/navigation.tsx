"use client"

import { Heart, Music, Moon, Sun, Palette, Volume2, VolumeX, Play, Pause, Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { CursorPreview } from "@/components/cursor-preview"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"
import { usePersistentState } from "@/contexts/persistent-state-context"

export function Navigation() {
  const [activeNavItem, setActiveNavItem] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [weatherData, setWeatherData] = useState({
    temp: "72°F",
    condition: "Sunny",
    emoji: "☀️",
  })
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  // Use persistent state
  const {
    activeCursorTool,
    currentCursor,
    showMusicPlayer,
    isPlaying,
    volume,
    showSongInfo,
    activeRightButton,
    heartClicked,
    setActiveCursorTool,
    setCurrentCursor,
    setShowMusicPlayer,
    setIsPlaying,
    setVolume,
    setShowSongInfo,
    setActiveRightButton,
    setHeartClicked,
    resetCursor,
  } = usePersistentState()

  // Set active nav item based on current path
  useEffect(() => {
    const path = pathname.slice(1) || "news"
    setActiveNavItem(path)
  }, [pathname])

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const dcTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }))
      const timeString = dcTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Simulate weather data updates
  useEffect(() => {
    const weatherConditions = [
      { temp: "72°F", condition: "Sunny", emoji: "☀️" },
      { temp: "68°F", condition: "Cloudy", emoji: "☁️" },
      { temp: "75°F", condition: "Partly Cloudy", emoji: "⛅" },
      { temp: "65°F", condition: "Rainy", emoji: "🌧️" },
    ]

    // Simulate weather updates every 5 minutes
    const updateWeather = () => {
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
      setWeatherData(randomWeather)
    }

    const interval = setInterval(updateWeather, 300000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const handleThemeToggle = () => {
    const themes = ["light", "dark", "blue", "autumn", "sage", "lavender"]
    const currentIndex = themes.indexOf(theme || "light")
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const cursorTools = [
    {
      name: "America",
      cursor: "url('/cursors/America.cur'), auto",
    },
    {
      name: "chicken",
      cursor: "url('/cursors/chicken.cur'), text",
    },
    {
      name: "cheese",
      cursor: "url('/cursors/cheese.cur'), grab",
    },
    {
      name: "realmouse",
      cursor: "url('/cursors/realmouse.cur'), help",
    },
    {
      name: "bloons",
      cursor: "url('/cursors/bloons.cur'), wait",
    },
    {
      name: "turtle",
      cursor: "url('/cursors/turtle.cur'), cell",
    },
    {
      name: "pencil",
      cursor: "url('/cursors/pencil.cur'), text",
    },
    {
      name: "pizza",
      cursor: "url('/cursors/pizza.cur'), crosshair",
    },
    {
      name: "pin",
      cursor: "url('/cursors/pin.cur'), pointer",
    },
    {
      name: "mouse",
      cursor: "url('/cursors/mouse.cur'), default",
    },
  ]

  const handleCursorSelect = (tool: (typeof cursorTools)[0]) => {
    setActiveCursorTool(tool.name)
    setCurrentCursor(tool.cursor)
  }

  const handleNavigation = (page: string) => {
    router.push(`/${page.toLowerCase()}`)
  }

  const handleHeartClick = () => {
    setHeartClicked(true)
    // Simple fill effect that resets after 2 seconds
    setTimeout(() => setHeartClicked(false), 2000)
  }

  const toggleMusicPlayer = () => {
    const newShowMusicPlayer = !showMusicPlayer
    setShowMusicPlayer(newShowMusicPlayer)
    setActiveRightButton(newShowMusicPlayer ? "music" : "cursor")
  }

  const showWeatherTime = activeRightButton === "weather"

  const toggleWeatherTime = () => {
    const newShowWeatherTime = !showWeatherTime
    setActiveRightButton(newShowWeatherTime ? "weather" : "cursor")
    setShowMusicPlayer(false)
  }

  const showCursorTools = activeRightButton === "cursor"

  const toggleCursorTools = () => {
    setActiveRightButton(showCursorTools ? "" : "cursor")
    setShowMusicPlayer(false)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  // Initialize audio element and sync with persistent state
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/spoken-song.mp3")
      audioRef.current.volume = volume / 100
      audioRef.current.addEventListener("ended", () => setIsPlaying(false))

      // Sync audio state with persistent state
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setIsPlaying(false)
        })
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.removeEventListener("ended", () => setIsPlaying(false))
        }
      }
    }
  }, [])

  // Update audio volume when persistent volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "blue":
        return <Palette className="h-4 w-4" />
      case "autumn":
        return <span className="text-sm">🍂</span>
      case "sage":
        return <span className="text-sm">🌿</span>
      case "lavender":
        return <span className="text-sm">💜</span>
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  return (
    <>
      {/* Floating Header Navigation */}
      <header className="fixed top-4 left-4 right-4 z-50 flex justify-between lg-custom:justify-between items-center">
        {/* Left Navigation - Centered on Mobile/Tablet (up to 1000px) */}
        <nav className="flex mx-auto lg-custom:mx-0 bg-white dark:bg-gray-900 blue:bg-blue-50 border border-black shadow-lg">
          <button
            className={`border-r border-black p-3 flex items-center justify-center transition-all hover:bg-black hover:text-white ${
              heartClicked ? "bg-gray-100 dark:bg-gray-800 blue:bg-blue-100" : ""
            }`}
            onClick={handleHeartClick}
          >
            <Heart className="h-4 w-4 transition-all" fill={heartClicked ? "currentColor" : "none"} />
          </button>
          {["News", "Information", "About", "Contact"].map((item) => (
            <button
              key={item}
              className={`border-r border-black px-4 py-3 transition-colors hover:bg-black hover:text-white ${
                activeNavItem === item.toLowerCase() ? "bg-black text-white" : ""
              }`}
              onClick={() => handleNavigation(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right Side Container - Hidden on screens 1000px and below */}
        <div className="hidden lg-custom:flex items-center gap-4">
          {/* Main Display Area - Weather/Time, Cursor Tools, or Music Player */}
          <div className="hidden lg-custom:block">
            <div
              className="bg-white dark:bg-gray-900 blue:bg-blue-50 border border-black shadow-lg flex items-center"
              style={{
                width: "420px",
                height: "46px",
                overflow: "hidden",
              }}
            >
              {showWeatherTime ? (
                // Weather and Time Display
                <div className="flex items-center justify-between w-full px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{weatherData.emoji}</span>
                    <div className="text-sm">
                      <div className="font-semibold">{weatherData.temp}</div>
                      <div className="text-xs text-muted-foreground">{weatherData.condition}</div>
                    </div>
                  </div>
                  <div className="border-l border-black pl-4 ml-4">
                    <div className="text-sm font-semibold">Washington, D.C.</div>
                    <div className="text-xs text-muted-foreground">{currentTime}</div>
                  </div>
                </div>
              ) : showMusicPlayer ? (
                // Music Player Interface
                <>
                  <button
                    onClick={togglePlayPause}
                    className="px-3 py-3 border-r border-black flex items-center justify-center"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>

                  <div className="flex-1 px-4 flex items-center">
                    <div className="w-full">
                      <Slider
                        value={[volume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="border-l border-black px-3 py-3 flex items-center">
                    {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    <span className="ml-1 text-xs">{volume}%</span>
                  </div>

                  <button
                    onClick={() => setShowSongInfo(!showSongInfo)}
                    className="border-l border-black px-3 py-3 flex items-center justify-center relative"
                    title="Song Info"
                  >
                    <Info className="h-4 w-4" />
                    {showSongInfo && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 blue:bg-blue-50 border border-black p-2 shadow-lg text-xs">
                        <p className="font-bold">Spoken Word</p>
                        <p>Artist: Legislate This</p>
                        <p>Album: Policy Thoughts</p>
                      </div>
                    )}
                  </button>
                </>
              ) : (
                // Cursor Tools using .cur files directly
                cursorTools.map((tool, index) => (
                  <CursorPreview
                    key={index}
                    name={tool.name}
                    cursorPath={tool.cursor}
                    isActive={activeCursorTool === tool.name}
                    onClick={() => handleCursorSelect(tool)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex bg-white dark:bg-gray-900 blue:bg-blue-50 border border-black shadow-lg">
            <button
              className={`border-r border-black p-3 flex items-center justify-center transition-colors hover:bg-black hover:text-white ${
                activeRightButton === "weather" ? "bg-black text-white" : ""
              }`}
              onClick={toggleWeatherTime}
              title="Weather & Time"
            >
              <span className="text-sm">🌤️</span>
            </button>
            <button
              className={`border-r border-black p-3 flex items-center justify-center transition-colors hover:bg-black hover:text-white ${
                activeRightButton === "cursor" ? "bg-black text-white" : ""
              }`}
              onClick={toggleCursorTools}
              title="Cursor Tools"
            >
              <span>🐁</span>
            </button>
            <button
              className={`border-r border-black p-3 flex items-center justify-center transition-colors hover:bg-black hover:text-white ${
                activeRightButton === "music" ? "bg-black text-white" : ""
              }`}
              onClick={toggleMusicPlayer}
              title="Music Player"
            >
              <Music className="h-4 w-4" />
            </button>
            <button
              className="p-3 flex items-center justify-center transition-colors hover:bg-black hover:text-white"
              onClick={handleThemeToggle}
              title={`Current theme: ${theme || "light"} - Click to cycle themes`}
            >
              {getThemeIcon()}
            </button>
          </div>
        </div>
      </header>

      {/* Cursor Status Indicator - Hidden on screens 1000px and below */}
      {activeCursorTool && !showMusicPlayer && !showWeatherTime && (
        <div className="fixed bottom-4 left-4 z-50 hidden lg-custom:block bg-white dark:bg-gray-900 blue:bg-blue-50 border border-black px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <span>Current cursor:</span>
            <div className="flex items-center gap-2">
              <img
                src={
                  cursorTools
                    .find((tool) => tool.name === activeCursorTool)
                    ?.cursor.match(/url$$['"]?([^'"]+)['"]?$$/)?.[1] || "/cursors/mouse.cur"
                }
                alt={`${activeCursorTool} cursor`}
                className="w-4 h-4 object-contain"
              />
              <span className="capitalize">{activeCursorTool}</span>
            </div>
            <button
              onClick={resetCursor}
              className="ml-2 text-xs hover:bg-black hover:text-white px-2 py-1 border border-black"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  )
}
