"use client"

import { useFullscreen } from "@mantine/hooks"
import { Button } from "@nextui-org/button"
import { Maximize, Minimize } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {}

const FullScreenButton = (props: Props) => {
  const t = useTranslations("header")
  const { fullscreen, toggle } = useFullscreen()
  return (
    <>
      <Button
        key={"lg-screen"}
        onClick={toggle}
        className="shrink-0 items-center max-md:hidden"
        variant="light"
        radius="sm"
        endContent={fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}>
        {t("full-screen")}
      </Button>
      <Button
        key={"small-screen"}
        onClick={toggle}
        className="items-center md:hidden"
        variant="light"
        radius="sm"
        isIconOnly>
        {fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
      </Button>
    </>
  )
}

export default FullScreenButton
