"use client"
import { logo } from "@/assets"
import Logo from "@/components/common/logo"
import useForceLandscape from "@/hooks/use-force-landscape"
import { cn } from "@/lib/cn"
import { useOrientation } from "@mantine/hooks"
import { useTranslations } from "next-intl"
import React from "react"
import Image from "next/image"

type Props = {
  children: React.ReactNode
}

const ForceLandscape = (props: Props) => {
  const { angle, type } = useOrientation()
  const isLandscape = useForceLandscape()
  const t = useTranslations("landscape")
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 flex h-full flex-col items-center justify-between gap-10 bg-[#211E24] p-8 md:hidden",
          isLandscape ? "!hidden" : "",
        )}>
        <div>
          <Image src={logo} alt="inaash logo" className="!w-20" />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto w-full max-w-[240px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M2 8C2 5.17157 2 3.75736 2.87868 2.87868C3.75736 2 5.17157 2 8 2H9C11.8284 2 13.2426 2 14.1213 2.87868C15 3.75736 15 5.17157 15 8V16C15 18.8284 15 20.2426 14.1213 21.1213C13.2426 22 11.8284 22 9 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16V8Z"
              stroke="#fff"
              strokeWidth="0.45600000000000007"
            />{" "}
            <path
              d="M17.5 10.0068C19.3597 10.0337 20.414 10.1717 21.1213 10.879C22 11.7577 22 13.1719 22 16.0003C22 18.8287 22 20.243 21.1213 21.1216C20.414 21.829 19.3597 21.9669 17.5 21.9938"
              stroke="#fff"
              strokeWidth="0.45600000000000007"
              strokeLinecap="round"
            />{" "}
            <path d="M11 5H6" stroke="#fff" strokeWidth="0.45600000000000007" strokeLinecap="round" />{" "}
            <path d="M19 18V14" stroke="#fff" strokeWidth="0.45600000000000007" strokeLinecap="round" />{" "}
            <path
              d="M10 17.5C10 18.3284 9.32843 19 8.5 19C7.67157 19 7 18.3284 7 17.5C7 16.6716 7.67157 16 8.5 16C9.32843 16 10 16.6716 10 17.5Z"
              stroke="#fff"
              strokeWidth="0.45600000000000007"
            />{" "}
            <path
              d="M20.5 6.98598L22 8C22 4.98532 19.8377 2.48275 17 2"
              stroke="#fff"
              strokeWidth="0.45600000000000007"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </g>
        </svg>
        <p className="text-center text-default-500">{t("description")}</p>
      </div>

      {props.children}
    </>
  )
}

export default ForceLandscape
