import { Card } from "@nextui-org/card"
import { getTranslations } from "next-intl/server"
import Search from "./components/search"
import SearchResults from "./components/search-results"
import { Divider } from "@nextui-org/divider"

export default async function Page() {
  const t = await getTranslations("faqs")
  return (
    <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
      <Card className="w-full max-w-3xl shrink-0 rounded-xl bg-[#0A090959] p-1">
        <div className="mb-3 rounded-t-lg bg-[#1D1B1B] ~px-9/12 ~py-6/9">
          <h1 className="text-2xl">{t("title")}</h1>
          <p className="text-sm text-default-500">{t("description")}</p>
        </div>
        <div className="space-y-8 ~px-10/16 ~py-5/7">
          <Search />
          <Divider />
          <SearchResults />
        </div>
      </Card>
    </section>
  )
}
