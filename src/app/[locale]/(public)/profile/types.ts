export interface UserResponse {
  status: boolean
  message: string
  data: Data
  guard: string
  errors: null
  response_code: number
}

export interface Data {
  item: User
}

export interface User {
  id: string
  mobile: string
  first_name: null | string
  last_name: null | string
  full_name: null | string
  lang: string
  email: null | string
  deleted_at: null | string
}
