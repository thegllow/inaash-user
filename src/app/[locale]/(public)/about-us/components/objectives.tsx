/* eslint-disable @next/next/no-img-element */
import { logo } from "@/assets"
import { first, second, third, fourth, fifth, sixth } from "@/assets/icons"
import { getTranslations } from "next-intl/server"
import React from "react"

type Props = {}
const icons = {
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
} as const

const Objectives = async (props: Props) => {
  const t = await getTranslations("about-us.objectives")
  const keys = ["first", "second", "third", "fourth", "fifth", "sixth"] as const
  return (
    <div className="relative overflow-hidden">
      <img src={logo.src} alt="logo" className="absolute right-0 top-1/4 block h-[700px] translate-x-1/2" />

      <div className="bg-[#0A0909d4] backdrop-blur-xl">
        <section className="container mx-auto max-w-7xl flex-grow px-6 ~py-10/20">
          <div className="flex w-full flex-col items-center justify-between ~pt-2/6 ~pb-6/16 ~/md:~gap-5/10 md:flex-row md:~px-10/20">
            <div className="w-full md:w-2/3">
              <h3 className="text-xl/normal text-foreground md:bg-gradient-to-br md:from-[#FFFFFF] md:to-[#99999929] md:bg-clip-text md:text-[125px] md:font-light md:text-transparent lg:text-[145px] xl:text-[165px]">
                {t("title")}
              </h3>
              <p className="text-sm text-default-500 md:~-mt-4/10">{t("description")}</p>
            </div>
            <div className="w-full md:w-1/3">
              <ul className="flex flex-col gap-3">
                {keys.map((key) => {
                  return (
                    <li key={key} className="flex items-center gap-3">
                      <div className="flex aspect-square size-11 shrink-0 items-center justify-center rounded bg-[#120A09] shadow-[7px_3px_16px_0px_#30ACFF0D]">
                        <img src={icons[key].src} alt="icon" />
                      </div>
                      <span className="text-sm text-[#ACB4B4]">{t(`objectives-list.list.${key}.title`)}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Objectives
