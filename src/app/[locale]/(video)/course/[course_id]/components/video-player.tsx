/* eslint-disable @next/next/no-img-element */
"use client"
import ReactPlayer from "react-player"
import { useVideos } from "../context/courses-context"
import { useCourseStore } from "../store/course-store-provider"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { timeToSeconds } from "../utils/time-to-seconds"
import { Spinner } from "@nextui-org/spinner"
import { useRouter } from "@/lib/i18n/navigation"
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
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="24.375" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_255_821" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_255_821" result="shape" />
      </filter>
    </defs>
  </svg>
)
interface VideoPlayerProps { }

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
  const { currentVideo } = useVideos()
  const { questionsMap, lastQuestion, playing, startTime, setCurrentQuestion, volume, setVideoPlayerRef } =
    useCourseStore((state) => state)
  const [lastVQ, setLastVQ] = useState("0")
  // const hasPassedCourse = currentVideo.certificate_qr_code ? true : false

  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef<ReactPlayer>(null)

  const onReady = useCallback(() => {
    if (!isReady && playerRef.current) {
      const timeToStart = timeToSeconds(startTime)
      playerRef.current.seekTo(timeToStart, "seconds")
      setIsReady(true)
    }
  }, [isReady, startTime])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    if (playerRef.current) {
      setVideoPlayerRef(playerRef.current)
    }
    return () => {
      setVideoPlayerRef(null)
    }
  }, [setVideoPlayerRef])

  const Router = useRouter()
  const handleCourseEnding = () => {
    Router.push({
      pathname: `/certificate/${currentVideo.video_id}`,
    })
  }


  useEffect(() => {
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer()
      if (videoElement) {
        videoElement.controls = false // Disable native controls
        videoElement.setAttribute('playsinline', true) // Ensure inline playback
        videoElement.setAttribute('webkit-playsinline', 'true') // iOS-specific
      }
    }
  }, [])
  return (
    <>
      {isPending ? (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Spinner size="lg" />
        </div>
      ) : null}
      <ReactPlayer
        ref={playerRef}
        onReady={onReady}
        onBuffer={() => setIsPending(true)}
        onBufferEnd={() => setIsPending(false)}
        onProgress={({ playedSeconds, played }) => {
          const sec = playedSeconds.toFixed()
          // do not show last answered question in case user refresh
          if (sec == lastQuestion || sec == lastVQ) return
          const question = questionsMap.get(sec)
          if (question) {
            setLastVQ(sec)
            setCurrentQuestion(sec)
          }
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
        url={currentVideo.video.video_url}
        volume={volume}
        onEnded={handleCourseEnding}
        controls={false}
        playsinline


      />
    </>
  )
}

export default VideoPlayer