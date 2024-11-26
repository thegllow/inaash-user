"use client"

import { Button } from "@nextui-org/button"
import { Divider } from "@nextui-org/divider"
import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import Hearts from "./hearts"
import ProgressSlider from "./progress-slider"
import Score from "./socre"
import Speed from "./speed"
import { useRouter } from "@/lib/i18n/navigation"

type Props = {}

const VideoHeader = (props: Props) => {
  const Router = useRouter()
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0A090994] backdrop-blur-2xl">
      <div className="grid grid-cols-[100px_1fr_100px] py-2 ~px-4/6">
        <div className="flex items-center ~gap-4/10">
          <Button onClick={() => Router.back()} isIconOnly variant="light">
            <CircleArrowRight strokeWidth={1.2} className="size-6 ltr:hidden" />
            <CircleArrowLeft strokeWidth={1.2} className="size-6 rtl:hidden" />
          </Button>
        </div>

        <div className="flex items-center justify-center ~md/xl:~gap-6/12">
          <ProgressSlider progress={0} />
          <Divider orientation="vertical" />
          <Score rightAnswers={5} totalNumber={10} />
          <Divider orientation="vertical" />
          <Hearts hearts={3} />
          <Divider orientation="vertical" />
          <Speed time="40.20" />
        </div>
        <div className=""></div>
      </div>
    </header>
  )
}

export default VideoHeader
