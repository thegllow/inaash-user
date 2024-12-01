// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla"
import { UserVideo } from "../types"
import { Question, Scene } from "@/types/video"

export type VideoStatus = {
  correctlyAnsweredQuestions: string
  hearts: string
  answerRate: string
  progress: string
}
export type CourseState = {
  video: UserVideo
  playing: boolean
  scenesMap: Map<string, Scene>
  questionsMap: Map<string, Question>
  currentQuestion: string
  lastQuestion: string
  volume: number
  totalQuestions: string
} & VideoStatus

export type CourseActions = {
  setCurrentQuestion: (question: string) => void
  removeCurrentQuestion: () => void

  setAnswerRate: (arg: string) => void
  setProgress: (arg: string) => void
  updateVideoStatus: (arg: VideoStatus) => void
  changeVolume: (arg: number) => void
}

export type CourseStore = CourseState & CourseActions

export const createCourseStore = (initState: CourseState) => {
  return createStore<CourseStore>()((set) => ({
    ...initState,
    setCurrentQuestion: (currentQuestion) =>
      set((state) => ({ currentQuestion, lastQuestion: currentQuestion, playing: false })),
    removeCurrentQuestion: () => set((state) => ({ currentQuestion: "", playing: true })),

    setAnswerRate: (arg) => set(() => ({ answerRate: arg })),
    setProgress: (arg) => set(() => ({ progress: arg })),
    updateVideoStatus(arg) {
      set({ ...arg })
    },
    changeVolume(arg) {
      set({ volume: arg })
    },
  }))
}
