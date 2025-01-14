"use client"
import { useLocalStorage } from "@mantine/hooks"
import { Button } from "@nextui-org/button"
import { ArrowUpLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"

type Props = {}

const OldSearch = (props: Props) => {
  const t = useTranslations("information-center.search")
  const [values, setValues] = useLocalStorage<string[]>({
    key: "information-center-previous-search",
    defaultValue: [],
  })
  const handleClearHistory = () => {
    setValues([])
  }

  const [_, setQuery] = useQueryState("q", parseAsString.withDefault(""))
  if (values.length === 0) return null
  return (
    <>
      <div>
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-default-500">{t("old-search")}</p>
          <Button onClick={handleClearHistory} variant="light" color="primary">
            {t("clear-history")}
          </Button>
        </div>
        {values.filter(Boolean).map((result, i) => (
          <div
            onClick={() => {
              setQuery(result)
            }}
            key={result}
            className="flex items-center justify-between gap-4 rounded-md p-2 px-4 duration-200 hover:bg-default-200/50">
            <span className="text-default-500">{result}</span>
            <div className="flex shrink-0 items-center justify-center rounded-full border ~size-9/12">
              <ArrowUpLeft className="text-primary ~size-4/6" strokeWidth={1.1} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default OldSearch
