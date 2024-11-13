"use client"

import React from "react"
import { LOCALES } from "@/config"
import { Tab, Tabs } from "@nextui-org/tabs"
import { useTranslations } from "next-intl"
import { parseAsStringLiteral, useQueryState } from "nuqs"

import { LocaleType } from "@/lib/i18n/types"

type Props = {}

const ChooseLanguage = (props: Props) => {
  const t = useTranslations("choose-language.tabs")

  const [language, setLanguage] = useQueryState("language", parseAsStringLiteral(LOCALES).withDefault("ar"))

  return (
    <div className="flex justify-center">
      <Tabs
        selectedKey={language}
        onSelectionChange={(key) => setLanguage(key as LocaleType[number])}
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
