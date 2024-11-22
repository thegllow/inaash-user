"use client"

import React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"

import Button from "@/components/ui/button"

type Props = {}

const ChooseLanguageButton = (props: Props) => {
  const t = useTranslations("choose-language")
  const [language] = useQueryState("language")

  return (
    <Button
      as={Link}
      href={`/${language || "ar"}/start`}
      size="lg"
      radius="md"
      color="primary"
      fullWidth
      className="mx-auto max-w-72 text-black">
      {t("next-button")}
    </Button>
  )
}

export default ChooseLanguageButton
