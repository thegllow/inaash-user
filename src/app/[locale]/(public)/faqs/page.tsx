import { Card } from "@nextui-org/card"
import { getTranslations } from "next-intl/server"
import List from "./components/list"
import InaashApi from "@/services/inaash"
import { FAQResponse } from "./types"
import Footer from "@/components/common/footer"
//  revalidate every day
export const revalidate = 90000
export default async function Page() {
  const t = await getTranslations("faqs")
  const faqs = await InaashApi.get<FAQResponse>("/guest/faqs", {
    params: {
      per_page: 100,
      page: 1,
    },
  })
  const data = faqs.data.data.items.data
  return (
    <>
      <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
        <Card shadow={"none"} className="w-full max-w-3xl shrink-0 rounded-xl bg-[#0A090959] p-1">
          <div className="mb-3 space-y-1 rounded-t-lg bg-[#1D1B1B] ~px-7/12 ~py-5/9">
            <h1 className="~text-xl/2xl">{t("title")}</h1>
            <p className="text-default-500 ~text-xs/sm">{t("description")}</p>
          </div>
          <List data={data} />
        </Card>
      </section>
      <Footer />

    </>
  )
}
