/* eslint-disable @next/next/no-img-element */
"use client"
import { send } from "@/assets/icons"
import { LOCALES } from "@/config"
import { siteConfig } from "@/config/site"
import { Button } from "@nextui-org/button"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import React from "react"

const ShareButton = () => {
  const t = useTranslations("certificate.certificate-card")

  const shareURL = "https://inaash.edu.sa/"
  const params = useParams() as { locale: (typeof LOCALES)[number] }

  const globalShare = async () => {
    const shareData = {
      title: siteConfig.share[params.locale].title,
      text: siteConfig.share[params.locale].description,
      url: shareURL,
    }
    try {
      if (!window.navigator.share) return
      await navigator.share(shareData)
    } catch (err) {
      console.log("🚀 ~ share ~ err:", err)
    }
  }
  return (
    <Button
      onClick={globalShare}
      size="md"
      variant="light"
      startContent={<img className="size-8" src={send.src} alt="share to share" />}>
      {t("share-button")}
    </Button>
  )
}

export default ShareButton
