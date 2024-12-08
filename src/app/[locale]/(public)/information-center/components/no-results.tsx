"use client"
import { noResults } from "@/assets"
import { Image } from "@nextui-org/image"
import { useTranslations } from "next-intl"

type Props = {}

const NoResults = (props: Props) => {
  const t = useTranslations("information-center.search")
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 ~py-20/32">
      <Image src={noResults.src} alt="no results" className="shrink-0" />
      <p className="max-w-[250px] text-center text-sm leading-normal text-default-500">{t("no-results")}</p>
    </div>
  )
}

export default NoResults
