import { Card, CardBody } from "@nextui-org/card"
import { Suspense } from "react"
import Wrapper from "./components/wrapper"

const Page = async (props: { params: Promise<{ locale: string; user_id: string }> }) => {
  const params = await props.params;

  const {
    user_id
  } = params;

  return (
    <>
      <Card shadow={"none"} className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
        <CardBody className="~p-4/8 rtl:text-right">
          <Suspense>
            <Wrapper />
          </Suspense>
        </CardBody>
      </Card>
    </>
  )
}

export default Page
