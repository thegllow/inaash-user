"use client"

import { successLogin } from "@/assets"
import { Image } from "@nextui-org/image"
import { useTranslations } from "next-intl"

import Button from "@/components/ui/button"
import { Link } from "@/lib/i18n/navigation"

type Props = { course_id: string }

const Success = ({ course_id }: Props) => {
  const t = useTranslations("payment.success")

  // handle change mobile

  return (
    <div className="flex flex-col gap-20">
      <div>
        <Image className="mx-auto w-32" removeWrapper src={successLogin.src} alt="success" />
        <h2 className="text-center text-xl font-semibold">{t("title")}</h2>
      </div>

      <Button as={Link} href={`/course/${course_id}`}>
        {t("button")}
      </Button>
    </div>
  )
}

export default Success
