"use client"

import { Input } from "@nextui-org/input"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"

import Button from "@/components/ui/button"
import { useState } from "react"
import { Video } from "@/types/public-videos-response"

type Props = Video

const Coupon = (props: Props) => {
  const t = useTranslations("payment.coupon")
  const [c, setC] = useState("")
  const [coupon, setCoupon] = useQueryState("coupon", parseAsString.withDefault(""))
  const handleApplyCoupon = () => {
    setCoupon(c, { shallow: false })
  }
  return (
    <div className="flex gap-4">
      <Input
        value={c}
        onChange={(e) => {
          const value = e.target.value.toUpperCase().trim()
          setC(value)
          if (!value) setCoupon("", { shallow: false })
        }}
        placeholder={t("input-placeholder")}
        isInvalid={!Number(props.discount) && !props.coupon}
        errorMessage={t("errors.invalidCoupon")}
      />
      <Button onClick={handleApplyCoupon} size="md" fullWidth={false}>
        {t("coupon-button")}
      </Button>
    </div>
  )
}

export default Coupon
