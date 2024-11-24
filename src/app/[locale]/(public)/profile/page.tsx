/* eslint-disable @next/next/no-img-element */
import { profilePlaceholder } from "@/assets"
import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import InaashApi from "@/services/inaash"
import { Card } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { getTranslations } from "next-intl/server"
import EditProfileButton from "./components/edit-button"
import { UserResponse } from "./types"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations("profile")

  const session = await auth()
  if (!session) redirect({ href: "/login", locale })

  const response = await InaashApi.get<UserResponse>(`/user/users/${session.user.id}`)
  const user = response.data.data.item

  return (
    <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
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
        <div className="px-11">
          <p className="text-lg font-semibold">{t("certificates")}</p>
        </div>
      </Card>
    </section>
  )
}
