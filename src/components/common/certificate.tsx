/* eslint-disable @next/next/no-img-element */

import { getCertificate } from "@/app/[locale]/(public)/information-center/[code]/get-certificate"
import { horizontalLogo } from "@/assets"
import { download, gmail, linkedin, send, twitter, whatsapp } from "@/assets/icons"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { getLocale, getTranslations } from "next-intl/server"
import {
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "./share-buttons"

const Certificate = async ({ certificate_qr_code }: { certificate_qr_code: string }) => {
  const t = await getTranslations("certificate.certificate-card")
  const video = await getCertificate(certificate_qr_code)
  const locale = await getLocale()
  const certificateURl = `${process.env.HOST_NAME}/${locale}/information-center/${video.certificate_number}`
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-6 text-foreground">
      <h1 className="font-semibold ~text-lg/2xl">{t("title")}</h1>

      <Card
        shadow={"none"}
        className="mx-auto w-full max-w-[unset] overflow-hidden rounded-[21px] border border-[#5A4A73] md:max-w-xl">
        <CardBody className="relative w-full overflow-hidden p-1 rtl:text-right">
          <div className="relative overflow-hidden">
            <CardHeader className="relative z-10 w-full flex-col !items-start gap-3 rounded-2xl bg-[#272525E5] px-2 py-4">
              <div className="flex w-full items-center justify-between gap-4">
                <h2 className="text-foreground">{video.evaluation}</h2>
                <img src={horizontalLogo.src} alt="Inaash Logo" className="w-20" />
              </div>
              <div className="flex w-full items-center justify-between gap-8">
                <div className="w-full">
                  <h2 className="font-bold text-primary ~text-xl/2xl">{video.user.full_name}</h2>
                  <p className="mb-4 text-default-500">
                    {" "}
                    {t("pass")} {video.video.title}{" "}
                  </p>
                </div>
                <img src={video.certificate_qr_code || undefined} alt="Inaash Logo" className="w-20" />
              </div>
            </CardHeader>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-5 px-3 py-2 md:flex-row">
            <div className="flex w-full items-center justify-between gap-4">
              <Button
                as="a"
                href="#"
                variant="light"
                size="md"
                startContent={<img className="size-8" src={send.src} alt="share to share" />}>
                {t("share-button")}
              </Button>

              <div className="flex items-center gap-2">
                <TwitterShareButton
                  url={certificateURl}
                  title={t("share-title", { value: video.video.title })}>
                  <img className="size-5" src={twitter.src} alt="share to x" />
                </TwitterShareButton>
                {/* <Button size="sm" isIconOnly variant="light"> */}
                <LinkedinShareButton
                  url={certificateURl}
                  title={t("share-title", { value: video.video.title })}>
                  <img className="size-5" src={linkedin.src} alt="share to linkedin" />
                </LinkedinShareButton>
                {/* </Button> */}
              </div>
            </div>
            <div className="max-md:w-full">
              <Divider className="hidden h-10 md:block" orientation="vertical" />
              <Divider className="w-full md:hidden" orientation="horizontal" />
            </div>
            <div className="w-full">
              <Button
                fullWidth
                as="a"
                href="#"
                variant="light"
                size="md"
                className="justify-between"
                endContent={<img className="size-10 shrink-0" src={download.src} alt="share to linkedin" />}>
                {t("download-button")}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="flex flex-col items-center text-sm">
        <p>{t("share-with-others")}</p>
        <div className="mt-2 flex gap-3">
          <WhatsappShareButton url={certificateURl} title={t("share-title", { value: video.video.title })}>
            <img className="size-6" src={whatsapp.src} alt="share to whatsapp" />
          </WhatsappShareButton>
          <EmailShareButton url={certificateURl} subject={t("share-title", { value: video.video.title })}>
            <img className="size-6" src={gmail.src} alt="share to gmail" />
          </EmailShareButton>
        </div>
      </div>
    </div>
  )
}

export default Certificate
