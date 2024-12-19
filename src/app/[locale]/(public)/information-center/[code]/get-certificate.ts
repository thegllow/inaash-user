import { UserVideoResponse } from "@/app/[locale]/(video)/course/[course_id]/types"
import { InaashApiGuest } from "@/services/inaash"
import React from "react"

export const getCertificate = React.cache(async (code: string) => {
  const response = await InaashApiGuest.get<UserVideoResponse>(`/certificates/${code}`)
  return response.data.data.item
})
