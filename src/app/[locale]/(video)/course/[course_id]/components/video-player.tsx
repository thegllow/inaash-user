"use client"
import ReactPlayer from "react-player"
import { useCourseStore } from "../store/course-store-provider"
import { useState } from "react"

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
  const { questionsMap, lastQuestion, playing, setCurrentQuestion } = useCourseStore((state) => state)

  return (
    <ReactPlayer
      onProgress={({ playedSeconds, played, loadedSeconds, loaded }) => {
        console.log("🚀 ~ playedSeconds:", playedSeconds)
        console.log("🚀 ~ played:", played)
        const sec = playedSeconds.toFixed()
        if (sec == lastQuestion) return
        const question = questionsMap.get(sec)
        if (question) setCurrentQuestion(sec)
        console.log("🚀 ~ question:", question)
      }}
      playing={playing}
      light={
        <div>
          <ColoredCircle />
        </div>
      }
      width="100%"
      height="100%"
      url={src}
    />
  )
}

export default VideoPlayer
