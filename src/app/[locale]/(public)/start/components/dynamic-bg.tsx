"use client"
import { loginBackground, startBackground } from "@/assets"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { parseAsInteger, useQueryState } from "nuqs"

const DynamicBg = () => {
  const [selectedCourse] = useQueryState("course", parseAsInteger.withDefault(1))

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#030303D4]"></div>

      {selectedCourse == 1 && (
        <Image
          key={1}
          className={"h-full w-full bg-center object-cover"}
          src={startBackground}
          alt="inaash background"
        />
      )}
      {selectedCourse == 2 && (
        <Image
          key={2}
          className={"h-full w-full bg-center object-cover"}
          src={loginBackground}
          alt="inaash background"
        />
      )}
    </div>
  )
}

export default DynamicBg
