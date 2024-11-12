import React from "react"
import Image from "next/image"
import { horizontalLogo } from "@/assets"
import { Button } from "@nextui-org/button"
import { Expand } from "lucide-react"
import { getTranslations } from "next-intl/server"

import Logo from "./logo"

type Props = {}

const Header = async (props: Props) => {
  const t = await getTranslations("header")
  return (
    <header className="fixed inset-x-0 top-0 bg-default-100">
      <div className="flex items-center justify-between px-6">
        <div>
          <Logo variant="horizontal" />
        </div>
        <div>
          <Button variant="light" radius="sm" endContent={<Expand className="size-4" />}>
            {t("full-screen")}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
