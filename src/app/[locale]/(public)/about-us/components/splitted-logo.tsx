/* eslint-disable @next/next/no-img-element */
import React from "react"

type Props = {}
import { first, fourth, second, fifth, sixth, third } from "@/assets/inaash-logo-splitted"
import { getTranslations } from "next-intl/server"
import { Chip } from "@nextui-org/chip"

export const content = [
  {
    icon: first,
    key: "first",
  },
  {
    icon: second,
    key: "second",
  },
  {
    icon: third,
    key: "third",
  },
  {
    icon: fourth,
    key: "fourth",
  },
  {
    icon: fifth,
    key: "fifth",
  },
  {
    icon: sixth,
    key: "sixth",
  },
]

const SplittedLogo = async (props: Props) => {
  const t = await getTranslations("about-us.splitted-logo")
  return (
    <div className="grid grid-cols-2 gap-4 pb-32 sm:grid-cols-3 md:grid-cols-6">
      {content.map(({ key, icon }) => {
        return (
          <div key={key} className="flex flex-col items-center gap-2">
            <div className="flex aspect-square w-full items-center justify-center">
              <img src={icon.src} alt={key} />
            </div>
            <Chip
              className="border-[#2A4444] text-default-500"
              variant="bordered"
              color="default"
              radius="md">
              {/* @ts-ignore */}
              {t(key)}
            </Chip>
          </div>
        )
      })}
    </div>
  )
}

export default SplittedLogo
