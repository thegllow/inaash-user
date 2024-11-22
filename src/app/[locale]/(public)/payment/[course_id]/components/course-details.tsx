import { DummyCoursesData } from "@/data/dummy-courses"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Image } from "@nextui-org/image"
import { Timer } from "lucide-react"
import { getTranslations } from "next-intl/server"

import Coupon from "./coupon"
import Price from "./price"

type Props = {
  course: (typeof DummyCoursesData)[0]
}

const CourseDetails = async ({ course }: Props) => {
  const t = await getTranslations("payment")
  return (
    <div className="flex w-full flex-col justify-between gap-5">
      <Card
        shadow={"none"}
        key={course.id + "selected"}
        className="mx-auto overflow-hidden rounded-[21px] border border-[#5A4A73] md:max-w-[390px]">
        <CardBody className="relative overflow-hidden p-1 rtl:text-right">
          <div className="relative overflow-hidden">
            <CardHeader className="relative z-10 flex-col !items-start gap-3 rounded-2xl bg-[#272525E5] p-5">
              <h4 className="text-xl font-bold text-foreground">{course.title}</h4>
              <p className="text-sm text-foreground">{course.description}</p>

              <Chip
                startContent={<Timer size={18} />}
                className="bg-[#3C3C3C] px-2 py-1 backdrop-blur-xl"
                radius="sm">
                {course.estimatedTime}
              </Chip>
              <div></div>
            </CardHeader>
            <Image
              removeWrapper
              className="absolute top-0 z-0 h-full w-full rounded-2xl object-cover"
              src={course.image}
              alt={course.title}
            />
          </div>
          <div className="flex items-center justify-between px-3 py-4">
            <span className="text-sm">{t("price.original")}</span>
            <span className="text-xl">{course.price}</span>
          </div>
        </CardBody>
      </Card>
      <Coupon />
      <Price />
    </div>
  )
}

export default CourseDetails
