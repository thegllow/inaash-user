import { Slider } from "@nextui-org/slider"
import { Volume2 } from "lucide-react"
import React from "react"

type Props = {}

const SoundSlider = (props: Props) => {
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
          defaultValue={0.5}
        />
      </div>
      <Volume2 />
    </div>
  )
}

export default SoundSlider
