import InaashApi from "@/services/inaash"
type Args = {
  video_id: string
  rate_1: number
  rate_2: number
  rate_3: number
  rate_4: number
  comment: string
}
export const PostRate = async (data: Args) => {
  const response = await InaashApi.post(`/user/rates`, data)
  return response
}
