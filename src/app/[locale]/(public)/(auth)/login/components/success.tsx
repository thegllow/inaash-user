"use client"

import { successLogin } from "@/assets"
import { Image } from "@nextui-org/image"
import { useTranslations } from "next-intl"

import { Link } from "@/lib/i18n/navigation"
import Button from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

type Props = {}

const Success = (props: Props) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const t = useTranslations("login.success")

  // handle change mobile

  return (
    <div className="flex w-full max-w-md flex-col gap-20">
      <div>
        <Image className="mx-auto w-32" removeWrapper src={successLogin.src} alt="success" />
        <h2 className="text-center text-xl font-semibold">{t("title")}</h2>
      </div>

      <Button as={Link} href={callbackUrl || `/start`}>
        {t("button")}
      </Button>
    </div>
  )
}

export default Success