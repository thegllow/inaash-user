import Button from "@/components/ui/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { CircleArrowLeft, CircleArrowRight, PlayCircle, Timer } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { DummyCoursesData } from "@/data/dummy-courses"
import { Image } from "@nextui-org/image"
import { Chip } from "@nextui-org/chip"
import { Divider } from "@nextui-org/divider"
import Footer from "@/components/common/footer"

export default async function Page({
  params: { code },
}: {
  params: {
    code: string
  }
}) {
  const t = await getTranslations("information-center.result")

  const dummyCourse = DummyCoursesData[0]

  return (
    <>
      <section className="flex flex-col items-center justify-center ~gap-8/14 ~/md:~py-8/10">
        <Card shadow={"none"} className="w-full shrink-0 rounded-xl bg-[#0A090959] p-1">
          <div className="flex items-center justify-between rounded-lg bg-[#1D1B1B] ~p-2/4">
            <h1 className="flex items-center gap-3 ~text-xl/2xl">
              <CircleArrowLeft strokeWidth={1.2} className="rtl:hidden" />
              <CircleArrowRight strokeWidth={1.2} className="ltr:hidden" />
              {code}
            </h1>
            <Button fullWidth={false} startContent={<PlayCircle />}>
              {t("start-course-button")}
            </Button>
          </div>
        </Card>
        <Card
          shadow={"none"}
          className="w-full shrink-0 rounded-xl bg-[#0A090959] ~sm/lg:~px-4/24 ~md/lg:~py-6/10">
          <div className="flex flex-col items-center ~gap-10/20 md:flex-row">
            <div className="w-full overflow-hidden rounded-[21px] border border-secondary bg-[#0A090959] p-1 md:w-1/2">
              <div className="aspect-[3/1.5] w-full overflow-hidden rounded-lg bg-center">
                <Image
                  className="h-full w-full object-cover"
                  removeWrapper
                  src={dummyCourse.logo}
                  alt={dummyCourse.title}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col !items-start gap-2">
                <h4 className="text-xl font-semibold text-foreground">{dummyCourse.title}</h4>
                <p className="text-sm text-foreground">{dummyCourse.description}</p>
                <Chip className="bg-[#27252570]" startContent={<Timer size={18} />} radius="sm">
                  {dummyCourse.length}
                </Chip>
              </div>
            </div>
          </div>
        </Card>
        <Card
          shadow={"none"}
          className="w-full shrink-0 rounded-xl bg-[#0A090959] ~sm/lg:~px-4/24 ~md/lg:~py-6/10">
          <div className="space-y-5">
            <h4 className="text-center text-2xl font-semibold">ممتاز!</h4>

            <div className="flex shrink-0 items-stretch justify-center ~gap-2/4">
              <Card shadow="none" radius="md" className="min-w-[140px] bg-[#2E2D34] p-2 md:min-w-[210px]">
                <CardHeader className="justify-center p-3 text-xs">{t("answers")}</CardHeader>
                <Divider />
                <CardBody className="space-y-3 text-center ~px-4/6 ~py-3/4">
                  <span className="~sm/md:~text-3xl/5xl">100%</span>
                  <span className="text-primary">5/5</span>
                </CardBody>
              </Card>
              <Card
                shadow="none"
                radius="md"
                className="min-w-[140px] shrink-0 bg-[#2E2D34] p-2 md:min-w-[210px]">
                <CardHeader className="justify-center p-3 text-xs">{t("avarage-answer-time")}</CardHeader>
                <Divider />
                <CardBody className="space-y-3 px-6 py-4 text-center">
                  <span className="~/md:~text-3xl/5xl">4.5</span>
                  <span className="text-primary">ثانية</span>
                </CardBody>
              </Card>
            </div>
          </div>
        </Card>
      </section>
      <div className="h-20"></div>
    </>
  )
}
