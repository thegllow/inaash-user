import React from "react"
import Image, { ImageProps } from "next/image"
import { horizontalLogo, logo } from "@/assets"

import { Link } from "@/lib/i18n/navigation"

type Props = Omit<ImageProps, "src" | "alt"> & {
  variant?: "horizontal" | "vertical"
}

const Logo = ({ variant = "vertical", ...props }: Props) => {
  return (
    <Link href={"/start"}>
      <Image src={variant === "horizontal" ? horizontalLogo : logo} alt="inaash logo" {...props} />
    </Link>
  )
}

export default Logo
