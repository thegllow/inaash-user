import { Slider } from "@nextui-org/slider"
import { Volume2, VolumeOff } from "lucide-react"
import React, { useState } from "react"
import { useCourseStore } from "../store/course-store-provider"
import { Button } from "@nextui-org/button"

type Props = {}

const SoundSlider = (props: Props) => {
  const { volume, changeVolume } = useCourseStore((state) => ({
    volume: state.volume,
    changeVolume: state.changeVolume,
  }))
  const [old, setOld] = useState(0)

  const toggleVolume = () => {
    changeVolume(old)
    setOld(volume)
  }
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
            setOld(0)
          }}
        />
      </div>
      <Button onPress={toggleVolume} variant="light" isIconOnly>
        {volume === 0 ? <VolumeOff /> : <Volume2 />}
      </Button>
    </div>
  )
}

export default SoundSlider
