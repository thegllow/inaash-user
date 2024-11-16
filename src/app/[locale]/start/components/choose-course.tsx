"use client"

import { DummyCoursesData } from "@/data/dummy-courses"
import { Card, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Image } from "@nextui-org/image"
import { PlayCircle, Timer } from "lucide-react"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"

import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import Button from "@/components/ui/button"

type Props = {}

const ChooseCourse = (props: Props) => {
  const [selectedCourse, setSelectedCourse] = useQueryState("course")
  const t = useTranslations("start")

  return (
    <div
      className={cn("flex w-full justify-center gap-4", selectedCourse === "second" && "flex-row-reverse")}>
      {DummyCoursesData.map((course) => {
        if (!selectedCourse)
          return (
            <Card
              key={course.id}
              isPressable
              onClick={() => {
                setSelectedCourse(course.id)
              }}
              radius="lg"
              className="w-1/2 max-w-[390px] flex-grow border-none">
              <Image
                alt="first-course"
                className="h-full w-full object-cover"
                src={course.image}
                removeWrapper
              />
            </Card>
          )
        if (course.id === selectedCourse) {
          return (
            <>
              <Card
                key={course.id}
                isPressable
                onClick={() => {
                  setSelectedCourse(null)
                }}
                radius="lg"
                className="aspect-video w-1/2 max-w-[390px] border-none">
                <Image
                  alt="first-course"
                  className="h-full w-full object-cover"
                  src={course.image}
                  removeWrapper
                />
              </Card>
              <Card key={course.id + "selected"} radius="lg" className="w-1/2 max-w-[390px] border-none">
                {/* <Image alt="first-course" className="object-cover" src={course.image} removeWrapper /> */}
                <CardHeader className="absolute inset-0 z-10 flex-col !items-start gap-3 bg-[#272525E5] p-5">
                  <h4 className="text-xl font-semibold text-foreground">{course.title}</h4>
                  <p className="text-sm text-foreground">{course.description}</p>
                  <Chip startContent={<Timer size={18} />} radius="sm">
                    {course.estimatedTime}
                  </Chip>
                  <Button
                    as={Link}
                    href={`/payment/${course.id}`}
                    className="mt-auto"
                    startContent={<PlayCircle />}>
                    {t("startCourseButton")}
                  </Button>
                </CardHeader>
                <Image
                  removeWrapper
                  className="z-0 h-full w-full object-cover"
                  src={course.image}
                  alt={course.title}
                />
              </Card>
            </>
          )
        }
      })}
    </div>
  )
}

export default ChooseCourse
