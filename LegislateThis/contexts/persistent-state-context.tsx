"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AppState {
  // Cursor state
  activeCursorTool: string
  currentCursor: string

  // UI state
  activeRightButton: string
  showMusicPlayer: boolean
  heartClicked: boolean
}

interface PersistentStateContextType extends AppState {
  setActiveCursorTool: (tool: string) => void
  setCurrentCursor: (cursor: string) => void
  setActiveRightButton: (button: string) => void
  setShowMusicPlayer: (show: boolean) => void
  setHeartClicked: (clicked: boolean) => void
  resetCursor: () => void
}

const defaultState: AppState = {
  activeCursorTool: "",
  currentCursor: "default",
  activeRightButton: "cursor",
  showMusicPlayer: false,
  heartClicked: false,
}

const PersistentStateContext = createContext<PersistentStateContextType | undefined>(undefined)

export function PersistentStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState)

  // Apply cursor immediately without localStorage delays
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.cursor = state.currentCursor
      document.documentElement.style.cursor = state.currentCursor

      return () => {
        document.body.style.cursor = "default"
        document.documentElement.style.cursor = "default"
      }
    }
  }, [state.currentCursor])

  const updateState = (updates: Partial<AppState>) => {
    setState((prevState) => ({ ...prevState, ...updates }))
  }

  const contextValue: PersistentStateContextType = {
    ...state,
    setActiveCursorTool: (tool: string) => updateState({ activeCursorTool: tool }),
    setCurrentCursor: (cursor: string) => updateState({ currentCursor: cursor }),
    setActiveRightButton: (button: string) => updateState({ activeRightButton: button }),
    setShowMusicPlayer: (show: boolean) => updateState({ showMusicPlayer: show }),
    setHeartClicked: (clicked: boolean) => updateState({ heartClicked: clicked }),
    resetCursor: () => updateState({ activeCursorTool: "", currentCursor: "default" }),
  }

  return <PersistentStateContext.Provider value={contextValue}>{children}</PersistentStateContext.Provider>
}

export function usePersistentState() {
  const context = useContext(PersistentStateContext)
  if (!context) {
    throw new Error("usePersistentState must be used within a PersistentStateProvider")
  }
  return context
}
