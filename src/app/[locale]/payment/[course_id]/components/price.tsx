"use client"

import React from "react"
import { Card, CardBody } from "@nextui-org/card"
import { useTranslations } from "next-intl"

type Props = {}

const Price = (props: Props) => {
  const t = useTranslations("payment.price")
  return (
    <Card shadow={"none"} className="bg-content2">
      <CardBody className="flex flex-col gap-4 px-4 py-5 rtl:text-right">
        <div className="flex items-center justify-between gap-4 text-green-600">
          <span>{t("discount")}</span>
          <span>-SAR 5.00</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-xl">
          <span>{t("total")}</span>
          <span>SAR 20.00</span>
        </div>
      </CardBody>
    </Card>
  )
}

export default Price
