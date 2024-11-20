import { Card, CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { getTranslations } from "next-intl/server"

import Logo from "@/components/common/logo"

import BackgroundImage from "@/components/common/background-image"
import ChooseLanguage from "./components/choose-language"
import ChooseLanguageButton from "./components/choose-language-button"

export default async function Home() {
  const t = await getTranslations("choose-language")
  return (
    <>
      <BackgroundImage />
      <section className="flex items-center justify-center gap-4 ~/md:~py-8/10">
        <div className="flex w-full flex-col items-center gap-10 md:w-1/2">
          <div className="flex justify-center">
            <Logo className="size-36" />
          </div>
          <Card shadow={"none"} className="w-full shrink-0 bg-[#211E24] px-8 py-6">
            <CardBody>
              <h1 className="text-center text-lg text-white">{t("title")}</h1>
              <Divider className="mx-auto my-6 w-1/2" />
              <ChooseLanguage />
            </CardBody>
          </Card>
          <ChooseLanguageButton />
        </div>
        <div className="hidden w-1/2 md:block"></div>
      </section>
    </>
  )
}
