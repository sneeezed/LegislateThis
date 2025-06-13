"use client"

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react"

interface AudioContextType {
  // Audio state
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number

  // Audio controls
  play: () => void
  pause: () => void
  setVolume: (volume: number) => void
  seek: (time: number) => void

  // UI state
  showSongInfo: boolean
  setShowSongInfo: (show: boolean) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(70)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showSongInfo, setShowSongInfo] = useState(false)

  // Initialize audio element once
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio("/rainSounds.mp3")
      audioRef.current.volume = volume / 100
      audioRef.current.preload = "metadata"

      const audio = audioRef.current

      // Event listeners
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
      const handleDurationChange = () => setDuration(audio.duration)
      const handleEnded = () => setIsPlaying(false)
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)

      audio.addEventListener("timeupdate", handleTimeUpdate)
      audio.addEventListener("durationchange", handleDurationChange)
      audio.addEventListener("ended", handleEnded)
      audio.addEventListener("play", handlePlay)
      audio.addEventListener("pause", handlePause)

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate)
        audio.removeEventListener("durationchange", handleDurationChange)
        audio.removeEventListener("ended", handleEnded)
        audio.removeEventListener("play", handlePlay)
        audio.removeEventListener("pause", handlePause)
      }
    }
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        currentTime,
        duration,
        play,
        pause,
        setVolume,
        seek,
        showSongInfo,
        setShowSongInfo,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider")
  }
  return context
}
