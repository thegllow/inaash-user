import { User } from "@/app/[locale]/(public)/profile/types"
import { LOCALES } from "@/config"
import { usePathname, useRouter } from "@/lib/i18n/navigation"
import InaashApi from "@/services/inaash"
import { ErrorResponse, SuccessResponse } from "@/types"
import { Divider } from "@nextui-org/divider"
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/modal"
import { Tab, Tabs } from "@nextui-org/tabs"
import axios from "axios"
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
        console.log("🚀 ~ onUpdateLanguage ~ error:", error)
        const responseError = error.response.data as ErrorResponse<{}>
        setError(responseError.message)
        return
      }
    } finally {
      setIsLoading(false)
    }
  }

  const title = {
    ar: "تغير اللغة",
    en: "Change the language",
    fr: "Modifier la langue",
    fil: "Palitan ang Wika",
    id: "Ubah bahasa",
    ur: "زبان تبدیل کریں",
  } as const

  const button = {
    ar: "تعديل اللغة",
    en: "Modify the language",
    fr: "Modifier la langue",
    fil: "Baguhin ang Wika",
    id: "Ubah bahasa",
    ur: "زبان میں ترمیم کریں",
  } as const
  return (
    <Modal
      size="lg"
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
                <h4 className="text-center text-lg text-white">{title[language as "ar"]}</h4>
                <Divider className="mx-auto my-6 w-1/2" />

                <div className="flex justify-center">
                  <Tabs
                    selectedKey={language}
                    onSelectionChange={(key) => setLanguage(key as string)}
                    color="primary"
                    className="gap-0.5"
                    variant={"underlined"}
                    aria-label="Tabs variants">
                    {LOCALES.map((element) => {
                      return (
                        <Tab
                          key={element}
                          value={element}
                          className="px-1 text-xs md:px-2 md:text-base"
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
                <Button size="md" isLoading={isLoading} onClick={onUpdateLanguage}>
                  {button[language as 'ar']}
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
