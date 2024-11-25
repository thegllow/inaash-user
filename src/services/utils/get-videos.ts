import InaashApi from "@/services/inaash"
import { VideosResponse } from "@/types/public-videos-response"

export const getVideos = async () => {
  const response = await InaashApi.get<VideosResponse>("/guest/videos")
  return { videos: response.data.data.items.data, content: response.data.data.helpers.introduction }
}
