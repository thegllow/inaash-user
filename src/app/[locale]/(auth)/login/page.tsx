import { authOptions } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import { Card, CardBody } from "@nextui-org/card"
import { getServerSession } from "next-auth"
import { Suspense } from "react"
import Wrapper from "./components/wrapper"
import BackgroundImage from "@/components/common/background-image"
import { loginBackground } from "@/assets"

const Page = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string }
  params: { locale: string }
}) => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect({ href: searchParams.callbackUrl ? searchParams.callbackUrl : "/start", locale: params.locale })
  }
  return (
    <>
      <BackgroundImage src={loginBackground} />
      <section className="flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
        <Card className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
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
