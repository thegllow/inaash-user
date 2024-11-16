import React from "react"
import { DummyCoursesData } from "@/data/dummy-courses"
import { Card, CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"

import { redirect } from "@/lib/i18n/navigation"

import ChooseMethod from "./components/choose-method"
import CourseDetails from "./components/course-details"
import Success from "./components/success"

type Props = {
  params: { course_id: string; locale: string }
  searchParams: Record<string, string>
}

const Page = ({ params: { course_id, locale }, searchParams }: Props) => {
  // TODO: fetch course data from api
  const course = DummyCoursesData.find((course) => course.id === course_id)
  if (!course) redirect({ href: "/course", locale: locale })

  if (searchParams.success)
    return (
      <section className="flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
        <Card className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
          <CardBody className="p-8 rtl:text-right">
            <Success />
          </CardBody>
        </Card>
      </section>
    )

  return (
    <section className="flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
      <Card className="w-full max-w-4xl border-none bg-[#0A090959] backdrop-blur-md">
        <CardBody className="border-none px-8 ~/md:~py-8/12 rtl:text-right">
          <div className="flex gap-4">
            <div className="w-1/2">
              <CourseDetails course={course} />
            </div>
            <div>
              <Divider orientation="vertical" />
            </div>
            <div className="w-1/2">
              <ChooseMethod />
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  )
}

export default Page
