"use client"

import React from "react"
import { Button } from "@nextui-org/button"
import { Expand } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {}

const FullScreenButton = (props: Props) => {
  const t = useTranslations("header")
  return (
    <Button className="items-center" variant="light" radius="sm" endContent={<Expand className="size-4" />}>
      {t("full-screen")}
    </Button>
  )
}

export default FullScreenButton
