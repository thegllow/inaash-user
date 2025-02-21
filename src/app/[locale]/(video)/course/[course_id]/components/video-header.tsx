"use client"

import { Button } from "@nextui-org/button"
import { Divider } from "@nextui-org/divider"
import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import Hearts from "./hearts"
import ProgressSlider from "./progress-slider"
import Score from "./socre"
import Speed from "./speed"
import { useRouter } from "@/lib/i18n/navigation"
import { useCourseStore } from "../store/course-store-provider"
import { timeToSeconds } from "../utils/time-to-seconds"
import FullScreenButton from "@/components/common/full-screen-button"

type Props = {}

const VideoHeader = (props: Props) => {
  const Router = useRouter()
  const state = useCourseStore((state) => state)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0A090994] backdrop-blur-2xl">
      <div className="grid landscape-header grid-cols-[100px_1fr_100px] gap-2 ~px-4/6 ~md/lg:~py-1/2">
        <div className="flex items-center">
          <Button onClick={() => Router.push("/start")} isIconOnly variant="light">
            <CircleArrowRight strokeWidth={1.2} className="small-icon ~md/lg:~size-5/6 ltr:hidden" />
            <CircleArrowLeft strokeWidth={1.2} className="small-icon ~md/lg:~size-5/6 rtl:hidden" />
          </Button>
        </div>

        <div className="flex items-center justify-center ~md/xl:~gap-4/10">
          <ProgressSlider progress={Number(state.progress)} />
          <Divider orientation="vertical" />
          <Score
            rightAnswers={Number(state.correctlyAnsweredQuestions)}
            totalNumber={Number(state.totalQuestions)}
          />
          <Divider orientation="vertical" />
          <Hearts hearts={Number(state.hearts)} />
          <Divider orientation="vertical" />
          <Speed time={timeToSeconds(state.answerRate) + ""} />
        </div>
        <div className="flex items-center justify-center">
          <FullScreenButton />
        </div>
      </div>
    </header>
  )
}

export default VideoHeader
