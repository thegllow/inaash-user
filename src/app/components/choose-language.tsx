"use client"

import React, { useState } from "react"
import { LOCALES } from "@/config"
import { Tab, Tabs } from "@nextui-org/tabs"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"

type Props = {}

const ChooseLanguage = (props: Props) => {
  const t = useTranslations("choose-language.tabs")

  const [language, setLanguage] = useQueryState("language")

  return (
    <div className="flex justify-center">
      <Tabs
        selectedKey={language || "ar"}
        onSelectionChange={(key) => setLanguage(key as string)}
        color="primary"
        variant={"underlined"}
        aria-label="Tabs variants">
        {LOCALES.map((element) => {
          return <Tab key={element} value={element} className="text-xl" title={t(element)} />
        })}
      </Tabs>
    </div>
  )
}

export default ChooseLanguage
