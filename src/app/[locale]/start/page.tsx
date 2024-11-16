import React from "react"
import { getTranslations } from "next-intl/server"

import ChooseCourse from "./components/choose-course"

type Props = {}

const Page = async (props: Props) => {
  const t = await getTranslations("start")
  return (
    <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
      <div className="w-full space-y-10">
        <div className="mx-auto max-w-[39rem] space-y-5 text-center">
          <h1 className="text-6xl text-foreground">
            {t.rich("title", {
              span: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="text-justify text-foreground">{t("description")}</p>
        </div>
        <ChooseCourse />
      </div>
    </section>
  )
}

export default Page
