import React, { ElementRef, useImperativeHandle, useRef, useState } from "react"
import { useForceUpdate } from "@mantine/hooks"
import { Pause, Play } from "lucide-react"
import { Slider } from "@nextui-org/slider"
import { Button } from "@nextui-org/button"
import { Divider } from "@nextui-org/divider"

const AudioPlayer = React.forwardRef(function Comp(
  { src, name, onEnd }: { src: string; name: string; onEnd?: () => void },
  ref: React.ForwardedRef<ElementRef<"audio">>,
) {
  const audioUrl = src
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<ElementRef<"audio">>(null)
  useImperativeHandle(ref, () => audioRef.current!, [audioRef])

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current!.pause()
    } else {
      audioRef.current!.play()
    }
    setIsPlaying(!isPlaying)
  }

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current!.currentTime)
  }

  const handleTimeChange = (value: number) => {
    audioRef.current!.currentTime = value
    setCurrentTime(value)
  }
  const forceUpdate = useForceUpdate()

  return (
    <div className="relative flex w-full items-center gap-2 rounded-full border-2 border-primary p-2 px-4">
      <audio
        onEnded={(e) => {
          setIsPlaying(false)
          handleTimeChange(0)
          onEnd?.()
        }}
        onLoadedMetadata={forceUpdate}
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={updateCurrentTime}
      />

      <p className="w-1/2 text-center text-sm font-semibold text-primary">{name}</p>
      <Divider orientation="vertical" />
      <div dir="ltr" className="flex w-1/2 items-center gap-1">
        <div dir="ltr" className="w-full">
          <Slider
            aria-label="time line"
            size="sm"
            color="primary"
            minValue={0}
            step={0.01}
            maxValue={audioRef.current?.duration || 100}
            value={currentTime}
            onChange={(time) => {
              handleTimeChange(time as number)
            }}
          />
        </div>

        <Button size="sm" isIconOnly variant="light" onClick={togglePlayPause}>
          {isPlaying ? <Pause color="white" size={24} /> : <Play color="white" size={24} />}
        </Button>
      </div>
    </div>
  )
})

export default AudioPlayer
