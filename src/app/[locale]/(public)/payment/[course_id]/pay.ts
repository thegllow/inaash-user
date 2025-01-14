import InaashApi from "@/services/inaash"

type Args = {
  video_id: string
  coupon?: string
}
export const Pay = async (data: Args) => {
  const paymentResponse = await InaashApi.post(`/user/user-videos`, data)
  return paymentResponse.data
}
