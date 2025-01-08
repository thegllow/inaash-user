import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import { getVideos } from "@/services/utils/get-videos"
import axios from "axios"
import { notFound } from "next/navigation"
import { getUserVideo } from "./get-user-video"

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { redirect as nextRedirect } from "next/navigation"
import VideoWrapper from "./components/video-wrapper"
type Props = {
  children: React.ReactNode
  params: Promise<{
    locale: string
    course_id: string
  }>
}
export const dynamic = "force-dynamic"

const Layout = async (props: Props) => {
  const params = await props.params;

  const {
    children
  } = props;

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
    const queryClient = new QueryClient()
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["course", params.course_id, params.locale],
        queryFn: async () => await getUserVideo(params.course_id),
      }),
      queryClient.prefetchQuery({
        queryKey: ["courses", params.locale],
        queryFn: async () => await getVideos(),
      }),
      getUserVideo(params.course_id),
    ])

    return (
      <div className="relative flex min-h-screen flex-col">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <VideoWrapper params={params}>{children}</VideoWrapper>
        </HydrationBoundary>
      </div>
    )
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        nextRedirect("/api/auth/signout")
      }
      console.log("🚀 ~ Layout ~ error:", error.response?.data)
      if (error.response?.status === 404) notFound()

      if (error.response?.status === 403) {
        redirect({
          href: {
            pathname: "/payment/" + params.course_id,
          },
          locale: params.locale,
        })
      }
    }
    return <div className="text-white">Error</div>
  }
}

export default Layout
