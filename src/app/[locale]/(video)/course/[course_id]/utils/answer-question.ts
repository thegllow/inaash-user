import InaashApi from "@/services/inaash"
import { AnswerQuestion, TVariables } from "../types/answer-question"

export const answerQuestion = async (data: TVariables) => {
  const response = await InaashApi.post<AnswerQuestion>(`/user/user-videos/check-answer`, data)
  return response.data.data
}
