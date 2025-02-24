/* eslint-disable @next/next/no-img-element */
import { horizontalLogo, profilePlaceholder } from "@/assets"
import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import InaashApi from "@/services/inaash"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { getTranslations } from "next-intl/server"
import EditProfileButton from "./components/edit-button"
import { UserResponse } from "./types"
import { Button } from "@nextui-org/button"
import { Divider } from "@nextui-org/divider"
import { download } from "@/assets/icons"
import { firstCertificate, secondCertificate } from "@/assets/certificates"
import Image from "next/image"

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params

  const { locale } = params

  const t = await getTranslations("profile")
  const t2 = await getTranslations("certificate.certificate-card")

  const session = await auth()
  if (!session) redirect({ href: "/login", locale })

  const response = await InaashApi.get<UserResponse>(`/user/users/${session.user.id}`)
  const user = response.data.data.item

  return (
    <section className="flex items-center justify-center gap-4 ~/md:~py-10/24">
      <Card shadow={"none"} className="w-full max-w-4xl shrink-0 rounded-xl bg-[#0A090959] p-1">
        <div className="mb-3 space-y-5 rounded-t-lg bg-[#1D1B1B] ~px-7/12 ~py-5/9">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <img className="size-14" src={profilePlaceholder.src} alt="profile" />
              <p className="text-medium">{user.first_name || "unknown"}</p>
            </div>
            <EditProfileButton id={user.id} />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              classNames={{
                label: "text-xs !text-default-500",
              }}
              className="rounded"
              labelPlacement="outside"
              readOnly
              value={user.mobile || ""}
              label={t("mobile")}
            />
            <Input
              classNames={{
                label: "text-xs !text-default-500",
              }}
              className="rounded"
              labelPlacement="outside"
              readOnly
              value={user.email || "unknown"}
              label={t("email")}
            />
          </div>
        </div>
        <div className="space-y-4 py-4 ~px-4/11">
          <p className="text-lg font-semibold">{t("certificates")}</p>
          <div className="flex w-full flex-wrap justify-start gap-5">
            {user.userVideos?.map((video) => {
              if (video.certificate_number == null && video.certificate_url == null) {
                return <Card></Card>;
              }
              
              return (
                <Card
                  key={video.video_id}
                  shadow="none"
                  className="w-full max-w-[unset] overflow-hidden rounded-[21px] border border-[#5A4A73] md:max-w-[320px]"
                >
                  <CardBody className="relative w-full overflow-hidden p-1 rtl:text-right">
                    <div className="relative mb-3 aspect-[16/7] overflow-hidden rounded-2xl">
                      <Image
                        className="h-full w-full object-cover"
                        src={video.video_id === "1" ? firstCertificate : secondCertificate}
                        alt="certificate"
                      />
                      <CardHeader className="relative z-10 w-full flex-col !items-start gap-3 rounded-2xl bg-[#272525E5] px-2 py-4">
                        <div className="h-16 w-full"></div>
                      </CardHeader>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <p className="text-foreground">{video.video_title}</p>
                      </div>
                      <Divider />
                      <div className="w-full px-1 pb-1">
                        <Button
                          fullWidth
                          as="a"
                          href={
                            video.certificate_url
                              ? video.certificate_url
                              : video.certificate_number
                              ? `${process.env.HOST_NAME}/${locale}/certificate/${video.video_id}`
                              : "#"
                          }
                          {...(video.certificate_url ? { download: true } : {})}
                          variant="light"
                          size="md"
                          className="items-center justify-center text-lg text-primary"
                          endContent={
                            <img className="mt-1 size-10 shrink-0" src={download.src} alt="download" />
                          }
                        >
                          {t2("download-button")}
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
              
            })}
          </div>
          <div></div>
        </div>
      </Card>
    </section>
  )
}
