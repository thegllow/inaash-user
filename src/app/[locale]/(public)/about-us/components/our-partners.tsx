/* eslint-disable @next/next/no-img-element */
import { firstPartner, partnersBackground, secondPartner, secondPartnerLogo, thirdPartner } from "@/assets"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

type Props = {}

const OurPartners = async (props: Props) => {
  const t = await getTranslations("about-us.our-partners")
  return (
    <section>
      <div className="container mx-auto max-w-7xl flex-grow px-6">
        <div className="flex w-full flex-col items-center justify-between pt-6 ~pb-14/24 ~/md:~gap-5/10 md:~px-10/20 lg:flex-row">
          <div className="mx-auto w-full space-y-1 max-md:max-w-sm max-md:text-center lg:w-2/5">
            <h1 className="font-medium text-foreground lg:text-2xl">{t("title")}</h1>
            <p className="text-sm text-default-500">{t("description")}</p>
          </div>
          <div className="w-full lg:w-3/5">
            <div className="relative mx-auto w-fit overflow-hidden rounded-2xl px-6 py-12">
              <Image
                src={partnersBackground}
                alt="background"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="relative flex items-center gap-4">
                <div className="flex aspect-square h-28 items-center justify-center rounded-xl bg-white p-2">
                  <img className="h-full" src={firstPartner.src} alt="partner" />
                </div>
                <div className="flex h-28 items-center justify-center rounded-xl bg-white p-2 max-md:aspect-square">
                  <img className="hidden h-full md:block" src={secondPartner.src} alt="partner" />
                  <img className="h-full md:hidden" src={secondPartnerLogo.src} alt="partner" />
                </div>
                <div className="flex aspect-square h-28 items-center justify-center rounded-xl bg-white p-2">
                  <img className="h-full" src={thirdPartner.src} alt="partner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPartners
