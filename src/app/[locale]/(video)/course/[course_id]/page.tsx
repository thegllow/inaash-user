import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import VideoFooter from "./components/video-footer"
import VideoHeader from "./components/video-header"

type Props = {
  params: {
    locale: string
    course_id: string
  }
}


const Page = async ({ params }: Props) => {
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
  return (
    <div className="relative flex min-h-screen flex-col">
      <VideoHeader />
      <VideoFooter />
    </div>
  )
}

export default Page
