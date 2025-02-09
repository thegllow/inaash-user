"use client"
/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/button"
import { useTranslations } from "next-intl"
import { Link, useRouter } from "@/lib/i18n/navigation"



const ContinueButton = ({course_id}: {course_id: string}) => {
  const t = useTranslations("certificate")
  const Router = useRouter()
  const navigate = ()=>{
    Router.push(`/certificate/${course_id}/claim`)
  }
  return (
    <Button onClick={navigate} >
      {t("continue")}
    </Button>
)
}

export default ContinueButton
