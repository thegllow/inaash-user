"use client"

import { appleLogo, cardsLogo } from "@/assets"
import { Image } from "@nextui-org/image"
import { RadioGroup } from "@nextui-org/radio"
import { useTranslations } from "next-intl"
import { useState } from "react"

import Button from "@/components/ui/button"
import useMutation from "@/hooks/use-mutation"
import { cn } from "@/lib/cn"
import { useRouter } from "@/lib/i18n/navigation"
import { ErrorResponse } from "@/types"
import axios from "axios"
import { useParams } from "next/navigation"
import { useQueryState } from "nuqs"
import { Pay } from "../pay"

type Props = {
  children: React.ReactNode
}

export const CustomRadio = ({ children }: Props) => {
  return (
    <div
      className={cn(
        "m-0 inline-flex items-start justify-between bg-[#2E2A33]",
        "max-w-[450px] cursor-pointer flex-row gap-2 rounded-lg border-2 border-transparent p-4",
        "flex items-center justify-between gap-4",
        "w-full gap-2",
      )}>
      {children}
    </div>
  )
}

const icons = {
  card: cardsLogo.src,
  apple: appleLogo.src,
}
const ChooseMethod = (props: Props) => {
  const t = useTranslations("payment")
  const keys = ["card", "apple"] as const

  const [coupon, _] = useQueryState("coupon")
  const params = useParams() as { course_id: string }
  const Router = useRouter()
  const { mutate, isLoading, isError, error } = useMutation(Pay, {
    onSuccess(data) {
      Router.push(data.data.redirect_url)
    },
  })
  const handlePayment = () => {
    mutate({
      video_id: params.course_id,
      coupon: coupon ? coupon : undefined,
    })
  }
  return (
    <div className="flex w-full flex-col justify-between gap-20">
      <RadioGroup
        isReadOnly
        classNames={{
          base: "gap-5",
          label: "text-foreground text-lg font-semibold",
          wrapper: "gap-3",
        }}
        label={t("choose-method")}>
        {keys.map((key) => (
          <CustomRadio key={key}>
            <div>
              {t(`options.${key}.value`)}
              <p className="text-default-500">{t(`options.${key}.description`)}</p>
            </div>
            <Image src={icons[key]} alt={key} />
          </CustomRadio>
        ))}
      </RadioGroup>
      <Button isLoading={isLoading} onClick={handlePayment}>
        {t("next-button")}
      </Button>
      {isError ? (
        <p className="text-center text-sm text-danger-500">
          {axios.isAxiosError(error)
            ? (error.response!.data as ErrorResponse<any>).message
            : (error as any).message}
        </p>
      ) : null}
    </div>
  )
}

export default ChooseMethod
