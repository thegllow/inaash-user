import { background } from "@/assets"
import { cn } from "@/lib/cn"
import Image, { StaticImageData } from "next/image"
import React from "react"

type Props = {
  src?: StaticImageData
}

const BackgroundImage = ({ src }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {src ? <div className="absolute inset-0 bg-[#030303D4]"></div> : null}
      <Image
        className={src ? "h-full w-full object-cover" : "object-contain"}
        src={src || background}
        alt="inaash background"
      />
    </div>
  )
}

export default BackgroundImage
