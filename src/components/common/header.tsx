"use client"

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar"
import { link as linkStyles } from "@nextui-org/theme"
import clsx from "clsx"
import { useState } from "react"

import { siteConfig } from "@/config/site"
import { Link as NextLink } from "@/lib/i18n/navigation"

import { useTranslations } from "next-intl"
import Logo from "./logo"
import UserButton from "./user-button"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations("header")

  return (
    <>
      <NextUINavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="bg-default-100"
        classNames={{ wrapper: "max-lg:flex-row-reverse " }}
        maxWidth="xl"
        position="sticky">
        <NavbarContent className="item1 flex items-center !justify-end lg:hidden">
          <NavbarItem>
            <UserButton />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="basis-1/5 max-lg:!grow-0 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="min-w-28 shrink-0 lg:min-w-36">
            {/* <NextLink className="shrink-0" href="/"> */}
            <Logo variant="horizontal" />
            {/* </NextLink> */}
          </NavbarBrand>
          <ul className="mx-2 hidden justify-start gap-5 font-medium lg:flex lg:gap-8 rtl:grow">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className="text-white duration-150 hover:text-[#f1f1f1b9] max-lg:text-sm"
                  href={item.href}>
                  {/*  @ts-ignore */}
                  {t(item.label)}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="hidden basis-1/5 lg:flex lg:basis-full" justify="end">
          <NavbarItem className="hidden lg:flex">
            <UserButton />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="basis-1 !gap-2 max-lg:flex-row-reverse lg:hidden" justify="end">
          <NavbarMenuToggle className="text-white" />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NextLink
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(linkStyles({ color: "foreground" }))}
                  color="foreground"
                  href={item.href}>
                  {/*  @ts-ignore */}

                  {t(item.label)}
                </NextLink>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  )
}

export default Header
