import { getTranslations } from "next-intl/server"

import { startBackground } from "@/assets"
import BackgroundImage from "@/components/common/background-image"
import ChooseCourse from "./components/choose-course"
import { getVideos } from "./get-videos"

type Props = {}

const Page = async (props: Props) => {
  const t = await getTranslations("start")
  const videos = await getVideos()
  return (
    <>
      <BackgroundImage src={startBackground} />

      <section className="relative flex items-center justify-center gap-4 ~/md:~py-16/24">
        <div className="w-full space-y-10">
          <div className="mx-auto space-y-5 text-center ~md/lg:~max-w-[21rem]/[35rem]">
            <h1 className="text-foreground ~md/lg:~text-4xl/6xl">
              {t.rich("title", {
                span: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="text-justify text-foreground ~md/lg:~text-sm/base">{t("description")}</p>
          </div>
          <ChooseCourse videos={videos} />
        </div>
      </section>
    </>
  )
}

export default Page
