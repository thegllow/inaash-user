"use client"
import { Link } from "@/lib/i18n/navigation"
import { Button } from "@nextui-org/button"
import { useTranslations } from "next-intl"
import React from "react"

type Props = {
  id: string
}

const EditProfileButton = ({ id }: Props) => {
  const t = useTranslations("profile")

  return (
    <Button as={Link} href={`/profile/${id}`} color="primary" variant="bordered" className="border-2">
      {t("edit-button")}
    </Button>
  )
}

export default EditProfileButton
