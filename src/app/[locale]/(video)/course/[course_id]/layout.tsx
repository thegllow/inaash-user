import { DummyCoursesData } from "@/data/dummy-courses"
import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import VideoFooter from "./components/video-footer"
import VideoHeader from "./components/video-header"
import { VideosProvider } from "./context/courses-context"
import { getVideos } from "@/services/utils/get-videos"

type Props = {
  children: React.ReactNode
  params: {
    locale: string
    course_id: string
  }
}

const Layout = async ({ children, params }: Props) => {
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

  const { videos } = await getVideos()

  return (
    <div className="relative flex min-h-screen flex-col">
      <VideosProvider videos={videos}>
        <VideoHeader />
        {children}
        <VideoFooter />
      </VideosProvider>
    </div>
  )
}

export default Layout
