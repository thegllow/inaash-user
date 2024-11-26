import InaashApi from "@/services/inaash"
import { VideoResponse } from "./types"
import React from "react"

export const getVideo = React.cache(async (video_id: string) => {
  const response = await InaashApi.get<VideoResponse>(`/user/videos/${video_id}`)
  return response.data.data.item
})
