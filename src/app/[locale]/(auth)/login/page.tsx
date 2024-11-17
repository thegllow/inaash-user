"use client"

import { Card, CardBody } from "@nextui-org/card"
import { Suspense } from "react"
import Wrapper from "./components/wrapper"

const Page = () => {
  return (
    <section className="flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
      <Card className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
        <CardBody className="p-8 rtl:text-right">
          <Suspense>
            <Wrapper />
          </Suspense>
        </CardBody>
      </Card>
    </section>
  )
}

export default Page
