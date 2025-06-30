"use client"

import type React from "react"

import { Search, Music, Moon, Sun, Palette, Volume2, VolumeX, Play, Pause, Info, Menu, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { CursorPreview } from "@/components/cursor-preview"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"
import { useAudio } from "@/contexts/audio-context"
import { usePersistentState } from "@/contexts/persistent-state-context"

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [weatherData, setWeatherData] = useState({
    temp: "72°F",
    condition: "Sunny",
    emoji: "☀️",
  })
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  // audio context
  const { isPlaying, volume, play, pause, setVolume, showSongInfo, setShowSongInfo } = useAudio()

  // persistent UI state
  const {
    activeCursorTool,
    currentCursor,
    showMusicPlayer,
    activeRightButton,
    setActiveCursorTool,
    setCurrentCursor,
    setShowMusicPlayer,
    setActiveRightButton,
    resetCursor,
  } = usePersistentState()

  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // mark as mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // set active nav item on path change
  useEffect(() => {
    const path = pathname.slice(1) || "news"
    setActiveNavItem(path)
  }, [pathname])

  // update time every minute
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
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // simulate weather updates
  useEffect(() => {
    const weatherConditions = [
      { temp: "72°F", condition: "Sunny", emoji: "☀️" },
      { temp: "68°F", condition: "Cloudy", emoji: "☁️" },
      { temp: "75°F", condition: "Partly Cloudy", emoji: "⛅" },
      { temp: "65°F", condition: "Rainy", emoji: "🌧️" },
    ]
    const updateWeather = () => {
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
      setWeatherData(randomWeather)
    }
    const interval = setInterval(updateWeather, 300000)
    return () => clearInterval(interval)
  }, [])

  const handleThemeToggle = () => {
    const themes = ["light", "dark", "blue", "autumn", "sage", "lavender"]
    const idx = themes.indexOf(theme || "light")
    setTheme(themes[(idx + 1) % themes.length])
  }

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

  const cursorTools = [
    { name: "America", cursor: "url('/cursors/America.cur'), auto", preview: "/cursor-previews/America.png" },
    { name: "chicken", cursor: "url('/cursors/chicken.cur'), pointer", preview: "/cursor-previews/chicken.png" },
    { name: "cheese", cursor: "url('/cursors/cheese.cur'), text", preview: "/cursor-previews/cheese.png" },
    {
      name: "realmouse",
      cursor: "url('/cursors/realmouse.cur'), crosshair",
      preview: "/cursor-previews/realmouse.png",
    },
    { name: "bloons", cursor: "url('/cursors/bloons.cur'), grab", preview: "/cursor-previews/bloons.png" },
    { name: "turtle", cursor: "url('/cursors/turtle.cur'), help", preview: "/cursor-previews/turtle.png" },
    { name: "pencil", cursor: "url('/cursors/pencil.cur'), wait", preview: "/cursor-previews/pencil.png" },
    { name: "pizza", cursor: "url('/cursors/pizza.cur'), cell", preview: "/cursor-previews/pizza.png" },
    { name: "pin", cursor: "url('/cursors/pin.cur'), text", preview: "/cursor-previews/pin.png" },
    { name: "mouse", cursor: "url('/cursors/mouse.cur'), default", preview: "/cursor-previews/mouse.png" },
  ]

  const handleCursorSelect = (tool: (typeof cursorTools)[0]) => {
    setActiveCursorTool(tool.name)
    setCurrentCursor(tool.cursor)
  }

  const handleNavigation = (page: string) => {
    router.push(`/${page.toLowerCase()}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchToggle = () => {
    setShowSearchBar(!showSearchBar)
    if (showSearchBar) {
      setSearchQuery("")
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSearchBar(false)
      setSearchQuery("")
    } else if (e.key === "Enter" && searchQuery.trim()) {
      // Redirect to search results page
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearchBar(false)
      setSearchQuery("")
    }
  }

  const toggleMusicPlayer = () => {
    const newShow = !showMusicPlayer
    setShowMusicPlayer(newShow)
    setActiveRightButton(newShow ? "music" : "cursor")
    if (!newShow) pause()
  }

  const showWeatherTime = activeRightButton === "weather"
  const toggleWeatherTime = () => {
    const newShow = !showWeatherTime
    setActiveRightButton(newShow ? "weather" : "cursor")
    setShowMusicPlayer(false)
  }

  const showCursorTools = activeRightButton === "cursor"
  const toggleCursorTools = () => {
    setActiveRightButton(showCursorTools ? "" : "cursor")
    setShowMusicPlayer(false)
  }

  const togglePlayPause = () => {
    isPlaying ? pause() : play()
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  return (
    <>
      {/* Floating Header Navigation */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <header className="flex justify-between lg-custom:justify-between items-center">
          {/* Left Navigation - Centered on Mobile/Tablet (up to 1000px) */}
          <nav className="flex mx-auto lg-custom:mx-0 bg-white dark:bg-gray-900 blue:bg-blue-50 border border-black shadow-lg transition-all duration-500 ease-in-out">
            {/* search toggle + animated input */}
            <div className="flex items-center">
              <button
                className="border-r border-black py-4 px-3 flex items-center justify-center transition-colors hover:bg-black hover:text-white"
                onClick={handleSearchToggle}
                aria-label="Open search"
              >
                <Search className="h-4 w-4" />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showSearchBar
                    ? "w-48 min-[430px]:w-64 opacity-100"
                    : "w-0 opacity-0"
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search legislation..."
                  className="w-full px-3 py-3 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                  autoFocus={showSearchBar}
                />
              </div>
            </div>
  
            {/* Navigation items - hide completely when search is active */}
            <div
              className={`
                flex items-center 
                overflow-hidden 
                transform origin-left 
                transition-all duration-500 ease-in-out
                ${showSearchBar ? "opacity-0 scale-x-0 pointer-events-none" : "opacity-100 scale-x-100"}
              `}
              style={{
                transitionDelay: showSearchBar ? "0ms" : "50ms",
                width: showSearchBar ? "0px" : "180px"
              }}
            >
              {/* News button */}
              <button
                className={`border-r border-black px-4 py-3 transition-colors hover:bg-black hover:text-white ${
                  activeNavItem === "news" ? "bg-black text-white" : ""
                }`}
                onClick={() => handleNavigation("News")}
              >
                News
              </button>

              {/* Congress button */}
              <button
                className={`px-4 py-3 transition-colors hover:bg-black hover:text-white ${
                  activeNavItem === "congress" ? "bg-black text-white" : ""
                }`}
                onClick={() => handleNavigation("Congress")}
              >
                Congress
              </button>
            </div>
          </nav>
  
          <div className="hidden lg-custom:flex items-center gap-4">
            {/* Desktop right‐side controls (weather, music, cursor, theme) */}
            <div className="hidden lg-custom:block">
              <div
                className="bg-white dark:bg-gray-900 blue:bg-blue-50 border border-black shadow-lg flex items-center"
                style={{ width: "420px", height: "46px", overflow: "hidden" }}
              >
                {showWeatherTime ? (
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
                  <>
                    <button
                      onClick={togglePlayPause}
                      className="px-3 py-3 border-r border-black flex items-center justify-center"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <div className="flex-1 px-4 flex items-center">
                      <Slider
                        value={[volume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="w-full"
                      />
                    </div>
                    <div className="border-l border-black px-3 py-3 flex items-center">
                      {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      <span className="ml-1 text-xs">{volume}%</span>
                    </div>
                    <button
                      onClick={() => setShowSongInfo(!showSongInfo)}
                      className="border-l border-black px-3 py-3 flex items-center justify-center relative"
                      title="rain sounds - for focus and relaxation"
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
                  cursorTools.map((tool, index) => (
                    <CursorPreview
                      key={index}
                      name={tool.name}
                      previewSrc={tool.preview}
                      isActive={activeCursorTool === tool.name}
                      onClick={() => handleCursorSelect(tool)}
                    />
                  ))
                )}
              </div>
            </div>
  
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
                title={mounted ? `Current theme: ${theme || "light"} - Click to cycle themes` : undefined}
              >
                {mounted ? getThemeIcon() : null}
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
