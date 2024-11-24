"use client"

import { Card, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Image } from "@nextui-org/image"
import { PlayCircle, Timer } from "lucide-react"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"

import Button from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import { Video } from "../type"

type Props = {
  videos: Video[]
}

const ChooseCourse = (props: Props) => {
  const [selectedCourse, setSelectedCourse] = useQueryState("course")
  const t = useTranslations("start")

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 md:flex-row",
        selectedCourse == props.videos[1].id && "flex-col-reverse md:flex-row-reverse",
      )}>
      {props.videos.map((course) => {
        if (!selectedCourse)
          return (
            <Card
              shadow={"none"}
              key={course.id}
              isPressable
              onClick={() => {
                setSelectedCourse(course.id)
              }}
              radius="lg"
              className="max-w-[390px] flex-grow border-none lg:w-1/2">
              <Image
                alt="first-course"
                className="h-full w-full object-cover"
                src={course.logo}
                removeWrapper
              />
            </Card>
          )
        if (course.id == selectedCourse) {
          return (
            <>
              <Card
                shadow={"none"}
                key={course.id}
                isPressable
                onClick={() => {
                  setSelectedCourse(null)
                }}
                radius="lg"
                className="aspect-video max-w-[390px] border-none lg:w-1/2">
                <Image
                  alt="first-course"
                  className="h-full w-full object-cover"
                  src={course.logo}
                  removeWrapper
                />
              </Card>
              <Card
                shadow={"none"}
                key={course.id + "selected"}
                radius="lg"
                className="max-w-[390px] border-none lg:w-1/2">
                {/* <Image alt="first-course" className="object-cover" src={course.image} removeWrapper /> */}
                <CardHeader className="absolute inset-0 z-10 flex-col !items-start gap-3 bg-[#272525E5] p-5">
                  <h4 className="text-xl font-semibold text-foreground">{course.title}</h4>
                  <p className="text-sm text-foreground">{course.description}</p>
                  <Chip className="bg-[#27252570]" startContent={<Timer size={18} />} radius="sm">
                    {course.length}
                  </Chip>
                  <Button
                    as={Link}
                    href={`/course/${course.id}`}
                    className="mt-auto"
                    startContent={<PlayCircle />}>
                    {t("start-course-button")}
                  </Button>
                </CardHeader>
                <Image
                  removeWrapper
                  className="z-0 h-full w-full object-cover"
                  src={course.logo}
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
