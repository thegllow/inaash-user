import InaashApi from "@/services/inaash"
import { VideosResponse } from "./type"

export const getVideos = async () => {
  const response = await InaashApi.get<VideosResponse>("/guest/videos")
  return response.data.data.items.data
}
