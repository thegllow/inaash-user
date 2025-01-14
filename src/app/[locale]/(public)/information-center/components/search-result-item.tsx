import { Link } from "@/lib/i18n/navigation"
import { ArrowUpLeft } from "lucide-react"
import React from "react"
import { Result } from "../types"
import NoResults from "./no-results"

type Props = {
  results: Result[]
}

const SearchResultItem = ({ results }: Props) => {
  console.log("🚀 ~ SearchResultItem ~ results:", results)
  if (results.length === 0) return <NoResults />
  return (
    <>
      {results.map((result) => (
        <Link
          key={result.certificate_number}
          href={`/information-center/${result.certificate_number}`}
          className="flex items-center justify-between gap-4 rounded-md p-2 px-4 duration-200 hover:bg-default-200/50">
          <span className="text-default-500">{result.certificate_number}</span>
          <div className="flex shrink-0 items-center justify-center rounded-full border ~size-9/12">
            <ArrowUpLeft className="text-primary ~size-4/6" strokeWidth={1.1} />
          </div>
        </Link>
      ))}
    </>
  )
}

export default SearchResultItem
