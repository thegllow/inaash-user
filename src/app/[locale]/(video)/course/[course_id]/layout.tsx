import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import { getVideos } from "@/services/utils/get-videos"
import axios from "axios"
import { notFound } from "next/navigation"
import VideoFooter from "./components/video-footer"
import VideoHeader from "./components/video-header"
import { VideosProvider } from "./context/courses-context"
import { getVideo } from "./get-video"
import { getUserVideo } from "./get-user-video"

type Props = {
  children: React.ReactNode
  params: {
    locale: string
    course_id: string
  }
}

const Layout = async ({ children, params }: Props) => {
  console.log("🚀 ~ Layout ~ params:", params)
  const session = await auth()
  if (!session)
    return redirect({
      href: {
        pathname: "/login",
        query: {
          callbackUrl: `/course/${params.course_id}`,
        },
      },
      locale: params.locale,
    })

  try {
    const [video] = await Promise.all([getUserVideo(params.course_id)])

    return (
      <div className="relative flex min-h-screen flex-col">
        {/* <VideosProvider videos={videos} currentVideo={video}>
          <VideoHeader /> */}
        {children}
        {/* <VideoFooter />
        </VideosProvider> */}
      </div>
    )
  } catch (error) {
    // console.log("🚀 ~ Layout ~ error:", error)
    if (axios.isAxiosError(error)) {
      console.log("🚀 ~ Layout ~ error:", error.response?.data)
      if (error.response?.status === 404) notFound()

      // if (error.response?.status === 403) {
      //   redirect({
      //     href: {
      //       pathname: "/payment/" + params.course_id,
      //     },
      //     locale: params.locale,
      //   })
      // }
    }
    return <div className="text-white">Error</div>
  }
}

export default Layout
