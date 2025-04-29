import type React from "react"
import { createContext, useState, useContext, useEffect, useRef } from "react"

type AudioContextType = {
  audioUrl: string | null
  isPlaying: boolean
  currentTrack: any | null
  duration: number
  currentTime: number
  playTrack: (track: any) => void
  pauseTrack: () => void
  resumeTrack: () => void
  seekTo: (time: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<any | null>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio()

      // Set up event listeners
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      })

      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0)
      })

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
      })
    }

    return () => {
      // Clean up
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  const playTrack = async (track: any) => {
    try {
      // Fetch audio URL if not provided directly
      if (!track.audio_url) {
        const response = await fetch(`${import.meta.env.VITE_Hosted_API}/audio?id=${track.id}`)
        const data = await response.json()
        if (data.audio_url) {
          setAudioUrl(data.audio_url)
          if (audioRef.current) {
            audioRef.current.src = data.audio_url
            audioRef.current.play()
            setIsPlaying(true)
            setCurrentTrack(track)
          }
        } else {
          console.error("Failed to fetch audio URL")
        }
      } else {
        // If audio URL is already provided
        setAudioUrl(track.audio_url)
        if (audioRef.current) {
          audioRef.current.src = track.audio_url
          audioRef.current.play()
          setIsPlaying(true)
          setCurrentTrack(track)
        }
      }
    } catch (error) {
      console.error("Error playing track:", error)
    }
  }

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resumeTrack = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <AudioContext.Provider
      value={{
        audioUrl,
        isPlaying,
        currentTrack,
        duration,
        currentTime,
        playTrack,
        pauseTrack,
        resumeTrack,
        seekTo,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
