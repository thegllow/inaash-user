import { InaashApiGuest } from "@/services/inaash"
import React from "react"
import { InfoCenterResponse } from "../types"

export const getCertificate = React.cache(async (code: string) => {
  console.log("🚀 ~ getCertificate ~ code:", code)
  const response = await InaashApiGuest.get<InfoCenterResponse>(`/certificates/${code}`)
  return response.data.data.items[0]
})
