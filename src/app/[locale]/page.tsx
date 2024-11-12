import { getTranslations } from "next-intl/server"

export default async function Home() {
  const t = await getTranslations("choose-language")
  return <section className="~/md:~py-8/10 flex items-center justify-center gap-4"></section>
}
