"use client"

import { Card, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Image } from "@nextui-org/image"
import { PlayCircle, Timer } from "lucide-react"
import { useTranslations } from "next-intl"

import Button from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import { Video } from "@/types/public-videos-response"
import { useQueryState } from "nuqs"
// import { useEffect } from "react"
// import { useSession } from "next-auth/react"

type Props = {
  videos: Video[]
}

const ChooseCourse = (props: Props) => {
  const [selectedCourse, setSelectedCourse] = useQueryState("course")
  const t = useTranslations("start")

  // const session = useSession()
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("this runs")
  //     session.update({ id: session.data?.user.id })
  //   }, 1000)
  // }, [])
  const handleHover = (value: string) => {
    return () => setSelectedCourse(value)
  }
  return (
    <div className={cn("flex w-full flex-col items-center justify-center gap-4 md:flex-row")}>
      {props.videos.map((course) => {
        // if (course.id == selectedCourse)
        //   return (
        //     <Card
        //       onMouseLeave={() => {
        //         setSelectedCourse(null)
        //       }}
        //       shadow={"none"}
        //       key={course.id}
        //       radius="lg"
        //       className="max-w-[390px] border-none lg:w-1/2">
        //       {/* <Image alt="first-course" className="object-cover" src={course.image} removeWrapper /> */}
        //       <CardHeader className="absolute inset-0 z-10 flex-col !items-start gap-3 bg-[#272525E5] p-5">
        //         <h4 className="text-xl font-semibold text-foreground">{course.title}</h4>
        //         <p className="text-sm text-foreground">{course.description}</p>
        //         <Chip className="bg-[#27252570]" startContent={<Timer size={18} />} radius="sm">
        //           {course.length}
        //         </Chip>
        //         <Button
        //           as={Link}
        //           href={`/course/${course.id}`}
        //           className="mt-auto"
        //           startContent={<PlayCircle />}>
        //           {t("start-course-button")}
        //         </Button>
        //       </CardHeader>
        //       <Image
        //         removeWrapper
        //         className="z-0 h-full w-full object-cover"
        //         src={course.logo}
        //         alt={course.title}
        //       />
        //     </Card>
        //   )

        return (
          <Card
            shadow={"none"}
            key={course.id}
            radius="lg"
            onMouseEnter={handleHover(course.id)}
            className="group max-w-[390px] flex-grow border-none lg:w-1/2">
            <CardHeader className="z-10 flex-col !items-start gap-3 bg-[#272525E5] p-5 opacity-0 duration-300 group-hover:opacity-100">
              <h4 className="text-xl font-semibold text-foreground">{course.title}</h4>
              <p className="text-sm text-foreground">{course.description}</p>
              <Chip className="bg-[#27252570]" startContent={<Timer size={18} />} radius="sm">
                {course.length}
              </Chip>
              <Button
                as={Link}
                href={`/course/${course.id}`}
                className="mt-auto shrink-0"
                startContent={<PlayCircle />}>
                {t("start-course-button")}
              </Button>
            </CardHeader>
            <Image
              removeWrapper
              className="absolute top-0 z-0 h-full w-full object-cover"
              src={course.logo}
              alt={course.title}
            />
          </Card>
        )
      })}
    </div>
  )
}

export default ChooseCourse
