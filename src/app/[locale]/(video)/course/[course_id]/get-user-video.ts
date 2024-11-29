import InaashApi from "@/services/inaash"
import { UserVideoResponse } from "./types"

export const getUserVideo = async (video_id: string) => {
    const response = await InaashApi.get<UserVideoResponse>(`/user/user-videos/${video_id}`)
    return response.data.data.item

}