// src/stores/counter-store.ts
import { Question, Scene } from "@/types/video"
import { createStore } from "zustand/vanilla"
import { UserVideo } from "../types"

export type VideoStatus = {
  correctlyAnsweredQuestions: string
  hearts: string
  answerRate: string
  progress: string
}

export type AnswerStatus = "notAnswered" | "correct" | "wrong"
export type CourseState = {
  video: UserVideo
  playing: boolean
  scenesMap: Map<string, Scene>
  questionsMap: Map<string, Question>
  currentQuestion: string
  lastQuestion: string
  volume: number
  totalQuestions: string
  selectedAnswer: string
  answerStatus: AnswerStatus
  showExplanation: boolean
} & VideoStatus

export type CourseActions = {
  setCurrentQuestion: (question: string) => void
  removeCurrentQuestion: () => void
  setAnswerRate: (arg: string) => void
  setAnswerStatus: (arg: AnswerStatus) => void
  setProgress: (arg: string) => void
  setSelectedAnswer: (arg: string) => void
  updateVideoStatus: (arg: VideoStatus) => void
  changeVolume: (arg: number) => void
  setShowExplanation: (arg: boolean) => void
}

export type CourseStore = CourseState & CourseActions

export const createCourseStore = (initState: CourseState) => {
  return createStore<CourseStore>()((set) => ({
    ...initState,
    setCurrentQuestion: (currentQuestion) =>
      set((state) => ({ currentQuestion, lastQuestion: currentQuestion, playing: false })),
    removeCurrentQuestion: () =>
      set((state) => ({
        currentQuestion: "",
        selectedAnswer: "",
        answerStatus: "notAnswered",
        showExplanation: false,
        playing: true,
      })),
    setSelectedAnswer: (arg) => set(() => ({ selectedAnswer: arg })),
    setAnswerRate: (arg) => set(() => ({ answerRate: arg })),
    setProgress: (arg) => set(() => ({ progress: arg })),
    setAnswerStatus: (arg) => set(() => ({ answerStatus: arg })),
    setShowExplanation: (arg) => set(() => ({ showExplanation: arg })),
    updateVideoStatus(arg) {
      set({ ...arg })
    },
    changeVolume(arg) {
      set({ volume: arg })
    },
  }))
}
