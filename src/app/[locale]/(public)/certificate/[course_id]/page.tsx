import ShareSuccess from "./components/share-your-success"
import Button from "@/components/ui/button"
import { Link } from "@/lib/i18n/navigation"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { getTranslations } from "next-intl/server"
import { useVideo } from "./context/video-context"
import { getUserVideo } from "@/app/[locale]/(video)/course/[course_id]/get-user-video"
import { timeToSeconds } from "@/app/[locale]/(video)/course/[course_id]/utils/time-to-seconds"

const Page = async (props: { params: Promise<{ course_id: string }> }) => {
  const params = await props.params;
  const t = await getTranslations("certificate")

  const video = await getUserVideo(params.course_id)

  return (
    <section className="relative flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
      <Card shadow={"none"} className="w-full border-none bg-[#0A090959] backdrop-blur-md">
        <CardBody className="~p-4/8 rtl:text-right">
          <div className="h-full w-full shrink-0 rounded-xl ~sm/lg:~px-4/24 ~md/lg:~py-6/10">
            <div className="flex flex-col-reverse justify-center gap-8 lg:flex-row">
              <div className="space-y-6">
                <h4 className="text-center font-semibold ~text-lg/2xl">{t("grade")}</h4>

                <div className="flex shrink-0 items-stretch justify-center ~gap-2/4">
                  <Card shadow="none" radius="md" className="min-w-[140px] bg-[#2E2D34] p-2 md:min-w-[210px]">
                    <CardHeader className="justify-center p-3 text-xs">{t("answers")}</CardHeader>
                    <Divider />
                    <CardBody className="space-y-3 text-center ~px-4/6 ~py-3/4">
                      <span className="~sm/md:~text-3xl/5xl">
                        {((Number(video.correct_answers) / Number(video.total_questions)) * 100).toFixed(0) +
                          "%"}
                      </span>
                      <span className="text-primary">
                        {video.correct_answers}/{video.total_questions}
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
                      <span className="~/md:~text-3xl/5xl">{timeToSeconds(video.answer_average)}</span>
                      <span className="text-primary">{t("sec")}</span>
                    </CardBody>
                  </Card>
                </div>
                <Button>
                  <Link href={`/certificate/${params.course_id}/claim`}>{t("continue")}</Link>
                </Button>
              </div>
              <div>
                <Divider className="shrink-0 self-stretch max-lg:hidden" orientation="vertical" />
              </div>
              <ShareSuccess />
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  )
}

export default Page
