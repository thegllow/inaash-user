import InaashApi from "@/services/inaash"
import { UserVideoResponse } from "./types"
import React from "react"

export const getUserVideo = React.cache(async (video_id: string) => {
  const response = await InaashApi.get<UserVideoResponse>(`/user/user-videos/${video_id}`)
  return response.data.data.item
})
