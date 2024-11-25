"use client"
import { Video } from "@/types"
import React, { createContext, useContext, useState } from "react"

const VideosContext = createContext<[Video[], React.Dispatch<React.SetStateAction<Video[]>>] | null>(null)

export const VideosProvider = ({ children, videos }: { children: React.ReactNode; videos: Video[] }) => {
  const state = useState(videos)
  return <VideosContext.Provider value={state}>{children}</VideosContext.Provider>
}

export const useVideos = () => {
  const value = useContext(VideosContext)
  if (!value) throw new Error("useVideos should be VideosContext")

  return value
}
