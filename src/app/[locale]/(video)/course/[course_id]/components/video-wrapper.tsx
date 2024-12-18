"use client"
import React from "react"
import { VideosProvider } from "../context/courses-context"
import { CourseStoreProvider } from "../store/course-store-provider"
import VideoHeader from "./video-header"
import VideoFooter from "./video-footer"
import { useQuery } from "@tanstack/react-query"
import { getUserVideo } from "../get-user-video"
import { getVideos } from "@/services/utils/get-videos"
import axios from "axios"
import { useRouter } from "@/lib/i18n/navigation"
import { Spinner } from "@nextui-org/spinner"

type Props = {
  children: React.ReactNode
  params: {
    locale: string
    course_id: string
  }
}

const VideoWrapper = ({ children, params }: Props) => {
  const {
    data: video,
    isLoading: isLoadingUserVideo,
    isError: isUserVideoError,
    error: userVideoError,
  } = useQuery({
    queryKey: ["course", params.course_id, params.locale],
    queryFn: async () => await getUserVideo(params.course_id),
    refetchOnMount: true,
  })
  const {
    data: videos,
    isLoading: isLoadingVideos,
    isError: isVideosError,
  } = useQuery({
    queryKey: ["courses", params.locale],
    queryFn: async () => await getVideos(),
  })
  const Router = useRouter()
  if (video && Number(video.view_complete_counter) && (!video.is_rated || !video.certificate_number)) {
    Router.push(`/certificate/${video.video_id}`)
    return null
  }

  if (isLoadingUserVideo || isLoadingVideos)
    return (
      <div className="flex h-[100svh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  if (isVideosError || isUserVideoError)
    return (
      <div className="flex h-[100svh] items-center justify-center">
        <p className="text-danger">Something went wrong</p>
      </div>
    )
  return (
    <VideosProvider videos={videos?.videos!} currentVideo={video!}>
      <CourseStoreProvider video={video!}>
        <VideoHeader />
        {children}
        <VideoFooter />
      </CourseStoreProvider>
    </VideosProvider>
  )
}

export default VideoWrapper
