"use client"
/* eslint-disable @next/next/no-img-element */
import { horizontalLogo, logo } from "@/assets"
import { gmail, linkedin, send, twitter, whatsapp } from "@/assets/icons"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { useTranslations } from "next-intl"
import { useVideo } from "../context/video-context"

const ShareSuccess = () => {
  const t = useTranslations("share-your-success")
  const video = useVideo()

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
                <h2 className="font-bold text-primary ~text-xl/2xl">
                  حصلت على{" "}
                  {((Number(video.correct_answers) / Number(video.total_questions)) * 100).toFixed(0) + "%"}
                </h2>
                <img src={horizontalLogo.src} alt="Inaash Logo" className="w-20" />
              </div>
              <p className="mb-4 text-default-500">{video.video.title}</p>
            </CardHeader>
          </div>
          <div className="flex w-full items-center justify-between px-3 py-2">
            <Button
              as="a"
              href="#"
              size="md"
              variant="light"
              startContent={<img className="size-8" src={send.src} alt="share to share" />}>
              {t("share-button")}
            </Button>

            <div className="flex items-center gap-2">
              <Button size="sm" isIconOnly variant="light">
                <img className="size-6" src={twitter.src} alt="share to x" />
              </Button>
              <Button size="sm" isIconOnly variant="light">
                <img className="size-6" src={linkedin.src} alt="share to linkedin" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <Divider />
      <div className="flex flex-col items-center text-sm">
        <p>{t("share-with-others")}</p>
        <div className="mt-2 flex gap-2">
          <Button size="sm" isIconOnly variant="light">
            <img className="size-6" src={whatsapp.src} alt="share to whatsapp" />
          </Button>
          <Button size="sm" isIconOnly variant="light">
            <img className="size-6" src={gmail.src} alt="share to gmail" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShareSuccess
