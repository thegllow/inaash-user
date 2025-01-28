"use client"
/* eslint-disable @next/next/no-img-element */
import { horizontalLogo, logo } from "@/assets"
import { gmail, linkedin, send, twitter, whatsapp } from "@/assets/icons"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { useTranslations } from "next-intl"
import { useVideo } from "../context/video-context"
import { EmailShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"
import { siteConfig } from "@/config/site"
import { useParams } from "next/navigation"
import { LOCALES } from "@/config"

const ShareSuccess = () => {
  const params = useParams() as { locale: (typeof LOCALES)[number] }
  const t = useTranslations("share-your-success")
  const share = useTranslations("share")
  const video = useVideo()
  const shareURL = "https://inaash.edu.sa/"
  const grade = ((Number(video.correct_answers) / Number(video.total_questions)) * 100).toFixed(0)

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
    <div className="flex w-full flex-col items-center justify-center space-y-6 text-foreground lg:max-w-[390px]">
      <h1 className="font-semibold ~text-lg/2xl">{t("title")}</h1>

      <Card
        shadow={"none"}
        className="mx-auto w-full max-w-[unset] overflow-hidden rounded-[21px] border border-[#5A4A73] md:max-w-[370px]">
        <CardBody className="relative w-full overflow-hidden p-1 rtl:text-right">
          <div className="relative overflow-hidden">
            <CardHeader className="relative z-10 w-full flex-col !items-start gap-3 rounded-2xl bg-[#272525E5] px-2 py-4">
              <div className="flex w-full items-center justify-between gap-4">
                <h2 className="font-bold text-primary ~text-xl/2xl">{t("got", { value: grade })}</h2>
                <img src={horizontalLogo.src} alt="Inaash Logo" className="w-20" />
              </div>
              <p className="mb-4 text-default-500">{video.video.title}</p>
            </CardHeader>
          </div>
          <div className="flex w-full items-center justify-between px-3 py-2">
            <Button
              onClick={globalShare}
              size="md"
              variant="light"
              startContent={<img className="size-8" src={send.src} alt="share to share" />}>
              {t("share-button")}
            </Button>

            <div className="flex items-center gap-2">
              <TwitterShareButton
                url={shareURL}
                title={share("title", { course: video.video.title, value: grade })}>
                <img className="size-5" src={twitter.src} alt="share to x" />
              </TwitterShareButton>
              <LinkedinShareButton
                url={shareURL}
                title={share("title", { course: video.video.title, value: grade })}>
                <img className="size-6" src={linkedin.src} alt="share to linkedin" />
              </LinkedinShareButton>
            </div>
          </div>
        </CardBody>
      </Card>
      <Divider />
      <div className="flex flex-col items-center text-sm">
        <p>{t("share-with-others")}</p>
        <div className="mt-2 flex gap-2">
          <WhatsappShareButton
            url={shareURL}
            title={share("title", { course: video.video.title, value: grade })}>
            <img className="size-6" src={whatsapp.src} alt="share to whatsapp" />
          </WhatsappShareButton>
          <EmailShareButton
            url={shareURL}
            title={share("title", { course: video.video.title, value: grade })}>
            <img className="size-6" src={gmail.src} alt="share to gmail" />
          </EmailShareButton>
        </div>
      </div>
    </div>
  )
}

export default ShareSuccess
