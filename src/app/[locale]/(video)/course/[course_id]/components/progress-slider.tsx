import React from "react"
import { Slider } from "@nextui-org/slider"

type Props = {
  progress: number
}

const ProgressSlider = ({ progress }: Props) => {
  return (
    <div className="w-full max-w-[175px] shrink-0" dir="ltr">
      <Slider
        value={progress}
        isDisabled
        className="!opacity-100"
        size="sm"
        step={0.5}
        maxValue={100}
        minValue={0}
        defaultValue={0}
        color="primary"
        renderThumb={(props) => (
          <div
            {...props}
            className="group top-1/2 flex cursor-grab items-center justify-center rounded bg-primary px-3 py-1">
            <span className="block text-foreground">{progress}%</span>
          </div>
        )}
      />
    </div>
  )
}

export default ProgressSlider
