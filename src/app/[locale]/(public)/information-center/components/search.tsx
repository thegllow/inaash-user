"use client"

import { Input } from "@nextui-org/input"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"
import React, { ElementRef, useRef } from "react"

import Button from "@/components/ui/button"
import { useLocalStorage } from "@mantine/hooks"
import { SearchIcon } from "lucide-react"

type Props = {}

const Search = (props: Props) => {
  const t = useTranslations("information-center.search")
  const ref = useRef<ElementRef<"input">>(null)
  const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""))
  const [_, setValue] = useLocalStorage<string[]>({
    key: "information-center-previous-search",
    defaultValue: [],
  })

  const handleSearch: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const value = ref.current?.value || ""
    if (!value) return
    setQuery(value)
    setValue((pre) => {
      return [value, ...pre.filter((e) => e !== value).slice(-5)]
    })
  }

  return (
    <div className="flex gap-4">
      <Input
        startContent={<SearchIcon className="text-default-500" />}
        radius="sm"
        ref={ref}
        placeholder={t("input-placeholder")}
      />
      <Button radius="sm" onClick={handleSearch} size="md" fullWidth={false}>
        {t("search-button")}
      </Button>
    </div>
  )
}

export default Search
