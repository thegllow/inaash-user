"use client"

import React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"

import Button from "@/components/ui/button"

type Props = {}

const ChooseLanguageButton = (props: Props) => {
  const t = useTranslations("choose-language")
  const [language] = useQueryState("language", { defaultValue: "ar" })

  const text = {
    ar: "التالي",
    en: "Next",
    fr: "Suivant",
    fil: "Susunod",
    id: "Berikutnya",
    ur: "اگلا",
  }
  return (
    <Button
      as={Link}
      href={`/${language}/start`}
      size="lg"
      radius="md"
      color="primary"
      fullWidth
      className="mx-auto max-w-72 text-black">
      {text[language as "ar"]}
    </Button>
  )
}

export default ChooseLanguageButton
