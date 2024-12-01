/* eslint-disable @next/next/no-img-element */
"use client"
import ReactPlayer from "react-player"
import { useVideos } from "../context/courses-context"
import { useCourseStore } from "../store/course-store-provider"
import React from "react"
import { timeToSeconds } from "../utils/time-to-seconds"

const ColoredCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none">
    <g filter="url(#filter0_b_255_821)">
      <circle cx="39" cy="39" r="39" fill="#10F92B" fillOpacity="0.18" />
    </g>
    <defs>
      <filter
        id="filter0_b_255_821"
        x="-48.75"
        y="-48.75"
        width="175.5"
        height="175.5"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="24.375" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_255_821" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_255_821" result="shape" />
      </filter>
    </defs>
  </svg>
)
interface VideoPlayerProps {
  src: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const { currentVideo } = useVideos()
  const { questionsMap, lastQuestion, playing, setCurrentQuestion, volume } = useCourseStore((state) => state)

  const [isReady, setIsReady] = React.useState(false)
  const playerRef = React.useRef<ReactPlayer>(null)

  const onReady = React.useCallback(() => {
    if (!isReady && playerRef.current) {
      const timeToStart = timeToSeconds(currentVideo.current_time)
      playerRef.current.seekTo(timeToStart, "seconds")
      setIsReady(true)
    }
  }, [isReady])
  return (
    <ReactPlayer
      ref={playerRef}
      onReady={onReady}
      onProgress={({ playedSeconds, played }) => {
        const sec = playedSeconds.toFixed()
        if (sec == lastQuestion) return
        const question = questionsMap.get(sec)
        if (question) setCurrentQuestion(sec)
      }}
      playing={playing}
      light={
        <div className="h-full w-full">
          <img
            src={currentVideo.video.logo}
            className="h-full w-full object-cover object-center"
            alt="cover"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ColoredCircle />
          </div>
        </div>
      }
      width="100%"
      height="100%"
      url={src}
      volume={volume}
    />
  )
}

export default VideoPlayer
