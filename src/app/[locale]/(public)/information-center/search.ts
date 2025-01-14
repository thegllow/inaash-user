import { InaashApiGuest } from "@/services/inaash"
import { InfoCenterResponse } from "./types"

export const GetSearch = async (q: string) => {
  const response = await InaashApiGuest.get<InfoCenterResponse>(`/certificates/${q}`)

  return response.data.data.items
}
