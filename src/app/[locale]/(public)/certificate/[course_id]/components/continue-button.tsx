"use client"
/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/button"
import { useTranslations } from "next-intl"
import { Link } from "@/lib/i18n/navigation"



const ContinueButton = ({course_id}: {course_id: string}) => {
  const t = useTranslations("certificate")

  return (
    <Button as={Link} href={`/certificate/${course_id}/claim`}>
      {t("continue")}
    </Button>
)
}

export default ContinueButton
