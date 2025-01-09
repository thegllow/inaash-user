import { loginBackground } from "@/assets"
import BackgroundImage from "@/components/common/background-image"
import { redirect } from "@/lib/i18n/navigation"
import { Card, CardBody } from "@nextui-org/card"
import { Suspense } from "react"
import Wrapper from "./components/wrapper"
import { auth } from "@/lib/auth/auth"

const Page = async (props: {
  searchParams: Promise<{ [key: string]: string }>
  params: Promise<{ locale: string }>
}) => {
  const params = await props.params
  const searchParams = await props.searchParams
  const session = await auth()
  if (session)
    redirect({ href: searchParams.callbackUrl ? searchParams.callbackUrl : "/start", locale: params.locale })

  return (
    <>
      <BackgroundImage src={loginBackground} />
      <section className="relative flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
        <Card shadow={"none"} className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
          <CardBody className="~p-4/8 rtl:text-right">
            <Suspense>
              <Wrapper />
            </Suspense>
          </CardBody>
        </Card>
      </section>
    </>
  )
}

export default Page
