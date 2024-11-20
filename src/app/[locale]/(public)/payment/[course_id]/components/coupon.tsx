"use client"

import { Input } from "@nextui-org/input"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"

import Button from "@/components/ui/button"

type Props = {}

const Coupon = (props: Props) => {
  const t = useTranslations("payment.coupon")
  const [coupon, setCoupon] = useQueryState("coupon", parseAsString.withDefault(""))
  const handleApplyCoupon = (value: string) => {
    setCoupon(value)
  }
  return (
    <div className="flex gap-4">
      <Input
        value={coupon}
        onChange={(e) => {
          handleApplyCoupon(e.target.value.toUpperCase())
        }}
        placeholder={t("input-placeholder")}
      />
      <Button size="md" fullWidth={false}>
        {t("coupon-button")}
      </Button>
    </div>
  )
}

export default Coupon
