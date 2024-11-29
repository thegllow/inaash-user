import { Video } from "@/types/video"

export interface VideoResponse {
  status: boolean
  message: string
  data: Data
  guard: string
  errors: null
  response_code: number
}

export interface Data {
  item: Video
}

export interface UserVideoResponse {
  status: boolean
  message: string
  data: {
    item: UserVideo
  }
  guard: string
  errors: null
  response_code: number
  request_body: null
}

export interface UserVideo {
  id: string
  user_id: string
  video_id: string
  answer_average: string
  hearts: string
  total_questions: string
  correct_answers: string
  progress: string
  lang: string
  current_time: string
  last_question_id: null
  certificate_url: null
  certificate_qr_code: null
  certificate_number: null
  deleted_at: null
  video: Video
}
