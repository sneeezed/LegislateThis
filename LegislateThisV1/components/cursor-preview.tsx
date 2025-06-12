"use client"

import { useState } from "react"

interface CursorPreviewProps {
  name: string
  cursorPath: string
  isActive: boolean
  onClick: () => void
  className?: string
}

export function CursorPreview({ name, cursorPath, isActive, onClick, className = "" }: CursorPreviewProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  // Extract the URL from the cursor CSS value
  const getCursorUrl = (cursorValue: string) => {
    const match = cursorValue.match(/url$$['"]?([^'"]+)['"]?$$/)
    return match ? match[1] : null
  }

  const cursorUrl = getCursorUrl(cursorPath)

  return (
    <button
      className={`px-3 py-3 border-r border-black last:border-r-0 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 blue:hover:bg-blue-100 autumn:hover:bg-orange-100 sage:hover:bg-green-100 lavender:hover:bg-purple-100 relative ${
        isActive
          ? "border-2 border-black bg-gray-100 dark:bg-gray-800 blue:bg-blue-100 autumn:bg-orange-100 sage:bg-green-100 lavender:bg-purple-100 shadow-inner"
          : ""
      } ${className}`}
      onClick={onClick}
      title={`${name} cursor`}
    >
      <div className={`flex items-center justify-center ${isActive ? "scale-110" : ""} transition-transform`}>
        {!imageError && cursorUrl ? (
          <img
            src={cursorUrl || "/placeholder.svg"}
            alt={`${name} cursor preview`}
            className="w-5 h-5 object-contain"
            onError={handleImageError}
            draggable={false}
          />
        ) : (
          // Fallback to a generic cursor icon if .cur file fails to load
          <div className="w-5 h-5 flex items-center justify-center text-xs font-bold border border-current rounded">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full"></div>
      )}
    </button>
  )
}
