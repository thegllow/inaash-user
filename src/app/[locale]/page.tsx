import { Code } from "@nextui-org/code"
import { Link } from "@nextui-org/link"
import { Snippet } from "@nextui-org/snippet"
import { button as buttonStyles } from "@nextui-org/theme"
import { getTranslations } from "next-intl/server"

import { siteConfig } from "@/config/site"
import { GithubIcon } from "@/components/icons"
import { subtitle, title } from "@/components/primitives"

export default async function Home() {
  const t = await getTranslations("choose-language")
  return <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"></section>
}
