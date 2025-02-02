import { Card, CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { getTranslations } from "next-intl/server"

import Logo from "@/components/common/logo"

import BackgroundImage from "@/components/common/background-image"
import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import ChooseLanguage from "./components/choose-language"
import ChooseLanguageButton from "./components/choose-language-button"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { LOCALES } from "@/config"
import ChooseLanguageTitle from "./components/choose-language-title"

type Props = {
  params: Promise<{ locale: (typeof LOCALES)[number] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const locale = (await params).locale

  const data = siteConfig["share"][locale]

  return {
    ...data,
    openGraph: { images: ["/logo.png"] },
  }
}

export default async function Home() {
  const t = await getTranslations("choose-language")
  const session = await auth()
  if (session) redirect({ href: "/start", locale: session.user.lang })
  return (
    <>
      <BackgroundImage />
      <section className="flex min-h-[calc(100svh_-_64px)] items-center justify-center gap-4 ~/md:~py-8/10">
        <div className="flex w-full flex-col items-center gap-10 px-4 max-md:shrink-0 md:w-fit">
          <div className="flex justify-center">
            <Logo className="w-36 shrink-0" />
          </div>
          <Card shadow={"none"} className="w-full shrink-0 bg-[#211E24] py-6 ~md/lg:~px-3/8">
            <CardBody>
              <ChooseLanguageTitle />
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
