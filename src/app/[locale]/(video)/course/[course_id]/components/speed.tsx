import { Chip } from "@nextui-org/chip"
import { Timer } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"

type Props = {
  time: string
}

const Speed = (props: Props) => {
  const t = useTranslations("course.course-header")
  return (
    <div id="step4" className="flex items-center gap-2">
      <span className="text-xs text-default-500 small-text">{t("average-answer-time")}</span>
      <Chip
        startContent={<Timer size={18} />}
        className="bg-[#3C3C3C] px-2 py-1 backdrop-blur-xl"
        radius="sm">
        {props.time}
      </Chip>
    </div>
  )
}

export default Speed
