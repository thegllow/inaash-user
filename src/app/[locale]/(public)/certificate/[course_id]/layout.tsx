import { getUserVideo } from "@/app/[locale]/(video)/course/[course_id]/get-user-video"
import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import axios from "axios"
import { isRedirectError } from "next/dist/client/components/redirect"
import { notFound } from "next/navigation"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string; course_id: string }
}) {
  const session = await auth()
  if (!session)
    redirect({
      href: {
        pathname: "/login",
        query: {
          callbackUrl: `/certificate/${params.course_id}`,
        },
      },
      locale: params.locale,
    })

  try {
    const video = await getUserVideo(params.course_id)

    if (!video.certificate_qr_code)
      redirect({
        href: {
          pathname: `/course/${params.course_id}`,
        },
        locale: params.locale,
      })
    return (
      <>
        <main className="container mx-auto max-w-7xl flex-grow px-6 ~pt-5/10">
          {/* <VideoProvider video={video}> */}
          {children}
          {/* </VideoProvider> */}
        </main>
      </>
    )
  } catch (error) {
    console.log("🚀 ~ error:", error)
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        redirect({
          href: {
            pathname: `/payment/${params.course_id}`,
          },
          locale: params.locale,
        })
      }

      notFound()
    }

    if (isRedirectError(error)) throw error

    return <p>Server Error</p>
  }
}
