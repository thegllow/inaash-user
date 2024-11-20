import { Card } from "@nextui-org/card"
import { getTranslations } from "next-intl/server"
import ContactForm from "./components/form"

export default async function Page() {
  const t = await getTranslations("contact-us")
  return (
    <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
      <Card shadow={"none"} className="w-full max-w-3xl shrink-0 rounded-xl bg-[#0A090959] p-1">
        <div className="mb-3 space-y-1 rounded-t-lg bg-[#1D1B1B] ~px-7/12 ~py-5/9">
          <h1 className="~text-xl/2xl">{t("title")}</h1>
          <p className="text-default-500 ~text-xs/sm">{t("description")}</p>
        </div>
        <div className="~space-y-4/8 ~px-6/16 ~py-5/7">
          <ContactForm />
        </div>
      </Card>
    </section>
  )
}
