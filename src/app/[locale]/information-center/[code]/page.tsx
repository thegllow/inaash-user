import Button from "@/components/ui/button"
import { Card } from "@nextui-org/card"
import { PlayCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function Page({
  params: { code },
}: {
  params: {
    code: string
  }
}) {
  const t = await getTranslations("information-center.result")
  return (
    <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
      <Card shadow={"none"} className="w-full max-w-3xl shrink-0 rounded-xl bg-[#0A090959] p-1">
        <div className="flex items-center justify-between rounded-lg bg-[#1D1B1B] ~px-7/12 ~py-5/9">
          <h1 className="~text-xl/2xl">{code}</h1>
          <Button fullWidth={false} startContent={<PlayCircle />}>
            {t("start-course-button")}
          </Button>
        </div>
      </Card>
    </section>
  )
}
