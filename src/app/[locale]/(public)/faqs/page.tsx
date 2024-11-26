import Footer from "@/components/common/footer"
import { InaashApiGuest } from "@/services/inaash"
import GetRandom from "@/utils/get-random"
import { Card } from "@nextui-org/card"
import { getTranslations, setRequestLocale } from "next-intl/server"
import List from "./components/list"
import { FAQResponse } from "./types"

export const revalidate = 86400 // 1 day in seconds (24 hours)
export const dynamic = 'force-static'
export default async function Page({ params: { locale } }: { params: { locale: string } }) {

  // Enable static rendering
  setRequestLocale(locale)
  const t = await getTranslations("faqs")
  const faqs = await InaashApiGuest.get<FAQResponse>("/faqs", {
    params: {
      per_page: 100,
      page: 1,
    },
  })
  const data = faqs.data.data.items.data
  const random = await GetRandom()
  console.log("🚀 ~ Page ~ random:", random)
  return (
    <>
      <main className="container mx-auto max-w-7xl flex-grow px-6 ~pt-5/10">
        <h1 className="text-6xl text-blue-800">{random}</h1>
        <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
          <Card shadow={"none"} className="w-full max-w-3xl shrink-0 rounded-xl bg-[#0A090959] p-1">
            <div className="mb-3 space-y-1 rounded-t-lg bg-[#1D1B1B] ~px-7/12 ~py-5/9">
              <h1 className="~text-xl/2xl">{t("title")}</h1>
              <p className="text-default-500 ~text-xs/sm">{t("description")}</p>
            </div>
            <List data={data} />
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )
}
