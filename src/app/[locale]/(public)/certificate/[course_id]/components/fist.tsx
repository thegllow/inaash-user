import ShareSuccess from "@/components/common/certificate-card"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { useTranslations } from "next-intl"

type Props = {}

const First = (props: Props) => {
  const t = useTranslations("certificate.fist")
  return (
    <div className="w-full shrink-0 rounded-xl ~sm/lg:~px-4/24 ~md/lg:~py-6/10">
      <div className="flex gap-8">
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
        <Divider orientation="vertical" />
        <ShareSuccess />
      </div>
    </div>
  )
}

export default First
