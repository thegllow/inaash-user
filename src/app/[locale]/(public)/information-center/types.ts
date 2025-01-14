export interface InfoCenterResponse {
  status: boolean
  message: string
  data: Data
  guard: null
  errors: null
  response_code: number
  request_body: any[]
}

export interface Data {
  items: Result[]
}

export interface Result {
  id: string
  user_id: string
  video_id: string
  answer_average: string
  hearts: string
  total_questions: string
  correct_answers: string
  progress: string
  lang: string
  evaluation: string
  current_time: string
  last_question_id: string
  view_counter: string
  view_complete_counter: string
  is_rated: string
  price: string
  coupon_id: string
  coupon_code: string
  discount_value: string
  final_price: string
  paid: string
  outstanding_payment: string
  status: string
  certificate_url: null
  certificate_qr_code: string
  certificate_number: string
  deleted_at: null
  video: Video
  user: User
}

export interface User {
  id: string
  mobile: string
  first_name: string
  last_name: string
  full_name: string
  lang: string
  email: string
  deleted_at: null
}

export interface Video {
  id: string
  video_url: string
  logo: string
  title: string
  description: string
  length: string
  price: string
  final_price: null
  discount: string
  view_counter: string
  view_complete_counter: string
  deleted_at: null
}
