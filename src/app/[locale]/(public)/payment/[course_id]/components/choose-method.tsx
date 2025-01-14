"use client"

import React, { useState } from "react"
import { appleLogo, cardsLogo } from "@/assets"
import { Image } from "@nextui-org/image"
import { Radio, RadioGroup, type RadioProps } from "@nextui-org/radio"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/cn"
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation"
import Button from "@/components/ui/button"
import { Pay } from "../pay"
import useMutation from "@/hooks/use-mutation"
import { useParams } from "next/navigation"
import { useQueryState } from "nuqs"
import { isErrored } from "stream"
import axios from "axios"
import { ErrorResponse } from "@/types"

type Props = {}

export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-[#2E2A33] hover:bg-default-100 items-start justify-between",
          "flex-row  max-w-[450px] cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
        ),
        labelWrapper: cn("gap-2 w-full"),
        label: "flex justify-between gap-4 items-center",
        description: "text-default-500",
      }}>
      {children}
    </Radio>
  )
}

const icons = {
  card: cardsLogo.src,
  apple: appleLogo.src,
}
const ChooseMethod = (props: Props) => {
  const t = useTranslations("payment")
  const keys = ["card", "apple"] as const

  const [method, setMethod] = useState("")
  const [coupon, _] = useQueryState("coupon")
  const params = useParams() as { course_id: string }
  const Router = useRouter()
  const pathname = usePathname()
  const { mutate, isLoading, isError, error } = useMutation(Pay, {
    onSuccess() {
      Router.push({
        pathname,
        query: {
          success: true,
        },
      })
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
        value={method}
        onValueChange={setMethod}
        classNames={{
          base: "gap-5",
          label: "text-foreground text-lg font-semibold",
          wrapper: "gap-3",
        }}
        label={t("choose-method")}>
        {keys.map((key) => (
          <CustomRadio key={key} description={t(`options.${key}.description`)} value={key}>
            {t(`options.${key}.value`)}
            <Image src={icons[key]} alt={key} />
          </CustomRadio>
        ))}
      </RadioGroup>
      <Button isLoading={isLoading} isDisabled={!method} onClick={handlePayment}>
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
