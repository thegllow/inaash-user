"use client"

import React from "react"
import { Link as NextLink } from "@nextui-org/link"
import { useTranslations } from "next-intl"

import { siteConfig } from "@/config/site"
import { Link } from "@/lib/i18n/navigation"

type Props = {}

const NavBar = (props: Props) => {
  const t = useTranslations("header")
  return (
    <div className="flex items-center">
      <ul className="flex items-center gap-8 font-medium">
        {siteConfig.navItems.map((item) => {
          return (
            <li key={item.href}>
              <NextLink as={Link} color="foreground" href={item.href}>
                {/*  @ts-ignore */}
                {t(item.label)}
              </NextLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavBar
