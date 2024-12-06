import { Slider } from "@nextui-org/slider"
import { Volume2 } from "lucide-react"
import React from "react"
import { useCourseStore } from "../store/course-store-provider"

type Props = {}

const SoundSlider = (props: Props) => {
  const { volume, changeVolume } = useCourseStore((state) => ({
    volume: state.volume,
    changeVolume: state.changeVolume,
  }))
  console.log("🚀 ~ const{volume,changeVolume}=useCourseStore ~ volume:", volume)
  return (
    <div className="flex items-center gap-3 text-foreground">
      <div dir="ltr" className="min-w-20">
        <Slider
          aria-label="sound volume"
          color="foreground"
          size="sm"
          step={0.1}
          maxValue={1}
          minValue={0}
          value={volume}
          onChange={(value) => {
            changeVolume(value as number)
          }}
        />
      </div>
      <Volume2 />
    </div>
  )
}

export default SoundSlider
