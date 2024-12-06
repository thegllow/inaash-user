"use client"
import React from "react"
import { VideosProvider } from "../context/courses-context"
import { CourseStoreProvider } from "../store/course-store-provider"
import VideoHeader from "./video-header"
import VideoFooter from "./video-footer"
import { useQuery } from "@tanstack/react-query"
import { getUserVideo } from "../get-user-video"
import { getVideos } from "@/services/utils/get-videos"

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
    isLoading: isLoadingUserVideos,
    isError: isUserVideosError,
  } = useQuery({
    queryKey: ["course", params.course_id, params.locale],
    queryFn: async () => await getUserVideo(params.course_id),
  })
  const {
    data: videos,
    isLoading: isLoadingVideo,
    isError: isVideoError,
  } = useQuery({
    queryKey: ["courses", params.locale],
    queryFn: async () => await getVideos(),
  })

  if (isLoadingUserVideos || isLoadingVideo) return
  if (isVideoError || isUserVideosError) return
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
