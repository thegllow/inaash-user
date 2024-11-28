import { Card, CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"

import { redirect } from "@/lib/i18n/navigation"

import { loginBackground } from "@/assets"
import BackgroundImage from "@/components/common/background-image"
import { auth } from "@/lib/auth/auth"
import { InaashApiGuest } from "@/services/inaash"
import { SuccessResponse } from "@/types"
import { Video } from "@/types/public-videos-response"
import ChooseMethod from "./components/choose-method"
import CourseDetails from "./components/course-details"
import Success from "./components/success"

type Props = {
  params: { course_id: string; locale: string }
  searchParams: Record<string, string>
}

const Page = async ({ params: { course_id, locale }, searchParams }: Props) => {
  const session = await auth()
  if (!session) {
    redirect({
      href: {
        pathname: "/login",
        query: {
          callbackUrl: `/payment/${course_id}`,
        },
      },
      locale: locale,
    })
  }
  const course = await InaashApiGuest.get<SuccessResponse<Video>>(`/videos/${course_id}`)

  if (searchParams.success)
    return (
      <>
        <BackgroundImage src={loginBackground} />
        <section className="flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
          <Card shadow={"none"} className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
            <CardBody className="p-8 rtl:text-right">
              <Success course_id={course_id} />
            </CardBody>
          </Card>
        </section>
      </>
    )

  return (
    <>
      <BackgroundImage src={loginBackground} />
      <section className="relative flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
        <Card shadow={"none"} className="w-full max-w-4xl border-none bg-[#0A090959] backdrop-blur-md">
          <CardBody className="border-none px-4 ~/md:~py-8/12 md:px-8 rtl:text-right">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <CourseDetails course={course} />
              </div>
              <div>
                <Divider className="hidden md:block" orientation="vertical" />
                <Divider className="md:hidden" />
              </div>
              <div className="w-full md:w-1/2">
                <ChooseMethod />
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  )
}

export default Page
