"use client"

import { Tooltip } from "@nextui-org/tooltip"
import { useTranslations } from "next-intl"
import ChangeProgramButton from "./change-program-button"
import SelectSceneButton from "./select-scene-button"
import SoundSlider from "./sound-slider"
import SubTitleSwitch from "./subtitle-switch"

type Props = {}

const VideoFooter = (props: Props) => {
  const t = useTranslations("course.course-footer")
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 bg-[#252323]">
      <div className="grid grid-cols-[200px_1fr_200px] py-2 ~px-4/6">
        <div className="flex items-center ~gap-4/10">
          <Tooltip color="foreground" placement={"top"} content={t("subtitle-tooltip")}>
            <div>
              <SubTitleSwitch />
            </div>
          </Tooltip>
          <Tooltip color="foreground" placement={"top"} content={t("sound-tooltip")}>
            <div>
              <SoundSlider />
            </div>
          </Tooltip>
        </div>

        <div className="flex items-center justify-center gap-4">
          <SelectSceneButton>{t("select-scene-button")}</SelectSceneButton>
          <ChangeProgramButton>{t("change-program-button")}</ChangeProgramButton>
        </div>
        <div className=""></div>
      </div>
    </footer>
  )
}

export default VideoFooter
