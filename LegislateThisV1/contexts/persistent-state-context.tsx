"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Interface for state that should be persisted in localStorage
interface PersistentData {
  // Music player state
  volume: number
  isPlaying: boolean

  // Cursor state
  activeCursorTool: string
  currentCursor: string
}

// Interface for all state (both persistent and non-persistent)
interface AppState extends PersistentData {
  // Non-persistent UI state
  activeRightButton: string
  showMusicPlayer: boolean
  showSongInfo: boolean
  heartClicked: boolean
}

interface PersistentStateContextType extends AppState {
  // Cursor actions
  setActiveCursorTool: (tool: string) => void
  setCurrentCursor: (cursor: string) => void

  // Music player actions
  setShowMusicPlayer: (show: boolean) => void
  setIsPlaying: (playing: boolean) => void
  setVolume: (volume: number) => void
  setShowSongInfo: (show: boolean) => void

  // UI actions
  setActiveRightButton: (button: string) => void
  setHeartClicked: (clicked: boolean) => void

  // Reset actions
  resetCursor: () => void
}

// Default values for persistent data
const defaultPersistentData: PersistentData = {
  volume: 70,
  isPlaying: false,
  activeCursorTool: "",
  currentCursor: "default",
}

// Default values for all state
const defaultState: AppState = {
  ...defaultPersistentData,
  activeRightButton: "cursor", // Default to cursor selector being active
  showMusicPlayer: false,
  showSongInfo: false,
  heartClicked: false,
}

const PersistentStateContext = createContext<PersistentStateContextType | undefined>(undefined)

export function PersistentStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load only persistent data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedData = localStorage.getItem("legislate-this-persistent")
        if (savedData) {
          const parsedData = JSON.parse(savedData) as Partial<PersistentData>
          setState((prevState) => ({ ...prevState, ...parsedData }))
        }
      } catch (error) {
        console.error("Error loading state from localStorage:", error)
      }
      setIsLoaded(true)
    }
  }, [])

  // Save only persistent data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        // Extract only the persistent data to save
        const persistentData: PersistentData = {
          volume: state.volume,
          isPlaying: state.isPlaying,
          activeCursorTool: state.activeCursorTool,
          currentCursor: state.currentCursor,
        }
        localStorage.setItem("legislate-this-persistent", JSON.stringify(persistentData))
      } catch (error) {
        console.error("Error saving state to localStorage:", error)
      }
    }
  }, [state.volume, state.isPlaying, state.activeCursorTool, state.currentCursor, isLoaded])

  // Apply cursor style to body with enhanced error handling
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        // Apply the cursor style to the document body
        document.body.style.cursor = state.currentCursor

        // Also apply to html element for better coverage
        document.documentElement.style.cursor = state.currentCursor

        return () => {
          document.body.style.cursor = "default"
          document.documentElement.style.cursor = "default"
        }
      } catch (error) {
        console.error("Error applying cursor style:", error)
        // Fallback to default cursor
        document.body.style.cursor = "default"
      }
    }
  }, [state.currentCursor, isLoaded])

  const updateState = (updates: Partial<AppState>) => {
    setState((prevState) => ({ ...prevState, ...updates }))
  }

  const contextValue: PersistentStateContextType = {
    ...state,

    // Cursor actions
    setActiveCursorTool: (tool: string) => updateState({ activeCursorTool: tool }),
    setCurrentCursor: (cursor: string) => updateState({ currentCursor: cursor }),

    // Music player actions
    setShowMusicPlayer: (show: boolean) => updateState({ showMusicPlayer: show }),
    setIsPlaying: (playing: boolean) => updateState({ isPlaying: playing }),
    setVolume: (volume: number) => updateState({ volume }),
    setShowSongInfo: (show: boolean) => updateState({ showSongInfo: show }),

    // UI actions
    setActiveRightButton: (button: string) => updateState({ activeRightButton: button }),
    setHeartClicked: (clicked: boolean) => updateState({ heartClicked: clicked }),

    // Reset actions
    resetCursor: () => updateState({ activeCursorTool: "", currentCursor: "default" }),
  }

  // Don't render until state is loaded to prevent hydration mismatches
  if (!isLoaded) {
    return null
  }

  return <PersistentStateContext.Provider value={contextValue}>{children}</PersistentStateContext.Provider>
}

export function usePersistentState() {
  const context = useContext(PersistentStateContext)
  if (context === undefined) {
    throw new Error("usePersistentState must be used within a PersistentStateProvider")
  }
  return context
}
