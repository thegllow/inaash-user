import { getServerSession } from "next-auth"
import VideoHeader from "./components/video-header"
import React from "react"
import { authOptions } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"

type Props = {
  params: {
    locale: string
    course_id: string
  }
}

const Page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
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
    </div>
  )
}

export default Page
