"use client"

import React from "react"
import { Card, CardBody } from "@nextui-org/card"
import { useTranslations } from "next-intl"
import { Video } from "@/types/public-videos-response"

type Props = Video

const Price = ({ price, newPrice }: Props) => {
  const t = useTranslations("payment.price")
  return (
    <Card shadow={"none"} className="bg-content2">
      <CardBody className="flex flex-col gap-4 px-4 py-5 rtl:text-right">
        {newPrice && Number(newPrice) < Number(price) && (
          <div className="flex items-center justify-between gap-4 text-green-600">
            <span>{t("discount")}</span>
            <span>-SAR {Number(price) - Number(newPrice)}</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 text-xl">
          <span>{t("total")}</span>
          <span>SAR {newPrice || price}</span>
        </div>
      </CardBody>
    </Card>
  )
}

export default Price
