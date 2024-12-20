import { setRequestLocale } from "next-intl/server"

import { startBackground } from "@/assets"
import BackgroundImage from "@/components/common/background-image"
import ChooseCourse from "./components/choose-course"
import { getVideos } from "@/services/utils/get-videos"

type Props = {
  params: {
    locale: string
  }
}

export const revalidate = 60 // 1 day in seconds (24 hours)
export const dynamic = "force-static"

const Page = async (props: Props) => {
  // Enable static rendering
  setRequestLocale(props.params.locale)
  const { videos, content } = await getVideos()

  return (
    <main className="container mx-auto max-w-7xl flex-grow px-6 ~pt-5/10">
      <BackgroundImage src={startBackground} />

      <section className="relative flex items-center justify-center gap-4 ~/md:~py-16/24">
        <div className="w-full space-y-10">
          <div className="mx-auto space-y-5 text-center ~md/lg:~max-w-[21rem]/[35rem]">
            <h1
              className="text-foreground ~md/lg:~text-4xl/6xl [&>span]:text-primary"
              dangerouslySetInnerHTML={{ __html: content.title }}></h1>
            <p className="text-justify text-foreground ~md/lg:~text-sm/base">{content.description}</p>
          </div>
          <ChooseCourse videos={videos} />
        </div>
      </section>
    </main>
  )
}

export default Page
