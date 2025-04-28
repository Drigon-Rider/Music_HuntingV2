import { useState } from "react"
import { useAudio } from "./Audio/AudioContext"
import { DownloadButton } from "./Downloadbutton"

export const MiniPlayer = () => {
  const { isPlaying, currentTrack, duration, currentTime, pauseTrack, resumeTrack, seekTo } = useAudio()
  const [isExpanded, setIsExpanded] = useState(false)

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // If no track is playing, don't render the player
  if (!currentTrack) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 z-50 ${
        isExpanded ? "h-32" : "h-16"
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center h-16">
          {/* Thumbnail */}
          <div className="h-10 w-10 mr-3">
            {currentTrack.thumbnails && currentTrack.thumbnails[0] && (
              <img
                src={currentTrack.thumbnails[0] || "/placeholder.svg"}
                alt={currentTrack.title}
                className="h-full w-full object-cover rounded"
              />
            )}
          </div>

          {/* Track info */}
          <div className="flex-1 mr-4 overflow-hidden">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-gray-500 truncate">{currentTrack.channel}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Play/Pause button */}
            <button
              onClick={isPlaying ? pauseTrack : resumeTrack}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            < DownloadButton result={currentTrack} />

            {/* Expand/Collapse button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Expanded view */}
        {isExpanded && (
          <div className="pt-1 pb-3">
            {/* Progress bar */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
              <div className="flex-1 relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-xs text-gray-500">{formatTime(duration)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
