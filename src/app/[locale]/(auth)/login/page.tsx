"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardBody } from "@nextui-org/card"

import SendOTP from "./components/send-otp"
import Success from "./components/success"
import VerifyOTP from "./components/verify-opt"

const Page = () => {
  const searchParams = useSearchParams()
  const mobile = searchParams.get("mobile")
  const success = searchParams.get("success")

  return (
    <section className="flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
      <Card className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
        <CardBody className="p-8 rtl:text-right">
          {success ? <Success /> : mobile ? <VerifyOTP /> : <SendOTP />}
        </CardBody>
      </Card>
    </section>
  )
}

export default Page
