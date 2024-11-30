"use client"
import { Question, Scene } from "@/types/video"
import React, { createContext, useContext } from "react"
import { UserVideo } from "../types"
import { arrayToMapByKey } from "../utils/array-to-map-by-key"

const VideoContext = createContext<{
  video: UserVideo
  scenesMap: Map<string, Scene>
  questionsMap: Map<string, Question>
} | null>(null)

export const VideoStateProvider = ({ children, video }: { children: React.ReactNode; video: UserVideo }) => {
  const scenesMap = arrayToMapByKey(video.video.scenes, "start_time")
  const questionsMap = arrayToMapByKey(video.video.questions, "appears_at")
  const data = {
    video,
    scenesMap,
    questionsMap,
  }
  return <VideoContext.Provider value={data}>{children}</VideoContext.Provider>
}

export const useVideoState = () => {
  const value = useContext(VideoContext)
  if (!value) throw new Error("useVideoState should be VideoContext")

  return value
}
