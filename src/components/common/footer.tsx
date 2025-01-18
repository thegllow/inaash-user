/* eslint-disable @next/next/no-img-element */
import { logo } from "@/assets"
import { siteConfig } from "@/config/site"
import { Link } from "@/lib/i18n/navigation"
import { Divider } from "@nextui-org/divider"
import { getTranslations } from "next-intl/server"
import Logo from "./logo"

type Props = {}

const Footer = async (props: Props) => {
  const t = await getTranslations("footer")
  return (
    <footer className="relative overflow-hidden">
      <img src={logo.src} alt="logo" className="absolute left-0 top-0 block h-[700px] -translate-x-1/4" />

      <div className="bg-[#0A090959] px-10 pt-10 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between gap-8 max-md:flex-col">
            <Logo className="w-[215px]" />
            <div className="mx-4 flex flex-wrap gap-14">
              <div>
                <p className="mb-4 text-lg font-medium text-white">{t("contact-us")}</p>

                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-default-500">{t("email")}</p>
                    <a className="font-medium text-white" href={`mailto:${siteConfig.contactInfo.email}`}>
                      {siteConfig.contactInfo.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-default-500">{t("phonenumber")}</p>
                    <a
                      dir="ltr"
                      className="font-medium text-white"
                      href={`tel:${siteConfig.contactInfo.phonenumber}`}>
                      {siteConfig.contactInfo.phonenumber}
                    </a>
                  </div>
                  <div>
                    <p className="mb-3 text-default-500">{t("socials")}</p>
                    <div className="flex items-center gap-3">
                      {siteConfig.contactInfo.socials.map((item, index) => {
                        return (
                          <a target="_blank" key={item.href + index} className="text-white" href={item.href}>
                            {item.icon}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-4 text-lg font-medium text-white">{t("important-links")}</p>

                <ul className="flex flex-col gap-4">
                  {siteConfig.navItems.map((item, index) => {
                    return (
                      <li key={item.label + index}>
                        <Link
                          className="text-medium text-white duration-150 hover:text-[#f1f1f1b9] max-lg:text-sm"
                          href={item.href}>
                          {/* @ts-ignore */}
                          {t(item.label)}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-end gap-4 py-4 text-default-500">
              <Link href={"/privacy-policy"}>{t("privacy-policy")}</Link>
              <Link href={"/terms"}>{t("terms")}</Link>
            </div>
          </div>
          <Divider />
          <div className="py-8 text-default-500">
            <p>© {t("all-right-reserved", { value: new Date().getFullYear() })}</p>
            {/* <div className="flex items-center justify-center">
              <a href="https://glow.net.sa/" target="_blank">
                مطور بواسطة Glow
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
