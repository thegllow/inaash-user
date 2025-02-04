import { timeToSeconds } from "@/app/[locale]/(video)/course/[course_id]/utils/time-to-seconds"
import Certificate from "@/components/common/certificate"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Divider } from "@nextui-org/divider"
import { Image } from "@nextui-org/image"
import { PlayCircle, Timer } from "lucide-react"
import { getTranslations } from "next-intl/server"
import BackButton from "./components/back-button"
import { getCertificate } from "./get-certificate"
import StartCourseButton from "./components/start-course-button"
import { notFound } from "next/navigation"
import axios from "axios"

export const dynamic = "force-dynamic"
export default async function Page(props: {
  params: Promise<{
    code: string
  }>
}) {
  const params = await props.params

  const { code } = params

  const t = await getTranslations("information-center.result")

  try {
    const certificate = await getCertificate(code)
    const { video } = certificate

    return (
      <>
        <section className="flex flex-col items-center justify-center ~gap-8/14 ~/md:~py-8/10">
          <Card shadow={"none"} className="w-full shrink-0 rounded-xl bg-[#0A090959] p-1">
            <div className="flex items-center justify-between rounded-lg bg-[#1D1B1B] ~p-2/4">
              <h1 className="flex items-center gap-3 ~text-xl/2xl">
                <BackButton />

                {code}
              </h1>
              <StartCourseButton course={video.id} />
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
                    src={video.logo}
                    alt={video.title}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-col !items-start gap-2">
                  <h4 className="text-xl font-semibold text-foreground">{video.title}</h4>
                  <p className="text-sm text-foreground">{video.description}</p>
                  <Chip className="bg-[#27252570]" startContent={<Timer size={18} />} radius="sm">
                    {video.length}
                  </Chip>
                </div>
              </div>
            </div>
          </Card>
          <Card
            shadow={"none"}
            className="w-full shrink-0 rounded-xl bg-[#0A090959] ~sm/lg:~px-4/24 ~md/lg:~py-6/10">
            <Certificate certificate_qr_code={certificate.certificate_number} />
          </Card>
          <Card
            shadow={"none"}
            className="w-full shrink-0 rounded-xl bg-[#0A090959] ~sm/lg:~px-4/24 ~md/lg:~py-6/10">
            <div className="space-y-5">
              <h4 className="text-center text-2xl font-semibold">{t("grade")}</h4>

              <div className="flex shrink-0 items-stretch justify-center ~gap-2/4">
                <Card shadow="none" radius="md" className="min-w-[140px] bg-[#2E2D34] p-2 md:min-w-[210px]">
                  <CardHeader className="justify-center p-3 text-xs">{t("answers")}</CardHeader>
                  <Divider />
                  <CardBody className="space-y-3 text-center ~px-4/6 ~py-3/4">
                    <span className="~sm/md:~text-3xl/5xl">
                      {(
                        (Number(certificate.correct_answers) / Number(certificate.total_questions)) *
                        100
                      ).toFixed(0) + "%"}
                    </span>
                    <span className="text-primary">
                      {certificate.correct_answers}/{certificate.total_questions}
                    </span>
                  </CardBody>
                </Card>
                <Card
                  shadow="none"
                  radius="md"
                  className="min-w-[140px] shrink-0 bg-[#2E2D34] p-2 md:min-w-[210px]">
                  <CardHeader className="justify-center p-3 text-xs">{t("average-answer-time")}</CardHeader>
                  <Divider />
                  <CardBody className="space-y-3 px-6 py-4 text-center">
                    <span className="~/md:~text-3xl/5xl">{timeToSeconds(certificate.answer_average)}</span>
                    <span className="text-primary">{t("sec")}</span>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Card>
        </section>
        <div className="h-20"></div>
      </>
    )
  } catch (error) {
    console.log("🚀 ~ error:", error)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      notFound()
    }

    return <p>Server Error</p>
  }
}
