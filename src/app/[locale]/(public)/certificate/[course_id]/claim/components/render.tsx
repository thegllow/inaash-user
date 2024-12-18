"use client"
import { parseAsNumberLiteral, useQueryState } from "nuqs"
import Rating from "./rating"
import UserInfo from "./user-info"
import { useVideo } from "../../context/video-context"
import { useEffect } from "react"

type Props = {}

const Render = (props: Props) => {
  const [step, setStep] = useQueryState("step", parseAsNumberLiteral([1, 2, 3]).withDefault(1))
  const video = useVideo()
  useEffect(() => {
    if (video.is_rated != "0") setStep(2)
  }, [])

  switch (step) {
    case 1:
      return <Rating />
    case 2:
      return <UserInfo />
  }
}

export default Render
