import { Card } from "@nextui-org/card"
import { getTranslations } from "next-intl/server"
import List from "./components/list"

export default async function Page() {
  const t = await getTranslations("faqs")
  return (
    <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
      <Card className="w-full max-w-3xl shrink-0 rounded-xl bg-[#0A090959] p-1">
        <div className="rounded-t-lg bg-[#1D1B1B] px-9 py-6">
          <h1 className="text-2xl">{t("title")}</h1>
          <p className="text-sm text-default-500">{t("description")}</p>
        </div>
        <List />
      </Card>
    </section>
  )
}
