"use client"

import { logo } from "@/assets"
import ReactPlayer from "react-player"
import { useVideoState } from "../context/video-context.tsx"

interface VideoPlayerProps {
  src: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const {} = useVideoState()
  return (
    <ReactPlayer
      onProgress={(state) => {
        console.log(state)
      }}
      playing
      light={
        <div>
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
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_255_821"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      }
      width="100%"
      height="100%"
      url={src}
    />
  )
}

export default VideoPlayer
