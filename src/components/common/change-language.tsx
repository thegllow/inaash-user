import { User } from "@/app/[locale]/(public)/profile/types"
import { LOCALES } from "@/config"
import { usePathname, useRouter } from "@/lib/i18n/navigation"
import InaashApi from "@/services/inaash"
import { ErrorResponse, SuccessResponse } from "@/types"
import { Divider } from "@nextui-org/divider"
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/modal"
import { Tab, Tabs } from "@nextui-org/tabs"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { parseAsBoolean, useQueryState } from "nuqs"
import { useState } from "react"
import Button from "../ui/button"

type Props = {}

const ChangeLanguage = (props: Props) => {
  const t = useTranslations("profile.dropdown.change-language")
  const { locale } = useParams()
  const [language, setLanguage] = useState<string>(locale as string)

  const [isOpen, seChangeLang] = useQueryState("change_lang", parseAsBoolean.withDefault(false))

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const session = useSession()
  const { user } = session.data!

  const Router = useRouter()
  const pathname = usePathname()

  const onUpdateLanguage = async () => {
    try {
      setError("")
      setIsLoading(true)
      const response = await InaashApi.patch<SuccessResponse<User>>(`/user/users/set-lang`, {
        lang: language,
      })
      Router.push({ pathname }, { locale: language })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseError = error.response.data as ErrorResponse<{}>
        setError(responseError.message)
        return
      }
    } finally {
      setError("")

      setIsLoading(false)
    }
  }
  return (
    <Modal
      classNames={{
        base: "bg-[#0A0909] backdrop-blur-2xl",
      }}
      isOpen={isOpen}
      onOpenChange={seChangeLang}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="~py-6/10">
                <h4 className="text-center text-lg text-white">{t("title")}</h4>
                <Divider className="mx-auto my-6 w-1/2" />

                <div className="flex justify-center">
                  <Tabs
                    selectedKey={language}
                    onSelectionChange={(key) => setLanguage(key as string)}
                    color="primary"
                    variant={"underlined"}
                    aria-label="Tabs variants">
                    {LOCALES.map((element) => {
                      return (
                        <Tab
                          key={element}
                          value={element}
                          className="text-base"
                          title={t(`tabs.${element}`)}
                        />
                      )
                    })}
                  </Tabs>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="w-full">
                <Button isLoading={isLoading} onClick={onUpdateLanguage}>
                  {t("update-button")}
                </Button>
                {error ? <p className="mt-3 text-sm font-semibold text-danger">{error}</p> : ""}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ChangeLanguage