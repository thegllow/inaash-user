"use client"

import { LOCALES } from "@/config"
import { useParams } from "next/navigation"
import { useQueryState } from "nuqs"

type Props = {}

const ChooseLanguageTitle = (props: Props) => {
  const params = useParams() as { locale: (typeof LOCALES)[number] }

  const [language] = useQueryState("language", { defaultValue: params.locale || "ar" })

  const text = {
    ar: "أختر اللغة",
    en: "Choose the language",
    fr: "Choisir la langue",
    fil: "Piliin ang Wika",
    id: "Pilih bahasa",
    ur: "ہم مندرجہ ذیل ادائیگی کے طریقوں کی حمایت کرتے ہیں",
  }

  return <h1 className="text-center text-lg text-white">{text[language as "ar"]}</h1>
}

export default ChooseLanguageTitle
