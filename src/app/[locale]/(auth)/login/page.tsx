import React from "react"
import { Card, CardBody } from "@nextui-org/card"

import SendOTP from "./components/send-otp"

type Props = {}

const page = (props: Props) => {
  return (
    <section className="flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
      <Card className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
        <CardBody className="p-8 rtl:text-right">
          <SendOTP />
        </CardBody>
      </Card>
    </section>
  )
}

export default page
