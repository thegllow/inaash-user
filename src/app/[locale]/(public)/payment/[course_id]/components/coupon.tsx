"use client"

import { Input } from "@nextui-org/input"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"

import Button from "@/components/ui/button"
import { useState } from "react"

type Props = {}

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
          setC(e.target.value.toUpperCase())
        }}
        placeholder={t("input-placeholder")}
      />
      <Button onClick={handleApplyCoupon} size="md" fullWidth={false}>
        {t("coupon-button")}
      </Button>
    </div>
  )
}

export default Coupon
