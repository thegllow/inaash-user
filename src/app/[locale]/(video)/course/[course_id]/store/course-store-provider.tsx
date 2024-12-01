// src/providers/counter-store-provider.tsx
"use client"

import { type ReactNode, createContext, useContext, useRef } from "react"
import { useStore } from "zustand"
import { useShallow } from "zustand/react/shallow"

import { UserVideo } from "../types"
import { arrayToMapByKey } from "../utils/array-to-map-by-key"
import { CourseState, CourseStore, createCourseStore } from "./course-store"

export type CourseStoreApi = ReturnType<typeof createCourseStore>

export const CourseStoreContext = createContext<CourseStoreApi | undefined>(undefined)

export interface CourseStoreProviderProps {
  children: ReactNode
  video: UserVideo
}

export const CourseStoreProvider = ({ children, video }: CourseStoreProviderProps) => {
  const storeRef = useRef<CourseStoreApi>()
  if (!storeRef.current) {
    const scenesMap = arrayToMapByKey(video.video.scenes, "start_time")
    const questionsMap = arrayToMapByKey(video.video.questions, "appears_at")
    const initialState: CourseState = {
      video,
      scenesMap,
      questionsMap,
      currentQuestion: "",
      playing: true,
      lastQuestion: "",
      totalQuestions: video.video.scenes.length,
      correctlyAnsweredQuestions: 0,
      hearts: 5,
      answerRate: "00:00",
      progress: "0",
    }
    storeRef.current = createCourseStore(initialState)
  }

  return <CourseStoreContext.Provider value={storeRef.current}>{children}</CourseStoreContext.Provider>
}

export const useCourseStore = <T,>(selector: (store: CourseStore) => T): T => {
  const courseStoreContext = useContext(CourseStoreContext)

  if (!courseStoreContext) {
    throw new Error(`useCourseStore must be used within CourseStoreProvider`)
  }

  return useStore(courseStoreContext, useShallow(selector))
}
