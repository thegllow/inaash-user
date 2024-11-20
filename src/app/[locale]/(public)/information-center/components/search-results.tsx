import React from "react"
import SearchResultItem from "./search-result-item"
import NoResults from "./no-results"

type Props = {}

const SearchResults = (props: Props) => {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill("")
        .map((e, i) => (
          <SearchResultItem result="CODE" key={i} />
        ))}
      <NoResults />
    </div>
  )
}

export default SearchResults
