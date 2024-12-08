import { InaashApiGuest } from "@/services/inaash"
import NoResults from "./no-results"
import OldSearch from "./old-search"
import axios from "axios"
import SearchResultItem from "./search-result-item"

type Props = {
  searchParams: {
    [key: string]: string
  }
}

const SearchResults = async ({ searchParams }: Props) => {
  try {
    const searchResult = await InaashApiGuest.get(`/certificates/${searchParams}`)
    return (
      <div className="space-y-4">
        <OldSearch />
        <SearchResultItem result={searchParams.q} />
      </div>
    )
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return <NoResults />
      return <p>Server Error</p>
    }
    return <p>Server Error</p>
  }
}

export default SearchResults
