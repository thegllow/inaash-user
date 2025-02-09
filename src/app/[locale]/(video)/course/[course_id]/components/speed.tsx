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
    <div id="step4" className="flex items-center portrait:gap-2 landscape:gap-1">
      <span className="text-default-500 portrait:text-xs landscape:text-[10px]">
        {t("average-answer-time")}
      </span>
      <Chip
        startContent={<Timer size={16} />}
        className="bg-[#3C3C3C] py-1 backdrop-blur-xl portrait:px-2 portrait:py-1 landscape:px-1 landscape:py-0.5"
        radius="sm">
        {props.time}
      </Chip>
    </div>
  )
}

export default Speed
