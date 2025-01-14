"use client"

import { Input } from "@nextui-org/input"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"
import React, { ComponentRef, useRef, useState } from "react"

import Button from "@/components/ui/button"
import { useLocalStorage } from "@mantine/hooks"
import { SearchIcon } from "lucide-react"

type Props = {}

const Search = (props: Props) => {
  const t = useTranslations("information-center.search")
  const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""))
  const [_, setOldSearch] = useLocalStorage<string[]>({
    key: "information-center-previous-search",
    defaultValue: [],
  })
  const [inputValue, setInputValue] = useState(query || "")
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (!value) setQuery(null)
  }
  const handleSearch: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setQuery(inputValue)
    setOldSearch((pre) => {
      return [inputValue, ...pre.filter((value) => value !== inputValue).slice(-5)]
    })
  }

  return (
    <div className="flex gap-4">
      <Input
        startContent={<SearchIcon className="text-default-500" />}
        radius="sm"
        value={inputValue}
        onChange={handleChange}
        placeholder={t("input-placeholder")}
      />
      <Button radius="sm" onClick={handleSearch} size="md" fullWidth={false}>
        {t("search-button")}
      </Button>
    </div>
  )
}

export default Search
