"use client"
import { parseAsNumberLiteral, useQueryState } from "nuqs"
import Rating from "./rating"
import UserInfo from "./user-info"
import { useVideo } from "../../context/video-context"
import { useEffect } from "react"
import { User } from "@/app/[locale]/(public)/profile/types"
import { useRouter } from "@/lib/i18n/navigation"
import { useParams } from "next/navigation"

type Props = {
  user: User
}

const Render = ({ user }: Props) => {
  const [step, setStep] = useQueryState("step", parseAsNumberLiteral([1, 2, 3]).withDefault(1))
  const video = useVideo()
  const { course_id } = useParams() as { course_id: string }
  const Router = useRouter()
  if (user.full_name && step === 2) Router.push(`/certificate/${course_id}/view`)
  useEffect(() => {
    if (video.is_rated != "0") setStep(2)
  }, [video.is_rated, setStep])

  switch (step) {
    case 1:
      return <Rating />
    case 2:
      return <UserInfo />
  }
}

export default Render
