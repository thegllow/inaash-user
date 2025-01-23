"use client"

import { useTranslations } from "next-intl"

import SuccessAnimation from "@/components/common/success-animation"
import Button from "@/components/ui/button"

type Props = { course_id: string; locale: string }

const Success = ({ course_id, locale }: Props) => {
  const t = useTranslations("payment.success")

  // handle change mobile

  return (
    <div className="flex flex-col gap-20">
      <div>
        <SuccessAnimation />
        <h2 className="text-center text-xl font-semibold">{t("title")}</h2>
      </div>

      <Button as={"a"} href={`/${locale}/course/${course_id}`}>
        {t("button")}
      </Button>
    </div>
  )
}

export default Success
